import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Sidebar from './components/Sidebar';
import Dashboard from './pages/dashbardpage/UserDashboard';
import AdminDashboard from './pages/dashbardpage/AdminDashboard';
import EmployeeDashboard from './pages/dashbardpage/EmployeeDashboard';
import Chat from './pages/chatpage/Chat';
import CodeEditor from './pages/CodeEditor';
import Meetings from './pages/meetingpages/Meetings';
import FileShare from './pages/filesharepage/FileShare';
import LandingPage from './pages/LandingPage';
import AuthSystem from './pages/Login';
import ForgetPassword from './components/Forgotpassword'
import UserProfile from './pages/profilepage/Userprofile';

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
        <Route path="/admindashboard" element={
          <Layout>
            <AdminDashboard />
          </Layout>
        } />
        <Route path="/userdashboard" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
        <Route path="/employeedashboard" element={
          <Layout>
            <EmployeeDashboard />
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
        <Route path="/forgot-password" element={
          <Layout>
            < ForgetPassword/>
          </Layout>
        } />
        <Route path="/user-profile" element={
          <Layout>
            < UserProfile/>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;