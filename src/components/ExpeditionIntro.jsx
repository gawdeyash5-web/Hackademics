import { useState } from "react";

function ExpeditionIntro() {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        background:
          "linear-gradient(rgba(4,12,22,.92), rgba(2,8,16,.95))",
        backdropFilter: "blur(12px)",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 760,
          padding: 45,

          borderRadius: 24,

          background: "rgba(10,25,40,.72)",

          border: "1px solid rgba(120,220,255,.22)",

          boxShadow: "0 0 50px rgba(0,160,255,.25)",

          color: "white",

          fontFamily: "Inter, sans-serif",

          textAlign: "center",
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "#8BE6FF",
            fontSize: 48,
          }}
        >
          ABYSS
        </h1>

        <h2
          style={{
            marginTop: 12,
            color: "#DDF9FF",
          }}
        >
          Expedition Briefing
        </h2>

        <p
          style={{
            marginTop: 30,
            fontSize: 18,
            lineHeight: 1.8,
            opacity: .9,
          }}
        >
          Welcome aboard, Explorer.
          <br /><br />
          Navigate the submarine using your mouse and discover hidden
          marine life, shipwrecks and underwater cave systems.
        </p>

        <div
          style={{
            marginTop: 35,
            textAlign: "left",
            fontSize: 18,
            lineHeight: 2,
          }}
        >
          🖱 Move Mouse : Steer Submarine <br />
          🖱 Left Click : Toggle Auto Navigation <br />
          🚢 Explore nearby objects to learn about them <br />
          🐋 Some marine life unlocks special encounters <br />
          🌊 Descend deeper to continue the expedition
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 20,
            marginTop: 45,
          }}
        >
          <button
            onClick={() => setShow(false)}
            style={{
              padding: "16px 36px",
              borderRadius: 18,
              border: "none",
              cursor: "pointer",

              fontSize: 18,
              fontWeight: 700,

              background:
                "linear-gradient(180deg,#45C6F3,#1678A8)",

              color: "white",
            }}
          >
            Begin Expedition
          </button>

          <button
            onClick={() => window.history.back()}
            style={{
              padding: "16px 36px",
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,.25)",

              cursor: "pointer",

              background: "rgba(255,255,255,.08)",

              color: "white",

              fontSize: 18,
              fontWeight: 700,
            }}
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpeditionIntro;