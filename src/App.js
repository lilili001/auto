import React from 'react';
import {  HashRouter as Router, Route, Switch, Link,browserHistory  } from "react-router-dom";
import { Provider } from "react-redux"

//import About from './pages/about'
import Index from './pages/index'
import showCase from './examples/0-showcase'
import dynamicAddRemove from './examples/6-dynamic-add-remove'
import notFound from './pages/notFound'

const App = (props) => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact component={Index} />
                    <Route path="/0-showcase"   component={showCase} />
                    <Route path="/6-dynamic-add-remove"   component={dynamicAddRemove} />
                    {/*<Route path="/about" component={About} />
                    <Route path="/users" component={Users} />*/}

                    <Route component={notFound} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
