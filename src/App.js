import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link 
  } from "react-router-dom";
  import Navbar from "./componenets/Navbar";
import { Home } from "./componenets/Home";
import About from "./componenets/About";
import NoteState from "./context/NoteState";
import Alert from "./componenets/Alert";
import signup from "./componenets/signup";
import login from "./componenets/login";
import { useState } from "react";

function App() {
  const [alert, setAlert]= useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);

    },1500);
  }
  return (
    <>
    <NoteState>
    <Router>
    <Navbar/>
    <Alert alert={alert}/>
    <div className="container">
    <Switch>
          <Route exact path="/">
            <Home showAlert={showAlert}/>
            </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/login">
            <login showAlert={showAlert}/>
          </Route>
          <Route exact path="/signup">
            <signup showAlert={showAlert}/>
          </Route>
        </Switch>
        </div>
        </Router>
        </NoteState>
    </>
  );
}

export default App;
