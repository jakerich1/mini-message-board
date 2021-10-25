import './style.scss';
import { useState, useEffect } from 'react';
import { useScroll } from './hooks/useScroll';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import AppView from './components/AppView/AppView';
import Static1 from './components/Static1/Static1';
import Static2 from './components/Static2/Static2';
import Register from './components/Register/Register';
import AboutFans from './components/AboutFans/AboutFans';
import AboutArtists from './components/AboutArtists/AboutArtists';

function App() {

  const [view, setView] = useState('0')
  const [screenWidth, setScreenWidth] = useState(0)

  useScroll()

  // Update scree size state upon resize
  useEffect(() => {
    const getDimensions = () => {
        setScreenWidth(window.innerWidth)
    }

    getDimensions()
    window.addEventListener('resize', getDimensions);

    window.addEventListener('load', () => {
      var element = document.querySelector("body");
      element.classList.remove("preload");
    });

    window.addEventListener('keypress', e => {
      const string = e.key
      if(/^\d+$/.test(string)){
        setView(string)
      } 
    });

    return () => {
      window.removeEventListener('resize', getDimensions);
    }
  }, [])

  return (
    <div className="App">

      {view === '0' ? 
      <>
        <Main screenWidth={screenWidth} />
        <AppView />
        <Static1 />
        <Register screenWidth={screenWidth} />
        <AboutArtists />
        {
          screenWidth < 760 
          ? <><Static2 /><AboutFans /></>
          : <><AboutFans /><Static2 /></>
        }
        <Footer />
      </> : ''}

      {view === '1' ? 
      <>
        <Main screenWidth={screenWidth} />
      </> : ''}

      {view === '2' ? 
      <>
        <AppView />
      </> : ''}

      {view === '3' ? 
      <>
        <Static1 />
      </> : ''}

      {view === '4' ? 
      <>
        <Register screenWidth={screenWidth} />
      </> : ''}

      {view === '5' ? 
      <>
        <AboutArtists />
      </> : ''}

      {view === '6' ? 
      <>
        <AboutFans />
      </> : ''}

      {view === '7' ? 
      <>
        <Static2 />
      </> : ''}

      {view === '8' ? 
      <>
        <Footer />
      </> : ''}

    </div>
  );
}

export default App;
