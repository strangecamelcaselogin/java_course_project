/**
 * Created by Jane on 06.09.2017.
 */
import React, { Component } from 'react';
import _ from 'lodash';
import CSSModules from 'react-css-modules';


export default class MainPage extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    //{}
    render(){
        console.log('render', this.state);
        return(
            <div>
               Main page
            </div>
        )
    }
}