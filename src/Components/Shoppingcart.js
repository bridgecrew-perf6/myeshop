import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';

function Shoppingcart() {
  const user = useSelector(state => state.user);
  const [cart, setcart] = useState([]);
  const [qnty, setqnty] = useState();
  const [plus, setplus] = useState();
  const [minus, setminus] = useState();
  const [clickid, setclickid] = useState();
  const [productupdateprice, setproductupdateprice] = useState();
  const [tprice, settprice] = useState();
	const CheckCartReducer = useSelector(state => state.CheckCartReducer)
console.log( CheckCartReducer);
  var useremail = user.email
  useEffect(() => {

    axios.post('http://localhost:4000/Cart-list', { useremail }).then(
      (res) => {
        console.log(res.data.data);
        setcart(res.data.data);

      },
    )
  }, [useremail]);

  function setvalue(e) {

    e.target.name == "qnty" && setqnty(e.target.value);
    e.target.name == "plus" && setplus(e.target.value);
    e.target.name == "totalprice" && setproductupdateprice(e.target.value);
    // e.target.name == "minus" && setminus(e.target.value);
  }
  function myFunction(total, value) {
    return total + value;
  }
function onupdate(){
  axios.post('http://localhost:4000/Cart-list', { useremail }).then(
      (res) => {
        console.log(res.data.data);
        setcart(res.data.data);
        var pricesum =cart && cart.map((e) => { return Number(e.totalprice) });
        var sum = cart.length!=0?  pricesum.reduce(myFunction):pricesum=0;
        console.log(pricesum);
        console.log(sum); 
        settprice(sum)
      },
    )
 }

  

  var pp;
  
  function increment(e) {
    var p_id = e.target.dataset.idp;
    var qty = Number(document.getElementById("qntyinput" + p_id).value);

    // qty=qty+1;
    if (qty >= 10) {
      alert("quantity cannot exceed");
      qty = 10;

    } else {
      qty = qty + 1;
    }
    var setqty = document.getElementById("qntyinput" + p_id).value = Number(qty);
    var setpp=Number(Number(productupdateprice)*setqty);
   pp = document.getElementById("price" + p_id).value = Number(setpp);
    console.log(pp);

   
    if (p_id) {
      
      var up = { setqty,pp };
      up._id = p_id;
      // console.log(up);
      axios.post('http://localhost:4000/Cartupdate1', up).then((res) => {
        console.log("updated plus");
        console.log(res);
      })
    } else {
      alert("not ok");
    }
  }

  function decrement(e) {
    var p_id = e.target.dataset.idp;
    var qty = Number(document.getElementById("qntyinput" + p_id).value);
    // qty=qty+1;
    if (qty <= 1) {
      alert("quantity cannot be zero");
      qty = 1;

    } else {
      qty = qty - 1;
    }
    var setqty = document.getElementById("qntyinput" + p_id).value = Number(qty);
    var setpp=Number(Number(productupdateprice)*setqty);
     pp = document.getElementById("price" + p_id).value = Number(setpp);
    console.log(pp);
    var up = { setqty,pp };
    if (p_id) {
      up._id = p_id;
      // console.log(up);
      axios.post('http://localhost:4000/Cartupdate1', up).then((res) => {
        console.log("updated minus");

      })
    } else {
      alert("not ok");
    }
    // alert(sumo);
  };

  function deleteaction(pl) {
    // alert("deleting")
    console.log(clickid)
    // console.log(productupdateprice)

    if (clickid) {
      alert("deleted")
      axios.post('http://localhost:4000/delete-cart', { clickid }).then((res) => {

      

console.log(res);

        axios.post('http://localhost:4000/Cart-list', { useremail }).then(
          (res) => {
            console.log(res.data.data);
            setcart(res.data.data);
  
          },
        )
      })
      var gfg_down =document.getElementById(clickid);
      // console.log(gfg_down);
      gfg_down.parentNode.removeChild(gfg_down);

    }
  
  }

var uid=user._id
console.log(uid);

// var cartdata=cart.filter(cartp => cartp.useremail == user.email)
//   console.log(typeof cartdata);
var c;
if (cart.length==0) {
 c= <tbody>
   <br/>
<tr>
  <h1>Your Cart is Empty...</h1>
</tr>

  </tbody>
}else{
 c= cart && cart.filter(cartp => cartp.useremail == user.email
  ).map((pl) =>
  (
    <tbody >
      <tr></tr>
   <tr id={pl._id}>
   <td>
          <strong>
          {pl.productname}


          </strong>
        </td>
        <td style={{ width: "10%" }}>
          <img src=
            {pl && pl.productimage ? `http://localhost:4000/${pl.productimage}` : "http://pesmcopt.com/admin-media/images/dummy-product-image.jpg"}
            data-imagezoom="true" class="img-responsive" />

        </td>
    
        <td>
          <i class="fas fa-rupee-sign"></i>&nbsp;{pl.productfinalprice}
          <br />
          <small>({pl.productdiscount}% )Off</small>
        </td>

        <td >
          <p className="card-text">
            <small className="text-muted text-center">
              <div className="" id={`qntydiv${pl.productid}`} style={{ display: 'flex', border: "1px solid", width: "100px", justifyContent: "center", height: "30px" }}>
                <button type="button" className="" name="plus" 
                onClick={(e) => { increment(e) }} 
                data-idp={pl.productid}
                  style={{ width: "40px", backgroundColor: "transparent", border: "none", position: "relative" }}
                  onMouseEnter={ () => {setproductupdateprice(pl.productfinalprice)} }
                  >+</button>

                <input type="text" id={`qntyinput${pl.productid}`} className="inputqnty text-center" name="qnty" value={pl.productqnty} onChange={(e) => { setvalue(e); }}
                  style={{ width: "50px", border: "none" }} disabled />

                <button type="button" className="" name="minus" onClick={(e) => { decrement(e) }} data-idp={pl.productid}
                  style={{ width: "40px", backgroundColor: "transparent", border: "none", position: "relative" }}
                  onMouseEnter={ () => {setproductupdateprice(pl.productfinalprice)} }

                  >-</button>
              </div>
            </small></p>

        </td>
        <td>
 
       <i class="fas fa-rupee-sign"></i><input type="text" id={`price${pl.productid}`} className="inputqnty text-center" name="totalprice" value={pl.totalprice} onChange={(e) => { setvalue(e); }}
                  style={{ width: "50px", border: "none" }} disabled />

        </td>
        <td onMouseEnter={() => { setclickid(pl._id) }}>
          <Tooltip title="View Product">
            <Link to={`/Product-details/${pl.productid}`}>
              <button className="cart"  style={{ backgroundColor: "transparent", border: "none" }}>
              <i class="far fa-eye"></i></button></Link></Tooltip>

              <Tooltip title="Delete">
            <button className="cart" onClick={deleteaction} style={{ backgroundColor: "transparent", border: "none" }}>
              <i class="fas fa-trash-alt"></i></button></Tooltip>
              </td>
                          
       

      </tr>

    </tbody>
  ))
}

  return (
    <div>
      {/* <!-- /banner_bottom_agile_info --> */}
      <div class="page-head_agile_info_w3l" >
        <div class="container">
          <span><h3>Shopping Cart</h3></span>
          {/* <!--/w3_short--> */}
          <div class="services-breadcrumb">
            <div class="agile_inner_breadcrumb">

              <ul class="w3_short">
                <li><Link to="/">Home</Link><i>|</i></li>
                <li>Cart</li>
              </ul>
            </div>
          </div>
          {/* <!--//w3_short--> */}
        </div>
      </div>

      <div class="bs-docs-example" style={{ display: 'flex', padding: "5%" }}>
        <table class="table table-hover">
          <thead>
            <tr>
            <th>Product Name</th>
              <th>Product</th>
             
              <th>Product(per piece)</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
       
      {c}
        </table>
      </div>
      <div onMouseOver={onupdate} style={{ display: 'flex',justifyContent:'flex-end' ,paddingRight:'10%'}}>
      <Tooltip title="Click To Update Total Price" placement="top" arrow>
      <Button variant="contained" color="success" onClick={onupdate}>
        Your Total Price is: &nbsp;{tprice}
      </Button>
      </Tooltip>
      </div>
      <br/>

      <div style={{ display: 'flex',justifyContent:'flex-end' ,paddingRight:'10%'}}>
      { cart && cart.length!=0? 
       <Link to={`/Checkout/${tprice}`}>
      
       <Button variant="contained" color="success">
         CheckOut
       </Button>
       </Link>
      
      : 
      <Button variant="contained" color="success" disabled>
      CheckOut
    </Button>
}

      </div>
   
    </div>
  )
}

export default Shoppingcart
