import React, { Component } from 'react'
import NavBar from '../components/NavBar';
import Carousel from 'react-elastic-carousel'
import Card from '../components/Card'
import './styles/GuestStyle.css'



export default class Guest extends Component {
    render() {

        const breakPoints = [
            {width:800, itemsToShow:1},
            {width:900, itemsToShow:2}
        ];

        return (
            <div className = "contendor-carrusel">
                <NavBar links = {[]} urlinicio = "/" pagname = "guest"/>
                <hr/>

                <h1>Puestos Disponibles</h1>
                <Carousel breakPoints = {breakPoints}>
                    <Card titulo = "1" srcImg = "https://cdn.dribbble.com/users/2321818/screenshots/7119489/media/e9ccbbfd54ba9293417ef155ed3c3f7e.jpg?compress=1&resize=400x300"/>
                    <Card titulo = "2" srcImg = "https://http2.mlstatic.com/remera-nike-sb-logo-tradicional-original-nueva-negra-mens-D_NQ_NP_620573-MLA26911715252_022018-F.jpg"/>
                    <Card titulo = "3" srcImg = "https://i.pinimg.com/originals/c7/ee/9a/c7ee9a1d64a20af5976f7748c93d5d07.jpg"/>
                    <Card titulo = "4" srcImg = "https://images.template.net/wp-content/uploads/2015/09/15145305/Fascinating-Free-Nike-SB-Logo-For-You.jpg"/>
                    <Card titulo = "5" srcImg = "https://cdn.dribbble.com/users/2321818/screenshots/7119489/media/e9ccbbfd54ba9293417ef155ed3c3f7e.jpg?compress=1&resize=400x300"/>
                </Carousel>
            </div>
        )
    }
}
