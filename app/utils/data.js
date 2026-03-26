// ═══════════════════════════════════════════════════
// All portfolio data — skills, projects, toolkit, trainer info
// ═══════════════════════════════════════════════════

export const skills = [
  { id: '001', name: 'MONGODB', type: 'PSYCHIC', sprite: '🍃', flavor: 'NoSQL database for flexible, schema-less data storage.', stats: { hp: 75, atk: 60, def: 65, spAtk: 90, spDef: 70, speed: 80 } },
  { id: '002', name: 'EXPRESS.JS', type: 'NORMAL', sprite: '🚂', flavor: 'Fast, unopinionated web framework that forms the backend routing backbone.', stats: { hp: 70, atk: 65, def: 60, spAtk: 80, spDef: 65, speed: 90 } },
  { id: '003', name: 'REACT.JS', type: 'FIRE', sprite: '⚛️', flavor: 'Component-driven frontend library for building highly dynamic user interfaces.', stats: { hp: 80, atk: 70, def: 65, spAtk: 95, spDef: 75, speed: 88 } },
  { id: '004', name: 'NODE.JS', type: 'WATER', sprite: '🟩', flavor: 'Server-side JavaScript runtime powering scalable and fast backend services.', stats: { hp: 85, atk: 75, def: 70, spAtk: 85, spDef: 70, speed: 92 } },
  { id: '005', name: 'C', type: 'STEEL', sprite: '⚙️', flavor: 'The grandfather of modern languages. Offers raw memory control and extreme efficiency.', stats: { hp: 60, atk: 95, def: 90, spAtk: 70, spDef: 80, speed: 95 } },
  { id: '006', name: 'C++', type: 'STEEL', type2: 'FIGHTING', sprite: '🗡️', flavor: 'Object-oriented power designed for performance-critical logic.', stats: { hp: 65, atk: 100, def: 85, spAtk: 80, spDef: 75, speed: 90 } },
  { id: '007', name: 'C#', type: 'STEEL', type2: 'PSYCHIC', sprite: '🔷', flavor: 'Versatile and strongly typed, perfect for enterprise solutions and game development.', stats: { hp: 75, atk: 85, def: 80, spAtk: 88, spDef: 85, speed: 78 } },
  { id: '008', name: 'JAVA', type: 'GROUND', sprite: '☕', flavor: 'Write once, run anywhere. The heavyweight champion of robust architecture.', stats: { hp: 90, atk: 80, def: 85, spAtk: 82, spDef: 88, speed: 65 } },
  { id: '009', name: 'JAVASCRIPT', type: 'ELECTRIC', sprite: '⚡', flavor: 'The spark that powers the interactive web. Fast, chaotic, and essential.', stats: { hp: 78, atk: 85, def: 60, spAtk: 92, spDef: 65, speed: 98 } },
  { id: '010', name: 'PYTHON', type: 'GRASS', type2: 'POISON', sprite: '🐍', flavor: 'Clean syntax for rapid scripting, automation, and backend logic.', stats: { hp: 82, atk: 70, def: 65, spAtk: 95, spDef: 75, speed: 72 } },
  { id: '011', name: 'TYPESCRIPT', type: 'ROCK', sprite: '🪨', flavor: 'Catches bugs before they hatch with strict, reliable type safety.', stats: { hp: 80, atk: 78, def: 90, spAtk: 88, spDef: 92, speed: 70 } },
  { id: '012', name: 'POSTGRESQL', type: 'GROUND', type2: 'WATER', sprite: '🐘', flavor: 'The steadfast titan of relational databases. Handles complex joins effortlessly.', stats: { hp: 95, atk: 70, def: 90, spAtk: 85, spDef: 88, speed: 60 } },
  { id: '013', name: 'MYSQL', type: 'WATER', sprite: '🐬', flavor: 'Reliable and widely used open-source relational database management.', stats: { hp: 88, atk: 65, def: 85, spAtk: 80, spDef: 82, speed: 68 } },
  { id: '014', name: 'NEXT.JS', type: 'DRAGON', sprite: '🐉', flavor: 'The ultimate React framework for production-grade applications.', stats: { hp: 90, atk: 85, def: 80, spAtk: 98, spDef: 85, speed: 88 } },
  { id: '015', name: 'HTML5', type: 'NORMAL', sprite: '🧱', flavor: 'The structural skeleton and absolute foundation of the internet.', stats: { hp: 70, atk: 50, def: 75, spAtk: 60, spDef: 65, speed: 55 } },
  { id: '016', name: 'CSS3', type: 'FAIRY', sprite: '🎨', flavor: 'Bringing style, grid layouts, and smooth animations to the browser.', stats: { hp: 68, atk: 55, def: 70, spAtk: 88, spDef: 72, speed: 78 } },
  { id: '017', name: 'PHP', type: 'BUG', sprite: '🐘', flavor: 'Classic server-side scripting that continues to power a massive chunk of the web.', stats: { hp: 72, atk: 60, def: 65, spAtk: 75, spDef: 68, speed: 70 } },
  { id: '018', name: 'RUST', type: 'DRAGON', type2: 'STEEL', sprite: '🦀', flavor: 'Memory-safe systems programming that runs blazingly fast.', stats: { hp: 70, atk: 98, def: 95, spAtk: 85, spDef: 92, speed: 98 } },
];

