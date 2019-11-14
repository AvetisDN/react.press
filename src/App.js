import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import Header from "./components/layout/header";
import Home from "./components/home";
import Category from "./components/category";
import Archive from "./components/archive";
import Author from "./components/author";
import Post from "./components/post";
import Error from "./components/error";
import Search from "./components/search";
import Signin from "./components/signin";
import { Container } from 'reactstrap';
import {Zoom} from 'react-preloaders';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user : {
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                username: "",
                locale: "en_US",
                description: "",
                name: ""
            },
            alertText : null
        };
        this.hideLoading = this.hideLoading.bind(this);
        this.onUserSignin = this.onUserSignin.bind(this);
    }
    hideLoading() {
        this.setState({
            loading: false
        })
    }
    redirectToError() {
        window.location.href = '/404';
    }

    userSignin = (userDets) => {
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/simple-jwt-authentication/v1/token`, userDets)
            .then(response => {
                this.setState({
                    alertText: null
                });
                localStorage.setItem('user',response.data.user_display_name);

                console.log(localStorage.getItem('user'));
            })
            .catch(error => {
                console.error(error);
                this.setState({
                    alertText: 'Invalid username/password'
                });
            })
    };

    onUserSignin = (event) => {
        event.preventDefault();
        //TODO: Validate inputs
        if(this.state.user.username === "" || this.state.user.password === ""){
            //TODO: ADD ERROR DIALOG
            console.log('error')
        }else{
            //Submit the form
            let userDets = {
                username: this.state.user.username,
                password: this.state.user.password
            };
            this.userSignin(userDets)
        }
    };

    inputChanged = (event, forField, forForm)  => {
        let tempUser = this.state.user;
        tempUser[forField] = event.target.value;
        this.setState({user: tempUser});
    };

    render(){

        return (
            <React.Fragment>
                <Router>
                    <Header/>
                    <Container className="p-3 bg-white shadow-sm">
                        {localStorage.getItem('user') &&
                            <h2>Hello, {localStorage.getItem('user')}</h2>
                        }
                        {!localStorage.getItem('user') &&
                            <Signin alertText={this.state.alertText} inputChanged={this.inputChanged} onUserSignin={this.onUserSignin}/>
                        }

                        <Switch>
                            {/*<Route exact path='/' component={Home} />*/}
                            <Route path='/category/:slug/:page' render={(props) => <Category {...props} hideLoading={this.hideLoading} redirectToError={this.redirectToError} />} />
                            <Route path='/author/:slug/:page' render={(props) => <Author {...props} hideLoading={this.hideLoading} redirectToError={this.redirectToError}/>} />
                            <Route path='/:year/:month/:page' render={(props) => <Archive {...props} hideLoading={this.hideLoading} redirectToError={this.redirectToError} />} />
                            <Route path='/category/:slug' render={(props) => <Category {...props} hideLoading={this.hideLoading} redirectToError={this.redirectToError}/>} />
                            <Route path='/author/:slug' render={(props) => <Author {...props} hideLoading={this.hideLoading} redirectToError={this.redirectToError}/>} />
                            <Route path='/:year/:month' render={(props) => <Archive {...props} hideLoading={this.hideLoading} redirectToError={this.redirectToError} />} />
                            <Route path='/post/:slug' render={(props) => <Post {...props} hideLoading={this.hideLoading} redirectToError={this.redirectToError}/>} />
                            <Route path='/search' render={(props) => <Search {...props} hideLoading={this.hideLoading} redirectToError={this.redirectToError}/>} />
                            {/*<Route path='/page/:slug' component={Page}/>*/}
                            <Route path="/404" render={(props) => <Error {...props} hideLoading={this.hideLoading} redirectToError={this.redirectToError}/>} />
                            <Route exact path='/' render={(props) => <Home {...props} hideLoading={this.hideLoading} />} />
                            <Route path="*" render={(props) => <Error {...props} hideLoading={this.hideLoading} redirectToError={this.redirectToError}/>} />
                        </Switch>
                    </Container>
                </Router>
                <Zoom color={'#37E'} time={0} customLoading={this.state.loading}/>
            </React.Fragment>
        );
    }
}

