// api/verify-password.js
// Thin auth endpoint used by questionarios.html password gate.
// Shell HTML is now built by importing the same render logic used in content.js.
//
// WHY NOT DUPLICATE THE SHELL STRING HERE:
//   The original had a hardcoded PT HTML copy here and in content.js.
//   Now both share buildShellHtml() from a single import, eliminating drift.
//
// CONTRACT:
//   POST /api/verify-password
//   Body: { password: string, lang: 'pt' | 'es' }
//   Response (ok): { ok: true, html: string }
//   Response (fail): { ok: false }

import { getLangStrings } from './i18n.js';

function buildShellHtml(s) {
  return `
<!-- QUESTIONNAIRE SELECTOR -->
<div id="selector">
  <div class="selector-inner">
    <h1>${s.selectorTitle}</h1>
    <p class="sub">${s.selectorSub}</p>
    <div class="q-cards">
      <div class="q-card" onclick="openForm('fisica')">
        <div class="q-card-num">01</div>
        <h3>${s.card1Title}</h3>
        <p>${s.card1Desc}</p>
        <span class="q-card-tag">${s.card1Tag}</span>
      </div>
      <div class="q-card" onclick="openForm('emocional')">
        <div class="q-card-num">02</div>
        <h3>${s.card2Title}</h3>
        <p>${s.card2Desc}</p>
        <span class="q-card-tag">${s.card2Tag}</span>
      </div>
      <div class="q-card" onclick="openQfa()">
        <div class="q-card-num">03</div>
        <h3>${s.card3Title}</h3>
        <p>${s.card3Desc}</p>
        <span class="q-card-tag">${s.card3Tag}</span>
      </div>
    </div>
  </div>
</div>

<!-- FORM AREA -->
<div id="form-area">
  <div class="form-header">
    <div style="margin-bottom:1rem;">
      <button class="btn-back-sm" onclick="backToSelector()">${s.backBtn}</button>
    </div>
    <div class="form-title" id="form-title"></div>
    <div class="form-sub" id="form-sub"></div>
  </div>

  <div class="progress-wrap">
    <div class="progress-label">
      <span id="prog-step-label">${s.progStep.replace('{n}', '1')}</span>
      <span id="prog-pct">0%</span>
    </div>
    <div class="progress-bar"><div class="progress-fill" id="prog-fill" style="width:0%"></div></div>
  </div>

  <!-- SUCCESS STATE -->
  <div id="form-success">
    <div class="success-icon">${s.successIcon}</div>
    <h2>${s.successTitle}</h2>
    <p>${s.successText}</p>
    <button class="btn-outline" onclick="backToSelector()">${s.successBackBtn}</button>
  </div>

</div><!-- /form-area -->`;
}

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { password, lang = 'pt' } = req.body || {};
  const correct = process.env.CLIENT_PASSWORD;

  if (!correct) return res.status(500).json({ error: 'Server misconfiguration' });
  if (password === correct) {
    const s = getLangStrings(lang);
    return res.status(200).json({ ok: true, html: buildShellHtml(s) });
  }
  return res.status(200).json({ ok: false });
}
