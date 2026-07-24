function DepthMeter({ y }) {
  // Surface starts at y = 520
  const depth = Math.max(0, Math.round((y - 520) / 4));

  // Progress based on world height
  const maxDepth = Math.round((5463 - 520) / 4);
  const percentage = Math.min((depth / maxDepth) * 100, 100);

  return (
    <div
      style={{
        position: "fixed",
        right: 25,
        bottom: 25,

        width: 220,
        padding: "18px",

        background: "rgba(8,20,35,0.55)",
        backdropFilter: "blur(14px)",

        border: "1px solid rgba(130,220,255,0.18)",
        borderRadius: "18px",

        boxShadow: "0 12px 35px rgba(0,0,0,.45)",

        color: "#EAFBFF",

        fontFamily: "Inter, sans-serif",

        zIndex: 9999,
        userSelect: "none",
      }}
    >
      <div
        style={{
          fontSize: 13,
          letterSpacing: 2,
          color: "#82DFFF",
          marginBottom: 8,
        }}
      >
        DEPTH
      </div>

      <div
        style={{
          fontSize: 34,
          fontWeight: 700,
          marginBottom: 16,
        }}
      >
        {depth} m
      </div>

      <div
        style={{
          width: "100%",
          height: 10,
          background: "rgba(255,255,255,.08)",
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            borderRadius: 999,
            background:
              "linear-gradient(90deg,#3EB8E5,#8ADFFF)",
            transition: "width .25s ease",
          }}
        />
      </div>
    </div>
  );
}

export default DepthMeter;