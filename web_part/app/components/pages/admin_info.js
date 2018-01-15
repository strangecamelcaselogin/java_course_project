/**
 * Created by Jane on 11.01.2018.
 */

import React, { Component } from 'react';
import _ from 'lodash';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import {getClientsInfo, getNotFreeBoxesInfo, getBrandsInfo, getBoxesInfo, addBrand} from '../../actions' ;


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
            infoForModalScreen: [],

        };

        this.getClients = this.getClients.bind(this);
        this.getBrandsClients = this.getBrandsClients.bind(this);
        this.getEndRentsClients = this.getEndRentsClients.bind(this);
        this.getBoxClient = this.getBoxClient.bind(this);
        this.offModal = this.offModal.bind(this);
        this.onChangeSelectBrands = this.onChangeSelectBrands.bind(this);
        this.onChangeDateEndRent = this.onChangeDateEndRent.bind(this);
        this.onChangeSelectBox = this.onChangeSelectBox.bind(this);
    }

    componentWillMount(){
        this.props.dispatch(getBoxesInfo());
        this.props.dispatch(getBrandsInfo());
    }

    offModal(){
        this.setState({
            isVisible: false,
            info: []
        })
    }

    getClients(){
        let p = this.props.dispatch(getClientsInfo());
        p.then(() =>{
            this.setState({
                isVisible: true,
                infoForModalScreen: this.props.clients,
            })
        })

    }

    getBrandsClients(){
        this.props.dispatch(addBrand("888"));
        this.setState({
            isVisible: true,
            infoForModalScreen: this.props.brandsClients,
        })
    }

    getEndRentsClients(){
        this.setState({
            isVisible: true,
            infoForModalScreen: this.props.endRentsClients,
        })

    }

    getBoxClient(){
        this.setState({
            isVisible: true,
            infoForModalScreen: this.props.boxClient,
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

    //{}
    render(){
        console.log('render', this.state);
        return(
            <div>
                <h2>Справки</h2>
                <div>
                    <h3>Справка о клиентах</h3>
                    <button onClick={this.getClients}>Получить список клиентов</button>
                </div>
                <br/>
                <div>
                    <h3>Справка о клиентах с определенной маркой автомобиля</h3>
                    <select onChange={(e) => {this.onChangeSelectBrands(e)}}>
                        {
                            this.props.carBrandsById.map((brand, index) => {
                                return (
                                    <option key={brand.name} value={brand.name}>
                                        {brand.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <button onClick={this.getBrandsClients}>Получить список клиентов с определенной маркой автомобиля</button>
                </div>
                <br/>
                <div>
                    <h3>Справка о клиентах, у который срок аренды истекает к указанной дате</h3>
                    <input onChange={(e)=>{this.onChangeDateEndRent(e)}} value={this.state.dateEndRent} />
                    <button onClick={this.getEndRentsClients}>Получить список клиентов, у который срок аренды истекает к указанной дате</button>
                </div>
                <br/>
                <div>
                    <h3>Справка о клиенте, занимающем бокс</h3>
                    <select onChange={(e) => {this.onChangeSelectBox(e)}}>
                        {
                            this.props.notFreeBoxesById.map((box, index) => {
                                return (
                                    <option key={index} value={box.id}>
                                        {box.id}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <button onClick={this.getBoxClient}>Узнать о клиенте, занимающем бокс</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    console.log(state);
    let notFreeBoxesById = [];
    for (let box of state.boxes.boxesById) {
        if (box.close) {
            notFreeBoxesById.push(box)
        }
    }

    return {
        clients: state.clients.clients,
        brandsClients: state.clients.brandsClients,
        endRentsClients: state.clients.endRentsClients,
        boxClient: state.clients.boxClient,
        carBrandsById: state.brands.brandsById,
        notFreeBoxesById: notFreeBoxesById,
    }
}

class ModalScreenInfo extends Component {
    constructor(props){
        super(props)
    }

    render() {
        console.log(this.props.info);
        return (
            <div>
                <button onClick={() => {this.props.offModal()}}>Close</button>
                <div>ModalScreen</div>
            </div>
        )
    }
}