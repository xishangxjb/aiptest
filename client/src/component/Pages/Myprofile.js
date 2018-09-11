import React, {Component} from 'react';
class Myprofile extends Component {
    //account attribute
    state = {
        UserName:'',
        UserEmail:''

    }

    //get information from local storage from tokenID
    componentDidMount() {
        //localstorage.getItem can work as string jason object,it is string, so we need
        // javascript function to adjusting Jason object then we can use
        //
        const idtoken = JSON.parse(localStorage.getItem('okta-token-storage'));
        this.setState({
            //use setState to update value use our variable of Username with idtoken to related key in
            //there called idtoken so we need use idtoken again
            UserName:idtoken.idToken.claims.name,
            UserEmail:idtoken.idToken.claims.email
        });
    }

    render() {
        return (
            <div>
                <h1>Welcome {this.state.UserName}</h1>
                <p>Your login email is {this.state.UserEmail}</p>
            </div>
        );
    }
}

export default Myprofile;
