import React from 'react'
import { BrowserRouter as Router, Link, Routes, Route, NavLink } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'; 
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'



const theme = createTheme();

function ProfileEdit() {
    const user = useSelector(state => state.user);

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     // eslint-disable-next-line no-console
    //     console.log({
    //       email: data.get('email'),
    //       password: data.get('password'),
    //     });
    //   };

    const [username, setusername] = useState(user.name);
	const [userphone_number, setuserphone_number] = useState(user.phone_number);
	const [useremail, setuseremail] = useState(user.email)
  var userloginstatus=user.loginstatus
function checkerstatus(params) {
  if (user && userloginstatus=="google") {

    document.getElementById("email").disabled = true

  }
}
  
function updateuser(e) {
  e.preventDefault()
  var id=user._id
    var name=username;
    var phone_number=userphone_number;
    var email=useremail;
    var u={id,name,phone_number,email};
console.log(userloginstatus);
    axios.post('http://localhost:4000/update-user', u).then((res) => {
			console.log(res.data);
			alert(`Profile updated successfully`);
		});
}


    return (
        <div>
            	{/* <!-- /banner_bottom_agile_info --> */}
			<div class="page-head_agile_info_w3l" >
				<div class="container">
					<span><h3>Your Profile</h3></span>
					{/* <!--/w3_short--> */}
					<div class="services-breadcrumb">
						<div class="agile_inner_breadcrumb">

							<ul class="w3_short">
								<li><Link to="/">Home</Link><i>|</i></li>
								<li>Profile</li>
							</ul>
						</div>
					</div>
					{/* <!--//w3_short--> */}
				</div>
			</div>

            <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
          <Box component="form" onSubmit={updateuser} sx={{ mt: 3 }} on onMouseEnter={checkerstatus}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  value={username}
                  onChange={(e)=>{setusername(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={useremail}
                  onChange={(e)=>{setuseremail(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phonenumbber"
                  label="Phone Number"
                  type="number"
                  id="phone"
                  autoComplete="phonenumber"

                  value={userphone_number}
                  onChange={(e)=>{setuserphone_number(e.target.value)}}
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
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
// onClick={updateuser}
>
             Update
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>



        </div>
    )
}

export default ProfileEdit
