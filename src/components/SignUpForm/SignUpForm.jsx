import React from "react";
import { Component } from 'react';
import { signUp } from "utilities/users-service";

import {
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody
} from "reactstrap";

export default class SignUpForm extends Component {
    state = {
      name: '',
      email: '',
      password: '',
      confirm: '',
      error: ''
    };
  
    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value, 
        error: ''
      });
    };
  
    handleSubmit = async event => {
      event.preventDefault();
      // Logic for handling form submission
      try {
        const formData = {...this.state};
        delete formData.error;
        delete formData.confirm;
        const user = await signUp(formData);
        console.log(user)
      } catch {
        // An error occurred 
        this.setState({ error: 'Sign Up Failed - Try Again' });
      }
    };
 
  
    render() {
      const disable = this.state.password !== this.state.confirm;
      return (
        <>
          <Card>
            <CardBody>
              <form autoComplete="off" onSubmit={this.handleSubmit}>
                <div className="form-row">
                  <FormGroup className="col-md-6">
                    <Label for="inputEmail4">Email</Label>
                    <Input 
                      type="email" 
                      id="inputEmail4"
                      name="email" 
                      value={this.state.email}
                      onChange={this.handleChange}
                      placeholder="Email" 
                    />
                  </FormGroup>
                  <FormGroup className="col-md-6">
                    <Label for="inputPassword4">Password</Label>
                    <Input 
                      type="password"
                      id="inputPassword4"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange} 
                      placeholder="Password" 
                      autoComplete="off"
                    />
                  </FormGroup>
                </div>
                {/* Similar changes for other form inputs as required */}
                <Button type="submit" color="primary" disabled={disable}>Sign in</Button>
              </form>
            </CardBody>
          </Card>
          <p className="error-message">&nbsp;{this.state.error}</p>
        </>
      );
    }
  }
  
