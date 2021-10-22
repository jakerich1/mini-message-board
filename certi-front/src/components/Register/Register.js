import { useState } from 'react';
import './style.scss';

function Register(props) {

    const [p1Tilt, setP1Tilt] = useState('rotateX(0) rotateY(0)')
    const [p2Tilt, setP2Tilt] = useState('rotateX(0) rotateY(0)')

    const tilt = (e, elementId) => {
        const cardRect = document.querySelector(`#${elementId}`).getBoundingClientRect()
        let layerX = e.clientX-cardRect.left
        let layerY = e.clientY-cardRect.top
        let percX = layerX/cardRect.width
        let percY = layerY/cardRect.height
        let tiltX = ((30*percX)-20)
        let tiltY = ((40*percY)-20)*-1

        const tiltString = `rotateX(${tiltY.toFixed(2)}deg) rotateY(${tiltX.toFixed(2)}deg)`

        if(elementId === 'p1'){
            setP1Tilt(props.screenWidth > 760 ? tiltString : 'rotateX(0) rotateY(0)')
        }
        if(elementId === 'p2'){
            setP2Tilt(props.screenWidth > 760 ? tiltString : 'rotateX(0) rotateY(0)')
        }

        return
    } 


    return (
        <div id='register'>
            <h1>Get an early invite!!</h1>

            <div className='container'>
                <div 
                onMouseMove={(e) => tilt(e, 'p1')} 
                onMouseOut={() => setP1Tilt('rotateX(0) rotateY(0)')}
                className='perspective'>

                    <div id='p1' 
                    className='card'
                    style = {{
                        backgroundImage: 'url("./images/img_artist.png")', 
                        backgroundPosition: '50% 20%', 
                        backgroundSize: 'cover', 
                        backgroundRepeat: 'no-repeat',
                        transform: p1Tilt 
                    }}>
                        <div className='c-title'>Are you an aspiring artist?</div>
                        <div className='c-content'>C3RTI is the new social streaming built exclusively for independent artists and music fans.</div>
                        <button>Sign up as a artist</button>
                    </div>
                </div>
                
                <div 
                onMouseMove={(e) => tilt(e, 'p2')} 
                onMouseOut={() => setP2Tilt('rotateX(0) rotateY(0)')}
                className='perspective'>
                    
                    <div id='p2' 
                    className='card'
                    style = {{
                        backgroundImage: 'url("./images/img_music_fan.png")', 
                        backgroundPosition: '50% 20%', 
                        backgroundSize: 'cover', 
                        backgroundRepeat: 'no-repeat',
                        transform: p2Tilt  
                    }}>
                        <div className='c-title'>Are you an aspiring artist?</div>
                        <div className='c-content'>C3RTI is the new social streaming built exclusively for independent artists and music fans.</div>
                        <button>Sign up as a artist</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
