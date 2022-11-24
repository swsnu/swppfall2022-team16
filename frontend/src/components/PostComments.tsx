import React, { useEffect, useState } from 'react'
import { Stack, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store'
import { CommentInfo, deleteComment, fetchComments, putComment, selectComment } from '../store/slices/comment'
import { fetchUsers, selectUser, User } from '../store/slices/user'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import '../css/postcomment.css'
/*eslint-disable */

export interface IProps {
  review_id: number
}

export default function PostComments (props: IProps): JSX.Element {
  const [contentOfComment, setContentOfComment] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const commentState = useSelector(selectComment)
  const userState = useSelector(selectUser)

  useEffect(() => {
    dispatch(fetchComments(props.review_id))
    dispatch(fetchUsers())
  }, [dispatch])

  const editButtonHandler = (comment: CommentInfo) => {  
    let notice = window.prompt("Edit Comment", comment.content);
    if(notice === null){
        return;
    }
    else if(notice.length === 0){
        alert("user cannot create empty comment");
    }
    else{
        const EdittedComment = {...comment, content: notice};
        dispatch(putComment(EdittedComment));
    }
  };

  const deleteButtonHandler = (comment: CommentInfo) => {
    dispatch(deleteComment(comment.id));
  };

  const findAuthorName = (ID : number | undefined) => {
          return userState.users.find((user : User) => {return (user.id === ID);})?.nickname;
      };

  const CommentsforThisArticle = commentState.comments.filter((comment: CommentInfo) => {return (comment.review === props.review_id);}).sort((a, b) => a.id - b.id);

  let listedComments = CommentsforThisArticle.map((comment : CommentInfo) =>{
      return(
      <div className = 'commentbox'>
      <Stack direction = 'horizontal'>
      <div className = 'commentwrapper'>
      <div className="Comment" key={comment.id}>
        <Stack direction = 'horizontal'>
          <Stack direction = "horizontal" gap={3}>
            <p className = "author" style={{fontWeight: 'bold'}}>[{findAuthorName(comment.author)}]</p>
            <p className = 'content'>{comment.content}</p>
          </Stack>
        </Stack>
      </div>
      </div>
       <div className = 'editbutton'>
       {
           (comment.author == userState.currentLoggedIn?.id) ? 
           (
             <Stack direction = 'horizontal' gap ={1}>
             <Button className = "edit-comment-button" id="edit-comment-button" variant = "default" onClick={() => editButtonHandler(comment)}>
               <AiFillEdit/>
             </Button>
             <Button className = "delete-comment-button" id="delete-comment-button" variant = "default" onClick={() => deleteButtonHandler(comment)}>
               <AiFillDelete/>
             </Button>
             </Stack>
           ) 
           : (<div></div>)
         }
       </div>
       </Stack>
       </div>
      );
  });

  return (
    <div className = "Comment">
      <h4>Comments</h4>
      {listedComments}
    </div>
  );
}
