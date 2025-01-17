import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainForm from "./pages/MainForm";
import FormView from "./pages/FormView";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainForm />} />
        <Route path="/view/:id" element={<FormView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
