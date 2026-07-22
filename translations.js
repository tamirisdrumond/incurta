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

    // NAV
    navAbout:         'Sobre',
    navMethod:        'O Método',
    navProgram:       'Programa',
    navTestimonials:  'Depoimentos',
    navQuestionnaire: 'Questionário',
    navContact:       'Contato',

    // HERO
    heroLabel:   'Nutrição Clínica Comportamental',
    heroTitle:   'Seu cérebro aprende. Seus hábitos mudam.<br>Seu <em>corpo acompanha</em>.',
    heroSub:     'Uma metodologia que une neurociência, nutrição comportamental e psicologia positiva para ajudar mulheres a emagrecer com equilíbrio ou viver uma gestação mais saudável.',
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
    aboutQuote:  '"Criei o in.curta porque percebi que muitas mulheres enfrentam desafios diferentes, mas compartilham a mesma necessidade: aprender a cuidar da alimentação sem culpa, medo ou excesso de cobrança. Seja para emagrecer ou viver uma gestação mais saudável, acredito que mudanças duradouras começam com hábitos construídos de forma leve e consciente."',

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
    howIntroTitle1: 'IN.CURTA Emagrecimento',
    howIntroP1:     'Um programa de 3 meses, desenvolvido para que as mudanças no comportamento alimentar aconteçam de forma gradual. Durante esse período, trabalhamos o controle dos impulsos alimentares, a construção de hábitos e um plano nutricional personalizado para que os resultados sejam sustentáveis.',
    howIntroTitle2: 'IN.CURTA Gestante',
    howIntroP2:     'Cada gestação tem um começo diferente. Algumas mulheres iniciam o acompanhamento nas primeiras semanas, enquanto outras chegam mais tarde. Independentemente do momento em que você começar, estarei ao seu lado até o nascimento do bebê, adaptando a alimentação às necessidades de cada trimestre e acompanhando as mudanças do seu corpo e o desenvolvimento do seu bebê.',
    step1Num:   'Consulta Online',
    step1Title: 'Suporte Contínuo',
    step1Text:  'O cuidado não termina quando a consulta acaba. Você tem acesso ao suporte via chat para tirar dúvidas e receber orientação sempre que necessário durante o acompanhamento.',
    step2Num:   'Aplicativo',
    step2Title: 'Acompanhamento Diário',
    step2Text:  'Consulte o plano alimentar, receba notificações, registe peso e ingestão de água, atividade física, diário alimentar e esclareça dúvidas a qualquer momento.',
    step3Num:   'Planner',
    step3Title: 'Consolidar Hábitos',
    step3Text:  'Exercícios de nutrição comportamental, neurociência e psicologia positiva para lidar com os impulsos, desenvolver disciplina e consolidar hábitos saudáveis.',
    step4Num:   'Resultado',
    step4Title: 'Hábitos Definitivos',
    step4Text:  'Construa hábitos que acompanham você em todas as fases da vida. Com acompanhamento próximo e um plano personalizado, você conquista resultados duradouros, seja para emagrecer ou viver uma gestação mais saudável.',
    pillarTitle: 'O que está incluído no programa',
    pillarText:  'Cada etapa do IN.CURTA complementa a outra, criando uma jornada de acompanhamento, orientação e prática para que a mudança aconteça de forma consistente.',
    pillarEmagTitle: 'IN.CURTA Emagrecimento',
    pillarEmag1:  '6 consultas online ao vivo (1 a cada 15 dias)',
    pillarEmag2:  'Plano alimentar personalizado',
    pillarEmag3:  'Reprogramação de hábitos e comportamento alimentar',
    pillarEmag4:  'Planner com exercícios de neurociência e nutrição comportamental',
    pillarEmag5:  'Acompanhamento pelo aplicativo',
    pillarEmag6:  'Suporte via chat entre as consultas',
    pillarEmag7:  'Registro de refeições, peso, exercícios e ingestão de água',
    pillarEmag8:  'Lista de compras e receitas práticas',
    pillarEmag9:  'Estratégias para controlar impulsos e episódios de compulsão',
    pillarEmag10: 'Ajustes do plano conforme sua evolução',
    pillarGestTitle: 'IN.CURTA Gestante',
    pillarGest1:  'Consultas online mensais até o nascimento do bebê',
    pillarGest2:  'Plano alimentar personalizado para cada trimestre',
    pillarGest3:  'Entenda as mudanças hormonais e do seu corpo em cada fase',
    pillarGest4:  'Desmistificação dos principais mitos da gestação',
    pillarGest5:  'Orientações sobre sintomas comuns e como a alimentação pode ajudar',
    pillarGest6:  'Acompanhamento do desenvolvimento do bebê e das suas necessidades nutricionais',
    pillarGest7:  'Suplementação individualizada e interpretação dos exames',
    pillarGest8:  'Suporte via chat entre as consultas',
    pillarGest9:  'Planner exclusivo da gestante',
    pillarGest10: 'Aplicativo com registro da alimentação, hidratação e evolução',

    // PRICING
    pricingEmagLabel:      'IN.CURTA Emagrecimento',
    priceEmagFullValue:    '150€',
    priceEmagFullLabel:    'Investimento total — Pacote de 6 consultas',
    priceEmagInstallValue: '3x 60€',
    priceEmagInstallLabel: 'Pagamento facilitado',
    pricingGestLabel:      'IN.CURTA Gestante',
    pricingGestIntro:      'Você pode iniciar em qualquer tempo da gestação e renovar o acompanhamento conforme a necessidade.',
    priceGestFullValue:    '120€',
    priceGestFullLabel:    'Investimento à vista — Pacote de 3 consultas',
    priceGestInstallValue: '3x 50€',
    priceGestInstallLabel: 'Pagamento facilitado',
    pricingCurrencyNote:   'Preços em reais (R$) disponíveis mediante consulta.',

    // TESTIMONIALS
    testimonialsLabel: 'Depoimentos',
    testimonialsTitle: 'O que dizem <em>nossas clientes</em>',

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
    q_selectorTitle:    'Bem-vinda ao seu<br><em>espaço de autoconhecimento</em>',
    q_selectorSub:      'Suas respostas são confidenciais e serão analisadas antes da sua consulta.',
    q_backBtn:          '← Escolher outro questionário',
    q_successTitle:     'Obrigada por compartilhar!',
    q_successText:      'Suas respostas foram registradas com segurança. A Tamiris irá analisá-las antes da sua consulta e entrará em contato em breve.',
    q_successBackBtn:   'Preencher outro questionário',
  },

  // ─────────────────────────────────────────────────────────────────

  es: {
    htmlLang: 'es',

    pageTitle:   'In.curta · Tamiris Drumond · Nutrición Conductual',
    q_pageTitle: 'in.curta — Área del Cliente',

    navAbout:         'Sobre',
    navMethod:        'El Método',
    navProgram:       'Programa',
    navTestimonials:  'Testimonios',
    navQuestionnaire: 'Cuestionario',
    navContact:       'Contacto',

    heroLabel:   'Nutrición Clínica Conductual',
    heroTitle:   'Tu cerebro aprende. Tus hábitos cambian.<br>Tu <em>cuerpo acompaña</em>.',
    heroSub:     'Una metodología que une neurociencia, nutrición conductual y psicología positiva para ayudar a las mujeres a adelgazar con equilibrio o vivir un embarazo más saludable.',
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
    aboutQuote:  '"Creé in.curta porque me di cuenta de que muchas mujeres enfrentan desafíos diferentes, pero comparten la misma necesidad: aprender a cuidar la alimentación sin culpa, miedo o exceso de exigencia. Ya sea para adelgazar o vivir un embarazo más saludable, creo que los cambios duraderos comienzan con hábitos construidos de forma ligera y consciente."',

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
    howIntroTitle1: 'IN.CURTA Adelgazamiento',
    howIntroP1:     'Un programa de 3 meses, desarrollado para que los cambios en el comportamiento alimentario ocurran de forma gradual. Durante ese período, trabajamos el control de los impulsos alimentarios, la construcción de hábitos y un plan nutricional personalizado para que los resultados sean sostenibles.',
    howIntroTitle2: 'IN.CURTA Gestante',
    howIntroP2:     'Cada embarazo tiene un comienzo diferente. Algunas mujeres inician el seguimiento en las primeras semanas, mientras que otras llegan más tarde. Independientemente del momento en que empieces, estaré a tu lado hasta el nacimiento del bebé, adaptando la alimentación a las necesidades de cada trimestre y acompañando los cambios de tu cuerpo y el desarrollo de tu bebé.',
    step1Num:   'Consulta Online',
    step1Title: 'Soporte Continuo',
    step1Text:  'El cuidado no termina cuando la consulta acaba. Tienes acceso a soporte vía chat para resolver dudas y recibir orientación siempre que sea necesario durante el seguimiento.',
    step2Num:   'Aplicación',
    step2Title: 'Seguimiento Diario',
    step2Text:  'Consulta el plan alimentario, recibe notificaciones, registra peso e ingesta de agua, actividad física, diario alimentario y resuelve dudas en cualquier momento.',
    step3Num:   'Planner',
    step3Title: 'Consolidar Hábitos',
    step3Text:  'Ejercicios de nutrición conductual, neurociencia y psicología positiva para manejar los impulsos, desarrollar disciplina y consolidar hábitos saludables.',
    step4Num:   'Resultado',
    step4Title: 'Hábitos Definitivos',
    step4Text:  'Construye hábitos que te acompañen en todas las etapas de la vida. Con un seguimiento cercano y un plan personalizado, consigues resultados duraderos, ya sea para adelgazar o vivir un embarazo más saludable.',
    pillarTitle: 'Qué está incluido en el programa',
    pillarText:  'Cada etapa de IN.CURTA complementa a la otra, creando un recorrido de seguimiento, orientación y práctica para que el cambio ocurra de forma consistente.',
    pillarEmagTitle: 'IN.CURTA Adelgazamiento',
    pillarEmag1:  '6 consultas online en vivo (1 cada 15 días)',
    pillarEmag2:  'Plan alimentario personalizado',
    pillarEmag3:  'Reprogramación de hábitos y comportamiento alimentario',
    pillarEmag4:  'Planner con ejercicios de neurociencia y nutrición conductual',
    pillarEmag5:  'Seguimiento por la aplicación',
    pillarEmag6:  'Soporte vía chat entre las consultas',
    pillarEmag7:  'Registro de comidas, peso, ejercicios e ingesta de agua',
    pillarEmag8:  'Lista de compras y recetas prácticas',
    pillarEmag9:  'Estrategias para controlar impulsos y episodios de atracón',
    pillarEmag10: 'Ajustes del plan según tu evolución',
    pillarGestTitle: 'IN.CURTA Gestante',
    pillarGest1:  'Consultas online mensuales hasta el nacimiento del bebé',
    pillarGest2:  'Plan alimentario personalizado para cada trimestre',
    pillarGest3:  'Entiende los cambios hormonales y de tu cuerpo en cada etapa',
    pillarGest4:  'Desmitificación de los principales mitos del embarazo',
    pillarGest5:  'Orientaciones sobre síntomas comunes y cómo la alimentación puede ayudar',
    pillarGest6:  'Seguimiento del desarrollo del bebé y de tus necesidades nutricionales',
    pillarGest7:  'Suplementación individualizada e interpretación de análisis',
    pillarGest8:  'Soporte vía chat entre las consultas',
    pillarGest9:  'Planner exclusivo para la gestante',
    pillarGest10: 'Aplicación con registro de la alimentación, hidratación y evolución',

    // PRICING
    pricingEmagLabel:      'IN.CURTA Adelgazamiento',
    priceEmagFullValue:    '150€',
    priceEmagFullLabel:    'Pago — Paquete de 6 consultas',
    priceEmagInstallValue: '3x 60€',
    priceEmagInstallLabel: 'Pago facilitado',
    pricingGestLabel:      'IN.CURTA Gestante',
    pricingGestIntro:      'Puedes empezar en cualquier momento del embarazo y renovar el seguimiento según la necesidad.',
    priceGestFullValue:    '120€',
    priceGestFullLabel:    'Pago — Paquete de 3 consultas',
    priceGestInstallValue: '3x 50€',
    priceGestInstallLabel: 'Pago facilitado',
    pricingCurrencyNote:   'Precios en reales brasileños (R$) disponibles a solicitud.',

    // TESTIMONIALS
    testimonialsLabel: 'Testimonios',
    testimonialsTitle: 'Lo que dicen <em>nuestras clientas</em>',

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
    q_selectorTitle:    'Bienvenida a tu<br><em>espacio de autoconocimiento</em>',
    q_selectorSub:      'Tus respuestas son confidenciales y serán analizadas antes de tu consulta.',
    q_backBtn:          '← Elegir otro cuestionario',
    q_successTitle:     '¡Gracias por compartir!',
    q_successText:      'Tus respuestas han sido registradas de forma segura. Tamiris las analizará antes de tu consulta y se pondrá en contacto pronto.',
    q_successBackBtn:   'Rellenar otro cuestionario',
  },

};

