import React from 'react';
import '../style/css/postInfo.css';

const PostInfo = ({ text, writerImg, writerNickName, writerDongNe, timeAgo }) => {
  return (
    <div>
      <div className="rectangle-container">
        <div className="text">{text}</div>
      </div>
      <div className="profile-img-container">
        <img src={writerImg} alt="Profile" className="profile-img" />
        <div className="post-info">
          <p className="writer-name">{writerNickName}</p>
          <p className="writer-dongne">{writerDongNe}</p>
          <p className="post-time">{timeAgo}</p>
        </div>
      </div>
    </div>
  );
};

export default PostInfo;