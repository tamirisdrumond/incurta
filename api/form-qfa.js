// api/form-qfa.js
// Returns the QFA (Questionário de Frequência Alimentar) HTML after auth.
//
// TRANSLATION SCOPE — deliberate and documented:
//   TRANSLATED:   UI chrome — headings, instructions, column headers, buttons,
//                 final questions, score panel labels, success state.
//   NOT TRANSLATED: food names, portion descriptions, category headers,
//                 score group labels (Protetores, Construtores…), Odoo note text.
//
// WHY food names are NOT translated:
//   Tamiris reads every Odoo note in PT regardless of the client's language.
//   The FOOD_ITEMS array drives the scoring engine AND the clinical note.
//   Translating food names would make her notes inconsistent and harder to
//   interpret clinically. Nutritional terms like "arroz", "frango", "feijão"
//   are also widely understood by Brazilian/Portuguese-trained clinicians.
//   The scoring group labels (Protetores, Construtores, etc.) stay PT for
//   the same reason — they are clinical output, not user-facing UI.
//
// CONTRACT:
//   POST /api/form-qfa
//   Body: { password: string, lang: 'pt' | 'es' }
//   Response (ok): { ok: true, html: string }
//   Response (fail): { ok: false }

import { getLangStrings } from './i18n.js';

