import { useEffect } from 'react';
import { useAuth } from '../../useAuth';
import { useHistory } from "react-router-dom";
import FbLogin from '../FbLogin/FbLogin';
import './style.scss';

function SignIn() {

  const auth = useAuth();
  let history = useHistory();

  useEffect(() => {
    if(auth.user){
        history.push('/Dashboard')
    }else{
      auth.checkAuth()
    }
  }, [auth, history])

  return (
    <div className='signIn-wrap'>

        <div className='inner-wrap'>
            <div className='header'>
                <h1>OdinBook</h1>
                <p>This is my submission for the final project within the NodeJs course of The Odin Project</p>
            </div>
            <div className='control'>
                <FbLogin auth={auth} />
            </div>
        </div>
        
         
      
    </div>
  );
}

export default SignIn;
