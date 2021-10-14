import { useEffect, useState } from "react";
import TopNav from "../TopNav/TopNav";
import { Link } from "react-router-dom";
import './style.scss';
import SideNav from "../SideNav/SideNav";

function Profile(props) {

    return (
        <div>
            <TopNav />
            <main>
                <SideNav />
            </main>
        </div>
    );
}

export default Profile;



