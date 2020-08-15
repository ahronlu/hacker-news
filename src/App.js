import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Stories from "./components/Stories/Stories";
import SingleStory from "./components/SingleStory/SingleStory";
import User from "./components/User/User";
import "./App.scss";

const App = () => (
  <Router>
    <div className='container'>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Stories} />
        <Route exact path='/:type' component={Stories} />
        <Route path='/story/:id' component={SingleStory} />
        <Route path='/user/:userId' component={User} />
      </Switch>
      <footer>
        <span>Hacker News clone by Aharon Lubitsch 2020</span>
      </footer>
    </div>
  </Router>
);

export default App;
