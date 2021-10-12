import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Comment from './Comment/Comment';
import './style.scss';

function Post(props) {

    const axios = require('axios');
    const [commentCount, setCommentCount] = useState(0);
    const [likeCount, setLikeCount] = useState(0);
    const [fetchingInfo, setFetchingInfo] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [viewComment, setViewComment] = useState(false);
    const [submittingComment, setSubmittingComment] = useState(false);
    const [fetchingComments, setFetchingComments] = useState(false);
    const [comments, setComments] = useState([])
    const [refreshInfo, setRefreshInfo] = useState(true);
    const [refreshContent, setRefreshContent] = useState(true);
    const [liked, setLiked] = useState(false);

    const toggleCommentView = () => {
        setViewComment(!viewComment)
    }

    // Toggle liking of a post
    const toggleLike = async () => {
        try{
            await axios.post(`http://localhost:5000/post/${props.data._id}/like`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt-fe')}`,
                },
            });
            setRefreshInfo(!refreshInfo);
        }catch(errors){
            console.log(errors);
        }
    }

    // Method to fetch comments of a post
    useEffect(() => {

        const fetchComments = async () => {
            try{
                setFetchingComments(true)
                const responseData = await axios.get(`http://localhost:5000/comment/?postId=${props.data._id}`, {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem('jwt-fe')}`,
                    },
                });
                console.log(responseData.data);
                setComments(responseData.data);
                setFetchingComments(false);
            }catch(errors){
                setFetchingComments(false);
                console.log(errors);
            }
        }

        if(viewComment){
            fetchComments()
        }

    }, [axios, props.data._id, viewComment, refreshContent])

    // Lifecycle method to get info of post
    useEffect(() => {
        const fetchInfo = async () => {
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
                setLiked(responseData.data.is_liked ? true : false);
                
            } catch (error) {
                setFetchingInfo(false);
                return error;
            }
        }
        fetchInfo();
    }, [axios, props.data._id, refreshInfo])

    // Handle state update
    const handleComment = (e) => {
        setNewComment(e.target.value);
    }
    // Auto grow text area for new post
    function auto_grow(e) {
        e.target.style.height = "5px";
        e.target.style.height = (e.target.scrollHeight)+"px";
    }
    // Handle submitio of new comment
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(newComment.length === 0) { return }
        try{
            setSubmittingComment(true);
            const request = await axios.post(`http://localhost:5000/comment/`, 
            {
                content: newComment,
                postId: props.data._id,
            },
            { headers: { Authorization: `Bearer ${localStorage.getItem('jwt-fe')}`, } });

            setSubmittingComment(false);
            setNewComment('');
            setRefreshInfo( !refreshInfo );
            setRefreshContent( !refreshContent );
            console.log(request.data);
        }catch(errors){
            console.log(errors);
            setNewComment('')
            setSubmittingComment(false);
        }
    }

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
                            {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
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
                <div onClick={toggleLike}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-thumb-up" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#1877f2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
                    </svg>
                    { liked ? 'unlike' : 'Like' }
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
            </div>
            <div style={{ display: viewComment ? 'block' : 'none' }} className='article-comments'>
                
                <svg style={{ display: fetchingComments ? 'block' : 'none', margin: 'auto' }} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-rotate-clockwise" width='42' height="80" viewBox="0 0 24 24" strokeWidth="1" stroke="grey" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
                </svg>

                <div style={{ display: fetchingComments ? 'none' : 'block' }}>
                    {comments.map((comment) => {
                        return <Comment 
                            key={comment._id}
                            data={comment}
                        />
                    })}
                </div>   
                
                <div className='write-comment'>
                    <form onSubmit={handleSubmit}>
                        <img src='./images/placeholder.png' alt='mini profile' />
                        <textarea 
                        placeholder='write comment here'
                        value={newComment}
                        onInput={e => { handleComment(e); auto_grow(e) } } >
                        </textarea>
                        <button>
                            <svg style={{ display: submittingComment ? 'block' : 'none' }} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-rotate-clockwise" width="28" height="28" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
                            </svg>
                            <span style={{ display: submittingComment ? 'none' : 'block' }}>
                                submit
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </article>
    );
}

export default Post;