// ─── food data ────────────────────────────────────────────────────────────────
// Intentionally NOT translated. See header comment.
// `portionPT` is the portion description shown in the table — stays PT.
const FOOD_ITEMS = [
  { id:'paes',        label:'Pão francês, pão de forma, integral, torrada',                  portion:'Porção M: 1 unidade ou 2 fatias (50g)',          group:'construtor' },
  { id:'biscoito_s',  label:'Biscoitos sem recheio (doce, salgado)',                          portion:'Porção M: 4 unidades (24g)',                      group:'ultraprocessado' },
  { id:'tapioca',     label:'Tapioca',                                                        portion:'Porção M: 1 fatia média (60g)',                   group:'construtor' },
  { id:'cuscus',      label:'Cuscus',                                                         portion:'Porção M: 1 escumadeira (140g)',                  group:'construtor' },
  { id:'suco_ind',    label:'Suco industrializado',                                           portion:'Porção M: 1 copo americano (190ml)',              group:'ultraprocessado' },
  { id:'refrigerante',label:'Refrigerante',                                                   portion:'Porção M: 1 copo americano (190ml)',              group:'ultraprocessado' },
  { id:'fast_food',   label:'Fast food (hambúrguer, bocadilho, cachorro-quente)',             portion:'Porção M: 1 unidade (250g)',                      group:'ultraprocessado' },
  { id:'batata_frita',label:'Batata frita ou mandioca frita',                                 portion:'Porção M: 1 porção pequena (100g)',               group:'ultraprocessado' },
  { id:'biscoito_r',  label:'Biscoito recheado, waffer, amanteigado',                        portion:'Porção M: 3 unidades (30g)',                      group:'ultraprocessado' },
  { id:'snacks',      label:'Snacks (chips de batata, doritos, salgadinhos industrializados)',portion:'Porção M: meio pacote (80g)',                     group:'ultraprocessado' },
  { id:'embutidos',   label:'Embutidos (presunto, chorizo, jamon, mortadela)',                portion:'Porção M: 2 fatias (30g)',                        group:'ultraprocessado' },
  { id:'arroz',       label:'Arroz branco ou integral cozido',                                portion:'Porção M: 1 escumadeira (125g)',                  group:'construtor' },
  { id:'macarrao',    label:'Macarrão com molho, lasanha, nhoque',                            portion:'Porção M: 1 escumadeira (110g)',                  group:'construtor' },
  { id:'batata_c',    label:'Batata, mandioca, inhame (cozida ou assada), purê',              portion:'Porção M: 1 colher de servir (100g)',             group:'construtor' },
  { id:'sopas',       label:'Sopas (de legumes, canja, creme, etc.)',                         portion:'Porção M: 1 concha (180ml)',                      group:'construtor' },
  { id:'carne_boi',   label:'Carne de boi (bife, cozida, assada), miúdos, vísceras',         portion:'Porção M: 1 bife médio (100g)',                   group:'protetor' },
  { id:'bacon',       label:'Bacon',                                                          portion:'Porção M: 2 fatias (30g)',                        group:'ultraprocessado' },
  { id:'frango',      label:'Frango (cozido, frito, grelhado, assado)',                       portion:'Porção M: 1 pedaço (60g)',                        group:'protetor' },
  { id:'peixe',       label:'Peixe (cozido, frito, assado)',                                  portion:'Porção M: 1 filé pequeno (100g)',                 group:'protetor' },
  { id:'doce_sobr',   label:'Doces, chocolates, bombons',                                     portion:'Porção M: 1 unidade pequena (30g)',               group:'doce' },
  { id:'sorvete',     label:'Sorvete',                                                        portion:'Porção M: 1 bola (60g)',                          group:'doce' },
  { id:'acucar',      label:'Açúcar',                                                         portion:'Porção M: 1/2 colher de sopa (6g)',               group:'doce' },
  { id:'leite',       label:'Leite',                                                          portion:'Porção M: 1/2 copo requeijão (125ml)',            group:'protetor' },
  { id:'iogurte',     label:'Iogurte (natural ou com frutas)',                                portion:'Porção M: 1 pote (170g)',                         group:'protetor' },
  { id:'queijo_a',    label:'Queijo amarelo (mussarela, prato, parmesão, provolone)',         portion:'Porção M: 1 fatia (30g)',                         group:'protetor' },
  { id:'queijo_b',    label:'Queijo branco (ricota, queijo fresco, burgos, cottage)',         portion:'Porção M: 1 fatia (30g)',                         group:'protetor' },
  { id:'feijao',      label:'Feijão, lentilha, grão-de-bico, ervilha',                       portion:'Porção M: 1 concha (90g)',                        group:'protetor' },
  { id:'ovos',        label:'Ovos (cozido, mexido, frito, omelete)',                          portion:'Porção M: 1 unidade (50g)',                       group:'protetor' },
  { id:'legumes_c',   label:'Legumes cozidos (cenoura, brócolis, couve-flor, abobrinha)',     portion:'Porção M: 1 colher de servir (60g)',              group:'protetor' },
  { id:'folhas',      label:'Folhas: alface, rúcula, agrião',                                 portion:'Porção M: 3 folhas médias (30g)',                 group:'protetor' },
  { id:'frutas',      label:'Frutas em geral (laranja, maçã, abacaxi, exceto banana e abacate)', portion:'Porção M: 1 unidade média (180g)',            group:'protetor' },
  { id:'banana',      label:'Banana',                                                         portion:'Porção M: 1 unidade média (100g)',                group:'protetor' },
  { id:'abacate',     label:'Abacate',                                                        portion:'Porção M: 2 colheres de sopa (90g)',              group:'protetor' },
  { id:'oleo_azeite', label:'Óleo, azeite para tempero de salada',                           portion:'Porção M: 1 fio (5ml)',                           group:'neutro' },
  { id:'maionese',    label:'Maionese (salada de maionese ou maionese industrializada)',       portion:'Porção M: 1 colher de sopa (15g)',                group:'ultraprocessado' },
  { id:'suco_nat',    label:'Suco natural',                                                   portion:'Porção M: 1 copo americano (200ml)',              group:'construtor' },
  { id:'cafe',        label:'Café',                                                           portion:'Porção M: 2 xícaras de café (90ml)',              group:'neutro' },
  { id:'cerveja',     label:'Cerveja',                                                        portion:'Porção M: 1 lata (350ml)',                        group:'alcool' },
  { id:'vinho',       label:'Vinho',                                                          portion:'Porção M: 1 taça (150ml)',                        group:'alcool' },
];

// Category headers — stay PT (clinical output)
const CATEGORIES = [
  { header: 'PÃES E ACOMPANHAMENTOS',        ids: ['paes','biscoito_s','tapioca','cuscus'] },
  { header: 'REFEIÇÕES CALÓRICAS / FAST FOOD', ids: ['suco_ind','refrigerante','fast_food','batata_frita','biscoito_r'] },
  { header: 'SNACK E BELISCOS',              ids: ['snacks','embutidos'] },
  { header: 'ARROZ, MASSAS E TUBÉRCULOS',    ids: ['arroz','macarrao','batata_c'] },
  { header: 'SOPAS',                         ids: ['sopas'] },
  { header: 'CARNES E PEIXES',               ids: ['carne_boi','bacon','frango','peixe'] },
  { header: 'DOCES E SOBREMESAS',            ids: ['doce_sobr','sorvete','acucar'] },
  { header: 'LEITE E DERIVADOS',             ids: ['leite','iogurte','queijo_a','queijo_b'] },
  { header: 'LEGUMINOSAS E OVOS',            ids: ['feijao','ovos'] },
  { header: 'VERDURAS E LEGUMES',            ids: ['legumes_c','folhas'] },
  { header: 'FRUTAS',                        ids: ['frutas','banana','abacate'] },
  { header: 'MOLHOS E TEMPEROS',             ids: ['oleo_azeite','maionese'] },
  { header: 'BEBIDAS',                       ids: ['suco_nat','cafe'] },
  { header: 'BEBIDAS ALCOÓLICAS',            ids: ['cerveja','vinho'] },
];

