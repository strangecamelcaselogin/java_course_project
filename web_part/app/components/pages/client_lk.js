/**
 * Created by Jane on 12.01.2018.
 */
import React, { Component } from 'react';
import _ from 'lodash';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

export default class ClientLK extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    //{}
    render(){
        console.log('render', this.state);
        return(
            <div>
                ClientLK
            </div>
        )
    }
}