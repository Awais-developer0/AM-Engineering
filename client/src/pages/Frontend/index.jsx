import React from 'react';
import Header from '../../components/Header';
import ScreenLoader from '../../components/Misc/ScreenLoader';
import Footer from '../../components/Footer';
import FloatingContact from '../../components/Misc/FloatingContact';

// Section components
import Home from './Home';                   // #home
import About from './About';                 // #about
import Services from './Services';           // #services
import SafetyStandards from './SafetyStandards'; // #standards
import LiftEstimator from './LiftEstimator'; // #estimator
import SpareParts from './SpareParts';       // #shop
import FAQSection from './FAQSection';       // #faq
import Contact from './Contact';             // #contact

const FrontendLayout = () => {
  return (
    <>
      <ScreenLoader />
      <Header />
      <main>
        <Home />
        <About />
        <Services />
        <SafetyStandards />
        <LiftEstimator />
        <SpareParts />
        <FAQSection />
        <Contact />
      </main>
      <FloatingContact />
      <Footer />
    </>
  );
};

export default FrontendLayout;
