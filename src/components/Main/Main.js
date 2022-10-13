import React from 'react';
import About from './About/About';
import AboutMe from './AboutMe/AboutMe';
import Promo from './Promo/Promo';
import Techs from './Techs/Techs';
import './Main.css';

export default function Main() {
  return (
    <>
      <Promo />
      <About />
      <Techs />
      <AboutMe />
    </>
  )
}
