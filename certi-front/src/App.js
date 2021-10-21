import './style.scss';
import { useState, useEffect } from 'react';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import AppView from './components/AppView/AppView';
import Static1 from './components/Static1/Static1';
import Static2 from './components/Static2/Static2';
import Register from './components/Register/Register';
import AboutFans from './components/AboutFans/AboutFans';
import AboutArtists from './components/AboutArtists/AboutArtists';

function App() {

  const [view, setView] = useState('6')

  const [screenWidth, setScreenWidth] = useState(0)
  //const [screenHeight, setScreenHeight] = useState(0)
  // Update scree size state upon resize
  useEffect(() => {
      const getDimensions = () => {
          setScreenWidth(window.innerWidth)
          //setScreenHeight(window.innerHeight)
      }

      getDimensions()
      window.addEventListener('resize', getDimensions);

      return () => {
          window.removeEventListener('resize', getDimensions);
      }
  }, [])

  useEffect(() => {
    window.addEventListener('keypress', e => {
      const string = e.key
      if(/^\d+$/.test(string)){
        setView(string)
      } 
    });
  }, []);

  return (
    <div className="App">

      {view === '0' ? 
      <>
        <Main screenWidth={screenWidth} />
        <AppView />
        <Static1 />
        <Register />
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
        <Register />
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
