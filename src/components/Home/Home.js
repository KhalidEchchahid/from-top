import React ,{useEffect ,  useState} from 'react'
import {Chip ,  Container  , Grow , Grid, Paper , AppBar , TextField , Button} from '@mui/material'
import {getPosts , getPostsBySearch} from '../../actions/posts'
import { useDispatch } from 'react-redux'
import { useLocation , useNavigate} from 'react-router-dom'
import Posts from '../Posts/Posts'
import Form from '../Form/Form.jsx'
import Paginate from '../Pagination' 
import ChipInput from './ChipInput'

const myStyle = {
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    display : 'flex' ,
    justifyContent : 'center' ,
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const query = useQuery();
    const page = query.get('page') || 1 ;
    const searchQuery = query.get('searchQuery');
    const [search , setSeach] = useState('');
    const [currentId , setCurrentId ] = useState(null) ;
    const [tags , setTags] = useState([]);


    const searchPost = () => {
      if (search.trim()  || tags.length !== 0 ) {
        dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
       
        navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        console.log('ok')
      } else {
        navigate('/');
       
      }
    };

  const handleKeyPress = (e) =>{
      if(e.keyCode === 13) { // press inter
        searchPost();
      }
  }
  
  
  return (
    <Grow in>
        <Container maxWidth="xl">
          <Grid sx={{ flexDirection : { xs: 'column-reverse' , sm :'row'} }} container  justify="space-between" alignItems='stretch' spacing={3} >
            <Grid item xs={12} sm={7}  md={8} lg={9}>
              <Posts setCurrentId ={setCurrentId}/>
            </Grid>

            <Grid item xs={12} sm={5} md={4} lg={3}>
                <AppBar style={myStyle.appBarSearch} position='static' color='inherit'>
                  <TextField 
                      name="search"
                      variant='outlined' 
                      label="Search Memories"
                      fullWidth
                      onKeyDown={handleKeyPress}
                      value={search}
                      onChange={(e)=>setSeach(e.target.value)}
                     />                 
                     <ChipInput tags={tags} setTags={setTags} />           
                  <Button onClick={searchPost} variant="contained" color="primary" >Search</Button>
                </AppBar>
                <Form currentId={currentId} setCurrentId ={setCurrentId}/>
                {(!searchQuery && !tags.length) && (
                  <Paper style={myStyle.pagination} elevation={6}>
                    <Paginate page={page} />
                </Paper>
                )}
                
            </Grid>
          </Grid>
        </Container>
         </Grow>
  )
}

export default Home