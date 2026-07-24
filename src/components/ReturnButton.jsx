function ReturnButton() {
  const goBack = () => {
    window.history.back();
  };

  return (
    <button
      onClick={goBack}
      style={{
        position: "fixed",
        top: 24,
        right: 24,

        zIndex: 999999,

        padding: "14px 22px",

        borderRadius: "18px",

        border: "1px solid rgba(120,220,255,.25)",

        background:
          "linear-gradient(180deg, rgba(20,55,85,.92), rgba(8,22,38,.92))",

        color: "#EAFBFF",

        fontSize: "16px",
        fontWeight: "700",

        cursor: "pointer",

        backdropFilter: "blur(14px)",

        boxShadow:
          "0 0 20px rgba(0,170,255,.25)",

        transition: ".2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      ← Return to Dashboard
    </button>
  );
}

export default ReturnButton;