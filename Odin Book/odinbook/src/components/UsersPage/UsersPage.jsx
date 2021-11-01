/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState, React } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsers, fetchFriendsId } from '../../api/api';
import TopNav from '../TopNav/TopNav';
import SideNav from '../SideNav/SideNav';
import './style.scss';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    // isSubscribed value is used to cancel state updates via async functions after compent dismoint
    let isSubscribed = true;
    // Wait for both async functions to server have finished running
    Promise.all([fetchUsers(), fetchFriendsId()]).then((values) => {
      if (isSubscribed) {
        // Initialize values
        const allUsers = values[0].data;
        const friendsList = values[1].data;
        const tmpFriends = [];
        const tmpOthers = [];
        // Mark user as friend if their id appears in friendsList list
        allUsers.forEach((element) => {
          if (friendsList.includes(element._id)) {
            tmpFriends.push(element);
          } else {
            tmpOthers.push(element);
          }
        });
        // Update state
        setFriends(tmpFriends);
        setUsers(tmpOthers);
        setFetched(true);
      }
    }).catch(() => {});
    return () => isSubscribed = false;
  }, []);

  const noFriends = () => {
    let condition = false;
    if (!friends.length && fetched) {
      condition = true;
    }
    return condition ? ('No friends 😞') : '';
  };

  return (
    <div>
      <TopNav />
      <main>
        <SideNav />

        <div id="users-wrap">

          <div id="others-cont">
            <div className="sub-head">
              <h1>Users</h1>
            </div>

            <div className="grid-cont">
              {users.map((user) => (
                <Link key={user._id} to={`/u/${user._id}`}>
                  <div className="friend-item">
                    <img alt="profile" src={user.profilePicture} />
                    <div className="name">
                      {`${user.facebook.firstName} ${user.facebook.lastName}`}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div id="others-cont">
            <div className="sub-head">
              <h1>Friends</h1>
            </div>

            <div className="grid-cont">
              {friends.map((friend) => (
                <Link key={friend._id} to={`/u/${friend._id}`}>
                  <div className="friend-item">
                    <img alt="profile" src={friend.profilePicture} />
                    <div className="name">
                      {`${friend.facebook.firstName} ${friend.facebook.lastName}`}
                    </div>
                  </div>
                </Link>
              ))}
              {noFriends()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default UsersPage;
