import React, { useState } from 'react'
import { Stack } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
/*eslint-disable */

export default function PostComments (): JSX.Element {
  const [contentOfComment, setContentOfComment] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const commentEditButtonHandler = (comment: CommentType) => {  
    let notice = window.prompt("Edit Comment", comment.content);
    if(notice === null){
        return;
    }
    else if(notice.length === 0){
        alert("user cannot create empty comment");
    }
    else{
        const EdittedComment = {...comment, content: notice};
        dispatch(editComment(EdittedComment));//axios function
    }
};

const commentDeleteButtonHandler = (comment: CommentType) => {
    dispatch(deleteComment(comment.id));//axios function
};

const findAuthorName = (ID : number | undefined) => {
        return userState.users.find((user : UserType) => {return (user.id === ID);})?.name;
    };

const CommentsforThisArticle = commentState.comments.filter((comment: CommentType) => {return (comment.article_id === articleState.selectedArticle?.id);}).sort((a, b) => a.id - b.id);

let listedComments = CommentsforThisArticle.map((comment : CommentType) =>{
    return(
        <div className="Comment">
        <Stack direction = "horizontal">
        <p className = "author">{findAuthorName(comment.author_id)}</p>
        <p className = 'content'>{comment.content}</p>
        </Stack>
        {
          (comment.author_id == userState.user.id) ? 
          (<div className = "button">
            <button className = "edit-comment-button" id="edit-comment-button" onClick={() => commentEditButtonHandler(comment)}>
              edit
            </button>
            <button className = "delete-comment-button" id="delete-comment-button" onClick={() => commentDeleteButtonHandler(comment)}>
              delete
            </button>
          </div>) 
          : (<div></div>)
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
