// api/verify-password.js
// Vercel serverless function — returns app HTML on successful auth.
// Required env var: CLIENT_PASSWORD (set in Vercel Dashboard → Settings → Environment Variables)

const APP_HTML = `<!-- MAIN APP -->
<div id="app">

  <!-- QUESTIONNAIRE SELECTOR -->
  <div id="selector">
    <div class="selector-inner">
      <h1>Bem-vinda ao seu<br><em>espaço de autoconhecimento</em></h1>
      <p class="sub">Escolha o questionário que a Tamiris pediu que você preenchesse.<br>
      Suas respostas são confidenciais e serão analisadas antes da sua consulta.</p>
      <div class="q-cards">
        <div class="q-card" onclick="openForm('fisica')">
          <div class="q-card-num">01</div>
          <h3>Definição Física</h3>
          <p>Sobre seu corpo, sintomas, rotina, sono, alimentação e objetivos físicos. Antes de mudar o corpo, precisamos entender o que queremos sentir dentro dele.</p>
          <span class="q-card-tag">25 perguntas · ~12 min</span>
        </div>
        <div class="q-card" onclick="openForm('emocional')">
          <div class="q-card-num">02</div>
          <h3>Definição Emocional</h3>
          <p>Sobre sua relação emocional com a comida, gatilhos, sentimentos e a versão de si mesma que quer construir.</p>
          <span class="q-card-tag">38 perguntas · ~18 min</span>
        </div>
        <div class="q-card" onclick="openQfa()">
          <div class="q-card-num">03</div>
          <h3>Frequência Alimentar</h3>
          <p>Avalie seus hábitos alimentares habituais: quais alimentos come, com que frequência e em que quantidade.</p>
          <span class="q-card-tag">39 alimentos · ~15 min · com pontuação</span>
        </div>
      </div>
    </div>
  </div>

  <!-- FORM AREA -->
  <div id="form-area">
    <div class="form-header">
      <div style="margin-bottom:1rem;">
        <button class="btn-back-sm" onclick="backToSelector()">← Escolher outro questionário</button>
      </div>
      <div class="form-title" id="form-title"></div>
      <div class="form-sub" id="form-sub"></div>
    </div>

    <div class="progress-wrap">
      <div class="progress-label">
        <span id="prog-step-label">Passo 1</span>
        <span id="prog-pct">0%</span>
      </div>
      <div class="progress-bar"><div class="progress-fill" id="prog-fill" style="width:0%"></div></div>
    </div>

    <!-- ══════════════════════════════════════════════ -->
    <!-- DEFINIÇÃO FÍSICA STEPS                        -->
    <!-- ══════════════════════════════════════════════ -->

    <!-- F-STEP 1: Identificação -->
    <div class="form-step" id="f-step-1" data-form="fisica">
      <div class="step-heading">Identificação</div>
      <div class="step-desc">Passo 1 de 7 — Dados básicos</div>
      <div class="two-col">
        <div class="field"><label>Nome completo *</label><input type="text" id="f-nome" placeholder="Seu nome completo"></div>
        <div class="field"><label>Data de nascimento *</label><input type="date" id="f-nasc"></div>
      </div>
      <div class="two-col">
        <div class="field"><label>Email *</label><input type="email" id="f-email" placeholder="seu@email.com"></div>
        <div class="field"><label>WhatsApp</label><input type="tel" id="f-tel" placeholder="+55 00 00000-0000"></div>
      </div>
      <div class="two-col">
        <div class="field"><label>Peso atual (kg)</label><input type="text" id="f-peso" placeholder="Ex: 68"></div>
        <div class="field"><label>Altura (cm)</label><input type="text" id="f-altura" placeholder="Ex: 165"></div>
      </div>
      <div id="f-step1-error" style="display:none;color:var(--burgundy);font-size:0.82rem;margin-top:0.75rem;">Por favor, preencha o nome e o email antes de continuar.</div>
      <div class="form-nav">
        <span></span>
        <button class="btn-primary" onclick="validateStep1('fisica')">Continuar →</button>
      </div>
    </div>

    <!-- F-STEP 2: Corpo e rotina -->
    <div class="form-step" id="f-step-2" data-form="fisica">
      <div class="step-heading">Corpo e rotina</div>
      <div class="step-desc">Passo 2 de 7 — Sono, alimentação e atividade física</div>

      <div class="field">
        <label>Quantas horas de sono, em média, você tem por noite?</label>
        <div class="radio-group" id="f-sono">
          <label class="radio-option" onclick="selectRadio(this,'f-sono')"><div class="radio-dot"></div>Menos de 5 horas</label>
          <label class="radio-option" onclick="selectRadio(this,'f-sono')"><div class="radio-dot"></div>Entre 5 e 7 horas</label>
          <label class="radio-option" onclick="selectRadio(this,'f-sono')"><div class="radio-dot"></div>Mais de 7 horas</label>
        </div>
      </div>

      <div class="field">
        <label>Que tipo de alimentação você sente que o seu corpo pede hoje? (pode marcar mais de um)</label>
        <div class="check-group" id="f-alim">
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Energia rápida (doces, pães)</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Conforto (comidas quentes, caseiras)</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Leveza e vitalidade (saladas, frutas, água)</label>
        </div>
      </div>

      <div class="field">
        <label>Você sente que consegue se alimentar com calma?</label>
        <div class="radio-group" id="f-calma">
          <label class="radio-option" onclick="selectRadio(this,'f-calma')"><div class="radio-dot"></div>Sim, consigo sempre.</label>
          <label class="radio-option" onclick="selectRadio(this,'f-calma')"><div class="radio-dot"></div>Sim, mas não sempre.</label>
          <label class="radio-option" onclick="selectRadio(this,'f-calma')"><div class="radio-dot"></div>Às vezes.</label>
          <label class="radio-option" onclick="selectRadio(this,'f-calma')"><div class="radio-dot"></div>Não consigo.</label>
        </div>
      </div>

      <div class="field">
        <label>No trabalho, você passa a maior parte do tempo: (pode marcar mais de um)</label>
        <div class="check-group" id="f-trabalho">
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Sentada</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Caminhando</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Em pé</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Subindo e descendo escadas</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Carregando pesos</label>
        </div>
      </div>

      <div class="field">
        <label>Quem irá preparar as refeições do plano alimentar?</label>
        <input type="text" id="f-refeicoes" placeholder="Ex: eu mesma, marido, empregada…">
      </div>

      <div class="form-nav">
        <button class="btn-back-sm" onclick="nextStep('fisica',2,1)">← Voltar</button>
        <button class="btn-primary" onclick="nextStep('fisica',2,3)">Continuar →</button>
      </div>
    </div>

    <!-- F-STEP 3: Saúde e sintomas -->
    <div class="form-step" id="f-step-3" data-form="fisica">
      <div class="step-heading">Saúde e sintomas</div>
      <div class="step-desc">Passo 3 de 7 — Sinais do corpo</div>

      <div class="field">
        <label>Há algum sintoma que percebe com frequência? (pode marcar mais de um)</label>
        <div class="check-group" id="f-sintomas">
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Inchaço</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Cansaço constante</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Retenção de líquido</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Irritabilidade</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Queda de cabelo</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Pele ressecada ou oleosa</label>
        </div>
      </div>
      <div class="field">
        <label>Outros sintomas que gostaria de mencionar</label>
        <textarea id="f-sintomas-outro" placeholder="Descreva livremente…"></textarea>
      </div>

      <div class="field">
        <label>Há algum marcador de saúde que deseja melhorar (colesterol, energia, sono)? Realizou algum exame laboratorial recente?</label>
        <textarea id="f-marcadores" placeholder="Descreva seus exames ou indicadores de saúde…"></textarea>
      </div>

      <div class="form-nav">
        <button class="btn-back-sm" onclick="nextStep('fisica',3,2)">← Voltar</button>
        <button class="btn-primary" onclick="nextStep('fisica',3,4)">Continuar →</button>
      </div>
    </div>

    <!-- F-STEP 4: Autoconhecimento -->
    <div class="form-step" id="f-step-4" data-form="fisica">
      <div class="step-heading">Autoconhecimento</div>
      <div class="step-desc">Passo 4 de 7 — Sua relação consigo mesma</div>

      <div class="field">
        <label>Como está sua relação com o espelho?</label>
        <div class="radio-group" id="f-espelho">
          <label class="radio-option" onclick="selectRadio(this,'f-espelho')"><div class="radio-dot"></div>Evito me olhar</label>
          <label class="radio-option" onclick="selectRadio(this,'f-espelho')"><div class="radio-dot"></div>Me olho com indiferença</label>
          <label class="radio-option" onclick="selectRadio(this,'f-espelho')"><div class="radio-dot"></div>Me olho com carinho</label>
          <label class="radio-option" onclick="selectRadio(this,'f-espelho')"><div class="radio-dot"></div>Estou voltando a me olhar</label>
          <label class="radio-option" onclick="selectRadio(this,'f-espelho')"><div class="radio-dot"></div>Não me reconheço</label>
        </div>
      </div>

      <div class="field">
        <label>Em que momento do dia sente que "se perde de si mesma" e o tempo passa?</label>
        <div class="radio-group" id="f-perde">
          <label class="radio-option" onclick="selectRadio(this,'f-perde')"><div class="radio-dot"></div>Pela manhã, ao acordar.</label>
          <label class="radio-option" onclick="selectRadio(this,'f-perde')"><div class="radio-dot"></div>Após a dedicação de cuidar dos filhos, casa e família</label>
          <label class="radio-option" onclick="selectRadio(this,'f-perde')"><div class="radio-dot"></div>À noite</label>
          <label class="radio-option" onclick="selectRadio(this,'f-perde')"><div class="radio-dot"><br></div>Outro:</label>
        </div>
        <input type="text" id="f-perde-outro" placeholder="Se outro, descreva aqui…" style="margin-top:0.5rem;">
      </div>

      <div class="field">
        <label>O que você sente falta de fazer por você? (Ex: caminhar sozinha, cuidar do cabelo, almoçar sem pressa, ler, treinar…)</label>
        <textarea id="f-falta"></textarea>
      </div>

      <div class="field">
        <label>Se tivesse uma hora por dia só sua, o que faria com ela?</label>
        <textarea id="f-hora"></textarea>
      </div>

      <div class="field">
        <label>Quando pensa em voltar a se cuidar, o que mais te impede hoje?</label>
        <textarea id="f-impede" placeholder="Ex: falta de energia, apoio, tempo, motivação…"></textarea>
      </div>

      <div class="form-nav">
        <button class="btn-back-sm" onclick="nextStep('fisica',4,3)">← Voltar</button>
        <button class="btn-primary" onclick="nextStep('fisica',4,5)">Continuar →</button>
      </div>
    </div>

    <!-- F-STEP 5: Objetivos físicos -->
    <div class="form-step" id="f-step-5" data-form="fisica">
      <div class="step-heading">Objetivos físicos</div>
      <div class="step-desc">Passo 5 de 7 — O que você quer conquistar</div>

      <div class="field">
        <label>Você busca mais definição, redução de volume, energia, ou leveza corporal?</label>
        <textarea id="f-objetivo" placeholder="Descreva em suas próprias palavras…"></textarea>
      </div>

      <div class="field">
        <label>Quais mudanças físicas você já começou a notar (mesmo pequenas)?</label>
        <textarea id="f-mudancas" placeholder="Mesmo que sejam pequenas percepções…"></textarea>
      </div>

      <div class="form-nav">
        <button class="btn-back-sm" onclick="nextStep('fisica',5,4)">← Voltar</button>
        <button class="btn-primary" onclick="nextStep('fisica',5,6)">Continuar →</button>
      </div>
    </div>

    <!-- F-STEP 6: Maternidade (opcional) -->
    <div class="form-step" id="f-step-6" data-form="fisica">
      <div class="step-heading">Maternidade</div>
      <div class="step-desc">Passo 6 de 7 — Responda apenas se for mãe</div>

      <div class="field">
        <label>Você sente culpa quando tenta priorizar seu tempo?</label>
        <div class="radio-group" id="f-culpa">
          <label class="radio-option" onclick="selectRadio(this,'f-culpa')"><div class="radio-dot"></div>Sim, com frequência</label>
          <label class="radio-option" onclick="selectRadio(this,'f-culpa')"><div class="radio-dot"></div>Às vezes.</label>
          <label class="radio-option" onclick="selectRadio(this,'f-culpa')"><div class="radio-dot"></div>Não sinto</label>
          <label class="radio-option" onclick="selectRadio(this,'f-culpa')"><div class="radio-dot"></div>Não sou mãe</label>
        </div>
      </div>

      <div class="field">
        <label>Depois da maternidade, qual sentimento mais mudou em relação ao seu corpo? (pode marcar mais de um)</label>
        <div class="check-group" id="f-mat-sentimento">
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Gratidão</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Desconexão</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Apenas críticas</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Orgulho</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Cansaço</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Não se aplica</label>
        </div>
      </div>

      <div class="field">
        <label>Como mudou sua relação com o corpo e a comida depois da gestação?</label>
        <textarea id="f-gestacao" placeholder="Se não for mãe, pode deixar em branco."></textarea>
      </div>

      <div class="field">
        <label>Como está sua rotina atual com o bebê ou os filhos?</label>
        <div class="radio-group" id="f-rotina">
          <label class="radio-option" onclick="selectRadio(this,'f-rotina')"><div class="radio-dot"></div>Organizada</label>
          <label class="radio-option" onclick="selectRadio(this,'f-rotina')"><div class="radio-dot"></div>Não consigo ter uma rotina</label>
          <label class="radio-option" onclick="selectRadio(this,'f-rotina')"><div class="radio-dot"></div>Alterno entre os dois.</label>
          <label class="radio-option" onclick="selectRadio(this,'f-rotina')"><div class="radio-dot"></div>Não se aplica</label>
        </div>
      </div>

      <div class="form-nav">
        <button class="btn-back-sm" onclick="nextStep('fisica',6,5)">← Voltar</button>
        <button class="btn-primary" onclick="nextStep('fisica',6,7)">Continuar →</button>
      </div>
    </div>

    <!-- F-STEP 7: Motivação e finalização -->
    <div class="form-step" id="f-step-7" data-form="fisica">
      <div class="step-heading">Motivação e finalização</div>
      <div class="step-desc">Passo 7 de 7 — Quase lá!</div>

      <div class="field">
        <label>O quanto você está motivada para atingir seu objetivo? (1 = pouco motivada, 10 = muito motivada)</label>
        <div class="scale-wrap">
          <span class="scale-label">Pouco</span>
          <div id="f-motivacao" style="display:flex;gap:0.4rem;flex-wrap:wrap;">
            <button class="scale-btn" onclick="selectScale(this,'f-motivacao')">1</button>
            <button class="scale-btn" onclick="selectScale(this,'f-motivacao')">2</button>
            <button class="scale-btn" onclick="selectScale(this,'f-motivacao')">3</button>
            <button class="scale-btn" onclick="selectScale(this,'f-motivacao')">4</button>
            <button class="scale-btn" onclick="selectScale(this,'f-motivacao')">5</button>
            <button class="scale-btn" onclick="selectScale(this,'f-motivacao')">6</button>
            <button class="scale-btn" onclick="selectScale(this,'f-motivacao')">7</button>
            <button class="scale-btn" onclick="selectScale(this,'f-motivacao')">8</button>
            <button class="scale-btn" onclick="selectScale(this,'f-motivacao')">9</button>
            <button class="scale-btn" onclick="selectScale(this,'f-motivacao')">10</button>
          </div>
          <span class="scale-label">Muito</span>
        </div>
      </div>

      <div class="field">
        <label>Como você gostaria de se sentir ao final do programa em três palavras?</label>
        <input type="text" id="f-tres-palavras" placeholder="Ex: leve, confiante, disciplinada">
      </div>

      <div class="field">
        <label>Algo a mais que queira me contar?</label>
        <textarea id="f-obs" placeholder="Fique à vontade para compartilhar o que sentir relevante…"></textarea>
      </div>

      <div class="form-nav">
        <button class="btn-back-sm" onclick="nextStep('fisica',7,6)">← Voltar</button>
        <button class="btn-primary" id="submit-fisica" onclick="submitForm('fisica')">Enviar respostas</button>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════ -->
    <!-- DEFINIÇÃO EMOCIONAL STEPS                     -->
    <!-- ══════════════════════════════════════════════ -->

    <!-- E-STEP 1: Identificação -->
    <div class="form-step" id="e-step-1" data-form="emocional">
      <div class="step-heading">Identificação</div>
      <div class="step-desc">Passo 1 de 8 — Dados básicos</div>
      <div class="two-col">
        <div class="field"><label>Nome completo *</label><input type="text" id="e-nome" placeholder="Seu nome completo"></div>
        <div class="field"><label>Data de nascimento *</label><input type="date" id="e-nasc"></div>
      </div>
      <div class="field"><label>Email *</label><input type="email" id="e-email" placeholder="seu@email.com"></div>

      <div class="field">
        <label>Se você pudesse dar um nome para a nova versão que quer construir, qual seria?</label>
        <input type="text" id="e-versao" placeholder="Ex: minha versão confiante, versão leve, versão disciplinada…">
      </div>

      <div class="field">
        <label>Há uma ocasião especial para que queira perder peso? (pode marcar mais de um)</label>
        <div class="check-group" id="e-ocasiao">
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Férias</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Casamento</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Aniversário</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Verão</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Viagem</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Festas ou evento familiar</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Não é por uma ocasião</label>
        </div>
      </div>

      <div id="e-step1-error" style="display:none;color:var(--burgundy);font-size:0.82rem;margin-top:0.75rem;">Por favor, preencha o nome e o email antes de continuar.</div>
      <div class="form-nav">
        <span></span>
        <button class="btn-primary" onclick="validateStep1('emocional')">Continuar →</button>
      </div>
    </div>

    <!-- E-STEP 2: Gatilhos emocionais -->
    <div class="form-step" id="e-step-2" data-form="emocional">
      <div class="step-heading">Gatilhos emocionais</div>
      <div class="step-desc">Passo 2 de 8 — Sua relação emocional com a comida</div>

      <div class="field">
        <label>Quando você se sente mais vulnerável e busca comida como conforto? (pode marcar mais de um)</label>
        <div class="check-group" id="e-vulneravel">
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Sozinha</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Cansada</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Pressionada</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Entediada</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Carente</label>
        </div>
        <input type="text" id="e-vulneravel-outro" placeholder="Outro: descreva…" style="margin-top:0.5rem;">
      </div>

      <div class="field">
        <label>O que você acha que a comida tem te oferecido além de sabor? (pode marcar mais de um)</label>
        <div class="check-group" id="e-comida-oferece">
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Pausa</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Prazer</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Acolhimento</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Recompensa</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Controle</label>
        </div>
      </div>

      <div class="field">
        <label>Quais momentos do dia você sente mais vontade de comer? (pode marcar mais de um)</label>
        <div class="check-group" id="e-momentos">
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>No fim do dia</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Quando está sozinha</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Após o trabalho</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Após brigas</label>
        </div>
      </div>

      <div class="field">
        <label>Qual é o melhor horário do seu dia para cuidar de si e o que costuma atrapalhar isso?</label>
        <textarea id="e-horario"></textarea>
      </div>

      <div class="form-nav">
        <button class="btn-back-sm" onclick="nextStep('emocional',2,1)">← Voltar</button>
        <button class="btn-primary" onclick="nextStep('emocional',2,3)">Continuar →</button>
      </div>
    </div>

    <!-- E-STEP 3: Sentimentos e autoconhecimento -->
    <div class="form-step" id="e-step-3" data-form="emocional">
      <div class="step-heading">Sentimentos e autoconhecimento</div>
      <div class="step-desc">Passo 3 de 8 — O que quer reconstruir</div>

      <div class="field">
        <label>Qual sentimento você mais quer reconstruir em relação a si mesma? (pode marcar mais de um)</label>
        <div class="check-group" id="e-reconstruir">
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Segurança</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Leveza</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Autoconfiança</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Feminilidade</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Orgulho</label>
        </div>
      </div>

      <div class="field">
        <label>Se a comida não fosse seu refúgio, o que poderia ser? (pode marcar mais de um)</label>
        <div class="check-group" id="e-refugio">
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Autocuidado</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Descanso</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Rotina</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Prazer</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Tempo para si</label>
        </div>
      </div>

      <div class="field">
        <label>Qual parte do seu corpo você mais gostaria de melhorar? (pode marcar mais de um)</label>
        <div class="check-group" id="e-corpo-parte">
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Barriga</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Braço</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Perna</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Bochechas</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Papada/queixo duplo</label>
        </div>
      </div>

      <div class="form-nav">
        <button class="btn-back-sm" onclick="nextStep('emocional',3,2)">← Voltar</button>
        <button class="btn-primary" onclick="nextStep('emocional',3,4)">Continuar →</button>
      </div>
    </div>

    <!-- E-STEP 4: Escala comportamental -->
    <div class="form-step" id="e-step-4" data-form="emocional">
      <div class="step-heading">Escala comportamental</div>
      <div class="step-desc">Passo 4 de 8 — Assinale de 1 a 5 se a resposta não lhe representa, de 6 a 10 se lhe representa</div>

      <div class="field">
        <label>Quando você faz uma refeição, você tem o hábito de repetir?</label>
        <div id="e-repetir" style="display:flex;gap:0.4rem;flex-wrap:wrap;">
          <button class="scale-btn" onclick="selectScale(this,'e-repetir')">1</button><button class="scale-btn" onclick="selectScale(this,'e-repetir')">2</button>
          <button class="scale-btn" onclick="selectScale(this,'e-repetir')">3</button><button class="scale-btn" onclick="selectScale(this,'e-repetir')">4</button>
          <button class="scale-btn" onclick="selectScale(this,'e-repetir')">5</button><button class="scale-btn" onclick="selectScale(this,'e-repetir')">6</button>
          <button class="scale-btn" onclick="selectScale(this,'e-repetir')">7</button><button class="scale-btn" onclick="selectScale(this,'e-repetir')">8</button>
          <button class="scale-btn" onclick="selectScale(this,'e-repetir')">9</button><button class="scale-btn" onclick="selectScale(this,'e-repetir')">10</button>
        </div>
      </div>

      <div class="field">
        <label>Às vezes, se teve um dia difícil, come para se sentir melhor?</label>
        <div id="e-diadicil" style="display:flex;gap:0.4rem;flex-wrap:wrap;">
          <button class="scale-btn" onclick="selectScale(this,'e-diadicil')">1</button><button class="scale-btn" onclick="selectScale(this,'e-diadicil')">2</button>
          <button class="scale-btn" onclick="selectScale(this,'e-diadicil')">3</button><button class="scale-btn" onclick="selectScale(this,'e-diadicil')">4</button>
          <button class="scale-btn" onclick="selectScale(this,'e-diadicil')">5</button><button class="scale-btn" onclick="selectScale(this,'e-diadicil')">6</button>
          <button class="scale-btn" onclick="selectScale(this,'e-diadicil')">7</button><button class="scale-btn" onclick="selectScale(this,'e-diadicil')">8</button>
          <button class="scale-btn" onclick="selectScale(this,'e-diadicil')">9</button><button class="scale-btn" onclick="selectScale(this,'e-diadicil')">10</button>
        </div>
      </div>

      <div class="field">
        <label>Quando come, está sempre fazendo algo mais, como mexer no telefone ou ver TV?</label>
        <div id="e-distraida" style="display:flex;gap:0.4rem;flex-wrap:wrap;">
          <button class="scale-btn" onclick="selectScale(this,'e-distraida')">1</button><button class="scale-btn" onclick="selectScale(this,'e-distraida')">2</button>
          <button class="scale-btn" onclick="selectScale(this,'e-distraida')">3</button><button class="scale-btn" onclick="selectScale(this,'e-distraida')">4</button>
          <button class="scale-btn" onclick="selectScale(this,'e-distraida')">5</button><button class="scale-btn" onclick="selectScale(this,'e-distraida')">6</button>
          <button class="scale-btn" onclick="selectScale(this,'e-distraida')">7</button><button class="scale-btn" onclick="selectScale(this,'e-distraida')">8</button>
          <button class="scale-btn" onclick="selectScale(this,'e-distraida')">9</button><button class="scale-btn" onclick="selectScale(this,'e-distraida')">10</button>
        </div>
      </div>

      <div class="field">
        <label>"Posso manter hábitos saudáveis por um tempo, mas logo que passo por alguma situação mais desafiante desisto." — Esta frase te representa?</label>
        <div id="e-desiste" style="display:flex;gap:0.4rem;flex-wrap:wrap;">
          <button class="scale-btn" onclick="selectScale(this,'e-desiste')">1</button><button class="scale-btn" onclick="selectScale(this,'e-desiste')">2</button>
          <button class="scale-btn" onclick="selectScale(this,'e-desiste')">3</button><button class="scale-btn" onclick="selectScale(this,'e-desiste')">4</button>
          <button class="scale-btn" onclick="selectScale(this,'e-desiste')">5</button><button class="scale-btn" onclick="selectScale(this,'e-desiste')">6</button>
          <button class="scale-btn" onclick="selectScale(this,'e-desiste')">7</button><button class="scale-btn" onclick="selectScale(this,'e-desiste')">8</button>
          <button class="scale-btn" onclick="selectScale(this,'e-desiste')">9</button><button class="scale-btn" onclick="selectScale(this,'e-desiste')">10</button>
        </div>
      </div>

      <div class="form-nav">
        <button class="btn-back-sm" onclick="nextStep('emocional',4,3)">← Voltar</button>
        <button class="btn-primary" onclick="nextStep('emocional',4,5)">Continuar →</button>
      </div>
    </div>

    <!-- E-STEP 5: Histórico de peso -->
    <div class="form-step" id="e-step-5" data-form="emocional">
      <div class="step-heading">Histórico de peso</div>
      <div class="step-desc">Passo 5 de 8 — Sua trajetória</div>

      <div class="field">
        <label>Você teve eventos na sua vida que levaram ao aumento de peso? (pode marcar mais de um)</label>
        <div class="check-group" id="e-eventos">
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Não tive.</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Sim, medicamentos</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Sim, gravidez</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Sim, pandemia</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Sim, após o casamento</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Sim, após uma lesão</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Sim, após um novo trabalho</label>
        </div>
        <input type="text" id="e-eventos-outro" placeholder="Outro: descreva…" style="margin-top:0.5rem;">
      </div>

      <div class="field">
        <label>Quando foi a última vez que você se sentiu feliz com sua imagem corporal?</label>
        <div class="radio-group" id="e-ultima-vez">
          <label class="radio-option" onclick="selectRadio(this,'e-ultima-vez')"><div class="radio-dot"></div>Menos de 1 ano</label>
          <label class="radio-option" onclick="selectRadio(this,'e-ultima-vez')"><div class="radio-dot"></div>Entre 1 e 2 anos</label>
          <label class="radio-option" onclick="selectRadio(this,'e-ultima-vez')"><div class="radio-dot"></div>Mais de 3 anos</label>
          <label class="radio-option" onclick="selectRadio(this,'e-ultima-vez')"><div class="radio-dot"></div>Nunca estive satisfeita.</label>
        </div>
      </div>

      <div class="field">
        <label>Como foi sua experiência ao perder peso?</label>
        <div class="radio-group" id="e-experiencia">
          <label class="radio-option" onclick="selectRadio(this,'e-experiencia')"><div class="radio-dot"></div>Já fiz várias dietas</label>
          <label class="radio-option" onclick="selectRadio(this,'e-experiencia')"><div class="radio-dot"></div>Já perdi peso, mas sempre recupero</label>
          <label class="radio-option" onclick="selectRadio(this,'e-experiencia')"><div class="radio-dot"></div>Nunca tentei anteriormente</label>
          <label class="radio-option" onclick="selectRadio(this,'e-experiencia')"><div class="radio-dot"></div>Perdi e mantive</label>
          <label class="radio-option" onclick="selectRadio(this,'e-experiencia')"><div class="radio-dot"></div>Treino + para poder comer</label>
          <label class="radio-option" onclick="selectRadio(this,'e-experiencia')"><div class="radio-dot"></div>Já perdi anteriormente com acompanhamento de nutricionista</label>
        </div>
      </div>

      <div class="form-nav">
        <button class="btn-back-sm" onclick="nextStep('emocional',5,4)">← Voltar</button>
        <button class="btn-primary" onclick="nextStep('emocional',5,6)">Continuar →</button>
      </div>
    </div>

    <!-- E-STEP 6: Corpo e rotina física -->
    <div class="form-step" id="e-step-6" data-form="emocional">
      <div class="step-heading">Corpo e rotina</div>
      <div class="step-desc">Passo 6 de 8 — Aspectos físicos do dia a dia</div>

      <div class="field">
        <label>Quantas horas de sono, em média, você tem por noite?</label>
        <div class="radio-group" id="e-sono">
          <label class="radio-option" onclick="selectRadio(this,'e-sono')"><div class="radio-dot"></div>Menos de 5 horas</label>
          <label class="radio-option" onclick="selectRadio(this,'e-sono')"><div class="radio-dot"></div>Entre 5 e 7 horas</label>
          <label class="radio-option" onclick="selectRadio(this,'e-sono')"><div class="radio-dot"></div>Mais de 7 horas</label>
        </div>
      </div>

      <div class="field">
        <label>Em que momento do dia sente que "se perde de si mesma"?</label>
        <div class="radio-group" id="e-perde">
          <label class="radio-option" onclick="selectRadio(this,'e-perde')"><div class="radio-dot"></div>Pela manhã, ao acordar.</label>
          <label class="radio-option" onclick="selectRadio(this,'e-perde')"><div class="radio-dot"></div>Após a dedicação de cuidar dos filhos, casa e família</label>
          <label class="radio-option" onclick="selectRadio(this,'e-perde')"><div class="radio-dot"></div>À noite</label>
        </div>
        <input type="text" id="e-perde-outro" placeholder="Outro: descreva…" style="margin-top:0.5rem;">
      </div>

      <div class="field">
        <label>Você sente que consegue se alimentar com calma?</label>
        <div class="radio-group" id="e-calma">
          <label class="radio-option" onclick="selectRadio(this,'e-calma')"><div class="radio-dot"></div>Sim, consigo sempre.</label>
          <label class="radio-option" onclick="selectRadio(this,'e-calma')"><div class="radio-dot"></div>Sim, mas não sempre.</label>
          <label class="radio-option" onclick="selectRadio(this,'e-calma')"><div class="radio-dot"></div>Às vezes.</label>
          <label class="radio-option" onclick="selectRadio(this,'e-calma')"><div class="radio-dot"></div>Não consigo.</label>
        </div>
      </div>

      <div class="field">
        <label>Que tipo de alimentação você sente que o seu corpo pede hoje: (pode marcar mais de um)</label>
        <div class="check-group" id="e-alim">
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Energia rápida (doces, pães)</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Conforto (comidas quentes, caseiras)</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Leveza e vitalidade (saladas, frutas, água)</label>
        </div>
      </div>

      <div class="field">
        <label>Há algum sintoma que percebe com frequência? (pode marcar mais de um)</label>
        <div class="check-group" id="e-sintomas">
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Inchaço</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Cansaço constante</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Retenção de líquido</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Irritabilidade</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Queda de cabelo</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Pele ressecada ou oleosa</label>
        </div>
        <input type="text" id="e-sintomas-outro" placeholder="Outro: descreva…" style="margin-top:0.5rem;">
      </div>

      <div class="form-nav">
        <button class="btn-back-sm" onclick="nextStep('emocional',6,5)">← Voltar</button>
        <button class="btn-primary" onclick="nextStep('emocional',6,7)">Continuar →</button>
      </div>
    </div>

    <!-- E-STEP 7: Maternidade -->
    <div class="form-step" id="e-step-7" data-form="emocional">
      <div class="step-heading">Maternidade</div>
      <div class="step-desc">Passo 7 de 8 — Responda apenas se for mãe</div>

      <div class="field">
        <label>Como mudou sua relação com o corpo e a comida depois da gestação?</label>
        <textarea id="e-gestacao" placeholder="Se não for mãe, pode deixar em branco."></textarea>
      </div>

      <div class="field">
        <label>Como está sua rotina atual com o bebê ou os filhos?</label>
        <div class="radio-group" id="e-rotina">
          <label class="radio-option" onclick="selectRadio(this,'e-rotina')"><div class="radio-dot"></div>Organizada</label>
          <label class="radio-option" onclick="selectRadio(this,'e-rotina')"><div class="radio-dot"></div>Não consigo ter uma rotina</label>
          <label class="radio-option" onclick="selectRadio(this,'e-rotina')"><div class="radio-dot"></div>Alterno entre os dois.</label>
          <label class="radio-option" onclick="selectRadio(this,'e-rotina')"><div class="radio-dot"></div>Não se aplica</label>
        </div>
      </div>

      <div class="field">
        <label>Depois da maternidade, qual sentimento mais mudou em relação ao seu corpo? (pode marcar mais de um)</label>
        <div class="check-group" id="e-mat-sentimento">
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Gratidão</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Desconexão</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Apenas críticas</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Orgulho</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Cansaço</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Não se aplica</label>
        </div>
      </div>

      <div class="field">
        <label>Você sente culpa quando tenta priorizar seu tempo?</label>
        <div class="radio-group" id="e-culpa">
          <label class="radio-option" onclick="selectRadio(this,'e-culpa')"><div class="radio-dot"></div>Sim, com frequência</label>
          <label class="radio-option" onclick="selectRadio(this,'e-culpa')"><div class="radio-dot"></div>Às vezes.</label>
          <label class="radio-option" onclick="selectRadio(this,'e-culpa')"><div class="radio-dot"></div>Não sinto</label>
          <label class="radio-option" onclick="selectRadio(this,'e-culpa')"><div class="radio-dot"></div>Não se aplica</label>
        </div>
      </div>

      <div class="field">
        <label>Como está sua relação com o espelho desde o parto?</label>
        <div class="radio-group" id="e-espelho-parto">
          <label class="radio-option" onclick="selectRadio(this,'e-espelho-parto')"><div class="radio-dot"></div>Evito me olhar</label>
          <label class="radio-option" onclick="selectRadio(this,'e-espelho-parto')"><div class="radio-dot"></div>Me olho com indiferença</label>
          <label class="radio-option" onclick="selectRadio(this,'e-espelho-parto')"><div class="radio-dot"></div>Me olho com carinho</label>
          <label class="radio-option" onclick="selectRadio(this,'e-espelho-parto')"><div class="radio-dot"></div>Estou voltando a me olhar</label>
          <label class="radio-option" onclick="selectRadio(this,'e-espelho-parto')"><div class="radio-dot"></div>Não se aplica</label>
        </div>
      </div>

      <div class="form-nav">
        <button class="btn-back-sm" onclick="nextStep('emocional',7,6)">← Voltar</button>
        <button class="btn-primary" onclick="nextStep('emocional',7,8)">Continuar →</button>
      </div>
    </div>

    <!-- E-STEP 8: Objetivos e motivação final -->
    <div class="form-step" id="e-step-8" data-form="emocional">
      <div class="step-heading">Objetivos e motivação</div>
      <div class="step-desc">Passo 8 de 8 — Quase lá!</div>

      <div class="field">
        <label>O que você sente falta de fazer por você?</label>
        <textarea id="e-falta" placeholder="Ex: caminhar sozinha, cuidar do cabelo, almoçar sem pressa, ler, treinar…"></textarea>
      </div>

      <div class="field">
        <label>Quando pensa em voltar a se cuidar, o que mais te impede hoje?</label>
        <textarea id="e-impede" placeholder="Ex: falta de energia, apoio, tempo, motivação…"></textarea>
      </div>

      <div class="field">
        <label>Você busca mais definição, redução de volume, energia, ou leveza corporal?</label>
        <textarea id="e-objetivo"></textarea>
      </div>

      <div class="field">
        <label>Quem irá preparar as refeições do plano alimentar?</label>
        <input type="text" id="e-refeicoes" placeholder="Ex: eu mesma, marido, empregada…">
      </div>

      <div class="field">
        <label>Quais mudanças físicas você já começou a notar (mesmo pequenas)?</label>
        <textarea id="e-mudancas"></textarea>
      </div>

      <div class="field">
        <label>Há algum marcador de saúde que deseja melhorar? Realizou algum exame laboratorial recente?</label>
        <textarea id="e-marcadores"></textarea>
      </div>

      <div class="field">
        <label>O quanto você está motivada para atingir seu objetivo? (1 = pouco, 10 = muito)</label>
        <div id="e-motivacao" style="display:flex;gap:0.4rem;flex-wrap:wrap;">
          <button class="scale-btn" onclick="selectScale(this,'e-motivacao')">1</button><button class="scale-btn" onclick="selectScale(this,'e-motivacao')">2</button>
          <button class="scale-btn" onclick="selectScale(this,'e-motivacao')">3</button><button class="scale-btn" onclick="selectScale(this,'e-motivacao')">4</button>
          <button class="scale-btn" onclick="selectScale(this,'e-motivacao')">5</button><button class="scale-btn" onclick="selectScale(this,'e-motivacao')">6</button>
          <button class="scale-btn" onclick="selectScale(this,'e-motivacao')">7</button><button class="scale-btn" onclick="selectScale(this,'e-motivacao')">8</button>
          <button class="scale-btn" onclick="selectScale(this,'e-motivacao')">9</button><button class="scale-btn" onclick="selectScale(this,'e-motivacao')">10</button>
        </div>
      </div>

      <div class="field">
        <label>No trabalho, você passa a maior parte do tempo: (pode marcar mais de um)</label>
        <div class="check-group" id="e-trabalho">
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Sentada</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Caminhando</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Em pé</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Subindo e descendo escadas</label>
          <label class="check-option" onclick="toggleCheck(this)"><div class="check-box">✓</div>Carregando pesos</label>
        </div>
      </div>

      <div class="field">
        <label>Como você gostaria de se sentir ao final do programa em três palavras?</label>
        <input type="text" id="e-tres-palavras" placeholder="Ex: leve, confiante, disciplinada">
      </div>

      <div class="form-nav">
        <button class="btn-back-sm" onclick="nextStep('emocional',8,7)">← Voltar</button>
        <button class="btn-primary" id="submit-emocional" onclick="submitForm('emocional')">Enviar respostas</button>
      </div>
    </div>

    <!-- SUCCESS STATE -->
    <div id="form-success">
      <div class="success-icon">✓</div>
      <h2>Obrigada por compartilhar!</h2>
      <p>Suas respostas foram registradas com segurança. A Tamiris irá analisá-las antes da sua consulta e entrará em contato em breve.</p>
      <button class="btn-outline" onclick="backToSelector()">Preencher outro questionário</button>
    </div>

  </div><!-- /form-area -->
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

/* Score panel — shown to client */
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

/* Interpretation — HIDDEN from client, shown only in Odoo note */
.qfa-interpretation { display: none; }

/* Final questions */
.qfa-final { margin-top: 2rem; }

@media (max-width: 600px) {
  .score-grid { grid-template-columns: 1fr; }
  .qfa-table { min-width: 500px; }
  .seg-btn { padding: 0.28rem 0.4rem; font-size: 0.68rem; }
}
</style>

<div class="form-header" style="padding: 2rem 3rem 0;">
  <div style="margin-bottom:1rem;">
    <button class="btn-back-sm" onclick="backToSelector()">← Escolher outro questionário</button>
  </div>
  <div class="form-title">QFA — <em>Frequência Alimentar</em></div>
  <div class="form-sub">Avaliação do seu padrão alimentar habitual</div>
</div>

<div id="qfa-form-area" style="padding: 2rem 3rem; max-width: 900px; margin: 0 auto;">

  <!-- STEP 1: Identification -->
  <div id="qfa-step-id" class="qfa-step">
    <div class="step-heading">Identificação</div>
    <div class="step-desc" style="margin-bottom:1.5rem;">Passo 1 de 3 — Seus dados</div>
    <div class="two-col">
      <div class="field"><label>Nome completo *</label><input type="text" id="qfa-nome" placeholder="Seu nome completo"></div>
      <div class="field"><label>Email *</label><input type="email" id="qfa-email" placeholder="seu@email.com"></div>
    </div>
    <div class="qfa-intro">
      <strong>Como responder:</strong><br>
      Para cada alimento, indique:<br>
      · <strong>Unidade de tempo:</strong> D = por dia · S = por semana · M = por mês · N = nunca ou raramente<br>
      · <strong>Frequência:</strong> quantas vezes nessa unidade (1–10)<br>
      · <strong>Porção:</strong> P = menor que a média · M = igual à média · G = maior · E = bem maior<br>
      <br>Se não come ou raramente come um item, selecione <strong>N</strong>.
    </div>
    <div id="qfa-step1-error" style="display:none;color:var(--burgundy);font-size:0.82rem;margin-bottom:0.75rem;">Por favor, preencha nome e email.</div>
    <div class="form-nav" style="margin-top:1rem;">
      <span></span>
      <button class="btn-primary" onclick="qfaGoStep(2)">Continuar →</button>
    </div>
  </div>

  <!-- STEP 2: Food frequency table -->
  <div id="qfa-step-food" class="qfa-step" style="display:none;">
    <div class="step-heading">Frequência Alimentar</div>
    <div class="step-desc" style="margin-bottom:1.5rem;">Passo 2 de 3 — Para cada alimento, indique unidade, frequência e porção</div>

    <div class="qfa-table-wrap">
      <table class="qfa-table">
        <thead>
          <tr>
            <th>Alimento</th>
            <th>Unidade<br><span style="font-size:0.6rem;text-transform:none;letter-spacing:0">D / S / M / N</span></th>
            <th>Frequência<br><span style="font-size:0.6rem;text-transform:none;letter-spacing:0">vezes</span></th>
            <th>Porção<br><span style="font-size:0.6rem;text-transform:none;letter-spacing:0">P / M / G / E</span></th>
            <th>Consumo<br><span style="font-size:0.6rem;text-transform:none;letter-spacing:0">×/sem</span></th>
          </tr>
        </thead>
        
    <tbody>
      <tr class="cat-header"><td colspan="5">PÃES E ACOMPANHAMENTOS</td></tr>
      
    <tr class="food-row" data-id="paes" data-group="construtor">
      <td class="food-name">
        <span class="food-label">Pão francês, pão de forma, integral, torrada</span>
        <span class="food-portion">Porção M: 1 unidade ou 2 fatias (50g)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_paes">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'paes')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'paes')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'paes')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'paes')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_paes" onchange="recalcItem('paes')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_paes">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'paes')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'paes')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'paes')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'paes')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_paes">—</td>
    </tr>
    <tr class="food-row" data-id="biscoito_s" data-group="ultraprocessado">
      <td class="food-name">
        <span class="food-label">Biscoitos sem recheio (doce, salgado)</span>
        <span class="food-portion">Porção M: 4 unidades (24g)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_biscoito_s">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'biscoito_s')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'biscoito_s')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'biscoito_s')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'biscoito_s')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_biscoito_s" onchange="recalcItem('biscoito_s')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_biscoito_s">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'biscoito_s')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'biscoito_s')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'biscoito_s')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'biscoito_s')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_biscoito_s">—</td>
    </tr>
    <tr class="food-row" data-id="tapioca" data-group="construtor">
      <td class="food-name">
        <span class="food-label">Tapioca</span>
        <span class="food-portion">Porção M: 1 fatia média (60g)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_tapioca">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'tapioca')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'tapioca')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'tapioca')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'tapioca')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_tapioca" onchange="recalcItem('tapioca')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_tapioca">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'tapioca')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'tapioca')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'tapioca')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'tapioca')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_tapioca">—</td>
    </tr>
    <tr class="food-row" data-id="cuscus" data-group="construtor">
      <td class="food-name">
        <span class="food-label">Cuscus</span>
        <span class="food-portion">Porção M: 1 escumadeira (140g)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_cuscus">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'cuscus')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'cuscus')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'cuscus')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'cuscus')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_cuscus" onchange="recalcItem('cuscus')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_cuscus">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'cuscus')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'cuscus')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'cuscus')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'cuscus')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_cuscus">—</td>
    </tr>
    </tbody>
    <tbody>
      <tr class="cat-header"><td colspan="5">REFEIÇÕES CALÓRICAS / FAST FOOD</td></tr>
      
    <tr class="food-row" data-id="suco_ind" data-group="ultraprocessado">
      <td class="food-name">
        <span class="food-label">Suco industrializado</span>
        <span class="food-portion">Porção M: 1 copo americano (190ml)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_suco_ind">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'suco_ind')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'suco_ind')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'suco_ind')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'suco_ind')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_suco_ind" onchange="recalcItem('suco_ind')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_suco_ind">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'suco_ind')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'suco_ind')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'suco_ind')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'suco_ind')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_suco_ind">—</td>
    </tr>
    <tr class="food-row" data-id="refrigerante" data-group="ultraprocessado">
      <td class="food-name">
        <span class="food-label">Refrigerante</span>
        <span class="food-portion">Porção M: 1 copo americano (190ml)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_refrigerante">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'refrigerante')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'refrigerante')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'refrigerante')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'refrigerante')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_refrigerante" onchange="recalcItem('refrigerante')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_refrigerante">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'refrigerante')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'refrigerante')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'refrigerante')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'refrigerante')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_refrigerante">—</td>
    </tr>
    <tr class="food-row" data-id="fast_food" data-group="ultraprocessado">
      <td class="food-name">
        <span class="food-label">Fast food (hambúrguer, bocadilho, cachorro-quente)</span>
        <span class="food-portion">Porção M: 1 unidade (250g)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_fast_food">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'fast_food')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'fast_food')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'fast_food')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'fast_food')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_fast_food" onchange="recalcItem('fast_food')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_fast_food">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'fast_food')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'fast_food')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'fast_food')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'fast_food')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_fast_food">—</td>
    </tr>
    <tr class="food-row" data-id="batata_frita" data-group="ultraprocessado">
      <td class="food-name">
        <span class="food-label">Batata frita ou mandioca frita</span>
        <span class="food-portion">Porção M: 1 porção pequena (100g)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_batata_frita">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'batata_frita')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'batata_frita')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'batata_frita')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'batata_frita')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_batata_frita" onchange="recalcItem('batata_frita')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_batata_frita">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'batata_frita')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'batata_frita')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'batata_frita')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'batata_frita')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_batata_frita">—</td>
    </tr>
    <tr class="food-row" data-id="biscoito_r" data-group="ultraprocessado">
      <td class="food-name">
        <span class="food-label">Biscoito recheado, waffer, amanteigado</span>
        <span class="food-portion">Porção M: 3 unidades (30g)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_biscoito_r">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'biscoito_r')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'biscoito_r')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'biscoito_r')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'biscoito_r')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_biscoito_r" onchange="recalcItem('biscoito_r')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_biscoito_r">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'biscoito_r')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'biscoito_r')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'biscoito_r')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'biscoito_r')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_biscoito_r">—</td>
    </tr>
    </tbody>
    <tbody>
      <tr class="cat-header"><td colspan="5">SNACK E BELISCOS</td></tr>
      
    <tr class="food-row" data-id="snacks" data-group="ultraprocessado">
      <td class="food-name">
        <span class="food-label">Snacks (chips de batata, doritos, salgadinhos industrializados)</span>
        <span class="food-portion">Porção M: meio pacote (80g)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_snacks">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'snacks')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'snacks')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'snacks')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'snacks')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_snacks" onchange="recalcItem('snacks')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_snacks">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'snacks')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'snacks')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'snacks')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'snacks')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_snacks">—</td>
    </tr>
    <tr class="food-row" data-id="embutidos" data-group="ultraprocessado">
      <td class="food-name">
        <span class="food-label">Embutidos (presunto, chorizo, jamon, mortadela)</span>
        <span class="food-portion">Porção M: 2 fatias (30g)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_embutidos">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'embutidos')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'embutidos')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'embutidos')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'embutidos')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_embutidos" onchange="recalcItem('embutidos')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_embutidos">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'embutidos')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'embutidos')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'embutidos')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'embutidos')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_embutidos">—</td>
    </tr>
    </tbody>
    <tbody>
      <tr class="cat-header"><td colspan="5">ARROZ, MASSAS E TUBÉRCULOS</td></tr>
      
    <tr class="food-row" data-id="arroz" data-group="construtor">
      <td class="food-name">
        <span class="food-label">Arroz branco ou integral cozido</span>
        <span class="food-portion">Porção M: 1 escumadeira (125g)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_arroz">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'arroz')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'arroz')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'arroz')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'arroz')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_arroz" onchange="recalcItem('arroz')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_arroz">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'arroz')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'arroz')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'arroz')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'arroz')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_arroz">—</td>
    </tr>
    <tr class="food-row" data-id="macarrao" data-group="construtor">
      <td class="food-name">
        <span class="food-label">Macarrão com molho, lasanha, nhoque</span>
        <span class="food-portion">Porção M: 1 escumadeira (110g)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_macarrao">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'macarrao')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'macarrao')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'macarrao')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'macarrao')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_macarrao" onchange="recalcItem('macarrao')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_macarrao">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'macarrao')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'macarrao')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'macarrao')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'macarrao')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_macarrao">—</td>
    </tr>
    <tr class="food-row" data-id="batata_c" data-group="construtor">
      <td class="food-name">
        <span class="food-label">Batata, mandioca, inhame (cozida ou assada), purê</span>
        <span class="food-portion">Porção M: 1 colher de servir (100g)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_batata_c">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'batata_c')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'batata_c')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'batata_c')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'batata_c')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_batata_c" onchange="recalcItem('batata_c')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_batata_c">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'batata_c')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'batata_c')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'batata_c')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'batata_c')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_batata_c">—</td>
    </tr>
    </tbody>
    <tbody>
      <tr class="cat-header"><td colspan="5">SOPAS</td></tr>
      
    <tr class="food-row" data-id="sopas" data-group="construtor">
      <td class="food-name">
        <span class="food-label">Sopas (de legumes, canja, creme, etc.)</span>
        <span class="food-portion">Porção M: 1 concha (180ml)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_sopas">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'sopas')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'sopas')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'sopas')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'sopas')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_sopas" onchange="recalcItem('sopas')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_sopas">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'sopas')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'sopas')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'sopas')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'sopas')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_sopas">—</td>
    </tr>
    </tbody>
    <tbody>
      <tr class="cat-header"><td colspan="5">CARNES E PEIXES</td></tr>
      
    <tr class="food-row" data-id="carne_boi" data-group="protetor">
      <td class="food-name">
        <span class="food-label">Carne de boi (bife, cozida, assada), miúdos, vísceras</span>
        <span class="food-portion">Porção M: 1 bife médio (100g)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_carne_boi">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'carne_boi')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'carne_boi')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'carne_boi')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'carne_boi')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_carne_boi" onchange="recalcItem('carne_boi')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_carne_boi">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'carne_boi')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'carne_boi')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'carne_boi')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'carne_boi')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_carne_boi">—</td>
    </tr>
    <tr class="food-row" data-id="bacon" data-group="ultraprocessado">
      <td class="food-name">
        <span class="food-label">Bacon</span>
        <span class="food-portion">Porção M: 2 fatias (30g)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_bacon">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'bacon')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'bacon')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'bacon')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'bacon')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_bacon" onchange="recalcItem('bacon')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_bacon">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'bacon')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'bacon')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'bacon')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'bacon')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_bacon">—</td>
    </tr>
    <tr class="food-row" data-id="frango" data-group="protetor">
      <td class="food-name">
        <span class="food-label">Frango (cozido, frito, grelhado, assado)</span>
        <span class="food-portion">Porção M: 1 pedaço (60g)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_frango">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'frango')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'frango')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'frango')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'frango')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_frango" onchange="recalcItem('frango')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_frango">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'frango')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'frango')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'frango')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'frango')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_frango">—</td>
    </tr>
    <tr class="food-row" data-id="peixe" data-group="protetor">
      <td class="food-name">
        <span class="food-label">Peixe (cozido, frito, assado)</span>
        <span class="food-portion">Porção M: 1 filé pequeno (100g)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_peixe">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'peixe')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'peixe')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'peixe')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'peixe')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_peixe" onchange="recalcItem('peixe')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_peixe">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'peixe')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'peixe')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'peixe')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'peixe')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_peixe">—</td>
    </tr>
    </tbody>
    <tbody>
      <tr class="cat-header"><td colspan="5">DOCES E SOBREMESAS</td></tr>
      
    <tr class="food-row" data-id="doce_sobr" data-group="doce">
      <td class="food-name">
        <span class="food-label">Doces, chocolates, bombons</span>
        <span class="food-portion">Porção M: 1 unidade pequena (30g)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_doce_sobr">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'doce_sobr')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'doce_sobr')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'doce_sobr')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'doce_sobr')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_doce_sobr" onchange="recalcItem('doce_sobr')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_doce_sobr">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'doce_sobr')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'doce_sobr')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'doce_sobr')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'doce_sobr')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_doce_sobr">—</td>
    </tr>
    <tr class="food-row" data-id="sorvete" data-group="doce">
      <td class="food-name">
        <span class="food-label">Sorvete</span>
        <span class="food-portion">Porção M: 1 bola (60g)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_sorvete">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'sorvete')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'sorvete')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'sorvete')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'sorvete')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_sorvete" onchange="recalcItem('sorvete')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_sorvete">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'sorvete')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'sorvete')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'sorvete')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'sorvete')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_sorvete">—</td>
    </tr>
    <tr class="food-row" data-id="acucar" data-group="doce">
      <td class="food-name">
        <span class="food-label">Açúcar</span>
        <span class="food-portion">Porção M: 1/2 colher de sopa (6g)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_acucar">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'acucar')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'acucar')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'acucar')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'acucar')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_acucar" onchange="recalcItem('acucar')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_acucar">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'acucar')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'acucar')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'acucar')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'acucar')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_acucar">—</td>
    </tr>
    </tbody>
    <tbody>
      <tr class="cat-header"><td colspan="5">LEITE E DERIVADOS</td></tr>
      
    <tr class="food-row" data-id="leite" data-group="protetor">
      <td class="food-name">
        <span class="food-label">Leite</span>
        <span class="food-portion">Porção M: 1/2 copo requeijão (125ml)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_leite">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'leite')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'leite')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'leite')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'leite')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_leite" onchange="recalcItem('leite')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_leite">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'leite')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'leite')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'leite')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'leite')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_leite">—</td>
    </tr>
    <tr class="food-row" data-id="iogurte" data-group="protetor">
      <td class="food-name">
        <span class="food-label">Iogurte (natural ou com frutas)</span>
        <span class="food-portion">Porção M: 1 pote (170g)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_iogurte">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'iogurte')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'iogurte')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'iogurte')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'iogurte')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_iogurte" onchange="recalcItem('iogurte')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_iogurte">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'iogurte')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'iogurte')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'iogurte')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'iogurte')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_iogurte">—</td>
    </tr>
    <tr class="food-row" data-id="queijo_a" data-group="protetor">
      <td class="food-name">
        <span class="food-label">Queijo amarelo (mussarela, prato, parmesão, provolone)</span>
        <span class="food-portion">Porção M: 1 fatia (30g)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_queijo_a">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'queijo_a')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'queijo_a')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'queijo_a')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'queijo_a')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_queijo_a" onchange="recalcItem('queijo_a')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_queijo_a">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'queijo_a')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'queijo_a')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'queijo_a')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'queijo_a')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_queijo_a">—</td>
    </tr>
    <tr class="food-row" data-id="queijo_b" data-group="protetor">
      <td class="food-name">
        <span class="food-label">Queijo branco (ricota, queijo fresco, burgos, cottage)</span>
        <span class="food-portion">Porção M: 1 fatia (30g)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_queijo_b">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'queijo_b')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'queijo_b')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'queijo_b')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'queijo_b')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_queijo_b" onchange="recalcItem('queijo_b')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_queijo_b">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'queijo_b')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'queijo_b')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'queijo_b')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'queijo_b')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_queijo_b">—</td>
    </tr>
    </tbody>
    <tbody>
      <tr class="cat-header"><td colspan="5">LEGUMINOSAS E OVOS</td></tr>
      
    <tr class="food-row" data-id="feijao" data-group="protetor">
      <td class="food-name">
        <span class="food-label">Feijão, lentilha, grão-de-bico, ervilha</span>
        <span class="food-portion">Porção M: 1 concha (90g)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_feijao">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'feijao')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'feijao')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'feijao')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'feijao')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_feijao" onchange="recalcItem('feijao')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_feijao">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'feijao')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'feijao')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'feijao')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'feijao')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_feijao">—</td>
    </tr>
    <tr class="food-row" data-id="ovos" data-group="protetor">
      <td class="food-name">
        <span class="food-label">Ovos (cozido, mexido, frito, omelete)</span>
        <span class="food-portion">Porção M: 1 unidade (50g)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_ovos">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'ovos')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'ovos')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'ovos')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'ovos')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_ovos" onchange="recalcItem('ovos')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_ovos">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'ovos')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'ovos')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'ovos')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'ovos')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_ovos">—</td>
    </tr>
    </tbody>
    <tbody>
      <tr class="cat-header"><td colspan="5">VERDURAS E LEGUMES</td></tr>
      
    <tr class="food-row" data-id="legumes_c" data-group="protetor">
      <td class="food-name">
        <span class="food-label">Legumes cozidos (cenoura, brócolis, couve-flor, abobrinha)</span>
        <span class="food-portion">Porção M: 1 colher de servir (60g)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_legumes_c">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'legumes_c')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'legumes_c')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'legumes_c')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'legumes_c')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_legumes_c" onchange="recalcItem('legumes_c')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_legumes_c">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'legumes_c')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'legumes_c')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'legumes_c')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'legumes_c')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_legumes_c">—</td>
    </tr>
    <tr class="food-row" data-id="folhas" data-group="protetor">
      <td class="food-name">
        <span class="food-label">Folhas: alface, rúcula, agrião</span>
        <span class="food-portion">Porção M: 3 folhas médias (30g)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_folhas">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'folhas')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'folhas')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'folhas')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'folhas')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_folhas" onchange="recalcItem('folhas')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_folhas">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'folhas')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'folhas')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'folhas')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'folhas')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_folhas">—</td>
    </tr>
    </tbody>
    <tbody>
      <tr class="cat-header"><td colspan="5">FRUTAS</td></tr>
      
    <tr class="food-row" data-id="frutas" data-group="protetor">
      <td class="food-name">
        <span class="food-label">Frutas em geral (laranja, maçã, abacaxi, exceto banana e abacate)</span>
        <span class="food-portion">Porção M: 1 unidade média (180g)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_frutas">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'frutas')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'frutas')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'frutas')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'frutas')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_frutas" onchange="recalcItem('frutas')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_frutas">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'frutas')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'frutas')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'frutas')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'frutas')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_frutas">—</td>
    </tr>
    <tr class="food-row" data-id="banana" data-group="protetor">
      <td class="food-name">
        <span class="food-label">Banana</span>
        <span class="food-portion">Porção M: 1 unidade média (100g)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_banana">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'banana')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'banana')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'banana')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'banana')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_banana" onchange="recalcItem('banana')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_banana">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'banana')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'banana')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'banana')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'banana')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_banana">—</td>
    </tr>
    <tr class="food-row" data-id="abacate" data-group="protetor">
      <td class="food-name">
        <span class="food-label">Abacate</span>
        <span class="food-portion">Porção M: 2 colheres de sopa (90g)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_abacate">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'abacate')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'abacate')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'abacate')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'abacate')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_abacate" onchange="recalcItem('abacate')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_abacate">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'abacate')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'abacate')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'abacate')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'abacate')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_abacate">—</td>
    </tr>
    </tbody>
    <tbody>
      <tr class="cat-header"><td colspan="5">MOLHOS E TEMPEROS</td></tr>
      
    <tr class="food-row" data-id="oleo_azeite" data-group="neutro">
      <td class="food-name">
        <span class="food-label">Óleo, azeite para tempero de salada</span>
        <span class="food-portion">Porção M: 1 fio (5ml)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_oleo_azeite">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'oleo_azeite')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'oleo_azeite')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'oleo_azeite')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'oleo_azeite')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_oleo_azeite" onchange="recalcItem('oleo_azeite')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_oleo_azeite">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'oleo_azeite')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'oleo_azeite')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'oleo_azeite')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'oleo_azeite')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_oleo_azeite">—</td>
    </tr>
    <tr class="food-row" data-id="maionese" data-group="ultraprocessado">
      <td class="food-name">
        <span class="food-label">Maionese (salada de maionese ou maionese industrializada)</span>
        <span class="food-portion">Porção M: 1 colher de sopa (15g)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_maionese">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'maionese')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'maionese')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'maionese')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'maionese')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_maionese" onchange="recalcItem('maionese')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_maionese">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'maionese')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'maionese')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'maionese')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'maionese')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_maionese">—</td>
    </tr>
    </tbody>
    <tbody>
      <tr class="cat-header"><td colspan="5">BEBIDAS</td></tr>
      
    <tr class="food-row" data-id="suco_nat" data-group="construtor">
      <td class="food-name">
        <span class="food-label">Suco natural</span>
        <span class="food-portion">Porção M: 1 copo americano (200ml)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_suco_nat">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'suco_nat')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'suco_nat')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'suco_nat')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'suco_nat')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_suco_nat" onchange="recalcItem('suco_nat')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_suco_nat">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'suco_nat')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'suco_nat')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'suco_nat')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'suco_nat')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_suco_nat">—</td>
    </tr>
    <tr class="food-row" data-id="cafe" data-group="neutro">
      <td class="food-name">
        <span class="food-label">Café</span>
        <span class="food-portion">Porção M: 2 xícaras de café (90ml)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_cafe">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'cafe')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'cafe')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'cafe')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'cafe')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_cafe" onchange="recalcItem('cafe')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_cafe">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'cafe')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'cafe')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'cafe')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'cafe')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_cafe">—</td>
    </tr>
    </tbody>
    <tbody>
      <tr class="cat-header"><td colspan="5">BEBIDAS ALCOÓLICAS</td></tr>
      
    <tr class="food-row" data-id="cerveja" data-group="alcool">
      <td class="food-name">
        <span class="food-label">Cerveja</span>
        <span class="food-portion">Porção M: 1 lata (350ml)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_cerveja">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'cerveja')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'cerveja')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'cerveja')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'cerveja')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_cerveja" onchange="recalcItem('cerveja')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_cerveja">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'cerveja')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'cerveja')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'cerveja')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'cerveja')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_cerveja">—</td>
    </tr>
    <tr class="food-row" data-id="vinho" data-group="alcool">
      <td class="food-name">
        <span class="food-label">Vinho</span>
        <span class="food-portion">Porção M: 1 taça (150ml)</span>
      </td>
      <td class="food-unit">
        <div class="seg-group" id="u_vinho">
          <button type="button" class="seg-btn" data-val="D" onclick="setUnit(this,'vinho')">D</button>
          <button type="button" class="seg-btn" data-val="S" onclick="setUnit(this,'vinho')">S</button>
          <button type="button" class="seg-btn" data-val="M" onclick="setUnit(this,'vinho')">M</button>
          <button type="button" class="seg-btn seg-n active" data-val="N" onclick="setUnit(this,'vinho')">N</button>
        </div>
      </td>
      <td class="food-freq">
        <select id="f_vinho" onchange="recalcItem('vinho')" disabled>
          <option value="0">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option><option value="6">6</option>
          <option value="7">7</option><option value="8">8</option><option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="food-porcao">
        <div class="seg-group" id="p_vinho">
          <button type="button" class="seg-btn" data-val="P" onclick="setPorcao(this,'vinho')">P</button>
          <button type="button" class="seg-btn active" data-val="M" onclick="setPorcao(this,'vinho')">M</button>
          <button type="button" class="seg-btn" data-val="G" onclick="setPorcao(this,'vinho')">G</button>
          <button type="button" class="seg-btn" data-val="E" onclick="setPorcao(this,'vinho')">E</button>
        </div>
      </td>
      <td class="food-consumo" id="c_vinho">—</td>
    </tr>
    </tbody>
      </table>
    </div>

    <div class="form-nav" style="margin-top:2rem;">
      <button class="btn-back-sm" onclick="qfaGoStep(1)">← Voltar</button>
      <button class="btn-primary" onclick="qfaGoStep(3)">Ver resultado →</button>
    </div>
  </div>

  <!-- STEP 3: Score + final questions -->
  <div id="qfa-step-result" class="qfa-step" style="display:none;">
    <div class="step-heading">Resultado &amp; Perguntas Finais</div>
    <div class="step-desc" style="margin-bottom:1.5rem;">Passo 3 de 3</div>

    <!-- Score panel (visible to client) -->
    <div class="qfa-score-panel" id="qfa-score-display">
      <h3>Sua pontuação alimentar</h3>
      <div class="score-total-box">
        <div class="score-num" id="score-total-num">—</div>
        <div>
          <div class="score-label" id="score-total-label">A calcular…</div>
          <div class="score-sub" id="score-total-sub"></div>
        </div>
      </div>
      <div class="score-grid" id="score-grid"></div>
    </div>

    <!-- Final questions from PDF (164-166) -->
    <div class="qfa-final">
      <div class="field" style="margin-top:2rem;">
        <label>Outros alimentos que come pelo menos 1× por semana (não listados acima)</label>
        <textarea id="qfa-outros" placeholder="Alimento | Frequência por semana | Quantidade"></textarea>
      </div>
      <div class="field">
        <label>Quando come carne ou frango, costuma comer a gordura visível?</label>
        <div class="radio-group" id="qfa-gordura">
          <label class="radio-option" onclick="selectRadio(this,'qfa-gordura')"><div class="radio-dot"></div>1 — Nunca ou raramente</label>
          <label class="radio-option" onclick="selectRadio(this,'qfa-gordura')"><div class="radio-dot"></div>2 — Algumas vezes</label>
          <label class="radio-option" onclick="selectRadio(this,'qfa-gordura')"><div class="radio-dot"></div>3 — Sempre</label>
          <label class="radio-option" onclick="selectRadio(this,'qfa-gordura')"><div class="radio-dot"></div>9 — Não sabe</label>
        </div>
      </div>
      <div class="field">
        <label>Em qual período você mais come?</label>
        <div class="radio-group" id="qfa-periodo">
          <label class="radio-option" onclick="selectRadio(this,'qfa-periodo')"><div class="radio-dot"></div>Manhã</label>
          <label class="radio-option" onclick="selectRadio(this,'qfa-periodo')"><div class="radio-dot"></div>Tarde</label>
          <label class="radio-option" onclick="selectRadio(this,'qfa-periodo')"><div class="radio-dot"></div>Noite</label>
          <label class="radio-option" onclick="selectRadio(this,'qfa-periodo')"><div class="radio-dot"></div>Mais tarde após o jantar</label>
        </div>
      </div>
    </div>

    <div id="qfa-submit-error" style="display:none;color:var(--burgundy);font-size:0.82rem;margin-bottom:0.75rem;"></div>
    <div class="form-nav" style="margin-top:2rem;">
      <button class="btn-back-sm" onclick="qfaGoStep(2)">← Voltar</button>
      <button class="btn-primary" id="qfa-submit-btn" onclick="submitQfa()">Enviar respostas →</button>
    </div>
  </div>

  <!-- Success -->
  <div id="qfa-success" style="display:none; text-align:center; padding:4rem 2rem;">
    <div class="success-icon">✓</div>
    <h2 style="font-family:'Jost',sans-serif;font-size:1.8rem;font-weight:700;color:var(--espresso);margin-bottom:0.75rem;">Obrigada por preencher!</h2>
    <p style="font-size:0.9rem;color:var(--text-mid);line-height:1.7;max-width:440px;margin:0 auto 2rem;">Suas respostas foram registradas. A Tamiris irá analisá-las antes da sua consulta.</p>
    <button class="btn-outline" onclick="backToSelector()">Preencher outro questionário</button>
  </div>

</div><!-- /qfa-form-area -->

<script>
const FOOD_ITEMS = [
  {id:"paes",label:"Pão francês, pão de forma, integral, torrada",group:"construtor"},
  {id:"biscoito_s",label:"Biscoitos sem recheio (doce, salgado)",group:"ultraprocessado"},
  {id:"tapioca",label:"Tapioca",group:"construtor"},
  {id:"cuscus",label:"Cuscus",group:"construtor"},
  {id:"suco_ind",label:"Suco industrializado",group:"ultraprocessado"},
  {id:"refrigerante",label:"Refrigerante",group:"ultraprocessado"},
  {id:"fast_food",label:"Fast food (hambúrguer, bocadilho, cachorro-quente)",group:"ultraprocessado"},
  {id:"batata_frita",label:"Batata frita ou mandioca frita",group:"ultraprocessado"},
  {id:"biscoito_r",label:"Biscoito recheado, waffer, amanteigado",group:"ultraprocessado"},
  {id:"snacks",label:"Snacks (chips de batata, doritos, salgadinhos industrializados)",group:"ultraprocessado"},
  {id:"embutidos",label:"Embutidos (presunto, chorizo, jamon, mortadela)",group:"ultraprocessado"},
  {id:"arroz",label:"Arroz branco ou integral cozido",group:"construtor"},
  {id:"macarrao",label:"Macarrão com molho, lasanha, nhoque",group:"construtor"},
  {id:"batata_c",label:"Batata, mandioca, inhame (cozida ou assada), purê",group:"construtor"},
  {id:"sopas",label:"Sopas (de legumes, canja, creme, etc.)",group:"construtor"},
  {id:"carne_boi",label:"Carne de boi (bife, cozida, assada), miúdos, vísceras",group:"protetor"},
  {id:"bacon",label:"Bacon",group:"ultraprocessado"},
  {id:"frango",label:"Frango (cozido, frito, grelhado, assado)",group:"protetor"},
  {id:"peixe",label:"Peixe (cozido, frito, assado)",group:"protetor"},
  {id:"doce_sobr",label:"Doces, chocolates, bombons",group:"doce"},
  {id:"sorvete",label:"Sorvete",group:"doce"},
  {id:"acucar",label:"Açúcar",group:"doce"},
  {id:"leite",label:"Leite",group:"protetor"},
  {id:"iogurte",label:"Iogurte (natural ou com frutas)",group:"protetor"},
  {id:"queijo_a",label:"Queijo amarelo (mussarela, prato, parmesão, provolone)",group:"protetor"},
  {id:"queijo_b",label:"Queijo branco (ricota, queijo fresco, burgos, cottage)",group:"protetor"},
  {id:"feijao",label:"Feijão, lentilha, grão-de-bico, ervilha",group:"protetor"},
  {id:"ovos",label:"Ovos (cozido, mexido, frito, omelete)",group:"protetor"},
  {id:"legumes_c",label:"Legumes cozidos (cenoura, brócolis, couve-flor, abobrinha)",group:"protetor"},
  {id:"folhas",label:"Folhas: alface, rúcula, agrião",group:"protetor"},
  {id:"frutas",label:"Frutas em geral (laranja, maçã, abacaxi, exceto banana e abacate)",group:"protetor"},
  {id:"banana",label:"Banana",group:"protetor"},
  {id:"abacate",label:"Abacate",group:"protetor"},
  {id:"oleo_azeite",label:"Óleo, azeite para tempero de salada",group:"neutro"},
  {id:"maionese",label:"Maionese (salada de maionese ou maionese industrializada)",group:"ultraprocessado"},
  {id:"suco_nat",label:"Suco natural",group:"construtor"},
  {id:"cafe",label:"Café",group:"neutro"},
  {id:"cerveja",label:"Cerveja",group:"alcool"},
  {id:"vinho",label:"Vinho",group:"alcool"},
];


// ─── QFA NAVIGATION ───────────────────────────────────────
function openQfa() {
  document.getElementById('selector').style.display = 'none';
  document.getElementById('qfa-section').style.display = 'block';
  window.scrollTo(0,0);
}
function qfaGoStep(n) {
  if (n === 2) {
    const name = document.getElementById('qfa-nome').value.trim();
    const email = document.getElementById('qfa-email').value.trim();
    const err = document.getElementById('qfa-step1-error');
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

// ─── UNIT / PORTION CONTROLS ──────────────────────────────
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
  const unit = unitBtn ? unitBtn.dataset.val : 'N';
  const port = portBtn ? portBtn.dataset.val : 'M';
  const cell = document.getElementById('c_' + id);

  if (unit === 'N' || freqVal === 0) { cell.textContent = '—'; cell.dataset.consumo = '0'; return; }
  
  const wf = unit==='D' ? freqVal*7 : unit==='S' ? freqVal : freqVal/4;
  const pf = {P:0.75, M:1, G:1.5, E:2}[port] || 1;
  const consumo = wf * pf;
  cell.textContent = consumo.toFixed(1);
  cell.dataset.consumo = consumo;
}

// ─── SCORING ENGINE ───────────────────────────────────────
function getConsumoPorGroup() {
  const groups = {ultraprocessado:[], doce:[], alcool:[], protetor:[], construtor:[]};
  FOOD_ITEMS.forEach(item => {
    const cell = document.getElementById('c_' + item.id);
    const v = parseFloat(cell ? cell.dataset.consumo : 0) || 0;
    if (groups[item.group]) groups[item.group].push({id:item.id, label:item.label, consumo:v});
  });
  return groups;
}

function scoreProtetor(consumo) {
  if (consumo >= 7) return 2;
  if (consumo >= 3) return 1;
  return 0;
}
function scoreUltraprocessado(consumo) {
  if (consumo === 0) return 0;
  if (consumo <= 1) return -1;
  if (consumo <= 3) return -2;
  return -3;
}
function scoreDoce(consumo) {
  if (consumo === 0) return 0;
  if (consumo <= 2) return -1;
  if (consumo <= 5) return -2;
  return -3;
}
function scoreConstrutor(consumo) {
  if (consumo >= 7) return 2;
  if (consumo >= 3) return 1;
  if (consumo >= 1) return 0;
  return -1;
}
function scoreAlcool(consumo) {
  if (consumo === 0) return 0;
  if (consumo <= 1) return -1;
  if (consumo <= 3) return -2;
  return -3;
}

function ratingLabel(group, consumo) {
  if (group === 'protetor' || group === 'construtor') {
    if (consumo >= 7) return ['ideal','ok'];
    if (consumo >= 3) return ['bom','ok'];
    if (consumo >= 1) return ['ok','warn'];
    return ['insuficiente','bad'];
  } else {
    if (consumo === 0) return ['ok','ok'];
    if (consumo <= 1) return ['baixo','warn'];
    if (consumo <= 3) return ['moderado','warn'];
    if (consumo <= 7) return ['alto','bad'];
    return ['crítico','bad'];
  }
}

function renderQfaScore() {
  const groups = getConsumoPorGroup();
  let totalScore = 0;
  const breakdown = [];

  // Protectors
  let protTotal = groups.protetor.reduce((s,x)=>s+x.consumo,0) / Math.max(groups.protetor.length,1);
  let protScore = groups.protetor.reduce((s,x)=>s+scoreProtetor(x.consumo),0);
  totalScore += protScore;
  breakdown.push({label:'Protetores', total:protTotal, score:protScore, group:'protetor'});

  // Construtores
  let constTotal = groups.construtor.reduce((s,x)=>s+x.consumo,0) / Math.max(groups.construtor.length,1);
  let constScore = groups.construtor.reduce((s,x)=>s+scoreConstrutor(x.consumo),0);
  totalScore += constScore;
  breakdown.push({label:'Construtores', total:constTotal, score:constScore, group:'construtor'});

  // Ultra-processed
  let ultraTotal = groups.ultraprocessado.reduce((s,x)=>s+x.consumo,0) / Math.max(groups.ultraprocessado.length,1);
  let ultraScore = groups.ultraprocessado.reduce((s,x)=>s+scoreUltraprocessado(x.consumo),0);
  totalScore += ultraScore;
  breakdown.push({label:'Ultra-processados', total:ultraTotal, score:ultraScore, group:'ultraprocessado'});

  // Doces
  let doceTotal = groups.doce.reduce((s,x)=>s+x.consumo,0) / Math.max(groups.doce.length,1);
  let doceScore = groups.doce.reduce((s,x)=>s+scoreDoce(x.consumo),0);
  totalScore += doceScore;
  breakdown.push({label:'Doces', total:doceTotal, score:doceScore, group:'doce'});

  // Álcool
  let alcTotal = groups.alcool.reduce((s,x)=>s+x.consumo,0) / Math.max(groups.alcool.length,1);
  let alcScore = groups.alcool.reduce((s,x)=>s+scoreAlcool(x.consumo),0);
  totalScore += alcScore;
  breakdown.push({label:'Álcool', total:alcTotal, score:alcScore, group:'alcool'});

  // Total classification
  let scoreClass, scoreSub;
  if (totalScore >= 25) { scoreClass = 'Excelente base alimentar'; scoreSub = 'Continue assim — foco em comportamento'; }
  else if (totalScore >= 10) { scoreClass = 'Boa base — ajustes pontuais'; scoreSub = 'Corrija excessos específicos'; }
  else if (totalScore >= 0) { scoreClass = 'Base fraca — atenção necessária'; scoreSub = 'Construa a base alimentar gradualmente'; }
  else { scoreClass = 'Padrão crítico'; scoreSub = 'Prioridade: reduzir ultra-processados antes de restringir'; }

  document.getElementById('score-total-num').textContent = totalScore;
  document.getElementById('score-total-label').textContent = scoreClass;
  document.getElementById('score-total-sub').textContent = scoreSub;

  const grid = document.getElementById('score-grid');
  grid.innerHTML = '';
  breakdown.forEach(b => {
    const [rLabel, rClass] = ratingLabel(b.group, b.total);
    const div = document.createElement('div');
    div.className = 'score-cat-item ' + rClass;
    div.innerHTML = '<div class="score-cat-name">' + b.label + '</div>' +
      '<div class="score-cat-val">' + (b.score >= 0 ? '+' : '') + b.score + ' pts</div>' +
      '<div class="score-cat-rating">' + rLabel + ' · ' + b.total.toFixed(1) + '×/sem média</div>';
    grid.appendChild(div);
  });

  // Store for submission
  window._qfaScore = { total: totalScore, scoreClass, breakdown };
}

// ─── BUILD NOTE FOR ODOO ───────────────────────────────────
function buildQfaNote() {
  const groups = getConsumoPorGroup();
  const s = window._qfaScore || {};
  
  // Interpretation (only for Tamiris, not shown to client)
  let interpretation = '';
  const total = s.total || 0;
  if (total < 0) {
    interpretation = '<strong>INTERPRETAÇÃO CLÍNICA:</strong> Pontuação negativa. Foco: Reduzir ultra-processados — NÃO iniciar dieta restritiva.';
  } else if (total < 10) {
    interpretation = '<strong>INTERPRETAÇÃO CLÍNICA:</strong> Pontuação baixa. Foco: Ajustar base alimentar, corrigir excessos específicos.';
  } else {
    interpretation = '<strong>INTERPRETAÇÃO CLÍNICA:</strong> Boa pontuação. Foco: Comportamento (não dieta).';
  }

  let rows = '';
  FOOD_ITEMS.forEach(item => {
    const cell = document.getElementById('c_' + item.id);
    const unitBtn = document.querySelector('#u_' + item.id + ' .seg-btn.active');
    const portBtn = document.querySelector('#p_' + item.id + ' .seg-btn.active');
    const freqVal = document.getElementById('f_' + item.id) ? document.getElementById('f_' + item.id).value : '0';
    const unit = unitBtn ? unitBtn.dataset.val : 'N';
    const port = portBtn ? portBtn.dataset.val : 'M';
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

// ─── SUBMIT QFA ───────────────────────────────────────────
async function submitQfa() {
  const name = document.getElementById('qfa-nome').value.trim();
  const email = document.getElementById('qfa-email').value.trim();
  if (!name || !email) { qfaGoStep(1); return; }

  const btn = document.getElementById('qfa-submit-btn');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span>Enviando…';

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
    document.getElementById('qfa-submit-error').textContent = 'Erro ao enviar. Tente novamente ou contacte a Tamiris.';
    document.getElementById('qfa-submit-error').style.display = 'block';
    btn.disabled = false;
    btn.innerHTML = 'Enviar respostas →';
  }
}
</script>
</div><!-- /qfa-section -->
</div><!-- /app -->`;

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body || {};
  const correct = process.env.CLIENT_PASSWORD;

  if (!correct) {
    console.error('CLIENT_PASSWORD env var not set');
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  if (password === correct) {
    return res.status(200).json({ ok: true, html: APP_HTML });
  }

  return res.status(200).json({ ok: false });
}
