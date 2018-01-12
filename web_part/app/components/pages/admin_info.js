/**
 * Created by Jane on 11.01.2018.
 */

import React, { Component } from 'react';
import _ from 'lodash';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

@connect(mapStateToProps)
export default class AdminInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            clients: [],
            brandsClients: [],
            endRentsClients: [],
            boxClient: [],
            carBrands: ['Lada', 'Renault', 'Toyota'],
            notFreeBox: [1,5,6],
            isVisible: false,
            infoForModalScreen: [],
            dateEndRent: '11.12.13'
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

    componentWillReceiveProps(){
        this.setState(function(prevState, props) {
            return {
                clients: props.clients,
                brandsClients: props.brandsClients,
                endRentsClients: props.endRentsClients,
                boxClient: props.boxClient,
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
        let info = {...this.state.clients};
        this.setState({
            isVisible: true,
            infoForModalScreen: info,
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
        console.log(e.target.value)
    }

    onChangeDateEndRent(e){
        this.setState({
            dateEndRent: e.target.value
        })
    }

    onChangeSelectBox(e){
        console.log(e.target.value)
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
                            this.state.carBrands.map((brand, index) => {
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
                            this.state.notFreeBox.map((numberBox, index) => {
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
    return {
        clients: state.clients.clients,
        brandsClients: state.clients.brandsClients,
        endRentsClients: state.clients.endRentsClients,
        boxClient: state.clients.boxClient,
    }
}

class ModalScreenInfo extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div>
                <button onClick={() => {this.props.offModal()}}>Close</button>
                <div>ModalScreen</div>
            </div>
        )
    }
}