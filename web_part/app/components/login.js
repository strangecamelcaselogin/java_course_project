/**
 * Created by Jane on 17.01.2018.
 */
import React, { Component } from 'react';
import {Link} from 'react-router'
import _ from 'lodash';
import CSSModules from 'react-css-modules';
import api from '../api';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            e_mail: '',
            password: '',
            error: ''
        };

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.login = this.login.bind(this);
    }

    onChangeEmail(value){
        this.setState({
            e_mail: value
        })
    }

    onChangePassword(value){
        this.setState({
            password: value
        })
    }

    login(){
        api.post('/login', {
            contentType: 'json',
            data: {
                email: this.state.e_mail,
                password: this.state.password,
            }
        }).then(resp => {
            localStorage.token = resp.token;
            localStorage.role = resp.role;
            window.location = '/';
        }).catch(error => {
            this.setState({error})
        });
    }

    //{}
    render(){
        console.log('render', this.state);
        return(
            <div>
                <input onChange={(e) => { this.onChangeEmail(e.target.value)}} value={this.state.e_mail} placeholder="E-mail"/>
                <input onChange={(e) => { this.onChangePassword(e.target.value)}} value={this.state.password} type="password" name="password" placeholder="Пароль"/>
                <button onClick={this.login} id="b-login" >Войти</button>

                <div id="error-message">{this.state.error}</div>
                <div><Link to="/registration">Создать аккаунт</Link></div>
            </div>
        )
    }
}