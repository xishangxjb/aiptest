## SOMERN Project (Semantic-ui,OKTA,Mongodb,Express,React,Nodejs)
- This project client side was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
- The server side was build with [Express](https://github.com/expressjs/express).
- UI side build by [Semantic-ui](https://react.semantic-ui.com/).
- Database is build by [Mongodb](https://www.mongodb.com/).
- Usermangement with user authentication is build by [OKTA](https://www.okta.com).

## Step1: install envirnment

* `cd client && npm install` move in client folder to build client evironment.
* `cd ../server && npm install` move in server folder to build server encironment.

## Step2: Use Okta

Register okta account and get domain `url` and `client_id` from [okta](https://www.okta.com) home page. Then copy them to paste in the client side `app.js`
You can ignore my domain url'https://dev-783322.oktapreview.com'
```
<Router>

                {/*OKta configure copy domian address to instead of https://dev-783322.oktapreview.com/
                 and client_id 0oafzpuy0pvICjIhI0h7 by yourself from OKTA WebPage
                 */}
                <Security
                    issuer="https://dev-783322.oktapreview.com/oauth2/default"
                    client_id="0oafzpuy0pvICjIhI0h7"
                    redirect_uri={window.location.origin + '/implicit/callback'}
                    onAuthRequired={onAuthRequired}
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
```
The project provide two ways of using okta login pages. One is default pages provided by OKTA, another one is customization loginpage created by SigninWidget. You can use this [okta react](https://developer.okta.com/quickstart/#/react/nodejs/express) to find more functions.

About signUp, You can configure it in OKTA webpage. It also provide default style and customization.

## Step3: Mongodb

You can change the url with your own mangodb url in server site `app.js`
```
//u can change the url by your self
mongoose.connect('mongodb://localhost:27017/login-dem');
mongoose.Promise = global.Promise;
```
## Step4: Semantic-ui

You can use all the code provided from [Semantic-ui](https://react.semantic-ui.com/) webpage.

## Step5: Run

* `cd server && npm start` move in server folder to start server.
* `cd ../client && npm start` move in client folder to start client.
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
