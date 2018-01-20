/**
 * Created by Jane on 12.01.2018.
 */
import React, { Component } from 'react';
import _ from 'lodash';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { getBrandsInfo, getClientRentsInfo, addClientCar, deleteClientCar, getClientCarsInfo, cancelClientRent } from '../../actions' ;
import {Button, Container, Input, Table, FormGroup, Label} from "reactstrap";

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

    render(){
        console.log('render', this.state);
        return(
            <div>
                <Container>
                    <h2>Личный кабинет {this.state.client_name}</h2>

                    <div>
                        <h3>Ваши автомобили</h3>
                        {
                            (this.props.clientCars.length !== 0) ?
                                <div>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Марка автомобиля</th>
                                                <th>Государственный номер</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.props.clientCars.map((car, index) => {
                                                return (
                                                    <tr>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{car.carBrandId}</td>
                                                        <td>{car.number}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </Table>
                                </div>
                                :
                                <div>У вас ещё нет зарегестрированных машин</div>
                        }
                    </div>

                    <hr/>

                    <div>
                        <h3>Добавить новый атомобиль</h3>
                        {
                            (this.props.carBrands.length !== 0) ?
                                <div>
                                    <FormGroup>
                                        <Label>Выберите марку автомобиля</Label>
                                        <Input onChange={(e) => {
                                            this.onChangeSelectCarBrand(e.target.value)
                                            }} type="select" value={this.state.selectCarBrand}>
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
                                        </Input>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Введите номер</Label>
                                        <Input onChange={(e) => {
                                            this.onChangeNumberCar(e.target.value)
                                        }} value={this.state.numberCar}/>
                                    </FormGroup>

                                    <Button color="primary" onClick={this.addCar}>Добавить</Button>
                                </div>
                                :
                                <div>Нельзя добавить автомобиль. В системе нет марок</div>
                        }
                    </div>

                    <hr/>

                    <div>
                        <h3>Удалить машину</h3>
                        {
                            (this.props.clientCars.length !== 0) ?
                                <div>
                                    <FormGroup>
                                        <Label>Выберите автомобиль</Label>
                                        <Input type="select" onChange={(e) => {
                                            this.onChangeSelectClientCar(e.target.value)
                                        }}>
                                            {
                                                this.props.clientCars.map((car) => {
                                                    return (<option value={car.id} key={car.id}>{car.number}</option>)
                                                })
                                            }
                                        </Input>
                                    </FormGroup>

                                    <Button color="danger" onClick={this.deleteCar}>Удалить</Button>
                                </div>
                                :
                                <div>У вас нет ни одной машины</div>
                        }
                    </div>

                    <hr/>

                    <div>
                        <h3>Активные квитанции</h3>
                        {
                            (this.props.activeTickets.length !== 0) ?
                                <Table>
                                    <thead>
                                    <th>#</th>
                                    <th>Номер квитации</th>
                                    <th>Автомобиль</th>
                                    <th>Бокс</th>
                                    <th>Действие</th>
                                    </thead>
                                    <tbody>
                                    {
                                        this.props.activeTickets.map((ticket, index)=>{
                                            return (
                                                <tr>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{ticket.id}</td>
                                                    <td>{ticket.carId}</td>
                                                    <td>{ticket.boxId}</td>
                                                    <td>
                                                        <Button color="danger"
                                                                onClick={(ticket)=>{this.cancelTicket(ticket.id)}}>Отменить</Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </Table>
                                :
                                <div>У вас нет активных квитанций</div>
                        }
                    </div>

                    <hr/>

                    <div>
                        <h3>Архив квитанций</h3>
                        {
                            (this.props.notActiveTickets.length !== 0) ?

                                <Table>
                                    <thead>
                                    <th>#</th>
                                    <th>Номер квитации</th>
                                    <th>Автомобиль</th>
                                    <th>Бокс</th>
                                    </thead>
                                    <tbody>
                                    {
                                        this.props.notActiveTickets.map((ticket, index) => {
                                            return (
                                                <tr>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{ticket.id}</td>
                                                    <td>{ticket.carId}</td>
                                                    <td>{ticket.boxId}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </Table>
                                :
                                <div>У вас нет завершенных квитанций</div>
                        }
                    </div>

                </Container>
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