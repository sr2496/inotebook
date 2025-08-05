import { BrowserRouter as Router, Routes, Route } from "react-router";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/NoteState';
import Login from "./components/Login";
import SignUp from "./components/SignUp";


function App() {
  return (
    <NoteState>

      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </Router>
    </NoteState>

  );
}

export default App;
