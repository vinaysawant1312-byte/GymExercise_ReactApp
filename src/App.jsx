import "./App.css";

import Home from "./components/Home";
import ExeciseDetail from "./components/ExeciseDetail";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />

      <Home />
      <ExeciseDetail />
      <Footer />
    </>
  );
}

export default App;
