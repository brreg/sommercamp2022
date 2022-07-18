import React, { Component} from 'react';
import Card from './CardUI'
import img1 from '../Cards/images/graf.jpeg';
import img2 from '../Cards/images/personer.jpeg';
import img3 from '../Cards/images/klode.jpeg';
import img4 from '../Cards/images/lus.jpeg';

class Cards extends Component {
    render() {
        return (
            <div className="container-body">
                <div className="row">
                    <div className="col-md-4">
                        <Card imgsrc={img1} title="Graf"/>
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