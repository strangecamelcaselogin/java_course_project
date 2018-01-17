/**
 * Created by Jane on 11.01.2018.
 */
import React, { Component } from 'react'
import { Link, IndexLink } from 'react-router'
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules'
import headerStyles from '../../styles/header.css'


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
                <div styleName="header">
                    <Link to='/index'>Главная</Link>
                    {isAdmin && userIn && <Link to='/admin_info'>Справки</Link>}
                    {isAdmin && userIn && <Link to='/admin_manage'>Управление</Link>}
                    {!isAdmin && userIn && <Link to='/rent'>Арендовать</Link>}
                    {!isAdmin && userIn && <Link to='/lk'>Личный кабинет</Link>}
                    {
                        userIn ?
                            <Link onClick={this.exitAcc} to='/login'>Выйти</Link>
                            :
                            <Link to='/login'>Войти</Link>
                    }

                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        isAdmin: true
    }
}