import axios from 'axios';

export function checkLogin(u){
    return (dispatch)=>{
        // alert("in check login");
        dispatch({type:"LOADING_TRUE"});

        axios.post("http://localhost:4000/check-login",u).then((res)=>{
            dispatch({type:"LOADING_FALSE"})
            // alert(JSON.stringify(res.data.data));
            if(res.data.status==="ok")
            {
                // alert('loginuser reducer mei gaya');
                dispatch({type:"LOGIN_USER", payload:res.data.data})
            }
            else{
                alert("credential are not correct");
            }
        })


    }
}

export function checkLogingoogle(u){
    return (dispatch)=>{
        // alert("in check login");
        dispatch({type:"LOADING_TRUE"});

        axios.post("http://localhost:4000/check-login-google",u).then((res)=>{
            dispatch({type:"LOADING_FALSE"})
            // alert(JSON.stringify(res.data.data));
            if(res.data.status==="ok")
            {
                // alert('loginuser reducer mei gaya');
                dispatch({type:"LOGIN_USER", payload:res.data.data})
            }
            else{
                alert("credential are not correct");
            }
        })


    }
}