import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import CodeEditor from './pages/CodeEditor';
import Meetings from './pages/Meetings';
import FileShare from './pages/FileShare';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/editor" element={<CodeEditor />} />
        <Route path="/meet" element={<Meetings />} />
        <Route path="/files" element={<FileShare />} />
      </Routes>
    </Router>
  );
}

export default App;
