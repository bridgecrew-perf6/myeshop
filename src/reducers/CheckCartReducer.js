export function CheckCartReducer (state=null,action){
    switch(action.type)
    {
        case "LOADcart":
                return action.payload;
      
        case "NOTLOADcart":
           return null;
        default:               
           return state;
    }
}