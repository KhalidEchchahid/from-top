import * as api from '../api/index';
import {FETCH_BY_SEARCH ,CREATE, DELETE, FETCH_ALL , LIKE, UPDATE , START_LOADING ,END_LOADING , FETCH_POST} from '../constants/actionTypes';

// Action Creators

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);
    dispatch({ type: FETCH_POST, payload: { post: data } });
    dispatch({type : END_LOADING })
  } catch (error) {
    console.log(error);
  }
};


export const getPosts = (page) => async (dispatch) => {
    try {
      dispatch({type : START_LOADING })
      const  {data}  = await api.fetchPosts(page);
      dispatch({ type: FETCH_ALL, payload: data });
      dispatch({type : END_LOADING })
    } catch (error) {
      console.log(error.message);
    }
  };

  export const getPostsBySearch = ({search , tags}) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data : {data} } = await api.fetchPostsBySearch({search , tags});
      console.log(data);
      dispatch({ type: FETCH_BY_SEARCH, payload: { data}  });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };

export const createPost = (post , navigate) => async (dispatch)=> {
        try{
          dispatch({type : START_LOADING })
            const {data} = await api.createPost(post)
            navigate(`/posts/${data._id}`)
            dispatch({
                type : CREATE,
                payload : data 
            })
            dispatch({type : END_LOADING })

        }catch(err){
            console.log(err.message)
        }
}

export const updatePost = (id , post , navigate) => async (dispatch) =>{
      try{
        const {data} = await api.updatePost(id , post)
        navigate(`/posts/${data._id}`)
        dispatch({type : UPDATE , payload : data})
      }catch(err){
        console.log(err)
      }
}

export const deletePost = (id) => async (dispatch) =>{
  try{
    await api.deletePost(id) ;
    dispatch({type: DELETE , payload : id})
  }catch(err){
    console.log(err) ;
  }
}

export const likePost = (id) => async (dispatch) => {
  try{
      const {data} = await api.likePost(id)
      dispatch({type : LIKE , payload: data})
  }catch(err){
    console.log(err)
  }
}