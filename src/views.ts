import { MODELS, CATEGORIES, type Model } from "./models.gen";
import { BASE, CATEGORY_COLOUR, esc, page } from "./ui";


/** Shared by the guide and settings pages. The key lives in this browser only:
 *  localStorage, sent as a header on the two AI calls, never posted anywhere
 *  else and never stored server-side. */
const KEY_JS = `
var LS='mm.creds';
function loadCreds(){try{return JSON.parse(localStorage.getItem(LS)||'null')}catch(e){return null}}
function saveCreds(c){try{localStorage.setItem(LS,JSON.stringify(c))}catch(e){}}
function clearCreds(){try{localStorage.removeItem(LS)}catch(e){}}
function keyHeaders(){
  var h={'content-type':'application/json'}, c=loadCreds();
  if(c&&c.apiKey){
    h['x-llm-key']=c.apiKey;
    h['x-llm-provider']=c.provider||'anthropic';
    if(c.model)h['x-llm-model']=c.model;
    if(c.baseUrl)h['x-llm-base-url']=c.baseUrl;
  }
  return h;
}
`;

const colour = (cat: string) => CATEGORY_COLOUR[cat] ?? "#2563eb";

export const cardHtml = (m: Model) => `
<a class="card" style="--c:${colour(m.category)}" href="${BASE}/m/${m.id}"
   data-cat="${esc(m.category)}" data-hay="${esc((m.title + " " + m.blurb + " " + m.question + " " + m.description).toLowerCase())}">
  <div class="ico" aria-hidden="true">${m.icon}</div>
  <div class="cat">${esc(m.category)}</div>
  <h3>${esc(m.title)}</h3>
  <p>${esc(m.blurb)}</p>
</a>`;

/* ─── / — the catalogue ─── */
export function browse(): Response {
  const chips = ["All", ...CATEGORIES]
    .map(
      (c, i) =>
        `<button class="chip" data-c="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}</button>`,
    )
    .join("");

  const body = `
<div class="wrap">
  <section class="hero">
    <h1>Curated collection of thinking tools</h1>
    <p>Sixty models for solving problems, making decisions, understanding systems and
       saying the thing properly. Pick one, or let the guide find it for you.</p>
    <a class="cta" href="${BASE}/guide">Help me think this through &rarr;</a>
  </section>
  <div class="controls">${chips}
    <input id="q" type="search" placeholder="Search tools" autocomplete="off" spellcheck="false">
  </div>
  <div class="count" id="count"></div>
  <div class="grid" id="grid">${MODELS.map(cardHtml).join("")}</div>
  <div class="empty" id="empty" hidden>Nothing matches. Try a broader word, or
    <a href="${BASE}/guide">describe it in your own words</a>.</div>
</div>`;

  const script = `
(function(){
  var cards=[].slice.call(document.querySelectorAll('.card'));
  var chips=[].slice.call(document.querySelectorAll('.chip'));
  var q=document.getElementById('q'), count=document.getElementById('count'), empty=document.getElementById('empty');
  var want=new URLSearchParams(location.search).get('c');
  var cat=(want&&chips.some(function(b){return b.dataset.c===want}))?want:'All';
  chips.forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.c===cat))});
  function apply(){
    var t=q.value.trim().toLowerCase(), n=0;
    cards.forEach(function(c){
      var ok=(cat==='All'||c.dataset.cat===cat)&&(!t||c.dataset.hay.indexOf(t)>-1);
      c.hidden=!ok; if(ok)n++;
    });
    count.textContent=n+(n===1?' tool':' tools')+(cat==='All'?'':' in '+cat);
    empty.hidden=n>0;
  }
  chips.forEach(function(b){b.addEventListener('click',function(){
    cat=b.dataset.c; chips.forEach(function(x){x.setAttribute('aria-pressed',String(x===b))}); apply();
  })});
  q.addEventListener('input',apply);
  apply();
})();`;

  return page({ title: "Browse", nav: "browse", body, script });
}

