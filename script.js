document.addEventListener('DOMContentLoaded', () => {

  // ========== 0. 多语言支持 ==========
  
  // 当前语言设置
  let currentLanguage = 'zh';
  
  // 获取翻译文本的函数
  function t(key) {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        // 如果找不到翻译，返回中文作为默认值
        value = translations.zh;
        for (const k2 of keys) {
          if (value && value[k2]) {
            value = value[k2];
          } else {
            return key; // 如果连中文都没有，返回键名
          }
        }
        break;
      }
    }
    return value;
  }
  
  // 更新页面语言
  function updateLanguage(lang) {
    currentLanguage = lang;
    
    // 更新导航栏文本
    document.querySelectorAll('.nav-item').forEach((item, index) => {
      const keys = ['home', 'courses', 'practice', 'mistakes', 'exam', 'stats', 'profile', 'about'];
      if (keys[index]) {
        item.textContent = t(`nav.${keys[index]}`);
      }
    });
    
    // 更新首页内容
    updateHomeContent();
    
    // 更新课程中心内容
    updateCoursesContent();
    
    // 更新学段页面内容
    updateStagePages();
    
    // 保存语言设置到本地存储
    localStorage.setItem('preferredLanguage', lang);
  }
  
  // 更新首页内容
  function updateHomeContent() {
    // 更新Hero区域
    const heroTitle = document.querySelector('.hero-content h1');
    const heroSubtitle = document.querySelector('.hero-content p');
    const heroCta = document.getElementById('hero-cta-btn');
    
    if (heroTitle) heroTitle.textContent = t('home.hero.title');
    if (heroSubtitle) heroSubtitle.textContent = t('home.hero.subtitle');
    if (heroCta) heroCta.textContent = t('home.hero.cta');
    
    // 更新轮播图文本
    const slideTexts = document.querySelectorAll('.slide-text');
    slideTexts.forEach((text, index) => {
      const keys = ['slide1', 'slide2', 'slide3', 'slide4', 'slide5'];
      if (keys[index]) {
        text.textContent = t(`home.slideshow.${keys[index]}`);
      }
    });
    
    // 更新特色区域
    const featuresTitle = document.querySelector('.features-section h2');
    if (featuresTitle) featuresTitle.textContent = t('home.features.title');
  }
  
  // 更新课程中心内容
  function updateCoursesContent() {
    // 更新搜索框占位符
    const searchInput = document.getElementById('course-search-input');
    if (searchInput) searchInput.placeholder = t('common.searchPlaceholder');
    
    // 更新筛选器文本
    const filterTitle = document.querySelector('.courses-sidebar h3');
    if (filterTitle) filterTitle.textContent = t('common.filterAndSearch');
    
    // 更新学段筛选器
    const stageLabels = document.querySelectorAll('#stage-filter-list .filter-btn');
    stageLabels.forEach(btn => {
      const stage = btn.dataset.stage;
      if (stage === 'all') {
        btn.textContent = t('common.all');
      } else {
        btn.textContent = t(`stages.${stage}`);
      }
    });
    
    // 更新排序选项
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.innerHTML = `
        <option value="hot">${t('common.sortByHot')}</option>
        <option value="new">${t('common.sortByNew')}</option>
      `;
    }
  }
  
  // 更新学段页面内容
  function updateStagePages() {
    // 更新小学页面
    const primaryTitle = document.querySelector('#primary-section h2');
    if (primaryTitle) primaryTitle.textContent = t('stages.primary');
    
    // 更新初中页面
    const juniorTitle = document.querySelector('#junior-section h2');
    if (juniorTitle) juniorTitle.textContent = t('stages.junior');
    
    // 更新高中页面
    const seniorTitle = document.querySelector('#senior-section h2');
    if (seniorTitle) seniorTitle.textContent = t('stages.senior');
    
    // 更新学科按钮
    updateSubjectButtons();
  }
  
  // 更新学科按钮
  function updateSubjectButtons() {
    document.querySelectorAll('.stage-subject-btn').forEach(btn => {
      const subject = btn.dataset.subject;
      if (subject) {
        btn.textContent = t(`subjects.${subject}`);
      }
    });
  }
  
  // 语言切换器事件监听
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.dataset.lang;
      
      // 更新按钮状态
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // 更新语言
      updateLanguage(lang);
    });
  });
  
  // 初始化语言设置
  const savedLanguage = localStorage.getItem('preferredLanguage');
  if (savedLanguage && translations[savedLanguage]) {
    currentLanguage = savedLanguage;
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.lang === savedLanguage) {
        btn.classList.add('active');
      }
    });
  }

  // ========== 1. 页面切换核心逻辑 ==========
  
  // 页面区域ID
  const pageSections = {
    home: document.getElementById('home-section'),
    primary: document.getElementById('primary-section'),
    junior: document.getElementById('junior-section'),
    senior: document.getElementById('senior-section'),
    courses: document.getElementById('courses-section'),
  };

  // 导航栏切换
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
      // 高亮当前导航
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
      this.classList.add('active');
      
      const page = this.getAttribute('data-page');

      // 隐藏所有页面，只显示当前页
      Object.keys(pageSections).forEach(key => {
        const section = pageSections[key];
        if(section) section.style.display = 'none';
      });

      if (page === 'home' && pageSections.home) {
        pageSections.home.style.display = '';
      } else if (page === 'courses' && pageSections.courses) {
        pageSections.courses.style.display = '';
        initializeCoursesPage(); // 初始化课程中心页面
      }
    });
  });

  // ========== 2. 首页交互 (轮播和CTA) ==========

  const slideshowContainer = document.querySelector("#home-section .slideshow-container");
  const slidesWrapper = document.querySelector("#home-section .slides-wrapper");
  const slides = document.querySelectorAll("#home-section .slide");
  const dots = document.querySelectorAll("#home-section .dot");
  const prevBtn = document.querySelector("#home-section .prev");
  const nextBtn = document.querySelector("#home-section .next");
  
  let slideIndex = 0;
  let slideInterval;

  function updateSlidePosition() {
    if (!slidesWrapper || !slideshowContainer) return;
    const slideWidth = slideshowContainer.offsetWidth; // 获取容器的实际像素宽度
    slidesWrapper.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
    
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[slideIndex]) {
      dots[slideIndex].classList.add('active');
    }
  }

  function moveToNextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    updateSlidePosition();
  }

  function moveToPrevSlide() {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    updateSlidePosition();
  }

  function startSlideshow() {
    if (!slidesWrapper) return;
    stopSlideshow(); // 确保没有重复的计时器
    slideInterval = setInterval(moveToNextSlide, 5000); // 自动播放，间隔5秒
  }

  function stopSlideshow() {
    clearInterval(slideInterval);
  }
  
  if (slides.length > 0) {
    // 绑定事件
    nextBtn.addEventListener('click', () => {
      moveToNextSlide();
      stopSlideshow();
    });

    prevBtn.addEventListener('click', () => {
      moveToPrevSlide();
      stopSlideshow();
    });

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        slideIndex = index;
        updateSlidePosition();
        stopSlideshow();
      });
    });
    
    slideshowContainer.addEventListener('mouseenter', stopSlideshow);
    slideshowContainer.addEventListener('mouseleave', startSlideshow);

    // 监听窗口大小变化
    window.addEventListener('resize', updateSlidePosition);
    
    // 初始化
    updateSlidePosition();
    startSlideshow();
  }

  const heroCtaBtn = document.getElementById('hero-cta-btn');
  if (heroCtaBtn) {
    heroCtaBtn.addEventListener('click', () => {
      // 切换到课程中心
      if(pageSections.home) pageSections.home.style.display = 'none';
      if(pageSections.courses) pageSections.courses.style.display = '';
      initializeCoursesPage();

      // 同时高亮导航栏的"课程中心"
      document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-page') === 'courses') {
          item.classList.add('active');
        }
      });
       // 停止轮播
      stopSlideshow();
    });
  }

  // ========== 3. 首页学段选择交互 ==========
  
  const stageBtns = document.querySelectorAll('.stage-btn');
  stageBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      stageBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const stage = this.getAttribute('data-stage');
      if (stage === 'primary') {
        // 隐藏首页，显示小学页面
        if(pageSections.home) pageSections.home.style.display = 'none';
        if(pageSections.primary) pageSections.primary.style.display = '';
        
        // 默认显示语文学科
        renderPrimaryCourses('chinese');
        // 高亮第一个学科按钮
        const subjectBtns = document.querySelectorAll('#primary-section .stage-subject-btn');
        if (subjectBtns.length > 0) {
          subjectBtns.forEach(b => b.classList.remove('active'));
          subjectBtns[0].classList.add('active');
        }
      } else if (stage === 'junior') {
        // 隐藏首页，显示初中页面
        if(pageSections.home) pageSections.home.style.display = 'none';
        if(pageSections.junior) pageSections.junior.style.display = '';
        
        // 默认显示语文学科
        renderJuniorCourses('chinese');
        // 高亮第一个学科按钮
        const subjectBtns = document.querySelectorAll('#junior-section .stage-subject-btn');
        if (subjectBtns.length > 0) {
          subjectBtns.forEach(b => b.classList.remove('active'));
          subjectBtns[0].classList.add('active');
        }
      } else if (stage === 'senior') {
        // 隐藏首页，显示高中页面
        if(pageSections.home) pageSections.home.style.display = 'none';
        if(pageSections.senior) pageSections.senior.style.display = '';
        
        // 默认显示语文学科
        renderSeniorCourses('chinese');
        // 高亮第一个学科按钮
        const subjectBtns = document.querySelectorAll('#senior-section .stage-subject-btn');
        if (subjectBtns.length > 0) {
          subjectBtns.forEach(b => b.classList.remove('active'));
          subjectBtns[0].classList.add('active');
        }
      }
    });
  });

  // ========== 4. 小学页面交互与课程渲染 ==========
  
  // 获取当前语言的课程数据
  function getCoursesByStage(stage) {
    return translations[currentLanguage].courses[stage] || [];
  }
  
  // 渲染小学课程卡片
  function renderPrimaryCourses(subject) {
    const list = document.getElementById('primary-course-list');
    if (!list) return; // 防御式编程
    
    list.innerHTML = '';
    const courses = getCoursesByStage('primary');
    const filtered = courses.filter(c => c.subject === subject);
    
    if (filtered.length === 0) {
      list.innerHTML = `<div style="padding:32px;color:#888;">${t('common.noSubjectCourses')}</div>`;
      return;
    }
    
    filtered.forEach(course => {
      const card = document.createElement('div');
      card.className = 'stage-course-card';
      card.innerHTML = `
        <div class="course-title">${course.name}</div>
        <div class="course-desc">${course.desc}</div>
        <div class="course-progress">${t('common.learningProgress')}：${course.progress}%</div>
        <div class="course-progress-bar"><div class="course-progress-inner" style="width:${course.progress}%;"></div></div>
      `;
      list.appendChild(card);
    });
  }

  // ========== 5. 初中页面交互与课程渲染 ==========
  
  // 渲染初中课程卡片
  function renderJuniorCourses(subject) {
    const list = document.getElementById('junior-course-list');
    if (!list) return; // 防御式编程
    
    list.innerHTML = '';
    const courses = getCoursesByStage('junior');
    const filtered = courses.filter(c => c.subject === subject);
    
    if (filtered.length === 0) {
      list.innerHTML = `<div style="padding:32px;color:#888;">${t('common.noSubjectCourses')}</div>`;
      return;
    }
    
    filtered.forEach(course => {
      const card = document.createElement('div');
      card.className = 'stage-course-card';
      card.innerHTML = `
        <div class="course-title">${course.name}</div>
        <div class="course-desc">${course.desc}</div>
        <div class="course-progress">${t('common.learningProgress')}：${course.progress}%</div>
        <div class="course-progress-bar"><div class="course-progress-inner" style="width:${course.progress}%;"></div></div>
      `;
      list.appendChild(card);
    });
  }

  // ========== 6. 高中页面交互与课程渲染 ==========
  
  // 渲染高中课程卡片
  function renderSeniorCourses(subject) {
    const list = document.getElementById('senior-course-list');
    if (!list) return; // 防御式编程
    
    list.innerHTML = '';
    const courses = getCoursesByStage('senior');
    const filtered = courses.filter(c => c.subject === subject);
    
    if (filtered.length === 0) {
      list.innerHTML = `<div style="padding:32px;color:#888;">${t('common.noSubjectCourses')}</div>`;
      return;
    }
    
    filtered.forEach(course => {
      const card = document.createElement('div');
      card.className = 'stage-course-card';
      card.innerHTML = `
        <div class="course-title">${course.name}</div>
        <div class="course-desc">${course.desc}</div>
        <div class="course-progress">${t('common.learningProgress')}：${course.progress}%</div>
        <div class="course-progress-bar"><div class="course-progress-inner" style="width:${course.progress}%;"></div></div>
      `;
      list.appendChild(card);
    });
  }

  // ========== 7. 课程中心交互与渲染 ==========
  
  // 获取所有课程数据
  function getAllCourses() {
    const allCourses = [];
    const stages = ['primary', 'junior', 'senior'];
    
    stages.forEach(stage => {
      const courses = getCoursesByStage(stage);
      courses.forEach(course => {
        allCourses.push({...course, stage: stage});
      });
    });
    
    return allCourses;
  }

  let currentFilters = {
    stage: 'all',
    subject: 'all',
    searchTerm: ''
  };
  
  function initializeCoursesPage() {
    updateSubjectFilters();
    renderFilteredCourses();
  }

  function renderFilteredCourses() {
    const grid = document.getElementById('courses-grid');
    if (!grid) return;

    let filtered = getAllCourses();

    // 1. 学段筛选
    if (currentFilters.stage !== 'all') {
      filtered = filtered.filter(c => c.stage === currentFilters.stage);
    }
    
    // 2. 学科筛选
    if (currentFilters.subject !== 'all') {
      filtered = filtered.filter(c => c.subject === currentFilters.subject);
    }

    // 3. 关键词搜索
    if (currentFilters.searchTerm) {
      const term = currentFilters.searchTerm.toLowerCase();
      filtered = filtered.filter(c => c.name.toLowerCase().includes(term) || c.desc.toLowerCase().includes(term));
    }
    
    grid.innerHTML = '';
    if (filtered.length === 0) {
      grid.innerHTML = `<div style="padding:32px;color:#888;width:100%;text-align:center;">${t('common.noCoursesFound')}</div>`;
      return;
    }

    filtered.forEach(course => {
      const card = document.createElement('div');
      card.className = 'stage-course-card';
      // 在课程中心可以添加更多信息，例如学段标签
      card.innerHTML = `
        <div class="course-title">${course.name} <span class="stage-tag">${t(`stages.${course.stage}`)}</span></div>
        <div class="course-desc">${course.desc}</div>
        <div class="course-progress">${t('common.learningProgress')}：${course.progress}%</div>
        <div class="course-progress-bar"><div class="course-progress-inner" style="width:${course.progress}%;"></div></div>
      `;
      grid.appendChild(card);
    });
  }
  
  function updateSubjectFilters() {
      const subjectList = document.getElementById('subject-filter-list');
      if (!subjectList) return;

      const availableSubjects = new Set(['all']);
      let coursesToShow = currentFilters.stage === 'all' 
          ? getAllCourses() 
          : getAllCourses().filter(c => c.stage === currentFilters.stage);
          
      coursesToShow.forEach(c => availableSubjects.add(c.subject));
      
      subjectList.innerHTML = '';
      availableSubjects.forEach(subject => {
          const li = document.createElement('li');
          const btn = document.createElement('button');
          btn.className = 'filter-btn';
          btn.dataset.subject = subject;
          btn.textContent = subject === 'all' ? t('common.all') : t(`subjects.${subject}`);
           if (subject === currentFilters.subject) {
              btn.classList.add('active');
          }
          btn.addEventListener('click', () => {
              currentFilters.subject = subject;
              document.querySelectorAll('#subject-filter-list .filter-btn').forEach(b => b.classList.remove('active'));
              btn.classList.add('active');
              renderFilteredCourses();
          });
          li.appendChild(btn);
          subjectList.appendChild(li);
      });
  }

  // 为课程中心的筛选器添加事件监听
  document.querySelectorAll('#stage-filter-list .filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
          currentFilters.stage = btn.dataset.stage;
          document.querySelectorAll('#stage-filter-list .filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          
          // 重置学科筛选并更新列表
          currentFilters.subject = 'all';
          updateSubjectFilters();
          renderFilteredCourses();
      });
  });
  
  const searchInput = document.getElementById('course-search-input');
  if (searchInput) {
      searchInput.addEventListener('input', (e) => {
          currentFilters.searchTerm = e.target.value;
          renderFilteredCourses();
      });
  }

  // 小学学科筛选按钮交互
  const primarySubjectBtns = document.querySelectorAll('#primary-section .stage-subject-btn');
  primarySubjectBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      primarySubjectBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const subject = this.getAttribute('data-subject');
      renderPrimaryCourses(subject);
    });
  });

  // 初中学科筛选按钮交互
  const juniorSubjectBtns = document.querySelectorAll('#junior-section .stage-subject-btn');
  juniorSubjectBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      juniorSubjectBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const subject = this.getAttribute('data-subject');
      renderJuniorCourses(subject);
    });
  });

  // 高中学科筛选按钮交互
  const seniorSubjectBtns = document.querySelectorAll('#senior-section .stage-subject-btn');
  seniorSubjectBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      seniorSubjectBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const subject = this.getAttribute('data-subject');
      renderSeniorCourses(subject);
    });
  });

  // ========== 初始化 ==========
  
  // 默认只显示首页
  if(pageSections.home) pageSections.home.style.display = '';
  if(pageSections.primary) pageSections.primary.style.display = 'none';
  if(pageSections.junior) pageSections.junior.style.display = 'none';
  if(pageSections.senior) pageSections.senior.style.display = 'none';
  if(pageSections.courses) pageSections.courses.style.display = 'none';

  // 初始化语言设置
  updateLanguage(currentLanguage);

}); 