import { useState } from "react";
import SolarSystem from "./components/SolarSystem";

const App = () => {
  const [appStarted, setAppStarted] = useState(false);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
      {!appStarted ? (
        // Tela inicial antes de iniciar a aplicação
        <div style={styles.overlay}>
          <h1 style={styles.text}>Estou testando, clique para iniciar</h1>
          <button style={styles.button} onClick={() => setAppStarted(true)}>
            Iniciar Aplicação
          </button>
        </div>
      ) : (  
        <SolarSystem />
      )}
    </div>
  );  
};

// Estilos para a tela de início
const styles = {
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.9)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    textAlign: "center",
  },
  text: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  button: {
    fontSize: "20px",
    padding: "10px 20px",
    background: "#007BFF",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default App;
