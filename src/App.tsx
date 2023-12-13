import "./app.css";
import Carousel from "./components/Carousel";

function App() {
  return (
    <>
      <div style={{ display: "block", width: "100%", marginTop: "3rem" }}>
        <Carousel showSettings />
      </div>
    </>
  );
}

export default App;
