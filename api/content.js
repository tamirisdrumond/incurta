// api/content.js
// Serves the protected questionnaire HTML only after password verification.
// The app HTML never appears in the initial page source.

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
</div><!-- /app -->`;

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body || {};
  const correct = process.env.CLIENT_PASSWORD;

  if (!correct) {
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  if (password !== correct) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).send(APP_HTML);
}
