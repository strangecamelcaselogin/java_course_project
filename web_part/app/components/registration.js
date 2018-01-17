/**
 * Created by Jane on 17.01.2018.
 */
import React, { Component } from 'react';
import {Link} from 'react-router';
import _ from 'lodash';
import CSSModules from 'react-css-modules';
import api from '../api';

export default class Registration extends Component{
    constructor(props){
        super(props);
        this.state = {
            e_mail: '',
            password: '',
            check_password: '',
            name: '',
            error: '',
        };

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeCheckPassword = this.onChangeCheckPassword.bind(this);
        this.registrate = this.registrate.bind(this);
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

    onChangeName(value){
        this.setState({
            name: value
        })
    }

    onChangeCheckPassword(value){
        this.setState({
            check_password: value
        })
    }

    registrate(){
        const email = this.state.e_mail;
        const name = this.state.name;
        const password = this.state.password;
        if(this.state.check_password === this.state.password){
            api.post(`/clients?email=${email}&name=${name}&password=${password}`)
                .then((resp) => {
                    window.location = '/login';
                }).catch(error => {
                    this.setState({
                        error
                    })
                });
        } else {
            this.setState({
                error: 'Пароли не совпадают'
            })
        }
    }

    //{}
    render(){
        console.log('render', this.state);
        return(
            <div>
                <input onChange={(e) => { this.onChangeEmail(e.target.value)}} value={this.state.e_mail} placeholder="E-mail"/>
                <input onChange={(e) => { this.onChangeName(e.target.value)}} value={this.state.name} placeholder="ФИО"/>
                <input onChange={(e) => { this.onChangePassword(e.target.value)}} value={this.state.password} type="password" name="password" placeholder="Пароль"/>
                <input onChange={(e) => { this.onChangeCheckPassword(e.target.value)}} value={this.state.check_password} type="password" name="password" placeholder="Повторите пароль"/>
                <button onClick={this.registrate} id="b-login">Зарегистироваться</button>

                <div id="error-message">{this.state.error}</div>
                <div  align="center"><Link to="/login">Войти</Link></div>
            </div>
        )
    }
}