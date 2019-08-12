import React from 'react';
import {  HashRouter as Router, Route, Switch, Link,browserHistory  } from "react-router-dom";
import { Provider } from "react-redux"
import About from './pages/about'
import Index from './pages/inbox'
import Users from './pages/message'
import notFound from './pages/notFound'

const App = (props) => {
    return (
        <Router>
            <div>
                <Link to="/">Home</Link><br/>
                <Link to="/about">About</Link><br/>
                <Link to="/users">Users</Link>
                <Switch>
                    <Route path="/" exact component={Index} />
                    <Route path="/about" component={About} />
                    <Route path="/users" component={Users} />
                    <Route component={notFound} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
