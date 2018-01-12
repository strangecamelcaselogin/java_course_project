/**
 * Created by Jane on 11.01.2018.
 */
import React, { Component } from 'react'
import { Link, IndexLink } from 'react-router'
import { connect } from 'react-redux';


@connect(mapStateToProps)
export default class Header extends Component {

    render () {
        return (
            <div id='sidebar'>
                <div >
                    <Link to='/index'>Главная</Link>
                    {this.props.isAdmin &&
                        <div>
                            <Link to='/admin_info'>Справки</Link>
                            <Link to='/admin_manage'>Управление</Link>

                            <Link to='/rent'>Арендовать</Link>
                            {/*<Link activeClassName='active'>Приложения</Link>*/}
                            <Link to='/lk'>Личный кабинет</Link>
                        </div>
                    }

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