// api/form-emocional.js
// Returns the Definição Emocional / Definición Emocional step HTML after auth.
//
// Same architecture as form-fisica.js — see that file's header for rationale.
//
// CONTRACT:
//   POST /api/form-emocional
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

function buildEmocionalHtml(s) {
  return `
<!-- E-STEP 1: Identificação -->
<div class="form-step" id="e-step-1" data-form="emocional">
  <div class="step-heading">${s.eStep1Heading}</div>
  <div class="step-desc">${s.eStep1Desc}</div>
  <div class="two-col">
    <div class="field"><label>${s.eNomeLabel}</label><input type="text" id="e-nome" placeholder="${s.eNomePH}"></div>
    <div class="field"><label>${s.eNascLabel}</label><input type="date" id="e-nasc"></div>
  </div>
  <div class="field"><label>${s.eEmailLabel}</label><input type="email" id="e-email" placeholder="${s.eEmailPH}"></div>

  <div class="field">
    <label>${s.eVersaoLabel}</label>
    <input type="text" id="e-versao" placeholder="${s.eVersaoPH}">
  </div>

  <div class="field">
    <label>${s.eOcasiaoLabel}</label>
    <div class="check-group" id="e-ocasiao">
      ${check([s.eOcasiaoOpt1, s.eOcasiaoOpt2, s.eOcasiaoOpt3, s.eOcasiaoOpt4, s.eOcasiaoOpt5, s.eOcasiaoOpt6, s.eOcasiaoOpt7])}
    </div>
  </div>

  <div id="e-step1-error" style="display:none;color:var(--burgundy);font-size:0.82rem;margin-top:0.75rem;">${s.eStep1Error}</div>
  <div class="form-nav">
    <span></span>
    <button class="btn-primary" onclick="validateStep1('emocional')">${s.continueBtn}</button>
  </div>
</div>

<!-- E-STEP 2: Gatilhos emocionais -->
<div class="form-step" id="e-step-2" data-form="emocional">
  <div class="step-heading">${s.eStep2Heading}</div>
  <div class="step-desc">${s.eStep2Desc}</div>

  <div class="field">
    <label>${s.eVulneravelLabel}</label>
    <div class="check-group" id="e-vulneravel">
      ${check([s.eVulneravelOpt1, s.eVulneravelOpt2, s.eVulneravelOpt3, s.eVulneravelOpt4, s.eVulneravelOpt5])}
    </div>
    <input type="text" id="e-vulneravel-outro" placeholder="${s.eVulneravelOutroPH}" style="margin-top:0.5rem;">
  </div>

  <div class="field">
    <label>${s.eComidaOferecLabel}</label>
    <div class="check-group" id="e-comida-oferece">
      ${check([s.eComidaOferecOpt1, s.eComidaOferecOpt2, s.eComidaOferecOpt3, s.eComidaOferecOpt4, s.eComidaOferecOpt5])}
    </div>
  </div>

  <div class="field">
    <label>${s.eMomentosLabel}</label>
    <div class="check-group" id="e-momentos">
      ${check([s.eMomentosOpt1, s.eMomentosOpt2, s.eMomentosOpt3, s.eMomentosOpt4])}
    </div>
  </div>

  <div class="field">
    <label>${s.eHorarioLabel}</label>
    <textarea id="e-horario"></textarea>
  </div>

  <div class="form-nav">
    <button class="btn-back-sm" onclick="nextStep('emocional',2,1)">${s.backSmBtn}</button>
    <button class="btn-primary" onclick="nextStep('emocional',2,3)">${s.continueBtn}</button>
  </div>
</div>

<!-- E-STEP 3: Sentimentos e autoconhecimento -->
<div class="form-step" id="e-step-3" data-form="emocional">
  <div class="step-heading">${s.eStep3Heading}</div>
  <div class="step-desc">${s.eStep3Desc}</div>

  <div class="field">
    <label>${s.eReconstruirLabel}</label>
    <div class="check-group" id="e-reconstruir">
      ${check([s.eReconstruirOpt1, s.eReconstruirOpt2, s.eReconstruirOpt3, s.eReconstruirOpt4, s.eReconstruirOpt5])}
    </div>
  </div>

  <div class="field">
    <label>${s.eRefugioLabel}</label>
    <div class="check-group" id="e-refugio">
      ${check([s.eRefugioOpt1, s.eRefugioOpt2, s.eRefugioOpt3, s.eRefugioOpt4, s.eRefugioOpt5])}
    </div>
  </div>

  <div class="field">
    <label>${s.eCorpoParteLabel}</label>
    <div class="check-group" id="e-corpo-parte">
      ${check([s.eCorpoParteOpt1, s.eCorpoParteOpt2, s.eCorpoParteOpt3, s.eCorpoParteOpt4, s.eCorpoParteOpt5])}
    </div>
  </div>

  <div class="form-nav">
    <button class="btn-back-sm" onclick="nextStep('emocional',3,2)">${s.backSmBtn}</button>
    <button class="btn-primary" onclick="nextStep('emocional',3,4)">${s.continueBtn}</button>
  </div>
</div>

<!-- E-STEP 4: Escala comportamental -->
<div class="form-step" id="e-step-4" data-form="emocional">
  <div class="step-heading">${s.eStep4Heading}</div>
  <div class="step-desc">${s.eStep4Desc}</div>

  <div class="field">
    <label>${s.eRepetirLabel}</label>
    <div id="e-repetir" style="display:flex;gap:0.4rem;flex-wrap:wrap;">${scaleButtons('e-repetir')}</div>
  </div>

  <div class="field">
    <label>${s.eDiadicilLabel}</label>
    <div id="e-diadicil" style="display:flex;gap:0.4rem;flex-wrap:wrap;">${scaleButtons('e-diadicil')}</div>
  </div>

  <div class="field">
    <label>${s.eDistraidaLabel}</label>
    <div id="e-distraida" style="display:flex;gap:0.4rem;flex-wrap:wrap;">${scaleButtons('e-distraida')}</div>
  </div>

  <div class="field">
    <label>${s.eDesisteLabel}</label>
    <div id="e-desiste" style="display:flex;gap:0.4rem;flex-wrap:wrap;">${scaleButtons('e-desiste')}</div>
  </div>

  <div class="form-nav">
    <button class="btn-back-sm" onclick="nextStep('emocional',4,3)">${s.backSmBtn}</button>
    <button class="btn-primary" onclick="nextStep('emocional',4,5)">${s.continueBtn}</button>
  </div>
</div>

<!-- E-STEP 5: Histórico de peso -->
<div class="form-step" id="e-step-5" data-form="emocional">
  <div class="step-heading">${s.eStep5Heading}</div>
  <div class="step-desc">${s.eStep5Desc}</div>

  <div class="field">
    <label>${s.eEventosLabel}</label>
    <div class="check-group" id="e-eventos">
      ${check([s.eEventosOpt1, s.eEventosOpt2, s.eEventosOpt3, s.eEventosOpt4, s.eEventosOpt5, s.eEventosOpt6, s.eEventosOpt7])}
    </div>
    <input type="text" id="e-eventos-outro" placeholder="${s.eEventosOutroPH}" style="margin-top:0.5rem;">
  </div>

  <div class="field">
    <label>${s.eUltimaVezLabel}</label>
    <div class="radio-group" id="e-ultima-vez">
      ${radio('e-ultima-vez', [s.eUltimaVezOpt1, s.eUltimaVezOpt2, s.eUltimaVezOpt3, s.eUltimaVezOpt4])}
    </div>
  </div>

  <div class="field">
    <label>${s.eExperienciaLabel}</label>
    <div class="radio-group" id="e-experiencia">
      ${radio('e-experiencia', [s.eExperienciaOpt1, s.eExperienciaOpt2, s.eExperienciaOpt3, s.eExperienciaOpt4, s.eExperienciaOpt5, s.eExperienciaOpt6])}
    </div>
  </div>

  <div class="form-nav">
    <button class="btn-back-sm" onclick="nextStep('emocional',5,4)">${s.backSmBtn}</button>
    <button class="btn-primary" onclick="nextStep('emocional',5,6)">${s.continueBtn}</button>
  </div>
</div>

<!-- E-STEP 6: Corpo e rotina física -->
<div class="form-step" id="e-step-6" data-form="emocional">
  <div class="step-heading">${s.eStep6Heading}</div>
  <div class="step-desc">${s.eStep6Desc}</div>

  <div class="field">
    <label>${s.fSonoLabel}</label>
    <div class="radio-group" id="e-sono">
      ${radio('e-sono', [s.fSonoOpt1, s.fSonoOpt2, s.fSonoOpt3])}
    </div>
  </div>

  <div class="field">
    <label>${s.fPerdeLabel}</label>
    <div class="radio-group" id="e-perde">
      ${radio('e-perde', [s.fPerdeOpt1, s.fPerdeOpt2, s.fPerdeOpt3])}
    </div>
    <input type="text" id="e-perde-outro" placeholder="${s.ePerdeOutroPH}" style="margin-top:0.5rem;">
  </div>

  <div class="field">
    <label>${s.fCalmaLabel}</label>
    <div class="radio-group" id="e-calma">
      ${radio('e-calma', [s.fCalmaOpt1, s.fCalmaOpt2, s.fCalmaOpt3, s.fCalmaOpt4])}
    </div>
  </div>

  <div class="field">
    <label>${s.fAlimLabel}</label>
    <div class="check-group" id="e-alim">
      ${check([s.fAlimOpt1, s.fAlimOpt2, s.fAlimOpt3])}
    </div>
  </div>

  <div class="field">
    <label>${s.fSintomasLabel}</label>
    <div class="check-group" id="e-sintomas">
      ${check([s.fSintomasOpt1, s.fSintomasOpt2, s.fSintomasOpt3, s.fSintomasOpt4, s.fSintomasOpt5, s.fSintomasOpt6])}
    </div>
    <input type="text" id="e-sintomas-outro" placeholder="${s.eSintomasOutroPH}" style="margin-top:0.5rem;">
  </div>

  <div class="form-nav">
    <button class="btn-back-sm" onclick="nextStep('emocional',6,5)">${s.backSmBtn}</button>
    <button class="btn-primary" onclick="nextStep('emocional',6,7)">${s.continueBtn}</button>
  </div>
</div>

<!-- E-STEP 7: Maternidade -->
<div class="form-step" id="e-step-7" data-form="emocional">
  <div class="step-heading">${s.eStep7Heading}</div>
  <div class="step-desc">${s.eStep7Desc}</div>

  <div class="field">
    <label>${s.eGestacaoLabel}</label>
    <textarea id="e-gestacao" placeholder="${s.eGestacaoPH}"></textarea>
  </div>

  <div class="field">
    <label>${s.eRotinaLabel}</label>
    <div class="radio-group" id="e-rotina">
      ${radio('e-rotina', [s.eRotinaOpt1, s.eRotinaOpt2, s.eRotinaOpt3, s.eRotinaOpt4])}
    </div>
  </div>

  <div class="field">
    <label>${s.eMatSentLabel}</label>
    <div class="check-group" id="e-mat-sentimento">
      ${check([s.eMatSentOpt1, s.eMatSentOpt2, s.eMatSentOpt3, s.eMatSentOpt4, s.eMatSentOpt5, s.eMatSentOpt6])}
    </div>
  </div>

  <div class="field">
    <label>${s.eCulpaLabel}</label>
    <div class="radio-group" id="e-culpa">
      ${radio('e-culpa', [s.eCulpaOpt1, s.eCulpaOpt2, s.eCulpaOpt3, s.eCulpaOpt4])}
    </div>
  </div>

  <div class="field">
    <label>${s.eEspelhoParto}</label>
    <div class="radio-group" id="e-espelho-parto">
      ${radio('e-espelho-parto', [s.eEspelhoPartoOpt1, s.eEspelhoPartoOpt2, s.eEspelhoPartoOpt3, s.eEspelhoPartoOpt4, s.eEspelhoPartoOpt5])}
    </div>
  </div>

  <div class="form-nav">
    <button class="btn-back-sm" onclick="nextStep('emocional',7,6)">${s.backSmBtn}</button>
    <button class="btn-primary" onclick="nextStep('emocional',7,8)">${s.continueBtn}</button>
  </div>
</div>

<!-- E-STEP 8: Objetivos e motivação final -->
<div class="form-step" id="e-step-8" data-form="emocional">
  <div class="step-heading">${s.eStep8Heading}</div>
  <div class="step-desc">${s.eStep8Desc}</div>

  <div class="field">
    <label>${s.eFaltaLabel}</label>
    <textarea id="e-falta" placeholder="${s.eFaltaPH}"></textarea>
  </div>

  <div class="field">
    <label>${s.eImpedeLabel}</label>
    <textarea id="e-impede" placeholder="${s.eImpedePH}"></textarea>
  </div>

  <div class="field">
    <label>${s.eObjetivoLabel}</label>
    <textarea id="e-objetivo"></textarea>
  </div>

  <div class="field">
    <label>${s.eRefeicoesLabel}</label>
    <input type="text" id="e-refeicoes" placeholder="${s.eRefeicoesPH}">
  </div>

  <div class="field">
    <label>${s.eMudancasLabel}</label>
    <textarea id="e-mudancas"></textarea>
  </div>

  <div class="field">
    <label>${s.eMarcadoresLabel}</label>
    <textarea id="e-marcadores"></textarea>
  </div>

  <div class="field">
    <label>${s.eMotivacaoLabel}</label>
    <div id="e-motivacao" style="display:flex;gap:0.4rem;flex-wrap:wrap;">${scaleButtons('e-motivacao')}</div>
  </div>

  <div class="field">
    <label>${s.eTrabalhoLabel}</label>
    <div class="check-group" id="e-trabalho">
      ${check([s.eTrabalhoOpt1, s.eTrabalhoOpt2, s.eTrabalhoOpt3, s.eTrabalhoOpt4, s.eTrabalhoOpt5])}
    </div>
  </div>

  <div class="field">
    <label>${s.eTresPalavrasLabel}</label>
    <input type="text" id="e-tres-palavras" placeholder="${s.eTresPalavrasPH}">
  </div>

  <div class="form-nav">
    <button class="btn-back-sm" onclick="nextStep('emocional',8,7)">${s.backSmBtn}</button>
    <button class="btn-primary" id="submit-emocional" onclick="submitForm('emocional')">${s.submitBtn}</button>
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
  return res.status(200).json({ ok: true, html: buildEmocionalHtml(s) });
}
