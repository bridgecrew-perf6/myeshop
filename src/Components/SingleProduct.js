import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { NavLink, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Productaction from '../actions/ProductAction';
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios';
import CheckCart from '../actions/CheckCart';
import StarIcon from '@mui/icons-material/Star';
import Rating from '@mui/material/Rating';

import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
// import Button from '@mui/material/Button';
import AlertTitle from '@mui/material/AlertTitle';

import CloseIcon from '@mui/icons-material/Close';
import BasicColumnsGrid from './ImageList';


function SingleProduct() {
	const { id2 } = useParams();
	const CheckCartReducer = useSelector(state => state.CheckCartReducer)

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(Productaction({ id2 }));
		// alert("dispatched")
	}, [id2, dispatch]);

	const user = useSelector(state => state.user);
	const productdetail = useSelector(state => state.Productreducer);

	const [qnty, setqnty] = React.useState(1);
	var t=productdetail && productdetail.productfinalprice
	const [totalpricep, settotalpricep] = React.useState(t);
	const [size, setsize] = React.useState('');

	const [review, setreview] = React.useState("");
	const [reviewmessage, setreviewmessage] = React.useState("");
	const [date, setdate] = React.useState(Date);

	const [btnvalue, setbtnvalue] = React.useState('Add to Cart');


	function setvalue(e) {
		e.target.name == "qnty" && setqnty(e.target.value);
		e.target.name === "size" && setsize(e.target.value);
	}
	// console.log(size);

	// console.log(id2);
	// console.log(productdetail);
	function increment() {
		// var x=productdetail.productfinalprice
		// 	// var tpp=
		// 	settotalpricep(qnty*x);
		if (qnty >= 10) {
			alert("Maximun product orders reached");
			setqnty(10);
		} else {
			setqnty(qnty + 1);
		}
		console.log(totalpricep);
	};
	function decrement() {
	
		if (qnty <= 1) {
			alert("quantity cant be zero");
			setqnty(1);
	

		} else {
			setqnty(qnty - 1);
	
		}
	};
	function notfocus() {
		
		if (qnty >= 10) {
			alert("Maximun product orders reached");
			setqnty(10);
		} else if (qnty <= 1) {
			alert("quantity cant be zero");
			setqnty(1);
		}
	
	}
	// console.log(qnty);

	function sendreview(){
		console.log(review);
		console.log(reviewmessage);
		var useremail = user.email
		var companyemail=productdetail.email;
		var productid=productdetail._id;

// console.log(valuer.toLocaleString())
var starReview=valuer;
var reviewstatus="pending review";
var username=user.name;
setdate(Date)
console.log(date);
		var rd={review,reviewmessage,useremail,reviewstatus,username,companyemail,starReview,date,productid}
	axios.post('http://localhost:4000/add-review',rd).then((res)=>{
	  console.log(res.data);
		 if (res.data.status==="ok") {
			// alert("Your Review Added Successfully")
			setOpen(true);
	  }else{
		  alert("no data")
	  }
	})
}
	function TabPanel(props) {
		const { children, value, index, ...other } = props;

		return (
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`simple-tabpanel-${index}`}
				aria-labelledby={`simple-tab-${index}`}
				{...other}
			>
				{value == 0 && (
					<Box sx={{ p: 3 }}>
						<Typography>
							{productdetail && ReactHtmlParser(productdetail.content)}
						</Typography>
					</Box>

				)}
				{value == 1 && (
					<Box sx={{ p: 3 }}>
						<Typography>
							Store Name:{productdetail && productdetail.companyname}<br />
							<strong>Address:</strong>{productdetail && productdetail.companyaddress}<br />
							{productdetail && productdetail.companypincode}<br />
							<p>{productdetail && productdetail.companyphonenumber}</p>

						</Typography>
					</Box>

				)}

				{value == 2 && (
					<Box >
						<Typography>
						{totalpricep}
					</Typography>
					</Box>

				)}
			</div>
		);
	}


	function a11yProps(index) {
		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`,
		};
	}
	
function checkcart(){
	if(user==null){
		alert('please login');
	}else{
	var useremail = user.email
	var productid= productdetail._id;
	dispatch(CheckCart({ useremail,productid}));
	}
}

	function AddtoCart() {
		if(user==null){
			alert('please login');
		}else{
		var useremail = user.email
		var productid=productdetail && productdetail._id;
		dispatch(CheckCart({ useremail,productid}));
		console.log(CheckCartReducer && CheckCartReducer.productid);
		
		if ( CheckCartReducer && CheckCartReducer.productid==productid) {
			alert("Product already exists in Cart");
		}else{
			alert("new product in cart");

		// CheckCartReducer
		var productname=productdetail && productdetail.productname;
		var productqnty=qnty;
		
var pqntyprice=qnty*t
var totalprice=pqntyprice;

		var productsize=size;
		var productimage=productdetail && productdetail.productimage;
		var productfinalprice=productdetail && productdetail.productfinalprice;
var username=user && user.usermain
// var useremail=user.email
var name=user && user.name
		var productdiscount=productdetail && productdetail.productdiscount;
		var statuscart="pending";
		var companyname=productdetail && productdetail.companyname;
		var companyemail=productdetail && productdetail.email;
		var starRating=valuer

		var s={productid,productname,productqnty,productsize,productimage,statuscart,
			productfinalprice,productdiscount,name,username,companyname,companyemail,useremail,totalprice,starRating}

		axios.post('http://localhost:4000/Cart', s).then((res) => {
			console.log(res.data);
			alert(`Product Added  to cart successfully`);
var btnvalue1="Added to Cart"
setbtnvalue(btnvalue1)
		});
// console.log("add to cart")
}
		}
	}

	const [valuer, setValuer] = React.useState(2);
	const [hover, setHover] = React.useState(-1);

	
const labels = {
	0.5: 'Useless',
	1: 'Useless+',
	1.5: 'Poor',
	2: 'Poor+',
	2.5: 'Ok',
	3: 'Ok+',
	3.5: 'Good',
	4: 'Good+',
	4.5: 'Excellent',
	5: 'Excellent+',
  };

	const [value, setValue] = React.useState(0);
	const [open, setOpen] = React.useState(false);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<div>
			{/* <!-- /banner_bottom_agile_info --> */}
			<div class="page-head_agile_info_w3l" >
				<div class="container">
					<span><h3>{productdetail && productdetail.productname}</h3></span>
					{/* <!--/w3_short--> */}
					<div class="services-breadcrumb">
						<div class="agile_inner_breadcrumb">

							<ul class="w3_short">
								<li><Link to="/">Home</Link><i>|</i></li>
								<li>{productdetail && productdetail.category}</li>
							</ul>
						</div>
					</div>
					{/* <!--//w3_short--> */}
				</div>
			</div>

			{/* <!-- banner-bootom-w3-agileits --> */}
			<div class="banner-bootom-w3-agileits">
				<div class="container">
					<div class="col-md-4 single-right-left ">
						<div class="grid images_1_of_1">
							<div class="flexslider">

								<ul class="slides">
									<li data-thumb="images/d2.jpg">
										<div class="thumb-image">
											<img src=
												{productdetail && productdetail.productimage ? `http://localhost:4000/${productdetail.productimage}` : "http://pesmcopt.com/admin-media/images/dummy-product-image.jpg"}
												data-imagezoom="true" class="img-responsive" />
										</div>
									</li>

								</ul>
								<div class="clearfix"></div>
							</div>
						</div>
					</div>
					<div class="col-md-8 single-right-left simpleCart_shelfItem">
						<h3>{productdetail && productdetail.productname}</h3>
						<p><i class="fas fa-rupee-sign"></i>&nbsp;<span class="item_price">{productdetail && productdetail.productfinalprice}</span> <del>-{productdetail && productdetail.productprice}</del></p>
						
						<Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={valuer}
        precision={0.5}
        onChange={(event, newValue) => {
          setValuer(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {valuer !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : valuer]}</Box>
      )}
    </Box>
						<p className="card-text" >
							<small className="text-muted text-center" >
								<div className="" style={{ display: 'flex', border: "1px solid", width: "100px", justifyContent: "center", height: "30px" }}>
									<button type="button" className="" data-btn="plus" onClick={increment}
										style={{ width: "40px", backgroundColor: "transparent", border: "none", position: "relative" }}>+</button>
									<input type="text" className="inputqnty text-center" id={`qnty`} name="qnty" value={qnty} onChange={(e) => { setvalue(e); }}
										style={{ width: "50px", border: "none" }} onBlur={notfocus} />
									<button type="button" className="" data-btn="minus" onClick={decrement}
										style={{ width: "40px", backgroundColor: "transparent", border: "none", position: "relative" }}>-</button>
								</div>
							</small></p>

						{/* <div class="description">
						<h5>Check delivery, payment options and charges at your location</h5>
						 <form action="#" method="post">
						<input type="text" value="Enter pincode" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Enter pincode';}" required=""/>
						<input type="submit" value="Check"/>
						</form>
					</div> */}
						<br />
						<div class="color-quality">
							<div class="color-quality-right">
								<h5>Available Sizes :</h5>
								<select id="size" value={size} name="size" onChange={(e) => {setvalue(e) }} className="frm-field required sect">
								<option value=""></option>
									{productdetail && JSON.parse(productdetail.selected).map((option) => (
										<option value={option.value}>{option.label}</option>
									))}
								</select>
							</div>
						</div>
						{/* <div class="occasional">
						<h5>Types :</h5>
						<div class="colr ert">
							<label class="radio"><input type="radio" name="radio" checked=""><i></i>Casual Shoes</label>
						</div>
						<div class="colr">
							<label class="radio"><input type="radio" name="radio"><i></i>Sneakers </label>
						</div>
						<div class="colr">
							<label class="radio"><input type="radio" name="radio"><i></i>Formal Shoes</label>
						</div>
						<div class="clearfix"> </div>
					</div> */}
						<br />
						<div class="occasion-cart" onMouseEnter={checkcart}>
							<div class="snipcart-details top_brand_home_details item_add single-item hvr-outline-out button2">
							<input type="submit" name="submit" value={btnvalue} onClick={AddtoCart} class="button" />
						</div>
				
					</div>
					<br />
					<Box sx={{ width: '100%' }}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
								<Tab label="Description" {...a11yProps(0)} />
								<Tab label="Vendor Info" {...a11yProps(1)} />
								<Tab label="Review" {...a11yProps(2)} />
							</Tabs>
						</Box>
						<TabPanel value={value} index={0}>
							Description
						</TabPanel>
						<TabPanel value={value} index={1}>
							Vendor Info
						</TabPanel>
						<TabPanel value={value} index={2}>
							Item Three
						</TabPanel>
					</Box>
				</div>
					{/* <!--//tab_one--> */}
			
			<div class="single_page_agile_its_w3ls">
					<div class="bootstrap-tab-text-grids">
						<div class="bootstrap-tab-text-grid">
								{/* <div class="bootstrap-tab-text-grid-left">
								<img src="images/t1.jpg" alt=" " class="img-responsive"/>
							</div> */}
							<div class="bootstrap-tab-text-grid-right">
								<ul>
									<li><br/><a href="#">Elite Shoppy</a></li>
								</ul>
								<p>
								<h2>Have you used this product?</h2><br/>
Your review should be about your experience with the product.
<h2>Why review a product?</h2><br/>
Your valuable feedback will help fellow shoppers decide!
<h2>How to review a product?</h2><br/>
Your review should include facts. An honest opinion is always appreciated. 
If you have an issue with the product or service please contact us from the help centre.
									
									</p>
							</div>
							<div class="clearfix"> </div>
						 </div>
						 <div class="add-review">
							 <h4>Your review</h4>
						 <Rating name="read-only" precision={0.5} value={valuer} readOnly />

							<h4>add a review</h4>
							<input type="text" name="reviewtitle" value={review} placeholder="TITLE" onChange={(e) => { setreview(e.target.value) }} />
							<span></span>
			{/* <input type="text" name="reviewtitle" value={review} onChange={(e) => { setvalue(e); }} placeholder='TITLE'/> */}

			<textarea name="reviewmessage" value={reviewmessage} placeholder='Description' onChange={(e)=>{setreviewmessage(e.target.value)}}></textarea>
			<Box sx={{ width: '100%' }}>

      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
Your Review Added Successfully
        </Alert>
<Alert severity="info">
  <AlertTitle>Info</AlertTitle>
 <strong>Your review will be Updated Soon!</strong>
</Alert>

      </Collapse>
      {/* <Button
        disabled={open}
        variant="outlined"
        onClick={() => {
          setOpen(true);
        }}
      >
        Re-open
      </Button> */}
    </Box>
	<input type="submit" value="SEND" onClick={sendreview}/>


						</div>
					 </div>
					 
				 </div>

				<strong>DISCLAIMER:</strong> Slight colour variations may occur due to different screen resolutions.

			</div>
		</div>
			
		</div >

	)
}

export default SingleProduct
