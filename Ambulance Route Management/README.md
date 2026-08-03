# Smart Ambulance Route Management & Traffic Clearance System

A modern, responsive, high-fidelity frontend prototype designed to reduce ambulance response time through intelligent emergency corridor routing, active road blockage reporting, and synchronized clearance coordination. This project is structured as a Software Engineering capstone prototype.

---

## 🚀 Key System Features

### 1. Unified Control Center (Hospital Dashboard)
- **Emergency Dispatcher**: Instantly create emergency calls with priority levels (Low, Medium, High, Critical).
- **Corridor Monitor**: Live SVG map simulator showcasing path guidelines and active GPS vehicle tracking.
- **Traffic Warnings Feed**: Real-time alerts of road blockages requiring traffic authority clearances.

### 2. Turn-by-Turn Mobile Console (Driver Dashboard)
- **Active Missions**: Immediate notifications on assigned emergencies with patient descriptions.
- **Trip Control Panel**: Status controls to transition routes (Accept, Start navigation, Complete assignment).
- **Incident Reporting Wizard**: Logging route blockages (Accident, Flood, Traffic) with severity and notes.

### 3. Priority Corridor Clearance (Traffic Police Dashboard)
- **Clearance Central**: Verification panel for reported incidents.
- **Corridor Override Actions**: Approve priority green wave corridors, reject false blockage alerts, or mark blockages cleared.
- **Map Command**: Displays live positions of hospitals, police squads, ambulances, and incidents.

### 4. Interactive Test & Verification Suite
- A dedicated **Testing Verification Suite** built into the Hospital Dashboard, automating and verifying 10 real-time synchronization test scenarios directly on the workspace state.

---

## 🛠️ Technology Stack

- **Core**: React.js (Component-based architecture)
- **Tooling & Dev Server**: Vite
- **Styling**: Modern HSL-Tailored CSS variables, glassmorphic navigations, responsive grid frameworks, and slide-in toast notifications.
- **Iconography**: Lucide React SVGs

---

## 📁 Workspace Architecture

```text
├── docs/                      # 12 System Modeling Diagrams
│   ├── structure_chart.png
│   ├── project_architecture.png
│   ├── system_architecture.png
│   ├── UseCaseDiagram.png
│   ├── SequenceDiagram.png
│   ├── ActivityDiagram.png
│   ├── ClassDiagram.png
│   ├── ERDiagram.png
│   ├── ComponentDiagram.png
│   ├── DeploymentDiagram.png
│   ├── DataFlowDiagram.png
│   └── testing_report.png
├── src/
│   ├── components/            # Reusable UI Blocks (Navbar, Sidebar, Maps, Charts)
│   ├── contexts/              # Centralized AppState synchronization provider
│   ├── pages/                 # Role-specific workspaces (Hospital, Driver, Police)
│   ├── App.jsx                # Layout Router & viewport dispatcher
│   └── index.css              # Style tokens, theme configuration & skeletons
├── index.html                 # Main entry point with SEO optimized tags
└── package.json               # System dependencies
```

---

## 💻 Running the Project Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 3. Production Build Compilation
To check and verify optimized production-ready bundle outputs:
```bash
npm run build
```
