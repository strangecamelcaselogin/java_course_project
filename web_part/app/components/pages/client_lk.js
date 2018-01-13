/**
 * Created by Jane on 12.01.2018.
 */
import React, { Component } from 'react';
import _ from 'lodash';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';


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
        this.onChangeSelectCarBrand = this.onChangeSelectCarBrand.bind(this)
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

    //{}
    render(){
        console.log('render', this.state);
        return(
            <div>
                <h2>Личный кабинет {this.state.client_name}</h2>
                <div>
                    <h3>Список машин</h3>
                    <div>
                        {
                            this.props.clientCars.map((car)=>{
                                return (
                                    <div value={car} index={car}>{car}</div>
                                )
                            })
                        }
                    </div>
                </div>
                <div>
                    <h3>Добавить машину</h3>
                    <div>
                        <select onChange={(e)=>{this.onChangeSelectCarBrand(e.target.value)}}>
                            {
                                this.props.carBrands.map((brand)=>{
                                    return (
                                        <option value={brand} index={brand}>{brand}</option>
                                    )
                                })
                            }
                        </select>
                        <input onChange={(e)=>{this.onChangeSelectCarBrand(e.target.value)}} value={this.state.numberCar}/>
                        <button>Добавить</button>
                    </div>
                </div>
                <div>
                    <h3>Удалить машину</h3>
                    <div>
                        <select  onChange={(e)=>{this.onChangeSelectClientCar(e.target.value)}}>
                            {
                                this.props.clientCars.map((car_number)=>{
                                    return (
                                        <option value={car_number} index={car_number}>{car_number}</option>
                                    )
                                })
                            }
                        </select>
                        <button>Удалить</button>
                    </div>
                </div>

                <div>
                    <h3>Список активных квитанций</h3>
                    <div>
                        <div>
                            {
                                this.props.listTicket.map((ticket)=>{
                                    return (
                                        <div>
                                            {ticket}
                                            <button>Отменить</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <button>Удалить</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        clientCars: state.clients.clientCarList,
        carBrands: state.brands.carBrandsById,
        listTicket: state.clients.clientListTicket
    }
}