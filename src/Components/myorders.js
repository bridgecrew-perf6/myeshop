import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';

function Myorders() {
  const user = useSelector(state => state.user);
  const [cart, setcart] = useState([]);


  var useremail = user.email
  useEffect(() => {

    axios.post('http://localhost:4000/orders-list', { useremail }).then(
      (res) => {
        console.log(res.data.data);
        setcart(res.data.data);

      },
    )
  }, [useremail]);
  console.log(cart);
// console.log(cart && cart.cartdata[0]._id);

var uid=user._id
console.log(uid);

       var  c= cart && cart.filter(cartp => cartp.useremail == user.email
         ).map((pl) =>
         (
           <tbody >
             
             <tr></tr>
          <tr id={pl._id}>
          
               <td style={{ width: "10%" }}>
                 <img src=
                   {pl && pl.productimage ? `http://localhost:4000/${pl.productimage}` : "http://pesmcopt.com/admin-media/images/dummy-product-image.jpg"}
                   data-imagezoom="true" class="img-responsive" alt=""/>
       
               </td> 
               <td>
                 <strong>
                 {pl.productname}
                 </strong>
               </td>
               <td >
              <i class="fas fa-rupee-sign"></i><input type="text" id={`price${pl.productid}`} className="inputqnty text-center" name="totalprice" value={pl.productfinalprice}
                         style={{ width: "50px", border: "none" }} disabled />
              X
                       <input type="text" id={`qntyinput${pl.productid}`} className="inputqnty text-center" name="qnty" value={pl.productqnty}
                         style={{ border: "none" }} disabled />
       
               </td> 
               <td>
                {pl.productsize}
                </td>
                <td>
        
              <i class="fas fa-rupee-sign"></i><input type="text" id={`price${pl.productid}`} className="inputqnty text-center" name="totalprice" value={pl.producttotalprice}
                         style={{ width: "50px", border: "none" }} disabled />
       
               </td>
               <td>
               <Tooltip title="View Product">
            <Link to={`/Product-details/${pl.productid}`}>
              <button className="cart"  style={{ backgroundColor: "transparent", border: "none" }}>
              <i class="far fa-eye"></i></button></Link></Tooltip>
                     </td>
                     <td>
                {pl.status}
                </td>
                                  
              
       
             </tr>
       
           </tbody>
         ))
  

  return (
    <div>
      {/* <!-- /banner_bottom_agile_info --> */}
      <div class="page-head_agile_info_w3l" >
        <div class="container">
          <span><h3>My Orders</h3></span>
          {/* <!--/w3_short--> */}
          <div class="services-breadcrumb">
            <div class="agile_inner_breadcrumb">

              <ul class="w3_short">
                <li><Link to="/">Home</Link><i>|</i></li>
                <li>Orders</li>
              </ul>
            </div>
          </div>
          {/* <!--//w3_short--> */}
        </div>
      </div>

      <div class="bs-docs-example" style={{ display: 'flex', padding: "5%" }}>
        <table class="table table-hover" display="flex" justifyContent="center">
          <thead>
            <tr>
            <th>Product </th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Product Size</th>
              <th>Total Price</th>
              <th>View Product</th>
              <th>Product Status</th>
            </tr>
          </thead>
      
       
      {c}
        </table>
      </div>
      {/* <div onMouseOver={onupdate} style={{ display: 'flex',justifyContent:'flex-end' ,paddingRight:'10%'}}>
      <Tooltip title="Click To Update Total Price" placement="top" arrow>
      {/* <Button variant="contained" color="success" onClick={onupdate}>
        Your Total Price is: &nbsp;{tprice}
      </Button> 
      </Tooltip>
      </div> */}
      <br/>

      {/* <div style={{ display: 'flex',justifyContent:'flex-end' ,paddingRight:'10%'}}>
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

      </div> */}
   
    </div>
  )
}

export default Myorders
