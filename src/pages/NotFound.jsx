// import { Link } from "react-router-dom";

// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// import { useEffect } from "react";

// const NotFound = () => {

//   useEffect(() => {
//     let robots = document.head.querySelector(
//       'meta[name="robots"]'
//     );
  
//     if (!robots) {
//       robots = document.createElement("meta");
//       robots.setAttribute("name", "robots");
//       document.head.appendChild(robots);
//     }
  
//     robots.setAttribute(
//       "content",
//       "noindex, follow"
//     );
  
//     return () => {
//       robots.remove();
//     };
//   }, []);

//   return (
//     <>
//       <Navbar />

//       <main className="not-found-page">
//         <section className="not-found-content">
//           <p className="not-found-eyebrow">
//             BUSINESS PLAYBOOK
//           </p>

//           <h1>Page Not Found</h1>

//           <p>
//             The page you’re looking for doesn’t exist or may have
//             been moved.
//           </p>

//           <Link to="/">
//             Return to Business Playbook
//           </Link>
//         </section>
//       </main>

//       <Footer />
//     </>
//   );
// };

// export default NotFound;


import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "../styles/Notfound.css";
import OptimizedImage from "../components/OptimizedImage";
/* =========================================================
   STICK FIGURES

   These SVGs are loaded from the 21st.dev CDN. If you would
   rather not depend on a third-party host, download the six
   files into /public/images/404/ and replace each `src`
   with a local path such as "/images/404/runner-1.svg".
========================================================= */

const STICK_FIGURES = [
  {
    top: "0%",
    src: "https://cdn.21st.dev/assets/mirror/54/54f366bdbf75b7a2d3b9f2264c3ada12aefcaf6e6a467bcecc856ffcd686e52e.svg",
    transform: "rotateZ(-90deg)",
    speedX: 1500,
  },
  {
    top: "10%",
    src: "https://cdn.21st.dev/assets/mirror/7e/7e48603d6fd3fac9720b25b4b6a06d107feea2d21ef8fa0720921808b9808514.svg",
    speedX: 3000,
    speedRotation: 2000,
  },
  {
    top: "20%",
    src: "https://cdn.21st.dev/assets/mirror/4f/4fd3a604a36cc8811c341ef3221010ed11e2563d4add29901922d7464c28c186.svg",
    speedX: 5000,
    speedRotation: 1000,
  },
  {
    top: "25%",
    src: "https://cdn.21st.dev/assets/mirror/54/54f366bdbf75b7a2d3b9f2264c3ada12aefcaf6e6a467bcecc856ffcd686e52e.svg",
    speedX: 2500,
    speedRotation: 1500,
  },
  {
    top: "35%",
    src: "https://cdn.21st.dev/assets/mirror/54/54f366bdbf75b7a2d3b9f2264c3ada12aefcaf6e6a467bcecc856ffcd686e52e.svg",
    speedX: 2000,
    speedRotation: 300,
  },
  {
    bottom: "5%",
    src: "https://cdn.21st.dev/assets/mirror/66/668d66f4c4d1dbc5c421692b4e5ad644c0f11f0327da214bcae21f78816c6b2f.svg",
    speedX: 0, // stays in place
  },
];

/* =========================================================
   404 PAGE
========================================================= */

export default function NotFound() {
  const [finished, setFinished] = useState(false);

  // Visitors who ask their device to reduce motion get the
  // finished page straight away, without the animation.
  const [reduceMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      Boolean(
        window.matchMedia?.(
          "(prefers-reduced-motion: reduce)"
        ).matches
      )
  );

  /*
    SEO: a 404 page must never be indexed.
    The server already answers unknown URLs with HTTP 404;
    this adds the matching noindex tag and a proper title.
  */
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Page Not Found | Business Playbook";

    let robots = document.head.querySelector(
      'meta[name="robots"]'
    );

    const created = !robots;
    const previousContent = robots?.getAttribute("content");

    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }

    robots.setAttribute("content", "noindex, follow");

    return () => {
      document.title = previousTitle;

      if (created) {
        robots.remove();
      } else if (previousContent !== null) {
        robots.setAttribute("content", previousContent);
      }
    };
  }, []);

  const isFinished = finished || reduceMotion;

  return (
    <main
      className={`nf-page${isFinished ? " is-finished" : ""}`}
    >
      <MessageDisplay instant={reduceMotion} />

      {!reduceMotion && <CharactersAnimation />}

      {!reduceMotion && (
        <CircleAnimation
          onComplete={() => setFinished(true)}
        />
      )}
    </main>
  );
}

