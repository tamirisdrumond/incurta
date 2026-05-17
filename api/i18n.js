// api/i18n.js
// ─────────────────────────────────────────────────────────────────────────────
// Server-side translation dictionary for all dynamically rendered questionnaire
// HTML (selector shell, form steps, success state).
//
// WHY HERE AND NOT translations.js:
//   translations.js runs in the browser and handles static page text via
//   data-i18n attributes. Questionnaire HTML is injected server-side as a raw
//   HTML string — the browser never sees its data-i18n attributes before they
//   are rendered, so client-side applyTranslations() cannot reach them reliably.
//   All questionnaire text must therefore be pre-translated on the server.
//
// USAGE:
//   import { t, getLangStrings } from './i18n.js';
//   const s = getLangStrings(lang);  // lang = 'pt' | 'es'
//   s.selectorTitle                  // → translated string
//
// ADDING A LANGUAGE:
//   Copy the 'pt' block, translate all values, add the new key ('fr', 'de'…).
//   No other file needs to change.
// ─────────────────────────────────────────────────────────────────────────────

const strings = {

  pt: {
    // ── Selector ─────────────────────────────────────────────────────────────
    selectorTitle:      'Bem-vinda ao seu<br><em>espaço de autoconhecimento</em>',
    selectorSub:        'Suas respostas são confidenciais e serão analisadas antes da sua consulta.',

    card1Title:         'Definição Física',
    card1Desc:          'Sobre seu corpo, sintomas, rotina, sono, alimentação e objetivos físicos. Antes de mudar o corpo, precisamos entender o que queremos sentir dentro dele.',
    card1Tag:           '25 perguntas · ~12 min',

    card2Title:         'Definição Emocional',
    card2Desc:          'Sobre sua relação emocional com a comida, gatilhos, sentimentos e a versão de si mesma que quer construir.',
    card2Tag:           '38 perguntas · ~18 min',

    card3Title:         'Frequência Alimentar',
    card3Desc:          'Avalie seus hábitos alimentares habituais: quais alimentos come, com que frequência e em que quantidade.',
    card3Tag:           '39 alimentos · ~15 min · com pontuação',

    // ── Shell / navigation ───────────────────────────────────────────────────
    backBtn:            '← Escolher outro questionário',
    progStep:           'Passo {n}',   // {n} replaced dynamically by JS
    continueBtn:        'Continuar →',
    backSmBtn:          '← Voltar',
    submitBtn:          'Enviar respostas',

    // ── Success state ────────────────────────────────────────────────────────
    successIcon:        '✓',
    successTitle:       'Obrigada por compartilhar!',
    successText:        'Suas respostas foram registradas com segurança. A Tamiris irá analisá-las antes da sua consulta e entrará em contato em breve.',
    successBackBtn:     'Preencher outro questionário',

    // ── Form titles ──────────────────────────────────────────────────────────
    formTitleFisica:    'Planner in.curta — <em>Definição Física</em>',
    formTitleEmocional: 'Planner in.curta — <em>Definição Emocional</em>',
    formSub:            'Antes de mudar o corpo, precisamos entender o que queremos sentir dentro dele.',

    // ── Física — step headings ────────────────────────────────────────────────
    fStep1Heading:  'Identificação',
    fStep1Desc:     'Passo 1 de 7 — Dados básicos',
    fStep2Heading:  'Corpo e rotina',
    fStep2Desc:     'Passo 2 de 7 — Sono, alimentação e atividade física',
    fStep3Heading:  'Saúde e sintomas',
    fStep3Desc:     'Passo 3 de 7 — Sinais do corpo',
    fStep4Heading:  'Autoconhecimento',
    fStep4Desc:     'Passo 4 de 7 — Sua relação consigo mesma',
    fStep5Heading:  'Objetivos físicos',
    fStep5Desc:     'Passo 5 de 7 — O que você quer conquistar',
    fStep6Heading:  'Maternidade',
    fStep6Desc:     'Passo 6 de 7 — Responda apenas se for mãe',
    fStep7Heading:  'Motivação e finalização',
    fStep7Desc:     'Passo 7 de 7 — Quase lá!',

    // ── Física — labels & placeholders ───────────────────────────────────────
    fNomeLabel:         'Nome completo *',
    fNomePH:            'Seu nome completo',
    fNascLabel:         'Data de nascimento *',
    fEmailLabel:        'Email *',
    fEmailPH:           'seu@email.com',
    fTelLabel:          'WhatsApp',
    fTelPH:             '+55 00 00000-0000',
    fPesoLabel:         'Peso atual (kg)',
    fPesoPH:            'Ex: 68',
    fAlturaLabel:       'Altura (cm)',
    fAlturaPH:          'Ex: 165',
    fStep1Error:        'Por favor, preencha o nome e o email antes de continuar.',

    fSonoLabel:         'Quantas horas de sono, em média, você tem por noite?',
    fSonoOpt1:          'Menos de 5 horas',
    fSonoOpt2:          'Entre 5 e 7 horas',
    fSonoOpt3:          'Mais de 7 horas',

    fAlimLabel:         'Que tipo de alimentação você sente que o seu corpo pede hoje? (pode marcar mais de um)',
    fAlimOpt1:          'Energia rápida (doces, pães)',
    fAlimOpt2:          'Conforto (comidas quentes, caseiras)',
    fAlimOpt3:          'Leveza e vitalidade (saladas, frutas, água)',

    fCalmaLabel:        'Você sente que consegue se alimentar com calma?',
    fCalmaOpt1:         'Sim, consigo sempre.',
    fCalmaOpt2:         'Sim, mas não sempre.',
    fCalmaOpt3:         'Às vezes.',
    fCalmaOpt4:         'Não consigo.',

    fTrabalhoLabel:     'No trabalho, você passa a maior parte do tempo: (pode marcar mais de um)',
    fTrabalhoOpt1:      'Sentada',
    fTrabalhoOpt2:      'Caminhando',
    fTrabalhoOpt3:      'Em pé',
    fTrabalhoOpt4:      'Subindo e descendo escadas',
    fTrabalhoOpt5:      'Carregando pesos',

    fRefeicoesLabel:    'Quem irá preparar as refeições do plano alimentar?',
    fRefeicoesPH:       'Ex: eu mesma, marido, empregada…',

    fSintomasLabel:     'Há algum sintoma que percebe com frequência? (pode marcar mais de um)',
    fSintomasOpt1:      'Inchaço',
    fSintomasOpt2:      'Cansaço constante',
    fSintomasOpt3:      'Retenção de líquido',
    fSintomasOpt4:      'Irritabilidade',
    fSintomasOpt5:      'Queda de cabelo',
    fSintomasOpt6:      'Pele ressecada ou oleosa',
    fSintomasOutroLabel:'Outros sintomas que gostaria de mencionar',
    fSintomasOutroPH:   'Descreva livremente…',

    fMarcadoresLabel:   'Há algum marcador de saúde que deseja melhorar (colesterol, energia, sono)? Realizou algum exame laboratorial recente?',
    fMarcadoresPH:      'Descreva seus exames ou indicadores de saúde…',

    fEspelhoLabel:      'Como está sua relação com o espelho?',
    fEspelhoOpt1:       'Evito me olhar',
    fEspelhoOpt2:       'Me olho com indiferença',
    fEspelhoOpt3:       'Me olho com carinho',
    fEspelhoOpt4:       'Estou voltando a me olhar',
    fEspelhoOpt5:       'Não me reconheço',

    fPerdeLabel:        'Em que momento do dia sente que "se perde de si mesma" e o tempo passa?',
    fPerdeOpt1:         'Pela manhã, ao acordar.',
    fPerdeOpt2:         'Após a dedicação de cuidar dos filhos, casa e família',
    fPerdeOpt3:         'À noite',
    fPerdeOpt4:         'Outro:',
    fPerdeOutroPH:      'Se outro, descreva aqui…',

    fFaltaLabel:        'O que você sente falta de fazer por você? (Ex: caminhar sozinha, cuidar do cabelo, almoçar sem pressa, ler, treinar…)',
    fHoraLabel:         'Se tivesse uma hora por dia só sua, o que faria com ela?',
    fImpedeLabel:       'Quando pensa em voltar a se cuidar, o que mais te impede hoje?',
    fImpedePH:          'Ex: falta de energia, apoio, tempo, motivação…',

    fObjetivoLabel:     'Você busca mais definição, redução de volume, energia, ou leveza corporal?',
    fObjetivoPH:        'Descreva em suas próprias palavras…',
    fMudancasLabel:     'Quais mudanças físicas você já começou a notar (mesmo pequenas)?',
    fMudancasPH:        'Mesmo que sejam pequenas percepções…',

    fCulpaLabel:        'Você sente culpa quando tenta priorizar seu tempo?',
    fCulpaOpt1:         'Sim, com frequência',
    fCulpaOpt2:         'Às vezes.',
    fCulpaOpt3:         'Não sinto',
    fCulpaOpt4:         'Não sou mãe',

    fMatSentLabel:      'Depois da maternidade, qual sentimento mais mudou em relação ao seu corpo? (pode marcar mais de um)',
    fMatSentOpt1:       'Gratidão',
    fMatSentOpt2:       'Desconexão',
    fMatSentOpt3:       'Apenas críticas',
    fMatSentOpt4:       'Orgulho',
    fMatSentOpt5:       'Cansaço',
    fMatSentOpt6:       'Não se aplica',

    fGestacaoLabel:     'Como mudou sua relação com o corpo e a comida depois da gestação?',
    fGestacaoPH:        'Se não for mãe, pode deixar em branco.',

    fRotinaLabel:       'Como está sua rotina atual com o bebê ou os filhos?',
    fRotinaOpt1:        'Organizada',
    fRotinaOpt2:        'Não consigo ter uma rotina',
    fRotinaOpt3:        'Alterno entre os dois.',
    fRotinaOpt4:        'Não se aplica',

    fMotivacaoLabel:    'O quanto você está motivada para atingir seu objetivo? (1 = pouco motivada, 10 = muito motivada)',
    fMotivacaoMin:      'Pouco',
    fMotivacaoMax:      'Muito',

    fTresPalavrasLabel: 'Como você gostaria de se sentir ao final do programa em três palavras?',
    fTresPalavrasPH:    'Ex: leve, confiante, disciplinada',
    fObsLabel:          'Algo a mais que queira me contar?',
    fObsPH:             'Fique à vontade para compartilhar o que sentir relevante…',

    // ── Emocional — step headings ─────────────────────────────────────────────
    eStep1Heading:  'Identificação',
    eStep1Desc:     'Passo 1 de 8 — Dados básicos',
    eStep2Heading:  'Gatilhos emocionais',
    eStep2Desc:     'Passo 2 de 8 — Sua relação emocional com a comida',
    eStep3Heading:  'Sentimentos e autoconhecimento',
    eStep3Desc:     'Passo 3 de 8 — O que quer reconstruir',
    eStep4Heading:  'Escala comportamental',
    eStep4Desc:     'Passo 4 de 8 — Assinale de 1 a 5 se a resposta não lhe representa, de 6 a 10 se lhe representa',
    eStep5Heading:  'Histórico de peso',
    eStep5Desc:     'Passo 5 de 8 — Sua trajetória',
    eStep6Heading:  'Corpo e rotina',
    eStep6Desc:     'Passo 6 de 8 — Aspectos físicos do dia a dia',
    eStep7Heading:  'Maternidade',
    eStep7Desc:     'Passo 7 de 8 — Responda apenas se for mãe',
    eStep8Heading:  'Objetivos e motivação',
    eStep8Desc:     'Passo 8 de 8 — Quase lá!',

    // ── Emocional — labels & options ──────────────────────────────────────────
    eNomeLabel:         'Nome completo *',
    eNomePH:            'Seu nome completo',
    eNascLabel:         'Data de nascimento *',
    eEmailLabel:        'Email *',
    eEmailPH:           'seu@email.com',
    eStep1Error:        'Por favor, preencha o nome e o email antes de continuar.',

    eVersaoLabel:       'Se você pudesse dar um nome para a nova versão que quer construir, qual seria?',
    eVersaoPH:          'Ex: minha versão confiante, versão leve, versão disciplinada…',

    eOcasiaoLabel:      'Há uma ocasião especial para que queira perder peso? (pode marcar mais de um)',
    eOcasiaoOpt1:       'Férias',
    eOcasiaoOpt2:       'Casamento',
    eOcasiaoOpt3:       'Aniversário',
    eOcasiaoOpt4:       'Verão',
    eOcasiaoOpt5:       'Viagem',
    eOcasiaoOpt6:       'Festas ou evento familiar',
    eOcasiaoOpt7:       'Não é por uma ocasião',

    eVulneravelLabel:   'Quando você se sente mais vulnerável e busca comida como conforto? (pode marcar mais de um)',
    eVulneravelOpt1:    'Sozinha',
    eVulneravelOpt2:    'Cansada',
    eVulneravelOpt3:    'Pressionada',
    eVulneravelOpt4:    'Entediada',
    eVulneravelOpt5:    'Carente',
    eVulneravelOutroPH: 'Outro: descreva…',

    eComidaOferecLabel: 'O que você acha que a comida tem te oferecido além de sabor? (pode marcar mais de um)',
    eComidaOferecOpt1:  'Pausa',
    eComidaOferecOpt2:  'Prazer',
    eComidaOferecOpt3:  'Acolhimento',
    eComidaOferecOpt4:  'Recompensa',
    eComidaOferecOpt5:  'Controle',

    eMomentosLabel:     'Quais momentos do dia você sente mais vontade de comer? (pode marcar mais de um)',
    eMomentosOpt1:      'No fim do dia',
    eMomentosOpt2:      'Quando está sozinha',
    eMomentosOpt3:      'Após o trabalho',
    eMomentosOpt4:      'Após brigas',

    eHorarioLabel:      'Qual é o melhor horário do seu dia para cuidar de si e o que costuma atrapalhar isso?',

    eReconstruirLabel:  'Qual sentimento você mais quer reconstruir em relação a si mesma? (pode marcar mais de um)',
    eReconstruirOpt1:   'Segurança',
    eReconstruirOpt2:   'Leveza',
    eReconstruirOpt3:   'Autoconfiança',
    eReconstruirOpt4:   'Feminilidade',
    eReconstruirOpt5:   'Orgulho',

    eRefugioLabel:      'Se a comida não fosse seu refúgio, o que poderia ser? (pode marcar mais de um)',
    eRefugioOpt1:       'Autocuidado',
    eRefugioOpt2:       'Descanso',
    eRefugioOpt3:       'Rotina',
    eRefugioOpt4:       'Prazer',
    eRefugioOpt5:       'Tempo para si',

    eCorpoParteLabel:   'Qual parte do seu corpo você mais gostaria de melhorar? (pode marcar mais de um)',
    eCorpoParteOpt1:    'Barriga',
    eCorpoParteOpt2:    'Braço',
    eCorpoParteOpt3:    'Perna',
    eCorpoParteOpt4:    'Bochechas',
    eCorpoParteOpt5:    'Papada/queixo duplo',

    eRepetirLabel:      'Quando você faz uma refeição, você tem o hábito de repetir?',
    eDiadicilLabel:     'Às vezes, se teve um dia difícil, come para se sentir melhor?',
    eDistraidaLabel:    'Quando come, está sempre fazendo algo mais, como mexer no telefone ou ver TV?',
    eDesisteLabel:      '"Posso manter hábitos saudáveis por um tempo, mas logo que passo por alguma situação mais desafiante desisto." — Esta frase te representa?',

    eEventosLabel:      'Você teve eventos na sua vida que levaram ao aumento de peso? (pode marcar mais de um)',
    eEventosOpt1:       'Não tive.',
    eEventosOpt2:       'Sim, medicamentos',
    eEventosOpt3:       'Sim, gravidez',
    eEventosOpt4:       'Sim, pandemia',
    eEventosOpt5:       'Sim, após o casamento',
    eEventosOpt6:       'Sim, após uma lesão',
    eEventosOpt7:       'Sim, após um novo trabalho',
    eEventosOutroPH:    'Outro: descreva…',

    eUltimaVezLabel:    'Quando foi a última vez que você se sentiu feliz com sua imagem corporal?',
    eUltimaVezOpt1:     'Menos de 1 ano',
    eUltimaVezOpt2:     'Entre 1 e 2 anos',
    eUltimaVezOpt3:     'Mais de 3 anos',
    eUltimaVezOpt4:     'Nunca estive satisfeita.',

    eExperienciaLabel:  'Como foi sua experiência ao perder peso?',
    eExperienciaOpt1:   'Já fiz várias dietas',
    eExperienciaOpt2:   'Já perdi peso, mas sempre recupero',
    eExperienciaOpt3:   'Nunca tentei anteriormente',
    eExperienciaOpt4:   'Perdi e mantive',
    eExperienciaOpt5:   'Treino + para poder comer',
    eExperienciaOpt6:   'Já perdi anteriormente com acompanhamento de nutricionista',

    // e-step-6 reuses fSono*, fPerde*, fCalma*, fAlim*, fSintomas* keys above
    ePerdeOutroPH:      'Outro: descreva…',
    eSintomasOutroPH:   'Outro: descreva…',

    eGestacaoLabel:     'Como mudou sua relação com o corpo e a comida depois da gestação?',
    eGestacaoPH:        'Se não for mãe, pode deixar em branco.',

    eRotinaLabel:       'Como está sua rotina atual com o bebê ou os filhos?',
    eRotinaOpt1:        'Organizada',
    eRotinaOpt2:        'Não consigo ter uma rotina',
    eRotinaOpt3:        'Alterno entre os dois.',
    eRotinaOpt4:        'Não se aplica',

    eMatSentLabel:      'Depois da maternidade, qual sentimento mais mudou em relação ao seu corpo? (pode marcar mais de um)',
    eMatSentOpt1:       'Gratidão',
    eMatSentOpt2:       'Desconexão',
    eMatSentOpt3:       'Apenas críticas',
    eMatSentOpt4:       'Orgulho',
    eMatSentOpt5:       'Cansaço',
    eMatSentOpt6:       'Não se aplica',

    eCulpaLabel:        'Você sente culpa quando tenta priorizar seu tempo?',
    eCulpaOpt1:         'Sim, com frequência',
    eCulpaOpt2:         'Às vezes.',
    eCulpaOpt3:         'Não sinto',
    eCulpaOpt4:         'Não se aplica',

    eEspelhoParto:      'Como está sua relação com o espelho desde o parto?',
    eEspelhoPartoOpt1:  'Evito me olhar',
    eEspelhoPartoOpt2:  'Me olho com indiferença',
    eEspelhoPartoOpt3:  'Me olho com carinho',
    eEspelhoPartoOpt4:  'Estou voltando a me olhar',
    eEspelhoPartoOpt5:  'Não se aplica',

    eFaltaLabel:        'O que você sente falta de fazer por você?',
    eFaltaPH:           'Ex: caminhar sozinha, cuidar do cabelo, almoçar sem pressa, ler, treinar…',
    eImpedeLabel:       'Quando pensa em voltar a se cuidar, o que mais te impede hoje?',
    eImpedePH:          'Ex: falta de energia, apoio, tempo, motivação…',
    eObjetivoLabel:     'Você busca mais definição, redução de volume, energia, ou leveza corporal?',
    eRefeicoesLabel:    'Quem irá preparar as refeições do plano alimentar?',
    eRefeicoesPH:       'Ex: eu mesma, marido, empregada…',
    eMudancasLabel:     'Quais mudanças físicas você já começou a notar (mesmo pequenas)?',
    eMarcadoresLabel:   'Há algum marcador de saúde que deseja melhorar? Realizou algum exame laboratorial recente?',

    eMotivacaoLabel:    'O quanto você está motivada para atingir seu objetivo? (1 = pouco, 10 = muito)',
    eTrabalhoLabel:     'No trabalho, você passa a maior parte do tempo: (pode marcar mais de um)',
    eTrabalhoOpt1:      'Sentada',
    eTrabalhoOpt2:      'Caminhando',
    eTrabalhoOpt3:      'Em pé',
    eTrabalhoOpt4:      'Subindo e descendo escadas',
    eTrabalhoOpt5:      'Carregando pesos',

    eTresPalavrasLabel: 'Como você gostaria de se sentir ao final do programa em três palavras?',
    eTresPalavrasPH:    'Ex: leve, confiante, disciplinada',
  },

  // ───────────────────────────────────────────────────────────────────────────
  es: {
    selectorTitle:      'Bienvenida a tu<br><em>espacio de autoconocimiento</em>',
    selectorSub:        'Tus respuestas son confidenciales y serán analizadas antes de tu consulta.',

    card1Title:         'Definición Física',
    card1Desc:          'Sobre tu cuerpo, síntomas, rutina, sueño, alimentación y objetivos físicos. Antes de cambiar el cuerpo, necesitamos entender qué queremos sentir dentro de él.',
    card1Tag:           '25 preguntas · ~12 min',

    card2Title:         'Definición Emocional',
    card2Desc:          'Sobre tu relación emocional con la comida, desencadenantes, sentimientos y la versión de ti misma que quieres construir.',
    card2Tag:           '38 preguntas · ~18 min',

    card3Title:         'Frecuencia Alimentaria',
    card3Desc:          'Evalúa tus hábitos alimentarios habituales: qué alimentos consumes, con qué frecuencia y en qué cantidad.',
    card3Tag:           '39 alimentos · ~15 min · con puntuación',

    backBtn:            '← Elegir otro cuestionario',
    progStep:           'Paso {n}',
    continueBtn:        'Continuar →',
    backSmBtn:          '← Volver',
    submitBtn:          'Enviar respuestas',

    successIcon:        '✓',
    successTitle:       '¡Gracias por compartir!',
    successText:        'Tus respuestas han sido registradas de forma segura. Tamiris las analizará antes de tu consulta y se pondrá en contacto pronto.',
    successBackBtn:     'Rellenar otro cuestionario',

    formTitleFisica:    'Planner in.curta — <em>Definición Física</em>',
    formTitleEmocional: 'Planner in.curta — <em>Definición Emocional</em>',
    formSub:            'Antes de cambiar el cuerpo, necesitamos entender qué queremos sentir dentro de él.',

    fStep1Heading:  'Identificación',
    fStep1Desc:     'Paso 1 de 7 — Datos básicos',
    fStep2Heading:  'Cuerpo y rutina',
    fStep2Desc:     'Paso 2 de 7 — Sueño, alimentación y actividad física',
    fStep3Heading:  'Salud y síntomas',
    fStep3Desc:     'Paso 3 de 7 — Señales del cuerpo',
    fStep4Heading:  'Autoconocimiento',
    fStep4Desc:     'Paso 4 de 7 — Tu relación contigo misma',
    fStep5Heading:  'Objetivos físicos',
    fStep5Desc:     'Paso 5 de 7 — Lo que quieres lograr',
    fStep6Heading:  'Maternidad',
    fStep6Desc:     'Paso 6 de 7 — Responde solo si eres madre',
    fStep7Heading:  'Motivación y cierre',
    fStep7Desc:     'Paso 7 de 7 — ¡Casi lista!',

    fNomeLabel:         'Nombre completo *',
    fNomePH:            'Tu nombre completo',
    fNascLabel:         'Fecha de nacimiento *',
    fEmailLabel:        'Email *',
    fEmailPH:           'tu@email.com',
    fTelLabel:          'WhatsApp',
    fTelPH:             '+55 00 00000-0000',
    fPesoLabel:         'Peso actual (kg)',
    fPesoPH:            'Ej: 68',
    fAlturaLabel:       'Altura (cm)',
    fAlturaPH:          'Ej: 165',
    fStep1Error:        'Por favor, completa el nombre y el email antes de continuar.',

    fSonoLabel:         '¿Cuántas horas de sueño, en promedio, tienes por noche?',
    fSonoOpt1:          'Menos de 5 horas',
    fSonoOpt2:          'Entre 5 y 7 horas',
    fSonoOpt3:          'Más de 7 horas',

    fAlimLabel:         '¿Qué tipo de alimentación sientes que tu cuerpo pide hoy? (puedes marcar más de uno)',
    fAlimOpt1:          'Energía rápida (dulces, panes)',
    fAlimOpt2:          'Confort (comidas calientes, caseras)',
    fAlimOpt3:          'Ligereza y vitalidad (ensaladas, frutas, agua)',

    fCalmaLabel:        '¿Sientes que puedes comer con calma?',
    fCalmaOpt1:         'Sí, siempre lo logro.',
    fCalmaOpt2:         'Sí, pero no siempre.',
    fCalmaOpt3:         'A veces.',
    fCalmaOpt4:         'No lo logro.',

    fTrabalhoLabel:     'En el trabajo, pasas la mayor parte del tiempo: (puedes marcar más de uno)',
    fTrabalhoOpt1:      'Sentada',
    fTrabalhoOpt2:      'Caminando',
    fTrabalhoOpt3:      'De pie',
    fTrabalhoOpt4:      'Subiendo y bajando escaleras',
    fTrabalhoOpt5:      'Cargando pesos',

    fRefeicoesLabel:    '¿Quién preparará las comidas del plan alimentario?',
    fRefeicoesPH:       'Ej: yo misma, marido, empleada…',

    fSintomasLabel:     '¿Hay algún síntoma que notes con frecuencia? (puedes marcar más de uno)',
    fSintomasOpt1:      'Hinchazón',
    fSintomasOpt2:      'Cansancio constante',
    fSintomasOpt3:      'Retención de líquidos',
    fSintomasOpt4:      'Irritabilidad',
    fSintomasOpt5:      'Caída del cabello',
    fSintomasOpt6:      'Piel seca u oleosa',
    fSintomasOutroLabel:'Otros síntomas que quieras mencionar',
    fSintomasOutroPH:   'Descríbelos libremente…',

    fMarcadoresLabel:   '¿Hay algún indicador de salud que desees mejorar (colesterol, energía, sueño)? ¿Has realizado algún análisis reciente?',
    fMarcadoresPH:      'Describe tus análisis o indicadores de salud…',

    fEspelhoLabel:      '¿Cómo es tu relación con el espejo?',
    fEspelhoOpt1:       'Evito mirarme',
    fEspelhoOpt2:       'Me miro con indiferencia',
    fEspelhoOpt3:       'Me miro con cariño',
    fEspelhoOpt4:       'Estoy volviendo a mirarme',
    fEspelhoOpt5:       'No me reconozco',

    fPerdeLabel:        '¿En qué momento del día sientes que "te pierdes a ti misma" y el tiempo pasa?',
    fPerdeOpt1:         'Por la mañana, al despertar.',
    fPerdeOpt2:         'Tras dedicarme a cuidar a los hijos, casa y familia',
    fPerdeOpt3:         'Por la noche',
    fPerdeOpt4:         'Otro:',
    fPerdeOutroPH:      'Si es otro, descríbelo aquí…',

    fFaltaLabel:        '¿Qué echas de menos hacer por ti? (Ej: caminar sola, cuidar el pelo, almorzar sin prisa, leer, entrenar…)',
    fHoraLabel:         'Si tuvieras una hora al día solo para ti, ¿qué harías con ella?',
    fImpedeLabel:       'Cuando piensas en volver a cuidarte, ¿qué es lo que más te lo impide hoy?',
    fImpedePH:          'Ej: falta de energía, apoyo, tiempo, motivación…',

    fObjetivoLabel:     '¿Buscas más definición, reducción de volumen, energía o ligereza corporal?',
    fObjetivoPH:        'Descríbelo con tus propias palabras…',
    fMudancasLabel:     '¿Qué cambios físicos ya has empezado a notar (aunque sean pequeños)?',
    fMudancasPH:        'Aunque sean percepciones pequeñas…',

    fCulpaLabel:        '¿Sientes culpa cuando intentas priorizar tu tiempo?',
    fCulpaOpt1:         'Sí, con frecuencia',
    fCulpaOpt2:         'A veces.',
    fCulpaOpt3:         'No lo siento',
    fCulpaOpt4:         'No soy madre',

    fMatSentLabel:      'Después de la maternidad, ¿qué sentimiento cambió más en relación a tu cuerpo? (puedes marcar más de uno)',
    fMatSentOpt1:       'Gratitud',
    fMatSentOpt2:       'Desconexión',
    fMatSentOpt3:       'Solo críticas',
    fMatSentOpt4:       'Orgullo',
    fMatSentOpt5:       'Cansancio',
    fMatSentOpt6:       'No aplica',

    fGestacaoLabel:     '¿Cómo cambió tu relación con el cuerpo y la comida después del embarazo?',
    fGestacaoPH:        'Si no eres madre, puedes dejarlo en blanco.',

    fRotinaLabel:       '¿Cómo es tu rutina actual con el bebé o los hijos?',
    fRotinaOpt1:        'Organizada',
    fRotinaOpt2:        'No logro tener una rutina',
    fRotinaOpt3:        'Alterno entre los dos.',
    fRotinaOpt4:        'No aplica',

    fMotivacaoLabel:    '¿Cuán motivada estás para alcanzar tu objetivo? (1 = poco motivada, 10 = muy motivada)',
    fMotivacaoMin:      'Poco',
    fMotivacaoMax:      'Mucho',

    fTresPalavrasLabel: '¿Cómo te gustaría sentirte al final del programa en tres palabras?',
    fTresPalavrasPH:    'Ej: ligera, segura, disciplinada',
    fObsLabel:          '¿Algo más que quieras contarme?',
    fObsPH:             'Siéntete libre de compartir lo que consideres relevante…',

    eStep1Heading:  'Identificación',
    eStep1Desc:     'Paso 1 de 8 — Datos básicos',
    eStep2Heading:  'Desencadenantes emocionales',
    eStep2Desc:     'Paso 2 de 8 — Tu relación emocional con la comida',
    eStep3Heading:  'Sentimientos y autoconocimiento',
    eStep3Desc:     'Paso 3 de 8 — Lo que quieres reconstruir',
    eStep4Heading:  'Escala conductual',
    eStep4Desc:     'Paso 4 de 8 — Marca de 1 a 5 si no te representa, de 6 a 10 si te representa',
    eStep5Heading:  'Historial de peso',
    eStep5Desc:     'Paso 5 de 8 — Tu trayectoria',
    eStep6Heading:  'Cuerpo y rutina',
    eStep6Desc:     'Paso 6 de 8 — Aspectos físicos del día a día',
    eStep7Heading:  'Maternidad',
    eStep7Desc:     'Paso 7 de 8 — Responde solo si eres madre',
    eStep8Heading:  'Objetivos y motivación',
    eStep8Desc:     'Paso 8 de 8 — ¡Casi lista!',

    eNomeLabel:         'Nombre completo *',
    eNomePH:            'Tu nombre completo',
    eNascLabel:         'Fecha de nacimiento *',
    eEmailLabel:        'Email *',
    eEmailPH:           'tu@email.com',
    eStep1Error:        'Por favor, completa el nombre y el email antes de continuar.',

    eVersaoLabel:       'Si pudieras darle un nombre a la nueva versión que quieres construir, ¿cuál sería?',
    eVersaoPH:          'Ej: mi versión segura, versión ligera, versión disciplinada…',

    eOcasiaoLabel:      '¿Hay alguna ocasión especial para la que quieras perder peso? (puedes marcar más de uno)',
    eOcasiaoOpt1:       'Vacaciones',
    eOcasiaoOpt2:       'Boda',
    eOcasiaoOpt3:       'Cumpleaños',
    eOcasiaoOpt4:       'Verano',
    eOcasiaoOpt5:       'Viaje',
    eOcasiaoOpt6:       'Fiestas o evento familiar',
    eOcasiaoOpt7:       'No es por una ocasión',

    eVulneravelLabel:   '¿Cuándo te sientes más vulnerable y buscas comida como consuelo? (puedes marcar más de uno)',
    eVulneravelOpt1:    'Sola',
    eVulneravelOpt2:    'Cansada',
    eVulneravelOpt3:    'Bajo presión',
    eVulneravelOpt4:    'Aburrida',
    eVulneravelOpt5:    'Con necesidad de afecto',
    eVulneravelOutroPH: 'Otro: descríbelo…',

    eComidaOferecLabel: '¿Qué crees que la comida te ha ofrecido además de sabor? (puedes marcar más de uno)',
    eComidaOferecOpt1:  'Pausa',
    eComidaOferecOpt2:  'Placer',
    eComidaOferecOpt3:  'Acogimiento',
    eComidaOferecOpt4:  'Recompensa',
    eComidaOferecOpt5:  'Control',

    eMomentosLabel:     '¿En qué momentos del día sientes más ganas de comer? (puedes marcar más de uno)',
    eMomentosOpt1:      'Al final del día',
    eMomentosOpt2:      'Cuando estás sola',
    eMomentosOpt3:      'Después del trabajo',
    eMomentosOpt4:      'Después de discusiones',

    eHorarioLabel:      '¿Cuál es el mejor momento de tu día para cuidarte y qué suele impedirlo?',

    eReconstruirLabel:  '¿Qué sentimiento quieres reconstruir más en relación a ti misma? (puedes marcar más de uno)',
    eReconstruirOpt1:   'Seguridad',
    eReconstruirOpt2:   'Ligereza',
    eReconstruirOpt3:   'Autoconfianza',
    eReconstruirOpt4:   'Feminidad',
    eReconstruirOpt5:   'Orgullo',

    eRefugioLabel:      'Si la comida no fuera tu refugio, ¿qué podría serlo? (puedes marcar más de uno)',
    eRefugioOpt1:       'Autocuidado',
    eRefugioOpt2:       'Descanso',
    eRefugioOpt3:       'Rutina',
    eRefugioOpt4:       'Placer',
    eRefugioOpt5:       'Tiempo para ti',

    eCorpoParteLabel:   '¿Qué parte de tu cuerpo te gustaría mejorar más? (puedes marcar más de uno)',
    eCorpoParteOpt1:    'Abdomen',
    eCorpoParteOpt2:    'Brazos',
    eCorpoParteOpt3:    'Piernas',
    eCorpoParteOpt4:    'Mejillas',
    eCorpoParteOpt5:    'Papada/doble mentón',

    eRepetirLabel:      'Cuando haces una comida, ¿tienes el hábito de repetir?',
    eDiadicilLabel:     'A veces, si has tenido un día difícil, ¿comes para sentirte mejor?',
    eDistraidaLabel:    'Cuando comes, ¿siempre estás haciendo algo más, como mirar el teléfono o ver la TV?',
    eDesisteLabel:      '"Puedo mantener hábitos saludables por un tiempo, pero en cuanto paso por una situación más desafiante, abandono." — ¿Esta frase te representa?',

    eEventosLabel:      '¿Has tenido eventos en tu vida que llevaron al aumento de peso? (puedes marcar más de uno)',
    eEventosOpt1:       'No tuve.',
    eEventosOpt2:       'Sí, medicamentos',
    eEventosOpt3:       'Sí, embarazo',
    eEventosOpt4:       'Sí, pandemia',
    eEventosOpt5:       'Sí, tras el matrimonio',
    eEventosOpt6:       'Sí, tras una lesión',
    eEventosOpt7:       'Sí, tras un nuevo trabajo',
    eEventosOutroPH:    'Otro: descríbelo…',

    eUltimaVezLabel:    '¿Cuándo fue la última vez que te sentiste feliz con tu imagen corporal?',
    eUltimaVezOpt1:     'Hace menos de 1 año',
    eUltimaVezOpt2:     'Entre 1 y 2 años',
    eUltimaVezOpt3:     'Hace más de 3 años',
    eUltimaVezOpt4:     'Nunca estuve satisfecha.',

    eExperienciaLabel:  '¿Cómo fue tu experiencia al perder peso?',
    eExperienciaOpt1:   'Ya he hecho varias dietas',
    eExperienciaOpt2:   'Ya he perdido peso, pero siempre lo recupero',
    eExperienciaOpt3:   'Nunca lo intenté antes',
    eExperienciaOpt4:   'Lo perdí y lo mantuve',
    eExperienciaOpt5:   'Entreno más para poder comer',
    eExperienciaOpt6:   'Ya lo perdí anteriormente con seguimiento de nutricionista',

    ePerdeOutroPH:      'Otro: descríbelo…',
    eSintomasOutroPH:   'Otro: descríbelo…',

    eGestacaoLabel:     '¿Cómo cambió tu relación con el cuerpo y la comida después del embarazo?',
    eGestacaoPH:        'Si no eres madre, puedes dejarlo en blanco.',

    eRotinaLabel:       '¿Cómo es tu rutina actual con el bebé o los hijos?',
    eRotinaOpt1:        'Organizada',
    eRotinaOpt2:        'No logro tener una rutina',
    eRotinaOpt3:        'Alterno entre los dos.',
    eRotinaOpt4:        'No aplica',

    eMatSentLabel:      'Después de la maternidad, ¿qué sentimiento cambió más en relación a tu cuerpo? (puedes marcar más de uno)',
    eMatSentOpt1:       'Gratitud',
    eMatSentOpt2:       'Desconexión',
    eMatSentOpt3:       'Solo críticas',
    eMatSentOpt4:       'Orgullo',
    eMatSentOpt5:       'Cansancio',
    eMatSentOpt6:       'No aplica',

    eCulpaLabel:        '¿Sientes culpa cuando intentas priorizar tu tiempo?',
    eCulpaOpt1:         'Sí, con frecuencia',
    eCulpaOpt2:         'A veces.',
    eCulpaOpt3:         'No lo siento',
    eCulpaOpt4:         'No aplica',

    eEspelhoParto:      '¿Cómo es tu relación con el espejo desde el parto?',
    eEspelhoPartoOpt1:  'Evito mirarme',
    eEspelhoPartoOpt2:  'Me miro con indiferencia',
    eEspelhoPartoOpt3:  'Me miro con cariño',
    eEspelhoPartoOpt4:  'Estoy volviendo a mirarme',
    eEspelhoPartoOpt5:  'No aplica',

    eFaltaLabel:        '¿Qué echas de menos hacer por ti?',
    eFaltaPH:           'Ej: caminar sola, cuidar el pelo, almorzar sin prisa, leer, entrenar…',
    eImpedeLabel:       'Cuando piensas en volver a cuidarte, ¿qué es lo que más te lo impide hoy?',
    eImpedePH:          'Ej: falta de energía, apoyo, tiempo, motivación…',
    eObjetivoLabel:     '¿Buscas más definición, reducción de volumen, energía o ligereza corporal?',
    eRefeicoesLabel:    '¿Quién preparará las comidas del plan alimentario?',
    eRefeicoesPH:       'Ej: yo misma, marido, empleada…',
    eMudancasLabel:     '¿Qué cambios físicos ya has empezado a notar (aunque sean pequeños)?',
    eMarcadoresLabel:   '¿Hay algún indicador de salud que desees mejorar? ¿Has realizado algún análisis reciente?',

    eMotivacaoLabel:    '¿Cuán motivada estás para alcanzar tu objetivo? (1 = poco, 10 = mucho)',
    eTrabalhoLabel:     'En el trabajo, pasas la mayor parte del tiempo: (puedes marcar más de uno)',
    eTrabalhoOpt1:      'Sentada',
    eTrabalhoOpt2:      'Caminando',
    eTrabalhoOpt3:      'De pie',
    eTrabalhoOpt4:      'Subiendo y bajando escaleras',
    eTrabalhoOpt5:      'Cargando pesos',

    eTresPalavrasLabel: '¿Cómo te gustaría sentirte al final del programa en tres palabras?',
    eTresPalavrasPH:    'Ej: ligera, segura, disciplinada',
  },
};

const FALLBACK = 'pt';

/**
 * Returns the full string map for the given language.
 * Falls back to PT if lang is unknown.
 */
export function getLangStrings(lang) {
  return strings[lang] || strings[FALLBACK];
}

/**
 * Returns a single translated string.
 * Falls back to PT, then to the key itself.
 */
export function t(lang, key) {
  return (strings[lang] && strings[lang][key])
    || strings[FALLBACK][key]
    || key;
}

/**
 * Returns true if lang is supported.
 */
export function isSupported(lang) {
  return Object.prototype.hasOwnProperty.call(strings, lang);
}

export const SUPPORTED_LANGS = Object.keys(strings);
