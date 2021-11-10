import React, { Component } from 'react'
import './styles/CardStyle.css'

export default class Card extends Component {
    render() {

        return (
            <div className="card">
                <img src={this.props.srcImg} className="card-img-top card-img" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.titulo}</h5>
                    <p className="card-text ">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        )
    }
}
