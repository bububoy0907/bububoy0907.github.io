export const PROFILE = {
  name: "Jason Wong (Wong Tsz Yeung)",
  location: "Hong Kong SAR",
  titlePrimary: "Junior/Graduate Software Engineer",
  titleSecondary: "Junior Sysadmin / DevOps (secondary)",
  education: "BSc in Computing (Computer Science), The Hong Kong Polytechnic University — Second-Class Honours (May 2025).",
  shortIntro:
    "I build web + 3D experiences and I’m rebuilding my GitHub portfolio with documentation-first case studies. This site offers two ways to explore: a traditional landing page and an interactive 3D room.",
  contact: {
    email: "[your.email@example.com]",
    linkedin: "[LinkedIn URL]"
  }
};

export const SKILLS = {
  languages: ["Java", "Python", "C#", "JavaScript/TypeScript", "SQL"],
  web: ["React", "Node.js", "Three.js", "WebGL"],
  systems: ["Docker", "Linux", "Git (improving habits)", "basic CI concepts"],
  simulation: ["Unity", "VR exposure"]
};

export const PROJECTS = [
  {
    id: "webar",
    name: "WebAR Delivery (PolyU COMP Info Day)",
    oneLiner: "Pokémon GO–style WebAR scavenger hunt delivered in ~4 weeks.",
    responsibilities: [
      "Implemented AR engine and location-based logic",
      "Delivered core experience with Three.js + TypeScript + WebGL",
      "Integrated Firebase"
    ],
    tech: ["Three.js", "TypeScript", "WebGL", "Firebase"],
    outcomes: ["2,000+ concurrent users", "~90% positive feedback"],
    links: {
      repo: "[Repo Link]",
      demo: "[Demo Video Coming Soon]",
      caseStudy: "[Case Study]",
      readme: "[Readme]"
    },
    screenshot: "./assets/screenshots/webar.png"
  },
  {
    id: "unity",
    name: "Unity/C# Internship (3CForge)",
    oneLiner: "1:1 geospatial 3D replica of a Hong Kong driving-test route; demo-ready build under sprint constraints.",
    responsibilities: [
      "Implemented 70+ traffic-rule detection logics in C#",
      "Shipped demo-ready build under tight sprint",
      "Produced patch notes and technical documentation",
      "Contributed to VR-related work (exposure)"
    ],
    tech: ["Unity", "C#"],
    outcomes: ["70+ traffic-rule detections implemented"],
    links: {
      repo: "[Request Access / Private Repo]",
      demo: "[Demo Video]",
      caseStudy: "[Case Study]",
      readme: "[Readme]"
    },
    screenshot: "./assets/screenshots/unity-driving.png"
  },
  {
    id: "wishcraft",
    name: "Ops/Systems — WishCraft MMORPG Server (Minecraft engine)",
    oneLiner: "Built/operated an open-world MMORPG server with scaling and production debugging.",
    responsibilities: [
      "Production debugging and operational support",
      "Plugin/config maintenance",
      "Multi-instance scaling and routing for peak load"
    ],
    tech: ["Linux", "Ops/Systems", "Minecraft server ecosystem"],
    outcomes: ["7,000 unique registrations", "~150 concurrent players"],
    links: {
      repo: "[Repo Link]",
      demo: "[Demo Video]",
      caseStudy: "[Case Study]",
      readme: "[Readme]"
    },
    screenshot: "./assets/screenshots/wishcraft.png"
  },
  {
    id: "petmatch",
    name: "PetMatch (Full-stack practice project)",
    oneLiner: "React + Node.js practice project with Dockerized dev environment and basic CI workflow.",
    responsibilities: [
      "Built UI and API using React + Node.js",
      "Dockerized development environment",
      "Added basic CI workflow",
      "Documented setup"
    ],
    tech: ["React", "Node.js", "Docker", "Git"],
    outcomes: ["Reproducible local setup and documented workflow (practice project)"],
    links: {
      repo: "[Repo Link]",
      demo: "[Demo Video]",
      caseStudy: "[Case Study]",
      readme: "[Readme]"
    },
    screenshot: "./assets/screenshots/petmatch.png"
  }
];


export const ELEVATOR_FLOORS = [
  { floor: 1, key: "about", label: "About" },
  { floor: 2, key: "projects", label: "Projects" },
  { floor: 3, key: "skills", label: "Skills" },
  { floor: 4, key: "demos", label: "Demos" },
  { floor: 5, key: "contact", label: "Contact" }
];