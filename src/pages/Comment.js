import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { GetDongNeCommentList } from '../redux/modules/Comment';
import '../style/css/comment.css';
import "../style/css/orikkiriList.css";

function Comments({ postId }) {
  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.comment.commentList);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    dispatch(GetDongNeCommentList(postId));
  }, [postId, dispatch]);

  const handleCommentSubmit = () => {
    console.log(newComment); // 예시: 콘솔에 댓글 내용 출력
    setNewComment(""); // 입력 필드 초기화
  };

  const renderCommentAndReplies = () => {
    return commentList.map((comment, index) => {
      if (!comment.refComment) {
        return (
          <React.Fragment key={index}>
            <div className="comment-item">
              <img className="profile-pic" src={comment.writer.picture} alt="profile" />
              <div className="comment-author">{comment.writer.nickname}</div>
              <div className="comment-time">{comment.timeAgo}</div>
              <div className="comment-body">{comment.content}</div>
            </div>
            {commentList.map((reply, replyIndex) => {
              if (reply.refComment && reply.refComment.commentId === comment.commentId) {
                return (
                  <div key={replyIndex} className="reply-comment">
                    <img className="profile-pic" src={reply.writer.picture} alt="profile" />
                    <div className="comment-author">{reply.writer.nickname}</div>
                    <div className="comment-time">{reply.timeAgo}</div>
                    <div className="comment-body">{reply.content}</div>
                  </div>
                );
              }
              return null;
            })}
          </React.Fragment>
        );
      }
      return null;
    });
  };

  return (
    <div className="comment-container">
      {renderCommentAndReplies()}
      <div className="comment-input-container">
        <input
          type="text"
          className="comment-input"
          placeholder="댓글을 입력하세요..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="comment-submit-button" onClick={handleCommentSubmit}>
          제출
        </button>
      </div>
    </div>
  );
}

export default Comments;
