import React from 'react';

const Comment = ({ author, content, timestamp }) => {
  return (
    <div className="comment">
      <p className="comment-author">{author}</p>
      <p className="comment-content">{content}</p>
      <p className="comment-timestamp">{timestamp}</p>
    </div>
  );
};

export default Comment;
