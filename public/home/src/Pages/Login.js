import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';



class Login extends Component {

    

    render() {
      
  
      return (
        <div>
          <Navbar fluid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#">Auth0 - React</a>
              </Navbar.Brand>
              <Button
                bsStyle="primary"
                className="btn-margin"
                onClick={this.goTo.bind(this, '/')}
              >
                Home
              </Button>
              {
                !isAuthenticated() && (
                    <Button
                      bsStyle="primary"
                      className="btn-margin"
                      onClick={this.login.bind(this)}
                    >
                      Log In
                    </Button>
                  )
              }
              {
                isAuthenticated() && (
                    <Button
                      bsStyle="primary"
                      className="btn-margin"
                      onClick={this.logout.bind(this)}
                    >
                      Log Out
                    </Button>
                  )
              }
            </Navbar.Header>
          </Navbar>
        </div>
      );
    }
  }
  
  export default Login;