/**
 * Created by Jane on 11.01.2018.
 */

import React, { Component } from 'react';
import _ from 'lodash';
import CSSModules from 'react-css-modules';

export default class AdminInfo extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    //{}
    render(){
        console.log('render', this.state);
        return(
            <div>
                Admin Info
            </div>
        )
    }
}