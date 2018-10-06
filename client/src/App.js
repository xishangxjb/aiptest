import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {BrowserRouter as Router, Route, Switch,Redirect} from "react-router-dom";
import Layout from "./component/Header/Layout";
import About from "./component/Pages/About";
import Home from "./component/Pages/Home";
import MapPage from "./component/Map/Map";
import Group from "./component/Group/Group";
import NotFound from "./component/Pages/NotFound";
import Register from "./component/Auth/Register";
import Signin from "./component/Auth/Signin";
import fakeAuth from "./component/Auth/fakeAuth";
import DataPage from "./component/Data/Data";




const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            fakeAuth.isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);



class App extends React.Component{
    render(){
        return(
            <Router>
                <Layout>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/about" component={About}/>
                        <Route path="/login" component={Signin} />
                        <Route path="/signup" component={Register}/>
                        <Route path="/map" component={MapPage}/>
                        <Route path="/data" component={DataPage}/>
                        <PrivateRoute path="/group" component={Group}/>
                        <Route component={NotFound}/>
                    </Switch>
                </Layout>
            </Router>
        );
    }
}

export default App;
