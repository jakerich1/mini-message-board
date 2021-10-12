import { useAuth } from '../../useAuth';
import { Link } from 'react-router-dom';
import './style.scss';
import { useEffect, useState } from 'react';
import Post from '../Post/Post';

function Dashboard() {

    const auth = useAuth();
    const axios = require('axios');

    // Logic for fetching posts 
    const [refresh, setRefresh] = useState(true);
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const responseData = await axios.get(`http://localhost:5000/post/?page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt-fe')}`,
                    },
                });
                let updatedPosts = [...posts]

                responseData.data.forEach(element => {
                    updatedPosts.push(element)
                });
                setPosts(updatedPosts)
                console.log(updatedPosts);

            } catch (error) {
                return error;
            }
        }
        fetchPosts()
    }, [page, axios, auth.user, refresh])
    // Update the current page which the calls for extra posts
    const handleMore = () => {
        setPage(page+1)
    }

    // Post control 
    const [post, setPost] = useState('');
    // Update the state for the new post input
    const handlePost = (e) => {
        setPost(e.target.value)
    }
    // Handle post submit
    const handleSubmit = async (event) => {
        event.preventDefault();

        if(post.length === 0){
            return
        }
    
        try {
            const request = await axios.post(`http://localhost:5000/post/`, 
            {
                content: post
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt-fe')}`,
                }
            })
            setPost('');
            setPosts([])
            setRefresh(!refresh);
            setPage(1);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      };
    // Auto grow text area for new post
    function auto_grow(e) {
        e.target.style.height = "5px";
        e.target.style.height = (e.target.scrollHeight)+"px";
    }

    return (
        <div className='dashboard-wrap'>

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

            <main>
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

                <div className='timeline'>

                    <div className='new-post'>
                        <form onSubmit={handleSubmit}>
                            <div className='top'>
                                <img src='./images/46.jpg' alt='profile mini'/>
                                <textarea name='post' value={post} onInput={e => { handlePost(e); auto_grow(e) } } placeholder='Whats on your mind, Jacob?'></textarea>
                            </div>
                            <div className='divider'></div>
                            <div className='submit'>
                                <button type='submit'>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>

                    {posts.map((post) => {
                        return <Post 
                            key={post._id} 
                            data={post}
                        />
                    })}

                    <button 
                    className='more-posts'
                    onClick={handleMore}
                    >
                        More posts
                    </button>`

                </div>
                
                <div className='nav-right'>

                    <div className='friend-request'>
                        <div className='fr-header'>
                            <div className='fr-head-title'>
                                Friend Requests
                            </div>
                        </div>
                        <div className='fr-body'>
                            <div className='request-detail'>
                                <img src='./images/placeholder.png' alt='mini profile' />
                                <div className='detail-name'>
                                    Alen Dedja
                                </div>
                            </div>
                            <div className='fr-action'>
                                <button>accept</button>
                                <button>decline</button>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        
        </div>
    );
}

export default Dashboard;
