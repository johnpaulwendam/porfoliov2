// Edit this file with your real details. Used as fallback when Supabase is not set up.
export const PROFILE = {
  name: "John Paul Wendam",
  role: "FRONT END DEVELOPER",
  location: "Iloilo City, Philippines",
  email: "johnpaulbalquin52@gmail.com",
  phone: "09613978302",
  resume: "#",
  initials: "JP",
};

export const STACK = {
  Languages: ["JavaScript", "HTML5", "CSS3"],
  Frontend: ["React"],
  "Backend & Database": ["Supabase", "PostgreSQL", "Row Level Security"],
  "Auth & Tools": ["Supabase Auth", "GitHub", "VS Code", "Figma"],
};
export const PROJECTS = [
  {
    id: 1, title: "MeenteLog", description: "A website for the students.",
    tags: ["React", "JavaScript", "Supabase"], color: "#e8742a",
    image: "/projects/meentelog.png",
    live_url: "https://your-meentelog-link.vercel.app",
   live_label: "View Design",
  },
  {
    id: 2, title: "KOMUN", description: "A website for appointing on barangays.",
    tags: ["Figma"], color: "#3b82f6",
    image: "src/kumon.png",
    live_url: "https://www.figma.com/proto/072lBfrmS3zuCY87Lv116u/Wireframing-Prototyping?node-id=305-359&starting-point-node-id=305%3A338",
    live_label: "View Design",
  },
  {
    id: 3, title: "Product", description: "An advertisement product.",
    tags: ["Figma"], color: "#8b5cf6",
    image: "src/product.png",
    live_url: "https://www.figma.com/design/v6sWHM7eSkbLLTkaLG6IoD/FIle-1?node-id=3-2&p=f&t=W2xWLI6ID7muOOTg-0",
    live_label: "View Design",
  },
  {
    id: 5, title: "My Portfolio", description: "My own compilation of past projects I've done.",
    tags: ["React", "JavaScript", "Supabase"], color: "#f59e0b",
    image: "src/porfolio.png",
    live_url: "https://your-portfolio.vercel.app",
    live_label: "View Design",
  },
];

export const CERTS = [
  { id: 1, title: "", details: "", link: "#" },
  { id: 2, title: "", details: "", link: "#" },
  { id: 3, title: "", details: "", link: "#" },
];

export const ANSWERS = [
  [/skill|stack|tech|language/, "I build with JavaScript, React, and Supabase (PostgreSQL and Auth)."],
  [/project|built|work/, "Featured projects: MeenteLog, KOMUN, Product, and My Portfolio."],
  [/intern|ojt|job|hire|role/, "I'm a 3rd-year IT student looking for an internship or junior developer role."],
  [/contact|email|reach/, "Use the Email Me button at the top or the Get In Touch section."],
  [/educ|school|study|degree/, "I study BS Information Technology. See the education timeline."],
];

