/**
 * Created by Jane on 17.01.2018.
 */
import React, { Component } from 'react';
// import {Link} from 'react-router';
// import _ from 'lodash';
// import CSSModules from 'react-css-modules';

import { Container, Form, FormGroup, Button, Input, Label } from 'reactstrap';

import api from '../api';

export default class Registration extends Component{
    constructor(props){
        super(props);
        this.state = {
            e_mail: '',
            password: '',
            check_password: '',
            name: '',
            address: '',
            error: '',
        };

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
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

    onChangeAddress(value){
        this.setState({
            address: value
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
        const address = this.state.address;

        if(this.state.check_password === this.state.password){
            api.post(`/clients?email=${email}&name=${name}&password=${password}&address=${address}`)
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

    render(){
        console.log('render', this.state);
        return(
            <div>
                <Container className='login-register-container'>
                    <Form>
                        <FormGroup>
                            <Label>Почтовый адрес</Label>
                            <Input onChange={(e) => { this.onChangeEmail(e.target.value)}} value={this.state.e_mail} placeholder="E-mail"/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Фамилия Имя Отчество</Label>
                            <Input onChange={(e) => { this.onChangeName(e.target.value)}} value={this.state.name} placeholder="ФИО"/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Адрес проживания</Label>
                            <Input onChange={(e) => { this.onChangeAddress(e.target.value)}} value={this.state.address} placeholder="Адрес"/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Пароль</Label>
                            <Input onChange={(e) => { this.onChangePassword(e.target.value)}} value={this.state.password} type="password" name="password" placeholder="Пароль"/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Повторите пароль</Label>
                            <Input onChange={(e) => { this.onChangeCheckPassword(e.target.value)}} value={this.state.check_password} type="password" name="password" placeholder="Повторите пароль"/>
                        </FormGroup>

                        <Button color="primary" onClick={this.registrate} id="b-login">Зарегистироваться</Button>

                        {/*<div align="center"><Link to="/login">Войти</Link></div>*/}

                        <div id="error-message">{this.state.error}</div>
                    </Form>
                </Container>
            </div>
        )
    }
}