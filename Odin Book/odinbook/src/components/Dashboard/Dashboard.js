import { useAuth } from '../../useAuth';
import { Link } from 'react-router-dom';
import './style.scss';
import { useEffect, useState } from 'react';
import Post from '../Post/Post';
import DashRequest from '../DashRequest/DashRequest';
import SideNav from '../SideNav/SideNav';
import TopNav from '../TopNav/TopNav';

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
        if(post.length === 0){ return}
    
        try {
            await axios.post(`http://localhost:5000/post/`, { content: post},
            { headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt-fe')}`,
            }});
            
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

            <TopNav />

            <main>
                
                <SideNav />

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
                    <DashRequest />
                </div>
            </main>
        
        </div>
    );
}

export default Dashboard;
