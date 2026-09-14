(function () {
  const d = window.TUHFA;
  const u = d.ui || {oneLine:'الخلاصة في سطر',simple:'الشرح المبسّط',detailed:'الشرح المفصّل',terms:'شرح المفردات',example:'مثال قرآني موثّق',warning:'خطأ شائع',exercise:'سؤال أو تمرين',references:'مراجع الدرس',copy:'نسخ البيت',copied:'تم النسخ',searchEmpty:'لم يظهر درس يطابق البحث. جرّب كلمة أخرى.',verseRange:'الأبيات',quizQuestion:'السؤال',of:'من',correct:'صحيح.',retry:'راجِع الإجابة.',next:'السؤال التالي',restart:'ابدأ الاختبار من جديد',source:'مرجع التطبيق: المصحف الشريف، رواية حفص عن عاصم.'};
  const $ = (s) => document.querySelector(s);
  const escape = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fold = (s) => String(s).toLowerCase().normalize('NFD').replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g,'').replace(/[أإآ]/g,'ا').replace(/ى/g,'ي');
  const lineTitle = (v) => `${v[1]} ${v[2]}`;
  const renderVerse = (lesson, verse) => {
    const [n, first, second] = verse;
    const isFr = d.language === 'fr';
    const brief = isFr ? `Le vers ${n} ancre l’idée suivante : ${lesson.rule}` : `البيت ${n} يثبّت أن ${lesson.rule}`;
    const simple = isFr ? `Lisez les mots du vers lentement, puis rattachez-les au chapitre « ${lesson.title} ». L’objectif pratique est d’identifier la règle avant de tenter son exécution.` : `اقرأ ألفاظ البيت ببطء، ثم اربطها بباب «${lesson.title}». المقصود العملي: أن تعرف موضع القاعدة قبل أن تحاول أداءها.`;
    const detail = isFr ? `Ce vers construit progressivement la compréhension de ${lesson.title}. Il ne suffit pas de mémoriser sa formule : repérez la cause citée, distinguez la lettre ou la condition dont dépend la règle, puis présentez votre lecture à un enseignant. Le sens se complète avec les vers qui l’entourent.` : `يبني هذا البيت فهمًا متدرجًا في ${lesson.title}. لا يكتفي الطالب بحفظ العبارة؛ بل يلاحظ السبب المذكور فيها، ويميّز الحروف أو الشرط الذي يتوقف عليه الحكم، ثم يعرض قراءته على معلّم. ويُفهم البيت في سياق الأبيات المجاورة لا منفردًا عنها.`;
    return `<details class="verse" id="verse-${n}"><summary><span class="verse-no">${n}</span><span class="verse-text"><span>${escape(first)}</span><span>${escape(second)}</span></span><span class="chev">⌄</span></summary><div class="verse-body"><p class="quick"><strong>${u.oneLine} :</strong> ${escape(brief)}</p><h4>${u.simple}</h4><p>${escape(simple)}</p><h4>${u.detailed}</h4><p>${escape(detail)}</p><div class="details-grid"><section><h4>${u.terms}</h4><ul class="terms">${lesson.terms.map(t=>`<li>${escape(t)}</li>`).join('')}</ul></section><section><h4>${u.example}</h4><p>${escape(lesson.example)}</p><p class="source-line">${u.source}</p></section><section><h4>${u.warning}</h4><p>${escape(lesson.warning)}</p></section><section><h4>${u.exercise}</h4><p>${escape(lesson.exercise)}</p></section></div><p class="source-line"><strong>${u.references} :</strong> ${escape(d.sources)}</p><button class="copy" data-copy="${escape(lineTitle(verse))}">${u.copy}</button></div></details>`;
  };
  const renderLessons = (query='') => {
    const q = fold(query.trim()); let count = 0;
    $('#lesson-list').innerHTML = d.lessons.map(l => {
      const rows = l.verses.filter(v => !q || fold(`${l.title} ${l.rule} ${v.join(' ')}`).includes(q));
      if (!rows.length) return ''; count += rows.length;
      return `<article class="lesson-group" id="${l.id}"><header><h3>${escape(l.title)}</h3><span class="range">الأبيات ${escape(l.range)}</span></header>${rows.map(v=>renderVerse(l,v)).join('')}</article>`;
    }).join('') || `<p>${u.searchEmpty}</p>`;
    return count;
  };
  $('#toc-list').innerHTML = d.lessons.map(l=>`<a href="#${l.id}">${escape(l.title)} <small>(${escape(l.range)})</small></a>`).join('');
  renderLessons();
  $('#glossary-list').innerHTML = d.glossary.map(item=>`<article><h3>${escape(item[0])}</h3><p>${escape(item[1])}</p></article>`).join('');
  $('#search').addEventListener('input', e => renderLessons(e.target.value));
  document.addEventListener('click', async e => { const b=e.target.closest('[data-copy]'); if (!b) return; try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent=u.copied; setTimeout(()=>b.textContent=u.copy,1200); } catch { b.textContent=d.language==='fr'?'Sélectionnez le texte et copiez-le.':'حدّد النص وانسخه'; } });
  $('#card-grid').innerHTML = d.cards.map((c,i)=>`<article class="flashcard"><h3>${escape(c[0])}</h3><div class="letters">${escape(c[1])}</div><p>${escape(c[2])}</p><p class="source-line">${escape(c[3])}</p><button class="copy" data-card="${i}">نزّل هذه البطاقة</button></article>`).join('');
  function downloadCards(cards, name) { const content = `<!doctype html><html lang="${d.language}" dir="${d.language==='ar'?'rtl':'ltr'}"><meta charset="utf-8"><title>${d.title} — fiches</title><style>body{font-family:serif;margin:24px;color:#172529}.card{border:1px solid #173d3d;border-top:5px solid #c99032;padding:18px;margin:12px;min-height:160px;break-inside:avoid}h2{color:#123d3d}small{color:#59706d}@media print{.card{display:inline-block;width:42%;vertical-align:top}}</style><h1>${d.title}</h1>${cards.map(c=>`<section class="card"><h2>${escape(c[0])}</h2><p><b>${escape(c[1])}</b></p><p>${escape(c[2])}</p><small>${escape(c[3])}</small></section>`).join('')}</html>`; const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([content],{type:'text/html;charset=utf-8'})); a.download=name; a.click(); URL.revokeObjectURL(a.href); }
  document.addEventListener('click', e => { const all=e.target.closest('[data-download="all"]'); const one=e.target.closest('[data-card]'); if(all) downloadCards(d.cards,'tuhfat-al-atfal-flashcards.html'); if(one) downloadCards([d.cards[Number(one.dataset.card)]],`tuhfat-card-${Number(one.dataset.card)+1}.html`); });
  let step=0, locked=false; function renderQuiz(){ const item=d.quiz[step]; $('#quiz-progress').textContent=`${u.quizQuestion} ${step+1} ${u.of} ${d.quiz.length}`; $('#quiz-box').innerHTML=`<p class="quiz-question">${escape(item.q)}</p>${item.a.map((a,i)=>`<button class="answer" data-answer="${i}">${escape(a)}</button>`).join('')}<div class="feedback" aria-live="polite"></div>`; }
  $('#quiz-box').addEventListener('click', e => { const b=e.target.closest('[data-answer]'); if(!b||locked)return; locked=true; const item=d.quiz[step], chosen=Number(b.dataset.answer), answers=[...$('#quiz-box').querySelectorAll('.answer')]; answers[item.ok].classList.add('correct'); if(chosen!==item.ok)b.classList.add('wrong'); const feedback=$('.feedback'); feedback.textContent=chosen===item.ok?`${u.correct} ${item.why}`:`${u.retry} ${item.why}`; const next=document.createElement('button'); next.className='button secondary next'; next.textContent=step===d.quiz.length-1?u.restart:u.next; next.onclick=()=>{step=step===d.quiz.length-1?0:step+1;locked=false;renderQuiz();}; feedback.after(next); }); renderQuiz();
})();
