/**
 * Created by Jane on 11.01.2018.
 */

import React, { Component } from 'react';
import _ from 'lodash';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import {getClientsInfo, getClientsWithBrand, getBrandsInfo, getBoxesInfo, addBrand, getClient} from '../../actions' ;
import {Button, Container, Input, Table, FormGroup, Label, Modal, ModalHeader, ModalBody } from "reactstrap";
import {getClientRentsInfo} from "../../actions/rent";
import {getClientCarsInfo} from "../../actions/cars";
import moment from "moment";


@connect(mapStateToProps)
export default class AdminInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            //
            selectBrands: null,
            selectBox: null,
            carBrandsById: [],
            notFreeBoxesById: [],
            dateEndRent: '11.12.13',
            //для модального окна
            isVisible: false,
            infoForModalScreen: {},
            typeInfo: '',
            extraInfo: ''
        };

        this.getClients = this.getClients.bind(this);
        this.getClient = this.getClient.bind(this);
        this.getBrandsClients = this.getBrandsClients.bind(this);
        this.getEndRentsClients = this.getEndRentsClients.bind(this);
        this.getBoxClient = this.getBoxClient.bind(this);
        this.offModal = this.offModal.bind(this);
        this.onChangeSelectBrands = this.onChangeSelectBrands.bind(this);
        this.onChangeDateEndRent = this.onChangeDateEndRent.bind(this);
        this.onChangeSelectBox = this.onChangeSelectBox.bind(this);
    }

    componentDidMount(){
        let p = this.props.dispatch(getBoxesInfo());
        this.props.dispatch(getClientRentsInfo());
        this.props.dispatch(getClientCarsInfo());
        p.then(() => {
            let p2 = this.props.dispatch(getBrandsInfo());
            p2.then(() => {
                console.log('componentDidMount', this.props);
                this.props.dispatch(getClientsInfo());
                let obj = {};
                if (this.props.carBrandsById.length !== 0) {
                    obj['selectBrands'] = this.props.carBrandsById[0].id;
                }
                if (this.props.notFreeBoxesById.length !== 0) {
                    obj['selectBox'] = this.props.notFreeBoxesById[0].id;
                }
                this.setState(obj);
            })
        })
    }

    // TODO
    // componentWillReceiveProps(){
    //     this.setState(function(prevState, props) {
    //         let obj = {};
    //         if (props.carBrandsById.length !== 0) {
    //             obj['selectBrands'] = props.carBrandsById[0].id;
    //         }
    //         if (props.notFreeBoxesById.length !== 0) {
    //             obj['selectBox'] = props.notFreeBoxesById[0].id;
    //         }
    //         return obj;
    //     });
    // }

    offModal(){
        this.setState({
            isVisible: false,
            info: []
        })
    }

    getClient(id) {
        this.props.dispatch(getClient(id)).then(() => {
            this.setState({
                isVisible: true,
                infoForModalScreen: this.props.clientsById[id],
                typeInfo: 'clients',
            })
        })
    }

    getClients(){
        this.props.dispatch(getClientsInfo()).then(() => {
            this.setState({
                isVisible: true,
                infoForModalScreen: this.props.clients,
                typeInfo: 'clients',
            })
        })

    }

    getBrandsClients(){
        this.props.dispatch(getClientsWithBrand(this.state.selectBrands)).then(() => {
            this.setState({
                isVisible: true,
                infoForModalScreen: this.props.brandsClients,
                typeInfo: 'clients_with_brand',
                extraInfo: this.state.selectBrands
            })
        });
    }

    getEndRentsClients(){
        this.setState({
            isVisible: true,
            infoForModalScreen: this.props.endRentsClients,
            typeInfo: 'client_for_end_date',
            extraInfo: this.state.dateEndRent
        })

    }

    getBoxClient(){
        this.setState({
            isVisible: true,
            infoForModalScreen: this.props.boxClient,
            typeInfo: 'client_in_box',
            extraInfo: this.state.selectBox
        })
    }

    onChangeSelectBrands(e){
        console.log(e.target.value);
        this.setState({
            selectBrands: e.target.value
        })
    }

    onChangeDateEndRent(e){
        this.setState({
            dateEndRent: e.target.value
        })
    }

    onChangeSelectBox(e){
        console.log(e.target.value);
        this.setState({
            selectBox: e.target.value
        })
    }

    render(){
        //Новый блок
        return (
            <Container>
                {
                    (this.props.clients.length !== 0) ?
                    <Table>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Имя</th>
                                <th>E-mail</th>
                                <th>Адрес</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.clients.map((client, index) => {
                                return (
                                <tr title={client.id} key={client.id}>
                                    <td>{index + 1}</td>
                                    <td onClick={() => {this.getClient(client.id)}}>{client.name}</td>
                                    <td>{client.email}</td>
                                    <td>{client.address}</td>
                                </tr>);
                            })
                        }
                        </tbody>
                    </Table> :
                    <div>Нет клиентов</div>
                }
                <ModalScreenClient
                    info={this.state.infoForModalScreen}
                    isOpen = {this.state.isVisible}
                    extraInfo={this.state.extraInfo}
                    offModal={this.offModal}
                />
            </Container>
        )

        //Старый блок
        /*return(
            <Container>
                <h2>Справки</h2>
                <div>
                    <h3>Справка о клиентах</h3>
                    <Button  color="primary" onClick={this.getClients}>Получить список клиентов</Button>
                </div>

                <hr/>

                <div>
                    <h3>Справка о клиентах с определенной маркой автомобиля</h3>
                    <FormGroup>
                        <Label>Выберите марку автомобиля</Label>
                        <Input onChange={(e) => {this.onChangeSelectBrands(e)}}
                                value={this.state.selectBrands}
                                type="select"
                        >
                            {
                                this.props.carBrandsById.map((brand, index) => {
                                    return (
                                        <option key={brand.id} value={brand.id}>
                                            {brand.name}
                                        </option>
                                    )
                                })
                            }
                        </Input>
                    </FormGroup>
                    <Button  color="primary" onClick={this.getBrandsClients}>Получить список клиентов с определенной маркой автомобиля</Button>
                </div>

                <hr/>

                <div>
                    <h3>Справка о клиентах, у который срок аренды истекает к указанной дате</h3>
                    <FormGroup>
                        <Label>Введите дату</Label>
                        <Input onChange={(e)=>{this.onChangeDateEndRent(e)}} value={this.state.dateEndRent} />
                    </FormGroup>
                    <Button  color="primary" onClick={this.getEndRentsClients}>Получить список клиентов, у который срок аренды истекает к указанной дате</Button>
                </div>

                <hr/>

                <div>
                    <h3>Справка о клиенте, занимающем бокс</h3>
                    <FormGroup>
                        <Label>Выберите занятый бокс</Label>
                        <Input onChange={(e) => {this.onChangeSelectBox(e)}}
                                value={this.state.selectBox}
                                type="select"
                        >
                            {
                                this.props.notFreeBoxesById.map((box, index) => {
                                    return (
                                        <option key={index} value={box.id}>
                                            {box.id}
                                        </option>
                                    )
                                })
                            }
                        </Input>
                    </FormGroup>
                    <Button  color="primary" onClick={this.getBoxClient}>Узнать о клиенте, занимающем бокс</Button>
                </div>

                    <ModalScreenInfo
                        info={this.state.infoForModalScreen}
                        type={this.state.typeInfo}
                        isOpen = {this.state.isVisible}
                        extraInfo={this.state.extraInfo}
                        offModal={this.offModal}
                    />

            </Container>
        )*/
    }
}

