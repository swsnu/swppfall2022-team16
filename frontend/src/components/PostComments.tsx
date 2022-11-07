import React, { useEffect, useState } from 'react'
import { Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { CommentInfo, fetchComments, selectComment } from '../store/slices/comment';
/*eslint-disable */

export interface IProps {
  review_id: number
}

export default function PostComments (props: IProps): JSX.Element {
  const [contentOfComment, setContentOfComment] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const commentState = useSelector(selectComment)

  useEffect(() => {
    dispatch(fetchComments(props.review_id))
  }, [dispatch, props])

  const commentEditButtonHandler = (comment: CommentInfo) => {  
    let notice = window.prompt("Edit Comment", comment.content);
    if(notice === null){
        return;
    }
    else if(notice.length === 0){
        alert("user cannot create empty comment");
    }
    else{
        const EdittedComment = {...comment, content: notice};
        // dispatch(editComment(EdittedComment));//axios function
    }
  };

  const commentDeleteButtonHandler = (comment: CommentInfo) => {
      // dispatch(deleteComment(comment.id));//axios function
  };

  // const findAuthorName = (ID : number | undefined) => {
  //         return userState.users.find((user : UserType) => {return (user.id === ID);})?.name;
  //     };

  const CommentsforThisArticle = commentState.comments.filter((comment: CommentInfo) => {return (comment.review === props.review_id);}).sort((a, b) => a.id - b.id);

  let listedComments = CommentsforThisArticle.map((comment : CommentInfo) =>{
      return(
          <div className="Comment">
          <Stack direction = "horizontal">
          <p className = "author">{ comment.author /*findAuthorName(comment.author_id)*/}</p>
          <p className = 'content'>{comment.content}</p>
          </Stack>
          {
            // (comment.author_id == userState.user.id) ? 
            // (<div className = "button">
            //   <button className = "edit-comment-button" id="edit-comment-button" onClick={() => commentEditButtonHandler(comment)}>
            //     edit
            //   </button>
            //   <button className = "delete-comment-button" id="delete-comment-button" onClick={() => commentDeleteButtonHandler(comment)}>
            //     delete
            //   </button>
            // </div>) 
            // : (<div></div>)
          }
        </div>
      );
  });

  return (
    <div className = "Comment">
      Comments
      {listedComments}
    </div>
  );
}
