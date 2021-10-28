import { useEffect, useState } from 'react';
import TopNav from '../TopNav/TopNav';
import SideNav from '../SideNav/SideNav';
import { useParams } from 'react-router';
import { userInfo } from '../../api/api';
import './style.scss';

function User() {

    let { id } = useParams();

    const [user, setUser] = useState(false)

    useEffect(() => {
        let isSubscribed = true

        userInfo(id).then(res => {
            if(isSubscribed) {
                console.log(res.data)
                setUser(res.data)
            }
        }).catch(errors => {
            if(isSubscribed) {
                console.log(errors)
            }
        })

        return () => isSubscribed = false
    },[])

    return (
        <div>
            <TopNav />
            <main>
                <SideNav />
                <div id='user-profile'>
                    User profile { user ? `${user.facebook.first_name} ${user.facebook.last_name}` : id }
                </div>
            </main>
        </div>
    );
}

export default User;



