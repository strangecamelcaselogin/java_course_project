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

    render () {
        const isAdmin = this.props.isAdmin;
        return (
            <div id='header'>
                <div styleName="header">
                    <Link to='/index'>Главная</Link>
                    {isAdmin && <Link to='/admin_info'>Справки</Link>}
                    {isAdmin && <Link to='/admin_manage'>Управление</Link>}
                    {!isAdmin && <Link to='/rent'>Арендовать</Link>}
                    {isAdmin && <Link to='/lk'>Личный кабинет</Link>}
                    <Link to='/logout'>Выход</Link>
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