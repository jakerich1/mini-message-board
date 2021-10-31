import { 
    userInfo, 
    fetchUserPosts, 
    declineRequest,
    sendFriendRequest, 
    fetchUserRequests, 
} from '../../api/api';
import { DateTime } from 'luxon';
import { useAuth } from '../../useAuth';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Post from '../Post/Post';
import TopNav from '../TopNav/TopNav';
import SideNav from '../SideNav/SideNav';
import './style.scss';

function User() {

    const auth = useAuth();
    const { id } = useParams();
    let history = useHistory();

    // Redirect user to profile component if they are viewing their own profile
    if(id === auth.jwtPayload){
        history.push('/profile')
    }
    
    const [posts, setPosts] = useState([]);
    const [name, setName] = useState(false);
    const [created, setCreated] = useState('');
    const [friend, setFriend] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [toggleInfo, setToggleInfo] = useState(true);
    const [relationship, setRelationship] = useState('');
    const [toggleRequest, setToggleRequest] = useState(true);
    const [fetchingPosts, setFetchingPosts] = useState(true);
    const [pendingIssuer, setPendingIssuer] = useState(false);
    const [pendingRecipient, setPendingRecipient] = useState(false);
    const [picture, setPicture] = useState('./images/placeholder.png');

    // User Info
    useEffect(() => {
        let isSubscribed = true
        userInfo(id).then(res => {
            if(isSubscribed) {
                setFriend(res.data.isFriends)
                setPicture(res.data.profile_picture)
                setRelationship(res.data.relationship_status)
                setName(`${res.data.facebook.first_name} ${res.data.facebook.last_name}`)
                setCreated(DateTime.fromISO(res.data.created).toLocaleString(DateTime.DATE_MED))
            }
        }).catch(errors => {
            if(isSubscribed) {
            }
        })
        return () => isSubscribed = false
    },[id, toggleInfo, toggleInfo])

    // User posts
    useEffect(() => {
        let isSubscribed = true
        if ( friend ) {
            setFetchingPosts(true)
            fetchUserPosts(id).then(res => {
                if(isSubscribed){
                    setFetchingPosts(false)
                    setPosts(res.data)
                }
            }).catch(errors => {
                if(isSubscribed){
                    setFetchingPosts(false)
                }
            })
        }
        return () => isSubscribed = false
    }, [friend, id, toggleInfo])

    // User requests
    useEffect(() => {
        let isSubscribed = true
        if(!friend){
            fetchUserRequests(id).then(res => {
                if(isSubscribed){            
                    if(res.data.issuer_requests.length > 0){
                        if(res.data.issuer_requests[0].status === 'pending'){
                            setPendingIssuer(res.data.issuer_requests[0]._id)
                        }  
                    }
                    if(res.data.issuer_requests.length > 0){
                        if(res.data.recipient_requests[0].status === 'pending'){
                            setPendingRecipient(res.data.recipient_requests[0]._id)
                        }  
                    }
                }
            }).catch(errors => {
                if(isSubscribed){
                }
            })
        }
        return () => isSubscribed = false
    }, [id, friend, toggleRequest])

    const noPosts = () => {
        if (!fetchingPosts && posts.length === 0){
            return (
                <div id='no-post'>No posts yet 🧐</div>
            )
        }
    }

    const loading = () => {
        if(friend && fetchingPosts){
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-rotate-clockwise" width="80" height="80" viewBox="0 0 24 24" strokeWidth="1" stroke="#9e9e9e" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
                </svg>
            )
        } 
    }

    const handleFriendRequest = async () => {
        if(!friend) {
            sendFriendRequest(id).then(res => {
                setToggleRequest(!toggleRequest)
                setToggleInfo(!toggleInfo)
            }).catch(errors => {
                setToggleRequest(!toggleRequest)
                setToggleInfo(!toggleInfo)
            })
        }
    }

    const cancelShow = () => {   
        if(pendingIssuer){
            return (<button onClick={() => delRequest(pendingIssuer)} className='request-btn'>Cancel request</button>)
        }
        if(pendingRecipient){
            return (<button onClick={() => delRequest(pendingRecipient)} className='request-btn'>Reject request</button>)
        } 
        if(!pendingIssuer && !pendingRecipient && !friend){
            return (<button onClick={handleFriendRequest}>send friend request</button>)
        }
    }

    const delRequest = async (requestId) => {
        setDeleting(true)
        declineRequest(requestId).then(res => {
            setDeleting(false)
            setToggleRequest(!toggleRequest)
            setToggleInfo(!toggleInfo)
        }).catch(errors => {
            setDeleting(false)
            setToggleRequest(!toggleRequest)
            setToggleInfo(!toggleInfo)
        })
    }

    return (
        <div>
            <TopNav />
            <main>
                <SideNav />
                <div id='user-profile'>
                    <header>
                        <img alt='profile' src={picture} />   
                        <div style={{ display: name ? 'block' : 'none'}} className='bio'>
                            <div>{name}</div>
                            {created ? <div>Joined: {created}</div> : '' }
                            {relationship ? <div>Relationship status: {relationship}</div> : '' }
                            {friend ? '' : '' }
                            {cancelShow()}
                        </div>
                    </header>  
                    <section>
                        {loading()}
                        {posts.map((post) => {
                            return <Post key={post._id} data={post} />
                        })}
                        {noPosts()}
                    </section>         
                </div>
            </main>
        </div>
    );
}

export default User;



