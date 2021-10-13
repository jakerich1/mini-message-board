import { useAuth } from '../../useAuth';
import { Link } from 'react-router-dom';
import './style.scss';

function TopNav() {

    const auth = useAuth();

    return (
        <nav>
            <Link to='/'><h1>OdinBook</h1></Link>
            <div className='nav-control'>
                <div className='profile'>
                    <img src='./images/46.jpg' alt='mini profile' />
                    <div>Jacob</div>
                </div>
                <button onClick={auth.signout}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                        <path d="M7 12h14l-3 -3m0 6l3 -3" />
                    </svg>
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default TopNav;
