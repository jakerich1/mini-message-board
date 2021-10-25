import { useState } from 'react';
import { InView } from 'react-intersection-observer';
import './style.scss';

function Main(props) {

    const [mobileNav, setMobileNav] = useState(false)
    const toggleNav = () => {
        setMobileNav(!mobileNav)
    }

    // Function which helps to appropriately size the bg image for animation purposes
    const setSize = () => {
        if(props.screenWidth > 1500) return ['100%', '115%', '30%, 30%', '30%, 30%']
        if(props.screenWidth > 1360) return ['115%', '132%', '30%, 30%', '30%, 30%']
        if(props.screenWidth > 1215) return ['125%', '144%', '30%, 30%', '30%, 30%']
        if(props.screenWidth > 1050) return ['150%', '173%', '30%, 30%', '30%, 30%']
        if(props.screenWidth > 850) return ['190%', '219%', '30%, 30%', '30%, 30%']
        if(props.screenWidth > 790) return ['220%', '253%', '30%, 30%', '30%, 30%']
        return ['cover', 'cover', '40%, 50%', '40%, 50%']
    }

    // Function is called wheever this component moves in or out of the view port
    const toggleAnimate = async (view) => {

        const container = document.querySelector(`#main`)

        // Run when Main component is not in view
        if(!view) {
            container.style.backgroundSize = setSize()[1]
            container.style.backgroundPosition = setSize()[3] 
            return
        }

        // Delay 1 second before triggering animation
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        //Only trigger animation if we are in desktop layout
        if(props.screenWidth > 760){
            container.style.backgroundSize = setSize()[0]
            container.style.backgroundPosition = setSize()[2]
        }
    }

    return (
        <InView 
        as="main" 
        onChange={
            (inView) => toggleAnimate(inView)
        }
        id='main' 
        style={{ 
            backgroundImage: 'linear-gradient(236deg, #32333C00 0%, #32333C01 17%, #1A1C24 100%), url("./images/Landing_page_bg.png")', 
            backgroundPosition: setSize()[3], 
            backgroundSize: setSize()[1], 
            backgroundRepeat: 'no-repeat',
            transition: 'all 2s ease-in-out'
        }}>
            <nav>
                <svg xmlns="http://www.w3.org/2000/svg" width="186.324" height="29.818" viewBox="0 0 186.324 29.818">
                    <path fill='#fff' className="a" d="M25.444,5.441a1.5,1.5,0,0,1,.346.862,1.148,1.148,0,0,1-1.228,1.168,1,1,0,0,1-.887-.456,10.846,10.846,0,0,0-9.288-4.642C6.912,2.373,2.592,8.333,2.592,14.9S6.912,27.436,14.386,27.436a10.884,10.884,0,0,0,9.288-4.627,1,1,0,0,1,.887-.476A1.143,1.143,0,0,1,25.77,23.5a1.529,1.529,0,0,1-.346.867A13.374,13.374,0,0,1,14.386,29.8C5.659,29.8,0,23.11,0,14.9S5.659,0,14.386,0A13.379,13.379,0,0,1,25.444,5.441Z" transform="translate(0 0.006)"/>
                    <path fill='#fff' className="a" d="M290.472,30.131a1.278,1.278,0,0,1-1.3-1.3V3.348H279.83a1.175,1.175,0,0,1,0-2.351h21.253a1.168,1.168,0,1,1,0,2.331h-9.318v25.5a1.268,1.268,0,0,1-1.293,1.3Z" transform="translate(-138.976 -0.493)"/>
                    <path fill='#fff' className="a" d="M367.838,29.884a1.273,1.273,0,0,1-1.3-1.3V1.718a1.3,1.3,0,0,1,2.592,0V28.586a1.273,1.273,0,0,1-1.293,1.3Z" transform="translate(-182.807 -0.247)"/>
                    <rect fill='#03dac5' className="b" width="23.644" height="2.331" rx="1.165" transform="translate(46.071 0.524)"/>
                    <rect fill='#03dac5' className="b" width="23.644" height="2.331" rx="1.165" transform="translate(46.071 27.477)"/>
                    <rect fill='#03dac5' className="b" width="14.216" height="2.331" rx="1.165" transform="translate(50.783 13.743)"/>
                    <path fill='#fff' className="a" d="M211.859,16.594a7.414,7.414,0,0,0-1.464-1.188,7.564,7.564,0,0,0,3.589-6.386V8.6A7.584,7.584,0,0,0,206.421,1H195.759a7.584,7.584,0,0,0-7.564,7.564V9.02a7.559,7.559,0,0,0,3.569,6.391,7.238,7.238,0,0,0-1.5,1.2,7.4,7.4,0,0,0-2.09,5.183v7.333a1.168,1.168,0,0,0,1.153,1.188,1.2,1.2,0,0,0,1.188-1.188V21.777a5.218,5.218,0,0,1,5.168-5.213h10.772a5.218,5.218,0,0,1,5.193,5.213v7.348a1.168,1.168,0,0,0,1.153,1.188,1.2,1.2,0,0,0,1.188-1.188V21.777A7.278,7.278,0,0,0,211.859,16.594ZM190.536,9.02V8.6a5.228,5.228,0,0,1,5.223-5.243h10.662a5.233,5.233,0,0,1,5.223,5.228V9.02a5.228,5.228,0,0,1-5.163,5.218H195.7A5.228,5.228,0,0,1,190.536,9.02Z" transform="translate(-93.847 -0.496)"/>
                </svg>

                <ul className='desktop-ul'>
                    <li>
                        <a href='#main'><span className='primary'>Home</span></a>
                    </li>
                    <li>
                        <a href='#about-artists'><span>About us</span></a>
                    </li>
                    <li>
                        <a href='#footer'><span>Contact us</span></a>
                    </li>
                    <li>
                        <a href='#register'><button>Sign up</button></a>
                    </li>
                </ul>

                <svg onClick={toggleNav} id='burger-icon' xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-menu-2" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>

                    <line stroke={mobileNav ? '#ffffff00' : '#ffffff'} x1="4" y1='6' x2="20" y2="6" />
                    <line stroke={mobileNav ? '#ffffff00' : '#ffffff'} x1="4" y1="12" x2="20" y2="12" />
                    <line stroke={mobileNav ? '#ffffff00' : '#ffffff'} x1="4" y1="18" x2="20" y2="18" />
                    
                    <line stroke={mobileNav ? '#ffffff' : '#ffffff00'} x1="2" y1='20' x2="20" y2="4" />
                    <line stroke={mobileNav ? '#ffffff' : '#ffffff00'} x1="2" y1="4" x2="20" y2="20" />             
                </svg>
            </nav>

            <div style={{ right: mobileNav ? '0' : '-200px' }} id='mobile-nav'>
                <ul>
                    <li><a href='#main'>Home</a></li>
                    <li><a href='#about-artists'>About us</a></li>
                    <li><a href='#footer'>Contact us</a></li>
                    <li><a href='#register'>Sign up</a></li>
                </ul>
            </div>

            <div style={{display: 'flex'}} className='main-content-wrap'>

                <svg xmlns="http://www.w3.org/2000/svg" width="531.253" height="85.018" viewBox="0 0 531.253 85.018">
                    <path fill='#fff' className="a" d="M72.547,15.524a4.288,4.288,0,0,1,.986,2.458,3.273,3.273,0,0,1-3.5,3.33,2.858,2.858,0,0,1-2.53-1.3C61.342,12.194,53.953,6.777,41.018,6.777c-21.31,0-33.629,16.993-33.629,35.73s12.32,35.73,33.629,35.73c12.934,0,20.323-5.431,26.483-13.192a2.858,2.858,0,0,1,2.53-1.358A3.259,3.259,0,0,1,73.476,67a4.359,4.359,0,0,1-.986,2.473A38.131,38.131,0,0,1,41.018,84.984C16.136,84.984,0,65.9,0,42.493S16.136,0,41.018,0A38.146,38.146,0,0,1,72.547,15.524Z" transform="translate(0 0.006)"/>
                    <path fill='#fff' className="a" d="M312.349,84.068a3.645,3.645,0,0,1-3.7-3.7V7.705H282.007a3.352,3.352,0,0,1,0-6.7h60.6a3.33,3.33,0,1,1,0,6.646H316.036V80.366a3.616,3.616,0,0,1-3.687,3.7Z" transform="translate(119.602 0.436)"/>
                    <path fill='#fff' className="a" d="M370.242,84.28a3.63,3.63,0,0,1-3.7-3.7V3.973a3.7,3.7,0,0,1,7.389,0V80.578a3.63,3.63,0,0,1-3.687,3.7Z" transform="translate(157.323 0.224)"/>
                    <rect fill='#03dac5' className="b" width="67.416" height="6.646" rx="2.33" transform="translate(131.359 1.495)"/>
                    <rect fill='#03dac5' className="b" width="67.416" height="6.646" rx="2.33" transform="translate(131.359 78.344)"/>
                    <rect fill='#03dac5' className="b" width="40.532" height="6.646" rx="2.33" transform="translate(144.793 39.183)"/>
                    <path fill='#fff' className="a" d="M255.715,45.463a21.14,21.14,0,0,0-4.173-3.387,21.567,21.567,0,0,0,10.233-18.208v-1.2A21.624,21.624,0,0,0,240.208,1h-30.4a21.624,21.624,0,0,0-21.567,21.567v1.3A21.553,21.553,0,0,0,198.418,42.09a20.638,20.638,0,0,0-4.288,3.416,21.1,21.1,0,0,0-5.96,14.778V81.193a3.33,3.33,0,0,0,3.287,3.387,3.416,3.416,0,0,0,3.387-3.387V60.241A14.878,14.878,0,0,1,209.58,45.377h30.714A14.878,14.878,0,0,1,255.1,60.241V81.193a3.33,3.33,0,0,0,3.287,3.387,3.416,3.416,0,0,0,3.387-3.387V60.241A20.752,20.752,0,0,0,255.715,45.463Zm-60.8-21.6v-1.2a14.907,14.907,0,0,1,14.892-14.95h30.4A14.921,14.921,0,0,1,255.1,22.624v1.243a14.907,14.907,0,0,1-14.721,14.878H209.637A14.907,14.907,0,0,1,194.916,23.867Z" transform="translate(80.765 0.438)"/>
                </svg>

                <h2 className='lead'>Turn your local artists into global stars</h2>

                <h2 className='sub-lead'>Discover and empower local artists from your local area and beyond</h2>

                <a href='#register'><button>Sign up for free!</button></a>

                <div style={{display: 'flex'}} className='social'>
                    <a href='#foo'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27">
                            <path fill='#fff' className="a" d="M27,13.5A13.5,13.5,0,1,0,13.5,27c.079,0,.158,0,.237-.005V16.49h-2.9V13.11h2.9V10.621c0-2.885,1.761-4.456,4.335-4.456a23.561,23.561,0,0,1,2.6.132V9.313H18.9c-1.4,0-1.672.664-1.672,1.64V13.1h3.349l-.438,3.38H17.228v9.993A13.5,13.5,0,0,0,27,13.5Z"/>
                        </svg>
                    </a>

                    <a href='#foo'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27">
                            <path fill='#fff' className="a" d="M19.69,0H7.308A7.317,7.317,0,0,0,0,7.309V19.692A7.317,7.317,0,0,0,7.308,27H19.691A7.317,7.317,0,0,0,27,19.692V7.309A7.317,7.317,0,0,0,19.69,0ZM13.5,20.883A7.383,7.383,0,1,1,20.882,13.5,7.391,7.391,0,0,1,13.5,20.883ZM21.058,7.858A2.182,2.182,0,1,1,23.24,5.677,2.184,2.184,0,0,1,21.058,7.858Zm0,0" transform="translate(0.001)"/>
                            <path fill='#fff' className="a" d="M151.82,146.02a5.8,5.8,0,1,0,5.8,5.8A5.806,5.806,0,0,0,151.82,146.02Zm0,0" transform="translate(-138.319 -138.32)"/>
                            <path fill='#fff' className="a" d="M388.591,96.3a.6.6,0,1,0,.6.6A.6.6,0,0,0,388.591,96.3Zm0,0" transform="translate(-367.532 -91.223)"/>
                        </svg>
                    </a>

                    <a href='#foo'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28.485" height="23.144" viewBox="0 0 28.485 23.144">
                            <path fill='#fff' className="a" d="M28.485,50.74a12.175,12.175,0,0,1-3.365.922,5.807,5.807,0,0,0,2.569-3.228,11.67,11.67,0,0,1-3.7,1.414,5.839,5.839,0,0,0-10.1,3.993,6.013,6.013,0,0,0,.135,1.332A16.529,16.529,0,0,1,1.983,49.065a5.841,5.841,0,0,0,1.795,7.8,5.767,5.767,0,0,1-2.638-.719v.064a5.867,5.867,0,0,0,4.679,5.738,5.828,5.828,0,0,1-1.531.192,5.163,5.163,0,0,1-1.106-.1,5.9,5.9,0,0,0,5.457,4.068A11.734,11.734,0,0,1,1.4,68.6a10.937,10.937,0,0,1-1.4-.08,16.44,16.44,0,0,0,8.959,2.621c10.746,0,16.621-8.9,16.621-16.617,0-.258-.009-.507-.021-.755A11.65,11.65,0,0,0,28.485,50.74Z" transform="translate(0 -48)"/>
                        </svg>
                    </a>
                </div>

            </div>
        </InView>
    );
  }
  
  export default Main;
  