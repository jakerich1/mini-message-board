import './style.scss';

function AboutArtists() {
    return (
        <>
            <div id='about-artists'
        style={{
            backgroundImage: 'linear-gradient(45deg, rgba(45,48,55,0.7189076314119398) 13%, rgba(45,48,55,0.5116247182466737) 44%, rgba(45,48,55,0.3827731776304272) 100%), url("./images/bg-2.jpg")', 
            backgroundPosition: 'center', 
            backgroundSize: 'cover', 
            backgroundRepeat: 'no-repeat' 
        }}>
            <div className='about-title'>C3RTI</div>
            <div className='about-title'>For Independent Artists</div>
            
            <div className='sub'>
                Your music deserve to be heard and shared!
            </div>

            <div className='container'>
                <div className='card'>
                    <img alt='explore' src='./images/ic_exposure.png' />
                    <div className='detail'>
                        <div className='card-title'>
                            A cool title goes here!
                        </div>
                        <div className='card-content'>
                            A fair chance to get exposure and reach new listeners
                        </div>
                    </div>
                </div>

                <div className='card'>
                    <img alt='explore' src='./images/ic_monetize.png' />
                    <div className='detail'>
                        <div className='card-title'>
                            A cool title goes here!
                        </div>
                        <div className='card-content'>
                            A fair chance to get exposure and reach new listeners
                        </div>
                    </div>
                </div>

                <div className='card'>
                    <img alt='explore' src='./images/ic_engagement.png' />
                    <div className='detail'>
                        <div className='card-title'>
                            A cool title goes here!
                        </div>
                        <div className='card-content'>
                            A fair chance to get exposure and reach new listeners
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className='mobile-cards'>
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
        </>
    );
}

export default AboutArtists;