// ─── helpers ──────────────────────────────────────────────────────────────────
function freqOptions() {
  return '<option value="0">—</option>' +
    Array.from({length:10},(_,i)=>`<option value="${i+1}">${i+1}</option>`).join('');
}

function foodRow(item) {
  const {id, label, portion} = item;
  return `
    <tr class="food-row" data-id="${id}" data-group="${item.group}">
      <td class="food-name">
        <span class="food-label">${label}</span>
        <span class="food-portion">${portion}</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_${id}">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'${id}')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'${id}')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'${id}')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'${id}')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_${id}" onchange="recalcItem('${id}')" disabled>
          ${freqOptions()}
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_${id}">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'${id}')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'${id}')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'${id}')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'${id}')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_${id}">—</td>
    </tr>`;
}

function tableBody() {
  const foodMap = Object.fromEntries(FOOD_ITEMS.map(f => [f.id, f]));
  return CATEGORIES.map(cat => {
    const rows = cat.ids.map(id => foodRow(foodMap[id])).join('');
    return `<tbody>
      <tr class="cat-header"><td colspan="5">${cat.header}</td></tr>
      ${rows}
    </tbody>`;
  }).join('\n');
}

// Scoring engine lives in the injected <script> — it references i18n strings
// via a window.__qfaI18n object we inject server-side. This avoids duplicating
// the score classification logic while still allowing translated labels.
function buildQfaHtml(s, lang) {
  const foodItemsJson = JSON.stringify(
    FOOD_ITEMS.map(({id, label, group}) => ({id, label, group}))
  );

  // i18n strings needed by client-side JS (score panel, rating labels)
  const i18nJson = JSON.stringify({
    scoreCalc:    s.qfaScoreCalc,
    scoreExc:     s.qfaScoreExc,     scoreExcSub:  s.qfaScoreExcSub,
    scoreGood:    s.qfaScoreGood,    scoreGoodSub: s.qfaScoreGoodSub,
    scoreWeak:    s.qfaScoreWeak,    scoreWeakSub: s.qfaScoreWeakSub,
    scoreCrit:    s.qfaScoreCrit,    scoreCritSub: s.qfaScoreCritSub,
    rIdeal:       s.qfaRatingIdeal,  rGood:        s.qfaRatingGood,
    rOk:          s.qfaRatingOk,     rInsuf:       s.qfaRatingInsuf,
    rLow:         s.qfaRatingLow,    rMod:         s.qfaRatingMod,
    rHigh:        s.qfaRatingHigh,   rCrit:        s.qfaRatingCrit,
    rPerSem:      s.qfaRatingPerSem, rPts:         s.qfaRatingPts,
    errorMsg:     s.qfaErrorMsg,
    sending:      s.qfaSubmitBtn,
  });

  return `
<!-- QFA FORM — Questionário de Frequência Alimentar -->
<div id="qfa-section" style="display:none;">

<style>
/* QFA-specific styles */
.qfa-intro {
  background: #fff; border-left: 3px solid var(--burgundy);
  padding: 1.5rem 2rem; margin-bottom: 2rem; font-size: 0.88rem;
  line-height: 1.7; color: var(--text-mid);
}
.qfa-intro strong { color: var(--espresso); }
.qfa-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
.qfa-table {
  width: 100%; border-collapse: collapse; min-width: 620px;
}
.qfa-table thead th {
  padding: 0.6rem 0.75rem; font-size: 0.7rem; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--text-light);
  border-bottom: 2px solid var(--cream); text-align: left;
  background: var(--cream-light);
}
.cat-header td {
  background: var(--espresso); color: var(--cream);
  padding: 0.6rem 0.75rem; font-size: 0.72rem; letter-spacing: 0.12em;
  text-transform: uppercase; font-weight: 600;
}
.food-row td {
  padding: 0.6rem 0.75rem; border-bottom: 1px solid rgba(245,235,224,0.8);
  vertical-align: middle;
}
.food-row:hover { background: rgba(245,235,224,0.4); }
.food-name { min-width: 180px; }
.food-label { display: block; font-size: 0.85rem; color: var(--text-dark); }
.food-portion { display: block; font-size: 0.7rem; color: var(--text-light); margin-top: 0.15rem; }
.seg-group { display: flex; gap: 2px; }
.seg-btn {
  padding: 0.3rem 0.5rem; border: 1px solid var(--cream);
  background: #fff; font-size: 0.72rem; font-weight: 600;
  cursor: pointer; transition: all 0.12s; color: var(--text-mid);
  font-family: 'Inter', sans-serif;
}
.seg-btn:hover { border-color: var(--blush); }
.seg-btn.active { background: var(--burgundy); border-color: var(--burgundy); color: #fff; }
.seg-btn.seg-n.active { background: var(--text-light); border-color: var(--text-light); color: #fff; }
.food-freq select {
  border: 1px solid var(--cream); padding: 0.3rem 0.4rem;
  font-family: 'Inter', sans-serif; font-size: 0.82rem;
  color: var(--text-dark); background: var(--cream-light);
  -webkit-appearance: none; width: 60px;
}
.food-freq select:disabled { opacity: 0.4; }
.food-consumo {
  font-size: 0.82rem; color: var(--text-mid);
  text-align: center; min-width: 50px; font-weight: 500;
}
.qfa-score-panel {
  background: #fff; border: 1px solid rgba(201,157,137,0.2);
  padding: 2.5rem; margin-top: 2.5rem;
}
.qfa-score-panel h3 {
  font-family: 'Jost', 'Futura', sans-serif; font-size: 1.4rem;
  font-weight: 700; color: var(--espresso); margin-bottom: 1.5rem;
}
.score-total-box {
  display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem;
  padding: 1.5rem; background: var(--cream-light);
}
.score-num {
  font-family: 'Jost', 'Futura', sans-serif;
  font-size: 3.5rem; font-weight: 800; color: var(--burgundy); line-height: 1;
  min-width: 80px; text-align: center;
}
.score-label { font-size: 1rem; color: var(--espresso); font-weight: 600; }
.score-sub { font-size: 0.82rem; color: var(--text-mid); margin-top: 0.25rem; }
.score-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;
}
.score-cat-item {
  padding: 0.75rem 1rem; background: var(--cream-light); border-left: 3px solid var(--blush);
}
.score-cat-item.ok { border-left-color: #5a8a5a; }
.score-cat-item.warn { border-left-color: var(--gold); }
.score-cat-item.bad { border-left-color: var(--burgundy-vivid); }
.score-cat-name { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-light); }
.score-cat-val { font-size: 1rem; font-weight: 700; color: var(--espresso); }
.score-cat-rating { font-size: 0.75rem; color: var(--text-mid); }
.qfa-final { margin-top: 2rem; }
@media (max-width: 600px) {
  .score-grid { grid-template-columns: 1fr; }
  .qfa-table { min-width: 500px; }
  .seg-btn { padding: 0.28rem 0.4rem; font-size: 0.68rem; }
}
</style>

<div class="form-header" style="padding: 2rem 3rem 0;">
  <div style="margin-bottom:1rem;">
    <button class="btn-back-sm" onclick="backToSelector()">${s.qfaBackBtn}</button>
  </div>
  <div class="form-title">${s.qfaFormTitle}</div>
  <div class="form-sub">${s.qfaFormSub}</div>
</div>

<div id="qfa-form-area" style="padding: 2rem 3rem; max-width: 900px; margin: 0 auto;">

  <!-- STEP 1: Identification -->
  <div id="qfa-step-id" class="qfa-step">
    <div class="step-heading">${s.qfaStep1Heading}</div>
    <div class="step-desc" style="margin-bottom:1.5rem;">${s.qfaStep1Desc}</div>
    <div class="two-col">
      <div class="field"><label>${s.qfaNomeLabel}</label><input type="text" id="qfa-nome" placeholder="${s.qfaNomePH}"></div>
      <div class="field"><label>${s.qfaEmailLabel}</label><input type="email" id="qfa-email" placeholder="${s.qfaEmailPH}"></div>
    </div>
    <div class="qfa-intro">
      <strong>${s.qfaHowTitle}</strong><br>
      ${s.qfaHowUnit}<br>
      ${s.qfaHowFreq}<br>
      ${s.qfaHowPorcao}<br>
      <br>${s.qfaHowNever}
    </div>
    <div id="qfa-step1-error" style="display:none;color:var(--burgundy);font-size:0.82rem;margin-bottom:0.75rem;">${s.qfaStep1Error}</div>
    <div class="form-nav" style="margin-top:1rem;">
      <span></span>
      <button class="btn-primary" onclick="qfaGoStep(2)">${s.continueBtn}</button>
    </div>
  </div>

  <!-- STEP 2: Food frequency table -->
  <div id="qfa-step-food" class="qfa-step" style="display:none;">
    <div class="step-heading">${s.qfaStep2Heading}</div>
    <div class="step-desc" style="margin-bottom:1.5rem;">${s.qfaStep2Desc}</div>

    <div class="qfa-table-wrap">
      <table class="qfa-table">
        <thead>
          <tr>
            <th>${s.qfaColFood}</th>
            <th>${s.qfaColUnit}<br><span style="font-size:0.6rem;text-transform:none;letter-spacing:0">${s.qfaColUnitSub}</span></th>
            <th>${s.qfaColFreq}<br><span style="font-size:0.6rem;text-transform:none;letter-spacing:0">${s.qfaColFreqSub}</span></th>
            <th>${s.qfaColPorcao}<br><span style="font-size:0.6rem;text-transform:none;letter-spacing:0">${s.qfaColPorcaoSub}</span></th>
            <th>${s.qfaColConsumo}<br><span style="font-size:0.6rem;text-transform:none;letter-spacing:0">${s.qfaColConsumoSub}</span></th>
          </tr>
        </thead>
        ${tableBody()}
      </table>
    </div>

    <div class="form-nav" style="margin-top:2rem;">
      <button class="btn-back-sm" onclick="qfaGoStep(1)">${s.backSmBtn}</button>
      <button class="btn-primary" onclick="qfaGoStep(3)">${s.qfaVerResultBtn}</button>
    </div>
  </div>

  <!-- STEP 3: Score + final questions -->
  <div id="qfa-step-result" class="qfa-step" style="display:none;">
    <div class="step-heading">${s.qfaStep3Heading}</div>
    <div class="step-desc" style="margin-bottom:1.5rem;">${s.qfaStep3Desc}</div>

    <div class="qfa-score-panel" id="qfa-score-display">
      <h3>${s.qfaScoreTitle}</h3>
      <div class="score-total-box">
        <div class="score-num" id="score-total-num">—</div>
        <div>
          <div class="score-label" id="score-total-label">${s.qfaScoreCalc}</div>
          <div class="score-sub" id="score-total-sub"></div>
        </div>
      </div>
      <div class="score-grid" id="score-grid"></div>
    </div>

    <div class="qfa-final">
      <div class="field" style="margin-top:2rem;">
        <label>${s.qfaOutrosLabel}</label>
        <textarea id="qfa-outros" placeholder="${s.qfaOutrosPH}"></textarea>
      </div>
      <div class="field">
        <label>${s.qfaGorduraLabel}</label>
        <div class="radio-group" id="qfa-gordura">
          <label class="radio-option" onclick="selectRadio(this,'qfa-gordura')"><div class="radio-dot"></div>${s.qfaGorduraOpt1}</label>
          <label class="radio-option" onclick="selectRadio(this,'qfa-gordura')"><div class="radio-dot"></div>${s.qfaGorduraOpt2}</label>
          <label class="radio-option" onclick="selectRadio(this,'qfa-gordura')"><div class="radio-dot"></div>${s.qfaGorduraOpt3}</label>
          <label class="radio-option" onclick="selectRadio(this,'qfa-gordura')"><div class="radio-dot"></div>${s.qfaGorduraOpt4}</label>
        </div>
      </div>
      <div class="field">
        <label>${s.qfaPeriodoLabel}</label>
        <div class="radio-group" id="qfa-periodo">
          <label class="radio-option" onclick="selectRadio(this,'qfa-periodo')"><div class="radio-dot"></div>${s.qfaPeriodoOpt1}</label>
          <label class="radio-option" onclick="selectRadio(this,'qfa-periodo')"><div class="radio-dot"></div>${s.qfaPeriodoOpt2}</label>
          <label class="radio-option" onclick="selectRadio(this,'qfa-periodo')"><div class="radio-dot"></div>${s.qfaPeriodoOpt3}</label>
          <label class="radio-option" onclick="selectRadio(this,'qfa-periodo')"><div class="radio-dot"></div>${s.qfaPeriodoOpt4}</label>
        </div>
      </div>
    </div>

    <div id="qfa-submit-error" style="display:none;color:var(--burgundy);font-size:0.82rem;margin-bottom:0.75rem;"></div>
    <div class="form-nav" style="margin-top:2rem;">
      <button class="btn-back-sm" onclick="qfaGoStep(2)">${s.backSmBtn}</button>
      <button class="btn-primary" id="qfa-submit-btn" onclick="submitQfa()">${s.qfaSubmitBtn}</button>
    </div>
  </div>

  <!-- Success -->
  <div id="qfa-success" style="display:none; text-align:center; padding:4rem 2rem;">
    <div class="success-icon">✓</div>
    <h2 style="font-family:'Jost',sans-serif;font-size:1.8rem;font-weight:700;color:var(--espresso);margin-bottom:0.75rem;">${s.qfaSuccessTitle}</h2>
    <p style="font-size:0.9rem;color:var(--text-mid);line-height:1.7;max-width:440px;margin:0 auto 2rem;">${s.qfaSuccessText}</p>
    <button class="btn-outline" onclick="backToSelector()">${s.qfaSuccessBackBtn}</button>
  </div>

</div><!-- /qfa-form-area -->

<script>
// i18n strings for client-side score rendering (injected server-side)
window.__qfaI18n = ${i18nJson};

// food items for scoring engine (labels stay PT — see api/form-qfa.js header)
const FOOD_ITEMS = ${foodItemsJson};

// ─── QFA NAVIGATION ──────────────────────────────────────────────────────────
// NOTE: This function is intentionally named _qfaReveal, not openQfa.
// openQfa() is defined in questionarios.html and handles the fetch + injection.
// This internal function just makes the already-injected QFA section visible.
function _qfaReveal() {
  document.getElementById('selector').style.display = 'none';
  document.getElementById('qfa-section').style.display = 'block';
  window.scrollTo(0,0);
}
function qfaGoStep(n) {
  if (n === 2) {
    const name  = document.getElementById('qfa-nome').value.trim();
    const email = document.getElementById('qfa-email').value.trim();
    const err   = document.getElementById('qfa-step1-error');
    if (!name || !email.includes('@')) { err.style.display='block'; return; }
    err.style.display = 'none';
  }
  document.querySelectorAll('.qfa-step').forEach(s => s.style.display='none');
  const steps = {1:'qfa-step-id', 2:'qfa-step-food', 3:'qfa-step-result'};
  if (n === 3) {
    document.getElementById('qfa-step-result').style.display = 'block';
    renderQfaScore();
  } else {
    document.getElementById(steps[n]).style.display = 'block';
  }
  window.scrollTo({top:0, behavior:'smooth'});
}

// ─── UNIT / PORTION CONTROLS ─────────────────────────────────────────────────
function setUnit(btn, id) {
  btn.closest('.seg-group').querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const unit = btn.dataset.val;
  const freqSel = document.getElementById('f_' + id);
  freqSel.disabled = (unit === 'N');
  if (unit === 'N') freqSel.value = '0';
  recalcItem(id);
}
function setPorcao(btn, id) {
  btn.closest('.seg-group').querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  recalcItem(id);
}
function recalcItem(id) {
  const unitBtn = document.querySelector('#u_' + id + ' .seg-btn.active');
  const portBtn = document.querySelector('#p_' + id + ' .seg-btn.active');
  const freqVal = parseInt(document.getElementById('f_' + id).value) || 0;
  const unit    = unitBtn ? unitBtn.dataset.val : 'N';
  const port    = portBtn ? portBtn.dataset.val : 'M';
  const cell    = document.getElementById('c_' + id);
  if (unit === 'N' || freqVal === 0) { cell.textContent = '—'; cell.dataset.consumo = '0'; return; }
  const wf = unit==='D' ? freqVal*7 : unit==='S' ? freqVal : freqVal/4;
  const pf = {P:0.75, M:1, G:1.5, E:2}[port] || 1;
  const consumo = wf * pf;
  cell.textContent = consumo.toFixed(1);
  cell.dataset.consumo = consumo;
}

// ─── SCORING ENGINE ───────────────────────────────────────────────────────────
function getConsumoPorGroup() {
  const groups = {ultraprocessado:[], doce:[], alcool:[], protetor:[], construtor:[]};
  FOOD_ITEMS.forEach(item => {
    const cell = document.getElementById('c_' + item.id);
    const v = parseFloat(cell ? cell.dataset.consumo : 0) || 0;
    if (groups[item.group]) groups[item.group].push({id:item.id, label:item.label, consumo:v});
  });
  return groups;
}
function scoreProtetor(c)       { return c >= 7 ? 2 : c >= 3 ? 1 : 0; }
function scoreUltraprocessado(c){ return c === 0 ? 0 : c <= 1 ? -1 : c <= 3 ? -2 : -3; }
function scoreDoce(c)           { return c === 0 ? 0 : c <= 2 ? -1 : c <= 5 ? -2 : -3; }
function scoreConstrutor(c)     { return c >= 7 ? 2 : c >= 3 ? 1 : c >= 1 ? 0 : -1; }
function scoreAlcool(c)         { return c === 0 ? 0 : c <= 1 ? -1 : c <= 3 ? -2 : -3; }

function ratingLabel(group, consumo) {
  const i = window.__qfaI18n;
  if (group === 'protetor' || group === 'construtor') {
    if (consumo >= 7) return [i.rIdeal, 'ok'];
    if (consumo >= 3) return [i.rGood,  'ok'];
    if (consumo >= 1) return [i.rOk,    'warn'];
    return [i.rInsuf, 'bad'];
  } else {
    if (consumo === 0) return [i.rOk,   'ok'];
    if (consumo <= 1)  return [i.rLow,  'warn'];
    if (consumo <= 3)  return [i.rMod,  'warn'];
    if (consumo <= 7)  return [i.rHigh, 'bad'];
    return [i.rCrit, 'bad'];
  }
}

function renderQfaScore() {
  const i      = window.__qfaI18n;
  const groups = getConsumoPorGroup();
  let totalScore = 0;
  const breakdown = [];

  const add = (label, items, scoreFn) => {
    const total = items.reduce((s,x)=>s+x.consumo,0) / Math.max(items.length,1);
    const score = items.reduce((s,x)=>s+scoreFn(x.consumo),0);
    totalScore += score;
    breakdown.push({label, total, score, group: items[0]?.group || ''});
  };

  // labels stay PT — these appear in Odoo notes
  add('Protetores',       groups.protetor,        scoreProtetor);
  add('Construtores',     groups.construtor,       scoreConstrutor);
  add('Ultra-processados',groups.ultraprocessado,  scoreUltraprocessado);
  add('Doces',            groups.doce,             scoreDoce);
  add('Álcool',           groups.alcool,           scoreAlcool);

  let scoreClass, scoreSub;
  if      (totalScore >= 25) { scoreClass = i.scoreExc;  scoreSub = i.scoreExcSub; }
  else if (totalScore >= 10) { scoreClass = i.scoreGood; scoreSub = i.scoreGoodSub; }
  else if (totalScore >= 0)  { scoreClass = i.scoreWeak; scoreSub = i.scoreWeakSub; }
  else                       { scoreClass = i.scoreCrit; scoreSub = i.scoreCritSub; }

  document.getElementById('score-total-num').textContent   = totalScore;
  document.getElementById('score-total-label').textContent = scoreClass;
  document.getElementById('score-total-sub').textContent   = scoreSub;

  const grid = document.getElementById('score-grid');
  grid.innerHTML = '';
  breakdown.forEach(b => {
    const [rLabel, rClass] = ratingLabel(b.group, b.total);
    const div = document.createElement('div');
    div.className = 'score-cat-item ' + rClass;
    div.innerHTML =
      '<div class="score-cat-name">' + b.label + '</div>' +
      '<div class="score-cat-val">' + (b.score >= 0 ? '+' : '') + b.score + ' ' + i.rPts + '</div>' +
      '<div class="score-cat-rating">' + rLabel + ' · ' + b.total.toFixed(1) + ' ' + i.rPerSem + '</div>';
    grid.appendChild(div);
  });

  window._qfaScore = { total: totalScore, scoreClass, breakdown };
}

// ─── BUILD NOTE FOR ODOO (always PT — clinical output) ────────────────────────
function buildQfaNote() {
  const groups = getConsumoPorGroup();
  const s = window._qfaScore || {};
  const total = s.total || 0;

  let interpretation;
  if      (total < 0)  interpretation = '<strong>INTERPRETAÇÃO CLÍNICA:</strong> Pontuação negativa. Foco: Reduzir ultra-processados — NÃO iniciar dieta restritiva.';
  else if (total < 10) interpretation = '<strong>INTERPRETAÇÃO CLÍNICA:</strong> Pontuação baixa. Foco: Ajustar base alimentar, corrigir excessos específicos.';
  else                 interpretation = '<strong>INTERPRETAÇÃO CLÍNICA:</strong> Boa pontuação. Foco: Comportamento (não dieta).';

  let rows = '';
  FOOD_ITEMS.forEach(item => {
    const cell    = document.getElementById('c_' + item.id);
    const unitBtn = document.querySelector('#u_' + item.id + ' .seg-btn.active');
    const portBtn = document.querySelector('#p_' + item.id + ' .seg-btn.active');
    const freqVal = document.getElementById('f_' + item.id)?.value || '0';
    const unit    = unitBtn ? unitBtn.dataset.val : 'N';
    const port    = portBtn ? portBtn.dataset.val : 'M';
    const consumo = cell ? (cell.dataset.consumo || '0') : '0';
    rows += '<tr><td>' + item.label + '</td><td>' + unit + '</td><td>' + freqVal + '</td><td>' + port + '</td><td>' + parseFloat(consumo).toFixed(1) + '</td></tr>';
  });

  return \`
<h3>🍽️ QFA — Frequência Alimentar · \${document.getElementById('qfa-nome').value}</h3>
<p><strong>Data:</strong> \${new Date().toLocaleString('pt-BR')}</p>
<p style="color:red;font-weight:bold;">\${interpretation}</p>
<hr/>
<h4>Pontuação Total: \${total} — \${s.scoreClass || ''}</h4>
<table border="1" cellpadding="4" style="border-collapse:collapse;font-size:12px;">
<tr style="background:#eee;"><th>Alimento</th><th>Unidade</th><th>Freq</th><th>Porção</th><th>Consumo/sem</th></tr>
\${rows}
</table>
<hr/>
<p><strong>Outros alimentos:</strong> \${document.getElementById('qfa-outros')?.value || '—'}</p>
<p><strong>Come gordura visível:</strong> \${getRadioVal('qfa-gordura')}</p>
<p><strong>Período principal:</strong> \${getRadioVal('qfa-periodo')}</p>
  \`.trim();
}

// ─── SUBMIT QFA ───────────────────────────────────────────────────────────────
async function submitQfa() {
  const name  = document.getElementById('qfa-nome').value.trim();
  const email = document.getElementById('qfa-email').value.trim();
  if (!name || !email) { qfaGoStep(1); return; }

  const btn = document.getElementById('qfa-submit-btn');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span>' + window.__qfaI18n.sending;

  const note = buildQfaNote();
  try {
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({type:'qfa', name, email, note})
    });
    if (!res.ok) throw new Error('server error');
    document.getElementById('qfa-step-result').style.display = 'none';
    document.getElementById('qfa-success').style.display = 'block';
    window.scrollTo(0,0);
  } catch(e) {
    const errEl = document.getElementById('qfa-submit-error');
    errEl.textContent = window.__qfaI18n.errorMsg;
    errEl.style.display = 'block';
    btn.disabled = false;
    btn.innerHTML = window.__qfaI18n.sending;
  }
}
</script>
</div><!-- /qfa-section -->`;
}

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { password, lang = 'pt' } = req.body || {};
  const correct = process.env.CLIENT_PASSWORD;
  if (!correct) return res.status(500).json({ error: 'Server misconfiguration' });
  if (password !== correct) return res.status(200).json({ ok: false });
  const s = getLangStrings(lang);
  return res.status(200).json({ ok: true, html: buildQfaHtml(s, lang) });
}
