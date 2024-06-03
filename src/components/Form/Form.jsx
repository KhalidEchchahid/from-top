import React , {useEffect, useState} from 'react'
import FileBase from 'react-file-base64'
import { useSelector } from 'react-redux'
import { TextField , Button , Typography , Paper } from '@mui/material'
import { useDispatch } from 'react-redux'
import { createPost , updatePost } from '../../actions/posts'
import { useNavigate } from 'react-router-dom'
const myStyle = {
  paper: {
    with : '100%' ,
    padding: '5px',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
    overflowX: 'hidden',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}

const Form = ({currentId , setCurrentId}) => {
  
  const navigate = useNavigate();

  const [postData, setPostData] = useState({  title: '', message: '', tags:'', selectedFile: '' });

  const post = useSelector((state) => currentId ? state.posts.posts.find((p) =>p._id === currentId ) : null ) ;

  const dispatch = useDispatch() ;

  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(()=>{
    if(post) setPostData(post)
  },[post])

  const handelSubmit = (e) => {
    e.preventDefault();

    if(currentId){
      dispatch(updatePost(currentId , {...postData , name :user?.result?.name } , navigate));
    }else{
      dispatch(createPost({...postData , name :user?.result?.name } , navigate));
      
    }
    clear();
  }



const clear=()=>{
  setCurrentId(null);
  setPostData({ title: '', message: '', tags: '', selectedFile: '' })
}

  if(!user?.result?.name){
    return (
      <Paper style={myStyle.paper}>
        <Typography variant='h6' align='center'>
          Please Sign In to create your own memories and like other's posts ,
        </Typography>
      </Paper>
    )
   }
 

  return (
    <Paper style={myStyle.paper} elevation={6}>
      <form onSubmit={handelSubmit} autoComplete='off' noValidate style={myStyle.form} >
        <Typography variant='h6'>{ currentId ? 'Editing' :'Creating' } a Memory</Typography>
        <TextField name="title" varient="outlined" label="title"  fullWidth style={{margin : '5px'}} value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
        <TextField   name="message" varient="outlined" label="message"  fullWidth style={{margin : '5px'}} multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
        <TextField name="tags" varient="outlined" label="tags" placeholder='Use comma to separate tags' fullWidth style={{margin : '5px'}} value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}/>
        <div style={myStyle.fileInput}>
            <FileBase type="file" multiple ={false} onDone={({base64})=>setPostData({...postData , selectedFile : base64}) }/>
      </div>
      <Button style={myStyle.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
      <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form