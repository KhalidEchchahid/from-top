import React from 'react'
import Post from './Post/Post.jsx'
import {useSelector} from 'react-redux'
import { Grid , CircularProgress} from '@mui/material'

const myStyle = {
  mainContainer: {
    display: 'flex',
    justifyContent: "space-between",
  },
  smMargin: {
    margin: '2px',
  },
  actionDiv: {
    textAlign: 'center',
  },
}



const Posts = ({setCurrentId}) => {
  const { posts , isLoading} = useSelector((state)=> state.posts);
console.log(posts)
 
  if(!posts.length && !isLoading) return 'NO Posts' ;
 
  return (
    isLoading ? <CircularProgress /> : (
      <Grid style = {myStyle.mainContainer} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item  xs={12} sm={12} md={6} lg={4}>
            <Post post={post} setCurrentId ={setCurrentId}/>
          </Grid>
        ))}
      </Grid>
    )
  )
}

export default Posts