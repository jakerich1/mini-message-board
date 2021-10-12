import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import './style.scss';

function Comment(props) {

    const axios = require('axios');

    return (
        <div className='comment'>
            <img src={props.data.user.profile_picture} alt='mini profile' />
            <div className='comment-body'>
                <div className='comment-content'>
                    <div className='like-overlay'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-thumb-up" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
                        </svg>
                        1
                    </div>
                    <div className='comment-head'>
                        {props.data.user.facebook.first_name} {props.data.user.facebook.last_name}
                    </div>
                    <div className='comment-message'>
                        {props.data.content}
                    </div>
                </div>
                <div className='comment-control'>
                    Like
                </div>
            </div>
        </div>
    );
}

export default Comment;



