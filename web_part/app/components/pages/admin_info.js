/**
 * Created by Jane on 11.01.2018.
 */

import React, { Component } from 'react';
import _ from 'lodash';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import {getClientsInfo, getNotFreeBoxesInfo, getBrandsInfo} from '../../actions' ;


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
        this.props.dispatch(getNotFreeBoxesInfo());
        this.props.dispatch(getBrandsInfo());
    }

    componentWillReceiveProps(){
        this.setState(function(prevState, props) {
            return {
                carBrandsById: props.carBrandsById,
                notFreeBoxesById: props.notFreeBoxesById,
            };
        });
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
            let info = {...this.state.clients};
            this.setState({
                isVisible: true,
                infoForModalScreen: this.props.clients,
            })
        })

    }

    getBrandsClients(){
        let info = {...this.state.brandsClients};
        this.setState({
            isVisible: true,
            infoForModalScreen: info,
        })
    }

    getEndRentsClients(){
        let info = {...this.state.endRentsClients};
        this.setState({
            isVisible: true,
            infoForModalScreen: info,
        })

    }

    getBoxClient(){
        let info = {...this.state.boxClient};
        this.setState({
            isVisible: true,
            infoForModalScreen: info,
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
                <div>
                    <h3>Справка о клиентах</h3>
                    <button onClick={this.getClients}>Получить список клиентов</button>
                </div>
                <br/>
                <div>
                    <h3>Справка о клиентах с определенной маркой автомобиля</h3>
                    <select onChange={(e) => {this.onChangeSelectBrands(e)}}>
                        {
                            this.state.carBrandsById.map((brand, index) => {
                                return (
                                    <option key={index} value={brand}>
                                        {brand}
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
                            this.state.notFreeBoxesById.map((numberBox, index) => {
                                return (
                                    <option key={index} value={numberBox}>
                                        {numberBox}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <button onClick={this.getBoxClient}>Узнать о клиенте, занимающем бокс</button>
                </div>

                {this.state.isVisible &&
                <ModalScreenInfo
                    info={this.state.infoForModalScreen}
                    offModal={this.offModal}
                />}
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    console.log(state);
    return {
        clients: state.clients.clients,
        brandsClients: state.clients.brandsClients,
        endRentsClients: state.clients.endRentsClients,
        boxClient: state.clients.boxClient,
        carBrandsById: state.brands.brandsById,
        notFreeBoxesById: state.boxes.notFreeBoxesById,
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