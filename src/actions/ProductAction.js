import axios from 'axios';

export default function Productaction(pd){
    // console.log(pd);
    return (dispatch)=>{
        // alert("in check productaction");
        dispatch({type:"LOADING_TRUE"}); 

        axios.post("http://localhost:4000/product-details",pd).then((res)=>{
            dispatch({type:"LOADING_FALSE"})
            // alert(JSON.stringify(res.data));
            // alert("in 11 line in action product")
            // console.log(res.status)
            if(res.data.status==="ok")
            {
                dispatch({type:"LOAD", payload:res.data.data[0]})
            }
            else{

                alert("Could not fetch product");
            }
        })


    }
}