import { useEffect, useState } from 'react';
import { fetchPosts, submitPost } from '../../api/api';
import Post from '../Post/Post';
import TopNav from '../TopNav/TopNav';
import SideNav from '../SideNav/SideNav';
import DashRequest from '../DashRequest/DashRequest';
import './style.scss';

function Dashboard() {

    // State initializatios
    const [page, setPage] = useState(1);
    const [post, setPost] = useState('');
    const [posts, setPosts] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [fetchingPosts, setFetchingPosts] = useState(false);

    // Fetch posts whenever the page changes or the refresh state changes
    useEffect(() => {
        setFetchingPosts(true)
        let isSubscribed = true
        fetchPosts(page).then(res => {
            if (isSubscribed) {
                let updatedPosts = [...posts]
                res.data.forEach(element => {
                    updatedPosts.push(element)
                });
                setFetchingPosts(false)
                setPosts(updatedPosts)
                console.log(updatedPosts);
            }
        }).catch(errors => {
            if (isSubscribed){
                setFetchingPosts(false)
            }
        })
        return () => isSubscribed = false
    }, [page, refresh])
    
    // Handle post submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(post.length === 0){ return }

        submitPost(post).then(res => {
            setPost('');
            setPosts([])
            setPage(1);
            setRefresh(!refresh);
        }).catch(errors => {
            console.log(errors);
        })       
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
                                <textarea name='post' value={post} onInput={e => { setPost(e.target.value); auto_grow(e) } } placeholder='Whats on your mind, Jacob?'></textarea>
                            </div>
                            <div className='divider'></div>
                            <div className='submit'>
                                <button type='submit'>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>

                    <svg style={{ display: fetchingPosts ? 'block' : 'none', margin: 'auto', marginTop: '1em' }} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-rotate-clockwise" width="80" height="80" viewBox="0 0 24 24" strokeWidth="1" stroke="#9e9e9e" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
                    </svg>

                    {posts.map((post) => {
                        return <Post 
                            key={post._id} 
                            data={post}
                        />
                    })}

                    <button style={{ display: fetchingPosts ? 'none' : 'block' }} className='more-posts' onClick={() => setPage(page+1) } >
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
