document.addEventListener('DOMContentLoaded', () => {
    // 模拟从本地存储或API获取的数据
    const courseData = [
        {
            subject: '数学 (MATH)',
            type: '视频课程',
            level: '初级',
            title: '代数核心概念',
            description: '涵盖线性方程、不等式以及函数入门，为SAT数学打下坚实基础。',
            tags: ['核心考点', '代数'],
            progress: 75
        },
        {
            subject: '阅读 (READING)',
            type: '练习题库',
            level: '中级',
            title: '科学类文章精读',
            description: '分析复杂的科学文献，学习如何快速定位关键信息和作者观点。',
            tags: ['高频题型', '精读'],
            progress: 40
        },
        {
            subject: '写作 (WRITING)',
            type: '视频课程',
            level: '初级',
            title: '语法与标点符号',
            description: '系统学习SAT写作部分的常见语法规则和标点符号用法。',
            tags: ['语法', '必考'],
            progress: 90
        },
        {
            subject: '数学 (MATH)',
            type: '练习题库',
            level: '高级',
            title: '几何与三角函数',
            description: '深入学习圆形、三角形的几何特性以及基础三角函数知识。',
            tags: ['几何', '难题'],
            progress: 60
        },
        {
            subject: '阅读 (READING)',
            type: '模拟考卷',
            level: '高级',
            title: '历史文献阅读技巧',
            description: '掌握如何解读建国文献等历史长文，理解复杂句式和修辞手法。',
            tags: ['历史', '精读'],
            progress: 25
        },
        {
            subject: '综合',
            type: '模拟考卷',
            level: '中级',
            title: '全真模拟考试 #1',
            description: '一套完整的SAT模拟试卷，用于测试综合学习效果和时间管理能力。',
            tags: ['模拟考', '综合'],
            progress: 0
        }
    ];

    const cardGrid = document.getElementById('card-grid-container');
    const categoryTitle = document.getElementById('category-title');

    // 根据数据生成所有卡片
    function renderCards(data) {
        cardGrid.innerHTML = ''; // 清空现有卡片
        if (data.length === 0) {
            cardGrid.innerHTML = '<div style="padding:32px;color:#888;">暂无内容</div>';
            return;
        }
        data.forEach(course => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-content">
                    <span class="subject">${course.subject}</span>
                    <h3 class="title">${course.title}</h3>
                    <p class="description">${course.description}</p>
                    <div class="tags">
                        ${course.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="progress-info">学习进度: ${course.progress}%</div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${course.progress}%;"></div>
                    </div>
                </div>
            `;
            cardGrid.appendChild(card);
        });
    }

    // 分类筛选逻辑
    function filterByCategory(type, value) {
        let filtered = [];
        let title = '全部内容';
        if (type && value) {
            filtered = courseData.filter(item => item[type] === value);
            title = value;
        } else {
            filtered = courseData;
        }
        categoryTitle.textContent = title;
        renderCards(filtered);
    }

    // 绑定左侧分类点击事件
    document.querySelectorAll('.filter-group ul li a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // 判断属于哪个分类
            const text = this.textContent.trim();
            // 科目
            if (['数学 (Math)', '阅读 (Reading)', '写作与语言'].includes(text)) {
                filterByCategory('subject', text);
            } else if (['视频课程', '练习题库', '模拟考卷'].includes(text)) {
                filterByCategory('type', text);
            } else if (['初级', '中级', '高级'].includes(text)) {
                filterByCategory('level', text);
            } else {
                filterByCategory();
            }
        });
    });

    // 页面加载时渲染所有卡片
    renderCards(courseData);

    // 页面切换相关
    const navLinks = {
        nav: document.getElementById('nav-link-nav'),
        courses: document.getElementById('nav-link-courses'),
        assignments: document.getElementById('nav-link-assignments'),
        about: document.getElementById('nav-link-about')
    };
    const pages = {
        nav: document.getElementById('page-nav'),
        courses: document.getElementById('page-courses'),
        assignments: document.getElementById('page-assignments'),
        about: document.getElementById('page-about'),
        math: document.getElementById('math-dashboard')
    };
    const sidebar = document.getElementById('sidebar-nav');

    function showPage(page) {
        // 切换主内容区
        Object.keys(pages).forEach(key => {
            pages[key].style.display = (key === page) ? '' : 'none';
        });
        // 切换sidebar
        sidebar.style.display = (page === 'nav') ? '' : 'none';
        // 高亮导航栏
        Object.keys(navLinks).forEach(key => {
            if (key === page) {
                navLinks[key].classList.add('active');
            } else {
                navLinks[key].classList.remove('active');
            }
        });
    }

    // 绑定导航栏点击事件
    navLinks.nav.addEventListener('click', e => { e.preventDefault(); showPage('nav'); });
    navLinks.courses.addEventListener('click', e => { e.preventDefault(); showPage('courses'); });
    navLinks.assignments.addEventListener('click', e => { e.preventDefault(); showPage('assignments'); });
    navLinks.about.addEventListener('click', e => { e.preventDefault(); showPage('about'); });

    // 默认显示导航页面
    showPage('nav');

    // 模拟数学题库
    const mathQuestions = [
        { id: 1, knowledge: '代数', content: '解方程 x+3=7', answer: '4' },
        { id: 2, knowledge: '几何', content: '三角形内角和是多少度？', answer: '180' },
        { id: 3, knowledge: '函数', content: 'y=2x+1，当x=3时y=?', answer: '7' },
        { id: 4, knowledge: '概率', content: '抛一枚硬币，正面概率？', answer: '0.5' },
        { id: 5, knowledge: '数列', content: '等差数列首项1，公差2，第5项？', answer: '9' }
    ];
    // 模拟答题历史
    const mathHistory = [
        { qid: 1, date: '2024-06-01', correct: true },
        { qid: 2, date: '2024-06-01', correct: false },
        { qid: 3, date: '2024-06-02', correct: true },
        { qid: 4, date: '2024-06-02', correct: false },
        { qid: 2, date: '2024-06-03', correct: true },
        { qid: 5, date: '2024-06-03', correct: false },
        { qid: 1, date: '2024-06-04', correct: true },
        { qid: 3, date: '2024-06-04', correct: false },
        { qid: 4, date: '2024-06-04', correct: true }
    ];

    // --- 数学类目点击，显示学习追踪页面 ---
    document.querySelectorAll('.filter-group ul li a').forEach(link => {
        link.addEventListener('click', function(e) {
            const text = this.textContent.trim();
            if (text === '数学 (Math)') {
                e.preventDefault();
                showPage('math');
                renderMathDashboard();
            }
        });
    });

    // --- 数学学习追踪页面渲染 ---
    function renderMathDashboard() {
        // 1. 知识点/题目列表
        const qlist = document.getElementById('math-question-list');
        qlist.innerHTML = '';
        mathQuestions.forEach(q => {
            const li = document.createElement('li');
            li.textContent = `[${q.knowledge}] ${q.content}`;
            qlist.appendChild(li);
        });
        // 2. 错题本
        const wrongList = document.getElementById('math-wrong-list');
        wrongList.innerHTML = '';
        // 找出做错过的题目
        const wrongQids = [...new Set(mathHistory.filter(h => !h.correct).map(h => h.qid))];
        mathQuestions.filter(q => wrongQids.includes(q.id)).forEach(q => {
            const li = document.createElement('li');
            li.textContent = `[${q.knowledge}] ${q.content}`;
            wrongList.appendChild(li);
        });
        // 3. 历史答题记录
        const historyList = document.getElementById('math-history-list');
        historyList.innerHTML = '';
        mathHistory.slice().reverse().forEach(h => {
            const q = mathQuestions.find(q => q.id === h.qid);
            const li = document.createElement('li');
            li.textContent = `${h.date} - [${q.knowledge}] ${q.content} - ${h.correct ? '✔️ 正确' : '❌ 错误'}`;
            historyList.appendChild(li);
        });
        // 4. 图表
        renderMathCharts();
    }

    // --- 数学图表渲染 ---
    function renderMathCharts() {
        // 折线图：每日答题数
        const dateMap = {};
        mathHistory.forEach(h => {
            dateMap[h.date] = (dateMap[h.date] || 0) + 1;
        });
        const dates = Object.keys(dateMap).sort();
        const counts = dates.map(d => dateMap[d]);
        if(window.mathLineChart) window.mathLineChart.destroy();
        window.mathLineChart = new Chart(document.getElementById('chart-line'), {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: '答题数',
                    data: counts,
                    borderColor: '#0078D4',
                    backgroundColor: 'rgba(0,120,212,0.1)',
                    tension: 0.3,
                    fill: true
                }]
            },
            options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, stepSize: 1 } } }
        });
        // 圆环图：正确率
        const correct = mathHistory.filter(h => h.correct).length;
        const wrong = mathHistory.length - correct;
        if(window.mathDonutChart) window.mathDonutChart.destroy();
        window.mathDonutChart = new Chart(document.getElementById('chart-donut'), {
            type: 'doughnut',
            data: {
                labels: ['正确', '错误'],
                datasets: [{
                    data: [correct, wrong],
                    backgroundColor: ['#0078D4', '#F3F9FD'],
                    borderWidth: 1
                }]
            },
            options: { plugins: { legend: { position: 'bottom' } } }
        });
        // 雷达图：知识点掌握
        const knowMap = {};
        mathQuestions.forEach(q => { knowMap[q.knowledge] = { total: 0, correct: 0 }; });
        mathHistory.forEach(h => {
            const q = mathQuestions.find(q => q.id === h.qid);
            if(q) {
                knowMap[q.knowledge].total++;
                if(h.correct) knowMap[q.knowledge].correct++;
            }
        });
        const knowLabels = Object.keys(knowMap);
        const knowRates = knowLabels.map(k => knowMap[k].total ? Math.round(100 * knowMap[k].correct / knowMap[k].total) : 0);
        if(window.mathRadarChart) window.mathRadarChart.destroy();
        window.mathRadarChart = new Chart(document.getElementById('chart-radar'), {
            type: 'radar',
            data: {
                labels: knowLabels,
                datasets: [{
                    label: '掌握率(%)',
                    data: knowRates,
                    backgroundColor: 'rgba(0,120,212,0.2)',
                    borderColor: '#0078D4',
                    pointBackgroundColor: '#0078D4'
                }]
            },
            options: { scales: { r: { min: 0, max: 100, ticks: { stepSize: 20 } } } }
        });
    }
}); 