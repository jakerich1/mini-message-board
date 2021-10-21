import './style.scss';

function Static2() {
  return (
    <div 
        className='static2'
        style={{ 
            backgroundPosition: 'center',
            backgroundImage: 'url("./images/img_third_section_bg.png")',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            
        }}
    >
        <p id='desktop-content'>Another powerful phrase here as a separation</p>
    
        <div id='mobile-content'>
          <h1 className='about-title'><span>C3RTI</span> For Music Fans</h1>
          <p>Discover & empower upcoming artists<br /> before anyone else</p>
        </div>

    </div>
  );
}

export default Static2;
