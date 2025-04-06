// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import RepositoryDetails from "./pages/RepositoryDetails";
import "./assets/styles/main.scss";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/repository/:username/:repoName"
                element={<RepositoryDetails />}
              />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
