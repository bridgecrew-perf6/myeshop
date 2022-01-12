export function user (state=null,action){
    switch(action.type)
    {
        case "LOGIN_USER":
            // alert('user reducer mei hu')
                return action.payload;
      
        case "LOGOUT_USER":
           return null;
        default:               
           return state;
    }
}