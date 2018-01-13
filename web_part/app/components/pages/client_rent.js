/**
 * Created by Jane on 12.01.2018.
 */
import React, { Component } from 'react';
import _ from 'lodash';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';


@connect(mapStateToProps)
export default class ClientRent extends Component{
    constructor(props){
        super(props);
        this.state = {
            dateEndRent: null,
            dateStartRent: null,
            carsList: ['333', '333', '444'],
            selectCar: null
        };
        this.onChangeDateEndRent = this.onChangeDateEndRent.bind(this);
        this.onChangeDateStartRent = this.onChangeDateStartRent.bind(this);
        this.onChangeSelectCar = this.onChangeSelectCar.bind(this);
        this.provideBox = this.provideBox.bind(this);

    }

    onChangeDateStartRent(value){
        this.setState({
            dateStartRent: value
        })
    }

    onChangeDateEndRent(value){
        this.setState({
            dateEndRent: value
        })
    }

    onChangeSelectCar(value){
        this.setState({
            selectCar: value
        })
    }

    provideBox(){
        alert('Предоставили')
    }

    //{}
    render(){
        console.log('render', this.state);
        return(
            <div>
                <h3>Предоставить бокс</h3>
                <label>Старт аренды
                    <input onChange={(e) => {this.onChangeDateStartRent(e.target.value)}} value={this.state.dateStartRent}/>
                </label>
                <label>Конец аренды
                    <input onChange={(e) => {this.onChangeDateEndRent(e.target.value)}} value={this.state.dateEndRent}/>
                </label>
                <select onChange={(e) => {this.onChangeSelectCar(e.target.value)}}>
                    {
                        this.props.carsList.map((car) => {
                            return(
                                <option value={car} key={car}>{car}</option>
                            )
                        })
                    }
                </select>
                <button onClick={this.provideBox}>Предоставить</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        carsList: state.clients.clientCarList
    }
}