/* =========================================================
   1. MESSAGE
========================================================= */

function MessageDisplay({ instant }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, setVisible] = useState(instant);

  useEffect(() => {
    if (instant) return undefined;

    const timer = setTimeout(() => setVisible(true), 1200);

    return () => clearTimeout(timer);
  }, [instant]);

  // "default" means this was the first page the visitor opened,
  // so there is no earlier page of ours to go back to.
  const handleGoBack = () => {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="nf-message">
      <div
        className={`nf-message-inner${
          visible ? " is-visible" : ""
        }`}
      >
        <h1 className="nf-title">Page Not Found</h1>

        <p className="nf-code" aria-hidden="true">
          404
        </p>

        <p className="nf-text">
          The page you are looking for might have been
          removed, had its name changed, or is temporarily
          unavailable.
        </p>

        <div className="nf-actions">
          <button
            type="button"
            className="nf-btn"
            onClick={handleGoBack}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Go Back
          </button>

          <Link to="/" className="nf-btn nf-btn--solid">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Go Home
          </Link>

          <Link to="/books" className="nf-btn">
            Browse Books
          </Link>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   2. RUNNING STICK FIGURES
========================================================= */

function CharactersAnimation() {
  const containerRef = useRef(null);

  useEffect(() => {
    const figures = Array.from(
      containerRef.current?.children ?? []
    );

    const animations = [];

    figures.forEach((figure, index) => {
      const config = STICK_FIGURES[index];

      if (!config || config.speedX === 0) return;

      // Run across the screen, right to left.
      const move = figure.animate(
        [{ left: "100%" }, { left: "-20%" }],
        {
          duration: config.speedX,
          easing: "linear",
          fill: "forwards",
        }
      );

      animations.push(move);

      // Spin while running.
      let spin = null;

      if (config.speedRotation) {
        spin = figure.animate(
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(-360deg)" },
          ],
          {
            duration: config.speedRotation,
            iterations: Infinity,
            easing: "linear",
          }
        );

        animations.push(spin);
      }

      // Once a figure has left the screen, stop spending
      // CPU on it.
      move.finished
        .then(() => {
          spin?.cancel();
          figure.style.visibility = "hidden";
        })
        .catch(() => {
          /* animation was cancelled on unmount */
        });
    });

    return () => animations.forEach((a) => a.cancel());
  }, []);

  return (
    <div
      ref={containerRef}
      className="nf-characters"
      aria-hidden="true"
    >
      {STICK_FIGURES.map((figure, index) => (
        <OptimizedImage
          key={index}
          className="nf-character"
          src={figure.src}
          alt=""
          width={300}
          height={430}
          loading="lazy"
          draggable={false}
          sizes="(max-width: 600px) 40vw, 300px"
          style={{
            top: figure.top,
            bottom: figure.bottom,
            transform: figure.transform,
          }}
        />
      ))}
    </div>
  );
}

/* =========================================================
   3. WHITE CIRCLES SWEEPING IN
========================================================= */

function CircleAnimation({ onComplete }) {
  const canvasRef = useRef(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      onCompleteRef.current?.();
      return undefined;
    }

    let frameId = 0;
    let frame = 0;
    let circles = [];
    let finished = false;

    const setup = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      circles = Array.from({ length: 300 }, () => ({
        x:
          canvas.width * 1.2 +
          Math.random() * canvas.width * 1.8,
        y:
          -canvas.height * 0.2 +
          Math.random() * canvas.height * 1.2,
        size: canvas.width / 1000,
      }));
    };

    const draw = () => {
      frame += 1;

      const step = canvas.width / 80;
      const growth = canvas.width / 1000;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#fff";

      circles.forEach((circle) => {
        if (frame < 65) {
          circle.x -= step;
          circle.size += growth;
        } else if (frame > 65 && frame < 500) {
          circle.x -= step * 0.02;
          circle.size += growth * 0.2;
        }

        context.beginPath();
        context.arc(
          circle.x,
          circle.y,
          circle.size,
          0,
          Math.PI * 2
        );
        context.fill();
      });

      if (frame > 500) {
        finished = true;
        onCompleteRef.current?.();
        return;
      }

      frameId = requestAnimationFrame(draw);
    };

    const start = () => {
      cancelAnimationFrame(frameId);
      frame = 0;
      setup();
      draw();
    };

    const handleResize = () => {
      if (finished) {
        // The page is already fully white, nothing to replay.
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        return;
      }

      start();
    };

    start();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="nf-canvas"
      aria-hidden="true"
    />
  );
}