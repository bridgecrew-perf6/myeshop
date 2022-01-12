import firebase from '../firebase'
import { getAuth, RecaptchaVerifier, signInWithPopup
	,signInWithPhoneNumber ,createUserWithEmailAndPassword,
	FacebookAuthProvider,GoogleAuthProvider,onAuthStateChanged} from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Link, Routes, Route, NavLink } from "react-router-dom";
import axios from 'axios';
import { checkLogin, checkLogingoogle } from '../actions/userAction';
import About from './About';
import Home from './Home';
import Collection from './Collection';
import SingleProduct from './SingleProduct';
import Shoppingcart from './Shoppingcart';
import Checkout from './Checkout';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Logout from '@mui/icons-material/Logout';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ProfileEdit from './ProfileEdit';
import Myorders from './myorders';

const StyledBadge = styled(Badge)(({ theme }) => ({
	'& .MuiBadge-badge': {
	  right: -3,
	  top: 13,
	  border: `2px solid ${theme.palette.background.paper}`,
	  padding: '0 4px',
	},
  }));
  function stringToColor(string) {
	let hash = 0;
	let i;
  
	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
	  hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}
  
	let color = '#';
  
	for (i = 0; i < 3; i += 1) {
	  const value = (hash >> (i * 8)) & 0xff;
	  color += `00${value.toString(16)}`.substr(-2);
	}
	/* eslint-enable no-bitwise */
  
	return color;
  }
  
  function stringAvatar(name) {
	return {
	  sx: {
		bgcolor: stringToColor(name),
	  },
	  children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
	};
  }

function Headernav() {
	const dispatch = useDispatch()
	const auth = firebase.auth();
	const provider = new  firebase.auth.FacebookAuthProvider();
	const gprovider = new GoogleAuthProvider();


	// Inputs
	const user = useSelector(state => state.user);
	const [name, setname] = useState("");
	const [phone_number, setphone_number] = useState("");
	const [otp, setotp] = useState('');
	const [email, setemail] = useState('')
	const [password, setpassword] = useState('');
	// const [address, setaddress] = useState('');
	const [loginemail,setloginemail]=useState('');
	const [loginpassword,setloginpassword] = useState('');
	const [cart, setcart] = useState([]);
	const [prod_nav, setprod_nav] = useState('');
	useEffect(() => {
		window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
			"recaptchacontainer", {
			size: "invisible",
			callback: function (response) {
				console.log("Captcha Resolved");
				console.log(response);

			},
			defaultCountry: "IN",
		}
		);
	}, []);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
	  setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
	  setAnchorEl(null);
	};

	var useremail =user && user.email;
	useEffect(() => {
		axios.post('http://localhost:4000/Cart-list', { useremail }).then(
		  (res) => {
			console.log(res.data.data);
			setcart(res.data.data);
		  },
		)
	  }, [useremail]);

function upcartlen() {
		axios.post('http://localhost:4000/Cart-list', { useremail }).then(
		  (res) => {
			console.log(res.data.data);
			setcart(res.data.data);
		  },
		)
		}
	const loginSubmit = (e) => {
		e.preventDefault();

		let phone_number1 = '+91' + phone_number;
		const appVerifier = window.recaptchaVerifier;
		console.log(phone_number1);

		createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
		  // Signed in 
		  const user = userCredential.user;
		  console.log(user);
		  // ...

		  auth.signInWithPhoneNumber(phone_number1, appVerifier).then((confirmationResult) => {
			// SMS sent. Prompt user to type the code from the message, then sign the
			// user in with confirmationResult.confirm(code).
			alert("code sent")
			console.log("otp sent");
			console.log(phone_number1);
			window.confirmationResult = confirmationResult;
			console.log(confirmationResult);
			// ...
		})
			.catch((error) => {
				// Error; SMS not sent
				// ...

				alert(error.message);
			});

		})
		.catch((error) => {
		  const errorCode = error.code;
		  const errorMessage = error.message;
		  console.log(errorMessage); 
		  console.log(errorCode);
	
		  // ..
		  if (errorCode=='auth/invalid-email') {
			alert('incorrect email format')
		  }
		  else if (errorCode=='auth/email-already-in-use') {
			alert('email already in use')
		  }
		  else if (errorCode=='auth/weak-password'){
			  alert('weak password')
		  }
		});
	};

	const otpSubmit = (e) => {
		e.preventDefault();

		let opt_number = otp;
		window.confirmationResult
			.confirm(opt_number)
			.then((confirmationResult) => {
				console.log(confirmationResult);
				console.log("success");
				// alert("welcomeMessage");
				var loginstatus="userotp"
				let usermain="user"

				var s={name,email,password,phone_number,loginstatus,usermain}
				axios.post('http://localhost:4000/Register',s).then((res)=>{
				  console.log(res.data);
				  alert( `${name} you are Registered successfully`);

				})

			})
			.catch((error) => {
				// User couldn't sign in (bad verification code?)
				alert('OTP INCORRECT');

			});

		
	};

	const fblogin = (e) => {
		// provider.addScope('user_birthday');
		signInWithPopup(auth, provider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });
