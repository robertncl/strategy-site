/* Own the Weights — deck behavior
   - progress bar + slide counter
   - dot navigation + arrow keys
   - IntersectionObserver reveals
   - chart hover tooltips
   - title-slide PCB-trace canvas */

(() => {
  "use strict";

  const slides = Array.from(document.querySelectorAll(".slide"));
  const dotsNav = document.querySelector(".dots");
  const bar = document.querySelector(".progress__bar");
  const now = document.getElementById("slideNow");
  const total = document.getElementById("slideTotal");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  total.textContent = String(slides.length);

  /* ---------- dots ---------- */
  const dots = slides.map((s, i) => {
    const b = document.createElement("button");
    b.setAttribute("aria-label", `Go to slide ${i + 1}: ${s.dataset.label || ""}`);
    b.addEventListener("click", () => goTo(i));
    dotsNav.appendChild(b);
    return b;
  });

  let current = 0;
  function goTo(i) {
    const target = slides[Math.max(0, Math.min(slides.length - 1, i))];
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  }

  /* ---------- scroll spy + progress ---------- */
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        current = slides.indexOf(e.target);
        now.textContent = String(current + 1).padStart(2, "0");
        dots.forEach((d, i) => d.classList.toggle("on", i === current));
      });
    },
    { threshold: 0.55 }
  );
  slides.forEach((s) => spy.observe(s));

  addEventListener(
    "scroll",
    () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = `${(scrollY / max) * 100}%`;
    },
    { passive: true }
  );

  /* ---------- keyboard ---------- */
  addEventListener("keydown", (e) => {
    if (e.target.matches("input, textarea")) return;
    if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)) {
      e.preventDefault();
      goTo(current + 1);
    } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
      e.preventDefault();
      goTo(current - 1);
    } else if (e.key === "Home") {
      goTo(0);
    } else if (e.key === "End") {
      goTo(slides.length - 1);
    }
  });

  /* ---------- reveals ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if (reduced) {
    reveals.forEach((el) => el.classList.add("in"));
  } else {
    const revObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            revObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    reveals.forEach((el) => revObs.observe(el));
  }

  /* ---------- chart tooltips ---------- */
  const tip = document.getElementById("tooltip");
  document.querySelectorAll("[data-tip]").forEach((el) => {
    el.addEventListener("pointerenter", () => {
      const [head, body] = el.dataset.tip.split("|");
      tip.innerHTML = "";
      const b = document.createElement("b");
      b.textContent = head;
      tip.append(b, document.createTextNode(body));
      tip.classList.add("show");
    });
    el.addEventListener("pointermove", (e) => {
      const pad = 14;
      const w = tip.offsetWidth, h = tip.offsetHeight;
      let x = e.clientX + pad, y = e.clientY + pad;
      if (x + w > innerWidth - 8) x = e.clientX - w - pad;
      if (y + h > innerHeight - 8) y = e.clientY - h - pad;
      tip.style.left = `${x}px`;
      tip.style.top = `${y}px`;
    });
    el.addEventListener("pointerleave", () => tip.classList.remove("show"));
  });

  /* ---------- title canvas: drifting copper traces on a dot grid ---------- */
  const canvas = document.getElementById("traces");
  if (canvas && !reduced) {
    const ctx = canvas.getContext("2d");
    const GRID = 44;
    let W, H, cols, rows, traces;

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = rect.width; H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(W / GRID);
      rows = Math.ceil(H / GRID);
      traces = Array.from({ length: 7 }, newTrace);
    }

    // A trace walks the grid orthogonally (with 45° corners implied by short
    // diagonal steps), glowing head + fading tail — a live PCB route.
    function newTrace() {
      return {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows),
        dir: Math.random() < 0.5 ? [1, 0] : [0, 1],
        path: [],
        life: 40 + Math.random() * 80,
        speed: 0.02 + Math.random() * 0.03,
        t: 0,
      };
    }

    function step(tr) {
      tr.t += tr.speed;
      if (tr.t < 1) return;
      tr.t = 0;
      tr.path.push([tr.x, tr.y]);
      if (tr.path.length > 26) tr.path.shift();
      if (Math.random() < 0.22) {
        tr.dir = tr.dir[0] !== 0
          ? [0, Math.random() < 0.5 ? 1 : -1]
          : [Math.random() < 0.5 ? 1 : -1, 0];
      }
      tr.x += tr.dir[0];
      tr.y += tr.dir[1];
      tr.life -= 1;
      if (tr.life <= 0 || tr.x < 0 || tr.y < 0 || tr.x > cols || tr.y > rows) {
        Object.assign(tr, newTrace());
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      // dot grid
      ctx.fillStyle = "rgba(233,237,242,0.05)";
      for (let cx = 0; cx <= cols; cx++) {
        for (let cy = 0; cy <= rows; cy++) {
          ctx.fillRect(cx * GRID - 1, cy * GRID - 1, 2, 2);
        }
      }
      // traces
      traces.forEach((tr) => {
        step(tr);
        const pts = tr.path.concat([[tr.x, tr.y]]);
        for (let i = 1; i < pts.length; i++) {
          const a = (i / pts.length) * 0.35;
          ctx.strokeStyle = `rgba(201,124,57,${a})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(pts[i - 1][0] * GRID, pts[i - 1][1] * GRID);
          ctx.lineTo(pts[i][0] * GRID, pts[i][1] * GRID);
          ctx.stroke();
        }
        const head = pts[pts.length - 1];
        ctx.fillStyle = "rgba(224,154,88,0.8)";
        ctx.fillRect(head[0] * GRID - 2, head[1] * GRID - 2, 4, 4);
      });
      if (onScreen) requestAnimationFrame(draw);
    }

    // Pause the loop when the title slide scrolls away.
    let onScreen = false;
    new IntersectionObserver(([e]) => {
      const was = onScreen;
      onScreen = e.isIntersecting;
      if (onScreen && !was) requestAnimationFrame(draw);
    }).observe(canvas);

    addEventListener("resize", resize, { passive: true });
    resize();
  }
})();
