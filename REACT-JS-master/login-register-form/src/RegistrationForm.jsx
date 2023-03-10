import React, { Component } from "react";
import FormValidator from "./FormValidator";

class App extends Component{
    constructor(){
        super();
        this.validator = new FormValidator([{
            field: 'full_name',
            method: 'isEmpty',
            validWhen: false,
            message: 'Enter Full Name.'
        },
        {
            field: 'email',
            method: 'isEmpty',
            validWhen: false,
            message: 'Enter Your Email Address.'
        },
        {
            field: 'phone',
            method: 'isEmpty',
            validWhen: false,
            message: 'Enter a Phone Number.'
        },
        {
            field: 'phone',
            method: 'matches',
            args: [/^\(?\d\d\d\)? ?\d\d\d-?\d\d\d\d$/],
            validWhen: false,
            message: 'Enter Valid Phone Number.'
        },
        {
            field: 'password',
            method: 'isEmpty',
            validWhen: false,
            message: 'Enter Password.'
        },
        {
            field: 'password_confirmation',
            method: 'isEmpty',
            validWhen: false,
            message: 'Enter Password Confirmation.'
        },
        {
            field: 'password_confirmation',
            method: this.passwordMatch,
            validWhen: true,
            message: 'Password and Password Confirmation do not Match.'
        }]);
        this.state = {
            full_name: '',
            email: '',
            phone: '',
            password: '',
            password_confirmation: '',
            validation: this.validator.valid(),
        }
        this.submitted = false;
    }
    passwordMatch = (confirmation, state) => (state.password === confirmation)
    handleInputChange = event => {
        event.preventDefault();
        const validation = this.validator.validate(this.state);
        this.setState({validation});
        this.submitted = true;
        if(validation.isValid){
            //reaches here if form validates successfully...
        }
    }
    render(){
        let validation = this.submitted ?this.validator.validate(this.state) : this.state.validation
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <form className="registrationForm">
                            <h2>Registration Form</h2>
                            <div className={validation.full_name.isInvalid && 'has-error'}>
                                <label htmlFor="full_name">Full Name</label>
                                <input type="string" className ="form-control" name="full_name" placeholder="Full Name" onChange={this.handleInputChange}/>
                                <span className="help-block">{validation.full_name.message}</span>
                            </div>
                            <div className={validation.email.isInvalid && 'has-error'}>
                                <label htmlFor="email">Email Addrress</label>
                                <input type="email" className="form-control" name="email" placeholder="Email Addrress" onChange={this.handleInputChange}/>
                                <span className="help-block">{validation.email.message}</span>
                            </div>
                            <div className={validation.phone.isInvalid && 'has-error'}>
                                <label htmlFor="phone">Phone</label>
                                <input type="phone" className="form-control" name="phone" placeholder="Phone Number" onChange={this.handleInputChange}/>
                                <span className="help-block">{validation.phone.message}</span>
                            </div>
                            <div className={validation.password.isInvalid && 'has-error'}>
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleInputChange}/>
                                <span className="help-block">{validation.password.message}</span>
                            </div>
                            <div className={validation.password_confirmation.isInvalid && 'has-error'}>
                                <label htmlFor="password_confirmation">Confirm Password</label>
                                <input type="password" className="form-control" name="password_confirmation" placeholder="Confirm Password" onChange={this.handleInputChange}/>
                                <span className="help-block">{validation.password_confirmation.message}</span>
                            </div>
                            <button onClick={this.handleFormSubmit} className="btn btn-primary">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default App;