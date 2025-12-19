# Portfolio — Jason Wong (Wong Tsz Yeung)

This repository is a documentation-first portfolio for Junior/Graduate Software Engineer roles (primary) and Junior Sysadmin/DevOps roles (secondary).

Some past work cannot be shared as public source code (company/private work, incomplete repos, or missing historical code). In those cases, I provide **honest case studies**: what I built, responsibilities, architecture summaries, demo placeholders, and what I would improve next.

## Featured projects
1) WebAR Delivery (PolyU COMP Info Day)  
2) Unity/C# Internship (3CForge)  
3) WishCraft MMORPG Server Ops/Systems  
4) PetMatch (Full-stack practice)

---

## 1) WebAR Delivery (PolyU COMP Info Day)

### Problem
PolyU COMP Info Day needed an engaging, on-site experience that could scale to heavy foot traffic and run in a browser.

### What I built
A **Pokémon GO–style WebAR scavenger hunt** delivered in ~4 weeks, combining AR interaction with **location-based logic**.

### Technical highlights
- Real-time WebAR experience built with **Three.js + TypeScript + WebGL**
- Backend integration via **Firebase**
- Implemented core **AR engine** and **location-based logic**

### Challenges & how I handled them
- **Event-scale usage**: designed the experience to support high traffic during the event window  
- **Cross-device variability**: focused on robust in-browser behavior and practical delivery constraints

### What I would improve next
- Add a clearer “ops” view: runbook for event-day support and rollback steps
- Expand the technical write-up: architecture diagram + performance notes
- Publish a more complete demo package: **[Demo Video Coming Soon]** + curated screenshots

**Artifacts**
- Demo: **[Demo Video Coming Soon]**
- Screenshots: **[Screenshots Folder]**
- Case study: **[Case Study]**
- Code: **[Repo Link]** (documentation-first; availability depends on what can be shared)

---

## 2) Unity/C# Internship (3CForge)

### Problem
Build a driving-test route simulator with realistic rules and detections, and ship a demo-ready build under sprint constraints.

### What I built
A **1:1 geospatial 3D replica** of a Hong Kong driving-test route in Unity, with traffic-rule detections and supporting demo delivery.

### Technical highlights
- Implemented **70+ traffic-rule detection logics** in **C#**
- Shipped a demo-ready build under tight sprint constraints
- Produced **patch notes** and **technical documentation**
- Contributed to **VR-related work** (exposure)

### Challenges & how I handled them
- **Delivery under time pressure**: focused on stable core behavior + clear documentation for iteration
- **Rules complexity**: implemented detections as maintainable logic units and documented behaviors/edge cases in patch notes

### What I would improve next
- Add a public-friendly architecture write-up (rule detection system overview, data flow, extensibility)
- Build a small, non-proprietary “rules sandbox” to demonstrate patterns without sharing company code
- Replace placeholders with a recorded walkthrough: **[Demo Video]**

**Artifacts**
- Code: **[Request Access / Private Repo]** (no private company code published)
- Screenshots: **[Screenshots Folder]**
- Case study: **[Case Study]**
- Readme: **[Readme]**

---

## 3) Ops/Systems — WishCraft MMORPG Server (Minecraft engine)

### Problem
Operate a live multiplayer game server reliably and scale during peak load while maintaining gameplay functionality.

### What I built
An open-world MMORPG server on the Minecraft engine, with ongoing operations and scaling to support a real player community.

### Technical highlights
- Production debugging and operational support in a live environment
- Plugin/config maintenance for stability and maintainability
- **Multi-instance scaling and routing** to handle peak load

### Challenges & how I handled them
- **Peak load stability**: scaled instances and routed traffic to maintain playable performance
- **Production issues**: debugged live problems and iterated configurations to reduce recurrence

### What I would improve next
- Publish a clearer ops runbook: incident checklist, scaling playbook, and configuration structure
- Add an architecture diagram: instance layout + routing overview
- Curate “lessons learned” from production debugging into repeatable practices

**Measured outcomes**
- **7,000 unique registrations**
- **~150 concurrent players**

**Artifacts**
- Case study: **[Case Study]**
- Architecture notes: **[Architecture Notes]**
- Readme: **[Readme]**
- Code: (not published / varies by component)

---

## 4) PetMatch (Full-stack practice project)

### Problem
Practice full-stack delivery with an emphasis on reproducible setup and basic delivery workflow.

### What I built
A React + Node.js project with a Dockerized development environment and a basic CI workflow, with documented setup.

### Technical highlights
- **React** UI + **Node.js** backend
- **Dockerized dev environment** to simplify onboarding
- **Basic CI workflow** to support iteration
- Setup and workflow documentation

### Challenges & how I handled them
- **Environment consistency**: Dockerized the stack and wrote setup docs to reduce “works on my machine”
- **Iteration speed**: added CI basics to catch obvious breakages early

### What I would improve next
- Expand documentation: architecture diagram, API contracts, and deployment notes
- Improve feature completeness and polish before wider sharing
- Add a short demo walkthrough video

**Artifacts**
- Repo: **[Repo Link]**
- Readme: **[Readme]**
- Demo: **[Demo Video]**
- Screenshots: **[Screenshots Folder]**

---

## How I work
- **Documentation and release discipline**: I write technical docs and patch notes when shipping demo-ready builds (internship experience).
- **Performance and reliability awareness**: I’ve delivered systems that handled **2,000+ concurrent users** (WebAR event delivery) and operated a live server with peak load, including **multi-instance scaling and routing** (WishCraft).
- **Reproducible environments**: I use **Dockerized** dev setups and documented onboarding to reduce setup friction (PetMatch).
- **Iteration under constraints**: I prioritize stable, demoable milestones and clarify “what exists now vs what’s next” in READMEs and notes.
