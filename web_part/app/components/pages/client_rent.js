/**
 * Created by Jane on 12.01.2018.
 */
import React, { Component } from 'react';
import _ from 'lodash';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

export default class ClientRent extends Component{
    constructor(props){
        super(props);
        this.state = {
            dateEndRent: null,
            dateStartRent: null,
            carsList: ['333', '333', '444']
        }
    }

    //{}
    render(){
        console.log('render', this.state);
        return(
            <div>
                <h3>Предоставить бокс</h3>
                <label>Старт аренды
                    <input value={this.state.dateStartRent}/>
                </label>
                <label>Конец аренды
                    <input value={this.state.dateEndRent}/>
                </label>
                <select>
                    {
                        this.state.carsList.map((car) => {
                            return(
                                <option value={car} key={car}>{car}</option>
                            )
                        })
                    }
                </select>
                <button>Предоставить</button>
            </div>
        )
    }
}