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
    const note = d.verseNotes?.[n];
    const commentary = d.chapterNotes?.[lesson.id];
    const basis = d.commentarySources?.[lesson.id];
    const brief = note || (isFr ? `Le vers ${n} ancre l’idée suivante : ${lesson.rule}` : `البيت ${n} يثبّت أن ${lesson.rule}`);
    const simple = note ? (isFr ? `Lisez ce sens à la lumière du chapitre « ${lesson.title} », puis identifiez dans l’exemple la condition qui déclenche la règle.` : `المعنى القريب: ${note} ثم انظر في المثال إلى الشرط الذي يترتب عليه الحكم.`) : (isFr ? `Lisez les mots du vers lentement, puis rattachez-les au chapitre « ${lesson.title} ». L’objectif pratique est d’identifier la règle avant de tenter son exécution.` : `اقرأ ألفاظ البيت ببطء، ثم اربطها بباب «${lesson.title}». المقصود العملي: أن تعرف موضع القاعدة قبل أن تحاول أداءها.`);
    const detail = commentary ? `${commentary} ${note || ''}` : (isFr ? `Ce vers construit progressivement la compréhension de ${lesson.title}. Il ne suffit pas de mémoriser sa formule : repérez la cause citée, distinguez la lettre ou la condition dont dépend la règle, puis présentez votre lecture à un enseignant.` : `يبني هذا البيت فهمًا متدرجًا في ${lesson.title}. لا يكتفي الطالب بحفظ العبارة؛ بل يلاحظ السبب المذكور فيها، ويميّز الحروف أو الشرط الذي يتوقف عليه الحكم، ثم يعرض قراءته على معلّم.`);
    const lessonRefs = basis ? `${basis} ${d.sources}` : d.sources;
    const verseExample = d.verseExamples?.[n] || lesson.example;
    const explanationCopy = `${u.oneLine}: ${brief}\n\n${u.simple}: ${simple}\n\n${u.detailed}: ${detail}`;
    const copyExplanation = isFr ? 'Copier l’explication' : 'نسخ الشرح';
    return `<details class="verse" id="verse-${n}"><summary><span class="verse-no">${n}</span><span class="verse-text"><span>${escape(first)}</span><span>${escape(second)}</span></span><span class="chev">⌄</span></summary><div class="verse-body"><p class="quick"><strong>${u.oneLine} :</strong> ${escape(brief)}</p><h4>${u.simple}</h4><p>${escape(simple)}</p><h4>${u.detailed}</h4><p>${escape(detail)}</p><div class="details-grid"><section><h4>${u.terms}</h4><ul class="terms">${lesson.terms.map(t=>`<li>${escape(t)}</li>`).join('')}</ul></section><section><h4>${u.example}</h4><p>${escape(verseExample)}</p><p class="source-line">${u.source}</p></section><section><h4>${u.warning}</h4><p>${escape(lesson.warning)}</p></section><section><h4>${u.exercise}</h4><p>${escape(lesson.exercise)}</p></section></div><p class="source-line"><strong>${u.references} :</strong> ${escape(lessonRefs)}</p><div class="verse-actions"><button class="copy" data-copy-label="${escape(u.copy)}" data-copy="${escape(lineTitle(verse))}">${u.copy}</button><button class="copy copy-explanation" data-copy-label="${escape(copyExplanation)}" data-copy="${escape(explanationCopy)}">${copyExplanation}</button></div></div></details>`;
  };
  const renderLessons = (query='') => {
    const q = fold(query.trim()); let count = 0;
    $('#lesson-list').innerHTML = d.lessons.map(l => {
      const rows = l.verses.filter(v => !q || fold(`${l.title} ${l.rule} ${v.join(' ')}`).includes(q));
      if (!rows.length) return ''; count += rows.length;
      const further = l.further ? `<aside class="further-reading"><h4>${escape(l.further.title)}</h4><p>${escape(l.further.text)}</p></aside>` : '';
      return `<article class="lesson-group" id="${l.id}"><header><h3>${escape(l.title)}</h3><span class="range">${d.language==='fr'?'Vers':'الأبيات'} ${escape(l.range)}</span></header>${rows.map(v=>renderVerse(l,v)).join('')}${further}</article>`;
    }).join('') || `<p>${u.searchEmpty}</p>`;
    return count;
  };
  $('#toc-list').innerHTML = d.lessons.map(l=>`<a href="#${l.id}">${escape(l.title)} <small>(${escape(l.range)})</small></a>`).join('');
  renderLessons();
  const nz = d.nuzhat;
  $('#nuzhat-content').innerHTML = `<p class="nuzhat-intro">${escape(nz.author)}</p><p>${escape(nz.introduction)}</p><div class="nuzhat-grid">${nz.sections.map((s,i)=>`<article class="nuzhat-card"><p class="nuzhat-index">${String(i+1).padStart(2,'0')}</p><h3>${escape(s.title)}</h3><p>${escape(s.lead)}</p><ul>${s.points.map(p=>`<li>${escape(p)}</li>`).join('')}</ul><div class="nuzhat-example"><strong>${d.language==='fr'?'Exemple coranique':'مثال قرآني'}</strong><p>${escape(s.example)}</p></div><p><strong>${d.language==='fr'?'Exercice':'تطبيق'}</strong> — ${escape(s.practice)}</p><p class="source-line"><strong>${d.language==='fr'?'Lien avec la Tuḥfah':'صلة بالتحفة'}</strong> — ${escape(s.tuhfah)}</p></article>`).join('')}</div>`;
  $('#glossary-list').innerHTML = d.glossary.map(item=>`<article><h3>${escape(item[0])}</h3><p>${escape(item[1])}</p></article>`).join('');
  const tokenKey='novaskill-tajwid-question-token';
  const today=()=>new Intl.DateTimeFormat('en-CA',{year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  const tokenUsed=()=>{try{return localStorage.getItem(tokenKey)===today()}catch{return false}};
  function updateToken(){const used=tokenUsed(); document.querySelectorAll('[data-token-status]').forEach(node=>node.textContent=used?d.contact.used:d.contact.available); document.querySelectorAll('[data-whatsapp]').forEach(button=>button.classList.toggle('token-used',used));}
  document.addEventListener('click',e=>{const button=e.target.closest('[data-whatsapp]');if(!button)return; if(!d.contact.teacherPhone){alert(d.contact.configure);return;} if(tokenUsed()){alert(d.contact.used);return;} try{localStorage.setItem(tokenKey,today());}catch{} updateToken(); const destination=`https://wa.me/${d.contact.teacherPhone.replace(/\D/g,'')}?text=${encodeURIComponent(d.contact.message)}`; window.open(destination,'_blank','noopener');});
  updateToken();
  $('#search').addEventListener('input', e => renderLessons(e.target.value));
  document.addEventListener('click', async e => { const b=e.target.closest('[data-copy]'); if (!b) return; const label=b.dataset.copyLabel || u.copy; try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent=u.copied; setTimeout(()=>b.textContent=label,1200); } catch { b.textContent=d.language==='fr'?'Sélectionnez le texte et copiez-le.':'حدّد النص وانسخه'; } });
  const cardLabels = d.language==='fr'
    ? {rule:'Règle',letters:'Lettres concernées',examples:'Applications coraniques',note:'Point de vigilance',download:'Télécharger la fiche',png:'PNG',jpeg:'JPEG',sheet:'Fiche',openSheets:'Voir les fiches'}
    : {rule:'القاعدة',letters:'الحروف المعنية',examples:'تطبيقات قرآنية',note:'تنبيه مهم',download:'تنزيل البطاقة',png:'PNG',jpeg:'JPEG',sheet:'بطاقة',openSheets:'عرض البطاقات'};
  const normalizedCards = d.cards.map(c => Array.isArray(c) ? {title:c[0],letters:c[1],rule:c[2],cases:[{label:cardLabels.examples,examples:[c[3]]}]} : c);
  const sheetTones = [
    ['#123354','#087f8c','#e0f6f5'],['#29235c','#6252b0','#efeaff'],['#5b2d31','#a7554e','#fff0ee'],['#174a40','#1b8b78','#e4f7f1'],['#49315f','#8758aa','#f5ebff'],
    ['#1c3e62','#356fa5','#e8f2ff'],['#6d4216','#bd7e2f','#fff3df'],['#22405d','#357e98','#e2f5f8'],['#3d305d','#7865af','#eeeaff'],['#133f48','#15768a','#e2f6f8']
  ];
  const renderCases = c => c.cases.map(group=>`<li><strong>${escape(group.label)}</strong>${group.examples.map(example=>`<span>${escape(example)}</span>`).join('')}</li>`).join('');
  $('#card-grid').innerHTML = normalizedCards.map((c,i)=>{const [dark,tone,soft]=sheetTones[i%sheetTones.length];return `<article class="flashcard flashcard--detailed" style="--sheet-dark:${dark};--sheet-tone:${tone};--sheet-soft:${soft}"><div class="sheet-cover"><div class="sheet-cover-meta"><span>${cardLabels.sheet} ${String(i+1).padStart(2,'0')}</span><span aria-hidden="true">✦</span></div><div class="sheet-seal" aria-hidden="true">${String(i+1).padStart(2,'0')}</div><p class="sheet-kicker">${d.language==='fr'?'TUḤFAT AL-AṬFĀL · TAJWĪD':'تحفة الأطفال · تجويد'}</p><h3>${escape(c.title)}</h3></div><div class="sheet-content"><div class="sheet-rule"><span>${cardLabels.rule}</span><p>${escape(c.rule)}</p></div><p class="letters"><strong>${cardLabels.letters}</strong><span>${escape(c.letters)}</span></p><div class="card-cases"><strong>${cardLabels.examples}</strong><ul>${renderCases(c)}</ul></div>${c.note?`<p class="card-note"><strong>${cardLabels.note}</strong><span>${escape(c.note)}</span></p>`:''}</div><div class="sheet-download" role="group" aria-label="${escape(cardLabels.download)}"><span>${cardLabels.download}</span><button type="button" class="sheet-format" data-card-download="${i}" data-format="png">${cardLabels.png}</button><button type="button" class="sheet-format" data-card-download="${i}" data-format="jpeg">${cardLabels.jpeg}</button></div></article>`;}).join('');
  const cardCanvas = (card, index) => {
    const canvas=document.createElement('canvas'), ctx=canvas.getContext('2d'), w=1400, h=1800, pad=110;
    canvas.width=w; canvas.height=h; const [dark,accent,soft]=sheetTones[index%sheetTones.length], rtl=d.language==='ar';
    ctx.fillStyle='#f7f8ff'; ctx.fillRect(0,0,w,h);
    const gradient=ctx.createLinearGradient(0,0,w,h); gradient.addColorStop(0,dark); gradient.addColorStop(1,accent); ctx.fillStyle=gradient; ctx.fillRect(0,0,w,410);
    ctx.globalAlpha=.13; for(let x=0;x<w;x+=92){ctx.beginPath();ctx.arc(x+35,75+(x%3)*46,62,0,Math.PI*2);ctx.fillStyle='#fff';ctx.fill();} ctx.globalAlpha=1;
    ctx.direction=rtl?'rtl':'ltr'; ctx.textAlign=rtl?'right':'left';
    const font=(weight,size)=>`${weight} ${size}px ${rtl?'Amiri, serif':'Inter, Arial, sans-serif'}`;
    const x=rtl?w-pad:pad; const draw=(text,y,weight,size,color)=>{ctx.font=font(weight,size);ctx.fillStyle=color;ctx.fillText(text,x,y);};
    draw(`${cardLabels.sheet.toUpperCase()} ${String(index+1).padStart(2,'0')}`,112,'700',30,'#d8f6f5');
    draw('TUḤFAT AL-AṬFĀL',174,'700',35,'#ffffff');
    const wrap=(text,y,maxWidth,weight,size,color,lineHeight)=>{ctx.font=font(weight,size);ctx.fillStyle=color;ctx.textAlign=rtl?'right':'left'; const words=String(text).split(/\s+/); let line='', cursor=y; for(const word of words){const next=line?`${line} ${word}`:word; if(ctx.measureText(next).width>maxWidth&&line){ctx.fillText(line,x,cursor);cursor+=lineHeight;line=word;}else line=next;} if(line){ctx.fillText(line,x,cursor);cursor+=lineHeight;} return cursor;};
    let y=254; y=wrap(card.title,y,w-pad*2,'700',69,'#ffffff',88);
    ctx.fillStyle='#ffffff'; ctx.globalAlpha=.95; ctx.fillRect(pad,y+20,w-pad*2,7); ctx.globalAlpha=1;
    const lineCount=(text,maxWidth,weight,size)=>{ctx.font=font(weight,size);let count=1,line='';String(text).split(/\s+/).forEach(word=>{const next=line?`${line} ${word}`:word;if(ctx.measureText(next).width>maxWidth&&line){count++;line=word;}else line=next;});return count;};
    const panel=(label,content,top,tint='#ffffff')=>{const height=Math.max(178,132+lineCount(content,w-260,'600',39)*58);ctx.fillStyle=tint;ctx.beginPath();ctx.roundRect(70,top,w-140,height,28);ctx.fill();ctx.fillStyle=accent;ctx.fillRect(rtl?70:w-116,top,46,height);ctx.textAlign=rtl?'right':'left';ctx.font=font('700',27);ctx.fillStyle=accent;ctx.fillText(label,x,top+54);return wrap(content,top+106,w-260,'600',39,'#18233f',58)+38;};
    y=465; y=panel(cardLabels.rule,card.rule,y,'#ffffff')+38;
    y=panel(cardLabels.letters,card.letters,y,soft)+42;
    const casesHeight=104+card.cases.reduce((sum,group)=>sum+60+group.examples.reduce((height,example)=>height+lineCount(`• ${example}`,w-260,'500',35)*52+16,0)+24,0)+28;
    ctx.fillStyle=dark;ctx.beginPath();ctx.roundRect(70,y,w-140,casesHeight,28);ctx.fill();ctx.textAlign=rtl?'right':'left';ctx.font=font('700',29);ctx.fillStyle='#f5c372';ctx.fillText(cardLabels.examples,x,y+57);y+=104;
    card.cases.forEach(group=>{ctx.textAlign=rtl?'right':'left';ctx.font=font('700',27);ctx.fillStyle='#d5f1ef';ctx.fillText(group.label,x,y);y+=42;group.examples.forEach(example=>{y=wrap(`• ${example}`,y,w-260,'500',35,'#ffffff',52);y+=8;});y+=18;}); y+=28;
    if(card.note){const noteHeight=Math.max(160,126+lineCount(card.note,w-260,'500',34)*51);ctx.fillStyle='#fff8e8';ctx.beginPath();ctx.roundRect(70,y,w-140,noteHeight,28);ctx.fill();ctx.textAlign=rtl?'right':'left';ctx.font=font('700',28);ctx.fillStyle='#9a6515';ctx.fillText(cardLabels.note,x,y+52);y=wrap(card.note,y+102,w-260,'500',34,'#5f4818',51);}
    ctx.textAlign='center';ctx.font=font('600',26);ctx.fillStyle='#5d6682';ctx.fillText('NovaSkill Tech · 2026',w/2,h-66);
    return canvas;
  };
  function downloadCard(card,index,format){const canvas=cardCanvas(card,index), type=format==='jpeg'?'image/jpeg':'image/png', extension=format==='jpeg'?'jpg':'png'; canvas.toBlob(blob=>{if(!blob)return; const link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download=`tuhfat-al-atfal-fiche-${String(index+1).padStart(2,'0')}.${extension}`;link.click();setTimeout(()=>URL.revokeObjectURL(link.href),500);},type,.94);}
  document.addEventListener('click', e => { const all=e.target.closest('[data-download="all"]'); const button=e.target.closest('[data-card-download]'); if(all){document.querySelector('#cards')?.scrollIntoView({behavior:'smooth'});return;} if(button)downloadCard(normalizedCards[Number(button.dataset.cardDownload)],Number(button.dataset.cardDownload),button.dataset.format); });
  let step=0, locked=false; function renderQuiz(){ const item=d.quiz[step]; $('#quiz-progress').textContent=`${u.quizQuestion} ${step+1} ${u.of} ${d.quiz.length}`; $('#quiz-box').innerHTML=`<p class="quiz-question">${escape(item.q)}</p>${item.a.map((a,i)=>`<button class="answer" data-answer="${i}">${escape(a)}</button>`).join('')}<div class="feedback" aria-live="polite"></div>`; }
  $('#quiz-box').addEventListener('click', e => { const b=e.target.closest('[data-answer]'); if(!b||locked)return; locked=true; const item=d.quiz[step], chosen=Number(b.dataset.answer), answers=[...$('#quiz-box').querySelectorAll('.answer')]; answers[item.ok].classList.add('correct'); if(chosen!==item.ok)b.classList.add('wrong'); const feedback=$('.feedback'); feedback.textContent=chosen===item.ok?`${u.correct} ${item.why}`:`${u.retry} ${item.why}`; const next=document.createElement('button'); next.className='button secondary next'; next.textContent=step===d.quiz.length-1?u.restart:u.next; next.onclick=()=>{step=step===d.quiz.length-1?0:step+1;locked=false;renderQuiz();}; feedback.after(next); }); renderQuiz();
})();
