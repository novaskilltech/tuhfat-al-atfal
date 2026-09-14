const { neon } = require('@neondatabase/serverless');

let setupPromise;

async function ensureCounter(sql) {
  if (!setupPromise) {
    setupPromise = sql`
      CREATE TABLE IF NOT EXISTS site_metrics (
        key TEXT PRIMARY KEY,
        value BIGINT NOT NULL DEFAULT 0
      )
    `;
  }
  await setupPromise;
}

module.exports = async (request, response) => {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    response.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    await ensureCounter(sql);
    const increment = request.query.increment === '1';
    const rows = increment
      ? await sql`
          INSERT INTO site_metrics (key, value) VALUES ('visits', 1)
          ON CONFLICT (key) DO UPDATE SET value = site_metrics.value + 1
          RETURNING value
        `
      : await sql`SELECT value FROM site_metrics WHERE key = 'visits'`;
    const visits = Number(rows[0]?.value || 0);

    response.setHeader('Cache-Control', 'no-store, max-age=0');
    response.status(200).json({ visits });
  } catch (error) {
    console.error('Unable to read visit counter', error);
    response.status(503).json({ error: 'counter_unavailable' });
  }
};
