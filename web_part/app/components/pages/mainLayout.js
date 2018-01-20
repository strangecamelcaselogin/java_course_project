/**
 * Created by Jane on 06.09.2017.
 */
import React, { Component } from 'react';
import _ from 'lodash';
import CSSModules from 'react-css-modules';
import Header from './header';

export default class MainLayout extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    //{}
    render(){
        console.log('render', this.state);
        return(
            <div>
                <Header/>
                <div id='container'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}