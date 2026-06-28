import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import ExeciseDetail from "./components/ExeciseDetail";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BMI from "./pages/BMI";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route path="/exercise-detail/:id" element={<ExeciseDetail />} />

        <Route path="/bmi" element={<BMI />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
