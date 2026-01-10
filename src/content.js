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
    name: "PolyU-GO!",
    period: "Sep – Nov 2024",
    oneLiner: "Pokémon GO–style WebAR scavenger hunt for PolyU COMP Info Day",
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
      { type: "image", src: "./assets/gallery/webar/01.webp", tag: "",   caption: "Main Interface" },
      { type: "image", src: "./assets/gallery/webar/02.webp", tag: "",   caption: "Main Interface" },
      { type: "image", src: "./assets/gallery/webar/03.webp", tag: "",   caption: "webGL disabled view" },
      { type: "image", src: "./assets/gallery/webar/04.webp", tag: "",   caption: "Figa Design" },
      { type: "image", src: "./assets/gallery/webar/05.webp", tag: "",   caption: "8th-Wall Development" },
      { type: "image", src: "./assets/gallery/webar/06.webp", tag: "",   caption: "3d Model Implementation" },
      { type: "image", src: "./assets/gallery/webar/07.webp", tag: "",   caption: "3d Model Implementation" },
      { type: "image", src: "./assets/gallery/webar/08.webp", tag: "",   caption: "Campus 3D Model Design" },
      { type: "image", src: "./assets/gallery/webar/09.webp", tag: "",   caption: "Full Campus View" },
    ],
  },

  {
    id: "unity",
    name: "Hong Kong Driving Simulator GoToSim R&D",
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
      { type: "image", src: "./assets/gallery/unity/01.webp", tag: "", caption: "AI Vehicle Behaviour Debug" },
      { type: "image", src: "./assets/gallery/unity/02.webp", tag: "", caption: "Capstone Project Title Screen" },
      { type: "image", src: "./assets/gallery/unity/03.webp", tag: "", caption: "Capstone Project Result Report" },
      { type: "image", src: "./assets/gallery/unity/04.webp", tag: "", caption: "NPC Vehicle Waypoint Design" },      
      { type: "image", src: "./assets/gallery/unity/05.webp", tag: "", caption: "NPC Vehicle Waypoint Design" },
      { type: "image", src: "./assets/gallery/unity/06.webp", tag: "", caption: "Map Comparison with the actual Google Street View" },
      { type: "image", src: "./assets/gallery/unity/07.webp", tag: "", caption: "Map Comparison with the actual Google Street View" },
      { type: "image", src: "./assets/gallery/unity/08.webp", tag: "", caption: "Map Comparison with the actual Google Street View" },  
      { type: "image", src: "./assets/gallery/unity/09.webp", tag: "", caption: "Map Comparison with the actual Google Street View" },
      { type: "image", src: "./assets/gallery/unity/10.webp", tag: "", caption: "Map Comparison with the actual Google Street View" },
      { type: "image", src: "./assets/gallery/unity/11.webp", tag: "", caption: "Map Comparison with the actual Google Street View" },
      { type: "image", src: "./assets/gallery/unity/12.webp", tag: "", caption: "Map Comparison with the actual Google Street View" },  
      { type: "image", src: "./assets/gallery/unity/13.webp", tag: "", caption: "Map Comparison with the actual Google Street View" },
      { type: "image", src: "./assets/gallery/unity/14.webp", tag: "", caption: "Map Comparison with the actual Google Street View" },
      { type: "image", src: "./assets/gallery/unity/15.webp", tag: "", caption: "Vehicle POV" },
      { type: "image", src: "./assets/gallery/unity/16.webp", tag: "", caption: "Traffic Intersection Design" },  
      { type: "image", src: "./assets/gallery/unity/17.webp", tag: "", caption: "NPV Vehicle collider design" },
      { type: "image", src: "./assets/gallery/unity/18.webp", tag: "", caption: "AI Vehicle Behaviour Log" },
      { type: "image", src: "./assets/gallery/unity/19.webp", tag: "", caption: "Map Design in Blender" },
      { type: "image", src: "./assets/gallery/unity/20.webp", tag: "", caption: "Traffic-rule Alert UI" },  
    ],
  },

  // NEW: Capstone project
  {
    id: "capstone",
    name: "AI-Based Private Car Driving Simulator",
    period: "2024 – 2025",
    oneLiner: "Capstone project focused on realistic Hong Kong driving scenarios",
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
    name: "BladeCyber — A Live MMORPG in Minecraft",
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
      { type: "image", src: "./assets/gallery/wishcraft/01.webp", tag: "",   caption: "Server Banner" },
      { type: "image", src: "./assets/gallery/wishcraft/02.webp", tag: "", caption: "Hero Class Skills Design" },
      { type: "image", src: "./assets/gallery/wishcraft/03.webp", tag: "",   caption: "Character Skill Design" },
      { type: "image", src: "./assets/gallery/wishcraft/04.webp", tag: "", caption: "Boss Map" },
      { type: "image", src: "./assets/gallery/wishcraft/05.webp", tag: "",   caption: "Lobby Map" },
      { type: "image", src: "./assets/gallery/wishcraft/06.webp", tag: "", caption: "RPG Item Design" },
      { type: "image", src: "./assets/gallery/wishcraft/07.webp", tag: "",   caption: "Quest Design" },
      { type: "image", src: "./assets/gallery/wishcraft/08.webp", tag: "", caption: "GamePlay POV" },
      { type: "image", src: "./assets/gallery/wishcraft/09.webp", tag: "",   caption: "User Interface" },
      { type: "image", src: "./assets/gallery/wishcraft/10.webp", tag: "", caption: "Combat Skills Design" },
      { type: "image", src: "./assets/gallery/wishcraft/11.webp", tag: "",   caption: "Game Map" },
      { type: "image", src: "./assets/gallery/wishcraft/12.webp", tag: "", caption: "Game Map Design Progress" },
      { type: "image", src: "./assets/gallery/wishcraft/13.webp", tag: "",   caption: "Game Map High-Level View" },
      { type: "image", src: "./assets/gallery/wishcraft/14.webp", tag: "", caption: "Custom Design Weapon Texture" },
      { type: "image", src: "./assets/gallery/wishcraft/15.webp", tag: "",   caption: "Weapon Design Showcase" },
      { type: "image", src: "./assets/gallery/wishcraft/16.webp", tag: "", caption: "Skills Icon Design Showcase" },
      { type: "image", src: "./assets/gallery/wishcraft/17.webp", tag: "",   caption: "Monster/Boss Design Showcase" },
      { type: "image", src: "./assets/gallery/wishcraft/18.webp", tag: "", caption: "Game Interface Showcase" },
    ],
  },

  {
    id: "petmatch",
    name: "PetMatch",
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
      { type: "image", src: "./assets/gallery/petmatch/01.webp", tag: "",  caption: "Main Interface" },
    ],
  },
    {
    id: "candy",
    name: "Revenge Recipe",
    period: "2024",
    oneLiner: "A Unity Candy-themed RPG Game Practice",
    responsibilities: [
      "Designed the candy-theme map and the terrain layout design within 1 week.",
      "Designed the character model and the monster model.",
      "Developed the quest system, game flow, and boss fight logic.",
    ],
    tech: ["Unity", "C#", "Blender"],
    links: {
      repo: "[Repo Link]",
      demo: "[Demo Video]",
      caseStudy: "[Case Study]",
      readme: "[Readme]"
    },
    screenshot: "./assets/screenshots/candy.png",
    gallery: [
      { type: "image", src: "./assets/gallery/candy/01.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/02.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/03.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/04.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/05.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/06.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/07.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/08.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/09.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/10.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/11.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/12.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/13.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/14.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/15.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/16.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/17.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/18.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/19.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/20.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/21.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/22.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/23.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/24.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/25.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/26.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/27.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/28.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/29.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/30.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/31.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/32.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/33.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/34.webp", tag: "",  caption: "Game Play Screenshots" },
      { type: "image", src: "./assets/gallery/candy/35.webp", tag: "",  caption: "Game Play Screenshots" },
    ],
  },
    {
    id: "unreal",
    name: "Unreal Island",
    period: "2024",
    oneLiner: "An Unreal Engine Auto-material Terrain Design Practice",
    responsibilities: [
          "Recreated an island environment by studying Sea of Thieves’ Smugglers Bay and translating the layout into a UE terrain blockout.",
          "Sculpted terrain and refined shoreline/cliff shapes to match the reference composition and improve readability from player viewpoints.",
          "Built a custom auto-material workflow for terrain texturing (slope/height-based blending) to reduce manual painting and keep materials consistent.",
          "Enabled Nanite where appropriate and tuned assets/materials for stable real-time rendering.",
          "Designed foliage placement (trees/grass) and adjusted density/LOD settings for performance-aware vegetation rendering.",
          "Iterated lighting and scene dressing to achieve a cohesive mood while keeping the project focused on terrain/material fundamentals."
    ],
    tech: ["Unreal Engine", "Landscape", "Auto-Materials", "Nanite", "Foliage"],
    links: {
      repo: "[Repo Link]",
      demo: "[Demo Video]",
      caseStudy: "[Case Study]",
      readme: "[Readme]"
    },
    screenshot: "./assets/screenshots/unreal.png",
    gallery: [
      { type: "image", src: "./assets/gallery/unreal/01.webp", tag: "",  caption: "Final Result Screenshots" },
      { type: "image", src: "./assets/gallery/unreal/02.webp", tag: "",  caption: "Development Progress" },
      { type: "image", src: "./assets/gallery/unreal/03.webp", tag: "",  caption: "Development Progress" },
      { type: "image", src: "./assets/gallery/unreal/04.webp", tag: "",  caption: "Development Progress" },
      { type: "image", src: "./assets/gallery/unreal/05.webp", tag: "",  caption: "Development Progress" },
      { type: "image", src: "./assets/gallery/unreal/06.webp", tag: "",  caption: "Development Progress" },
      { type: "image", src: "./assets/gallery/unreal/07.webp", tag: "",  caption: "Development Progress" },
      { type: "image", src: "./assets/gallery/unreal/08.webp", tag: "",  caption: "Development Progress" },
      { type: "image", src: "./assets/gallery/unreal/09.webp", tag: "",  caption: "Development Progress" },
      { type: "image", src: "./assets/gallery/unreal/10.webp", tag: "",  caption: "Development Progress" },
      { type: "image", src: "./assets/gallery/unreal/11.webp", tag: "",  caption: "Development Progress" },
      { type: "image", src: "./assets/gallery/unreal/12.webp", tag: "",  caption: "Development Progress" },
      { type: "image", src: "./assets/gallery/unreal/13.webp", tag: "",  caption: "Development Progress" },
      { type: "image", src: "./assets/gallery/unreal/14.webp", tag: "",  caption: "Development Progress" },
      { type: "image", src: "./assets/gallery/unreal/15.webp", tag: "",  caption: "Development Progress" },
      
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
