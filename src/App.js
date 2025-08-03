import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/NoteState';


function App() {
  return (
    <NoteState>

      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </NoteState>

  );
}

export default App;
