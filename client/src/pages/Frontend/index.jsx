import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FloatingContact from '../../components/Misc/FloatingContact';

// Section components
import Home from './Home';                   // #home
import About from './About';                 // #about
import Services from './Services';           // #services
import SafetyStandards from './SafetyStandards'; // #standards
import LiftEstimator from './LiftEstimator'; // #estimator
import FAQSection from './FAQSection';       // #faq
import Contact from './Contact';             // #contact

const ROUTE_SECTION_MAP = {
  '/services': 'services',
  '/safety-standards': 'standards',
  '/contact': 'contact',
};

const FrontendLayout = () => {
  const location = useLocation();

  useEffect(() => {
    const targetId = ROUTE_SECTION_MAP[location.pathname];
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      <Header />
      <main>
        <Home />
        <About />
        <Services />
        <SafetyStandards />
        <LiftEstimator />
        <FAQSection />
        <Contact />
      </main>
      <FloatingContact />
      <Footer />
    </>
  );
};

export default FrontendLayout;
