import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';

function Shoppingcart() {
  const user = useSelector(state => state.user);
  const [cart, setcart] = useState([]);
  const [qnty, setqnty] = useState();
  const [plus, setplus] = useState();
  const [minus, setminus] = useState();
  const [clickid, setclickid] = useState();
  const [productupdateprice, setproductupdateprice] = useState();

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
    // e.target.name == "minus" && setminus(e.target.value);
  }

  var qcart1 = cart.filter(cartp => cartp.useremail == user.email).map((e) => { return Number(e.productqnty) });
  console.log(qcart1);
  var pricesum = cart.filter(cartp => cartp.useremailcart == user.email).map((e) => { return Number(e.productfinalprice) });



  var sumo = 0;
  for (var i = 0; i < pricesum.length; i++) {
    sumo += qcart1[i] * pricesum[i];
  }

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

    var up = { setqty };
    if (p_id) {
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

    var up = { setqty };
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
    alert("deleting")
    console.log(clickid)
    console.log(productupdateprice)

    var gfg_down =document.getElementById(clickid);
    gfg_down.parentNode.removeChild(gfg_down);
    // axios.post('http://localhost:4000/delete-cart', { clickid }).then((res) => {

    //   axios.post('http://localhost:4000/Cart-list', { useremail }).then(
    //     (res) => {
    //       console.log(res.data.data);
    //       setcart(res.data.data);

    //     },
    //   )
    // })
  }
  // console.log(setid);


  // var p = cart.filter(cartp => cartp.useremail == user.email
  // ).map((pl) => (

  //     <tbody>
  //         <tr>
  //             <td>1</td>
  //             <td style={{ width: "20%" }}>
  //                 <img src=
  //                     {pl && pl.productimage ? `http://localhost:4000/${pl.productimage}` : "http://pesmcopt.com/admin-media/images/dummy-product-image.jpg"}
  //                     data-imagezoom="true" class="img-responsive" />

  //             </td>
  //             <td>
  //                 <i class="fas fa-rupee-sign"></i>&nbsp;{pl.productname}
  //             </td>
  //             <td>
  //                 <i class="fas fa-rupee-sign"></i>&nbsp;{pl.productfinalprice}
  //                 <br />
  //                 <small>({pl.productdiscount}% )Off</small>
  //             </td>

  //             <td >
  //                 <p className="card-text">
  //                     <small className="text-muted text-center">
  //                         <div className="" id={`qntydiv${pl.productid}`} style={{ display: 'flex', border: "1px solid", width: "100px", justifyContent: "center", height: "30px" }}>
  //                             <button type="button" className="" name="plus" onClick={(e) => { increment(e) }} data-idp={pl.productid}
  //                                 style={{ width: "40px", backgroundColor: "transparent", border: "none", position: "relative" }}>+</button>

  //                             <input type="text" id={`qntyinput${pl.productid}`} className="inputqnty text-center" name="qnty" value={pl.productqnty} onChange={(e) => { setvalue(e); }}
  //                                 style={{ width: "50px", border: "none" }} disabled />

  //                             <button type="button" className="" name="minus" onClick={(e) => { decrement(e) }} data-idp={pl.productid}
  //                                 style={{ width: "40px", backgroundColor: "transparent", border: "none", position: "relative" }}>-</button>
  //                         </div>
  //                     </small></p>

  //             </td>
  //             <td  onClick={()=>{setidd(pl._id)}}>
  //                                         <i class="fas fa-trash" onClick={deleteaction}></i>

  //             </td>

  //         </tr>

  //     </tbody>

  //     ))

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
              <th>Sr.no</th>
              <th>Product</th>
              <th>Product Name</th>
              <th>Product(per piece)</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          {cart.filter(cartp => cartp.useremail == user.email
          ).map((pl) => (

            <tbody id={pl._id}>
              <tr>
                <td>1</td>
                <td style={{ width: "10%" }}>
                  <img src=
                    {pl && pl.productimage ? `http://localhost:4000/${pl.productimage}` : "http://pesmcopt.com/admin-media/images/dummy-product-image.jpg"}
                    data-imagezoom="true" class="img-responsive" />

                </td>
                <td>
                  <i class="fas fa-rupee-sign"></i>&nbsp;{pl.productname}
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
                        <button type="button" className="" name="plus" onClick={(e) => { increment(e) }} data-idp={pl.productid}
                          style={{ width: "40px", backgroundColor: "transparent", border: "none", position: "relative" }}>+</button>

                        <input type="text" id={`qntyinput${pl.productid}`} className="inputqnty text-center" name="qnty" value={pl.productqnty} onChange={(e) => { setvalue(e); }}
                          style={{ width: "50px", border: "none" }} disabled />

                        <button type="button" className="" name="minus" onClick={(e) => { decrement(e) }} data-idp={pl.productid}
                          style={{ width: "40px", backgroundColor: "transparent", border: "none", position: "relative" }}>-</button>
                      </div>
                    </small></p>

                </td>
                <td onClick={()=>{setproductupdateprice(pl.productfinalprice)}}>
{/* <input type="text" value={productupdateprice} onClick={deleteaction} disabled/> */}
<span>{productupdateprice}</span>
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
        </table>
      </div>
    </div>
  )
}

export default Shoppingcart
