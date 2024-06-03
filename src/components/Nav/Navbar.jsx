import React,{useState  ,useEffect} from 'react'
import fromTop from '../../images/fromTop1.png'
import { AppBar , Avatar, Box, Button, Toolbar, Typography } from '@mui/material'
import {Link} from 'react-router-dom'
import decode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import {useNavigate , useLocation} from 'react-router-dom';

const myStyle ={
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    flexWrap : 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
  },
  image: {
    marginLeft: '10px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    flexWrap : 'wrap',
    justifyContent: 'space-between',
    width: '350px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: '#BA55D3',
    backgroundColor: '#4B0082',
  },
  }

const Navbar = () => {
  const [user , setUser] = useState(JSON.parse(window.localStorage.getItem('profile')));
  const navigate = useNavigate();
  const dispatch = useDispatch() ;
  const location = useLocation();

  const logout = () =>{
    
    dispatch({type : 'LOGOUT'});
    
    navigate('/auth')

    setUser(null)
  
  }

  useEffect(()=>{
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(window.localStorage.getItem('profile')))
  } , [location])

  return (
    <AppBar style={myStyle.appBar}  position='static' color='inherit' align='center' >
      <Link to="/" style={myStyle.brandContainer}>
       <img src={fromTop} alt="icon" height="45px"/>
      </Link>
      <Toolbar style={myStyle.toolbar}>
      {user ? (
          <Box sx={{display: 'flex',
          justifyContent: 'space-between',
          width: {sm : 'auto' , sm : '400px'},
          alignItems: 'center',
          
          
           }}>
            <Avatar style={myStyle.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            <Typography style={myStyle.userName} variant='h6'>{user.result.name}</Typography>
            
            <Button variant='contained' style={myStyle.logout} color='secondary' onClick={logout}>logout</Button>
          </Box>
    ) : (
      <Button component={Link} to='/auth' variant='contained' color='primary'>login</Button>
    )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar