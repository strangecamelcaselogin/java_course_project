/**
 * Created by Jane on 12.01.2018.
 */
import React, { Component } from 'react';
import _ from 'lodash';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { getBrandsInfo, addClientRent, cancelClientRent, getClientCarsInfo } from '../../actions' ;
import moment from  'moment';


var options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
};

@connect(mapStateToProps)
export default class ClientRent extends Component{
    constructor(props){
        super(props);
        let date = moment().format('L');
        this.state = {
            dateEndRent: date,
            dateStartRent: null,
            selectCar: null
        };
        this.onChangeDateEndRent = this.onChangeDateEndRent.bind(this);
        this.onChangeDateStartRent = this.onChangeDateStartRent.bind(this);
        this.onChangeSelectCar = this.onChangeSelectCar.bind(this);
        this.provideBox = this.provideBox.bind(this);

    }

    componentDidMount(){
        let p = this.props.dispatch(getClientCarsInfo());
        p.then(() => {
            console.log('componentDidMount', this.props);
            let obj = {};
            if (this.props.carsList.length !== 0) {
                obj['selectCar'] = this.props.carsList[0].id;
            }
            this.setState(obj);
        })
    }

    componentWillReceiveProps(){
        this.setState(function(prevState, props) {
            let obj = {};
            if (props.carsList.length !== 0) {
                obj['selectCar'] = props.carsList[0].id;
            }
            return obj;
        });
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
        this.props.dispatch(addClientRent(this.state.selectCar,
            Date.parse(this.state.dateEndRent)))
    }

    //{}
    render(){
        console.log('render', this.state);
        return(
            <div>
                <h3>Предоставить бокс</h3>
                <label>Конец аренды
                    <input onChange={(e) => {this.onChangeDateEndRent(e.target.value)}} value={this.state.dateEndRent}/>
                </label>
                <select onChange={(e) => {this.onChangeSelectCar(e.target.value)}}>
                    {
                        this.props.carsList.map((car) => {
                            return(
                                <option value={car.id} key={car.id}>{car.number}</option>
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