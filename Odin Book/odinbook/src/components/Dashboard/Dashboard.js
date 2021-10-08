import { useAuth } from '../../useAuth';
import { Link } from 'react-router-dom';
import './style.scss';
import { useEffect, useState } from 'react';
import Post from '../Post/Post';

function Dashboard() {

    const auth = useAuth();
    const axios = require('axios').default;

    // Logic for fetching posts 
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
    }, [page, axios, auth.user])
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
    // Form handler for new post submission
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(post)
    }
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
                </button>

            </main>
        
        </div>
    );
}

export default Dashboard;
