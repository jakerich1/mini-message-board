import { useEffect, useState } from 'react';
import './style.scss';

function AppView() {

  const [scrollPosition, setPosition] = useState(0);

  useEffect(() => {

    const root = document.querySelector('#root')
    const appViewEl = document.querySelector('#app-view')
    const imgEl = document.querySelector('#image-scroll')
    const container = document.querySelector('.app-cont')

    function updatePosition() {
      // This is the percentage from the top app view to the point where position sticky fails 
      const percentToUnstick = (root.scrollTop - appViewEl.offsetTop) / (appViewEl.offsetHeight-window.innerHeight)
      const totalMovement = imgEl.offsetHeight-container.offsetHeight //img container height! make dynamic

      // If the image container is i a stuck position
      if(percentToUnstick > 0 && percentToUnstick < 1){
        setPosition(percentToUnstick * totalMovement)
      }
    }

    root.addEventListener('scroll', updatePosition);
    updatePosition();

    return () => root.removeEventListener('scroll', updatePosition);

  }, []);

  return (
    <div id='app-view'>
      <div className='sticky-cont'>
        <div 
        className='phone-cont'
        style={{
          backgroundImage: 'url("./images/phone2.png")', 
          backgroundSize: 'contain', 
          backgroundRepeat: 'no-repeat',
        }}
        >
          <div className='app-cont'>
            <img 
            id='image-scroll' 
            alt='app example' 
            src='./images/portrait.jpg'
            style={{ 
              top: `-${scrollPosition}px`
            }}
            />
          </div>
        </div>
        <div className='app-detail'>
          <div className='ad-title'><span>C3RTI</span>, the first social music app!</div>
          <div className='ad-content'>C3RTI is the new social streaming built exclusively for independent artists and music fans.</div>
          <div className='ad-content'>Share your music, grow an army of superfans, and interact directly with them. Take full control of your career without compromise, monetize your music and keep 100% of your masters rights.</div>
        </div>
      </div>    
    </div>
  );
}

export default AppView;
