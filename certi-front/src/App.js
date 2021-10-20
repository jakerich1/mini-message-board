import './style.scss';
import { useState, useEffect } from 'react';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import Static1 from './components/Static1/Static1';
import Static2 from './components/Static2/Static2';
import Register from './components/Register/Register';
import AboutFans from './components/AboutFans/AboutFans';
import AboutArtists from './components/AboutArtists/AboutArtists';

function App() {

  const [view, setView] = useState(7)

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

      {view == 0 ? 
      <>
        <Main />
        <Static1 />
        <Register />
        <AboutArtists />
        <AboutFans />
        <Static2 />
        <Footer />
      </> : ''}

      {view == 1 ? 
      <>
        <Main />
      </> : ''}

      {view == 2 ? 
      <>
        <Static1 />
      </> : ''}

      {view == 3 ? 
      <>
        <Register />
      </> : ''}

      {view == 4 ? 
      <>
        <AboutArtists />
      </> : ''}

      {view == 5 ? 
      <>
        <AboutFans />
      </> : ''}

      {view == 6 ? 
      <>
        <Static2 />
      </> : ''}

      {view == 7 ? 
      <>
        <Footer />
      </> : ''}

    </div>
  );
}

export default App;
