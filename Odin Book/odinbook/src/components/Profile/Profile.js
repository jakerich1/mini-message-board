import { useEffect, useState } from "react";
import { fetchMyPosts } from '../../api/api';
import Post from "../Post/Post";
import TopNav from "../TopNav/TopNav";
import SideNav from "../SideNav/SideNav";
import './style.scss';

function Profile(props) {

    const [page, setPage] = useState(1)
    const [posts, setPosts] = useState([])
    const [fetchingPosts, setFetchingPosts] = useState(false)

    useEffect(() => {
        fetchMyPosts().then(res => {
            console.log(res.data)
            setFetchingPosts(false)
            setPosts(res.data)
        }).catch(errors => {
            console.log(errors)
        })
    }, [page])

    return (
        <div>
            <TopNav />
            <main>
                <SideNav />
                <div className='profile-cont'>
                    <header>
                        <div className='pic-cont'>
                            <img src='./images/46.jpg' alt='profile' />
                        </div>
                        <div className='bio'>
                            <div>Jacob Riches</div>
                            <div>Joined: 08/08/2021</div>
                            <div>Relationship status: single</div>
                        </div>
                    </header>
                    <section>
                        <svg style={{ display: fetchingPosts ? 'block' : 'none' }} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-rotate-clockwise" width="80" height="80" viewBox="0 0 24 24" strokeWidth="1" stroke="#9e9e9e" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
                        </svg>

                        {posts.map((post) => {
                            return <Post 
                                key={post._id} 
                                data={post}
                            />
                        })}
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Profile;



