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
  // Text content uses data-i18n attributes so applyTranslations() can re-render
  // everything client-side whenever the user switches language after login.
  // The `s` param is still used for the initial server-side render as a fallback
  // (content is visible before JS fires), but the real source of truth is translations.js.
  return `
<!-- QUESTIONNAIRE SELECTOR -->
<div id="selector">
  <div class="selector-inner">
    <h1 data-i18n="q_selectorTitle">${s.selectorTitle}</h1>
    <p class="sub" data-i18n="q_selectorSub">${s.selectorSub}</p>
    <div class="q-cards">
      <div class="q-card" onclick="openForm('fisica')">
        <div class="q-card-num">01</div>
        <h3 data-i18n="q_card1Title">${s.card1Title}</h3>
        <p data-i18n="q_card1Desc">${s.card1Desc}</p>
        <span class="q-card-tag" data-i18n="q_card1Tag">${s.card1Tag}</span>
      </div>
      <div class="q-card" onclick="openForm('emocional')">
        <div class="q-card-num">02</div>
        <h3 data-i18n="q_card2Title">${s.card2Title}</h3>
        <p data-i18n="q_card2Desc">${s.card2Desc}</p>
        <span class="q-card-tag" data-i18n="q_card2Tag">${s.card2Tag}</span>
      </div>
      <div class="q-card" onclick="openQfa()">
        <div class="q-card-num">03</div>
        <h3 data-i18n="q_card3Title">${s.card3Title}</h3>
        <p data-i18n="q_card3Desc">${s.card3Desc}</p>
        <span class="q-card-tag" data-i18n="q_card3Tag">${s.card3Tag}</span>
      </div>
    </div>
  </div>
</div>

<!-- FORM AREA -->
<div id="form-area">
  <div class="form-header">
    <div style="margin-bottom:1rem;">
      <button class="btn-back-sm" onclick="backToSelector()" data-i18n="q_backBtn">${s.backBtn}</button>
    </div>
    <div class="form-title" id="form-title"></div>
    <div class="form-sub" id="form-sub"></div>
  </div>

  <div class="progress-wrap">
    <div class="progress-label">
      <span id="prog-step-label"></span>
      <span id="prog-pct">0%</span>
    </div>
    <div class="progress-bar"><div class="progress-fill" id="prog-fill" style="width:0%"></div></div>
  </div>

  <!-- SUCCESS STATE -->
  <div id="form-success">
    <div class="success-icon">✓</div>
    <h2 data-i18n="q_successTitle">${s.successTitle}</h2>
    <p data-i18n="q_successText">${s.successText}</p>
    <button class="btn-outline" onclick="backToSelector()" data-i18n="q_successBackBtn">${s.successBackBtn}</button>
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
