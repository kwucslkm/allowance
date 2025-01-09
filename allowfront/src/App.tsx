import React from 'react';
import Home from './pages/Home.tsx';
import Header from './pages/layout/Header.tsx';
import Nav from './pages/layout/Nav.tsx';
import Footer from './pages/layout/Footer.tsx';


const App: React.FC = () => {
  return <>
    <Header />
    <Nav />
    <Home />
    <Footer />
  </>;
};

export default App;
