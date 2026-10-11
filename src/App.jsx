import { useEffect, useMemo, useState } from "react";
import { supabase } from "./supabase.js";
import { PROFILE, STACK, PROJECTS, CERTS, ANSWERS } from "./data.js";

const Rule = ({ top, children }) => <div className={"rule" + (top ? " top" : "")}>{children}</div>;

const Tags = ({ items = [] }) => (
  <div className="tags">
    {items.map((t) => <span className="tag" key={t}>{t}</span>)}
  </div>
);

import avatar from "./6199690888854835448.jpg";
function Hero({ light, setLight }) {
  return (
    <header className="hero">
      <div className="avatar-box">
        <div className="avatar">
          <img src={avatar} alt={`Photo of ${PROFILE.name}`} />
        </div>
        <span className="avatar-tag">● WIT Student</span>
      </div>
      <div>
        <h1>{PROFILE.name}</h1>
        <p className="role">{PROFILE.role}</p>
        <p className="loc">⚲ {PROFILE.location}</p>
        <a className="btn p" href={PROFILE.resume}>GET RESUME</a>
        <a className="btn" href={`mailto:${PROFILE.email}`}>EMAIL ME</a>
        <button className="tog" role="switch" aria-checked={light} aria-label="Light mode" onClick={() => setLight(!light)} />
      </div>
    </header>
  );
}

function About() {
  return (
    <section className="cols">
      <div className="panel">
        <h2>EXPERIENCE</h2>
        <ul className="tl">
          <li className="on"><b>BS Information Technology, 3rd Year</b><span>Current</span></li>
          <li><b></b><span></span></li>
          <li><b></b><span></span></li>
        </ul>
        <h2 style={{ marginTop: 20 }}>EDUCATION</h2>
        <ul className="tl">
          <li className="on"><b>BS Information Technology</b><span>Western Institute of Technology</span></li>
          <li><b>Senior High School</b><span>Barotac Viejo, National High School</span></li>
          <li><b>Elementary</b><span>Raul O.V. Causing Memorial School</span></li>
        </ul>
      </div>
      <div className="panel">
        <h2>ABOUT</h2>
        <p>I'm a third-year IT student who learns by building. I pick up new tools, break things, work out why, and keep going.</p>
        <p>I build with React, JavaScript, and Supabase because I can take an idea from interface to database on my own.</p>
        <p>I'm looking forward for more learnings in this field.</p>
        <h2 style={{ marginTop: 22 }}>TECH STACK</h2>
        {Object.entries(STACK).map(([k, v]) => (
          <div key={k}><div className="sub">{k.toUpperCase()}</div><Tags items={v} /></div>
        ))}
      </div>
    </section>
  );
}

const Projects = ({ items }) => (
  <section>
    {items.map((p) => (
      <article className="panel proj" key={p.id ?? p.title}>
        <div className="dev">
          <div className="lap" style={{ background: p.color }}>
            {p.image
              ? <img src={p.image} alt={`${p.title} preview`} />
              : <div className="scr"><s style={{ width: "50%" }} /><em /><s /></div>}
          </div>
        </div>
        <div>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <Tags items={p.tags} />
          {p.live_url && (
            <a className="lnk" href={p.live_url} target="_blank" rel="noreferrer">
              {p.live_label || "View Project"} ↗
            </a>
          )}
          {p.repo_url && (
            <a className="lnk" href={p.repo_url} target="_blank" rel="noreferrer"> ↗</a>
          )}
        </div>
      </article>
    ))}
  </section>
);

const Certs = ({ items }) => (
  <section>
    {items.map((c) => (
      <details key={c.id ?? c.title}>
        <summary>{c.title}</summary>
        <p>{c.details} {c.link && <a href={c.link}>Verify certificate</a>}</p>
      </details>
    ))}
  </section>
);

function Chat() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [msgs, setMsgs] = useState([{ t: "Hi! Ask me about my skills, projects, or experience." }]);

  const send = async (e) => {
    e.preventDefault();
    const text = q.trim();
    if (!text) return;
    const hit = ANSWERS.find(([re]) => re.test(text.toLowerCase()));
    setMsgs((m) => [...m, { t: text, u: true }, { t: hit ? hit[1] : "I can answer questions about skills, projects, education, and contact." }]);
    setQ("");
    if (supabase) {
      const { error } = await supabase.from("chat_logs").insert({ question: text.slice(0, 500) });
      if (error) console.error(error);
    }
  };

  return (
    <>
      {!open && <div id="hint">Hey there! Wanna chat?</div>}
      <button id="chatBtn" aria-label="Toggle chat" onClick={() => setOpen(!open)}>✉</button>
      <div id="chat" className={open ? "open" : ""} role="dialog" aria-label="Portfolio assistant">
        <div id="log">{msgs.map((m, i) => <div key={i} className={m.u ? "u" : ""}>{m.t}</div>)}</div>
        <form onSubmit={send}>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask a question" aria-label="Your question" autoComplete="off" />
          <button>Send</button>
        </form>
      </div>
    </>
  );
}

export default function App() {
  const [light, setLight] = useState(false);
  const [projects, setProjects] = useState(PROJECTS);
  const [certs, setCerts] = useState(CERTS);
  const [source, setSource] = useState("local data");

  useEffect(() => { document.documentElement.dataset.theme = light ? "light" : "dark"; }, [light]);

  useEffect(() => {
    if (!supabase) return;
    (async () => {
      const p = await supabase.from("projects").select("*").order("id");
      const c = await supabase.from("certifications").select("*").order("id");
      if (p.error || c.error) return console.error(p.error || c.error);
      if (p.data.length) setProjects(p.data);
      if (c.data.length) setCerts(c.data);
      setSource("Supabase");
    })();
  }, []);

  return (
    <div className="wrap">
      <Rule top>{PROFILE.name.toUpperCase()} || PORTFOLIO 2026</Rule>
      <Hero light={light} setLight={setLight} />
      <Rule>SCROLLING THROUGH CODE</Rule><About />
      <Rule>FEATURED PROJECTS</Rule><Projects items={projects} />
      <Rule>RECOGNITION &amp; CERTIFICATIONS</Rule><Certs items={certs} />
      <Rule>GET IN TOUCH</Rule>
      <section className="contact panel">
        <div><h2>FIND ME ON</h2>
            <a href="https://www.linkedin.com/in/john-paul-wendam-b727703b9/?isSelfProfile=true">LinkedIn</a>
            <a href="https://github.com/johnpaulwendam">GitHub</a>
            <a href="https://www.facebook.com/profile.php?id=100025273292223">Facebook</a></div>
        <div><h2>CONTACT</h2><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a><a href={`tel:${PROFILE.phone}`}>{PROFILE.phone}</a><a href="#">Messenger</a></div>
      </section>
      <footer>© 2026 {PROFILE.name}. Data source: {source}</footer>
      <Chat />
    </div>
  );
}
