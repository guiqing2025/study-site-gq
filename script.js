document.addEventListener('DOMContentLoaded', () => {

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
  
  // 小学课程模拟数据
  const primaryCourses = [
    { subject: 'chinese', name: '拼音与识字', desc: '掌握汉语拼音，提升识字能力。', progress: 80 },
    { subject: 'chinese', name: '课文阅读与写作', desc: '培养阅读理解与基础写作能力。', progress: 60 },
    { subject: 'math', name: '基础加减法', desc: '熟练掌握20以内加减法。', progress: 90 },
    { subject: 'math', name: '图形与空间', desc: '认识常见图形，初步空间感知。', progress: 50 },
    { subject: 'english', name: '字母与单词', desc: '学习26个字母和常用单词。', progress: 70 },
    { subject: 'english', name: '简单对话', desc: '掌握日常英语问候与交流。', progress: 40 },
  ];

  // ========== 5. 初中页面交互与课程渲染 ==========
  
  // 初中课程模拟数据
  const juniorCourses = [
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
    { subject: 'geography', name: '世界地理', desc: '了解世界各地区地理特征。', progress: 50 },
  ];

  // ========== 6. 高中页面交互与课程渲染 ==========
  
  // 高中课程模拟数据
  const seniorCourses = [
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
    { subject: 'politics', name: '哲学与生活', desc: '学习唯物论、辩证法和认识论。', progress: 63 },
  ];

  // ========== 7. 课程中心交互与渲染 ==========
  
  // 将所有课程数据整合到一个数组中，并添加学段信息
  const allCourses = [
    ...primaryCourses.map(c => ({...c, stage: 'primary'})),
    ...juniorCourses.map(c => ({...c, stage: 'junior'})),
    ...seniorCourses.map(c => ({...c, stage: 'senior'}))
  ];

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

    let filtered = allCourses;

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
      grid.innerHTML = '<div style="padding:32px;color:#888;width:100%;text-align:center;">未找到匹配的课程</div>';
      return;
    }

    filtered.forEach(course => {
      const card = document.createElement('div');
      card.className = 'stage-course-card';
      // 在课程中心可以添加更多信息，例如学段标签
      card.innerHTML = `
        <div class="course-title">${course.name} <span class="stage-tag">${course.stage}</span></div>
        <div class="course-desc">${course.desc}</div>
        <div class="course-progress">学习进度：${course.progress}%</div>
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
          ? allCourses 
          : allCourses.filter(c => c.stage === currentFilters.stage);
          
      coursesToShow.forEach(c => availableSubjects.add(c.subject));
      
      subjectList.innerHTML = '';
      availableSubjects.forEach(subject => {
          const li = document.createElement('li');
          const btn = document.createElement('button');
          btn.className = 'filter-btn';
          btn.dataset.subject = subject;
          btn.textContent = subject === 'all' ? '全部' : subject; // 这里可以映射为中文
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

  // 渲染小学课程卡片
  function renderPrimaryCourses(subject) {
    const list = document.getElementById('primary-course-list');
    if (!list) return; // 防御式编程
    
    list.innerHTML = '';
    const filtered = primaryCourses.filter(c => c.subject === subject);
    
    if (filtered.length === 0) {
      list.innerHTML = '<div style="padding:32px;color:#888;">暂无该学科课程</div>';
      return;
    }
    
    filtered.forEach(course => {
      const card = document.createElement('div');
      card.className = 'stage-course-card';
      card.innerHTML = `
        <div class="course-title">${course.name}</div>
        <div class="course-desc">${course.desc}</div>
        <div class="course-progress">学习进度：${course.progress}%</div>
        <div class="course-progress-bar"><div class="course-progress-inner" style="width:${course.progress}%;"></div></div>
      `;
      list.appendChild(card);
    });
  }

  // 渲染初中课程卡片
  function renderJuniorCourses(subject) {
    const list = document.getElementById('junior-course-list');
    if (!list) return; // 防御式编程
    
    list.innerHTML = '';
    const filtered = juniorCourses.filter(c => c.subject === subject);
    
    if (filtered.length === 0) {
      list.innerHTML = '<div style="padding:32px;color:#888;">暂无该学科课程</div>';
      return;
    }
    
    filtered.forEach(course => {
      const card = document.createElement('div');
      card.className = 'stage-course-card';
      card.innerHTML = `
        <div class="course-title">${course.name}</div>
        <div class="course-desc">${course.desc}</div>
        <div class="course-progress">学习进度：${course.progress}%</div>
        <div class="course-progress-bar"><div class="course-progress-inner" style="width:${course.progress}%;"></div></div>
      `;
      list.appendChild(card);
    });
  }

  // 渲染高中课程卡片
  function renderSeniorCourses(subject) {
    const list = document.getElementById('senior-course-list');
    if (!list) return; // 防御式编程
    
    list.innerHTML = '';
    const filtered = seniorCourses.filter(c => c.subject === subject);
    
    if (filtered.length === 0) {
      list.innerHTML = '<div style="padding:32px;color:#888;">暂无该学科课程</div>';
      return;
    }
    
    filtered.forEach(course => {
      const card = document.createElement('div');
      card.className = 'stage-course-card';
      card.innerHTML = `
        <div class="course-title">${course.name}</div>
        <div class="course-desc">${course.desc}</div>
        <div class="course-progress">学习进度：${course.progress}%</div>
        <div class="course-progress-bar"><div class="course-progress-inner" style="width:${course.progress}%;"></div></div>
      `;
      list.appendChild(card);
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

}); 