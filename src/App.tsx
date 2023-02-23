import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotePage from "./Pages/NotePage";
import StaredPage from "./Pages/StaredPage";
import TrashPage from "./Pages/TrashPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NotePage />} />
          <Route path="/stared" element={<StaredPage />} />
          <Route path="/trash" element={<TrashPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
