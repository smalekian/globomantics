import { Home } from './pages/home/Home';
import { Media } from './pages/media/Media';
import { OurStory } from './pages/our-story/OurStory';
import { Robotics } from './pages/robotics/Robotics';
import { Conference } from './pages/conference/Conference';
import { Auth } from './pages/auth/Auth';
import Admin from './pages/admin/Admin';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ApolloProvider } from './context/ApolloProvider';
import { AuthProvider } from './context/AuthProvider';
import { useAppInit } from './useAppInit';

function AppRouter() {
  const [loading] = useAppInit();
  return (
    <div id="wrapper">
      <Router>
        <Header />
        {loading ? (
          <p>Reticulating splines...</p>
        ) : (
          <Routes>
            <Route path="/media" element={<Media />} />
            <Route path="/our-story" element={<OurStory />} />

            <Route path="/robotics" element={<Robotics />} />

            <Route path="/conference/*" element={<Conference />} />

            <Route path="/auth/*" element={<Auth />} />

            <Route path="/admin" element={<Admin />} />

            <Route path="/" element={<Home />} />
          </Routes>
        )}
        <Footer />
      </Router>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ApolloProvider>
        <AppRouter />
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
