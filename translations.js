// 多语言翻译数据
const translations = {
  zh: {
    nav: { home: "首页", courses: "课程中心", practice: "练习与题库", mistakes: "错题本", exam: "模拟考试", stats: "学习统计", profile: "个人中心", about: "关于/帮助/反馈" },
    home: {
      hero: { title: "开启个性化学习新篇章", subtitle: "系统化课程、海量题库、智能错题本，陪伴你的每一步成长。", cta: "立即探索课程" },
      slideshow: { slide1: "海量学习资源", slide2: "互动学习社区", slide3: "在线名师辅导", slide4: "系统化课程体系", slide5: "项目式学习方法" },
      features: { title: "我们的优势" }
    },
    stages: { primary: "小学", junior: "初中", senior: "高中" },
    subjects: { chinese: "语文", math: "数学", english: "英语", physics: "物理", chemistry: "化学", biology: "生物", history: "历史", geography: "地理", politics: "政治" },
    courses: {
      primary: [
        { subject: 'chinese', name: '拼音与识字', desc: '掌握汉语拼音，提升识字能力。', progress: 80 },
        { subject: 'chinese', name: '课文阅读与写作', desc: '培养阅读理解与基础写作能力。', progress: 60 },
        { subject: 'math', name: '基础加减法', desc: '熟练掌握20以内加减法。', progress: 90 },
        { subject: 'math', name: '图形与空间', desc: '认识常见图形，初步空间感知。', progress: 50 },
        { subject: 'english', name: '字母与单词', desc: '学习26个字母和常用单词。', progress: 70 },
        { subject: 'english', name: '简单对话', desc: '掌握日常英语问候与交流。', progress: 40 }
      ],
      junior: [
        { subject: 'chinese', name: '文言文基础', desc: '掌握基础文言实词和虚词。', progress: 75 },
        { subject: 'chinese', name: '现代文阅读', desc: '提高文学作品赏析能力。', progress: 65 },
        { subject: 'math', name: '代数基础', desc: '掌握一元二次方程的解法。', progress: 85 },
        { subject: 'math', name: '几何证明', desc: '学习平面几何基本定理与证明。', progress: 55 },
        { subject: 'english', name: '语法进阶', desc: '掌握各种时态和语态。', progress: 70 },
        { subject: 'english', name: '阅读理解', desc: '提高英语文章阅读能力。', progress: 60 },
        { subject: 'physics', name: '力学基础', desc: '学习牛顿运动定律。', progress: 80 },
        { subject: 'physics', name: '电学入门', desc: '认识电路和欧姆定律。', progress: 45 },
        { subject: 'chemistry', name: '物质构成', desc: '了解原子结构和化学键。', progress: 65 },
        { subject: 'chemistry', name: '化学反应', desc: '掌握基本的化学方程式。', progress: 55 },
        { subject: 'biology', name: '生命活动', desc: '了解细胞和人体系统。', progress: 75 },
        { subject: 'biology', name: '生态环境', desc: '认识生态系统与环境保护。', progress: 70 },
        { subject: 'history', name: '中国古代史', desc: '了解中国古代重要历史事件。', progress: 80 },
        { subject: 'history', name: '近现代史', desc: '学习近现代重要历史时期。', progress: 60 },
        { subject: 'geography', name: '地理基础', desc: '掌握地理基本知识。', progress: 85 },
        { subject: 'geography', name: '世界地理', desc: '了解世界各地区地理特征。', progress: 50 }
      ],
      senior: [
        { subject: 'chinese', name: '古代诗歌鉴赏', desc: '深入理解唐诗宋词的艺术魅力。', progress: 78 },
        { subject: 'chinese', name: '议论文写作进阶', desc: '掌握高级论证结构与写作技巧。', progress: 68 },
        { subject: 'math', name: '函数与导数', desc: '掌握复杂函数的性质与应用。', progress: 88 },
        { subject: 'math', name: '立体几何', desc: '解析空间几何问题。', progress: 62 },
        { subject: 'english', name: '完形填空与阅读', desc: '提升高级英语阅读和完形填空能力。', progress: 75 },
        { subject: 'english', name: '高级写作', desc: '学习不同体裁的英语写作。', progress: 58 },
        { subject: 'physics', name: '电磁学', desc: '深入研究电场、磁场与电磁感应。', progress: 70 },
        { subject: 'physics', name: '热力学', desc: '理解热力学定律与能量转换。', progress: 50 },
        { subject: 'chemistry', name: '有机化学', desc: '系统学习有机物的结构、性质与反应。', progress: 65 },
        { subject: 'chemistry', name: '化学反应原理', desc: '探究化学反应速率与化学平衡。', progress: 59 },
        { subject: 'biology', name: '遗传与进化', desc: '掌握遗传定律和生物进化理论。', progress: 82 },
        { subject: 'biology', name: '稳态与调节', desc: '研究生命活动的调节机制。', progress: 71 },
        { subject: 'history', name: '世界现代史', desc: '了解两次世界大战以来的历史进程。', progress: 85 },
        { subject: 'history', name: '文化史专题', desc: '探究中外思想文化发展史。', progress: 66 },
        { subject: 'geography', name: '区域地理', desc: '系统分析典型区域的地理特征。', progress: 80 },
        { subject: 'geography', name: '自然灾害', desc: '学习自然灾害的成因与防治。', progress: 55 },
        { subject: 'politics', name: '经济与生活', desc: '理解市场经济与国家宏观调控。', progress: 77 },
        { subject: 'politics', name: '哲学与生活', desc: '学习唯物论、辩证法和认识论。', progress: 63 }
      ]
    },
    common: { all: "全部", searchPlaceholder: "搜索课程名称...", noCoursesFound: "未找到匹配的课程", noSubjectCourses: "暂无该学科课程", learningProgress: "学习进度", sortByHot: "按热度", sortByNew: "按最新", filterAndSearch: "筛选与搜索" }
  },
  
  en: {
    nav: { home: "Home", courses: "Courses", practice: "Practice & Questions", mistakes: "Mistakes", exam: "Mock Exam", stats: "Learning Stats", profile: "Profile", about: "About/Help/Feedback" },
    home: {
      hero: { title: "Start Your Personalized Learning Journey", subtitle: "Systematic courses, massive question banks, intelligent mistake tracking - accompanying every step of your growth.", cta: "Explore Courses Now" },
      slideshow: { slide1: "Massive Learning Resources", slide2: "Interactive Learning Community", slide3: "Online Expert Tutoring", slide4: "Systematic Course System", slide5: "Project-Based Learning Methods" },
      features: { title: "Our Advantages" }
    },
    stages: { primary: "Primary", junior: "Junior High", senior: "Senior High" },
    subjects: { chinese: "Chinese", math: "Mathematics", english: "English", physics: "Physics", chemistry: "Chemistry", biology: "Biology", history: "History", geography: "Geography", politics: "Politics" },
    courses: {
      primary: [
        { subject: 'chinese', name: 'Pinyin and Character Recognition', desc: 'Master Chinese pinyin and improve character recognition skills.', progress: 80 },
        { subject: 'chinese', name: 'Text Reading and Writing', desc: 'Develop reading comprehension and basic writing skills.', progress: 60 },
        { subject: 'math', name: 'Basic Addition and Subtraction', desc: 'Master addition and subtraction within 20.', progress: 90 },
        { subject: 'math', name: 'Shapes and Space', desc: 'Recognize common shapes and develop spatial awareness.', progress: 50 },
        { subject: 'english', name: 'Letters and Words', desc: 'Learn 26 letters and common words.', progress: 70 },
        { subject: 'english', name: 'Simple Conversations', desc: 'Master daily English greetings and communication.', progress: 40 }
      ],
      junior: [
        { subject: 'chinese', name: 'Classical Chinese Basics', desc: 'Master basic classical Chinese content words and function words.', progress: 75 },
        { subject: 'chinese', name: 'Modern Literature Reading', desc: 'Improve literary appreciation abilities.', progress: 65 },
        { subject: 'math', name: 'Algebra Basics', desc: 'Master solving quadratic equations.', progress: 85 },
        { subject: 'math', name: 'Geometric Proofs', desc: 'Learn basic plane geometry theorems and proofs.', progress: 55 },
        { subject: 'english', name: 'Advanced Grammar', desc: 'Master various tenses and voices.', progress: 70 },
        { subject: 'english', name: 'Reading Comprehension', desc: 'Improve English article reading abilities.', progress: 60 },
        { subject: 'physics', name: 'Mechanics Basics', desc: 'Learn Newton\'s laws of motion.', progress: 80 },
        { subject: 'physics', name: 'Electricity Introduction', desc: 'Understand circuits and Ohm\'s law.', progress: 45 },
        { subject: 'chemistry', name: 'Matter Composition', desc: 'Understand atomic structure and chemical bonds.', progress: 65 },
        { subject: 'chemistry', name: 'Chemical Reactions', desc: 'Master basic chemical equations.', progress: 55 },
        { subject: 'biology', name: 'Life Activities', desc: 'Understand cells and human body systems.', progress: 75 },
        { subject: 'biology', name: 'Ecological Environment', desc: 'Understand ecosystems and environmental protection.', progress: 70 },
        { subject: 'history', name: 'Ancient Chinese History', desc: 'Understand important historical events in ancient China.', progress: 80 },
        { subject: 'history', name: 'Modern History', desc: 'Learn important historical periods in modern times.', progress: 60 },
        { subject: 'geography', name: 'Geography Basics', desc: 'Master basic geographical knowledge.', progress: 85 },
        { subject: 'geography', name: 'World Geography', desc: 'Understand geographical features of world regions.', progress: 50 }
      ],
      senior: [
        { subject: 'chinese', name: 'Ancient Poetry Appreciation', desc: 'Deeply understand the artistic charm of Tang and Song poetry.', progress: 78 },
        { subject: 'chinese', name: 'Advanced Argumentative Writing', desc: 'Master advanced argumentative structures and writing techniques.', progress: 68 },
        { subject: 'math', name: 'Functions and Derivatives', desc: 'Master properties and applications of complex functions.', progress: 88 },
        { subject: 'math', name: 'Solid Geometry', desc: 'Analyze spatial geometry problems.', progress: 62 },
        { subject: 'english', name: 'Cloze and Reading', desc: 'Improve advanced English reading and cloze abilities.', progress: 75 },
        { subject: 'english', name: 'Advanced Writing', desc: 'Learn different genres of English writing.', progress: 58 },
        { subject: 'physics', name: 'Electromagnetism', desc: 'In-depth study of electric fields, magnetic fields, and electromagnetic induction.', progress: 70 },
        { subject: 'physics', name: 'Thermodynamics', desc: 'Understand thermodynamic laws and energy conversion.', progress: 50 },
        { subject: 'chemistry', name: 'Organic Chemistry', desc: 'Systematically learn structure, properties, and reactions of organic compounds.', progress: 65 },
        { subject: 'chemistry', name: 'Chemical Reaction Principles', desc: 'Explore chemical reaction rates and chemical equilibrium.', progress: 59 },
        { subject: 'biology', name: 'Genetics and Evolution', desc: 'Master genetic laws and biological evolution theory.', progress: 82 },
        { subject: 'biology', name: 'Homeostasis and Regulation', desc: 'Study regulatory mechanisms of life activities.', progress: 71 },
        { subject: 'history', name: 'Modern World History', desc: 'Understand historical processes since the two world wars.', progress: 85 },
        { subject: 'history', name: 'Cultural History Topics', desc: 'Explore the development history of Chinese and foreign thought and culture.', progress: 66 },
        { subject: 'geography', name: 'Regional Geography', desc: 'Systematically analyze geographical features of typical regions.', progress: 80 },
        { subject: 'geography', name: 'Natural Disasters', desc: 'Learn causes and prevention of natural disasters.', progress: 55 },
        { subject: 'politics', name: 'Economy and Life', desc: 'Understand market economy and national macro-control.', progress: 77 },
        { subject: 'politics', name: 'Philosophy and Life', desc: 'Learn materialism, dialectics, and epistemology.', progress: 63 }
      ]
    },
    common: { all: "All", searchPlaceholder: "Search course names...", noCoursesFound: "No matching courses found", noSubjectCourses: "No courses available for this subject", learningProgress: "Learning Progress", sortByHot: "By Popularity", sortByNew: "By Latest", filterAndSearch: "Filter & Search" }
  },
  
  es: {
    nav: { home: "Inicio", courses: "Cursos", practice: "Práctica y Preguntas", mistakes: "Errores", exam: "Examen Simulado", stats: "Estadísticas de Aprendizaje", profile: "Perfil", about: "Acerca de/Ayuda/Comentarios" },
    home: {
      hero: { title: "Inicia Tu Viaje de Aprendizaje Personalizado", subtitle: "Cursos sistemáticos, bancos masivos de preguntas, seguimiento inteligente de errores - acompañando cada paso de tu crecimiento.", cta: "Explorar Cursos Ahora" },
      slideshow: { slide1: "Recursos Masivos de Aprendizaje", slide2: "Comunidad Interactiva de Aprendizaje", slide3: "Tutoría en Línea de Expertos", slide4: "Sistema de Cursos Sistemáticos", slide5: "Métodos de Aprendizaje Basado en Proyectos" },
      features: { title: "Nuestras Ventajas" }
    },
    stages: { primary: "Primaria", junior: "Secundaria", senior: "Preparatoria" },
    subjects: { chinese: "Chino", math: "Matemáticas", english: "Inglés", physics: "Física", chemistry: "Química", biology: "Biología", history: "Historia", geography: "Geografía", politics: "Política" },
    courses: {
      primary: [
        { subject: 'chinese', name: 'Pinyin y Reconocimiento de Caracteres', desc: 'Dominar el pinyin chino y mejorar las habilidades de reconocimiento de caracteres.', progress: 80 },
        { subject: 'chinese', name: 'Lectura y Escritura de Textos', desc: 'Desarrollar comprensión lectora y habilidades básicas de escritura.', progress: 60 },
        { subject: 'math', name: 'Suma y Resta Básica', desc: 'Dominar suma y resta dentro de 20.', progress: 90 },
        { subject: 'math', name: 'Formas y Espacio', desc: 'Reconocer formas comunes y desarrollar conciencia espacial.', progress: 50 },
        { subject: 'english', name: 'Letras y Palabras', desc: 'Aprender 26 letras y palabras comunes.', progress: 70 },
        { subject: 'english', name: 'Conversaciones Simples', desc: 'Dominar saludos diarios en inglés y comunicación.', progress: 40 }
      ],
      junior: [
        { subject: 'chinese', name: 'Fundamentos de Chino Clásico', desc: 'Dominar palabras de contenido y palabras funcionales básicas del chino clásico.', progress: 75 },
        { subject: 'chinese', name: 'Lectura de Literatura Moderna', desc: 'Mejorar habilidades de apreciación literaria.', progress: 65 },
        { subject: 'math', name: 'Fundamentos de Álgebra', desc: 'Dominar la resolución de ecuaciones cuadráticas.', progress: 85 },
        { subject: 'math', name: 'Demostraciones Geométricas', desc: 'Aprender teoremas básicos de geometría plana y demostraciones.', progress: 55 },
        { subject: 'english', name: 'Gramática Avanzada', desc: 'Dominar varios tiempos y voces.', progress: 70 },
        { subject: 'english', name: 'Comprensión Lectora', desc: 'Mejorar habilidades de lectura de artículos en inglés.', progress: 60 },
        { subject: 'physics', name: 'Fundamentos de Mecánica', desc: 'Aprender las leyes del movimiento de Newton.', progress: 80 },
        { subject: 'physics', name: 'Introducción a la Electricidad', desc: 'Entender circuitos y la ley de Ohm.', progress: 45 },
        { subject: 'chemistry', name: 'Composición de la Materia', desc: 'Entender estructura atómica y enlaces químicos.', progress: 65 },
        { subject: 'chemistry', name: 'Reacciones Químicas', desc: 'Dominar ecuaciones químicas básicas.', progress: 55 },
        { subject: 'biology', name: 'Actividades de la Vida', desc: 'Entender células y sistemas del cuerpo humano.', progress: 75 },
        { subject: 'biology', name: 'Medio Ambiente Ecológico', desc: 'Entender ecosistemas y protección ambiental.', progress: 70 },
        { subject: 'history', name: 'Historia Antigua de China', desc: 'Entender eventos históricos importantes en la China antigua.', progress: 80 },
        { subject: 'history', name: 'Historia Moderna', desc: 'Aprender períodos históricos importantes en tiempos modernos.', progress: 60 },
        { subject: 'geography', name: 'Fundamentos de Geografía', desc: 'Dominar conocimientos geográficos básicos.', progress: 85 },
        { subject: 'geography', name: 'Geografía Mundial', desc: 'Entender características geográficas de regiones del mundo.', progress: 50 }
      ],
      senior: [
        { subject: 'chinese', name: 'Apreciación de Poesía Antigua', desc: 'Entender profundamente el encanto artístico de la poesía Tang y Song.', progress: 78 },
        { subject: 'chinese', name: 'Escritura Argumentativa Avanzada', desc: 'Dominar estructuras argumentativas avanzadas y técnicas de escritura.', progress: 68 },
        { subject: 'math', name: 'Funciones y Derivadas', desc: 'Dominar propiedades y aplicaciones de funciones complejas.', progress: 88 },
        { subject: 'math', name: 'Geometría Sólida', desc: 'Analizar problemas de geometría espacial.', progress: 62 },
        { subject: 'english', name: 'Cloze y Lectura', desc: 'Mejorar habilidades avanzadas de lectura y cloze en inglés.', progress: 75 },
        { subject: 'english', name: 'Escritura Avanzada', desc: 'Aprender diferentes géneros de escritura en inglés.', progress: 58 },
        { subject: 'physics', name: 'Electromagnetismo', desc: 'Estudio en profundidad de campos eléctricos, campos magnéticos e inducción electromagnética.', progress: 70 },
        { subject: 'physics', name: 'Termodinámica', desc: 'Entender leyes termodinámicas y conversión de energía.', progress: 50 },
        { subject: 'chemistry', name: 'Química Orgánica', desc: 'Aprender sistemáticamente estructura, propiedades y reacciones de compuestos orgánicos.', progress: 65 },
        { subject: 'chemistry', name: 'Principios de Reacción Química', desc: 'Explorar tasas de reacción química y equilibrio químico.', progress: 59 },
        { subject: 'biology', name: 'Genética y Evolución', desc: 'Dominar leyes genéticas y teoría de evolución biológica.', progress: 82 },
        { subject: 'biology', name: 'Homeostasis y Regulación', desc: 'Estudiar mecanismos regulatorios de actividades de la vida.', progress: 71 },
        { subject: 'history', name: 'Historia Mundial Moderna', desc: 'Entender procesos históricos desde las dos guerras mundiales.', progress: 85 },
        { subject: 'history', name: 'Temas de Historia Cultural', desc: 'Explorar la historia del desarrollo del pensamiento y cultura chinos y extranjeros.', progress: 66 },
        { subject: 'geography', name: 'Geografía Regional', desc: 'Analizar sistemáticamente características geográficas de regiones típicas.', progress: 80 },
        { subject: 'geography', name: 'Desastres Naturales', desc: 'Aprender causas y prevención de desastres naturales.', progress: 55 },
        { subject: 'politics', name: 'Economía y Vida', desc: 'Entender economía de mercado y control macro nacional.', progress: 77 },
        { subject: 'politics', name: 'Filosofía y Vida', desc: 'Aprender materialismo, dialéctica y epistemología.', progress: 63 }
      ]
    },
    common: { all: "Todos", searchPlaceholder: "Buscar nombres de cursos...", noCoursesFound: "No se encontraron cursos coincidentes", noSubjectCourses: "No hay cursos disponibles para esta materia", learningProgress: "Progreso de Aprendizaje", sortByHot: "Por Popularidad", sortByNew: "Por Más Reciente", filterAndSearch: "Filtrar y Buscar" }
  }
}; 