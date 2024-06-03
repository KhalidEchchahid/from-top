import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@mui/material'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import {useDispatch} from 'react-redux' ;
import { deletePost , likePost } from '../../../actions/posts';
import {useNavigate} from 'react-router-dom'
const myStyle = {
  tags : {
    margin : '7px 15px' ,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '15px',
    left: '15px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
    padding: '5px 16px 5px 16px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
  },
}


const Post = ({post , setCurrentId}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'))


  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpOutlinedIcon fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpOutlinedIcon fontSize="small" />&nbsp;Like</>;
  };


const openPost = () => navigate(`/posts/${post._id}`)

  return (
    <Card style={myStyle.card} raised elevation={6}>
      
      <CardMedia style={myStyle.media} image = {post.selectedFile} title={post.title}/>
      <div style={myStyle.overlay}>
        <Typography variant='h6'>{post.name}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div style={myStyle.overlay2}>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator ) && <Button style={{color : 'white'}} size="small" onClick={()=>{setCurrentId(post._id)}}>
          <MoreHorizIcon fontSize='medium' />
        </Button>}
      </div>
      <ButtonBase  component="span"  name="test" style={myStyle.cardAction}  onClick={openPost}>
        <div>
         <Typography style={myStyle.tags} variant='body2' color="textSecondary">{post.tags.map((tag)=> `#${tag} `)}</Typography>
        </div>
         <Typography style={myStyle.title} variant='h5' gutterBottom>{post.title}</Typography>
         <CardContent style={myStyle.message}>
        <Typography  variant='body2' color="textSecondary" component='p' gutterBottom>{post.message}</Typography>
        </CardContent>
        </ButtonBase>
      <CardActions style={myStyle.cardActions}>
        <Button size='small' disabled={!user?.result} color='primary' onClick={()=>dispatch(likePost(post._id))}>
          <Likes />
        </Button>
    { (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator ) && <Button size='small' color='primary' onClick={()=>dispatch(deletePost(post._id))}>
      <DeleteIcon />
      Delete
    </Button>}
      </CardActions>
    </Card>
  )
}

export default Post