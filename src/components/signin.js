import React, {Component} from 'react';
import {Alert, Row, Col, Form, InputGroup, FormGroup, Input, Button, InputGroupAddon, InputGroupText } from 'reactstrap';

export default class Signin extends Component {

    render(){
        return (
            <Row>
                <Col xs="12" md={{size:6, offset: 3}}>
                    <h1 className={'text-center my-3'}>Sign In!</h1>
                    <Form autoComplete="false" onSubmit={this.props.onUserSignin}>
                        <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Username</InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" name="username" id="username"
                                   placeholder="Enter your username"
                                   onChange={(event) => this.props.inputChanged(event, "username", "signin")}/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Password</InputGroupText>
                            </InputGroupAddon>
                            <Input type="password" name="password" id="password"
                                   placeholder="Enter your password"
                                   onChange={(event) => this.props.inputChanged(event, "password", "signin")}/>
                        </InputGroup>
                        <FormGroup style={{textAlign: "center"}}>
                            <Button color="primary">Submit</Button>
                        </FormGroup>
                        {this.props.alertText !== null &&
                            <Alert color={'danger'}>
                                {this.props.alertText}
                            </Alert>
                        }
                    </Form>
                </Col>
            </Row>
        );
    }
}
