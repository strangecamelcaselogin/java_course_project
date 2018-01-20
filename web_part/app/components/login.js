/**
 * Created by Jane on 17.01.2018.
 */
import React, { Component } from 'react';
import {Link} from 'react-router'
// import _ from 'lodash';
// import CSSModules from 'react-css-modules';

import { Container, Form, FormGroup, Button, Input, Label, Row, Col } from 'reactstrap';

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

    render(){
        console.log('render', this.state);
        return(
            <div>
                <Container className='login-register-container'>
                    <Form>
                        <FormGroup>
                            <Label>Имя пользователя</Label>
                            <Input onChange={(e) => { this.onChangeEmail(e.target.value)}} value={this.state.e_mail} placeholder="E-mail"/>
                        </FormGroup>

                        <FormGroup>
                            <Label>Пароль</Label>
                            <Input onChange={(e) => { this.onChangePassword(e.target.value)}} value={this.state.password} type="password" name="password" placeholder="Пароль"/>
                        </FormGroup>

                        <Row>
                            <Col sm={2}>
                                <Button color="primary" onClick={this.login} id="b-login" >Войти</Button>
                            </Col>
                            <Col sm={10}>
                                <Link to="/registration">Создать аккаунт</Link>
                            </Col>
                        </Row>

                        <Row>
                            <div id="error-message">{this.state.error}</div>
                        </Row>
                    </Form>
                </Container>
            </div>
        )
    }
}