// alert('ruko ')
	}
const googlelogin =(e)=>{
	signInWithPopup(auth, gprovider)
	.then((result) => {
	  // This gives you a Google Access Token. You can use it to access the Google API.
	  const credential = GoogleAuthProvider.credentialFromResult(result);
	  const token = credential.accessToken;
	  // The signed-in user info.
	  const user = result.user;
	  console.log(user);
	  // ...
	  let email=user.email
	  let phone_number=user.phoneNumber;
	  let name=user.displayName;
	  let loginstatus="google"
	  let usermain="user"
console.log(email);
axios.post('http://localhost:4000/Check-email',{email}).then(
	(res)=>{
if (res.data.status ==="ok") {
	console.log(res.data);
	alert("You Are Logged In")
	localStorage.setItem("email",email);
	console.log(localStorage.getItem("email"));
	dispatch(checkLogingoogle({email}));
}else{
	var s={name,email,phone_number,loginstatus,usermain}
	axios.post('http://localhost:4000/Register',s).then((res)=>{
	  console.log(res.data);
	  alert( `${name} You are Registered successfully`);
   // console.log(res.data.status);
		 if (res.data.status==="ok") {
			alert("You Are Logged In")
			localStorage.setItem("email", {email});
			dispatch(checkLogingoogle({email}));
	  }else{
		  alert("no data")
	  }
    //   dispatch(checkLogingoogle({email}));
	})
}
	}
)



	//   dispatch(checkLogin({loginemail,loginpassword}));
	// console.log(googleemail);
	// console.log(googlephonenumber);
	// console.log(googledisplayname);

	}).catch((error) => {
	  // Handle Errors here.
	  const errorCode = error.code;
	  const errorMessage = error.message;
	  // The email of the user's account used.
	  const email = error.email;
	  // The AuthCredential type that was used.
	  const credential = GoogleAuthProvider.credentialFromError(error);
	  // ...
	});
}

function dispatchAuth() {
    // alert("dispatchAuth");
var usermain="user"
	// alert(loginemail);
    // alert(loginpassword);
        dispatch(checkLogin({loginemail,loginpassword,usermain}));
		localStorage.setItem("email", {loginemail});

     
}

function logout() {
    dispatch({ type: 'LOGOUT_USER' });
    alert('logged out');
  }

