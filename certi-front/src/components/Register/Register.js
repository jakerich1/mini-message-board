import './style.scss';

function Register() {
  return (
    <div id='register'>
        <h1>Get an early invite!!</h1>

        <div className='container'>
            <div className='card'
            style = {{
                backgroundImage: 'url("./images/img_artist.png")', 
                backgroundPosition: '50% 20%', 
                backgroundSize: 'cover', 
                backgroundRepeat: 'no-repeat' 
            }}>
                <div className='c-title'>Are you an aspiring artist?</div>
                <div className='c-content'>C3RTI is the new social streaming built exclusively for independent artists and music fans.</div>
                <button>Sign up as a artist</button>
            </div>

            <div className='card'
            style = {{
                backgroundImage: 'url("./images/img_music_fan.png")', 
                backgroundPosition: '50% 20%', 
                backgroundSize: 'cover', 
                backgroundRepeat: 'no-repeat' 
            }}>
                <div className='c-title'>Are you an aspiring artist?</div>
                <div className='c-content'>C3RTI is the new social streaming built exclusively for independent artists and music fans.</div>
                <button>Sign up as a artist</button>
            </div>
        </div>
    </div>
  );
}

export default Register;
