import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Suitsetshp() {
	const [ssproduct, setssproduct] = useState([]);
    // const type="CLOTHING"
    var category ="Suit"

    useEffect(() => {
        console.log(category);
    axios.post('http://localhost:4000/Wear-list',{category}).then(
        (res)=>{
            console.log(res.data.data);
            setssproduct(res.data.data)
        }
    )
}, []);

var productlist=ssproduct.map((pl)=>{
    return         <div className="col-md-3 product-men">
	<div className="men-pro-item simpleCart_shelfItem">
	{/* <Link exact to={`/productdetail/${pl._id}`}> */}
									<div class="men-thumb-item">
									<img src=
												{pl && pl.productimage ? `http://localhost:4000/${pl.productimage}` : "http://pesmcopt.com/admin-media/images/dummy-product-image.jpg"}
												className="pro-image" alt="..."  />
       
										{/* <img src="images/m1.jpg" alt="" class="pro-image-front"/> */}
										{/* <img src={ pl.logo ?  `images/m2.jpg` : "http://pesmcopt.com/admin-media/images/dummy-product-image.jpg"}
									className="pro-image-back" alt="..."  /> */}
										{/* <img src="images/m1.jpg" alt="" class="pro-image-back"/> */}
											<div class="men-cart-pro">
												<div class="inner-men-cart-pro">
													<Link to={`/Product-details/${pl._id}`} class="link-product-add-cart">Quick View</Link>
												</div>
											</div>
											<span class="product-new-top">New</span>
											
									</div>
									<div class="item-info-product ">
										<h4><a href="single.html">{pl.productname}</a></h4>
										<div class="info-product-price">
										<i class="fas fa-rupee-sign"></i>&nbsp;<span class="item_price">{pl.productfinalprice}</span>
											<del><i class="fas fa-rupee-sign"></i>&nbsp;{pl.productprice}</del>
										</div>
										<div class="snipcart-details top_brand_home_details item_add single-item hvr-outline-out button2">
										<Link to={`/Product-details/${pl._id}`}>
																		<input type="button" value="View" class="button" /></Link>
														</div>
																			
			</div>
			</div>
				</div>
{/* // </Link> */}
});

var myplist=productlist.slice(0,4)

    return (
        <React.Fragment>
          {/* <!--/tab_one--> */}
		  <div className="tab1">
				{myplist}
				</div>


						{/* <!--//tab_one--> */}  
        </React.Fragment>
    )
}

export default Suitsetshp
