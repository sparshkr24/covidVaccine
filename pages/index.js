import * as React from "react";
import api from "../helper/api";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import DataObjectIcon from "@mui/icons-material/DataObject";
import { TextField } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Shivendra
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Album() {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (!token) {
      router.push("/login");
    } else {
      setUser(userData);
    }
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get(`/centers/all?page=${page}`);
      const newData = res.data;
      setData((prevData) => [...prevData, ...newData]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      fetchData();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log("centres: ", data);
  }, [data]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    router.push("/login");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { city } = event.currentTarget.elements;

    const userData = {
      city: city.value,
    };

    if (!userData.city) {
      toast.error("Please enter your city");
      return;
    }
    // console.log(userData);

    // try {
    //   const res = await api.get("/centers/all");
    //   const { message, user } = res.data;
    //   console.log(message);

    //   const { currentUser, token } = user;
    //   localStorage.setItem("token", token);
    //   localStorage.setItem("userData", JSON.stringify(currentUser));

    //   if (token) {
    //     toast.success("User Logged In");
    //     setTimeout(() => {
    //       router.push("/");
    //     }, 1200);
    //   }
    // } catch (error) {
    //   console.error(error);
    //   toast.error("Invalid email or password");
    // }
  };
  // console.log(user);
  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer />
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid>
              <DataObjectIcon sx={{ mr: 2 }} />
              <Typography variant="h6" color="inherit" noWrap>
                Covid vaccine
              </Typography>
            </Grid>
            <Grid>
              Welcome!{" "}
              <span className="font-bold text-xl"> {user?.username} </span>
            </Grid>
            <Grid>
              {" "}
              <button
                onClick={handleLogout}
                className="hover:text-blue-600 hover:bg-white py-1.5 px-4 rounded-xl hover:scale-110 duration-300"
              >
                {" "}
                Logout
              </button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Enter your city
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Book slots for covid vaccination with simple steps.
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="city"
                label="City"
                name="city"
                autoComplete="city"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
              >
                Search
              </Button>
            </Box>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Looking forward to hearing from you soon
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
