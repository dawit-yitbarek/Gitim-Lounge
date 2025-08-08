import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from "./pages/Home"
import Auth from './pages/Auth';
import PoemCollection from './pages/Collections';
import AboutPage from './pages/About';
import ReadingPage from './pages/Reading';
import Contact from './pages/Contact';
import ProfilePage from './pages/ProfilePage';
import { AuthRedirect, PrivateRoute } from './components/AuthRedirect';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={
          <AuthRedirect>
            <Auth />
          </AuthRedirect>
        } />
        <Route path="/collection" element={<PoemCollection />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/reading/:authorId" element={<ReadingPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        } />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
