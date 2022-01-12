export function Productreducer (state=null,action){
    switch(action.type)
    {
        case "LOAD":
                return action.payload;
      
        case "NOTLOAD":
           return null;
        default:               
           return state;
    }
}