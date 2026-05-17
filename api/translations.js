// ─── translations.js ───────────────────────────────────────────────
// Single source of truth for all text in index.html.
// To add a new language, copy one block and translate the values.
// To use in JS: t('key')  →  returns the string for the active language.
// ───────────────────────────────────────────────────────────────────

const translations = {

  pt: {
    // <html lang>
    htmlLang: 'pt',

    // <title>
    pageTitle:   'In.curta · Tamiris Drumond · Nutrição Comportamental',
    q_pageTitle: 'in.curta — Área do Cliente',
    pagePrivTitle: 'in.curta — Informações Legais',

    // NAV
    navAbout:         'Sobre',
    navMethod:        'O Método',
    navProgram:       'Programa',
    navQuestionnaire: 'Questionário',
    navContact:       'Contato',

    // HERO
    heroLabel:   'Nutrição Clínica Comportamental',
    heroTitle:   'Emagrecer não é força<br>de vontade. É <em>neurotreinamento</em>.',
    heroSub:     'Aprenda a controlar os impulsos alimentares, reprogramar seus gatilhos e construir hábitos definitivos sem dietas restritivas e sem culpa.',
    heroCta:     'Começar agora',
    heroCtaAlt:  'Conhecer o método',
    heroMonths:  'Meses de Programa',
    heroTag1:    'Anos de Experiência',
    heroTag2:    'Anos em TV e Rádio',

    // ABOUT
    aboutLabel: 'Sobre',
    aboutTitle: 'Tamiris <em>Drumond</em>',
    aboutP1:    'Nutricionista com mais de 15 anos de experiência ajudando mulheres a transformarem sua relação com a comida. Especialista em Nutrição Clínica Comportamental, Neurociência e Psicologia Positiva.',
    aboutP2:    'Durante mais de 10 anos contribuiu com entrevistas semanais em TV e rádio, levando conhecimento acessível sobre comportamento alimentar e saúde para um público amplo.',
    aboutP3:    'Acredito que resultados duradouros não vêm da perfeição mas de entender seus hábitos, emoções e sua relação com a comida, e agir com estratégia e autocompaixão.',
    credClinica: 'Nutricionista Clínica',
    credNeuro:   'Neurociência',
    credPsico:   'Psicologia Positiva',
    credYears:   '+15 anos de experiência',
    aboutQuote:  '"Criei o in.curta porque percebi que muitas mulheres vivem presas no ciclo da restrição: começam motivadas, tentam mudar tudo de uma vez, falham, sentem culpa e recomeçam toda semana."',

    // WHY
    whyLabel:      'O Significado',
    whyTitle:      'Por que o <span class="inline-logo-wrap"><img src="images/logo-white.png" alt="in.curta" class="inline-logo-white"></span> é diferente',
    whyInTitle:    'Olhar para dentro',
    whyInText:     'O "IN" representa o olhar para dentro entender seus hábitos, emoções e a relação com a comida. Sem autoconhecimento, nenhuma dieta sustenta resultados duradouros.',
    whyCurtaTitle: 'Curtir o processo',
    whyCurtaText:  'O "curta" é um convite para viver com mais leveza: curtir a vida sem viver sob pressão de calorias, culpa ou dietas extremas. Você não só encurta o caminho como também curte o processo.',
    whyArrowTitle: 'Não é falta de força de vontade',
    whyArrowText:  'Se você começa dietas e não consegue manter, perde o controle com comida ou sente culpa depois de comer o problema não é você. É falta de estratégia para lidar com os impulsos do cérebro.',

    // HOW IT WORKS
    howLabel:   'O Programa',
    howTitle:   'Como <em>funciona</em>',
    howIntroP:  'O In.curta é um programa de 3 meses porque as mudanças reais no comportamento alimentar precisam de tempo para se consolidar. Durante esse período trabalhamos gradualmente impulsos alimentares, disciplina e construção de hábitos.',
    step1Num:   'Consulta Online',
    step1Title: '6 Consultas ao Vivo',
    step1Text:  'Uma consulta a cada 15 dias. Explicação prática sobre impulsos alimentares e hábitos, com construção gradual de disciplina alimentar e plano nutricional personalizado.',
    step2Num:   'Aplicativo',
    step2Title: 'Acompanhamento Diário',
    step2Text:  'Consulte o plano alimentar, receba notificações, registe peso e ingestão de água, atividade física, diário alimentar e esclareça dúvidas a qualquer momento.',
    step3Num:   'Planner',
    step3Title: 'Planner Quinzenal',
    step3Text:  'Exercícios de nutrição comportamental, neurociência e psicologia positiva para lidar com os impulsos, desenvolver disciplina e consolidar hábitos saudáveis.',
    step4Num:   'Resultado',
    step4Title: 'Hábitos Definitivos',
    step4Text:  'Emagreça de forma consciente, sem dietas restritivas e sem culpa reprogramando seus gatilhos e consolidando hábitos de forma definitiva.',
    pillarTitle: 'O que está incluído no programa',
    pillarText:  'Cada elemento do In.curta foi desenhado para trabalhar em conjunto oferecendo a estrutura, a ciência e o suporte que a mudança duradoura exige.',
    pillar1: '6 consultas online ao vivo (1 a cada 15 dias)',
    pillar2: 'Plano alimentar personalizado',
    pillar3: 'Acompanhamento pelo aplicativo',
    pillar4: 'Planner quinzenal com exercícios comportamentais',
    pillar5: 'Esclarecimento de dúvidas a qualquer momento',
    pillar6: 'Lista de compras e registo de refeições',

    // CLIENT AREA
    clientTitle: 'Área exclusiva para clientes',
    clientText:  'Acesse os questionários de anamnese, materiais do programa e seus planners personalizados.',
    clientCta:   'Acessar área do cliente →',

    // CONTACT
    contactLabel:    'Contato',
    contactTitle:    'Pronta para <em>começar?</em>',
    contactIntro:    'Se você tem dúvidas sobre o programa, quer conversar sobre a sua situação ou está pronta para começar estou aqui. Entre em contato e vamos conversar.',
    contactEmailLbl: 'Email',
    contactPhoneLbl: 'Telefone / WhatsApp',
    contactIgLbl:    'Instagram',
    fieldName:       'Nome',
    fieldNamePH:     'Seu nome',
    fieldEmail:      'Email',
    fieldEmailPH:    'seu@email.com',
    fieldMsg:        'Mensagem',
    fieldMsgPH:      'O que você gostaria de conversar?',
    submitBtn:       'Enviar mensagem',
    contactSuccess:  'Mensagem enviada! Entrarei em contato assim que possível.',

    // FOOTER
    footerPrivacy: 'Política de Privacidade',
    footerTerms:   'Termos de Uso',
    footerLegal:   'Aviso Legal',
    footerCookies: 'Política de Cookies',
    footerCopy:    '© 2025 · Nutrição Clínica Comportamental',

    // COOKIE BANNER
    cookieText:   'Este site utiliza apenas cookies essenciais para o funcionamento da página. Não utilizamos ferramentas de rastreamento ou análise. Ao continuar navegando, você concorda com nossa <a href="privacidade.html#cookies">Política de Cookies</a> e <a href="privacidade.html">Política de Privacidade</a> (conforme LGPD / Lei 13.709/2018).',
    cookieReject: 'Apenas essenciais',
    cookieAccept: 'Entendi',

    // JS ALERTS
    alertFillFields: 'Por favor, preencha todos os campos.',
    alertSendError:  'Erro ao enviar. Por favor tente novamente ou entre em contato por email.',

    // ── questionarios.html ──────────────────────────────────────────
    q_backToSite:       '← Voltar ao site',

    // Gate
    q_gateTitle:        'Área do Cliente',
    q_gateDesc:         'Esta área é exclusiva para clientes do programa in.curta.<br>Insira o código de acesso fornecido pela Tamiris.',
    q_gateError:        'Código incorreto. Tente novamente.',
    q_gateConnError:    'Erro de ligação. Tente novamente.',
    q_gateBtn:          'Entrar',

    // Selector shell — must match i18n.js values so applyTranslations() works on injected shell
    q_selectorTitle:    'Bem-vinda ao seu<br><em>espaço de autoconhecimento</em>',
    q_selectorSub:      'Suas respostas são confidenciais e serão analisadas antes da sua consulta.',
    q_backBtn:          '← Escolher outro questionário',
    q_successTitle:     'Obrigada por compartilhar!',
    q_successText:      'Suas respostas foram registradas com segurança. A Tamiris irá analisá-las antes da sua consulta e entrará em contato em breve.',
    q_successBackBtn:   'Preencher outro questionário',

    // Selector cards
    q_card1Title:  'Definição Física',
    q_card1Desc:   'Sobre seu corpo, sintomas, rotina, sono, alimentação e objetivos físicos.',
    q_card1Tag:    '25 perguntas · ~12 min',
    q_card2Title:  'Definição Emocional',
    q_card2Desc:   'Sobre sua relação emocional com a comida, gatilhos, sentimentos e objetivos.',
    q_card2Tag:    '38 perguntas · ~18 min',
    q_card3Title:  'Frequência Alimentar',
    q_card3Desc:   'Avalie seus hábitos alimentares: quais alimentos come, com que frequência e em que quantidade.',
    q_card3Tag:    '39 alimentos · ~15 min · com pontuação',

    // Form shell
    q_loading:           'A carregar…',
    q_step:              'Passo {n} de {total}',
    q_formTitleFisica:   'Planner in.curta — <em>Definição Física</em>',
    q_formTitleEmocional:'Planner in.curta — <em>Definição Emocional</em>',
    q_formSub:           'Antes de mudar o corpo, precisamos entender o que queremos sentir dentro dele.',
    q_sending:           'Enviando…',
    q_submitBtn:         'Enviar respostas',
    q_alertFillNameEmail:'Por favor, preencha pelo menos nome e email antes de enviar.',
    q_alertSendError:    'Erro ao enviar: ',
    q_loadError:         'Erro ao carregar. Recarregue a página.',
  },

  // ─────────────────────────────────────────────────────────────────

  es: {
    htmlLang: 'es',

    pageTitle:   'In.curta · Tamiris Drumond · Nutrición Conductual',
    q_pageTitle: 'in.curta — Área del Cliente',
    pagePrivTitle: 'in.curta — Información Legal',

    navAbout:         'Sobre',
    navMethod:        'El Método',
    navProgram:       'Programa',
    navQuestionnaire: 'Cuestionario',
    navContact:       'Contacto',

    heroLabel:   'Nutrición Clínica Conductual',
    heroTitle:   'Adelgazar no es fuerza<br>de voluntad. Es <em>neuroentrenamiento</em>.',
    heroSub:     'Aprende a controlar los impulsos alimentarios, reprogramar tus desencadenantes y construir hábitos definitivos sin dietas restrictivas y sin culpa.',
    heroCta:     'Empezar ahora',
    heroCtaAlt:  'Conocer el método',
    heroMonths:  'Meses de Programa',
    heroTag1:    'Años de Experiencia',
    heroTag2:    'Años en TV y Radio',

    aboutLabel: 'Sobre',
    aboutTitle: 'Tamiris <em>Drumond</em>',
    aboutP1:    'Nutricionista con más de 15 años de experiencia ayudando a mujeres a transformar su relación con la comida. Especialista en Nutrición Clínica Conductual, Neurociencia y Psicología Positiva.',
    aboutP2:    'Durante más de 10 años contribuyó con entrevistas semanales en TV y radio, llevando conocimiento accesible sobre conducta alimentaria y salud a un público amplio.',
    aboutP3:    'Creo que los resultados duraderos no vienen de la perfección, sino de entender tus hábitos, emociones y tu relación con la comida, y actuar con estrategia y autocompasión.',
    credClinica: 'Nutricionista Clínica',
    credNeuro:   'Neurociencia',
    credPsico:   'Psicología Positiva',
    credYears:   '+15 años de experiencia',
    aboutQuote:  '"Creé in.curta porque me di cuenta de que muchas mujeres viven atrapadas en el ciclo de la restricción: empiezan motivadas, intentan cambiarlo todo de una vez, fracasan, sienten culpa y recomienzan cada semana."',

    whyLabel:      'El Significado',
    whyTitle:      'Por qué el <span class="inline-logo-wrap"><img src="images/logo-white.png" alt="in.curta" class="inline-logo-white"></span> es diferente',
    whyInTitle:    'Mirar hacia adentro',
    whyInText:     'El "IN" representa la mirada interior: entender tus hábitos, emociones y la relación con la comida. Sin autoconocimiento, ninguna dieta sostiene resultados duraderos.',
    whyCurtaTitle: 'Disfrutar el proceso',
    whyCurtaText:  'El "curta" es una invitación a vivir con más ligereza: disfrutar la vida sin la presión de las calorías, la culpa o las dietas extremas. No solo acortas el camino, sino que también disfrutas el proceso.',
    whyArrowTitle: 'No es falta de fuerza de voluntad',
    whyArrowText:  'Si empiezas dietas y no logras mantenerlas, pierdes el control con la comida o sientes culpa después de comer, el problema no eres tú. Es falta de estrategia para manejar los impulsos del cerebro.',

    howLabel:   'El Programa',
    howTitle:   'Cómo <em>funciona</em>',
    howIntroP:  'In.curta es un programa de 3 meses porque los cambios reales en el comportamiento alimentario necesitan tiempo para consolidarse. Durante ese período trabajamos gradualmente los impulsos alimentarios, la disciplina y la construcción de hábitos.',
    step1Num:   'Consulta Online',
    step1Title: '6 Consultas en Vivo',
    step1Text:  'Una consulta cada 15 días. Explicación práctica sobre impulsos alimentarios y hábitos, con construcción gradual de disciplina alimentaria y plan nutricional personalizado.',
    step2Num:   'Aplicación',
    step2Title: 'Seguimiento Diario',
    step2Text:  'Consulta el plan alimentario, recibe notificaciones, registra peso e ingesta de agua, actividad física, diario alimentario y resuelve dudas en cualquier momento.',
    step3Num:   'Planner',
    step3Title: 'Planner Quincenal',
    step3Text:  'Ejercicios de nutrición conductual, neurociencia y psicología positiva para manejar los impulsos, desarrollar disciplina y consolidar hábitos saludables.',
    step4Num:   'Resultado',
    step4Title: 'Hábitos Definitivos',
    step4Text:  'Adelgaza de forma consciente, sin dietas restrictivas y sin culpa, reprogramando tus desencadenantes y consolidando hábitos de forma definitiva.',
    pillarTitle: 'Qué está incluido en el programa',
    pillarText:  'Cada elemento de In.curta fue diseñado para trabajar en conjunto, ofreciendo la estructura, la ciencia y el apoyo que el cambio duradero exige.',
    pillar1: '6 consultas online en vivo (1 cada 15 días)',
    pillar2: 'Plan alimentario personalizado',
    pillar3: 'Seguimiento por la aplicación',
    pillar4: 'Planner quincenal con ejercicios conductuales',
    pillar5: 'Resolución de dudas en cualquier momento',
    pillar6: 'Lista de compras y registro de comidas',

    clientTitle: 'Área exclusiva para clientes',
    clientText:  'Accede a los cuestionarios de anamnesis, materiales del programa y tus planners personalizados.',
    clientCta:   'Acceder al área del cliente →',

    contactLabel:    'Contacto',
    contactTitle:    '¿Lista para <em>empezar?</em>',
    contactIntro:    'Si tienes dudas sobre el programa, quieres hablar sobre tu situación o estás lista para empezar, aquí estoy. Contáctame y hablamos.',
    contactEmailLbl: 'Email',
    contactPhoneLbl: 'Teléfono / WhatsApp',
    contactIgLbl:    'Instagram',
    fieldName:       'Nombre',
    fieldNamePH:     'Tu nombre',
    fieldEmail:      'Email',
    fieldEmailPH:    'tu@email.com',
    fieldMsg:        'Mensaje',
    fieldMsgPH:      '¿De qué te gustaría hablar?',
    submitBtn:       'Enviar mensaje',
    contactSuccess:  '¡Mensaje enviado! Me pondré en contacto contigo lo antes posible.',

    footerPrivacy: 'Política de Privacidad',
    footerTerms:   'Términos de Uso',
    footerLegal:   'Aviso Legal',
    footerCookies: 'Política de Cookies',
    footerCopy:    '© 2025 · Nutrición Clínica Conductual',

    cookieText:   'Este sitio utiliza únicamente cookies esenciales para el funcionamiento de la página. No utilizamos herramientas de seguimiento ni análisis. Al continuar navegando, aceptas nuestra <a href="privacidade.html#cookies">Política de Cookies</a> y <a href="privacidade.html">Política de Privacidad</a>.',
    cookieReject: 'Solo esenciales',
    cookieAccept: 'Entendido',

    alertFillFields: 'Por favor, completa todos los campos.',
    alertSendError:  'Error al enviar. Por favor intenta de nuevo o contáctanos por email.',

    // ── questionarios.html ──────────────────────────────────────────
    q_backToSite:       '← Volver al sitio',

    // Gate
    q_gateTitle:        'Área del Cliente',
    q_gateDesc:         'Esta área es exclusiva para clientes del programa in.curta.<br>Introduce el código de acceso proporcionado por Tamiris.',
    q_gateError:        'Código incorrecto. Inténtalo de nuevo.',
    q_gateConnError:    'Error de conexión. Inténtalo de nuevo.',
    q_gateBtn:          'Entrar',

    // Selector shell
    q_selectorTitle:    'Bienvenida a tu<br><em>espacio de autoconocimiento</em>',
    q_selectorSub:      'Tus respuestas son confidenciales y serán analizadas antes de tu consulta.',
    q_backBtn:          '← Elegir otro cuestionario',
    q_successTitle:     '¡Gracias por compartir!',
    q_successText:      'Tus respuestas han sido registradas de forma segura. Tamiris las analizará antes de tu consulta y se pondrá en contacto pronto.',
    q_successBackBtn:   'Rellenar otro cuestionario',

    // Selector cards
    q_card1Title:  'Definición Física',
    q_card1Desc:   'Sobre tu cuerpo, síntomas, rutina, sueño, alimentación y objetivos físicos.',
    q_card1Tag:    '25 preguntas · ~12 min',
    q_card2Title:  'Definición Emocional',
    q_card2Desc:   'Sobre tu relación emocional con la comida, desencadenantes, sentimientos y objetivos.',
    q_card2Tag:    '38 preguntas · ~18 min',
    q_card3Title:  'Frecuencia Alimentaria',
    q_card3Desc:   'Evalúa tus hábitos alimentarios: qué alimentos consumes, con qué frecuencia y en qué cantidad.',
    q_card3Tag:    '39 alimentos · ~15 min · con puntuación',

    // Form shell
    q_loading:           'Cargando…',
    q_step:              'Paso {n} de {total}',
    q_formTitleFisica:   'Planner in.curta — <em>Definición Física</em>',
    q_formTitleEmocional:'Planner in.curta — <em>Definición Emocional</em>',
    q_formSub:           'Antes de cambiar el cuerpo, necesitamos entender qué queremos sentir dentro de él.',
    q_sending:           'Enviando…',
    q_submitBtn:         'Enviar respuestas',
    q_alertFillNameEmail:'Por favor, completa al menos el nombre y el email antes de enviar.',
    q_alertSendError:    'Error al enviar: ',
    q_loadError:         'Error al cargar. Recarga la página.',
  },

};

// ─── Engine ────────────────────────────────────────────────────────
const STORAGE_KEY = 'incurta-lang';

function getLang() {
  return localStorage.getItem(STORAGE_KEY) || 'pt';
}

function t(key) {
  const lang = getLang();
  return (translations[lang] && translations[lang][key]) || translations['pt'][key] || key;
}

function applyTranslations(lang) {
  document.documentElement.lang = translations[lang].htmlLang;

  const titleKey = document.documentElement.dataset.titleKey || 'pageTitle';
  if (translations[lang][titleKey]) {
    document.title = translations[lang][titleKey];
  }

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key] !== undefined) {
      el.innerHTML = translations[lang][key];
    }
  });

  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (translations[lang][key] !== undefined) {
      el.placeholder = translations[lang][key];
    }
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

function setLang(lang) {
  if (!translations[lang]) return;
  localStorage.setItem(STORAGE_KEY, lang);
  applyTranslations(lang);
}

document.addEventListener('DOMContentLoaded', () => {
  applyTranslations(getLang());

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
});
