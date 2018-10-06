import React from 'react'
import {Button, Form, Grid, Image, Message, Segment} from 'semantic-ui-react'
import Joi from 'joi-browser'


import {
  getFromStorage,
  // setInStorage
} from "../../utils/storage";

//style
const Style = {
  margin: '20px',
}

//
const schema = {
    email: Joi.string()
        .required()
        .email()
        .label("Username"),
    passWord: Joi.string()
        .required()
        .min(5)
        .label("Password"),
    firstName: Joi.string()
        .required()
        .label("Firstname"),
    lastName:Joi.string()
        .required()
        .label("Lastname")
    // phone: Joi.string()
    //     .regex(/^([+]?|[0-9]{3,4}-)[0-9][9,11]/)
    //     .required()
    //     .label("Phone number")
};

class SignUpPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        signUpFirstName: '',
        signUpLastName: '',
        signUpEmail: '',
        signUpPassword: '',
        signUpError: '',
        isLoading: true,
        token: '',
        errors: {},
        formClassName:''
    };


    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.onSignUp = this.onSignUp.bind(this);
  }

  componentDidMount(){
    const object = getFromStorage('the_main_app');
    if(object && object.token){
      const {token} = object;
      //verify token
      fetch('/api/account/verify?token='+token)
        .then(res => res.json())
        .then(json =>{
          if(json.success){
            this.setState({
              token,
              isLoading: false
            });
          }else{
            this.setState({
              isLoading:false,
            });
          }
        });
    }else{
      this.setState({
        isLoading: false,
      });
    }
  }
    validate = () => {
        const data={email:this.state.signUpEmail,
            passWord:this.state.signUpPassword,
            firstName:this.state.signUpFirstName,
            lastName:this.state.signUpLastName
        };
        const result = Joi.validate(data, schema, {abortEarly:false});
        if (!result.error) return null;
        const errors={};
        for (let item of result.error.details)
            errors[item.path[0]]=item.message;
        return errors;
    };
  //onchage of firstName
  handleFirstNameChange(e){
    this.setState({signUpFirstName:e.target.value})
  }
  //onchage of lastName
  handleLastNameChange(e){
    this.setState({signUpLastName:e.target.value})
  }
  //onChange of email
  handleEmailChange(e){
    this.setState({signUpEmail:e.target.value})
  }
  //onchange of Password
  handlePasswordChange(e){
    this.setState({signUpPassword:e.target.value})
  }

  onSignUp(){
    //grap state
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
    } = this.state;

    this.setState({
      isLoading:true
    });

    console.log(this.validate());

    //Post request to backend
    fetch('/api/account/signup',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        firstName: signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        password: signUpPassword,
          errors:this.validate()
      }),

    }).then(res => res.json())
      .then(json => {
        if(json.success){
          this.setState({
            signUpError: json.message,
            formClassName:"success",
            isLoading:false,
            //input box empty
            signUpEmail:'',
            signUpPassword:'',
            signUpFirstName:'',
            signUpLastName:''
          });
        }else{
          this.setState({
            // signUpError: json.message,
              errors:this.validate(),
              formClassName: "warning",
            isLoading: false
          });
        }
      });
  }


  render(){
    const {
      isLoading,
      token,
      signUpError,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
        errors,
      formClassName
    } = this.state;

    var str='';
    const err = Object.values(errors);
    for (var i =0; i<err.length;i++){
        str =  str + err[i]+"\n"
    }
    console.log(str);

    if (isLoading){
      return(<div><p>Loading.....</p></div>);
    }

    if (!token) {
      return(
        <div style={Style}>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column  style={{ maxWidth: 450 }}>
              <Image src='./logo2.jpg' size='small' verticalAlign='middle'/>
              <Form  className={formClassName} size='large'>
                <Segment textAlign='left' stacked>
                  <Form.Field>
                    <Form.Input icon='user'
                                iconPosition='left'
                                label='Email address'
                                placeholder='Email address'
                                type='email'
                                value={signUpEmail}
                                onChange={this.handleEmailChange}
                    />
                    <Form.Input
                      fluid icon='lock'
                      iconPosition='left'
                      label='Password'
                      placeholder='Password'
                      type='password'
                      value={signUpPassword}
                      onChange={this.handlePasswordChange}
                    />
                  </Form.Field>
                  <Form.Group widths='equal'>
                    <Form.Input
                      type='name'
                      label='First name'
                      placeholder='First name'
                      value={signUpFirstName}
                      onChange={this.handleFirstNameChange}
                    />
                    <Form.Input
                      type='name'
                      label='Last name'
                      placeholder='Last name'
                      value={signUpLastName}
                      onChange={this.handleLastNameChange} />
                  </Form.Group>
                  <Form.Field>
                    <Form.Input label='Address' placeholder='Address' />
                    <Form.Input icon='mobile alternate' iconPosition='left' label='Phone' placeholder='Phone' />
                  </Form.Field>
                  <Form.Checkbox label='I agree to the Terms and Conditions' />
                  <Button onClick={this.onSignUp} primary>SignUp</Button>
                </Segment>
                  <Message
                      warning
                      color='yellow'
                      header='Woah!'
                      content={str}
                  />
                  <Message
                      success
                      color='green'
                      header='Nice one!'
                      content={signUpError}
                  />
              </Form>

            </Grid.Column>
          </Grid>
        </div>
      );
    }



    return(
      <div>
        <p>Account</p>
      </div>
    );
  }
}


export default SignUpPage;
