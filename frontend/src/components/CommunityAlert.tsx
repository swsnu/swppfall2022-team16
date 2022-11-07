import React from 'react'
import { Stack, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
/*eslint-disable */

export interface IProps {
  newCommentAuthor: string | undefined;
  newCommentPostedTime: Date
  newCommentedPostId: number
}

export default function CommunityALert (props : IProps): JSX.Element {
  let time = new Date();
  const navigate = useNavigate();

  return (
    <div className = "Purchases">
      <Stack direction = "horizontal" gap = {3} onClick = {() => navigate(`/community/${props.newCommentedPostId}`)}>
        <p>{props.newCommentAuthor + " commented on your post"}</p>
        <p>{(time.getHours() - props.newCommentPostedTime.getHours()) + " hours ago"}</p>
      </Stack>
    </div>
  );
}

 