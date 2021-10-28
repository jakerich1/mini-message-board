import TopNav from '../TopNav/TopNav';
import SideNav from '../SideNav/SideNav';
import { useEffect, useState } from 'react';
import { fetchUsers, fetchFriendsId } from '../../api/api';
import './style.scss';
import { Link } from 'react-router-dom';

function UsersPage(props) {

    const [users, setUsers] = useState([])
    const [friends, setFriends] = useState([])
    const [fetched, setFetched] = useState(false)

    useEffect(() => {
        // isSubscribed value is used to cancel state updates via async functions after compent dismoint
        let isSubscribed = true
        // Wait for both async functions to server have finished running
        Promise.all([fetchUsers(), fetchFriendsId()]).then(values => {
            if(isSubscribed){
                // Initialize values
                let allUsers = values[0].data
                let friendsList = values[1].data
                let tmpFriends = []
                let tmpOthers = []
                // Mark user as friend if their id appears in friendsList list
                allUsers.forEach(element => { 
                    if(friendsList.includes(element._id)) {
                        tmpFriends.push(element)
                    }else{
                        tmpOthers.push(element)
                    }
                });
                // Update state
                setFriends(tmpFriends)
                setUsers(tmpOthers)
                setFetched(true)
            }
        }).catch(errors => {
            if(isSubscribed){
                console.log(errors)
            }
        })
        return () => isSubscribed = false
    }, [])

    return (
        <div>
            <TopNav />
            <main>
                <SideNav />

                <div id='users-wrap'>

                    <div id='others-cont'>
                        <div className='sub-head'>
                            <h1>Users</h1>
                        </div>
                        
                        <div className='grid-cont'>
                            {users.map((user) => {
                                return (
                                    <Link to={`/u/${user._id}`}>
                                        <div key={user._id} className='friend-item'>
                                            <img alt='profile' src={user.profile_picture} />
                                            <div className='name'>{user.facebook.first_name} {user.facebook.last_name}</div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                    
                    <div id='others-cont'>
                        <div className='sub-head'>
                            <h1>Friends</h1>
                        </div>

                        <div className='grid-cont'>
                            {friends.map((user) => {
                                return (
                                    <Link to={`/u/${user._id}`}>
                                        <div key={user._id} className='friend-item'>
                                            <img alt='profile' src={user.profile_picture} />
                                            <div className='name'>{user.facebook.first_name} {user.facebook.last_name}</div>
                                        </div>
                                    </Link>
                                );
                            })}
                            {
                                friends.length ?
                                '' : 
                                fetched ? 
                                'No friends 😞' :
                                ''
                            }
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default UsersPage;



