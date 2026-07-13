import { useState, useEffect } from "react";
import logo from "./assets/logo.jpg";

/* ── Configuración ──────────────────────────────────────── */
const APP = {
  name: "Legales",
  fullName: "Sistema de Gestión Integral Legal",
  tagline: "El estudio jurídico, ordenado.",
  description:
    "Clientes, expedientes, pagos y agenda en una sola app Android. Sin hojas de cálculo, sin fechas olvidadas.",
  version: "1.0.0",
  size: "99 MB",
  minAndroid: "Android 8.0+",
  // El APK vive en /public/sgil.apk — se sube desde el proyecto, no desde la web
  apkUrl: "https://github.com/Dvid23/Legales/releases/download/v1.0.0/Legales.apk",
  about: {
    who: "Somos un estudio jurídico con más de una década de trayectoria, especializado en derecho civil, laboral y corporativo. Atendemos cada caso con el mismo rigor: seguimiento cercano, plazos claros y comunicación constante con el cliente.",
    what: "Nos dedicamos a representar y asesorar a nuestros clientes en cada etapa de su proceso legal. Con Legales, digitalizamos esa gestión: expedientes, pagos y agenda quedan centralizados, para que ningún caso ni ninguna fecha se pierdan en el camino.",
  },
  modules: [
    {
      id: "clientes",
      title: "Clientes y expedientes",
      body: "Registra clientes con DNI único y asocia cada expediente a su cliente, con tipo de caso, juzgado y estado. Búsqueda por DNI o por juzgado.",
    },
    {
      id: "pagos",
      title: "Control de pagos",
      body: "Asigna honorarios al expediente y registra pagos parciales o completos. El saldo pendiente se recalcula solo y el estado cambia entre pagado, pendiente y en mora.",
    },
    {
      id: "agenda",
      title: "Agenda legal",
      body: "Audiencias, declaraciones y reuniones en un calendario ligado al expediente, con recordatorios automáticos antes de cada evento y sincronización con Google Calendar.",
    },
    {
      id: "reportes",
      title: "Reportes y auditoría",
      body: "Reportes de cobranza por cliente o por periodo, con montos pendientes y pagados. Cada operación queda registrada con el usuario, la acción y la fecha.",
    },
  ],
};
/* ───────────────────────────────────────────────────────── */

