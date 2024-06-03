import React , {useEffect} from 'react'
import {Paper , Typography , CircularProgress , Divider, Box } from '@mui/material'
import {useDispatch , useSelector  } from  'react-redux'
import {useParams , useNavigate} from 'react-router-dom'
import moment from 'moment'
import {getPost, getPostsBySearch}from '../../actions/posts' 
const myStyle = {
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',
  },
  
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
  },
}

const PostDetailes = () => {
  
   const {post , posts , isLoading} = useSelector((state) => state.posts);

   const dispatch = useDispatch() ;
  const navigate = useNavigate() ;
   const {id} = useParams();
 
 
   useEffect(()=>{
    dispatch(getPost(id))
   },[id])

   useEffect(()=>{
    if(post) dispatch(getPostsBySearch({search : 'none' , tags : post?.tags.join(',')}))
   },[post])

   if(!post) return null 

   const openPost =(_id) => navigate(`/posts/${_id}`)


  

  if (isLoading) {
    return (
      <Paper elevation={6} style={myStyle.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter (({ _id }) => _id !== id)


  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <Box  sx={{ display : 'flex' , width: '100%', flexWrap: {xs : 'wrap' , sm : ' wrap ' , md : 'noWrap'}  }} >
        <div style={myStyle.section}>
            <Typography variant="h3" component="h2">{post.title}</Typography>
            <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
            <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
            <Typography variant="h6">Created by: {post.name}</Typography>
            <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
            <Divider style={{ margin: '20px 0' }} />
            <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
            <Divider style={{ margin: '20px 0' }} />
            <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
            <Divider style={{ margin: '20px 0' }} />
      </div>
      <Box sx={{marginLeft : { sm : ' 0px' , md : '20px'} , maxWidth : { sm : '100%' , md : '50%'} , minWidth :{sm : '100%', md : '50%'}}}>
            <img style={myStyle.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
      </Box>
    </Box>
    {recommendedPosts.length && (
      <div style={myStyle.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div style={myStyle.recommendedPosts}>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
              <Typography gutterBottom variant="h6">{title}</Typography>
              <Typography gutterBottom variant="subtitle2">{name}</Typography>
              <Typography gutterBottom variant="subtitle2">{message}</Typography>
              <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
              <img src={selectedFile} width="200px" />
            </div>
            ) )}
          </div>
      </div>
    )}
  </Paper>
  ) 
}

export default PostDetailes