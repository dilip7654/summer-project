import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar'; // Add this import
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import CodeEditor from './pages/CodeEditor';
import Meetings from './pages/Meetings';
import FileShare from './pages/FileShare';
import LandingPage from './pages/LandingPage';
import AuthSystem from './pages/Login';

// Create a Layout component that includes the sidebar
function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="flex h-screen">
      <Sidebar 
        currentPath={location.pathname} 
        onNavigate={handleNavigation}
      />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            <LandingPage />
          </Layout>
        } />
        <Route path="/dashboard" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
        <Route path="/chat" element={
          <Layout>
            <Chat />
          </Layout>
        } />
        <Route path="/code-editor" element={
          <Layout>
            <CodeEditor />
          </Layout>
        } />
        <Route path="/meetings" element={
          <Layout>
            <Meetings />
          </Layout>
        } />
        <Route path="/file-share" element={
          <Layout>
            <FileShare />
          </Layout>
        } />
         <Route path="/signin-up" element={
          <Layout>
            <AuthSystem />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;