export default function App() {
  const [active, setActive] = useState("clientes");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    APP.modules.forEach((m) => {
      const el = document.getElementById(m.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <div className="page">
      <style>{CSS}</style>

      <header className="nav">
        <a className="brand" href="#top">
          <img src={logo} alt="" className="logo" />
          <span className="brandtext">
            <strong>{APP.name}</strong>
            <em>{APP.fullName}</em>
          </span>
        </a>

        <nav className="links" aria-label="Secciones">
          {APP.modules.map((m) => (
            <button
              key={m.id}
              className={active === m.id ? "on" : ""}
              onClick={() => go(m.id)}
            >
              {m.title.split(" ")[0]}
            </button>
          ))}
        </nav>

        <a className="btn nav-btn" href={APP.apkUrl} download>
          Descargar
        </a>
      </header>

      <main id="top">
        <section className="hero">
          <p className="eyebrow">Android · {APP.minAndroid}</p>
          <h1>{APP.tagline}</h1>
          <p className="lead">{APP.description}</p>

          <div className="actions">
            <a className="btn primary" href={APP.apkUrl} download>
              Descargar APK
            </a>
            <span className="meta">
              v{APP.version} · {APP.size} · {APP.minAndroid}
            </span>
          </div>
        </section>

        <section className="about">
          <div className="about-col">
            <span className="about-label">Quiénes somos</span>
            <p>{APP.about.who}</p>
          </div>
          <div className="about-col">
            <span className="about-label">A qué nos dedicamos</span>
            <p>{APP.about.what}</p>
          </div>
        </section>

        <section className="ficha" aria-label="Ficha técnica">
          {[
            ["versión", APP.version],
            ["tamaño", APP.size],
            ["mínimo", APP.minAndroid],
            ["formato", "APK"],
          ].map(([k, v]) => (
            <div className="cell" key={k}>
              <span className="k">{k}</span>
              <span className="v">{v}</span>
            </div>
          ))}
        </section>

        <section className="modules">
          {APP.modules.map((m, i) => (
            <article key={m.id} id={m.id} className={active === m.id ? "mod on" : "mod"}>
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2>{m.title}</h2>
                <p>{m.body}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="install">
          <h2 className="title">Cómo instalarla</h2>
          <ol>
            <li>Descarga el archivo <code>legales.apk</code> desde el botón de arriba.</li>
            <li>Abre el archivo desde tus descargas.</li>
            <li>Si Android lo pide, permite la instalación desde orígenes desconocidos.</li>
            <li>Confirma la instalación y abre la app.</li>
          </ol>
        </section>
      </main>

      <footer>
        <span>{APP.fullName}</span>
        <span>Universidad Privada Antenor Orrego · Grupo 4 · {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');

*{box-sizing:border-box;margin:0}
html{scroll-behavior:smooth}
:root{
  --ink:#141A21;        /* tinta */
  --paper:#F7F5F0;      /* papel legal */
  --panel:#FFFFFF;
  --line:#DCD7CC;
  --dim:#6B6459;
  --accent:#8B2635;     /* granate, sello notarial */
  --accent-soft:#F2E4E6;
}
.page{min-height:100dvh;background:var(--paper);color:var(--ink);
  font-family:'Inter',system-ui,sans-serif;line-height:1.55;
  display:flex;flex-direction:column}

/* NAV */
.nav{position:sticky;top:0;z-index:20;background:rgba(247,245,240,.9);
  backdrop-filter:blur(10px);border-bottom:1px solid var(--line);
  display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:1rem;
  padding:.75rem clamp(1rem,5vw,3rem)}
.brand{display:flex;align-items:center;gap:.7rem;text-decoration:none;color:inherit}
.logo{width:36px;height:36px;border-radius:8px;object-fit:cover;
  border:1px solid var(--line)}
.brandtext{display:flex;flex-direction:column;line-height:1.2}
.brandtext strong{font-family:'Fraunces',serif;font-size:1.05rem;letter-spacing:.02em}
.brandtext em{font-style:normal;font-size:.68rem;color:var(--dim)}
.links{display:flex;gap:.25rem;justify-self:center}
.links button{background:none;border:0;cursor:pointer;color:var(--dim);
  font:inherit;font-size:.85rem;padding:.4rem .7rem;border-radius:6px;transition:.15s}
.links button:hover{color:var(--ink);background:#EFEBE3}
.links button.on{color:var(--accent);background:var(--accent-soft);font-weight:600}
.nav-btn{padding:.5rem 1.05rem;font-size:.85rem;background:var(--ink);color:var(--paper);
  justify-self:end}

main{width:min(880px,92vw);margin:0 auto;flex:1;
  padding:clamp(3rem,8vw,6rem) 0;display:flex;flex-direction:column;
  gap:clamp(3.5rem,8vw,6rem)}

/* HERO */
.eyebrow{font-family:'JetBrains Mono',monospace;font-size:.72rem;
  text-transform:uppercase;letter-spacing:.16em;color:var(--accent);margin-bottom:1.1rem}
h1{font-family:'Fraunces',Georgia,serif;font-weight:600;
  font-size:clamp(2.4rem,7vw,4.2rem);line-height:1.02;letter-spacing:-.025em;max-width:13ch}
.lead{color:var(--dim);font-size:clamp(1rem,2.3vw,1.15rem);max-width:52ch;margin-top:1.35rem}
.actions{display:flex;flex-wrap:wrap;align-items:center;gap:1.15rem;margin-top:2.25rem}
.btn{display:inline-block;border-radius:999px;font-weight:600;
  text-decoration:none;transition:transform .16s,box-shadow .16s}
.btn:hover{transform:translateY(-2px)}
.primary{background:var(--accent);color:#fff;padding:.9rem 1.9rem;font-size:.98rem;
  box-shadow:0 4px 16px rgba(139,38,53,.22)}
.primary:hover{box-shadow:0 8px 24px rgba(139,38,53,.3)}
.meta{color:var(--dim);font-size:.85rem;font-family:'JetBrains Mono',monospace}

/* ABOUT */
.about{display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;
  padding:1.75rem 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.about-label{display:block;font-family:'JetBrains Mono',monospace;font-size:.7rem;
  text-transform:uppercase;letter-spacing:.12em;color:var(--accent);margin-bottom:.6rem}
.about p{color:var(--dim);font-size:.95rem;max-width:42ch}

/* FICHA */
.ficha{display:grid;grid-template-columns:repeat(4,1fr);background:var(--panel);
  border:1px solid var(--line);border-radius:12px;overflow:hidden}
.cell{padding:1.1rem 1.3rem;border-right:1px solid var(--line);
  display:flex;flex-direction:column;gap:.3rem}
.cell:last-child{border-right:0}
.k{font-family:'JetBrains Mono',monospace;font-size:.66rem;
  text-transform:uppercase;letter-spacing:.12em;color:var(--dim)}
.v{font-weight:600;font-size:.95rem;font-variant-numeric:tabular-nums}

/* MÓDULOS */
.modules{display:flex;flex-direction:column;gap:.5rem}
.mod{display:flex;gap:1.5rem;padding:1.6rem 1.4rem;border-radius:12px;
  border-left:2px solid transparent;transition:.25s;scroll-margin-top:6rem}
.mod.on{background:var(--panel);border-left-color:var(--accent)}
.num{font-family:'JetBrains Mono',monospace;font-size:.75rem;color:var(--dim);
  padding-top:.3rem;flex-shrink:0}
.mod.on .num{color:var(--accent)}
.mod h2{font-family:'Fraunces',serif;font-size:1.2rem;font-weight:600;
  letter-spacing:-.01em;margin-bottom:.4rem}
.mod p{color:var(--dim);font-size:.93rem;max-width:60ch}

/* INSTALL */
.title{font-family:'Fraunces',serif;font-size:1.5rem;font-weight:600;margin-bottom:1.2rem}
.install ol{padding-left:1.2rem;color:var(--dim);display:flex;flex-direction:column;gap:.55rem}
.install li{font-size:.93rem;padding-left:.35rem}
.install li::marker{color:var(--accent);font-weight:600}
code{font-family:'JetBrains Mono',monospace;background:#EDE9E1;
  padding:.1rem .38rem;border-radius:4px;font-size:.88em}

footer{border-top:1px solid var(--line);padding:1.75rem clamp(1rem,5vw,3rem);
  color:var(--dim);font-size:.8rem;display:flex;justify-content:space-between;
  flex-wrap:wrap;gap:.75rem}

:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:4px}

@media(max-width:820px){
  .nav{grid-template-columns:1fr auto}
  .links{display:none}
  .nav-btn{grid-column:2}
  .about{grid-template-columns:1fr;gap:1.5rem}
  .ficha{grid-template-columns:repeat(2,1fr)}
  .cell:nth-child(2){border-right:0}
  .cell:nth-child(-n+2){border-bottom:1px solid var(--line)}
  .mod{gap:1rem;padding:1.3rem 1rem}
  footer{flex-direction:column}
}
@media(prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *{transition:none!important}
}
`;
