/**
 * Created by Jane on 12.01.2018.
 */
import React, { Component } from 'react';
import _ from 'lodash';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { getBrandsInfo, addClientCar, deleteClientCar, getClientCarsInfo } from '../../actions' ;

@connect(mapStateToProps)
export default class ClientLK extends Component{
    constructor(props){
        super(props);
        this.state = {
            client_name: 'user_name',
            numberCar: null,
            selectCarBrand: null,
            selectCarNumber: null,
        };

        this.onChangeSelectClientCar = this.onChangeSelectClientCar.bind(this);
        this.onChangeSelectCarBrand = this.onChangeSelectCarBrand.bind(this);
        this.addCar = this.addCar.bind(this);
        this.deleteCar = this.deleteCar.bind(this);
        this.cancelTicket = this.cancelTicket.bind(this);
    }

    componentDidMount(){
        let p = this.props.dispatch(getClientCarsInfo());
        p.then(() => {
            let p2 = this.props.dispatch(getBrandsInfo());
            p2.then(() => {
                console.log('componentDidMount', this.props);
                let obj = {};
                if (this.props.carBrands.length !== 0) {
                    obj['selectCarBrand'] = this.props.carBrands[0].id;
                }
                if (this.props.carBrands.length !== 0) {
                    obj['selectCarNumber'] = this.props.clientCars[0].id;
                }
                this.setState(obj);
            })
        })
    }


    onChangeSelectClientCar(value) {
        this.setState({
            selectCarNumber: value
        })
    }

    onChangeSelectCarBrand(value) {
        this.setState({
            selectCarBrand: value
        })
    }

    onChangeNumberCar(value) {
        this.setState({
            numberCar: value
        })
    }

    addCar() {
        this.props.dispatch(addClientCar(this.state.numberCar, this.state.selectCarBrand))
    }

    deleteCar(){
        this.props.dispatch(deleteClientCar(this.state.selectCarNumber))
    }

    cancelTicket(){

    }

    //{}
    render(){
        console.log('render', this.state);
        return(
            <div>
                <h2>Личный кабинет {this.state.client_name}</h2>
                {
                    (this.props.clientCars.length !== 0) ?
                        <div>
                            <h3>Список машин</h3>
                            <div>
                                {
                                    this.props.clientCars.map((car) => {
                                        return (
                                            <div value={car.id} index={car.id}>{car.number}</div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        :
                        <div>Нет машин</div>
                }
                {
                    (this.props.carBrands.length !== 0) ?
                        <div>
                            <h3>Добавить машину</h3>
                            <div>
                                <select onChange={(e) => {
                                    this.onChangeSelectCarBrand(e.target.value)
                                }} value={this.state.selectCarBrand}>
                                    {
                                        this.props.carBrands.map((brand, index) => {
                                            if (index === 0) {
                                                return (
                                                    <option value={brand.id} key={brand.id}>{brand.name}</option>
                                                )
                                            }
                                            return (
                                                <option value={brand.id} key={brand.id}>{brand.name}</option>
                                            )
                                        })
                                    }
                                </select>
                                <input onChange={(e) => {
                                    this.onChangeNumberCar(e.target.value)
                                }} value={this.state.numberCar}/>
                                <button onClick={this.addCar}>Добавить</button>
                            </div>
                        </div>
                        :
                        <div>Нельзя добавить машину. Нет марок</div>
                }
                {
                    (this.props.clientCars.length !== 0) ?
                        <div>
                            <h3>Удалить машину</h3>
                            <div>
                                <select onChange={(e) => {
                                    this.onChangeSelectClientCar(e.target.value)
                                }}>
                                    {
                                        this.props.clientCars.map((car) => {
                                            return (
                                                <option value={car.id} key={car.id}>{car.number}</option>
                                            )
                                        })
                                    }
                                </select>
                                <button onClick={this.deleteCar}>Удалить</button>
                            </div>
                        </div>
                        :
                        <div></div>
                }

                <div>
                    <h3>Список активных квитанций</h3>
                    <div>
                        <div>
                            {
                                this.props.listTicket.map((ticket)=>{
                                    return (
                                        <div>
                                            {ticket}
                                            <button onClick={this.cancelTicket}>Отменить</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        clientCars: state.clients.clientCarList,
        carBrands: state.brands.brandsById,
        listTicket: state.clients.clientListTicket
    }
}