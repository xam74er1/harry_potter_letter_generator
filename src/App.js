import { useParams, HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import ClaudeHogwartsLetter from "./claude/HogwartsLetter";
import MistralHogwartsLetter from "./mistral/Envelope";
import AdminPanel from "./AdminPanel";

function LetterSelector() {
  const { type } = useParams();

  switch (type) {
    case "claude":
      return <ClaudeHogwartsLetter />;
    case "mistral":
      return <MistralHogwartsLetter />;
    default:
      return <div>Unknown letter type: {type}</div>;
  }
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/:type" element={<LetterSelector />} />
      </Routes>
    </Router>
  );
}

export default App;
