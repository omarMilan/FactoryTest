import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import { TaskProvider } from "./components/taskContext";

function App() {
  return (
    <TaskProvider>
      <Router>
        <div className="w-screen h-screen fixed top-0 left-0">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/Home" element={<MainPage />} />
          </Routes>
        </div>
      </Router>
    </TaskProvider>
  );
}

export default App;
