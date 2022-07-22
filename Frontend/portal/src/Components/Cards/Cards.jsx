import React, { Component, useEffect, useState } from 'react';
import Card from './CardUI'
import Card_Large from './Card_large'
import img1 from '../Cards/images/graf.jpeg';
import img2 from '../Cards/images/personer.jpeg';
import img3 from '../Cards/images/klode.jpeg';
import img4 from '../Cards/images/lus.jpeg';
import Test from '../Cards/test'


class Cards extends Component {


    
    
    render() {
        return (
            <div className="container-body">
                <div className="row">
                    <div className="col-md-4">
                        <Card graph={<Test/>}/>
                    </div>
                    <div className="col-md-4">
                        <Card imgsrc={img2} title="Personer"/>
                    </div>
                    <div className="col-md-4">
                        <Card imgsrc={img3} title="Klode"/>
                    </div>
                    <div className="col-md-4">
                        <Card imgsrc={img4} title="Lus"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cards;