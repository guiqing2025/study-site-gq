# 课程复习网站 - 多语言版本

## 功能特性

### 🌍 多语言支持
- **中文 (简体中文)** - 默认语言
- **English (英语)** - 完整翻译
- **Español (西班牙语)** - 完整翻译

### 📚 课程内容
- **小学课程**: 语文、数学、英语
- **初中课程**: 语文、数学、英语、物理、化学、生物、历史、地理
- **高中课程**: 语文、数学、英语、物理、化学、生物、历史、地理、政治

### 🎯 核心功能
- 多语言课程内容展示
- 实时语言切换
- 课程进度跟踪
- 响应式设计
- 本地化存储语言偏好

## 使用方法

### 语言切换
1. 在页面顶部导航栏右侧找到语言切换器
2. 点击对应的语言按钮：
   - **中文** - 简体中文
   - **English** - 英语
   - **Español** - 西班牙语
3. 页面内容将立即切换为所选语言

### 课程浏览
1. 点击导航栏中的"课程中心"
2. 使用左侧筛选器按学段和学科筛选课程
3. 使用搜索框搜索特定课程
4. 查看课程进度和学习状态

## 技术实现

### 文件结构
```
课程1/
├── index.html          # 主页面
├── style.css           # 样式文件
├── script.js           # 主要JavaScript逻辑
├── translations.js     # 多语言翻译数据
└── README.md          # 说明文档
```

### 多语言系统
- 使用 `translations.js` 存储所有翻译数据
- 通过 `t()` 函数获取翻译文本
- 支持嵌套键值访问 (如 `nav.home`)
- 自动回退到中文作为默认语言

### 本地存储
- 用户的语言偏好会保存在浏览器的本地存储中
- 下次访问时会自动应用上次选择的语言

## 浏览器兼容性
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 开发说明

### 添加新语言
1. 在 `translations.js` 中添加新的语言对象
2. 确保包含所有必要的翻译键
3. 在HTML中添加对应的语言切换按钮

### 添加新翻译
1. 在 `translations.js` 中为所有语言添加新的翻译键
2. 在JavaScript中使用 `t('new.key')` 获取翻译

## 许可证
本项目仅供学习和演示使用。 