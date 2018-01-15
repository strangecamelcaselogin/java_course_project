/**
 * Created by Jane on 11.01.2018.
 */
import React, { Component } from 'react';
import _ from 'lodash';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import {getClientsInfo, getBrandsInfo, addBrand, deleteBrand} from '../../actions' ;


@connect(mapStateToProps)
export default class AdminManage extends Component{
    constructor(props){
        super(props);

        this.state = {
            carBrandsById: [],
            selectCarBrand: null,
            costBox: null,
            closeNumberBox: null,
            incCost: null,
            addCarBrand: null,
            deleteCarBrand: null,
        };

        this.onChangeSelectCarBrands = this.onChangeSelectCarBrands.bind(this);
        this.onChangeCostBox = this.onChangeCostBox.bind(this);
        this.onChangeCloseNumberBox = this.onChangeCloseNumberBox.bind(this);
        this.onChangeIncCost = this.onChangeIncCost.bind(this);
        this.onChangeAddCarBrand = this.onChangeAddCarBrand.bind(this);

        this.addNewBox = this.addNewBox.bind(this);
        this.closeBox = this.closeBox.bind(this);
        this.incCostBoxs = this.incCostBoxs.bind(this);
        this.addCarBrand = this.addCarBrand.bind(this);
        this.deleteCarBrand = this.deleteCarBrand.bind(this);
    }

    componentDidMount(){
        this.props.dispatch(getBrandsInfo())
    }

    onChangeSelectCarBrands(value){
       this.setState({
           selectCarBrand: value
       })
    }

    onChangeCostBox(value){
        this.setState({
            costBox: value
        })
    }

    onChangeCloseNumberBox(value){
        this.setState({
            closeNumberBox: value
        })
    }

    onChangeIncCost(value){
        this.setState({
            incCost: value
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

    }

    closeBox() {

    }

    incCostBoxs() {

    }

    addCarBrand() {
        this.props.dispatch(addBrand(this.state.addCarBrand));
    }

    deleteCarBrand(){
        this.props.dispatch(deleteBrand())
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
                        <input value={this.state.costBox} onChange={(e) => {this.onChangeCostBox(e.target.value)}}/>
                        <button onClick={this.addNewBox}>Принять новый бокс</button>
                    </div>
                    <div>
                        <h3>Закрытие бокса</h3>
                        <label>Номер бокса</label>
                        <input value={this.state.closeNumberBox} onChange={(e) => {this.onChangeCloseNumberBox(e.target.value)}}/>
                        <button onClick={this.closeBox}>Закрыть бокс</button>
                    </div>
                    <div>
                        <h3>Увеличить стоимость аренды</h3>
                        <label>Во сколько раз (для всех боксов разом)</label>
                        <input value={this.state.incCost} onChange={(e) => {this.onChangeIncCost(e.target.value)}}/>
                        <button onClick={this.incCostBoxs}>Увеличить стоимость боксов</button>
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
    }
}