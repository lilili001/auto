import React from 'react';
import {  HashRouter as Router, Route, Switch, Link,browserHistory  } from "react-router-dom";
import { Provider } from "react-redux"
import Index from './pages/inbox'
import notFound from './pages/notFound'

const App = (props) => {
    return (
        <Router>
            <div>
                <Link to="/">Home</Link>
               {/* <Link to="/about">About</Link>
                <Link to="/users">Users</Link>*/}
                <Switch>
                    <Route>
                        <Route path="/" exact component={Index} />
                        {/*<Route path="/about" component={About} />
                        <Route path="/users" component={Users} />*/}
                    </Route>
                    <Route component={notFound} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
