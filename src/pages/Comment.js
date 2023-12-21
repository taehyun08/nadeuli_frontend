import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { postComment, GetDongNeCommentList, modifyDongNeComment, removeDongNeComment } from '../redux/modules/Comment';
import axios from 'axios';
import '../style/css/comment.css';
import "../style/css/orikkiriList.css";

function Comments({ postId }) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const dispatch = useDispatch();
  const [setCommentList] = useState([]);
  const commentList = useSelector((state) => state.comment.commentList);
  const member = useSelector((state) => state.member);
  const replyInputRefs = useRef({});
  const commentInputRef = useRef();

  useEffect(() => {
    dispatch(GetDongNeCommentList(postId));
  }, [postId, dispatch, commentList]);

  // useEffect(() => {
  //   dispatch(GetDongNeCommentList(postId));
  // }, [postId, dispatch]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/dongNe/getCommentList/${postId}`);
      setCommentList(response.data);
    } catch (error) {
      console.error("댓글 불러오기 오류", error);
    }
  };

  const handleCommentSubmit = () => {
    const writer = { tag: member.tag };
    const content = commentInputRef.current.value;
    if (!content.trim()) {
      alert("댓글을 입력해주세요.");
      return;
    }

    const commentData = {
      post: { postId: postId },
      content: content,
      writer: writer
    };

    dispatch(postComment(commentData));
    // fetchComments();
    commentInputRef.current.value = "";
  };

  const handleReplySubmit = (commentId) => {
    const writer = { tag: member.tag };
    const replyContent = replyInputRefs.current[commentId].value;
    if (!replyContent.trim()) {
      alert("대댓글을 입력해주세요.");
      return;
    }

    const commentData = {
      post: { postId: postId },
      refComment: { commentId: commentId },
      content: replyContent,
      writer: writer
    };

    dispatch(postComment(commentData));
    // fetchComments();
    replyInputRefs.current[commentId].value = "";
  };

  const renderCommentAndReplies = () => {
    return commentList.map((comment) => {
      if (!comment.refComment) {
        const replies = commentList.filter(reply => reply.refComment?.commentId === comment.commentId);

        return (
          <React.Fragment key={comment.commentId}>
            <div className="comment-item">
              <img className="profile-pic" src={comment.writer?.picture || '/default-profile.jpg'} alt="profile" />
              <div className="comment-content">
                <div className="comment-author">{comment.writer?.nickname || '익명'}</div>
                <div className="comment-time">{comment.timeAgo}</div>
                <div className="comment-body">{comment.content}</div>
              </div>
            </div>

            <div className="reply-input-container">
              <input
                type="text"
                className="reply-input"
                placeholder="대댓글을 입력하세요..."
                ref={el => replyInputRefs.current[comment.commentId] = el}
              />
              <button className="reply-submit-button" onClick={() => handleReplySubmit(comment.commentId)}>
                대댓글 제출
              </button>
            </div>

            {replies.map((reply) => (
              <div key={reply.commentId} className="comment-item reply-comment">
                <img className="profile-pic" src={reply.writer?.picture || '/default-profile.jpg'} alt="profile" />
                <div className="comment-content">
                  <div className="comment-author">{reply.writer?.nickname || '익명'}</div>
                  <div className="comment-time">{reply.timeAgo}</div>
                  <div className="comment-body">{reply.content}</div>
                </div>
              </div>
            ))}
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
          ref={commentInputRef}
        />
        <button className="comment-submit-button" onClick={handleCommentSubmit}>
          제출
        </button>
      </div>
    </div>
  );
}

export default Comments;