function mapStateToProps(state, ownProps) {
    let notFreeBoxesById = [];
    let brandsById = ArrayToObj(state.brands.brandsList, 'id');
    let boxesById = ArrayToObj(state.boxes.brandsList, 'id');
    let clientsById = ArrayToObj(state.clients.clients, 'id');
    let carsByClientId = ArrayToObj(state.client.clientCarList, 'clientId');
    let carsById = ArrayToObj(state.client.clientCarList, 'id');
    let rentByCarId = ArrayToObj(state.client.clientListTicket, 'carId');
    let rentById = ArrayToObj(state.client.clientListTicket, 'id');

    for (let id in clientsById) {
        let client = clientsById[id];
        let clientCars =  carsByClientId[id];
        client['car'] = [];
        client['rents'] = [];
        if (clientCars) {
            for (let car of clientCars) {
                let carId = car.id;
                let rents = rentByCarId[carId] || [];
                if (!('rents' in car)) {
                    car['rents'] = []
                }
                car['brand'] = brandsById[car.carBrandId].name;
                if (Array.isArray(rents)) {
                    car['rents'] = rents;
                    for (let rent of rents) {
                        rent['car'] = car;
                        client['rents'].push(rent)
                    }
                } else {
                    client['rents'].push(rents);
                }
                car['rents'].push(rents);

            }
            client['cars'] = clientCars
        }



    }

    let full_clients = [];


    return {
        clients: state.clients.clients,
        brandsClients: state.clients.brandsClients,
        endRentsClients: state.clients.endRentsClients,
        boxClient: state.clients.boxClient,
        carBrandsById: state.brands.brandsList,
        notFreeBoxesById: notFreeBoxesById,
        client: state.client.client,
        clientsById
    }
}


