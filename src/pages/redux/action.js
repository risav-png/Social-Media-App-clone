import axios from "axios";
import { Get_Posts,Create_Posts,Like_Posts,Comment_ON_Posts,Delete_Posts,Set_Error } from "./actiontype";

export const getPost =()=> async(dispatch)=>{ 
    try{
        const response = await axios.get('http://localhost:3001/post');
        dispatch({type:Get_Posts,payload:response.data});

    } catch(error){
        dispatch({type:Set_Error,payload:response.data});
    }
};


export const createPost = (postData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/post', postData);
    dispatch({ type: Create_Posts, payload: response.data });
    return response; 
  } catch (error) {
    dispatch({ type: 'CREATE_POST_FAILURE', error });
    throw error; 
  }
};


export const likePost = (id) => async (dispatch) => {
    try {
      const response = await axios.patch(`http://localhost:3001/likes/${id}`); 
      dispatch({ type: Like_Posts, payload: response.data });
    } catch (error) {
      dispatch({ type: Set_Error, payload: error.response?.data || 'Error liking post' });
    }
  
  
};

export const deletePost = (id) => async (dispatch) => {
    try {
      const response = await axios.delete(`http://localhost:3001/post/${id}`);
      dispatch({ type: Delete_Posts, payload: { _id: id } }); 
    } catch (error) {
      dispatch({ type: Set_Error, payload: error.response?.data || 'Error deleting post' });
    }
  };
  
export const comment_on_post =(id) =>async(dispatch)=>{
    try{
    const response = await axios.post('http://localhost:3001/comments');
    dispatch({type:Comment_ON_Posts,payload:response.data});
}
catch(error){
    dispatch({type:Set_Error,payload:response.data||'Error while Commenting on Post'});
}
};