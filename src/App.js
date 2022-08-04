import Navbar from "./components/Navbar";
import FormInputControl from "./components/FormInputControl";
import BarChart from "./components/barchart/BarChart";
import { useState } from "react";

function App() {

  const [porcentaje, setPorcentaje] = useState();
  const [onShowBarChart, setOnShowBarChart] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="container py-5 mt-4">
        <div className="d-flex">
          <div className="w-100">
            <FormInputControl
              setPorcentaje={(newPorcentaje) => setPorcentaje(newPorcentaje)}
              setOnShowBarChart={(onShow)=> setOnShowBarChart(onShow)} />
          </div>
          <div className="w-100">
            {onShowBarChart && <BarChart porcentaje={porcentaje} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