export const projects = [
  {
    name: 'LEVELERS',
    species: 'COLLAB PLATFORM',
    level: 45,
    hp: { current: 142, max: 142 },
    type: 'ELECTRIC',
    type2: 'STEEL',
    status: 'OK',
    held: 'NEXT.JS + AZURE',
    ot: 'ATHARVA',
    idNo: '2028',
    moves: [
      { name: 'BRIDGE GAP', type: 'NORMAL', pp: 'Freelancers & SMEs', power: 90 },
      { name: 'AZURE DEPLOY', type: 'FLYING', pp: 'Cloud Host', power: 85 },
      { name: 'POSTGRES SYNC', type: 'GROUND', pp: 'Data Store', power: 88 },
    ],
    flavor: 'Developed a digital platform designed to bridge the gap between freelancers and Small & Medium Enterprises (SMEs). Enabled SMEs to boost their digital presence.'
  },
  {
    name: 'FUNDORA APP',
    species: 'STARTUP COLLAB',
    level: 42,
    hp: { current: 130, max: 130 },
    type: 'WATER',
    type2: 'PSYCHIC',
    status: 'OK',
    held: 'FRONTEND + BACKEND',
    ot: 'ATHARVA',
    idNo: '2026',
    moves: [
      { name: 'API INTEGRATE', type: 'ELECTRIC', pp: 'Fullstack', power: 88 },
      { name: 'INVESTOR MATCH', type: 'NORMAL', pp: 'Startups', power: 92 },
    ],
    flavor: 'A collaboration platform for startups and investors. Operating as a Fullstack SDE to seamlessly integrate complex backend logic with the frontend.'
  },
  {
    name: 'CSI-VIT PORTAL',
    species: 'COLLEGE WEBSITE',
    level: 35,
    hp: { current: 105, max: 105 },
    type: 'FAIRY',
    status: 'OK',
    held: 'REACT',
    ot: 'ATHARVA',
    idNo: '2025',
    moves: [
      { name: 'LANDING PAGE', type: 'WATER', pp: 'Event specific', power: 85 },
      { name: 'UI DESIGN', type: 'FAIRY', pp: 'High engagement', power: 90 },
    ],
    flavor: 'Served as a key Frontend Developer for the committee\'s official website and event-specific landing pages.'
  },
  {
    name: 'CESA-VIT PORTAL',
    species: 'COLLEGE WEBSITE',
    level: 35,
    hp: { current: 100, max: 100 },
    type: 'NORMAL',
    status: 'OK',
    held: 'WEB TECH',
    ot: 'ATHARVA',
    idNo: '2025',
    moves: [
      { name: 'ADMIN DASH', type: 'STEEL', pp: 'Management', power: 80 },
      { name: 'CORP EVENT UI', type: 'PSYCHIC', pp: 'Planning', power: 85 },
    ],
    flavor: 'Developed the official college committee website for the Computer Engineering Students Association to streamline events and administrative tasks.'
  }
];

