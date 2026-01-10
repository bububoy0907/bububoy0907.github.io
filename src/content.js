// content.js

export const PROFILE = {
  name: "Wong Tsz Yeung Jason (Jason Wong)",
  location: "Hong Kong SAR",
  titlePrimary: "Junior/Graduate Software Engineer",
  titleSecondary: "Junior Sysadmin / DevOps (secondary)",
  education:
    "BSc (Hons) in Computing , The Hong Kong Polytechnic University — Second-Class Honours (May 2025).",
  shortIntro:
    "I make Games • Web Application • VR/AR • and more",
  contact: {
    email: "Wongbu0195@gmail.com",
    linkedin: "linkedin.com/in/jasonbubu",
    github: "github.com/bububoy0907"
  }
};

export const SKILLS = {
  languages: ["Java", "Python", "C#", "C++", "JavaScript/TypeScript", "SQL"],
  web: ["React", "Node.js", "Three.js", "WebGL", "Flask", "8th Wall", "Wix"],
  systems: ["Docker", "Linux", "MongoDB", "Firebase", "Git", "basic CI concepts"],
  additionals: ["Unity", "Unreal Engine", "Blender", "Figma", "SPSS", "R"]
};

export const PROJECTS = [
  {
    id: "webar",
    name: "WebAR Scavenger Hunt (PolyU COMP Info Day)",
    period: "Sep – Nov 2024",
    oneLiner: "Pokémon GO–style WebAR scavenger hunt delivered in ~4 weeks.",
    responsibilities: [
      "Implemented the AR experience and location-based gameplay logic end-to-end under a tight ~3–4 week timeline.",
      "Translated Figma UI designs into production UI, ensuring visual and interaction fidelity.",
      "Produced key 3D assets (full PolyU 3D campus model) used in the AR pipeline.",
      "Supported 2,000+ concurrent users with stable performance during live usage.",
      "Achieved ~90% positive feedback from visitors, students, and faculty."
    ],
    tech: ["Three.js", "TypeScript", "WebGL", "Firebase", "SQL", "8th Wall", "Figma", "3D modelling"],
    links: {
      repo: "[Repo Link]",
      demo: "[Demo Video Coming Soon]",
      caseStudy: "[Case Study]",
      readme: "[Readme]"
    },
    screenshot: "./assets/screenshots/webar.png",
    gallery: [
      { type: "image", src: "./assets/gallery/webar/01.webp", tag: "UI",   caption: "Map + quest flow" },
      { type: "image", src: "./assets/gallery/webar/02.webp", tag: "AR",   caption: "Coin collection view" },
      { type: "image", src: "./assets/gallery/webar/03.webp", tag: "AR",   caption: "Coin collection view" },
      { type: "image", src: "./assets/gallery/webar/04.webp", tag: "UI",   caption: "Map + quest flow" },
      { type: "image", src: "./assets/gallery/webar/05.webp", tag: "AR",   caption: "Coin collection view" },
      { type: "image", src: "./assets/gallery/webar/06.webp", tag: "AR",   caption: "Coin collection view" },
      { type: "image", src: "./assets/gallery/webar/07.webp", tag: "UI",   caption: "Map + quest flow" },
      { type: "image", src: "./assets/gallery/webar/08.webp", tag: "AR",   caption: "Coin collection view" },
      { type: "image", src: "./assets/gallery/webar/09.webp", tag: "AR",   caption: "Coin collection view" },
    ],
  },

  {
    id: "unity",
    name: "Hong Kong Driving Simulator R&D",
    period: "Apr – Jul 2024",
    oneLiner:
      "1:1 geospatial 3D replica of a Hong Kong driving-test route; demo-ready build under sprint constraints.",
    responsibilities: [
      "Developed a 1:1 geospatially accurate 3D replica of the Happy Valley driving-test route in Unity using map data sources.",
      "Implemented 70+ traffic-rule detection logics in C#.",
      "Contributed to vehicle mechanics scripts work and VR-related integration tasks.",
      "Delivered a showcase-ready build within a 2-week sprint.",
      "Produced patch notes and technical documentation to support team delivery and maintenance.",
      "Demoed the product at InnoEX, generating 500+ potential collaboration leads for the team."
    ],
    tech: ["Unity", "C#", "OpenStreetMap", "Google Maps"],
    links: {
      repo: "[Request Access / Private Repo]",
      demo: "[Demo Video]",
      caseStudy: "[Case Study]",
      readme: "[Readme]"
    },
    screenshot: "./assets/screenshots/unity-driving.png",
        gallery: [
      { type: "image", src: "./assets/gallery/unity/01.webp", tag: "Route", caption: "1:1 route replica (Happy Valley)" },
      { type: "image", src: "./assets/gallery/unity/02.webp", tag: "Logic", caption: "Traffic-rule detection UI" },
      { type: "image", src: "./assets/gallery/unity/03.webp", tag: "Route", caption: "1:1 route replica (Happy Valley)" },
      { type: "image", src: "./assets/gallery/unity/04.webp", tag: "Logic", caption: "Traffic-rule detection UI" },      
      { type: "image", src: "./assets/gallery/unity/05.webp", tag: "Route", caption: "1:1 route replica (Happy Valley)" },
      { type: "image", src: "./assets/gallery/unity/06.webp", tag: "Logic", caption: "Traffic-rule detection UI" },
      { type: "image", src: "./assets/gallery/unity/07.webp", tag: "Route", caption: "1:1 route replica (Happy Valley)" },
      { type: "image", src: "./assets/gallery/unity/08.webp", tag: "Logic", caption: "Traffic-rule detection UI" },  
      { type: "image", src: "./assets/gallery/unity/09.webp", tag: "Route", caption: "1:1 route replica (Happy Valley)" },
      { type: "image", src: "./assets/gallery/unity/10.webp", tag: "Logic", caption: "Traffic-rule detection UI" },
      { type: "image", src: "./assets/gallery/unity/11.webp", tag: "Route", caption: "1:1 route replica (Happy Valley)" },
      { type: "image", src: "./assets/gallery/unity/12.webp", tag: "Logic", caption: "Traffic-rule detection UI" },  
      { type: "image", src: "./assets/gallery/unity/13.webp", tag: "Route", caption: "1:1 route replica (Happy Valley)" },
      { type: "image", src: "./assets/gallery/unity/14.webp", tag: "Logic", caption: "Traffic-rule detection UI" },
      { type: "image", src: "./assets/gallery/unity/15.webp", tag: "Route", caption: "1:1 route replica (Happy Valley)" },
      { type: "image", src: "./assets/gallery/unity/16.webp", tag: "Logic", caption: "Traffic-rule detection UI" },  
      { type: "image", src: "./assets/gallery/unity/17.webp", tag: "Route", caption: "1:1 route replica (Happy Valley)" },
      { type: "image", src: "./assets/gallery/unity/18.webp", tag: "Logic", caption: "Traffic-rule detection UI" },
      { type: "image", src: "./assets/gallery/unity/19.webp", tag: "Route", caption: "1:1 route replica (Happy Valley)" },
      { type: "image", src: "./assets/gallery/unity/20.webp", tag: "Logic", caption: "Traffic-rule detection UI" },  
    ],
  },

  // NEW: Capstone project
  {
    id: "capstone",
    name: "AI-Based Private Car Driving Simulator (Capstone)",
    period: "2024 – 2025",
    oneLiner: "Capstone project focused on realistic Hong Kong driving scenarios; research write-up in progress.",
    responsibilities: [
      "Developed a driving-simulator capstone project aligned with realistic Hong Kong driving-test scenarios.",
      "Prepared research/technical write-up for an AI-based driving simulator paper in preparation with a PolyU supervisor.",
      "Packaged the capstone result as a foundation for ongoing product development (GoToSim)."
    ],
    tech: ["Unity", "C#", "Blender", "Technical Writing"],
    links: {
      repo: "[Repo Link / Not Public]",
      demo: "[Demo Video Coming Soon]",
      caseStudy: "[Case Study]",
      readme: "[Readme]"
    },
    screenshot: "./assets/screenshots/capstone.png",
  },

  {
    id: "wishcraft",
    name: "WishCraft — A Live MMORPG in Minecraft",
    period: "Jun 2017 – Nov 2020",
    oneLiner: "Hands-on experience running a live online service with reliability and scaling considerations.",
    responsibilities: [
      "Built and operated an open-world MMORPG serving players across Hong Kong, Macau, and Taiwan.",
      "Achieved 7,000 unique registrations with steady ~150 concurrent players.",
      "Developed core server and gameplay systems in Java.",
      "Maintained plugin configurations and handled ongoing live-ops tuning.",
      "Performed production debugging and incident troubleshooting to keep services stable.",
      "Implemented multi-instance auto-scaling and routing to manage peak loads smoothly.",
      "Built and moderated a 1,000+ member Discord community for announcements and player support."
    ],
    tech: ["Linux", "Java", "Ops/Systems", "Minecraft server ecosystem"],
    links: {
      repo: "[Repo Link]",
      demo: "[Demo Video]",
      caseStudy: "[Case Study]",
      readme: "[Readme]"
    },
    screenshot: "./assets/screenshots/wishcraft.png",
        gallery: [
      { type: "image", src: "./assets/gallery/wishcraft/01.webp", tag: "Ops",   caption: "Server operations / monitoring snapshot" },
      { type: "image", src: "./assets/gallery/wishcraft/02.webp", tag: "Community", caption: "Discord community + announcements" },
      { type: "image", src: "./assets/gallery/wishcraft/03.webp", tag: "Ops",   caption: "Server operations / monitoring snapshot" },
      { type: "image", src: "./assets/gallery/wishcraft/04.webp", tag: "Community", caption: "Discord community + announcements" },
      { type: "image", src: "./assets/gallery/wishcraft/05.webp", tag: "Ops",   caption: "Server operations / monitoring snapshot" },
      { type: "image", src: "./assets/gallery/wishcraft/06.webp", tag: "Community", caption: "Discord community + announcements" },
      { type: "image", src: "./assets/gallery/wishcraft/07.webp", tag: "Ops",   caption: "Server operations / monitoring snapshot" },
      { type: "image", src: "./assets/gallery/wishcraft/08.webp", tag: "Community", caption: "Discord community + announcements" },
      { type: "image", src: "./assets/gallery/wishcraft/09.webp", tag: "Ops",   caption: "Server operations / monitoring snapshot" },
      { type: "image", src: "./assets/gallery/wishcraft/10.webp", tag: "Community", caption: "Discord community + announcements" },
      { type: "image", src: "./assets/gallery/wishcraft/11.webp", tag: "Ops",   caption: "Server operations / monitoring snapshot" },
      { type: "image", src: "./assets/gallery/wishcraft/12.webp", tag: "Community", caption: "Discord community + announcements" },
      { type: "image", src: "./assets/gallery/wishcraft/13.webp", tag: "Ops",   caption: "Server operations / monitoring snapshot" },
      { type: "image", src: "./assets/gallery/wishcraft/14.webp", tag: "Community", caption: "Discord community + announcements" },
      { type: "image", src: "./assets/gallery/wishcraft/15.webp", tag: "Ops",   caption: "Server operations / monitoring snapshot" },
      { type: "image", src: "./assets/gallery/wishcraft/16.webp", tag: "Community", caption: "Discord community + announcements" },
      { type: "image", src: "./assets/gallery/wishcraft/17.webp", tag: "Ops",   caption: "Server operations / monitoring snapshot" },
      { type: "image", src: "./assets/gallery/wishcraft/18.webp", tag: "Community", caption: "Discord community + announcements" },
    ],
  },

  {
    id: "petmatch",
    name: "PetMatch (Full-stack practice project)",
    period: "2025",
    oneLiner: "A full-stack pet-matching marketplace concept with swipe-based discovery.",
    responsibilities: [
      "Architected a React + Node.js application with swipe-based browsing powered by a simple recommendation approach.",
      "Established a Dockerized development environment to standardize local setup and reduce onboarding friction.",
      "Set up a basic CI workflow to support faster iteration and more reliable delivery.",
      "Documented project setup, feature workflows, and development conventions for maintainability."
    ],
    tech: ["React", "Node.js", "Docker", "Git"],
    links: {
      repo: "[Repo Link]",
      demo: "[Demo Video]",
      caseStudy: "[Case Study]",
      readme: "[Readme]"
    },
    screenshot: "./assets/screenshots/petmatch.png",
    gallery: [
      { type: "image", src: "./assets/gallery/petmatch/01.webp", tag: "UI",  caption: "Swipe-based discovery" },
    ],
  }
];

// NEW: Research section
export const RESEARCH = [
  {
    title: "AI-Based Private Car Driving Simulator with Realistic Traffic Scenarios in Hong Kong",
    note: "Research paper in preparation with Prof. Jeff Kai-Tai Tang, The Hong Kong Polytechnic University."
  }
];

// NEW: Looking for section
export const LOOKING_FOR = {
  text:
    "I’m targeting Graduate/Junior Software Engineer roles (frontend/full-stack/platform) where performance, reliability, and clean delivery matter. I’m also open to System Admin / Junior DevOps roles where I can apply my operations mindset (scaling, troubleshooting, automation, documentation)."
};

// Update navigation if you use ELEVATOR_FLOORS for a sidebar/scroll UI
export const ELEVATOR_FLOORS = [
  { floor: 1, key: "about", label: "About" },
  { floor: 2, key: "projects", label: "Projects" },
  { floor: 3, key: "skills", label: "Skills" },
  { floor: 4, key: "research", label: "Research" },
  { floor: 5, key: "looking", label: "What I’m Looking For" },
  { floor: 6, key: "contact", label: "Contact" }
];
