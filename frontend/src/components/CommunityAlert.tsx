import React from 'react'
import { Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export interface IProps {
  newCommentAuthor: string
  newCommentPostedTime: Date
  newCommentedPostId: number
}

export default function CommunityAlert (props: IProps): JSX.Element {
  const time = new Date()
  const navigate = useNavigate()

  const timeDiff = time.getTime() - (new Date(props.newCommentPostedTime)).getTime()

  return (
    <div className = "Purchases">
      <Stack direction = "horizontal" gap = {3} onClick = {() => navigate(`/community/${props.newCommentedPostId}`)}>
        <p>{`${props.newCommentAuthor} commented on your post`}</p>
        <p>{`${Math.floor(timeDiff / 1000 / 60 / 60 / 24)} days ago`}</p>
      </Stack>
    </div>
  )
}
