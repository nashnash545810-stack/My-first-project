import { PortfolioState } from '../types/portfolio';

export const HERO_VISUAL_PATH = '/src/assets/images/hero_dev_visual_1795270626839.jpg';

export const DEFAULT_PORTFOLIO_STATE: PortfolioState = {
  identity: {
    name: '[YOUR NAME]',
    headline: 'Portfolio Overview',
    subheadline: 'Aspiring Computer Science Engineering Student',
    heroSummary:
      'Focused on building foundational engineering skills in modern web development, applied artificial intelligence, and defensive cybersecurity through hands-on learning.',
    email: '[your.email@example.com]',
    githubUrl: '',
    linkedinUrl: '',
    location: 'Mangalore, India',
    resumeFileName: null,
    resumeDataUrl: null,
  },
  about: {
    introduction:
      'I am an aspiring Computer Science Engineering student interested in software development, artificial intelligence and cybersecurity. I enjoy learning new technologies and building practical projects that solve real-world problems.',
    currentEducation: 'Pre-University (Class 12 / PCMC) — preparing for B.Tech in Computer Science and Engineering.',
    programmingInterests: 'Core programming with Python, JavaScript, TypeScript, SQL, and component-driven React interfaces.',
    careerGoals: 'Grow into a disciplined software engineer with strong fundamentals in backend systems, AI tooling, and secure application design.',
    areasOfInterest: 'Full-stack web architecture, applied machine learning for learning tools, and defensive log-based threat detection.',
  },
  skillCategories: [
    {
      id: 'programming',
      title: 'Programming',
      description: 'Core languages I am actively practicing for problem solving and application logic.',
      skills: [
        { id: 'python', name: 'Python', level: 'Developing', developing: true },
        { id: 'sql', name: 'SQL', level: 'Foundational', developing: true },
        { id: 'javascript', name: 'JavaScript', level: 'Developing', developing: true },
        { id: 'typescript', name: 'TypeScript', level: 'Developing', developing: true },
      ],
    },
    {
      id: 'web-development',
      title: 'Web Development',
      description: 'Frontend fundamentals and modern UI architecture.',
      skills: [
        { id: 'html', name: 'HTML', level: 'Intermediate', developing: false },
        { id: 'css', name: 'CSS', level: 'Developing', developing: true },
        { id: 'react', name: 'React', level: 'Developing', developing: true },
      ],
    },
    {
      id: 'tools',
      title: 'Tools',
      description: 'Daily workflow, version control, and local development environment.',
      skills: [
        { id: 'git', name: 'Git', level: 'Developing', developing: true },
        { id: 'github', name: 'GitHub', level: 'Developing', developing: true },
        { id: 'vscode', name: 'VS Code', level: 'Intermediate', developing: false },
      ],
    },
    {
      id: 'ai-and-tech',
      title: 'AI and Technology',
      description: 'Emerging domains I am studying and exploring through upcoming projects.',
      skills: [
        { id: 'ai', name: 'Artificial Intelligence', level: 'Foundational', developing: true },
        { id: 'ml', name: 'Machine Learning', level: 'Foundational', developing: true },
        { id: 'cybersecurity', name: 'Cybersecurity', level: 'Foundational', developing: true },
      ],
    },
  ],
  projects: [
    {
      id: 'personal-portfolio',
      title: 'Personal Portfolio Website',
      description: 'My first professional developer portfolio.',
      longDescription:
        'A responsive, accessible developer portfolio built with React, TypeScript, and Tailwind CSS. Designed to document my learning journey honestly, organize upcoming software builds, and provide a clean contact workflow.',
      category: 'Web Development',
      status: 'Completed',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      imageUrl: '/src/assets/images/project_portfolio_ui_1795270626424.jpg',
      imageAlt: 'Minimalist dark geometric UI wireframe layers representing Personal Portfolio Website',
      liveUrl: '#home',
      githubUrl: '',
      highlights: [
        'Responsive layout across mobile, tablet, and desktop viewports',
        'Editable sections for profile details, developing skill levels, and education',
        'Accessible dark charcoal interface with keyboard navigation and validated contact form',
      ],
    },
    {
      id: 'ai-study-assistant',
      title: 'AI Study Assistant',
      description:
        'An AI-powered application designed to help students understand documents and study more effectively.',
      longDescription:
        'A planned study companion focused on breaking down dense lecture notes and technical PDFs into structured summaries, concept explanations, and self-test questions for Computer Science students.',
      category: 'Artificial Intelligence',
      status: 'Planned',
      technologies: ['Python', 'TypeScript', 'React', 'Document Parsing'],
      imageUrl: '/src/assets/images/project_ai_study_1795270626381.jpg',
      imageAlt: 'Isometric crystalline document plates connected to structured knowledge nodes',
      liveUrl: '',
      githubUrl: '',
      highlights: [
        'Planned document ingestion pipeline for study guides and notes',
        'Structured Q&A and concept breakdown interface',
        'Built to practice API integration and prompt design fundamentals',
      ],
    },
    {
      id: 'smart-business-management',
      title: 'Smart Business Management System',
      description: 'A business application for managing inventory, sales and expenses.',
      longDescription:
        'An in-development full-stack management tool aimed at helping small businesses track stock levels, record daily sales transactions, and monitor operating expenses in a clean relational data model.',
      category: 'Software Systems',
      status: 'In Development',
      technologies: ['TypeScript', 'React', 'SQL', 'REST API'],
      imageUrl: '/src/assets/images/project_business_sys_1795270626213.jpg',
      imageAlt: 'Minimalist dark architectural blocks representing structured inventory and ledger data',
      liveUrl: '',
      githubUrl: '',
      highlights: [
        'Relational schema design for products, invoices, and expense entries',
        'Clean dashboard views for stock alerts and monthly summaries',
        'Focus on input validation and reliable CRUD state management',
      ],
    },
    {
      id: 'ai-cybersecurity-threat-detector',
      title: 'AI Cybersecurity Threat Detector',
      description:
        'A defensive cybersecurity project designed to analyse security logs and identify suspicious patterns.',
      longDescription:
        'A planned defensive security project exploring how rule-based log parsing and anomaly detection techniques can flag unusual authentication attempts, port scans, or malformed request spikes.',
      category: 'Cybersecurity',
      status: 'Planned',
      technologies: ['Python', 'Log Analysis', 'Machine Learning', 'Defensive Rules'],
      imageUrl: '/src/assets/images/project_cyber_sec_1795270626108.jpg',
      imageAlt: 'Dark matte hexagonal lattice shield with subtle blue telemetry signal lines',
      liveUrl: '',
      githubUrl: '',
      highlights: [
        'Structured log parsing for simulated authentication and access logs',
        'Pattern matching combined with introductory anomaly scoring',
        'Strictly defensive focus on monitoring, auditing, and reporting',
      ],
    },
  ],
  education: [
    {
      id: 'pre-university',
      levelLabel: 'Pre-University Education',
      title: 'Class 12 / PCMC',
      institution: '[Your School / Pre-University College]',
      timeframe: '[Year Completed or Expected]',
      status: 'Completed',
      details:
        'Core coursework in Physics, Chemistry, Mathematics, and Computer Science, establishing analytical and algorithmic problem-solving foundations.',
    },
    {
      id: 'undergraduate',
      levelLabel: 'Undergraduate Education',
      title: 'B.Tech Computer Science and Engineering — planned',
      institution: '[Target University / Institution]',
      timeframe: 'Planned',
      status: 'Planned',
      details:
        'Planned undergraduate degree focusing on data structures, algorithms, operating systems, databases, artificial intelligence, and cybersecurity.',
    },
  ],
};
