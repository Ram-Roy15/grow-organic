import React from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./App.css";
import DataTableComponent from "./components/DataTableComponent";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Table with PrimeReact</h1>
      </header>
      <main>
        <DataTableComponent />
      </main>
    </div>
  );
};

export default App;
