import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Home from "./components/Home";
import Notfound from "./components/Notfound.jsx";
import "./styles/app.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="*" Component={Notfound} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
