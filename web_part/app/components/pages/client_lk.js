/**
 * Created by Jane on 12.01.2018.
 */
import React, { Component } from 'react';
import _ from 'lodash';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { getBrandsInfo, getClientRentsInfo, addClientCar, deleteClientCar, getClientCarsInfo, cancelClientRent } from '../../actions' ;

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
        let p1 = this.props.dispatch(getClientRentsInfo());
        p.then(() => {
            let p2 = this.props.dispatch(getBrandsInfo());
            p2.then(() => {
                console.log('componentDidMount', this.props);
                let obj = {};
                if (this.props.carBrands.length !== 0) {
                    obj['selectCarBrand'] = this.props.carBrands[0].id;
                }
                if (this.props.clientCars.length !== 0) {
                    obj['selectCarNumber'] = this.props.clientCars[0].id;
                }
                this.setState(obj);
            })
        })
    }

    componentWillReceiveProps(){
        this.setState(function(prevState, props) {
            let obj = {};
            if (props.carBrands.length !== 0) {
                obj['selectCarBrand'] = props.carBrands[0].id;
            }
            if (props.clientCars.length !== 0) {
                obj['selectCarNumber'] = props.clientCars[0].id;
            }
            return obj;
        });
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

    cancelTicket(id){

        this.props.dispatch(cancelClientRent(id))
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
                                this.props.activeTickets.map((ticket)=>{
                                    return (
                                        <div>
                                            Номер квитанции: {ticket.id}
                                            Номер бокса: {ticket.boxId}
                                            <button onClick={(ticket)=>{this.cancelTicket(ticket.id)}}>Отменить</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                <div>
                    <h3>Архив квитанций</h3>
                    <div>
                        <div>
                            {
                                this.props.notActiveTickets.map((ticket)=>{
                                    return (
                                        <div>
                                            Номер квитанции: {ticket.id}
                                            <button onClick={(ticket)=>{this.cancelTicket(ticket.id)}}>Отменить</button>
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

    let activeTickets = [];
    let notActiveTickets = [];

    for (let r of state.rents.rentsList){
        if (r.active) {
            activeTickets.push(r);
        } else {
            notActiveTickets.push(r);
        }
    }

    return {
        clientCars: state.clients.clientCarList,
        carBrands: state.brands.brandsById,
        activeTickets,
        notActiveTickets
    }
}