class ModalScreenClient extends Component {
    constructor(props){
        super(props)
    }

    render(){
        let client = this.props.info;
        let cars = [];
        let rents = [];
        if ('cars' in client) {
            cars = client.cars;
            rents = client.rents;
        }
        if(!this.props.isOpen){
            return(<div></div>)
        }
        return(
            <Modal isOpen={this.props.isOpen} toggle={() => {this.props.offModal()}}>
                <ModalHeader toggle={() => {this.props.offModal()}} >Клиент {client.name}</ModalHeader>
                <ModalBody>
                    <div>Машины: </div>
                    {
                        (cars.length !== 0) ?
                            <Table>
                                <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Номер</th>
                                    <th>Марка</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    cars.map((car, index) => {
                                        return (
                                            <tr key={car.id}>
                                                <td>{index}</td>
                                                <td>{car.number}</td>
                                                <td>{car.brand}</td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </Table>
                            :
                            <div>Нет машин</div>
                    }
                    <br/>
                    <div>Активные ренты:</div>
                    {
                        (rents.length !== 0) ?
                            <Table>
                                <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Номер</th>
                                    <th>Марка</th>
                                    <th>Бокс</th>
                                    <th>Окончание аренды</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    rents.map((rent, index) => {
                                        let car = rent.car;
                                        let date = new Date(rent.endDate);
                                        if (rent.active) {
                                            return (
                                                <tr key={car.id}>
                                                    <td>{index}</td>
                                                    <td>{car.number}</td>
                                                    <td>{car.brand}</td>
                                                    <td>{rent.boxId}</td>
                                                    <td>{moment(date).format('L')}</td>
                                                </tr>
                                            )
                                        }
                                    })
                                }
                                </tbody>
                            </Table>
                            :
                            <div>Нет активных рент</div>
                    }
                </ModalBody>
            </Modal>
        )
    }
}

/*
class ModalScreenInfo extends Component {
    constructor(props){
        super(props)
    }

    render() {
        console.log(this.props.info);
        if (!this.props.isOpen){
            return (<div>
            </div>)
        }
        if (this.props.type === 'clients') {
            return (
                    <Modal isOpen={this.props.isOpen} toggle={() => {this.props.offModal()}}>
                        <ModalHeader toggle={() => {this.props.offModal()}} >Список клиентов</ModalHeader>
                        <ModalBody>
                        {
                            this.props.info.map((client, index) => {
                                return (<div title={client.id}>#{index + 1} - {client.name} ({client.email}) - {client.address}</div>);
                            })
                        }
                        </ModalBody>
                    </Modal>
            )
        }
        if (this.props.type === 'client_for_end_date') {
            return (
                <Modal  isOpen={this.props.isOpen}>
                    <ModalHeader toggle={() => {this.props.offModal()}} >
                        Клиенты, аренда которых заканчивается к {this.props.extraInfo}
                    </ModalHeader>
                    <ModalBody>
                        {
                            this.props.info.map((client, index) => {
                                return (<div title={client.id}>#{index + 1} - {client.name} ({client.email}) - {client.address}</div>);
                            })
                        }
                    </ModalBody>
                </Modal>
            )
        }
        if (this.props.type === 'client_in_box') {
            return (
                <Modal  isOpen={this.props.isOpen}>
                    <ModalHeader toggle={() => {this.props.offModal()}} >
                        Клиент занимающий бокс {this.props.extraInfo}
                    </ModalHeader>
                </Modal>
            )
        }

        if (this.props.type === 'clients_with_brand') {
            console.log('clients_with_brand', this.props);
            return (
                <Modal isOpen={this.props.isOpen}>
                    <ModalHeader toggle={() => {this.props.offModal()}} >
                        Клиенты с машинами марки {this.props.extraInfo}
                    </ModalHeader>
                    <ModalBody>
                        {
                            this.props.info.map((client, index) => {
                                return (<div title={client.id}>#{index + 1} - {client.name} ({client.email}) - {client.address}</div>);
                            })
                        }
                    </ModalBody>
                </Modal>
            )
        }
    }
}*/

function ArrayToObj(array, id){
    if (array){
        let object = array.reduce((obj, cur) => {
            if (cur[id] in obj) {
                if (!Array.isArray(obj[cur[id]])) {
                    let em = _.cloneDeep(obj[cur[id]]);
                    obj[cur[id]] = [];
                    obj[cur[id]].push(em);
                }
                obj[cur[id]].push(cur);

            } else {
                obj[cur[id]] = cur;
            }
            return obj;
        }, {});

        return object;
    }
    return {};

}