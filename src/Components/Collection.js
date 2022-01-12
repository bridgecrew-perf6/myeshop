import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink,Link, useParams } from 'react-router-dom';
// import { CollectionAction } from '../actions/CollectionAction';
import { useDispatch, useSelector } from 'react-redux';
import DynamicBounds1  from "./DynamicBounds";


import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
const { Range } = Slider;

function Collection() {
	const dispatch = useDispatch();
	const [swproduct, setswproduct] = useState([]);
	const [min, setmin] = useState();
	const [max, setmax] = useState();
	const [sorting, setsorting] = useState(" ");
	// const collectionProduct = useSelector(state => state.Collectionreducer)
	const { id1 } = useParams();
	console.log(sorting);
	useEffect(() => {
		// dispatch(CollectionAction({ id1 }));
		console.log(id1);
		axios.post('http://localhost:4000/collection', { id1 }).then(
			(res) => {
				console.log(res.data.data);
				setswproduct(res.data.data);
			},
		)
	}, [id1]);
	
	
	function setvalue(e) {
		e.target.name === "setsorting" && setsorting(e.target.value);
	}


	var totalmin=0;
	var totalmax=10000;
	function DynamicBounds(params) {
		const onSliderChange = (e) => {
			setmin(e[0]);
			setmax(e[1]);
		}
		// const onMinChange = (e) => {
		// 	setmin(e.target.value || 0);
		// 	}
		// const onMaxChange = (e) => {
		// 	setmax(e.target.value || 0);
		// 		}

		return (
			<div>
			  <label>Min: {min}</label>&nbsp;<i class="fas fa-rupee-sign"></i>&nbsp;&nbsp;-&nbsp;&nbsp;
			  {/* <input type="number" value={min} onChange={(e)=>{onMinChange(e);}} /> */}
			  <label>Max: {max}</label>&nbsp;<i className="fas fa-rupee-sign"></i>&nbsp;&nbsp;
			  {/* <input type="number" value={max} onChange={(e)=>{onMaxChange(e);}}/> */}
			  <br />
			  <br />
			  <Range
				defaultValue={[20, 50]}
				min={totalmin}
				max={totalmax}
				onChange={(e)=>{onSliderChange(e);}}
			  />
			</div>
		  );
	}
   
	var p = swproduct.map((pl) => {
		// return <h1>in return hello{pl.productid}</h1>
		return		<div className="col-md-4 product-men">
			<div className="men-pro-item simpleCart_shelfItem">
									<div className="men-thumb-item">
										<img src={ pl.productimage ?  `http://localhost:4000/${pl.productimage}` : "http://pesmcopt.com/admin-media/images/dummy-product-image.jpg"}
										 alt="" />
										
											<div className="men-cart-pro">
												<div className="inner-men-cart-pro">
													<NavLink exact to={`/Product-details/${pl._id}`} className="link-product-add-cart" activeclassName="active">Quick View</NavLink>
												</div>
											</div>
											<span className="product-new-top">{pl.productdiscount}% Off</span>
											
									</div>
									<div className="item-info-product ">
										<h4><Link to={`/Product-details/${pl._id}`}>{pl.productname}</Link></h4>
										<div className="info-product-price">
											<span className="item_price">{pl.productfinalprice}</span>
											<del>{pl.productprice}</del>
										</div>
										<div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out button2">
										<input type="submit" name="submit" value="Add to cart" class="button" />

														</div>
																			
									</div>
								</div>
				</div>
		
	})
	var myplist=p.slice(0,3);
	var myplistall=p.slice(3);
	
	return (
		<>
			{/* <!-- /banner_bottom_agile_info --> */}
			<div className="page-head_agile_info_w3l">
				<div className="container">
					<h3>{id1}</h3>
					{/* <!--/w3_short--> */}
					<div className="services-breadcrumb">
						<div className="agile_inner_breadcrumb">

							<ul className="w3_short">
								<li><a href="index.html">Home</a><i>|</i></li>
								<li>{id1}</li>
							</ul>
						</div>
					</div>
					{/* <!--//w3_short--> */}
				</div>
			</div>

			{/* <!-- banner-bootom-w3-agileits --> */}
			<div className="banner-bootom-w3-agileits">
				<div className="container">
					{/* <!-- mens --> */}
					<div className="col-md-4 products-left">
						<div className="filter-price">
							<h3>Filter By <span>Price</span></h3>
							<br/>
							<ul className="dropdown-menu6">
								<li>
								<div>
	  {DynamicBounds()}
    </div>
									{/* <input type="text" id="amount" style={{ border: "0", color: "#ffffff", fontWeight: "normal" }} /> */}
								</li>
							</ul>
						</div>
<DynamicBounds1/>

						<div className="clearfix"></div>
					</div>

					
		<div className="col-md-8 products-right">
			<h5>Shop</h5>
			{/* <div className="sort-grid">
				<div className="sorting">
					<h6>Sort By</h6>

					<select id="setsorting" value={sorting} onChange={(e)=>{setvalue(e)}} name="setsorting" className="frm-field required sect">
					
					    <option value="Default">Default</option>
						<option value="NameA">Name(A - Z)</option> 
						<option value="NameZ">Name(Z - A)</option>
						<option value="Pricehigh">Price(High - Low)</option>
						<option value="Pricelow">Price(Low - High)</option>	
							
					</select>

					<div className="clearfix"></div>
				</div>
				<div className="sorting">
					<h6>Showing</h6>
					<select id="country2"  className="frm-field required sect">
						<option value="null">7</option>
						<option value="null">14</option> 
						<option value="null">28</option>					
						<option value="null">35</option>								
					</select>
					<div className="clearfix"></div>
				</div>
				<div className="clearfix"></div>
			</div> */}
			<div className="men-wear-top">
				
				{/* <div  id="top" className="callbacks_container">
					<ul className="rslides" id="slider3">
						<li>
							<img className="img-responsive" src="../images/banner2.jpg" alt=" "/>
						</li>
						<li>
							<img className="img-responsive" src="images/banner5.jpg" alt=" "/>
						</li>
						<li>
							<img className="img-responsive" src="images/banner2.jpg" alt=" "/>
						</li>
					</ul>
				</div>
				<div className="clearfix"></div> */}
			</div>
			<div className="men-wear-bottom">
				{/* <div className="col-sm-4 men-wear-left">
					<img className="img-responsive" src="../images/bb2.jpg" alt=" " />
				</div> */}
				<div className="col-sm-8 men-wear-right">
					<h4>{id1} <span>Collections</span></h4>
					<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem 
					accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae 
					ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
					explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
					odit aut fugit. </p>
				</div>
				<div className="clearfix"></div>
			</div>
							{myplist}
				
				<div className="clearfix"></div>
		</div>
		<div class="single-pro">
			{myplistall}
</div>

				</div>
			</div>
		</>


	)
}

export default Collection
