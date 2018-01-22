/**
 * Created by Jane on 11.01.2018.
 */
import React, { Component } from 'react';
import _ from 'lodash';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import {getClientsInfo, getBrandsInfo, addBrand, deleteBrand, getBoxesInfo,
            addBox, deleteBox, incPriceBox, getFreeBoxesInfo} from '../../actions' ;

import {
    Button, Container, Input, Table, FormGroup, Label, Row, Col, Card, CardTitle, CardText, Nav,
    NavItem, NavLink, TabContent, TabPane
} from "reactstrap";


@connect(mapStateToProps)
export default class AdminManage extends Component{
    constructor(props){
        super(props);

        this.state = {
            carBrandsById: [], //список марок
            selectCarBrand: null, //выбранная марка нового бокса
            priceBox: null, //цена бокса
            closeNumberBox: null, //бокс, который нужно закрыть
            incPriceNumberBox: null, //бокс которому надо поднять цену
            incPrice: null, //во сколько поднять цену
            addCarBrand: null, //добавляемая марку машины
            deleteCarBrand: null, //удаляемая марку
            activeTab: '1'
        };

        this.toggle = this.toggle.bind(this);
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
        let p = this.props.dispatch(getBoxesInfo());
        let p1 = this.props.dispatch(getFreeBoxesInfo());
        p.then(() => {
            let p2 = this.props.dispatch(getBrandsInfo());
            p2.then(() => {
                console.log('componentDidMount', this.props);
                let obj = {};
                if (this.props.carBrandsById.length !== 0) {
                    obj['selectCarBrand'] = this.props.carBrandsById[0].id;
                    obj['deleteCarBrand'] = this.props.carBrandsById[0].id;
                }
                if (this.props.boxesList.length !== 0) {
                    obj['closeNumberBox'] = this.props.boxesList[0].id;
                    obj['incPriceNumberBox'] = this.props.boxesList[0].id;
                }
                this.setState(obj);
            })
        })
    }

    /*componentWillReceiveProps(){
        this.setState(function(prevState, props) {
            console.log('componentDidMount', this.props);
            let obj = {};
            if (props.carBrandsById.length !== 0) {
                obj['selectCarBrand'] = props.carBrandsById[0].id;
                obj['deleteCarBrand'] = props.carBrandsById[0].id;
            }
            if (props.boxesList.length !== 0) {
                obj['closeNumberBox'] = props.boxesList[0].id;
                obj['incPriceNumberBox'] = props.boxesList[0].id;
            }
            return obj;
        });
    }*/

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

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    //{}
    render(){
        console.log('render', this.props, this.state);
        return(
            <Container>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={{ active: this.state.activeTab === '1' }}
                            onClick={() => { this.toggle('1'); }}
                        >
                            Боксы
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={{ active: this.state.activeTab === '2' }}
                            onClick={() => { this.toggle('2'); }}
                        >
                            Moar Tabs
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <h2>
                            Боксы
                        </h2>
                        <div>
                            <div>
                                <h3>Прием в эксплуатацию нового бокса</h3>
                                <FormGroup>
                                    <Label>Название марки</Label>
                                    <Input type="select" onChange={(e) => {this.onChangeSelectCarBrands(e.target.value)}} value={this.state.selectCarBrand}>
                                        {
                                            this.props.carBrandsById.map((brand, index)=>{
                                                return (
                                                    <option value={brand.id} key={index}>
                                                        {brand.name}
                                                    </option>
                                                )
                                            })
                                        }
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Цена</Label>
                                    <Input value={this.state.priceBox} onChange={(e) => {this.onChangePriceBox(e.target.value)}}/>
                                </FormGroup>
                                <Button color="primary" onClick={this.addNewBox}>Принять новый бокс</Button>
                            </div>

                            <hr/>

                            <div>
                                <h3>Закрытие бокса</h3>
                                <FormGroup>
                                    <Label>Номер бокса</Label>
                                    <Input type="select"
                                           onChange={(e) => {this.onSelectCloseNumberBox(e.target.value)}}
                                           value={this.state.closeNumberBox}>
                                        {
                                            this.props.freeBoxesById.map((box, index)=>{
                                                return (
                                                    <option value={box.id} key={index}>
                                                        {box.id}
                                                    </option>
                                                )
                                            })
                                        }
                                    </Input>
                                </FormGroup>
                                <Button color="primary" onClick={this.closeBox}>Закрыть бокс</Button>
                            </div>

                            <hr/>

                            <div>
                                <h3>Увеличить стоимость аренды</h3>
                                <FormGroup>
                                    <Label>Номер бокса</Label>
                                    <Input type="select" onChange={(e) => {this.onSelectIncPriceNumberBox(e.target.value)}}
                                           value={this.state.incPriceNumberBox}>
                                        {
                                            this.props.boxesList.map((box, index)=>{
                                                return (
                                                    <option value={box.id} key={index}>
                                                        {box.id}
                                                    </option>
                                                )
                                            })
                                        }
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Во сколько раз</Label>
                                    <Input value={this.state.incPrice} onChange={(e) => {this.onChangeIncPrice(e.target.value)}}/>
                                </FormGroup>
                                <Button color="primary" onClick={this.incPriceBox}>Увеличить стоимость боксов</Button>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tabId="2">
                        <h2>Марки</h2>
                        <Row>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Добавить марку в перечень</CardTitle>
                                    <FormGroup>
                                        <Label>Название марки</Label>
                                        <Input value={this.state.addCarBrand} onChange={(e) => {this.onChangeAddCarBrand(e.target.value)}}/>
                                    </FormGroup>
                                    <Button color="primary" onClick={this.addCarBrand}>Добавить марку</Button>
                                </Card>
                            </Col>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Удалить марку</CardTitle>
                                    <CardText>
                                        <FormGroup>
                                            <Label>Название марки</Label>
                                            <Input type="select" onChange={(e) => {this.onChangeDeleteCarBrand(e.target.value)}}
                                                   value={this.state.deleteCarBrand}>
                                                {
                                                    this.props.carBrandsById.map((brand, index)=>{
                                                        return (
                                                            <option value={brand.id} key={index}>
                                                                {brand.name}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </Input>
                                        </FormGroup>
                                    </CardText>
                                    <Button color="primary" onClick={this.deleteCarBrand}>Удалить марку</Button>
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </Container>
        )
    }
}

function mapStateToProps(state, ownProps) {
    let rents = state.client.clientListTicket;

    console.log(state);
    return {
        carBrandsById: state.brands.brandsList,
        freeBoxesById: state.boxes.freeBoxesById,
        boxesList: state.boxes.boxesList
    }
}