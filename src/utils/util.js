export const getTokenConfig =() =>{
    const tokenObj = localStorage.getItem('userInfo');
    return{
        headers: {
            Authorization:`Bearer ${JSON.parse(tokenObj).token}`,
        },
    };
};