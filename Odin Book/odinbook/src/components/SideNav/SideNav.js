import './style.scss';

function SideNav() {

    return (
        <div className='nav-left'>
            <div className='sticky'>
                <div className='link'>
                    <div className='icon'>
                        <svg 
                            className='icon icon-tabler icon-tabler-user' 
                            xmlns='http://www.w3.org/2000/svg' 
                            width='40' height='40' viewBox='0 0 24 24' 
                            strokeWidth='1' stroke='#000000' fill='none' 
                            strokeLinecap='round' strokeLinejoin='round'
                        >
                            <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                            <circle cx='12' cy='7' r='4'></circle>
                            <path d='M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2'></path>
                        </svg>
                    </div>
                    <div className='link-text'>
                        Profile
                    </div>
                </div>
                <div className='link'>
                    <div className='icon'>
                        <svg className='icon icon-tabler icon-tabler icon-tabler-users' xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' strokeWidth='1' stroke='#000000' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                        <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                        <circle cx='9' cy='7' r='4'></circle>
                        <path d='M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2'></path>
                        <path d='M16 3.13a4 4 0 0 1 0 7.75'></path>
                        <path d='M21 21v-2a4 4 0 0 0 -3 -3.85'></path>
                        </svg>
                    </div>
                    <div className='link-text'>
                        Users
                    </div>
                </div>
                <div className='link'>
                    <div className='icon'>
                        <svg className='icon icon-tabler icon-tabler-user-plus' xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' strokeWidth='1' stroke='#000000' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                        <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                        <circle cx='9' cy='7' r='4'></circle>
                        <path d='M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2'></path>
                        <path d='M16 11h6m-3 -3v6'></path>
                        </svg>
                    </div>
                    <div className='link-text'>
                        Requests
                    </div>
                </div>
            </div>
        </div>     
    );
}

export default SideNav;