// ─── Engine ────────────────────────────────────────────────────────
// Reads / writes the chosen language to localStorage so the choice
// persists across all pages of the site.

const STORAGE_KEY = 'incurta-lang';

/** Returns the active language code ('pt' | 'es'). */
function getLang() {
  return localStorage.getItem(STORAGE_KEY) || 'pt';
}

/** Returns the translated string for `key` in the active language. */
function t(key) {
  const lang = getLang();
  return (translations[lang] && translations[lang][key]) || translations['pt'][key] || key;
}

/** Applies all translations to the DOM and updates the toggle buttons. */
function applyTranslations(lang) {
  // Update <html lang>
  document.documentElement.lang = translations[lang].htmlLang;

  // Update <title> — uses data-title-key on <html> if present, else falls back to pageTitle
  const titleKey = document.documentElement.dataset.titleKey || 'pageTitle';
  if (translations[lang][titleKey]) {
    document.title = translations[lang][titleKey];
  }

  // Update all elements with data-i18n (innerHTML — supports <em>, <br>, etc.)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key] !== undefined) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Update placeholders (data-i18n-ph)
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (translations[lang][key] !== undefined) {
      el.placeholder = translations[lang][key];
    }
  });

  // Highlight the active lang button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

/** Called by the PT / ES toggle buttons. */
function setLang(lang) {
  if (!translations[lang]) return;
  localStorage.setItem(STORAGE_KEY, lang);
  applyTranslations(lang);
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations(getLang());

  // Wire up the toggle buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
});
