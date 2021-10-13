import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './style.scss';

function Comment(props) {

    const axios = require('axios');

    const [infoRefresh, setInfoRefresh] = useState(true);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [liking, setLiking] = useState(false);

    const handleLike = async () => {
        try{
            setLiking(true)
            await axios.post(`http://localhost:5000/comment/${props.data._id}/like`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt-fe')}`,
                },
            });
            setInfoRefresh(!infoRefresh)  
            setLiking(false)
        }catch(errors){
            setLiking(false)
            console.log(errors);
        }
    }

    useEffect(() => {

        const fetchInfo = async () => {
            try{
                const infoResult = await axios.get(`http://localhost:5000/comment/${props.data._id}/info`, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt-fe')}`,
                    },
                });
                console.log(infoResult.data)
                setLikes(infoResult.data.like_count)
                setLiked(infoResult.data.is_liked ? true : false)
            }catch(errors){
                console.log(errors);
            }
        }
        fetchInfo();

    }, [infoRefresh, axios, props.data._id])

    return (
        <div className='comment'>
            <img src={props.data.user.profile_picture} alt='mini profile' />
            <div className='comment-body'>
                <div className='comment-content'>
                    <div style={{ display: likes ? 'flex' : 'none' }} className='like-overlay'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-thumb-up" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
                        </svg>
                        {likes}
                    </div>
                    <div className='comment-head'>
                        {props.data.user.facebook.first_name} {props.data.user.facebook.last_name}
                    </div>
                    <div className='comment-message'>
                        {props.data.content}
                    </div>
                </div>
                <div onClick={handleLike} className='comment-control'>
                    <svg style={{ marginTop: '8px', display: liking ? 'block' : 'none' }} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-rotate-clockwise" width="18" height="18" viewBox="0 0 24 24" strokeWidth="1" stroke="#9e9e9e" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
                    </svg>
                    <span style={{ display: liking ? 'none' : 'block' }} >{liked ? 'unlike' : 'like'}</span>
                </div>
            </div>
        </div>
    );
}

export default Comment;



