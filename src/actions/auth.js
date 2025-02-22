import {AUTH} from '../constants/actionTypes' ;
import * as api from '../api/index' ;
export const signin = (formData , navigate) => async (dispatch) => {
    try{
        const {data} = await api.signIn(formData)
        dispatch({type : AUTH , data})
        navigate('/');
    }catch(err){
        console.log(err);
    }
}

export const signup = (formData , navigate) => async (dispatch) => {
    try{
        const {data} = await api.signUp(formData)
        dispatch({type : AUTH , data})

        navigate('/')
    }catch(err){
        console.log(err);
    }
}