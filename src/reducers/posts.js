import {FETCH_BY_SEARCH , FETCH_ALL, CREATE , UPDATE, DELETE , LIKE , START_LOADING , END_LOADING, FETCH_POST} from '../constants/actionTypes';

export default (state = {isLoading : true , posts : []} , action ) => {
    
    switch(action.type){
        case START_LOADING : 
            return {...state , isLoading : true} 
        case END_LOADING : 
            return {...state , isLoading : false} 
        case FETCH_POST:
            return { ...state, post: action.payload.post };
        case FETCH_ALL : 
            return {
                ...state ,
                posts : action.payload.data ,
                currentPage : action.payload.currentPage ,
                numberOfPages : action.payload.numberOfPages
            };
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload.data };
        case CREATE :
            return { ...state  , posts : [ action.payload , ...state.posts] };
        case UPDATE :
            return {...state , posts : state.posts.map((post) => post._id === action.payload._id ? action.payload : post )}
        case LIKE :  
            return {...state , posts : state.posts.map((post) => post._id === action.payload._id ? action.payload : post )}
        case DELETE : 
            return {...state , posts : state.posts.filter((post) => post._id !== action.payload ) };
        
        default : 
            return state;
    }
}