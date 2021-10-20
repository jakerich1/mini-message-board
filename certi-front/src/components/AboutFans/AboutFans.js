import './style.scss';

function AboutFans() {
  return (
    <div className='about-fans'>
        <h1 className='about-title'><span>C3RTI</span> For Music Fans</h1>

        <p>Discover & empower upcoming artists before anyone else</p>

        <div className='container'>
            <div className='card'>
                <img alt='explore' src='./images/ic_explore.png'/>
                <div className='card-head'>
                    A cool title goes here!
                </div>
                <p>A unique, exciting, and active music discovery experience</p>
            </div>

            <div className='card'>
                <img alt='explore' src='./images/ic_access.png'/>
                <div className='card-head'>
                    A cool title goes here!
                </div>
                <p>Access to unlimited independent music, no subscription needed</p>
            </div>

            <div className='card'>
                <img alt='explore' src='./images/ic_build.png'/>
                <div className='card-head'>
                    A cool title goes here!
                </div>
                <p>Take part in emerging artists' journey to success</p>
            </div>
        </div>
    </div>
  );
}

export default AboutFans;
