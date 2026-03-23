export const projects = [
  {
    id: 1,
    number: '001',
    category: 'AI / Full-Stack',
    title: 'ECO-3D Studio',
    description:
      'Geospatial AI platform that detects plot boundaries from satellite imagery, fetches live environmental data from 7 APIs, and generates eco-friendly floor plans as interactive 3D models.',
    tech: ['Next.js 14', 'TypeScript', 'FastAPI', 'React Three Fiber', 'YOLOv8', 'Railway'],
    link: 'https://github.com/hxrrrrri/ECO-3D',
    vercelLink: 'https://eco-3-d.vercel.app',
    variant: 'light',
    image: null,
  },
  {
    id: 2,
    number: '002',
    category: 'AI / NLP',
    title: 'Multilingual RAG Pipeline',
    description:
      'Retrieval-Augmented Generation system supporting multiple languages with semantic search, vector embeddings, and context-aware document Q&A using LangChain and HuggingFace.',
    tech: ['Python', 'LangChain', 'HuggingFace', 'FAISS', 'FastAPI'],
    link: 'https://github.com/hxrrrrri',
    variant: 'dark',
    image: null,
  },
  {
    id: 3,
    number: '003',
    category: 'Machine Learning',
    title: 'Stress Level Prediction',
    description:
      'ML pipeline using XGBoost for physiological stress classification from wearable sensor data, with feature engineering, SHAP explainability, and a Streamlit dashboard.',
    tech: ['Python', 'XGBoost', 'SHAP', 'Streamlit', 'Scikit-learn'],
    link: 'https://github.com/hxrrrrri',
    variant: 'light',
    image: null,
  },
  {
    id: 4,
    number: '004',
    category: 'Robotics / CV',
    title: 'Autonomous Wildlife Robot',
    description:
      'YOLOv8-powered wildlife detection robot with real-time object tracking, autonomous navigation, and alert system. Built with Python, OpenCV, and a custom-trained detection model.',
    tech: ['YOLOv8', 'Python', 'OpenCV', 'ROS', 'PyTorch'],
    link: 'https://github.com/hxrrrrri',
    variant: 'dark',
    image: null,
  },
  {
    id: 5,
    number: '005',
    category: 'Full-Stack',
    title: 'MERN Event Manager',
    description:
      'Collaborative event management platform built during ICT Academy internship. Features real-time updates, role-based access, CRUD operations, and a responsive dashboard.',
    tech: ['MongoDB', 'Express.js', 'React', 'Node.js', 'JWT'],
    link: 'https://github.com/hxrrrrri',
    variant: 'light',
    image: null,
  },
  {
    id: 6,
    number: '006',
    category: 'Web App',
    title: 'KTU Activity Points',
    description:
      'Calculator web app for KTU students to track and compute mandatory activity points across categories, with PDF export and an intuitive form-based interface.',
    tech: ['React', 'Tailwind CSS', 'Vite', 'jsPDF'],
    link: 'https://github.com/hxrrrrri',
    variant: 'dark',
    image: null,
  },
]

export const skills = {
  frontend: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js / R3F', 'GSAP / Framer Motion'],
  backend: ['Python / FastAPI', 'Node.js / Express', 'PostgreSQL / MongoDB', 'Docker / Railway', 'REST & GraphQL'],
  ai: ['PyTorch / HuggingFace', 'YOLOv8 / DeepLabV3', 'LangChain / RAG', 'XGBoost / Scikit-learn', 'MLFlow / MLOps'],
}

export const socials = {
  github: 'https://github.com/hxrrrrri',
  linkedin: 'https://www.linkedin.com/in/harisankar-s-profile/',
  email: 'harisankars.mbcet@gmail.com',
}
