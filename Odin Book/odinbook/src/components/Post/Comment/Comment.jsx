/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState, React } from 'react';
import PropTypes from 'prop-types';
import { likeComment, fetchCommentInfo } from '../../../api/api';
import './style.scss';

function Comment(props) {
  const {
    _id,
    profilePicture,
    content,
    firstName,
    lastName,
  } = props;

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [liking, setLiking] = useState(false);
  const [infoRefresh, setInfoRefresh] = useState(true);

  const handleLike = async () => {
    setLiking(true);
    likeComment(_id).then(() => {
      setInfoRefresh(!infoRefresh);
      setLiking(false);
    }).catch(() => {
      setLiking(false);
    });
  };

  useEffect(() => {
    let isSubscribed = true;
    fetchCommentInfo(_id).then((res) => {
      if (isSubscribed) {
        setLikes(res.data.like_count);
        setLiked(!!res.data.is_liked);
      }
    }).catch(() => {
      if (isSubscribed) {
        // console.log(errors);
      }
    });
    return () => isSubscribed = false;
  }, [infoRefresh, _id]);

  return (
    <div className="comment">
      <img src={profilePicture} alt="mini profile" />
      <div className="comment-body">
        <div className="comment-content">
          <div style={{ display: likes ? 'flex' : 'none' }} className="like-overlay">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-thumb-up" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
            </svg>
            {likes}
          </div>
          <div className="comment-head">
            {firstName}
            {' '}
            {lastName}
          </div>
          <div className="comment-message">
            {content}
          </div>
        </div>
        <div role="button" tabIndex="0" onClick={handleLike} className="comment-control">
          <svg style={{ marginTop: '8px', display: liking ? 'block' : 'none' }} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-rotate-clockwise" width="18" height="18" viewBox="0 0 24 24" strokeWidth="1" stroke="#9e9e9e" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
          </svg>
          <span style={{ display: liking ? 'none' : 'block' }}>{liked ? 'unlike' : 'like'}</span>
        </div>
      </div>
    </div>
  );
}

Comment.propTypes = {
  _id: PropTypes.string.isRequired,
  profilePicture: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
};

export default Comment;
