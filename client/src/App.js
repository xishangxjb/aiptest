import React, { Component } from 'react';
import Home from "./component/Pages/Home";
import Layout from "./component/layout/SemanticUIexample_Layout";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import {Security,SecureRoute,ImplicitCallback} from "@okta/okta-react/";
import Myprofile from "./component/Pages/Myprofile";
import Group from "./component/Pages/Group";
// import LoginPage from "./component/auth/OKTALoginPage";

// function onAuthRequired({ history}) {
//     history.push("/login");
// }
class App extends Component {
    render() {
        return (
            <Router>

                {/*OKta configure copy domian address to instead of https://dev-783322.oktapreview.com/
                 and client_id 0oafzpuy0pvICjIhI0h7 by yourself from OKTA WebPage
                 */}
                <Security
                    issuer="https://dev-783322.oktapreview.com/oauth2/default"
                    client_id="0oafzpuy0pvICjIhI0h7"
                    redirect_uri={window.location.origin + '/implicit/callback'}
                    // onAuthRequired={onAuthRequired}
                >
                    <div className="App">
                        <Layout>
                            <Switch>
                                <Route path="/" exact={true} component={Home}/>
                                <Route path='/implicit/callback' component={ImplicitCallback}/>
                                {/*use okta loginPage to secure component*/}
                                <SecureRoute path="/myprofile" component={Myprofile}/>
                                <SecureRoute path="/group" component={Group}/>
                                {/*OKTA customer loginPage*/}
                                {/*<Route*/}
                                    {/*path="/login"*/}
                                    {/*render={() => (*/}
                                        {/*<LoginPage baseUrl="https://dev-783322.oktapreview.com" />*/}
                                    {/*)}*/}
                                {/*/>*/}
                            </Switch>
                        </Layout>
                    </div>
                </Security>
            </Router>
        );
    }
}
export default App;
