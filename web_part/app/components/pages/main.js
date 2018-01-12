/**
 * Created by Jane on 11.01.2018.
 */
import React, { Component } from 'react';
import _ from 'lodash';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import {getClientsInfo, getBrandsInfo, addBrand, deleteBrand} from '../../actions' ;


@connect(mapStateToProps)
export default class MainPage extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    componentWillMount() {
        this.props.dispatch(getBrandsInfo())
    }
    //{}
    render(){
        console.log('render', this.state);
        return(
            <div>
                {
                    this.props.carBrandsById.map((brand) => {
                        return(
                            <div>
                                {brand}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    console.log(state);
    return {
        carBrandsById: state.brands.brandsById,
    }
}