var useravatar=user && user.name
	return (
		<React.Fragment>
			<div className="header" id="home">
				<div className="container">
					<ul>
						<li> <a href="#" data-toggle="modal" data-target="#myModal"><i className="fa fa-unlock-alt" aria-hidden="true"></i> Sign In </a></li>
						<li> <a href="#" data-toggle="modal" data-target="#myModal2"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Sign Up </a></li>
						<li><i className="fa fa-phone" aria-hidden="true"></i> Call : 01234567898</li>
						<li><i className="fa fa-envelope-o" aria-hidden="true"></i> <a href="mailto:info@example.com">info@example.com</a></li>
						{/* <li><i className="fa fa-envelope-o" aria-hidden="true"></i> */}
						 {/* <NavLink to="/vendor/Dashboard"  exact activeclassname="active">Dashboard</NavLink></li> */}
					</ul>
				</div>
			</div>
			{/* <!-- //header --> */}

			{/* <!-- header-bot --> */}
			<div className="header-bot">
				<div className="header-bot_inner_wthreeinfo_header_mid">
					<div className="col-md-4 header-middle">
						<form action="#" method="post">
							<input type="search" name="search" placeholder="Search here..." required="" />
							<input type="submit" value=" " />
							<div className="clearfix"></div>
						</form>
					</div>
					{/* <!-- header-bot --> */}
					<div className="col-md-4 logo_agile">
						<h1><a href="index.html"><span>E</span>lite Shoppy <i className="fa fa-shopping-bag top_logo_agile_bag" aria-hidden="true"></i></a></h1>
					</div>
					{/* <!-- header-bot --> */}
					<div className="col-md-4 agileits-social top_content">
						{user&& <ul className="social-nav model-3d-0 footer-social w3_agile_social">
							<li className="">
								
								Hello
							
							</li>
							<li><a href="#">
							{/* <Avatar {...stringAvatar(useravatar)} /> */}
								<div className="front">
									
								<Box >
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
             <Avatar {...stringAvatar(useravatar)} />
          </IconButton>
        </Tooltip>
      </Box>									
									</div>
								 <div className="back">
									 
								 <Box >
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar {...stringAvatar(useravatar)} />
          </IconButton>
        </Tooltip>
      </Box>								
	  <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link to="/profile">
		<MenuItem>
          <Avatar /> Profile
        </MenuItem>
		</Link>
		<Link  to="/My-Orders">
        <MenuItem >
		<FileCopyIcon />
		   My Orders
        </MenuItem>
		</Link>
        <Divider />
  
     
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>	 
									 </div>
								 </a>
							</li>
						</ul>}
					</div>
					<div className="clearfix"></div>
				</div>
				{/* <!-- //header-bot --> */}
			</div>

			{/* <!-- banner --> */}
			<div className="ban-top">
				<div className="container">
					<div className="top_nav_left">
						<nav className="navbar navbar-default">
							<div className="container-fluid">
								{/* <!-- Brand and toggle get grouped for better mobile display --> */}
								<div className="navbar-header">
									<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
										<span className="sr-only">Toggle navigation</span>
										<span className="icon-bar"></span>
										<span className="icon-bar"></span>
										<span className="icon-bar"></span>
									</button>
								</div>
								{/* <!-- Collect the nav links, forms, and other content for toggling --> */}
								<div className="collapse navbar-collapse menu--shylock" id="bs-example-navbar-collapse-1">
									<ul className="nav navbar-nav menu__list">
										<li className="active menu__item menu__item--current">
											<NavLink className="menu__link" exact activeclassname="active" to="/" >Home <span className="sr-only">(current)</span></NavLink></li>
										<li className=" menu__item">
											<NavLink  activeclassname="active" to="/about" className="menu__link">About
										    </NavLink>
										</li>
										<li className=" menu__item">
											<NavLink  activeclassname="active" to="/about" className="menu__link">Exclusive
										    </NavLink>
										</li>
										<li className="dropdown  menu__item">
											<a href="#" className="dropdown-toggle menu__link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Suits<span className="caret"></span></a>
											<ul className="dropdown-menu multi-column columns-3">
												<div className="agile_inner_drop_nav_info">
													<div className="col-sm-6 multi-gd-img1 multi-gd-text ">
														<a href="mens.html"><img src="https://www.adyacouture.com/uploads/adya-coutures/products/2y5a4767-138334_l.jpg?param=7.jpg" alt=" " /></a>
													</div>
													<div className="col-sm-3 multi-gd-img" >
														<ul className="multi-column-dropdown">
															<li><Link  activeclassname="active" to={`/Suits/Simple salwar Suit`} value="Simple salwar set">Simple salwar set</Link></li>
															<li><Link  activeclassname="active" to={`/Suits/Anarkali salwar Set`} value="Anarkali salwar Set">Anarkali salwar Set</Link></li>
															<li><Link  activeclassname="active" to={`/Suits/Designer Salwar Suit`} value="Designer Salwar Suit">Designer Salwar Suit</Link></li>

														</ul>
													</div>
													<div className="col-sm-3 multi-gd-img">
														<ul className="multi-column-dropdown">
															<li><Link  activeclassname="active" to={`/Suits/kota doria suits`} value="kota doria suits">kota doria suits </Link></li>
															<li><Link  activeclassname="active" to={`/Suits/Patiala Salwar Suit`} value="Patiala Salwar Suit">Patiala Salwar Suit </Link></li>
															<li><Link  activeclassname="active" to={`/Suits/Embroidered Salwar Kameez`} value="Embroidered Salwar Kameez">Embroidered Salwar Kameez </Link></li>
															
														</ul>
													</div>
													<div className="clearfix"></div>
												</div>
											</ul>
										</li>
										<li className="dropdown menu__item">
											<a href="#" className="dropdown-toggle menu__link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Sarees<span className="caret"></span></a>
											<ul className="dropdown-menu multi-column columns-3">
												<div className="agile_inner_drop_nav_info">
													<div className="col-sm-3 multi-gd-img">
														<ul className="multi-column-dropdown">
														<li><Link  activeclassname="active" to={`/sarees/The Bandhani Saree`} value="The Bandhani Saree">The Bandhani Saree </Link></li>
														<li><Link  activeclassname="active" to={`/sarees/The Kota Saree`} value="The Kota Saree">The Kota Saree </Link></li>
														<li><Link  activeclassname="active" to={`/sarees/The Printed Sarees`} value="The Printed Sarees">The Printed Sarees </Link></li>
														
														</ul>
													</div>
													<div className="col-sm-3 multi-gd-img">
														<ul className="multi-column-dropdown">
														<li><Link  activeclassname="active" to={`/sarees/The Chanderi Saree`} value="The Chanderi Saree">The Chanderi Saree </Link></li>
														<li><Link  activeclassname="active" to={`/sarees/Chiffon Saree`} value="Chiffon Saree">Chiffon Saree</Link></li>
														<li><Link  activeclassname="active" to={`/sarees/Georgette Sarees`} value="Georgette Sarees">Georgette Sarees</Link></li>
															
														</ul>
													</div>
													<div className="col-sm-6 multi-gd-img multi-gd-text ">
														<a href="womens.html"><img src="https://cdn.shopify.com/s/files/1/2542/7564/products/Untitleddesign_7_c0e2f148-3407-4985-9c15-efdda3cb7f31_1000x.png?v=1641097793" alt=" " /></a>
													</div>
													<div className="clearfix"></div>
												</div>
											</ul>
										</li>
										<li className="dropdown menu__item">
											<a href="#" className="dropdown-toggle menu__link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Kurta sets<span className="caret"></span></a>
											<ul className="dropdown-menu multi-column columns-3">
												<div className="agile_inner_drop_nav_info">
													<div className="col-sm-3 multi-gd-img">
														<ul className="multi-column-dropdown">
														<li><Link  activeclassname="active" to={`/kurta set/Kaftan Set`} value="Kaftan Set">Kaftan Set</Link></li>
														<li><Link  activeclassname="active" to={`/kurta set/kurta Dupatta Set`} value="kurta Dupatta Set">kurta Dupatta Set</Link></li>
				
														</ul>
													</div>
													<div className="col-sm-3 multi-gd-img">
														<ul className="multi-column-dropdown">
														<li><Link  activeclassname="active" to={`/kurta set/Kurta Sharara Set`} value="Kurta Sharara Set">Kurta Sharara Set</Link></li>

									 						{/* <li><a href="womens.html">Kurta Sharara Set</a></li> */}
															
														</ul>
													</div>
													<div className="col-sm-6 multi-gd-img multi-gd-text ">
														<a href="womens.html"><img src="https://cdn.shopify.com/s/files/1/2542/7564/products/20_2716208a-1ddb-44ec-a0b9-677dfa3cc381_1440x1800.png?v=1632487714" alt=" " /></a>
													</div>
													<div className="clearfix"></div>
												</div>
											</ul>
										</li>
										{/* <li className="menu__item dropdown">
											<a className="menu__link" href="#" className="dropdown-toggle" data-toggle="dropdown">Short Codes <b className="caret"></b></a>
											<ul className="dropdown-menu agile_short_dropdown">
												<li><a href="icons.html">Web Icons</a></li>
												<li><a href="typography.html">Typography</a></li>
											</ul>
										</li> */}
										{/* {user&&<li className=" menu__item"><a className="menu__link"></a></li>}
										{!user&&<li className=" menu__item"><a className="menu__link" href="contact.html">Contact</a></li>} */}
									</ul>
								</div>
							</div>
						</nav>
					</div>
					<div className="top_nav_right">
						<div className="wthreecartaits wthreecartaits2 box_1">
						<StyledBadge badgeContent={cart.length}onMouseOver={upcartlen} color="secondary">

								<Link to="/shopping-cart"><button className="w3view-cart" type="submit" name="submit" value="">
									<i className="fa fa-cart-arrow-down" aria-hidden="true"></i></button>
</Link>
</StyledBadge>

						</div>
					</div>
					<div className="clearfix"></div>
				</div>
			</div>
			{/* <!-- //banner-top --> */}

			{/* <!-- Modal1 --> */}
			<div className="modal fade" id="myModal" tabindex="-1" role="dialog">
				<div className="modal-dialog">
					{/* <!-- Modal content--> */}
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal">&times;</button>
						</div>
						<div className="modal-body modal-body-sub_agile">
							<div className="col-md-8 modal_body_left modal_body_left1">
								<h3 className="agileinfo_sign">Sign In <span>Now</span></h3>
								<form >
									<div className="styled-input">
										<input type="email" name="Email" 
										value={loginemail}
										onChange={(e) => { setloginemail(e.target.value) }} required="" />
										<label>Email</label>
										<span></span>
									</div>
									<div className="styled-input agile-styled-input-top">
										<input type="password" name="password"
										value={loginpassword}
										onChange={(e) => { setloginpassword(e.target.value) }} required="" />
										<label>password</label>
										<span></span>
									</div>
									<input type="button" value="Sign In" onClick={dispatchAuth} />
								</form>
								<ul className="social-nav model-3d-0 footer-social w3_agile_social top_agile_third">
									<li><a href="#" className="facebook" onClick={fblogin}>
										<div className="front"><i className="fab fa-facebook" aria-hidden="true"></i></div>
										<div className="back"><i className="fab fa-facebook" aria-hidden="true"></i></div></a>
									</li>
									<li><a href="#" className="google" onClick={googlelogin}>
										<div className="front"><i className="fab fa-google" aria-hidden="true"></i></div>
										<div className="back"><i className="fab fa-google" aria-hidden="true"></i></div></a></li>
								</ul>
								<div className="clearfix"></div>
								<p><a href="#" data-toggle="modal" data-target="#myModal2" > Don't have an account?</a></p>

							</div>
							<div className="col-md-4 modal_body_right modal_body_right1">
								<img src="images/log_pic.jpg" alt=" " />
							</div>
							<div className="clearfix"></div>
						</div>
					</div>
					{/* <!-- //Modal content--> */}
				</div>
			</div>
			{/* <!-- //Modal1 --> */}
			{/* <!-- Modal2 --> */}
			<div className="modal fade" id="myModal2" tabindex="-1" role="dialog" >
				<div className="modal-dialog">
					{/* <!-- Modal content--> */}
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal">&times;</button>
						</div>
						<div className="modal-body modal-body-sub_agile">
							<div className="col-md-8 modal_body_left modal_body_left1">
								<h3 className="agileinfo_sign">Sign Up <span>Now</span></h3>
								<form action="#" onSubmit={loginSubmit}>
									<div className="styled-input agile-styled-input-top">
										<input type="text" name="Name" value={name}
										onChange={(e) => { setname(e.target.value) }} required="" />
										<label>Name</label>
										<span></span>
									</div>
									<div className="styled-input">
										<input type="email" name="email" value={email} required=""
										onChange={(e) => { setemail(e.target.value) }} />
										<label>Email</label>
										<span></span>
									</div>
									<div className="styled-input">
										<input type="number" name="Number" value={phone_number}
											onChange={(e) => { setphone_number(e.target.value) }} />
										<label>Mobile Number</label>
										<span></span>
									</div>
									<div className="styled-input">
										<input type="password" name="password" value={password}
										onChange={(e) => { setpassword(e.target.value) }} required="" />
										<label>Password</label>
										<span></span>
									</div>
									{/* <div className="styled-input">
										<textarea type="address" name="address" value={address}
										onChange={(e) => { setaddress(e.target.value) }} required="" />
										<label>address</label>
										<span></span>
									</div> */}
									<div id="recaptchacontainer">

									</div>
									<input type="submit" id="sign-in-button" data-toggle="modal" data-target="#myModal3" 
									value="Verify"/>

								</form>

								{/* <h2>Enter OTP</h2>
        <form onSubmit={otpSubmit}>
          <input type="number" name={otp} placeholder="OTP Number" onChange={(e) => { setotp(e.target.value) }}/>
          <button type="submit">Submit</button>        
								</form> */}
								<div className="clearfix"></div>
								<p><a href="#">By clicking register, I agree to your terms</a></p>

							</div>
							<div className="col-md-4 modal_body_right modal_body_right1">
								<img src="images/log_pic.jpg" alt=" " />
							</div>
							<div className="clearfix"></div>
						</div>
					</div>
					{/* <!-- //Modal content--> */}
				</div>
			</div>
			{/* <!-- //Modal2 --> */}

			{/* <!-- Modal3 --> */}
			<div className="modal fade" id="myModal3" tabindex="-1" role="dialog">
				<div className="modal-dialog">
					{/* <!-- Modal content--> */}
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal">&times;</button>
						</div>
						<div className="modal-body modal-body-sub_agile">
							<div className="col-md-8 modal_body_left modal_body_left1">
								<h3 className="agileinfo_sign">Verify<span>Now</span></h3>
								<form onSubmit={otpSubmit}>
									<div className="styled-input">
										<input type="number" name={otp} placeholder="OTP Number" onChange={(e) => { setotp(e.target.value) }} />
										<label>OTP Number</label>
										<span></span>
									</div>
									<input type="submit" id="sign-UP-button" value="Register"/>
								</form>

								{/* <input type="submit" value="Sign In"/> */}

								<div className="clearfix"></div>
							</div>
							<div className="col-md-4 modal_body_right modal_body_right1">
								<img src="images/log_pic.jpg" alt=" " />
							</div>
							<div className="clearfix"></div>
						</div>
					</div>
					{/* <!-- //Modal content--> */}
				</div>
			</div>
			{/* <!-- //Modal3 --> */}
<Routes>
{/* <Route path="/vendor/Dashboard" exact element={<AdminHeadernav/>} /> */}
<Route path="/" exact element={<Home/>} />
<Route path="/about"  element={<About />} />
<Route path="/:id/:id1"  element={<Collection/>} />

<Route path="/Product-details/:id2" element={<SingleProduct/>} />
{user && <Route path="/shopping-cart" element={<Shoppingcart/>} />}
{!user && <Route path="/shopping-cart" element={<Home/>} />}
{user && <Route path="/Checkout/:id3" element={<Checkout/>} />}
{!user && <Route path="/shopping-cart" element={< Home/>} />}
{user && <Route path="/profile" element={<ProfileEdit/>} />}
{!user && <Route path="/profile" element={< Home/>} />}


{user && <Route path="/My-Orders" element={<Myorders/>} />}
{!user && <Route path="/My-Orders" element={< Home/>} />}

</Routes>
		</React.Fragment>
	)
}

export default Headernav
