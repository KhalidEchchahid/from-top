import React , {useState , useEffect} from 'react'
import { Avatar , Button , Paper , Grid , Typography , Container} from '@mui/material';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {GoogleLogin} from 'react-google-login'
import IconGoogle from './icon'
import Input from './Input';
import { gapi } from 'gapi-script';
import {useDispatch} from 'react-redux'
import { AUTH } from '../../constants/actionTypes';
import { useNavigate } from "react-router-dom";
import {signin , signup} from '../../actions/auth'

const myStyle = {
    paper: {
        marginTop: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px',
      },
      avatar: {
        margin : '5px' , 
        backgroundColor : 'red' 
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: '7px',
      },
    submit: {
      marginTop: '15px' ,
    },
    googleButton: {
        margin: '15px 0',
    },
} 

const initialeState = {
    firstName : '' ,
    lastName : '',
    email :'',
    password : '' ,
    confirmPassword : ''
}

const Auth = () => {
    const [isSignUp , setIsSignUp ] = useState(false) ; 
    const [showPassword , setShowPasswod] = useState(false) ;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleShowPassword = () => setShowPasswod((prev) => !prev) ;
    const [formData , setFormData] = useState(initialeState);


    const handelSubmit = (e) => {
        e.preventDefault();
        if(isSignUp){
            dispatch(signup(formData , navigate))
        }else{
            dispatch(signin(formData , navigate))
        }
    };

    const handelChange = (event) =>{
        setFormData({...formData , [event.target.name] : event.target.value})
    };

    useEffect(() => {
        function start() {
        gapi.client.init({
        clientId:"293707152665-8a4nlng2asf8ivjgb97ii8sr31v06cld.apps.googleusercontent.com",
        scope: 'email',
          });
           }
          gapi.load('client:auth2', start);
     }, []);


    const switchMode =()=>{
      setIsSignUp((prev)=> !prev) ;
      setShowPasswod(false)
    }
    const googleSucces =async(res) => {
        const result = res?.profileObj ; // cannot get
        const token = res?.tokenId ;
        // console.log('result : ' , result )
        // const data = {result , token}
        try{
            dispatch({ type : AUTH , data : {result , token}});
            
            navigate('/') ; //redirect to home page
        }catch(err){
            console.log(err);
        }
    };

    const googleFailure = (error) => {
        console.log(error);
        console.log("Google Sign In was unsuccessuful , try Again Later") ;
    };
  return (
    <Container component='main' maxWidth='xs'>
        <Paper style={myStyle.paper} elevation={3}>
            <Avatar style={myStyle.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
            <form  style={myStyle.form} onSubmit={handelSubmit} >
                <Grid container spacing={3}>
                    { isSignUp && (
                        <>
                        <Input name='firstName' label='First Name' handelChange={handelChange} autoFocus half />
                        <Input name='lastName' label='Last Name' handelChange={handelChange}  half />
                            
                        </>
                    )}
                    <Input name='email' label='Email Adress' handelChange={handelChange} type='email' />
                    <Input name='password' label='password' handelChange={handelChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                    {isSignUp && <Input name="confirmPassword" label='Repeat Password' handelChange = {handelChange} type = 'password'/>}
                </Grid>
                <Button type="submit" fullWidth variant='contained' color="primary" style={myStyle.submit}>{isSignUp ?  'sign Up': 'Sign In'}</Button>
                <GoogleLogin 
                    clientId="293707152665-8a4nlng2asf8ivjgb97ii8sr31v06cld.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <Button 
                            style={myStyle.googleButton} 
                            color='primary' 
                            fullWidth 
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled}
                            startIcon={<IconGoogle/>} 
                            variant="contained"
                         >
                            Google Sign In
                         </Button>
                    )}
                    onSuccess={googleSucces}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />
                <Grid container justifyContent='flex-end'>
                    <Grid item>
                        <Button onClick={switchMode}>{isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}</Button>
                    </Grid>
                </Grid>
            </form>
            
        </Paper>
    </Container>
  )
}

export default Auth

