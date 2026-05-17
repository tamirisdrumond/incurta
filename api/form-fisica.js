// api/form-fisica.js
// Returns the Definição Física / Definición Física step HTML after auth.
//
// WHY A RENDER FUNCTION INSTEAD OF A TEMPLATE STRING:
//   Hardcoded HTML strings (as in the original) cannot be translated without
//   duplication. A render function receives the string map `s` and produces
//   translated HTML in a single code path. Adding ES (or any new lang) requires
//   only an entry in i18n.js, not a new file.
//
// CONTRACT:
//   POST /api/form-fisica
//   Body: { password: string, lang: 'pt' | 'es' }
//   Response (ok): { ok: true, html: string }
//   Response (fail): { ok: false }

import { getLangStrings } from './i18n.js';

function scaleButtons(id, count = 10) {
  return Array.from({ length: count }, (_, i) => i + 1)
    .map(n => `<button class="scale-btn" onclick="selectScale(this,'${id}')">${n}</button>`)
    .join('');
}

function radio(groupId, options) {
  return options.map(opt =>
    `<label class="radio-option" onclick="selectRadio(this,'${groupId}')"><div class="radio-dot"></div>${opt}</label>`
  ).join('\n          ');
}

function check(options) {
  return options.map(opt =>
    `<label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>${opt}</label>`
  ).join('\n          ');
}

function buildFisicaHtml(s) {
  return `
<!-- F-STEP 1: Identificação -->
<div class="form-step" id="f-step-1" data-form="fisica">
  <div class="step-heading">${s.fStep1Heading}</div>
  <div class="step-desc">${s.fStep1Desc}</div>
  <div class="two-col">
    <div class="field"><label>${s.fNomeLabel}</label><input type="text" id="f-nome" placeholder="${s.fNomePH}"></div>
    <div class="field"><label>${s.fNascLabel}</label><input type="date" id="f-nasc"></div>
  </div>
  <div class="two-col">
    <div class="field"><label>${s.fEmailLabel}</label><input type="email" id="f-email" placeholder="${s.fEmailPH}"></div>
    <div class="field"><label>${s.fTelLabel}</label><input type="tel" id="f-tel" placeholder="${s.fTelPH}"></div>
  </div>
  <div class="two-col">
    <div class="field"><label>${s.fPesoLabel}</label><input type="text" id="f-peso" placeholder="${s.fPesoPH}"></div>
    <div class="field"><label>${s.fAlturaLabel}</label><input type="text" id="f-altura" placeholder="${s.fAlturaPH}"></div>
  </div>
  <div id="f-step1-error" style="display:none;color:var(--burgundy);font-size:0.82rem;margin-top:0.75rem;">${s.fStep1Error}</div>
  <div class="form-nav">
    <span></span>
    <button class="btn-primary" onclick="validateStep1('fisica')">${s.continueBtn}</button>
  </div>
</div>

<!-- F-STEP 2: Corpo e rotina -->
<div class="form-step" id="f-step-2" data-form="fisica">
  <div class="step-heading">${s.fStep2Heading}</div>
  <div class="step-desc">${s.fStep2Desc}</div>

  <div class="field">
    <label>${s.fSonoLabel}</label>
    <div class="radio-group" id="f-sono">
      ${radio('f-sono', [s.fSonoOpt1, s.fSonoOpt2, s.fSonoOpt3])}
    </div>
  </div>

  <div class="field">
    <label>${s.fAlimLabel}</label>
    <div class="check-group" id="f-alim">
      ${check([s.fAlimOpt1, s.fAlimOpt2, s.fAlimOpt3])}
    </div>
  </div>

  <div class="field">
    <label>${s.fCalmaLabel}</label>
    <div class="radio-group" id="f-calma">
      ${radio('f-calma', [s.fCalmaOpt1, s.fCalmaOpt2, s.fCalmaOpt3, s.fCalmaOpt4])}
    </div>
  </div>

  <div class="field">
    <label>${s.fTrabalhoLabel}</label>
    <div class="check-group" id="f-trabalho">
      ${check([s.fTrabalhoOpt1, s.fTrabalhoOpt2, s.fTrabalhoOpt3, s.fTrabalhoOpt4, s.fTrabalhoOpt5])}
    </div>
  </div>

  <div class="field">
    <label>${s.fRefeicoesLabel}</label>
    <input type="text" id="f-refeicoes" placeholder="${s.fRefeicoesPH}">
  </div>

  <div class="form-nav">
    <button class="btn-back-sm" onclick="nextStep('fisica',2,1)">${s.backSmBtn}</button>
    <button class="btn-primary" onclick="nextStep('fisica',2,3)">${s.continueBtn}</button>
  </div>
</div>

<!-- F-STEP 3: Saúde e sintomas -->
<div class="form-step" id="f-step-3" data-form="fisica">
  <div class="step-heading">${s.fStep3Heading}</div>
  <div class="step-desc">${s.fStep3Desc}</div>

  <div class="field">
    <label>${s.fSintomasLabel}</label>
    <div class="check-group" id="f-sintomas">
      ${check([s.fSintomasOpt1, s.fSintomasOpt2, s.fSintomasOpt3, s.fSintomasOpt4, s.fSintomasOpt5, s.fSintomasOpt6])}
    </div>
  </div>
  <div class="field">
    <label>${s.fSintomasOutroLabel}</label>
    <textarea id="f-sintomas-outro" placeholder="${s.fSintomasOutroPH}"></textarea>
  </div>

  <div class="field">
    <label>${s.fMarcadoresLabel}</label>
    <textarea id="f-marcadores" placeholder="${s.fMarcadoresPH}"></textarea>
  </div>

  <div class="form-nav">
    <button class="btn-back-sm" onclick="nextStep('fisica',3,2)">${s.backSmBtn}</button>
    <button class="btn-primary" onclick="nextStep('fisica',3,4)">${s.continueBtn}</button>
  </div>
</div>

<!-- F-STEP 4: Autoconhecimento -->
<div class="form-step" id="f-step-4" data-form="fisica">
  <div class="step-heading">${s.fStep4Heading}</div>
  <div class="step-desc">${s.fStep4Desc}</div>

  <div class="field">
    <label>${s.fEspelhoLabel}</label>
    <div class="radio-group" id="f-espelho">
      ${radio('f-espelho', [s.fEspelhoOpt1, s.fEspelhoOpt2, s.fEspelhoOpt3, s.fEspelhoOpt4, s.fEspelhoOpt5])}
    </div>
  </div>

  <div class="field">
    <label>${s.fPerdeLabel}</label>
    <div class="radio-group" id="f-perde">
      ${radio('f-perde', [s.fPerdeOpt1, s.fPerdeOpt2, s.fPerdeOpt3, s.fPerdeOpt4])}
    </div>
    <input type="text" id="f-perde-outro" placeholder="${s.fPerdeOutroPH}" style="margin-top:0.5rem;">
  </div>

  <div class="field">
    <label>${s.fFaltaLabel}</label>
    <textarea id="f-falta"></textarea>
  </div>

  <div class="field">
    <label>${s.fHoraLabel}</label>
    <textarea id="f-hora"></textarea>
  </div>

  <div class="field">
    <label>${s.fImpedeLabel}</label>
    <textarea id="f-impede" placeholder="${s.fImpedePH}"></textarea>
  </div>

  <div class="form-nav">
    <button class="btn-back-sm" onclick="nextStep('fisica',4,3)">${s.backSmBtn}</button>
    <button class="btn-primary" onclick="nextStep('fisica',4,5)">${s.continueBtn}</button>
  </div>
</div>

<!-- F-STEP 5: Objetivos físicos -->
<div class="form-step" id="f-step-5" data-form="fisica">
  <div class="step-heading">${s.fStep5Heading}</div>
  <div class="step-desc">${s.fStep5Desc}</div>

  <div class="field">
    <label>${s.fObjetivoLabel}</label>
    <textarea id="f-objetivo" placeholder="${s.fObjetivoPH}"></textarea>
  </div>

  <div class="field">
    <label>${s.fMudancasLabel}</label>
    <textarea id="f-mudancas" placeholder="${s.fMudancasPH}"></textarea>
  </div>

  <div class="form-nav">
    <button class="btn-back-sm" onclick="nextStep('fisica',5,4)">${s.backSmBtn}</button>
    <button class="btn-primary" onclick="nextStep('fisica',5,6)">${s.continueBtn}</button>
  </div>
</div>

<!-- F-STEP 6: Maternidade (opcional) -->
<div class="form-step" id="f-step-6" data-form="fisica">
  <div class="step-heading">${s.fStep6Heading}</div>
  <div class="step-desc">${s.fStep6Desc}</div>

  <div class="field">
    <label>${s.fCulpaLabel}</label>
    <div class="radio-group" id="f-culpa">
      ${radio('f-culpa', [s.fCulpaOpt1, s.fCulpaOpt2, s.fCulpaOpt3, s.fCulpaOpt4])}
    </div>
  </div>

  <div class="field">
    <label>${s.fMatSentLabel}</label>
    <div class="check-group" id="f-mat-sentimento">
      ${check([s.fMatSentOpt1, s.fMatSentOpt2, s.fMatSentOpt3, s.fMatSentOpt4, s.fMatSentOpt5, s.fMatSentOpt6])}
    </div>
  </div>

  <div class="field">
    <label>${s.fGestacaoLabel}</label>
    <textarea id="f-gestacao" placeholder="${s.fGestacaoPH}"></textarea>
  </div>

  <div class="field">
    <label>${s.fRotinaLabel}</label>
    <div class="radio-group" id="f-rotina">
      ${radio('f-rotina', [s.fRotinaOpt1, s.fRotinaOpt2, s.fRotinaOpt3, s.fRotinaOpt4])}
    </div>
  </div>

  <div class="form-nav">
    <button class="btn-back-sm" onclick="nextStep('fisica',6,5)">${s.backSmBtn}</button>
    <button class="btn-primary" onclick="nextStep('fisica',6,7)">${s.continueBtn}</button>
  </div>
</div>

<!-- F-STEP 7: Motivação e finalização -->
<div class="form-step" id="f-step-7" data-form="fisica">
  <div class="step-heading">${s.fStep7Heading}</div>
  <div class="step-desc">${s.fStep7Desc}</div>

  <div class="field">
    <label>${s.fMotivacaoLabel}</label>
    <div class="scale-wrap">
      <span class="scale-label">${s.fMotivacaoMin}</span>
      <div id="f-motivacao" style="display:flex;gap:0.4rem;flex-wrap:wrap;">
        ${scaleButtons('f-motivacao')}
      </div>
      <span class="scale-label">${s.fMotivacaoMax}</span>
    </div>
  </div>

  <div class="field">
    <label>${s.fTresPalavrasLabel}</label>
    <input type="text" id="f-tres-palavras" placeholder="${s.fTresPalavrasPH}">
  </div>

  <div class="field">
    <label>${s.fObsLabel}</label>
    <textarea id="f-obs" placeholder="${s.fObsPH}"></textarea>
  </div>

  <div class="form-nav">
    <button class="btn-back-sm" onclick="nextStep('fisica',7,6)">${s.backSmBtn}</button>
    <button class="btn-primary" id="submit-fisica" onclick="submitForm('fisica')">${s.submitBtn}</button>
  </div>
</div>`;
}

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { password, lang = 'pt' } = req.body || {};
  const correct = process.env.CLIENT_PASSWORD;

  if (!correct) return res.status(500).json({ error: 'Server misconfiguration' });
  if (password !== correct) return res.status(200).json({ ok: false });

  const s = getLangStrings(lang);
  return res.status(200).json({ ok: true, html: buildFisicaHtml(s) });
}
