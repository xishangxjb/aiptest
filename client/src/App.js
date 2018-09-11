import React, { Component } from 'react';
import Home from "./component/Pages/Home";


class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Layout>
                        <Switch>
                            <Route path="/" exact={true} component={Home}/>
                            {/*<Route path="/login" component={LoginPage}/>*/}
                            {/*<Route path="/signup" component={SignUpPage}/>*/}
                            {/*<Route path="/work" component={WorkPage}/>*/}
                            {/*<Route path="/about" component={AboutPage}/>*/}
                            {/*<Route path="/group" component={GroupPage}/>*/}
                        </Switch>
                    </Layout>
                </div>
            </Router>
        );
    }
}
export default App;
