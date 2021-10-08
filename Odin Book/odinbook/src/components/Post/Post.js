import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import './style.scss';

function Post(props) {

    const axios = require('axios').default;
    const [commentCount, setCommentCount] = useState(0);
    const [likeCount, setLikeCount] = useState(0)
    const [fetchingInfo, setFetchingInfo] = useState(false);

    const [viewComment, setViewComment] = useState(false)
    const toggleCommentView = () => {
        setViewComment(!viewComment)
    }

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setFetchingInfo(true)
                const responseData = await axios.get(`http://localhost:5000/post/${props.data._id}/info`, {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem('jwt-fe')}`,
                    },
                });
                setCommentCount(responseData.data.comment_count);
                setLikeCount(responseData.data.like_count);
                setFetchingInfo(false);
            } catch (error) {
                setFetchingInfo(false);
                return error;
            }
        }
        fetchPosts();
    }, [axios, props.data._id])

    return (
        <article>
            <div className='article-head'>
                <img src={props.data.user.profile_picture} alt='profile mini' />
                <div className='post-detail'>
                    <div className='post-profile'>
                        <Link to='/'>{`${props.data.user.facebook.first_name} ${props.data.user.facebook.last_name}`}</Link>
                    </div>
                    <div className='post-date'>
                        {props.data.created_format}
                    </div>
                </div>
            </div>
            <div className='article-body'>
                <div className='post-content'>
                    {props.data.content}
                </div>
                <div className='engagement'>
                    <div className='likes'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-thumb-up" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
                        </svg>
                        <span style={{ display: fetchingInfo ? 'none' : 'block' }} className='like-number'>
                            {likeCount} {likeCount > 1 ? 'Likes' : 'Like'}
                        </span>
                        <svg  style={{ display: fetchingInfo ? 'block' : 'none', background: 'none' }} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-rotate-clockwise" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#9e9e9e" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
                        </svg>
                    </div>

                    <div onClick={toggleCommentView} style={{ display: fetchingInfo ? 'none' : 'flex' }} className='comments'>
                        {commentCount} {commentCount === 1 ? 'comment' : 'comments' }
                    </div>

                    <div style={{ display: fetchingInfo ? 'flex' : 'none' }} className='comments'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-rotate-clockwise" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#9e9e9e" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className='article-control'>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-thumb-up" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#1877f2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
                    </svg>
                    Like
                </div>
                <div onClick={toggleCommentView}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-message-dots" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#1877f2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" />
                        <line x1="12" y1="11" x2="12" y2="11.01" />
                        <line x1="8" y1="11" x2="8" y2="11.01" />
                        <line x1="16" y1="11" x2="16" y2="11.01" />
                    </svg>
                    Comment
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-refresh" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#1877f2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                        <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                    </svg>
                    Share
                </div>
            </div>
            <div style={{ display: viewComment ? 'block' : 'none' }} className='article-comments'>
                <div className='comment'>
                    <img src='./images/placeholder.png' alt='mini profile' />
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
                                Jacob Riches
                            </div>
                            <div className='comment-message'>
                                This is a comment on a post, blah blah blah
                            </div>
                        </div>
                        <div className='comment-control'>
                            Like
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default Post;



