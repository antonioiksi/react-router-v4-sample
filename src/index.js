import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as Constants from 'constants';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';


import {BrowserRouter, Switch, Route, Link, NavLink, Redirect} from 'react-router-dom'
import {Button} from 'react-bootstrap';

class Cart extends Component {
    render(){
        return (<h1>Cart page</h1>);
    }
}

class Login extends Component {
    constructor(props) {
        super(props);

        this.state={Submited:false};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        localStorage.setItem(Constants.TOKEN_NAME, event.target.name);
        this.setState({Submited:true});
    }


    render(){
        let isLoggin = localStorage.getItem(Constants.TOKEN_NAME)!==''?(true):(false);
        return (
            <div>
                <h1>Login page</h1>
                <Button name='LoginButton' onClick={this.handleClick}>LogIn</Button>
                {
                    isLoggin?(<Redirect to='/dashboard'/>):('')
                }

            </div>
        );
    }
}

class EnsureLoggedInContainer extends Component {

    constructor(props) {
        super(props)
        let isLog = localStorage.getItem(Constants.TOKEN_NAME)!==''?(true):(false);
        this.state = {isLogin:isLog};

        this.handleClickLogout = this.handleClickLogout.bind(this);
    }


    componentWillMount() {

        //let isLog = localStorage.getItem(Constants.TOKEN_NAME)!==''?(true):(false);
    }

    handleClickLogout(event) {
        localStorage.setItem(Constants.TOKEN_NAME,'');
        this.setState({isLogin: false});
    }

    render(){

        let isLogin = this.state.isLogin;


        return (
            <div>
            <h1>EnsureLoggedInContainer page</h1>
            {
                isLogin?(''):(<Redirect to='/login'/>)
            }
            <Button name='LogoutButton' onClick={this.handleClickLogout}>LogOut</Button>
            </div>
        )
    }
}

class Main extends Component {
    render(){
        return (<h1>Main page</h1>);
    }
}

class Checkout extends Component {
    render(){
        return (<h1>Checkout page</h1>);
    }
}

class Account extends Component {
    render(){
        return (<h1>Account page</h1>);
    }
}

ReactDOM.render(
    <BrowserRouter>
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><NavLink to="/dashboard/account" activeClassName='hurray'>account</NavLink></li>
                <li><NavLink to="/dashboard/checkout/bla-la" activeClassName='hurray'>checkout</NavLink></li>
                <li><NavLink to='/dashboard/cart' activeClassName='hurray'>cart</NavLink></li>
            </ul>
            <hr/>

            <Switch>
                <Route exact path="/" component={Main}/>
                <Route exact path="/login" component={Login}/>
                <Route component={App}/>
            </Switch>
            <Route path="/dashboard" component={EnsureLoggedInContainer}/>
            <Route path="/dashboard/cart" component={Cart}/>
            <Route path="/dashboard/account" component={Account}/>
            <Route path="/dashboard/checkout/:number" component={Checkout}/>
        </div>

    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
