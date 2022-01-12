import * as React from 'react';
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';


const theme = createTheme();

export default function SignUp() {

    const { id3 } = useParams();
// console.log(id3);
var checkoutprice=id3;

    const user = useSelector(state => state.user);
    const productdetail = useSelector(state => state.Productreducer);

    const [cart, setcart] = useState([]);
    const [state, setstate] = useState('');
    // const [firstname, setfirstname] = useState('');
    // const [lastname, setlastname] = useState('');
    const [address, setaddress] = useState('');
    const [pin, setpin] = useState('');
    const [city, setcity] = useState('');
    const [phonenumber, setphonenumber] = useState('');
  
    var useremail = user.email
    useEffect(() => {
      axios.post('http://localhost:4000/Cart-list', { useremail }).then(
        (res) => {
          console.log(res.data.data);
          setcart(res.data.data);
  
        },
      )
    }, [useremail]);
    
    var options = {
        "key": "rzp_test_4PQEuL5L8TuQKL", // Enter the Key ID generated from the Dashboard
        "amount": (checkoutprice*100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Elite Shoppy",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        // "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response){
          var useremail=user.email;
          cart && cart.filter(cartp => cartp.useremail == user.email).map((pl) =>
          {
            // alert(response.razorpay_payment_id);
            var rpi=response.razorpay_payment_id;
        //  alert(rpi)
        var useremail=pl.useremail;
        var useraddress=address;
        var userpin=pin;
        var usercity=city;
        var userstate=state;
        var username=pl.name
        var starrating=pl.starRating;
        var userphonenumber=phonenumber;
        var companyemail=pl.companyemail;
        var productname=pl.productname
        var producttotalprice=pl.totalprice;
        var productfinalprice=pl.productfinalprice;
        var productimage=pl.productimage
        var productqnty=pl.productqnty
        var productid=pl.productid
        var productsize=pl.productsize
        var status="ordered";

        var z={useremail,status,useraddress,userpin,usercity,userstate,
          userphonenumber,companyemail,productimage,productname,producttotalprice,productfinalprice,productqnty,username,productsize,
          starrating,rpi}

        axios.post('http://localhost:4000/add-order', z).then((res) => {
          console.log(res.data);
          alert(`Product Added  to order successfully`);

          })
          axios.post('http://localhost:4000/remove-cart', { useremail }).then(
            (res) => {
              console.log(res.data.data);
              // setcart(res.data.data);
              alert(`cart Product deleted successfully`);

            },
          )
        // var cartdata=cart.filter(cartp => cartp.useremail == user.email);
        // var z={useremail,status,useraddress,userpin,usercity,userstate,userphonenumber,companyemail,companyname,cartdata,rpi}

        // axios.post('http://localhost:4000/add-order', z).then((res) => {
        //   console.log(res.data);
        //   alert(`Product Added  to order successfully`);

        //   axios.post('http://localhost:4000/remove-cart', { useremail }).then(
        //     (res) => {
        //       console.log(res.data.data);
        //       // setcart(res.data.data);
      
        //     },
        //   )
        });

        },
        "prefill": {
            "name": user.name,
            "email": user.email,
            "contact": phonenumber
        },
        "notes": {
            "address": address,
            "pincode": pin
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
});
function checkout(e) {
    rzp1.open();
    e.preventDefault();
 
}

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
<h2>Checkout</h2>
<br/><hr/>
          <Typography component="h1" variant="h5">
            Shipping Address
          </Typography>
          <Box component="form"  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  
                  value={firstname}
                  onChange={(e)=>setfirstname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  
                  value={lastname}
                  onChange={(e)=>setlastname(e.target.value)}
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                
                  id="phonenumber"
                  label="Phone-Number"
                  name="phone"
                  autoComplete="phone"
                
                  value={phonenumber}
                  onChange={(e)=>setphonenumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={2}
                  id="Address"
                  label="Address"
                  name="Address"
                  autoComplete="addresss"
                
                  value={address}
                  onChange={(e)=>setaddress(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="postal-code"
                  name="pincode"
                  required
                  fullWidth
                  id="pincode"
                  label="Postal Code"
                  autoFocus
                  
                  value={pin}
                  onChange={(e)=>setpin(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="city"
                  
                  value={city}
                  onChange={(e)=>setcity(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="state"
                  name="state"
                  required
                  fullWidth
                  id="state"
                  label="State"
                  autoFocus
                  value={state}
                  onChange={(e)=>setstate(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="Country"
                  label="Country"
                  name="country"
                  autoComplete="country"
                />
              </Grid>

              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={checkout}
            >
              Place Order
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                {/* <Link to="/shopping-cart">
                  Back To Cart
                </Link> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}