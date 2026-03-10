[index.html](https://github.com/user-attachments/files/25859683/index.html)
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ZUNGU 2027 — Stage Architecture</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap" rel="stylesheet">
<style>
  :root {
    --ink: #080806;
    --paper: #f4efe6;
    --gold: #c8a96e;
    --forest: #1a3a2a;
    --origins-amber: #d4722a;
    --rebirth-purple: #7b3fa0;
    --rebirth-light: #b06ad0;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { background: var(--ink); color: var(--paper); font-family: 'DM Mono', monospace; overflow-x: hidden; }

  /* HERO */
  .hero {
    min-height: 100vh;
    background: var(--forest);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 5rem;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 80% 20%, rgba(212,114,42,0.08) 0%, transparent 60%),
      radial-gradient(ellipse 60% 60% at 10% 80%, rgba(123,63,160,0.08) 0%, transparent 60%);
  }
  .hero-content { position: relative; }
  .eyebrow { font-size:0.5rem; letter-spacing:0.45em; text-transform:uppercase; color:var(--gold); margin-bottom:2rem; }
  .hero-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(4rem,10vw,9rem); line-height:0.87; margin-bottom:1.5rem; }
  .hero-title .g { color:var(--gold); }
  .hero-title .d { color:rgba(244,239,230,0.25); }
  .hero-deck { font-family:'Cormorant Garamond',serif; font-size:1.25rem; font-style:italic; font-weight:300; color:rgba(244,239,230,0.45); max-width:520px; line-height:1.65; margin-bottom:3.5rem; }
  .hero-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:rgba(200,169,110,0.15); border:1px solid rgba(200,169,110,0.15); max-width:680px; }
  .hg-cell { padding:1.2rem 1.5rem; background:rgba(8,8,6,0.7); }
  .hg-label { font-size:0.42rem; letter-spacing:0.3em; text-transform:uppercase; color:var(--gold); display:block; margin-bottom:0.35rem; }
  .hg-val { font-size:0.65rem; line-height:1.4; color:var(--paper); }

  /* NAV */
  .nav { position:sticky; top:0; z-index:100; background:rgba(8,8,6,0.95); backdrop-filter:blur(8px); border-bottom:1px solid rgba(200,169,110,0.12); display:flex; overflow-x:auto; padding:0 2rem; }
  .nav-btn { flex:none; padding:1rem 1.4rem; font-family:'DM Mono',monospace; font-size:0.48rem; letter-spacing:0.2em; text-transform:uppercase; color:rgba(244,239,230,0.3); background:none; border:none; border-bottom:2px solid transparent; cursor:pointer; transition:all 0.2s; white-space:nowrap; }
  .nav-btn:hover { color:var(--gold); }
  .nav-btn.active { color:var(--gold); border-bottom-color:var(--gold); }

  /* SHARED */
  .sec { padding:5.5rem 5rem; }
  .s-label { font-size:0.48rem; letter-spacing:0.35em; text-transform:uppercase; color:var(--gold); display:block; margin-bottom:0.8rem; }
  .s-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(2.5rem,5vw,4.8rem); line-height:0.9; margin-bottom:0.5rem; }
  .divider { width:48px; height:1px; background:var(--gold); margin:2rem 0 3rem; }

  /* MAP */
  .map-sec { background:#050806; padding:5.5rem 5rem; }
  .map-wrap { position:relative; margin-top:3rem; background:#080e0a; border:1px solid rgba(200,169,110,0.08); padding:3rem; }
  .map-svg { width:100%; max-width:860px; margin:0 auto; display:block; }
  .map-legend { display:flex; gap:2rem; margin-top:2rem; flex-wrap:wrap; justify-content:center; }
  .ml-item { display:flex; align-items:center; gap:0.5rem; font-size:0.48rem; letter-spacing:0.15em; text-transform:uppercase; color:rgba(244,239,230,0.4); }
  .ml-dot { width:9px; height:9px; border-radius:50%; flex-shrink:0; }

  /* STAGES */
  .stages-sec { background:var(--ink); padding:5.5rem 5rem; }
  .stages-grid { display:grid; grid-template-columns:1fr; gap:2px; margin-top:3rem; }
  .stage-card { position:relative; overflow:hidden; }

  .sc-main { background:linear-gradient(135deg,#0c1f16,#060e09); border-left:4px solid var(--gold); }
  .sc-origins { background:linear-gradient(135deg,#1a0d04,#0d0704); border-left:4px solid var(--origins-amber); }
  .sc-rebirth { background:linear-gradient(135deg,#130810,#080410); border-left:4px solid var(--rebirth-purple); }

  .sc-inner { padding:3.5rem 4rem; }
  .sc-tag { font-size:0.42rem; letter-spacing:0.3em; text-transform:uppercase; padding:0.3rem 0.7rem; border:1px solid; display:inline-block; margin-bottom:1.3rem; }
  .sc-main .sc-tag { color:var(--gold); border-color:rgba(200,169,110,0.35); }
  .sc-origins .sc-tag { color:var(--origins-amber); border-color:rgba(212,114,42,0.35); }
  .sc-rebirth .sc-tag { color:var(--rebirth-light); border-color:rgba(176,106,208,0.35); }

  .sc-name { font-family:'Bebas Neue',sans-serif; font-size:clamp(2.8rem,5.5vw,5.5rem); line-height:0.88; margin-bottom:0.4rem; }
  .sc-main .sc-name { color:var(--gold); }
  .sc-origins .sc-name { color:var(--origins-amber); }
  .sc-rebirth .sc-name { color:var(--rebirth-light); }

  .sc-sub { font-family:'Cormorant Garamond',serif; font-size:1.2rem; font-style:italic; font-weight:300; color:rgba(244,239,230,0.4); margin-bottom:2.5rem; }

  .sc-body { display:grid; grid-template-columns:1.3fr 0.9fr 0.8fr; gap:3rem; }
  .sc-desc { font-family:'Cormorant Garamond',serif; font-size:1rem; line-height:1.8; color:rgba(244,239,230,0.6); }
  .sc-desc strong { color:var(--paper); }

  .sc-specs { display:flex; flex-direction:column; gap:1.2rem; }
  .spec-label { font-size:0.42rem; letter-spacing:0.25em; text-transform:uppercase; color:rgba(200,169,110,0.45); display:block; margin-bottom:0.25rem; }
  .spec-val { font-size:0.6rem; color:rgba(244,239,230,0.7); line-height:1.5; }

  .sc-vibes { display:flex; flex-direction:column; gap:0.55rem; }
  .vibe { font-size:0.48rem; letter-spacing:0.12em; text-transform:uppercase; padding:0.35rem 0.7rem; border:1px solid rgba(244,239,230,0.06); color:rgba(244,239,230,0.3); width:fit-content; }
  .sc-main .vibe.on { border-color:rgba(200,169,110,0.35); color:var(--gold); }
  .sc-origins .vibe.on { border-color:rgba(212,114,42,0.35); color:var(--origins-amber); }
  .sc-rebirth .vibe.on { border-color:rgba(176,106,208,0.35); color:var(--rebirth-light); }

  .prod-bar { margin-top:2.5rem; padding-top:1.8rem; border-top:1px solid rgba(244,239,230,0.05); display:flex; gap:1.5rem; flex-wrap:wrap; }
  .prod-item { font-size:0.48rem; letter-spacing:0.08em; color:rgba(244,239,230,0.25); display:flex; align-items:center; gap:0.4rem; }
  .prod-item::before { content:'●'; font-size:0.3rem; color:var(--gold); opacity:0.4; }

  /* NIGHTS */
  .night-block { min-height:100vh; padding:5.5rem 5rem; position:relative; overflow:hidden; display:flex; flex-direction:column; }
  .nb-1 { background:#0c0804; }
  .nb-2 { background:#060c14; }
  .nb-3 { background:#040e09; }
  .nb-4 { background:#08040e; }
  .nb-1::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 80% 60% at 80% 40%, rgba(212,114,42,0.09) 0%, transparent 60%); }
  .nb-2::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 80% 60% at 20% 40%, rgba(29,100,180,0.1) 0%, transparent 60%); }
  .nb-3::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 80% 60% at 60% 30%, rgba(26,58,42,0.2) 0%, transparent 60%); }
  .nb-4::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 80% 60% at 40% 60%, rgba(80,30,120,0.12) 0%, transparent 60%); }

  .nb-bg-num { font-family:'Bebas Neue',sans-serif; font-size:14rem; line-height:1; position:absolute; right:4rem; top:2rem; opacity:0.035; pointer-events:none; }
  .night-content { position:relative; z-index:2; }

  .night-meta { display:flex; align-items:center; gap:1.8rem; margin-bottom:1.2rem; flex-wrap:wrap; }
  .night-date { font-size:0.48rem; letter-spacing:0.3em; text-transform:uppercase; color:rgba(200,169,110,0.45); }
  .night-ctag { font-size:0.45rem; letter-spacing:0.2em; text-transform:uppercase; padding:0.28rem 0.7rem; border:1px solid; }
  .nb-1 .night-ctag { color:var(--origins-amber); border-color:rgba(212,114,42,0.35); }
  .nb-2 .night-ctag { color:#5a9fd4; border-color:rgba(90,159,212,0.35); }
  .nb-3 .night-ctag { color:#5ad4a0; border-color:rgba(90,212,160,0.35); }
  .nb-4 .night-ctag { color:var(--rebirth-light); border-color:rgba(176,106,208,0.35); }

  .night-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(3.5rem,7vw,7rem); line-height:0.87; margin-bottom:0.4rem; }
  .nb-1 .night-title { color:var(--origins-amber); }
  .nb-2 .night-title { color:#5a9fd4; }
  .nb-3 .night-title { color:#5ad4a0; }
  .nb-4 .night-title { color:var(--rebirth-light); }

  .night-tagline { font-family:'Cormorant Garamond',serif; font-size:1.3rem; font-style:italic; font-weight:300; color:rgba(244,239,230,0.4); max-width:580px; line-height:1.55; margin-bottom:2.5rem; }

  .night-grid { display:grid; grid-template-columns:1.4fr 1fr; gap:4rem; }
  .night-narrative { font-family:'Cormorant Garamond',serif; font-size:1.05rem; line-height:1.8; color:rgba(244,239,230,0.58); }
  .night-narrative strong { color:var(--paper); }
  .night-narrative p+p { margin-top:1.2rem; }

  /* Visual concept box */
  .vis-concept { margin-top:2.5rem; padding:1.8rem; border:1px solid rgba(244,239,230,0.06); background:rgba(0,0,0,0.2); }
  .vc-label { font-size:0.42rem; letter-spacing:0.3em; text-transform:uppercase; color:var(--gold); display:block; margin-bottom:1rem; }
  .vc-grid { display:grid; grid-template-columns:1fr 1fr; gap:0.8rem; }
  .vc-item { padding:0.9rem; background:rgba(244,239,230,0.02); border:1px solid rgba(244,239,230,0.04); }
  .vc-asp { font-size:0.4rem; letter-spacing:0.2em; text-transform:uppercase; color:rgba(200,169,110,0.35); display:block; margin-bottom:0.35rem; }
  .vc-val { font-family:'Cormorant Garamond',serif; font-size:0.9rem; color:rgba(244,239,230,0.6); line-height:1.4; }

  /* Run sheet */
  .runsheet { background:rgba(0,0,0,0.35); border:1px solid rgba(244,239,230,0.05); }
  .rs-head { display:grid; grid-template-columns:64px 1fr 68px; gap:1rem; padding:0.75rem 1.1rem; border-bottom:1px solid rgba(244,239,230,0.06); font-size:0.42rem; letter-spacing:0.22em; text-transform:uppercase; color:rgba(200,169,110,0.4); }
  .rs-row { display:grid; grid-template-columns:64px 1fr 68px; gap:1rem; padding:0.85rem 1.1rem; border-bottom:1px solid rgba(244,239,230,0.04); align-items:start; transition:background 0.2s; }
  .rs-row:hover { background:rgba(244,239,230,0.02); }
  .rs-row.hl { border-left:2px solid; }
  .nb-1 .rs-row.hl { border-left-color:var(--origins-amber); background:rgba(212,114,42,0.05); }
  .nb-2 .rs-row.hl { border-left-color:#5a9fd4; background:rgba(90,159,212,0.05); }
  .nb-3 .rs-row.hl { border-left-color:#5ad4a0; background:rgba(90,212,160,0.05); }
  .nb-4 .rs-row.hl { border-left-color:var(--rebirth-light); background:rgba(176,106,208,0.05); }
  .rs-row.hoff { background:rgba(200,169,110,0.04); border-bottom:1px solid rgba(200,169,110,0.1); }
  .rs-t { font-size:0.52rem; color:rgba(200,169,110,0.45); padding-top:0.1rem; font-variant-numeric:tabular-nums; }
  .rs-act-name { font-size:0.58rem; color:var(--paper); display:block; margin-bottom:0.18rem; }
  .rs-act-detail { font-size:0.47rem; color:rgba(244,239,230,0.32); line-height:1.35; }
  .rs-stage { font-size:0.42rem; letter-spacing:0.1em; text-transform:uppercase; color:rgba(244,239,230,0.2); text-align:right; padding-top:0.1rem; }
  .rs-stage.m { color:rgba(200,169,110,0.45); }
  .rs-stage.o { color:rgba(212,114,42,0.45); }
  .rs-stage.r { color:rgba(176,106,208,0.45); }

  /* HANDOFF */
  .handoff-sec { background:#050806; padding:5.5rem 5rem; }
  .handoff-two { display:grid; grid-template-columns:1fr 1fr; gap:4rem; }
  .hd-line { display:grid; grid-template-columns:72px 1fr; gap:0; }
  .hd-time { font-size:0.52rem; color:rgba(200,169,110,0.38); padding:0.9rem 1rem 0.9rem 0; text-align:right; border-right:1px solid rgba(200,169,110,0.1); position:relative; }
  .hd-time.key { color:var(--gold); }
  .hd-time::after { content:''; position:absolute; right:-4px; top:50%; transform:translateY(-50%); width:7px; height:7px; border-radius:50%; background:rgba(200,169,110,0.25); }
  .hd-time.key::after { background:var(--gold); width:9px; height:9px; right:-5px; }
  .hd-ev { padding:0.85rem 0 0.85rem 1.8rem; font-size:0.57rem; color:rgba(244,239,230,0.45); border-bottom:1px solid rgba(244,239,230,0.03); line-height:1.55; }
  .hd-ev strong { color:var(--paper); display:block; margin-bottom:0.2rem; }
  .hd-ev.mo strong { color:var(--origins-amber); }
  .hd-ev.mr strong { color:var(--rebirth-light); }
  .hd-ev.mm strong { color:var(--gold); }
  .hd-ev.ritual { background:rgba(200,169,110,0.04); border-left:2px solid rgba(200,169,110,0.3); padding-left:calc(1.8rem - 2px); color:rgba(200,169,110,0.6); }
  .hd-ev.ritual strong { color:var(--gold); }

  /* Rules box */
  .rules-box { padding:2rem; border:1px solid rgba(200,169,110,0.1); background:rgba(200,169,110,0.025); margin-bottom:1.5rem; }
  .rb-label { font-size:0.42rem; letter-spacing:0.3em; text-transform:uppercase; color:var(--gold); display:block; margin-bottom:1rem; }
  .rb-rule { font-size:0.57rem; line-height:1.6; color:rgba(244,239,230,0.45); padding-left:1rem; border-left:2px solid rgba(200,169,110,0.25); margin-bottom:0.9rem; }
  .rb-rule strong { color:var(--paper); }

  /* Production table */
  .prod-table { border:1px solid rgba(244,239,230,0.06); }
  .pt-row { display:grid; grid-template-columns:100px 1fr; gap:0; border-bottom:1px solid rgba(244,239,230,0.04); }
  .pt-stage { padding:1rem; border-right:1px solid rgba(244,239,230,0.04); font-size:0.52rem; font-weight:700; display:flex; align-items:center; }
  .pt-stage.m { color:var(--gold); }
  .pt-stage.o { color:var(--origins-amber); }
  .pt-stage.r { color:var(--rebirth-light); }
  .pt-stage.p { color:rgba(244,239,230,0.3); }
  .pt-detail { padding:1rem 1.2rem; font-size:0.52rem; color:rgba(244,239,230,0.45); line-height:1.55; }

  /* FOOTER */
  .doc-footer { background:var(--ink); padding:3rem 5rem; border-top:1px solid rgba(200,169,110,0.1); display:flex; justify-content:space-between; align-items:flex-end; }
  .footer-brand { font-family:'Bebas Neue',sans-serif; font-size:1.8rem; color:rgba(200,169,110,0.18); }
  .footer-meta { font-size:0.42rem; letter-spacing:0.18em; color:rgba(244,239,230,0.13); text-align:right; line-height:2; }

  /* RESPONSIVE */
  @media(max-width:860px){
    .sec,.map-sec,.stages-sec,.night-block,.handoff-sec{padding:3rem 1.5rem;}
    .hero{padding:2rem;}
    .hero-grid{grid-template-columns:1fr;}
    .sc-body{grid-template-columns:1fr;gap:2rem;}
    .night-grid{grid-template-columns:1fr;gap:2rem;}
    .vc-grid{grid-template-columns:1fr 1fr;}
    .nb-bg-num{display:none;}
    .handoff-two{grid-template-columns:1fr;}
    .doc-footer{flex-direction:column;gap:1.5rem;}
    .footer-meta{text-align:left;}
  }
</style>
</head>
<body>

<!-- HERO -->
<div class="hero">
  <div class="hero-content">
    <div class="eyebrow">Stage Architecture · Navy Island · June 2027</div>
    <h1 class="hero-title">
      <span class="d">THREE</span><br>
      <span class="g">STAGES.</span><br>
      <span>ONE</span><br>
      <span class="d">ISLAND.</span>
    </h1>
    <p class="hero-deck">Origins catches the sunrise. Rebirth catches the sunset. Zungu Main owns the night. The island determines everything.</p>
    <div class="hero-grid">
      <div class="hg-cell">
        <span class="hg-label">Zungu Main</span>
        <span class="hg-val">South face · Full capacity<br>7pm – 6am · Headline stage</span>
      </div>
      <div class="hg-cell">
        <span class="hg-label">Origins</span>
        <span class="hg-val">East tip · 500 cap<br>6am – 10am · Sunrise / Jungle</span>
      </div>
      <div class="hg-cell">
        <span class="hg-label">Rebirth</span>
        <span class="hg-val">West end · 800 cap<br>4pm – 8pm · Sunset House</span>
      </div>
    </div>
  </div>
</div>

<!-- NAV -->
<nav class="nav">
  <button class="nav-btn active" onclick="goTo('#map')">Island Map</button>
  <button class="nav-btn" onclick="goTo('#stages')">Three Stages</button>
  <button class="nav-btn" onclick="goTo('#nights')">Four Nights</button>
  <button class="nav-btn" onclick="goTo('#handoff')">The Handoff</button>
</nav>

<!-- MAP -->
<div class="map-sec" id="map">
  <span class="s-label">01 — Site Architecture</span>
  <h2 class="s-title" style="color:var(--paper);">The Island<br><em style="font-family:'Cormorant Garamond',serif;font-style:italic;color:var(--gold);">Determines<br>Everything</em></h2>
  <div class="divider"></div>

  <div class="map-wrap">
    <svg class="map-svg" viewBox="0 0 820 360" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ig" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#2d5a3d" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#1a3a2a" stop-opacity="0.6"/>
        </radialGradient>
        <radialGradient id="sg" cx="0%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#e05a4a" stop-opacity="0.1"/>
          <stop offset="100%" stop-color="#e05a4a" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="rg" cx="100%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#f5c842" stop-opacity="0.1"/>
          <stop offset="100%" stop-color="#f5c842" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <!-- Sea -->
      <rect width="820" height="360" fill="#060d12"/>
      <!-- Atmospheric glows -->
      <rect width="820" height="360" fill="url(#sg)"/>
      <rect width="820" height="360" fill="url(#rg)"/>
      <!-- Water lines -->
      <g stroke="rgba(29,74,90,0.12)" stroke-width="0.5">
        <line x1="0" y1="72" x2="820" y2="72"/>
        <line x1="0" y1="144" x2="820" y2="144"/>
        <line x1="0" y1="216" x2="820" y2="216"/>
        <line x1="0" y1="288" x2="820" y2="288"/>
      </g>

      <!-- Island body — east-west elongated, based on actual Navy Island shape -->
      <path d="M130,195 C118,172 124,148 150,133 C172,120 208,112 255,105 C302,98 355,93 405,91 C455,89 500,92 538,100 C576,108 600,120 618,136 C636,152 640,170 632,186 C624,202 607,213 584,220 C561,227 532,231 500,234 C468,237 432,240 396,243 C360,246 323,249 290,251 C257,253 228,253 205,250 C182,247 160,241 145,231 C132,223 126,208 130,195 Z" fill="url(#ig)" stroke="rgba(200,169,110,0.18)" stroke-width="1.2"/>
      <!-- Northern peninsula -->
      <path d="M465,91 C474,76 488,60 506,53 C524,46 536,54 530,70 C524,83 508,88 488,91 Z" fill="#1a3a2a" fill-opacity="0.75" stroke="rgba(200,169,110,0.12)" stroke-width="1"/>

      <!-- Forest dots -->
      <g fill="#2d5a3d" fill-opacity="0.5">
        <circle cx="260" cy="162" r="8"/><circle cx="300" cy="152" r="6"/><circle cx="345" cy="155" r="9"/>
        <circle cx="385" cy="148" r="7"/><circle cx="320" cy="180" r="6"/><circle cx="360" cy="190" r="7"/>
        <circle cx="278" cy="190" r="5"/><circle cx="420" cy="162" r="7"/><circle cx="460" cy="152" r="8"/>
        <circle cx="440" cy="185" r="6"/><circle cx="488" cy="168" r="7"/><circle cx="400" cy="210" r="5"/>
        <circle cx="505" cy="178" r="8"/><circle cx="545" cy="162" r="6"/><circle cx="240" cy="210" r="6"/>
        <circle cx="565" cy="152" r="7"/><circle cx="330" cy="210" r="5"/><circle cx="475" cy="210" r="6"/>
      </g>

      <!-- ZUNGU MAIN — south centre, faces sea -->
      <g transform="translate(382,255)">
        <circle r="20" fill="rgba(200,169,110,0.15)" stroke="rgba(200,169,110,0.55)" stroke-width="1.5"/>
        <circle r="9" fill="rgba(200,169,110,0.9)"/>
        <line x1="0" y1="20" x2="0" y2="44" stroke="rgba(200,169,110,0.35)" stroke-width="1" stroke-dasharray="3,2"/>
        <text y="58" text-anchor="middle" fill="rgba(200,169,110,0.85)" font-size="10.5" font-family="'DM Mono',monospace" letter-spacing="1.5">ZUNGU MAIN</text>
        <text y="71" text-anchor="middle" fill="rgba(200,169,110,0.4)" font-size="8" font-family="'DM Mono',monospace">SOUTH · FULL PRODUCTION</text>
      </g>

      <!-- ORIGINS — east tip -->
      <g transform="translate(636,178)">
        <circle r="13" fill="rgba(212,114,42,0.15)" stroke="rgba(212,114,42,0.55)" stroke-width="1.5"/>
        <circle r="6" fill="rgba(212,114,42,0.9)"/>
        <line x1="13" y1="0" x2="42" y2="0" stroke="rgba(212,114,42,0.35)" stroke-width="1" stroke-dasharray="3,2"/>
        <text x="48" y="4" fill="rgba(212,114,42,0.85)" font-size="10.5" font-family="'DM Mono',monospace" letter-spacing="1.5">ORIGINS</text>
        <text x="48" y="17" fill="rgba(212,114,42,0.4)" font-size="8" font-family="'DM Mono',monospace">EAST TIP · SUNRISE</text>
      </g>

      <!-- REBIRTH — west end -->
      <g transform="translate(148,188)">
        <circle r="13" fill="rgba(123,63,160,0.15)" stroke="rgba(123,63,160,0.55)" stroke-width="1.5"/>
        <circle r="6" fill="rgba(123,63,160,0.9)"/>
        <line x1="-13" y1="0" x2="-42" y2="0" stroke="rgba(123,63,160,0.35)" stroke-width="1" stroke-dasharray="3,2"/>
        <text x="-48" y="4" text-anchor="end" fill="rgba(176,106,208,0.85)" font-size="10.5" font-family="'DM Mono',monospace" letter-spacing="1.5">REBIRTH</text>
        <text x="-48" y="17" text-anchor="end" fill="rgba(176,106,208,0.4)" font-size="8" font-family="'DM Mono',monospace">WEST · SUNSET</text>
      </g>

      <!-- Ferry dock -->
      <g transform="translate(382,318)">
        <rect x="-14" y="-5" width="28" height="9" fill="none" stroke="rgba(200,169,110,0.25)" stroke-width="1"/>
        <text y="20" text-anchor="middle" fill="rgba(200,169,110,0.22)" font-size="7.5" font-family="'DM Mono',monospace">FERRY DOCK</text>
      </g>

      <!-- Sun indicators -->
      <g transform="translate(776,178)" opacity="0.55">
        <circle r="11" fill="none" stroke="#f5c842" stroke-width="1" stroke-dasharray="3,3"/>
        <circle r="4.5" fill="#f5c842" fill-opacity="0.55"/>
        <text y="26" text-anchor="middle" fill="#f5c842" font-size="7.5" font-family="'DM Mono',monospace">SUNRISE →</text>
      </g>
      <g transform="translate(42,188)" opacity="0.55">
        <circle r="11" fill="none" stroke="#e08040" stroke-width="1" stroke-dasharray="3,3"/>
        <circle r="4.5" fill="#e08040" fill-opacity="0.55"/>
        <text y="26" text-anchor="middle" fill="#e08040" font-size="7.5" font-family="'DM Mono',monospace">← SUNSET</text>
      </g>

      <!-- Forest path line between Rebirth and Zungu Main -->
      <path d="M162,200 Q270,235 370,248" stroke="rgba(200,169,110,0.15)" stroke-width="1.5" stroke-dasharray="5,4" fill="none"/>
      <text><textPath href="#path1" font-size="7" fill="rgba(200,169,110,0.2)" font-family="'DM Mono',monospace" startOffset="20%">forest path</textPath></text>
      <path id="path1" d="M162,200 Q270,235 370,248" fill="none"/>

      <!-- North -->
      <text x="750" y="28" fill="rgba(200,169,110,0.25)" font-size="9" font-family="'DM Mono',monospace">N ↑</text>
      <!-- Port Antonio -->
      <text x="382" y="352" text-anchor="middle" fill="rgba(200,169,110,0.12)" font-size="8.5" font-family="'DM Mono',monospace" letter-spacing="2">PORT ANTONIO ↓</text>
    </svg>

    <div class="map-legend">
      <div class="ml-item"><div class="ml-dot" style="background:rgba(200,169,110,0.9)"></div>Zungu Main · South · Full island</div>
      <div class="ml-item"><div class="ml-dot" style="background:rgba(212,114,42,0.9)"></div>Origins · East · Sunrise</div>
      <div class="ml-item"><div class="ml-dot" style="background:rgba(123,63,160,0.9)"></div>Rebirth · West · Sunset</div>
      <div class="ml-item"><div class="ml-dot" style="background:rgba(200,169,110,0.3);border:1px solid rgba(200,169,110,0.3)"></div>Ferry Dock · South</div>
      <div class="ml-item"><div style="width:24px;height:1px;background:rgba(200,169,110,0.3);border-top:1px dashed rgba(200,169,110,0.4)"></div>Forest Path · Rebirth → Main</div>
    </div>
  </div>
</div>

<!-- STAGES -->
<div class="stages-sec" id="stages">
  <span class="s-label">02 — Stage Identities</span>
  <h2 class="s-title">Three Worlds.<br><em style="font-family:'Cormorant Garamond',serif;font-style:italic;color:var(--gold);">Zero Overlap.</em></h2>
  <div class="divider"></div>

  <div class="stages-grid">

    <!-- ZUNGU MAIN -->
    <div class="stage-card sc-main">
      <div class="sc-inner">
        <span class="sc-tag">Main Stage · Full Capacity · 7pm – 6am · All Four Nights</span>
        <div class="sc-name">ZUNGU<br>MAIN</div>
        <div class="sc-sub">Built into the island. The dominant, singular experience. Total theatrical commitment.</div>
        <div class="sc-body">
          <div class="sc-desc">
            <p>South-facing. Sound travels out to sea, away from Port Antonio. <strong>The stage does not feel built — it feels grown.</strong> Tropical forest frames every sightline. Lush canopy overhead. The Caribbean visible beyond the crowd.</p><br>
            <p>Full production at Tomorrowland scale for the space — LED walls, lighting rig, laser, water feature, pyro. But the production serves the environment. <strong>The island is the set design. Technology amplifies it.</strong></p><br>
            <p>One concept per night. One headliner per night. When Zungu Main is active, nothing else competes. From 7pm until the last act closes, this is the only stage that matters.</p>
          </div>
          <div class="sc-specs">
            <div><span class="spec-label">Position</span><span class="spec-val">South face, centre-island. Faces open water. Sound travels to sea.</span></div>
            <div><span class="spec-label">Capacity</span><span class="spec-val">Full 2,000–2,500. Every person on the island.</span></div>
            <div><span class="spec-label">Hours</span><span class="spec-val">7pm – 6am. Doors 7pm. First act 8pm. Headline 11pm–2am min.</span></div>
            <div><span class="spec-label">Production</span><span class="spec-val">Full LED wall, main + fill + delay arrays, lighting rig, laser, water feature, pyro capacity.</span></div>
            <div><span class="spec-label">Company</span><span class="spec-val">Lead production company from consortium. Highest spec of the four.</span></div>
          </div>
          <div class="sc-vibes">
            <span class="spec-label">Identity</span>
            <span class="vibe on">Tomorrowland principle</span>
            <span class="vibe on">One dominant stage</span>
            <span class="vibe on">Total commitment</span>
            <span class="vibe on">Everything else secondary</span>
            <span class="vibe">Tropical production design</span>
            <span class="vibe">Four distinct nightly concepts</span>
          </div>
        </div>
        <div class="prod-bar">
          <span class="prod-item">LED wall — full rear + wings</span>
          <span class="prod-item">d&b or equiv main array</span>
          <span class="prod-item">Moving heads + wash + beam</span>
          <span class="prod-item">Laser system</span>
          <span class="prod-item">Water feature</span>
          <span class="prod-item">Pyro capacity</span>
          <span class="prod-item">Generator redundancy ×2</span>
          <span class="prod-item">Satellite medical bay</span>
        </div>
      </div>
    </div>

    <!-- ORIGINS -->
    <div class="stage-card sc-origins">
      <div class="sc-inner">
        <span class="sc-tag">Sunrise Stage · 500 Cap · 6am – 10am · Each Morning</span>
        <div class="sc-name">ORIGINS</div>
        <div class="sc-sub">East-facing. The sun rises directly behind the DJ. Jungle. Breakfast. The dawn.</div>
        <div class="sc-body">
          <div class="sc-desc">
            <p>The eastern tip of the island. The crowd faces west — the forest behind them. <strong>The sun rises directly behind the DJ.</strong> First light through the trees. The silhouette of the selector against the Caribbean dawn.</p><br>
            <p>The breakfast party. Jungle, deep percussion, early morning energy. Intimate at 500. <strong>The RA moment.</strong> Equiknoxx, Kode9, Shy FX — the acts that carry the cultural argument, playing at dawn on the island that the argument is about.</p><br>
            <p>Origins is where Zungu tells its origin story. Not on a poster — through a 6am set in a clearing, surrounded by Caribbean forest, with the sun coming up behind it.</p>
          </div>
          <div class="sc-specs">
            <div><span class="spec-label">Position</span><span class="spec-val">Eastern tip. Crowd faces west into forest. Sunrise directly behind the stage.</span></div>
            <div><span class="spec-label">Capacity</span><span class="spec-val">500 maximum. Intimate. First to arrive, no upgrade wristband.</span></div>
            <div><span class="spec-label">Hours</span><span class="spec-val">6am – 10am. Closes before noon daytime programme.</span></div>
            <div><span class="spec-label">Production</span><span class="spec-val">Quality sound system first. Minimal lighting — the sunrise is the light show.</span></div>
          </div>
          <div class="sc-vibes">
            <span class="spec-label">Sonic Identity</span>
            <span class="vibe on">Jungle · Drum & Bass</span>
            <span class="vibe on">Jamaican electronic</span>
            <span class="vibe on">Breakfast party</span>
            <span class="vibe on">Deep percussion</span>
            <span class="vibe">The RA moment</span>
            <span class="vibe">Roots & lineage</span>
          </div>
        </div>
        <div class="prod-bar">
          <span class="prod-item">Funktion-One or equiv · quality over volume</span>
          <span class="prod-item">Warm amber wash only · no hard production</span>
          <span class="prod-item">No LED wall — the sky is the backdrop</span>
          <span class="prod-item">Elevated platform in natural clearing</span>
        </div>
      </div>
    </div>

    <!-- REBIRTH -->
    <div class="stage-card sc-rebirth">
      <div class="sc-inner">
        <span class="sc-tag">Sunset Stage · 800 Cap · 4pm – 8pm · Each Evening</span>
        <div class="sc-name">REBIRTH</div>
        <div class="sc-sub">West-facing. The sun sets behind the crowd. Sunset house. The golden hour. The bridge into the night.</div>
        <div class="sc-body">
          <div class="sc-desc">
            <p>The western end — the widest point of the island. The crowd faces east toward the forest interior. <strong>The sun sets behind them into the open Caribbean.</strong> Everything turns amber. The water glows.</p><br>
            <p>Sunset house. Melodic, hypnotic, warm. <strong>The bridge between day and night.</strong> The last act of Rebirth walks the crowd directly into Zungu Main's opening — connected by a lit forest path. The transition is the ritual. 8–12 minutes through the trees.</p><br>
            <p>Mid-scale production. 800 capacity — large enough to feel like an event, intimate enough to feel like a discovery. The sunset does the visual work.</p>
          </div>
          <div class="sc-specs">
            <div><span class="spec-label">Position</span><span class="spec-val">Western end, widest point. Sun sets behind crowd — Caribbean backdrop.</span></div>
            <div><span class="spec-label">Capacity</span><span class="spec-val">800 maximum. Open entry from 4pm.</span></div>
            <div><span class="spec-label">Hours</span><span class="spec-val">4pm – 8pm. Last act 7:30pm. Handoff walk at 7:45pm.</span></div>
            <div><span class="spec-label">Handoff</span><span class="spec-val">Rebirth closes. Crowd walks lit forest path to Zungu Main. 8–12 minutes. Staffed and guided.</span></div>
          </div>
          <div class="sc-vibes">
            <span class="spec-label">Sonic Identity</span>
            <span class="vibe on">Sunset house</span>
            <span class="vibe on">Melodic & hypnotic</span>
            <span class="vibe on">Afrotech · Organic</span>
            <span class="vibe on">The golden hour</span>
            <span class="vibe">Building energy</span>
            <span class="vibe">Bridge to Zungu Main</span>
          </div>
        </div>
        <div class="prod-bar">
          <span class="prod-item">Mid-scale warm array</span>
          <span class="prod-item">Dusk-calibrated lighting — amber + coral</span>
          <span class="prod-item">Small rear LED screen</span>
          <span class="prod-item">Forest path lighting — this team manages</span>
        </div>
      </div>
    </div>

  </div>
</div>

<!-- FOUR NIGHTS -->
<div id="nights">

  <!-- NIGHT 1 -->
  <div class="night-block nb-1">
    <div class="nb-bg-num">1</div>
    <div class="night-content">
      <div class="night-meta">
        <span class="night-date">Thursday · June 13, 2027</span>
        <span class="night-ctag">Night 1 · The Root</span>
      </div>
      <div class="night-title">TRIBAL</div>
      <div class="night-tagline">The island opens with the sound that connects Jamaica's percussion DNA to the world. Hypnotic. Ceremonial. Deep.</div>
      <div class="night-grid">
        <div>
          <div class="night-narrative">
            <p>Night 1 is not a warm-up. It is a statement. <strong>Bontan headlines.</strong> Tribal house — rooted in African rhythm, Latin percussion, the hypnotic groove that predates genre labels. The sound that carries Jamaica's DNA without quoting it directly.</p>
            <p>Supporting acts build the world before Bontan closes it. Jamaican selectors open the main stage — the island speaks first in its own voice. The crowd arrives not knowing what the next four nights will ask of them. Night 1 answers the question with sound, not words.</p>
            <p><strong>Origins at 6am the same morning</strong> sets the tone: Equiknoxx plays the sunrise set on the east tip. The day and the night rhyme. The island's argument is made before the first headliner hits the stage.</p>
          </div>
          <div class="vis-concept">
            <span class="vc-label">Visual Concept — Night 1 · Zungu Main</span>
            <div class="vc-grid">
              <div class="vc-item"><span class="vc-asp">Colour</span><span class="vc-val">Deep amber, terracotta, fire orange. The earth tones.</span></div>
              <div class="vc-item"><span class="vc-asp">LED Treatment</span><span class="vc-val">Organic patterns — root systems, tribal geometry, no hard digital edges.</span></div>
              <div class="vc-item"><span class="vc-asp">Lighting</span><span class="vc-val">Warm beams through forest canopy framing. Fire-adjacent palette. No cold colours.</span></div>
              <div class="vc-item"><span class="vc-asp">Atmosphere</span><span class="vc-val">Ceremonial. The crowd arrives to a ritual, not a party.</span></div>
            </div>
          </div>
        </div>
        <div>
          <div class="runsheet">
            <div class="rs-head"><span>Time</span><span>Programme</span><span style="text-align:right">Stage</span></div>
            <div class="rs-row"><span class="rs-t">6:00am</span><div><span class="rs-act-name">Equiknoxx</span><span class="rs-act-detail">Jamaican electronic · Origins sunrise set · the origin story told at dawn</span></div><span class="rs-stage o">Origins</span></div>
            <div class="rs-row"><span class="rs-t">8:00am</span><div><span class="rs-act-name">Local Selector TBC</span><span class="rs-act-detail">Origins second act · closes 10am</span></div><span class="rs-stage o">Origins</span></div>
            <div class="rs-row"><span class="rs-t">4:00pm</span><div><span class="rs-act-name">Rebirth Opens</span><span class="rs-act-detail">Opening night golden hour · sunset house warm-up</span></div><span class="rs-stage r">Rebirth</span></div>
            <div class="rs-row"><span class="rs-t">6:00pm</span><div><span class="rs-act-name">Rebirth Peak Act</span><span class="rs-act-detail">Full sunset. Crowd builds at the western end.</span></div><span class="rs-stage r">Rebirth</span></div>
            <div class="rs-row hoff"><span class="rs-t">7:45pm</span><div><span class="rs-act-name">→ Handoff Walk</span><span class="rs-act-detail">Rebirth closes. Forest path lit and staffed. Crowd moves to Zungu Main as one.</span></div><span class="rs-stage">↓</span></div>
            <div class="rs-row"><span class="rs-t">7:00pm</span><div><span class="rs-act-name">Zungu Main Doors</span><span class="rs-act-detail">Gates open · opening night · first act 8pm</span></div><span class="rs-stage m">Zungu Main</span></div>
            <div class="rs-row"><span class="rs-t">8:00pm</span><div><span class="rs-act-name">Jamaican Opening Act</span><span class="rs-act-detail">The island speaks first. Local or regional voice. Tribal roots.</span></div><span class="rs-stage m">Zungu Main</span></div>
            <div class="rs-row"><span class="rs-t">9:30pm</span><div><span class="rs-act-name">Support Act TBC</span><span class="rs-act-detail">Tribal house · builds the headline world</span></div><span class="rs-stage m">Zungu Main</span></div>
            <div class="rs-row hl"><span class="rs-t">11:00pm</span><div><span class="rs-act-name">BONTAN</span><span class="rs-act-detail">Headline · Tribal house · 2hr set · Night 1 closes with the root sound</span></div><span class="rs-stage m">Zungu Main</span></div>
            <div class="rs-row"><span class="rs-t">1:00am</span><div><span class="rs-act-name">Closing Selector</span><span class="rs-act-detail">Takes the night to 3am · deep tribal close</span></div><span class="rs-stage m">Zungu Main</span></div>
            <div class="rs-row"><span class="rs-t">3:00am</span><div><span class="rs-act-name">Zungu Main Closes</span><span class="rs-act-detail">Night 1 ends. Find The Pier if you're still going.</span></div><span class="rs-stage m">—</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- NIGHT 2 -->
  <div class="night-block nb-2">
    <div class="nb-bg-num">2</div>
    <div class="night-content">
      <div class="night-meta">
        <span class="night-date">Friday · June 14, 2027</span>
        <span class="night-ctag">Night 2 · The Spread</span>
      </div>
      <div class="night-title">GLOBAL<br>SOUTH</div>
      <div class="night-tagline">The sound that left Jamaica, mutated, and came back transformed. Brazilian, Afrotech — the global south picking up the rhythm and making it their own.</div>
      <div class="night-grid">
        <div>
          <div class="night-narrative">
            <p>Night 2 asks: <strong>where did the sound go?</strong> Jamaican rhythm travelled — to Brazil, to West Africa, to São Paulo's underground, to the Afrotech clubs of Johannesburg. Night 2 traces that journey across one night's programming.</p>
            <p><strong>Shimza headlines.</strong> South African Afrotech — the continent's answer to what dub and bass architecture started. His set is the curatorial argument made audible. Supporting acts bring Brazilian percussion, the global south's relationship with the Caribbean root.</p>
            <p>This is the night RA writes about. Not because it is the biggest — because it is the most <strong>specific</strong>. Specific is memorable. Specific builds a festival reputation that outlasts any single headliner.</p>
          </div>
          <div class="vis-concept">
            <span class="vc-label">Visual Concept — Night 2 · Zungu Main</span>
            <div class="vc-grid">
              <div class="vc-item"><span class="vc-asp">Colour</span><span class="vc-val">Electric blue, oceanic teal, deep indigo. The Atlantic crossing.</span></div>
              <div class="vc-item"><span class="vc-asp">LED Treatment</span><span class="vc-val">Ocean wave patterns. Migration routes abstracted. The sea between continents.</span></div>
              <div class="vc-item"><span class="vc-asp">Lighting</span><span class="vc-val">Cool blue wash. Sharp white beams. The Caribbean sea at night, illuminated.</span></div>
              <div class="vc-item"><span class="vc-asp">Atmosphere</span><span class="vc-val">Expansive. The island opens outward toward the world it influenced.</span></div>
            </div>
          </div>
        </div>
        <div>
          <div class="runsheet">
            <div class="rs-head"><span>Time</span><span>Programme</span><span style="text-align:right">Stage</span></div>
            <div class="rs-row"><span class="rs-t">6:00am</span><div><span class="rs-act-name">Kode9</span><span class="rs-act-detail">UK-Jamaican · dubstep & grime lineage · Origins dawn · the diaspora thread</span></div><span class="rs-stage o">Origins</span></div>
            <div class="rs-row"><span class="rs-t">8:00am</span><div><span class="rs-act-name">Local Selector TBC</span><span class="rs-act-detail">Origins second act · closes 10am</span></div><span class="rs-stage o">Origins</span></div>
            <div class="rs-row"><span class="rs-t">4:00pm</span><div><span class="rs-act-name">Rebirth: Brazilian Session</span><span class="rs-act-detail">Baile funk, Brazilian house · the sound travels to South America</span></div><span class="rs-stage r">Rebirth</span></div>
            <div class="rs-row"><span class="rs-t">6:30pm</span><div><span class="rs-act-name">Rebirth Peak</span><span class="rs-act-detail">Afrotech warm-up · last light over the Caribbean</span></div><span class="rs-stage r">Rebirth</span></div>
            <div class="rs-row hoff"><span class="rs-t">7:45pm</span><div><span class="rs-act-name">→ Handoff Walk</span><span class="rs-act-detail">Forest path. Crowd moves into Zungu Main.</span></div><span class="rs-stage">↓</span></div>
            <div class="rs-row"><span class="rs-t">8:00pm</span><div><span class="rs-act-name">Brazilian / Latin Selector TBC</span><span class="rs-act-detail">Opens the global south world · builds the night</span></div><span class="rs-stage m">Zungu Main</span></div>
            <div class="rs-row"><span class="rs-t">9:30pm</span><div><span class="rs-act-name">Themba</span><span class="rs-act-detail">South African · melodic techno · the bridge into Shimza</span></div><span class="rs-stage m">Zungu Main</span></div>
            <div class="rs-row hl"><span class="rs-t">11:30pm</span><div><span class="rs-act-name">SHIMZA</span><span class="rs-act-detail">Headline · South African Afrotech · 2.5hr set · the sound that travelled and returned</span></div><span class="rs-stage m">Zungu Main</span></div>
            <div class="rs-row"><span class="rs-t">2:00am</span><div><span class="rs-act-name">Closing Selector</span><span class="rs-act-detail">Takes the night to 4am · deep close</span></div><span class="rs-stage m">Zungu Main</span></div>
            <div class="rs-row"><span class="rs-t">4:00am</span><div><span class="rs-act-name">Zungu Main Closes</span><span class="rs-act-detail">Night 2 ends. The Pier has been running since midnight.</span></div><span class="rs-stage m">—</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- NIGHT 3 -->
  <div class="night-block nb-3">
    <div class="nb-bg-num">3</div>
    <div class="night-content">
      <div class="night-meta">
        <span class="night-date">Saturday · June 15, 2027</span>
        <span class="night-ctag">Night 3 · The Return</span>
      </div>
      <div class="night-title">CONTINENT</div>
      <div class="night-tagline">Africa to Jamaica. The sound coming home across the Atlantic. The biggest night. The night the island earns its mythology.</div>
      <div class="night-grid">
        <div>
          <div class="night-narrative">
            <p>Night 3 is peak. <strong>Black Coffee closes. Shimza opens for him</strong> — not as support, but as the first movement of a two-act arc. Afro-house, the African electronic renaissance, the direct sonic lineage between West Africa and the Caribbean made explicit in one night's programming.</p>
            <p>This is the night the festival press photo exists. The night the video from the crowd goes everywhere. <strong>Full production at maximum.</strong> Every technical element activated. The island lit like nothing that has ever happened here before.</p>
            <p>The cultural argument is not stated — it is performed. <strong>Shimza into Black Coffee on Navy Island</strong> is the argument. The RA headline writes itself. This is the night Zungu becomes a destination that people plan trips around.</p>
          </div>
          <div class="vis-concept">
            <span class="vc-label">Visual Concept — Night 3 · Zungu Main</span>
            <div class="vc-grid">
              <div class="vc-item"><span class="vc-asp">Colour</span><span class="vc-val">Deep forest green, gold, midnight black. The continent at night.</span></div>
              <div class="vc-item"><span class="vc-asp">LED Treatment</span><span class="vc-val">African textile patterns, kente abstraction, forest canopy geometry. Maximum resolution. Full wall active.</span></div>
              <div class="vc-item"><span class="vc-asp">Lighting</span><span class="vc-val">Full rig. Green and gold dominant. Lasers active. Water feature. Every element on simultaneously.</span></div>
              <div class="vc-item"><span class="vc-asp">Atmosphere</span><span class="vc-val">Transcendent. The crowd feels it before the first beat. Maximum theatrical commitment.</span></div>
            </div>
          </div>
        </div>
        <div>
          <div class="runsheet">
            <div class="rs-head"><span>Time</span><span>Programme</span><span style="text-align:right">Stage</span></div>
            <div class="rs-row"><span class="rs-t">6:00am</span><div><span class="rs-act-name">Shy FX</span><span class="rs-act-detail">UK-Jamaican · drum & bass / jungle · Origins peak morning · the diaspora made sonic</span></div><span class="rs-stage o">Origins</span></div>
            <div class="rs-row"><span class="rs-t">8:30am</span><div><span class="rs-act-name">Local Selector TBC</span><span class="rs-act-detail">Origins closes 10am</span></div><span class="rs-stage o">Origins</span></div>
            <div class="rs-row"><span class="rs-t">4:00pm</span><div><span class="rs-act-name">Rebirth: Peak Saturday</span><span class="rs-act-detail">Biggest Rebirth crowd of the festival. Peak sunset energy. The island builds toward tonight.</span></div><span class="rs-stage r">Rebirth</span></div>
            <div class="rs-row"><span class="rs-t">6:30pm</span><div><span class="rs-act-name">Rebirth Closing Act</span><span class="rs-act-detail">Final Rebirth set of peak night. The crowd knows what follows.</span></div><span class="rs-stage r">Rebirth</span></div>
            <div class="rs-row hoff"><span class="rs-t">7:45pm</span><div><span class="rs-act-name">→ Peak Night Handoff</span><span class="rs-act-detail">Biggest crowd walk of the festival. Forest path fully staffed. Zungu Main production pre-activated at low level. Arrival spectacle.</span></div><span class="rs-stage">↓</span></div>
            <div class="rs-row"><span class="rs-t">8:00pm</span><div><span class="rs-act-name">Opening Act TBC</span><span class="rs-act-detail">Afro-house warm-up · builds the world for what follows</span></div><span class="rs-stage m">Zungu Main</span></div>
            <div class="rs-row hl"><span class="rs-t">10:00pm</span><div><span class="rs-act-name">SHIMZA</span><span class="rs-act-detail">First headline · South African Afrotech · 90 mins · the first movement. Sets the stage for Black Coffee.</span></div><span class="rs-stage m">Zungu Main</span></div>
            <div class="rs-row hl"><span class="rs-t">12:00am</span><div><span class="rs-act-name">BLACK COFFEE</span><span class="rs-act-detail">Headline closer · Afro-house · 3hr minimum · the night the island earns its mythology. Full production activated.</span></div><span class="rs-stage m">Zungu Main</span></div>
            <div class="rs-row"><span class="rs-t">3:00am</span><div><span class="rs-act-name">Closing Selector</span><span class="rs-act-detail">Dawn approach · deep, slow · the night unwinding</span></div><span class="rs-stage m">Zungu Main</span></div>
            <div class="rs-row"><span class="rs-t">5:00am</span><div><span class="rs-act-name">Zungu Main Closes</span><span class="rs-act-detail">Night 3 ends. Those still standing have earned The Pier.</span></div><span class="rs-stage m">—</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- NIGHT 4 -->
  <div class="night-block nb-4">
    <div class="nb-bg-num">4</div>
    <div class="night-content">
      <div class="night-meta">
        <span class="night-date">Sunday · June 16, 2027</span>
        <span class="night-ctag">Night 4 · The Origin</span>
      </div>
      <div class="night-title">ROOTS</div>
      <div class="night-tagline">The island closes how it opened — on its own terms. Jamaican artists only. No international headline. The story completes itself.</div>
      <div class="night-grid">
        <div>
          <div class="night-narrative">
            <p>Night 4 is the most important artistic decision in the festival. <strong>No international headline.</strong> The closing night belongs to Jamaica. Equiknoxx, Kode9 b2b Shy FX — the acts that carry the lineage argument, playing the island that the argument is about.</p>
            <p>This is Burning Man's principle: the most meaningful moment of the festival is not the biggest production — it is the most honest. <strong>Zungu closes by returning to its thesis.</strong> Every person who stayed four nights ends the weekend on Navy Island listening to Jamaican electronic music. That experience travels home with them.</p>
            <p>Night 4 runs shorter. Zungu Main closes at 3am. Origins opens at 6am for the final sunrise set. <strong>The island ends where it began.</strong></p>
          </div>
          <div class="vis-concept">
            <span class="vc-label">Visual Concept — Night 4 · Zungu Main</span>
            <div class="vc-grid">
              <div class="vc-item"><span class="vc-asp">Colour</span><span class="vc-val">Deep purple, starlight silver, the sky at 2am. Deliberately stripped back after Night 3.</span></div>
              <div class="vc-item"><span class="vc-asp">LED Treatment</span><span class="vc-val">Minimal. Caribbean star maps. Constellations. The sky above Navy Island.</span></div>
              <div class="vc-item"><span class="vc-asp">Lighting</span><span class="vc-val">Reduced rig. Warm intimate spots. The forest takes back some of the light.</span></div>
              <div class="vc-item"><span class="vc-asp">Atmosphere</span><span class="vc-val">The last night. Everyone knows. Not a finale — a return to the root.</span></div>
            </div>
          </div>
        </div>
        <div>
          <div class="runsheet">
            <div class="rs-head"><span>Time</span><span>Programme</span><span style="text-align:right">Stage</span></div>
            <div class="rs-row"><span class="rs-t">4:00pm</span><div><span class="rs-act-name">Rebirth: Farewell</span><span class="rs-act-detail">Final Rebirth sunset of the festival. The last golden hour. Deeply felt.</span></div><span class="rs-stage r">Rebirth</span></div>
            <div class="rs-row"><span class="rs-t">6:30pm</span><div><span class="rs-act-name">Rebirth Closes</span><span class="rs-act-detail">Final act on this stage. It has served its purpose across four evenings.</span></div><span class="rs-stage r">Rebirth</span></div>
            <div class="rs-row hoff"><span class="rs-t">7:45pm</span><div><span class="rs-act-name">→ Final Handoff</span><span class="rs-act-detail">Last walk through the forest. The crowd knows the ritual now. They've done it four times.</span></div><span class="rs-stage">↓</span></div>
            <div class="rs-row"><span class="rs-t">8:00pm</span><div><span class="rs-act-name">Portland Parish Selector</span><span class="rs-act-detail">Local voice opens the final night. The island speaks first, as it did on Night 1.</span></div><span class="rs-stage m">Zungu Main</span></div>
            <div class="rs-row hl"><span class="rs-t">10:00pm</span><div><span class="rs-act-name">EQUIKNOXX</span><span class="rs-act-detail">Jamaican experimental electronic · the lineage argument in practice · headline set</span></div><span class="rs-stage m">Zungu Main</span></div>
            <div class="rs-row hl"><span class="rs-t">12:00am</span><div><span class="rs-act-name">KODE9 b2b SHY FX</span><span class="rs-act-detail">UK-Jamaican closing set · drum & bass, jungle, grime · the diaspora brought home · the island's final argument</span></div><span class="rs-stage m">Zungu Main</span></div>
            <div class="rs-row"><span class="rs-t">2:00am</span><div><span class="rs-act-name">Zungu Main Closes</span><span class="rs-act-detail">The island is quiet. The mythology is earned.</span></div><span class="rs-stage m">—</span></div>
            <div class="rs-row"><span class="rs-t">6:00am</span><div><span class="rs-act-name">Origins: Final Sunrise</span><span class="rs-act-detail">The last music on the island. Local Jamaican selector. Dawn. The island closes how it opened.</span></div><span class="rs-stage o">Origins</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>

<!-- HANDOFF -->
<div class="handoff-sec" id="handoff">
  <span class="s-label">04 — The Handoff Model</span>
  <h2 class="s-title">No Split<br><em style="font-family:'Cormorant Garamond',serif;font-style:italic;color:var(--gold);">Crowd.<br>Ever.</em></h2>
  <div class="divider"></div>
  <p style="font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-weight:300;color:rgba(244,239,230,0.5);max-width:620px;line-height:1.75;margin-bottom:3rem;">Three stages. Three windows. Never competing. The crowd moves as one body through the day — from Origins at sunrise, through Rebirth at sunset, into Zungu Main at night. The forest path between Rebirth and Zungu Main is not logistics. It is the ritual that ties the day together.</p>

  <div class="handoff-two">
    <div>
      <div class="hd-line"><span class="hd-time key">6:00am</span><div class="hd-ev mo"><strong>Origins Opens</strong>East-facing. 500 cap. Sunrise directly behind the DJ. Jungle. Jamaican electronic. The day starts here for those who want it.</div></div>
      <div class="hd-line"><span class="hd-time">8:00am</span><div class="hd-ev mo"><strong>Origins Second Act</strong>Runs until 10am. Closes before the daytime activity programme takes over the island.</div></div>
      <div class="hd-line"><span class="hd-time">10:00am</span><div class="hd-ev"><strong>All Stages Dark</strong>10am–4pm. Activities own the island. No music competes with the daytime programme.</div></div>
      <div class="hd-line"><span class="hd-time key">4:00pm</span><div class="hd-ev mr"><strong>Rebirth Opens</strong>West-facing. 800 cap. Sunset house. The crowd assembles for the golden hour.</div></div>
      <div class="hd-line"><span class="hd-time">7:00pm</span><div class="hd-ev mm"><strong>Zungu Main Doors</strong>Gates open. First act 8pm. Rebirth still active — transition begins.</div></div>
      <div class="hd-line"><span class="hd-time key">7:45pm</span><div class="hd-ev ritual"><strong>The Handoff Moment</strong>Rebirth last act ends. Forest path lit. Staffed. The crowd walks from sunset into night. 8–12 minutes through the trees. This is the ritual. The island pivots.</div></div>
      <div class="hd-line"><span class="hd-time">8:00pm</span><div class="hd-ev mm"><strong>Zungu Main: Full Crowd</strong>No split. Everyone in one place. The night builds from here.</div></div>
      <div class="hd-line"><span class="hd-time key">11:00pm</span><div class="hd-ev mm"><strong>Headline Set</strong>Full production. Total theatrical commitment. Everything else is secondary until this ends.</div></div>
      <div class="hd-line"><span class="hd-time">12:00am</span><div class="hd-ev"><strong>The Pier Opens</strong>200 cap only. Discovery. No announced lineup. Does not compete — complements. Those who need something different, find it.</div></div>
      <div class="hd-line"><span class="hd-time">3–5am</span><div class="hd-ev mm"><strong>Zungu Main Closes</strong>Night-dependent. Night 3 to 5am. Night 4 to 2am. The Pier runs to sunrise.</div></div>
    </div>

    <div>
      <div class="rules-box">
        <span class="rb-label">The Hard Rules</span>
        <div class="rb-rule">Origins and Rebirth <strong>never run simultaneously</strong> with each other or with Zungu Main.</div>
        <div class="rb-rule">When Black Coffee is playing, <strong>no other stage exists.</strong> The Pier opens midnight only — after the headline has the crowd.</div>
        <div class="rb-rule">The forest path between Rebirth and Zungu Main is <strong>fully lit and staffed</strong> every evening. The walk is part of the experience.</div>
        <div class="rb-rule">All activity zones close at 3:30pm. <strong>Rebirth opens 4pm.</strong> The transition from day to evening is managed, not abrupt.</div>
        <div class="rb-rule">The Pier is the only exception — it runs midnight to sunrise at 200 cap, <strong>by discovery only</strong>. No wristband upgrade. No announcement. You find it or you don't.</div>
      </div>

      <div class="prod-table">
        <div class="pt-row">
          <span class="pt-stage m">Zungu Main</span>
          <span class="pt-detail">Lead production company. Full LED, lighting, sound, pyro. Generator redundancy ×2. Highest specification of the four companies.</span>
        </div>
        <div class="pt-row">
          <span class="pt-stage o">Origins</span>
          <span class="pt-detail">Second company. Sound quality first. Warm amber lighting only. Platform in natural clearing. Sunrise does the visual work.</span>
        </div>
        <div class="pt-row">
          <span class="pt-stage r">Rebirth</span>
          <span class="pt-detail">Third company. Mid-scale. Dusk-calibrated warm lighting. Small LED rear. This team also manages the forest path lighting during handoff.</span>
        </div>
        <div class="pt-row">
          <span class="pt-stage p">The Pier</span>
          <span class="pt-detail">Fourth company. Minimal. 200 cap. Sound and basic lighting only. The space and the sea are the production.</span>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- FOOTER -->
<div class="doc-footer">
  <div class="footer-brand">ZUNGU 2027</div>
  <div class="footer-meta">
    Stage Architecture · Internal Working Document<br>
    Navy Island · Port Antonio · Jamaica<br>
    June 13–16, 2027 · 18+ Adults Only<br>
    Confidential — Not for Distribution
  </div>
</div>

<script>
  function goTo(sel){
    document.querySelector(sel).scrollIntoView({behavior:'smooth'});
    document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
    event.target.classList.add('active');
  }
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)';}
    });
  },{threshold:0.05});
  document.querySelectorAll('.stage-card,.vc-item,.spec-val,.rb-rule').forEach(el=>{
    el.style.opacity='0';
    el.style.transform='translateY(14px)';
    el.style.transition='opacity 0.55s ease,transform 0.55s ease';
    obs.observe(el);
  });
</script>
</body>
</html>
