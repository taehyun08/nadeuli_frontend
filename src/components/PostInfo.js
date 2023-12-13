import React from 'react';
import '../style/css/postInfo.css';

const PostInfo = ({ text }) => {
  return (
    <div className="rectangle-container">
      <div className="text">{text}</div>
    </div>
  );
};

export default PostInfo;
