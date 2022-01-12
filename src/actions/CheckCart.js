import axios from 'axios';

export default function CheckCart(pd){
    // console.log(pd);
    return (dispatch)=>{
        // alert("in check productaction");
        dispatch({type:"LOADING_TRUE"}); 

        axios.post("http://localhost:4000/check-cart",pd).then((res)=>{
            dispatch({type:"LOADING_FALSE"})
            // alert(JSON.stringify(res.data));
            // alert("in 11 line in action product")
            // console.log(res.status)
            if(res.data.status==="ok")
            {
                dispatch({type:"LOADcart", payload:res.data.data})
            }
            else{

                dispatch({type:"NOTLOADcart", payload:res.data.data})
            }
        })


    }
}