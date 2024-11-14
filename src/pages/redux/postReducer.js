import { Get_Posts, Create_Posts, Like_Posts, Comment_ON_Posts, Delete_Posts, Set_Error } from "./actiontype";

const initialState ={
    posts:[],
    error:null,
}

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case Get_Posts:
            return {
                ...state,
                posts: action.payload,
                error: null,
            };
        case Create_Posts:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
                error: null,
            };
        case Like_Posts:
            return {
                ...state,
                posts: state.posts.map((post) => 
                    post._id === action.payload._id ? {...post, ...action.payload} :post
                ),
                error: null,
            };
        case Comment_ON_Posts:
            return {
                ...state,
                posts: state.posts.map((post) => 
                    post._id === action.payload._id ? {...post,...action.payload }: post
                ),
                error: null,
            };
        case Delete_Posts:
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== action.payload._id),
                error: null,
            };
        case Set_Error:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default postsReducer;
