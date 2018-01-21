/**
 * Created by Jane on 11.01.2018.
 */
import React, { Component } from 'react'
import { Link, IndexLink } from 'react-router'
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules'
import headerStyles from '../../styles/header.css'

import { Nav, NavItem, Row, Col } from 'reactstrap';


@connect(mapStateToProps)
@CSSModules(headerStyles)
export default class Header extends Component {
    constructor(props){
        super(props);
        this.exitAcc = this.exitAcc.bind(this);
    }

    exitAcc(){
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = '/login';  // todo (?) из-за этого происходит перезагрузка страницы?
    }

    render () {
        let isAdmin = true;
        let userIn = true;
        if (localStorage.token) {
            userIn = true;
            isAdmin = localStorage.role === "admin";
        } else {
            userIn = false
        }
        return (
            <div id='header'>
                <Nav>
                    <NavItem>
                        <Link to='/index'>Главная</Link>
                    </NavItem>

                    {isAdmin && userIn && <NavItem>
                        <Link to='/admin_info'>Справки</Link>
                    </NavItem>}

                    {isAdmin && userIn && <NavItem>
                        <Link to='/admin_manage'>Управление</Link>
                    </NavItem>}

                    {!isAdmin && userIn && <NavItem>
                        <Link to='/rent'>Арендовать</Link>
                    </NavItem>}

                    {!isAdmin && userIn && <NavItem>
                        <Link to='/lk'>Личный кабинет</Link>
                    </NavItem>}
                    {
                        userIn ?
                            <NavItem>
                                <Link onClick={this.exitAcc} to="#">Выйти</Link>
                            </NavItem>
                            :
                            <NavItem>
                                <Link to='/login'>Войти</Link>
                            </NavItem>
                    }

                </Nav>
                <hr/>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        isAdmin: true
    }
}