/**
 * Created by Jane on 11.01.2018.
 */
import React, { Component } from 'react';
import _ from 'lodash';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import {getClientsInfo, getBrandsInfo, addBrand, deleteBrand, getBoxesInfo,
            addBox, deleteBox, incPriceBox} from '../../actions' ;


@connect(mapStateToProps)
export default class AdminManage extends Component{
    constructor(props){
        super(props);

        this.state = {
            carBrandsById: [],
            selectCarBrand: null,
            priceBox: null,
            closeNumberBox: null,
            incPriceNumberBox: null,
            incPrice: null,
            addCarBrand: null,
            deleteCarBrand: null,
        };

        this.onChangeSelectCarBrands = this.onChangeSelectCarBrands.bind(this);
        this.onSelectIncPriceNumberBox = this.onSelectIncPriceNumberBox.bind(this);
        this.onChangePriceBox = this.onChangePriceBox.bind(this);
        this.onSelectCloseNumberBox = this.onSelectCloseNumberBox.bind(this);
        this.onChangeIncPrice = this.onChangeIncPrice.bind(this);
        this.onChangeAddCarBrand = this.onChangeAddCarBrand.bind(this);

        this.addNewBox = this.addNewBox.bind(this);
        this.closeBox = this.closeBox.bind(this);
        this.incPriceBox = this.incPriceBox.bind(this);
        this.addCarBrand = this.addCarBrand.bind(this);
        this.deleteCarBrand = this.deleteCarBrand.bind(this);
    }

    componentDidMount(){
        this.props.dispatch(getBrandsInfo());
        this.props.dispatch(getBoxesInfo());
    }

    onSelectIncPriceNumberBox(value) {
        this.setState({
            incPriceNumberBox: value
        })
    }

    onChangeSelectCarBrands(value){
       this.setState({
           selectCarBrand: value
       })
    }

    onChangePriceBox(value){
        this.setState({
            priceBox: value
        })
    }

    onSelectCloseNumberBox(value){
        this.setState({
            closeNumberBox: value
        })
    }

    onChangeIncPrice(value){
        this.setState({
            incPrice: value
        })
    }

    onChangeAddCarBrand(value){
        this.setState({
            addCarBrand: value
        })
    }

    onChangeDeleteCarBrand(value){
        this.setState({
            deleteCarBrand: value
        })
    }

    addNewBox(){
        this.props.dispatch(addBox(this.state.selectCarBrand, this.state.priceBox))
    }

    closeBox() {
        this.props.dispatch(deleteBox(this.state.closeNumberBox))
    }

    incPriceBox() {
        this.props.dispatch(incPriceBox(this.state.incPriceNumberBox, this.state.incPrice))
    }

    addCarBrand() {
        this.props.dispatch(addBrand(this.state.addCarBrand));
    }

    deleteCarBrand(){
        this.props.dispatch(deleteBrand(this.state.deleteCarBrand))
    }
    //{}
    render(){
        console.log('render', this.props, this.state);
        return(
            <div>
                <h2>
                    Боксы
                </h2>
                <div>
                    <div>
                        <h3>Прием в эксплуатацию нового бокса</h3>
                        <label>Название марки</label>
                        <select onChange={(e) => {this.onChangeSelectCarBrands(e.target.value)}}>
                            {
                                this.props.carBrandsById.map((brand, index)=>{
                                    return (
                                        <option value={brand.id} key={index}>
                                            {brand.name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        <label>Цена</label>
                        <input value={this.state.priceBox} onChange={(e) => {this.onChangePriceBox(e.target.value)}}/>
                        <button onClick={this.addNewBox}>Принять новый бокс</button>
                    </div>
                    <div>
                        <h3>Закрытие бокса</h3>
                        <label>Номер бокса</label>
                        <select onChange={(e) => {this.onSelectCloseNumberBox(e.target.value)}}>
                            {
                                this.props.boxesById.map((box, index)=>{
                                    return (
                                        <option value={box.id} key={index}>
                                            {box.id}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        <button onClick={this.closeBox}>Закрыть бокс</button>
                    </div>
                    <div>
                        <h3>Увеличить стоимость аренды</h3>
                        <select onChange={(e) => {this.onSelectIncPriceNumberBox(e.target.value)}}>
                            {
                                this.props.boxesById.map((box, index)=>{
                                    return (
                                        <option value={box.id} key={index}>
                                            {box.id}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        <label>Во сколько раз</label>
                        <input value={this.state.incPrice} onChange={(e) => {this.onChangeIncPrice(e.target.value)}}/>
                        <button onClick={this.incPriceBox}>Увеличить стоимость боксов</button>
                    </div>
                </div>

                <h2>
                    Марки
                </h2>
                <div>
                    <div>
                        <h3>Добавить марку в перечень</h3>
                        <label>Название марки</label>
                        <input value={this.state.addCarBrand} onChange={(e) => {this.onChangeAddCarBrand(e.target.value)}}/>
                        <button onClick={this.addCarBrand}>Добавить марку</button>
                    </div>
                    <div>
                        <h3>Удалить марку</h3>
                        <label>Название марки</label>
                        <select onChange={(e) => {this.onChangeDeleteCarBrand(e.target.value)}}>
                            {
                                this.props.carBrandsById.map((brand, index)=>{
                                    return (
                                        <option value={brand.id} key={index}>
                                            {brand.name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        <button onClick={this.deleteCarBrand}>Удалить марку</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    console.log(state);
    return {
        carBrandsById: state.brands.brandsById,
        notFreeBoxesById: state.boxes.notFreeBoxesById,
        boxesById: state.boxes.boxesById
    }
}