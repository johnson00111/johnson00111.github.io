// ─── All static data in one place ───
// Edit this file to update your portfolio content.
// No need to touch any component code.

export const SITE = {
  name: "Tsung-Han (Johnson) Jao",
  shortName: "Johnson Jao",
  title: "Software Engineer · ML Engineer · AI Engineer · M.S. @ Pitt",
  tagline: "5+ years engineering production systems at scale — from distributed data pipelines and ML models to high-concurrency backend services.",
  email: "johnson00111usa2@gmail.com",
  github: "https://github.com/johnson00111",
  linkedin: "https://linkedin.com/in/johnsonjao",
  instagram: "https://www.instagram.com/johnsonjao/",
  location: "Pittsburgh, PA",
};

export const SKILLS = {
  row1: ["Python", "PyTorch", "TensorFlow", "Scikit-learn", "PySpark", "SQL", "BigQuery", "C++"],
  row2: ["AWS", "Docker", "Kubernetes", "Kubeflow", "Airflow", "CI/CD", "KQL", "Linux"],
};

export const STATS = [
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 10, suffix: "M+", label: "Users Impacted" },
  { value: 50, suffix: "%", label: "Conversion Lift" },
  { value: 4.0, suffix: "", label: "GPA at Pitt", isDecimal: true },
];

export const DOMAINS = [
  { label: "Cybersecurity", desc: "Threat detection, anomaly detection, phishing classification" },
  { label: "E-commerce", desc: "RecSys, identity resolution, conversion optimization" },
  { label: "Backend & Infra", desc: "Distributed systems, high-concurrency services, system design" },
  { label: "MLOps", desc: "Kubeflow, Airflow, Docker, CI/CD, model monitoring" },
];

export const EXPERIENCE = [
  {
    period: "Nov 2022 — Jul 2025",
    role: "Cloud Development Engineer",
    subtitle: "Data Science",
    company: "Trend Micro",
    location: "Taipei, Taiwan",
    highlights: [
      "Architected distributed pipelines with PySpark & Airflow processing billions of security events in TB-scale Parquet on AWS S3.",
      "Developed 10 detection filters in one quarter via statistical & sequence analysis on ADX, achieving 10× alert volume increase with <5% false positive rate.",
      "Designed discriminative features for a deep learning phishing detection pipeline from email content.",
      "Mentored interns to raise test coverage from 5% → 100% and build CI/CD pipelines.",
    ],
    align: "left",
  },
  {
    period: "Sep 2019 — Nov 2022",
    role: "Machine Learning Engineer",
    subtitle: null,
    company: "Tagtoo",
    location: "Taipei, Taiwan",
    highlights: [
      "Built deep learning models (CNN, DNN, Autoencoder) for identity resolution, unifying 10M+ user profiles across devices.",
      "Developed SVD-based recommendation systems achieving 50% conversion rate lift, validated through A/B testing.",
      "Orchestrated end-to-end model lifecycle via Docker & Kubeflow — weekly retraining, daily inference, drift monitoring.",
      "Refactored legacy scripts, reducing report generation from 3 days to under 2 hours across 500+ e-commerce sites.",
    ],
    align: "right",
  },
];

export const EDUCATION = [
  {
    period: "Aug 2025 — Jan 2027",
    degree: "M.S. Telecommunications",
    school: "University of Pittsburgh",
    location: "Pittsburgh, PA",
    detail: "GPA 4.0/4.0. TA for Mathematical Foundations of ML. Coursework in AI, Algorithm Design, Cloud Computing, Network Security.",
    current: true,
  },
  {
    period: "Sep 2016 — Apr 2019",
    degree: "M.S. Computer Science & Information Engineering",
    school: "National Taiwan University of Science and Technology",
    location: "Taipei, Taiwan",
    detail: "Thesis: Deep hashing neural network for content-based image retrieval — 4.96% mAP increase on CIFAR-10/100.",
    current: false,
  },
  {
    period: "Sep 2012 — Jun 2016",
    degree: "B.S. Computer Science & Engineering",
    school: "Yuan Ze University",
    location: "Taoyuan, Taiwan",
    detail: "Foundation in algorithms, data structures, and systems programming.",
    current: false,
  },
];

export const PROJECTS = [
  {
    num: "01",
    title: "AI Agent Office",
    desc: "A multi-agent system where a CEO agent autonomously recruits and orchestrates specialized sub-agents to collaboratively solve user problems — a virtual office powered by AI.",
    tags: ["Agentic AI", "Multi-Agent", "LLM"],
    status: "In Progress",
    link: "https://github.com/johnson00111/ai-agent-office",
  },
  {
    num: "02",
    title: "Gmail Job App\nTracker",
    desc: "Full-stack application that integrates Gmail API with LLM-powered parsing to automatically track and organize job applications. Built with a Python backend, frontend UI, and database layer.",
    tags: ["LLM", "Gmail API", "Full-Stack", "Python"],
    link: "https://github.com/johnson00111/gmail_job_app_tracker",
  },
  {
    num: "03",
    title: "Phishing Detection\nPipeline",
    desc: "Designed discriminative feature sets from email content for a deep learning classification model, contributing to a 10× increase in detected threats with under 5% false positive rate.",
    tags: ["Deep Learning", "Feature Engineering", "Cybersecurity"],
  },
  {
    num: "04",
    title: "Identity Resolution\nSystem",
    desc: "Built CNN/DNN/Autoencoder models to consolidate fragmented browser & device footprints into unified profiles for 10M+ users, enabling precision-targeted advertising.",
    tags: ["TensorFlow", "PyTorch", "BigQuery"],
  },
  {
    num: "05",
    title: "SVD Recommendation\nEngine",
    desc: "Developed matrix factorization-based recommendation system optimizing latent factors, achieving a 50% conversion rate increase validated through A/B testing.",
    tags: ["RecSys", "SVD", "A/B Testing"],
  },
  {
    num: "06",
    title: "Deep Hashing for\nImage Retrieval",
    desc: "Designed a CNN with Residual layers for content-based image retrieval, achieving 4.96% mAP improvement on CIFAR-10/100 through feature extraction optimization.",
    tags: ["Computer Vision", "Keras", "Thesis"],
  },
];

export const SPEAKING = {
  title: "PyData Taipei Meetup",
  description: "Spoke on data file format selection for efficient data processing & leveraging Kaggle to sharpen ML engineering skills.",
  date: "October 2022 · Taipei",
  link: "https://bit.ly/Johnson-Pydata",
};

export const PHOTOS = {
  hero: "/images/hero.jpg",
  work: "/images/work.jpg",
  marathon: "/images/marathon.jpg",
  life: "/images/life.jpg",
  campus: "/images/campus.jpg",
};