export const toolkit = {
  items: [
    { name: 'VS CODE', desc: 'The command center. Heavy keybindings and essential extensions.', qty: '∞' },
    { name: 'NEOVIM', desc: 'For editing code blazingly fast without ever touching the mouse.', qty: '∞' },
    { name: 'FIGMA', desc: 'Where the UI/UX magic happens before a single line of code is written.', qty: '∞' },
    { name: 'POSTMAN', desc: 'Testing API endpoints relentlessly until they behave perfectly.', qty: '∞' },
    { name: 'GIT', desc: 'Time travel for code. Branching, rebasing, and merging workflows.', qty: '∞' },
    { name: 'GITHUB', desc: 'The multiplayer server for open-source and personal repositories.', qty: '∞' },
    { name: 'ECLIPSE', desc: 'The classic, heavy-duty IDE environment.', qty: '∞' },
    { name: 'DOCKER', desc: 'Shipping "it works on my machine" securely to production environments.', qty: '∞' },
  ],
  keyItems: [
    { name: 'MECHANICAL KEYBOARD', desc: 'Loud clicks, high APM (Actions Per Minute). Essential for deep focus.', qty: '1' },
    { name: 'CAFFEINE ELIXIR', desc: 'Restores developer HP during late-night deployments. Flavored like a white energy drink.', qty: '99' },
    { name: 'SPOTIFY PREMIUM', desc: 'Blocks out distractions. The official soundtrack for entering the flow state.', qty: '1' },
    { name: 'RUBBER DUCK', desc: 'The ultimate debugging companion. Explaining code to it solves 90% of issues.', qty: '1' },
    { name: 'DEVTOOLS LENS', desc: 'Allows the user to see the hidden DOM structure and network requests of the web.', qty: '1' },
  ],
  berries: [
    { name: 'CONSTRUCTIVE CRITIQUE', desc: 'Instantly spots bugs or design flaws and suggests clean, actionable fixes.', qty: '★' },
    { name: 'ADAPTABILITY', desc: 'Allows the user to shape-shift and pick up entirely new tech stacks rapidly.', qty: '★' },
    { name: 'CREATIVE PROBLEM SOLVING', desc: 'Thinking outside the div when standard algorithms just won\'t cut it.', qty: '★' },
    { name: 'UNYIELDING POSITIVITY', desc: 'Prevents the "Burnout" status condition, keeping morale high across the team.', qty: '★' },
  ],
  pokeBalls: [
    { name: 'VITE BALL', desc: 'A blazing fast ball that skips the bundling phase to capture projects instantly.', qty: '15' },
    { name: 'GIT BALL', desc: 'Commit-ready ball that tracks every version of the capture history.', qty: '24' },
    { name: 'DOCKER BALL', desc: 'Wraps the target in a secure container, ensuring it runs the same on any OS.', qty: '8' },
    { name: 'PRODUCTION BALL', desc: 'Guaranteed success, but only if you have the environment variables correctly configured.', qty: '1' },
    { name: 'LEGACY BALL', desc: 'Specifically designed to handle unstable, ancient codebases from the 90s.', qty: '5' },
  ],
  tms: [
    { name: 'TM01: HOT RELOAD', desc: 'Updates the UI state instantly without needing to refresh the entire project.', qty: '∞' },
    { name: 'TM02: ASYNC/AWAIT', desc: 'Prevents the main thread from blocking while waiting for external data to resolve.', qty: '∞' },
    { name: 'TM03: UNIT TEST', desc: 'Validates that every component of the logic behaves exactly as expected.', qty: '∞' },
    { name: 'HM01: REFACTOR (CUT)', desc: 'Clears out dead code and bloated branches to make the path more readable.', qty: '1' },
    { name: 'HM02: DEPLOY (FLY)', desc: 'Instantly transports the local codebase to the production cloud environment.', qty: '1' },
    { name: 'HM03: CRAWL (SURF)', desc: 'Allows the team to navigate deep through HTML trees to find hidden data.', qty: '1' },
  ],
};

export const trainerInfo = {
  name: 'ATHARVA SHERAMKAR',
  idNo: '2028',
  money: '@ SDE INTERN & FULLSTACK DEV',
  pokedex: skills.length,
  time: '99:99',
  badges: [
    { name: 'Startup Badge', desc: 'Fullstack SDE at Fundora', earned: true },
    { name: 'Committee Badge', desc: 'Web Dev for CSI-VIT & CESA-VIT', earned: true },
    { name: 'Platform Badge', desc: 'Developed the Levelers platform', earned: true },
    { name: 'Vidyalankar Badge', desc: 'Batch of 2028 Computer Engineering', earned: false },
  ],
  bio: 'Ambitious Computer Engineering undergraduate (Batch of 2028) with a strong foundation in software development. Gamer, tech enthusiast, and full-stack developer passionate about building scalable digital solutions.',
  links: {
    github: 'https://github.com/UnstableBlob',
    linkedin: 'https://www.linkedin.com/in/atharva-sheramkar-93a930351',
    email: 'atharva20453@gmail.com',
  },
};