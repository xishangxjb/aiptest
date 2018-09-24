import React from 'react';
import 'semantic-ui-css/semantic.min.css';

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



// const FadingRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     <FadeIn>
//       <Component {...props}/>
//     </FadeIn>
//   )}/>
// )

class App extends React.Component{
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     authenticated: false
    //   }
    //
    // this.authenticate=this.authenticate.bind(this);
    // this.logout=this.logout.bind(this);

    // }

    // componentDidMount(){
    //   const object = getFromStorage('the_main_app');
    //   if(object && object.token) {
    //     this.setState({authenticated:true});
    //   }
    // }

    // authenticate(){
    //   this.setState( {authenticated: true} );
    // };
    //
    // logout(){
    //   this.setState({authenticated: false});
    // };

    render(){
        return(
            <Router>
                <Layout>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/about" component={About}/>
                        {/*<Route path="/group" component={Group}/>*/}
                        <Route path="/login" component={Signin} />
                        <Route path="/signup" component={Register}/>
                        <Route path="/work" component={Work}/>
                        <Route path="/map" component={MapPage}/>
                        <PrivateRoute path="/group" component={Group}/>
                        {/*<FadingRoute path="/group" component={Group}/>*/}
                        {/*<AuthRoute path="/group" component={Group} redirectTo="/login" authenticated={this.state.authenticated} />*/}
                        <Route component={NotFound}/>
                        {/*<Route path="/group" render={() => <Group />}/>*/}

                    </Switch>
                </Layout>
            </Router>
        );
    }
}

export default App;