/* ─── /m/:id — one model ─── */
export function modelPage(m: Model): Response {
  // Models this one actually cross-references come first — they are the
  // deliberate links in the prose — then same-category ones fill the rail.
  const linked = new Set(
    [...m.html.matchAll(/\/tools\/models\/m\/([a-z0-9-]+)"/g)].map((x) => x[1]),
  );
  const related = [
    ...MODELS.filter((o) => o.id !== m.id && linked.has(o.id)),
    ...MODELS.filter((o) => o.id !== m.id && !linked.has(o.id) && o.category === m.category),
  ].slice(0, 4);

  const body = `
<div class="prose-wrap" style="--c:${colour(m.category)}">
  <div class="crumb"><a href="${BASE}">Mental Models</a> <span>&rsaquo;</span>
    <a href="${BASE}?c=${encodeURIComponent(m.category)}">${esc(m.category)}</a>
    <span>&rsaquo;</span> <span>${esc(m.title)}</span></div>
  <div class="title">
    <div class="ico hero-ico" aria-hidden="true">${m.icon}</div>
    <div class="cat">${esc(m.category)}</div>
    <h1>${esc(m.title)}</h1>
    <p class="lede">${esc(m.blurb)}</p>
  </div>
  <article class="prose">${m.html}</article>
</div>
${
  related.length
    ? `<div class="wrap"><div class="rail"><h4>Related tools</h4>
       <div class="grid">${related.map(cardHtml).join("")}</div></div></div>`
    : ""
}`;
  return page({ title: m.title, nav: "browse", body });
}

/* ─── /guide — the guided flow ─── */
export function guide(): Response {
  // Seeded from real work, so the first click lands somewhere recognisable
  // rather than in a textbook example.
  const seeds = [
    "The same thing keeps going wrong and we keep fixing it the same way",
    "I have to give someone difficult feedback and I've been putting it off",
    "I can't choose between two options and I've been stuck for weeks",
    "Two of us disagree and neither will move",
    "I don't understand how this system actually works",
    "I need to write this up and I can't get past the first line",
    "Everything we've come up with is the obvious answer",
    "I'm busy all day and nothing important gets done",
  ];


  const body = `
<div class="guide">
  <h1>What's on your mind?</h1>
  <p class="sub">Describe it however it sits in your head. It doesn't have to be a decision,
     and it doesn't have to be tidy. The guide will find the tools that fit and tell you where to start.</p>
  <div class="nokey" id="nokey" hidden>
    <strong>No model key set.</strong> You'll get a rough keyword match.
    <a href="${BASE}/settings">Add your own key</a> for a proper reading — it stays in your browser.
  </div>
  <textarea id="ask" placeholder="e.g. the same thing keeps going wrong and nobody can tell me why"></textarea>
  <div class="seeds">${seeds.map((s) => `<button class="seed">${esc(s)}</button>`).join("")}</div>
  <div class="row"><button class="go" id="go">Find my tools</button>
    <span class="hint" id="hint">Enter to send, Shift+Enter for a new line</span></div>
  <div id="thread"></div>
</div>`;

  const script = `
${KEY_JS}
(function(){
  var ask=document.getElementById('ask'), go=document.getElementById('go'),
      thread=document.getElementById('thread'), hint=document.getElementById('hint');
  var history=[];
  [].slice.call(document.querySelectorAll('.seed')).forEach(function(b){
    b.addEventListener('click',function(){ask.value=b.textContent;ask.focus();});
  });
  ask.addEventListener('keydown',function(e){
    if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}
  });
  go.addEventListener('click',send);
  function el(h){var d=document.createElement('div');d.innerHTML=h.trim();return d.firstChild;}
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function send(){
    var text=ask.value.trim(); if(!text) return;
    history.push({role:'user',content:text});
    thread.appendChild(el('<div class="turn you"><div class="who">You</div><p>'+esc(text)+'</p></div>'));
    ask.value=''; go.disabled=true; hint.innerHTML='<span class="spin"></span> thinking';
    var wait=el('<div class="turn"><div class="who">Guide</div><p class="hint">Reading it back to you…</p></div>');
    thread.appendChild(wait); wait.scrollIntoView({behavior:'smooth',block:'center'});
    fetch('${BASE}/api/guide',{method:'POST',headers:keyHeaders(),
      body:JSON.stringify({history:history})})
    .then(function(r){return r.json()})
    .then(function(d){
      wait.remove(); go.disabled=false; hint.textContent='Enter to send, Shift+Enter for a new line';
      if(d.error){thread.appendChild(el('<div class="err">'+esc(d.error)+'</div>'));return;}
      history.push({role:'assistant',content:d.raw||''});
      var h='<div class="turn"><div class="who">Guide</div><p>'+esc(d.reading||'')+'</p></div>';
      thread.appendChild(el(h));
      if(d.followUp){
        thread.appendChild(el('<div class="turn"><div class="who">One more thing</div><p>'+esc(d.followUp)+'</p></div>'));
        ask.placeholder=d.followUp; ask.focus();
      }
      (d.picks||[]).forEach(function(p,i){
        var box=el('<div class="pick'+(i===0?' primary':'')+'" style="--c:'+esc(p.colour)+'">'+
          '<div class="ico">'+p.icon+'</div>'+
          '<div class="cat">'+esc(p.category)+(i===0?' &middot; start here':'')+'</div>'+
          '<h3>'+esc(p.title)+'</h3>'+
          '<p class="why">'+esc(p.why)+'</p>'+
          (p.first?'<div class="first"><b>First move</b>'+esc(p.first)+'</div>':'')+
          '<a class="open" href="'+esc(p.href)+'">Open the full method &rarr;</a>'+
          '<button class="work" data-id="'+esc(p.id)+'" data-colour="'+esc(p.colour)+'">Work it through &rarr;</button>'+
          '</div>');
        box.querySelector('.work').addEventListener('click',function(e){work(e.target,p);});
        thread.appendChild(box);
      });
      thread.lastChild.scrollIntoView({behavior:'smooth',block:'nearest'});
    })
    .catch(function(){wait.remove();go.disabled=false;hint.textContent='';
      thread.appendChild(el('<div class="err">Could not reach the guide. Try again.</div>'));});
  }
  function work(btn,pick){
    btn.disabled=true; var old=btn.textContent; btn.innerHTML='<span class="spin"></span> working it through';
    var said=history.filter(function(t){return t.role==='user'});
    fetch('${BASE}/api/report',{method:'POST',headers:keyHeaders(),
      body:JSON.stringify({history:said,modelId:pick.id})})
    .then(function(r){return r.json()})
    .then(function(d){
      btn.textContent=old;
      if(d.error){btn.disabled=false;
        btn.parentNode.parentNode.insertBefore(el('<div class="err">'+esc(d.error)+'</div>'),btn.parentNode.nextSibling);return;}
      btn.textContent='Worked through';
      var h='<div class="report" style="--c:'+esc(pick.colour)+'">'+
        '<div class="kicker">'+esc(d.modelTitle)+' &middot; applied to your situation</div>'+
        '<h2>'+esc(d.title)+'</h2>'+
        (d.situation?'<p class="situ">'+esc(d.situation)+'</p>':'');
      (d.sections||[]).forEach(function(s){
        h+='<h3>'+esc(s.heading)+'</h3>'+s.html;   // server-sanitised allowlist
      });
      if((d.next||[]).length){h+='<div class="next"><h3>Do this next</h3><ol>'+
        d.next.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ol></div>';}
      if((d.gaps||[]).length){h+='<div class="gaps"><h3>I had to guess these</h3><ul>'+
        d.gaps.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul></div>';}
      if(d.watchOut){h+='<p class="watch"><strong>Where this could be wrong.</strong> '+esc(d.watchOut)+'</p>';}
      h+='<div class="acts"><button class="cp">Copy as text</button><button class="pr">Print / PDF</button></div></div>';
      var rep=el(h);
      rep.querySelector('.cp').addEventListener('click',function(ev){
        var L=[d.title,'','('+d.modelTitle+' applied to your situation)',''];
        if(d.situation)L.push(d.situation,'');
        (d.sections||[]).forEach(function(s){
          L.push(s.heading.toUpperCase(),'');
          var tmp=document.createElement('div'); tmp.innerHTML=s.html;
          tmp.style.cssText='position:absolute;left:-9999px;top:0;white-space:pre-wrap';
          document.body.appendChild(tmp);            // detached innerText loses line breaks
          L.push(tmp.innerText.trim(),''); tmp.remove();
        });
        if((d.next||[]).length){L.push('DO THIS NEXT','');
          d.next.forEach(function(x,i){L.push((i+1)+'. '+x)}); L.push('');}
        if((d.gaps||[]).length){L.push('I HAD TO GUESS THESE','');
          d.gaps.forEach(function(x){L.push('- '+x)}); L.push('');}
        if(d.watchOut)L.push('WHERE THIS COULD BE WRONG','',d.watchOut);
        var t=L.join(String.fromCharCode(10)).trim();
        navigator.clipboard.writeText(t).then(function(){
          ev.target.textContent='Copied'; setTimeout(function(){ev.target.textContent='Copy as text'},1600);});
      });
      rep.querySelector('.pr').addEventListener('click',function(){window.print()});
      btn.parentNode.parentNode.insertBefore(rep,btn.parentNode.nextSibling);
      rep.scrollIntoView({behavior:'smooth',block:'start'});
    })
    .catch(function(){btn.disabled=false;btn.textContent=old;
      btn.parentNode.parentNode.insertBefore(el('<div class="err">Could not build the report. Try again.</div>'),btn.parentNode.nextSibling);});
  }
  // Nag for a key only when neither the reader nor the deployment has one.
  if(!loadCreds()){
    fetch('${BASE}/api/config').then(function(r){return r.json()}).then(function(c){
      if(c.serverKey) return;
      var b=document.getElementById('nokey'); if(b) b.hidden=false;
    }).catch(function(){});
  }
  ask.focus();
})();`;

  return page({ title: "Help me think", nav: "guide", body, script });
}


/* ─── /settings — bring your own key ─── */
export function settings(): Response {
  const body = `
<div class="guide">
  <h1>Your model key</h1>
  <p class="sub">The router and the report step need a model. Use your own key and it stays
     in this browser — saved to localStorage, sent as a header on those two requests, and
     never stored, logged or persisted by the server.</p>

  <div class="field">
    <label for="prov">Provider</label>
    <select id="prov">
      <option value="anthropic">Anthropic</option>
      <option value="openai-compatible">OpenAI-compatible (OpenRouter, Groq, Together, local)</option>
    </select>
  </div>

  <div class="field">
    <label for="key">API key</label>
    <input id="key" type="password" autocomplete="off" spellcheck="false"
           placeholder="sk-...">
    <p class="note" id="keynote"></p>
  </div>

  <div class="field">
    <label for="model">Model <span class="opt">optional</span></label>
    <input id="model" type="text" autocomplete="off" spellcheck="false">
    <p class="note" id="modelnote"></p>
  </div>

  <div class="field" id="basewrap" hidden>
    <label for="base">Base URL <span class="opt">optional</span></label>
    <input id="base" type="text" autocomplete="off" spellcheck="false"
           placeholder="https://openrouter.ai/api">
    <p class="note">Anything that speaks the OpenAI chat-completions API.</p>
  </div>

  <div class="row">
    <button class="go" id="save">Save key</button>
    <button class="ghost" id="test">Test it</button>
    <button class="ghost" id="forget">Forget key</button>
    <span class="hint" id="status"></span>
  </div>

  <div class="privacy">
    <h3>What happens to the key</h3>
    <ul>
      <li>Stored in <code>localStorage</code> on this device. Not a cookie, so it is never sent automatically.</li>
      <li>Attached to exactly two requests — routing and the report — and used once each.</li>
      <li>Never written to a database or a log. This deployment has no database.</li>
      <li>Clearing it here, or your browser data, removes it completely.</li>
      <li>Browsing the sixty models needs no key at all.</li>
    </ul>
  </div>
</div>`;

  const script = `
${KEY_JS}
(function(){
  var prov=document.getElementById('prov'), key=document.getElementById('key'),
      model=document.getElementById('model'), base=document.getElementById('base'),
      basewrap=document.getElementById('basewrap'), status=document.getElementById('status');
  var HINTS={
    'anthropic':{key:'From console.anthropic.com. Starts sk-ant-.',
                 model:'Defaults to Claude Haiku for routing and Sonnet for the report.'},
    'openai-compatible':{key:'From your provider. OpenRouter keys start sk-or-.',
                 model:'Defaults to z-ai/glm-5.3-flash on OpenRouter.'}
  };
  function hints(){
    var h=HINTS[prov.value];
    document.getElementById('keynote').textContent=h.key;
    document.getElementById('modelnote').textContent=h.model;
    basewrap.hidden = prov.value!=='openai-compatible';
  }
  var c=loadCreds();
  if(c){prov.value=c.provider||'anthropic'; key.value=c.apiKey||''; model.value=c.model||''; base.value=c.baseUrl||'';}
  hints(); prov.addEventListener('change',hints);
  function current(){
    return {provider:prov.value, apiKey:key.value.trim(),
            model:model.value.trim()||undefined, baseUrl:base.value.trim()||undefined};
  }
  function say(t,ok){status.textContent=t; status.className='hint'+(ok===false?' bad':ok?' good':'');}
  document.getElementById('save').addEventListener('click',function(){
    var v=current();
    if(!v.apiKey){say('Enter a key first.',false);return;}
    saveCreds(v); say('Saved to this browser.',true);
  });
  document.getElementById('forget').addEventListener('click',function(){
    clearCreds(); key.value=''; model.value=''; base.value=''; say('Forgotten.',true);
  });
  document.getElementById('test').addEventListener('click',function(){
    var v=current();
    if(!v.apiKey){say('Enter a key first.',false);return;}
    saveCreds(v); say('Testing…');
    fetch('${BASE}/api/guide',{method:'POST',headers:keyHeaders(),
      body:JSON.stringify({history:[{role:'user',content:'I keep putting off a difficult conversation'}]})})
    .then(function(r){return r.json()})
    .then(function(d){
      if(d.degraded==='auth') return say('Key rejected by the provider.',false);
      if(d.degraded) return say('Could not reach the model ('+d.degraded+').',false);
      say('Working. Routed to: '+(d.picks||[]).map(function(p){return p.title}).join(', '),true);
    })
    .catch(function(){say('Request failed.',false)});
  });
})();`;

  return page({ title: "Settings", nav: "settings", body, script });
}

export function notFound(): Response {
  const body = `<div class="wrap"><section class="hero"><h1>No such tool</h1>
    <p>That model isn't in the library. <a href="${BASE}">Back to all sixty</a>.</p></section></div>`;
  const r = page({ title: "Not found", nav: "browse", body });
  return new Response(r.body, { status: 404, headers: r.headers });
}
