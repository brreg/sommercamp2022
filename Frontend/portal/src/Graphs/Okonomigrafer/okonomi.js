import React from 'react';
import { IgrLinearGauge } from 'igniteui-react-gauges';
import { IgrLinearGaugeModule } from 'igniteui-react-gauges';
import { IgrLinearGraphRange } from 'igniteui-react-gauges';

IgrLinearGaugeModule.register();

const OkonomiGraph = () => {

    return (
        <div className="graph_container">
            <IgrLinearGauge
                height="80px"
                width="100%"
                minimumValue={0}
                maximumValue={50}
                interval={10}
                value={10} // Her legges det inn fra databasen altså verdien til KPIen
                needleShape="Custom"
                needleBrush="DodgerBlue"
                needleOutline="DodgerBlue"
                needleStrokeThickness={0.5}
                needleBreadth={15}
                needleInnerExtent={0.35}
                needleOuterExtent={0.65}
                needleOuterPointExtent={0.8}
                needleInnerPointExtent={0.325}
                needleInnerPointWidth={0}
                needleOuterPointWidth={0.3}
                needleInnerBaseWidth={0}
                needleOuterBaseWidth={0.07}

                ticksPreTerminal={0}
                ticksPostInitial={0}
                tickStrokeThickness={0}
                tickStartExtent={0.0}
                tickEndExtent={0.0}s
                minorTickEndExtent={0}
                minorTickStartExtent={0}   
                
                labelInterval={0}

                rangeBrushes="#4188ff, #649eff, #78aaff, #92bbff, #accbff"
                rangeOutlines="black" >

                 <IgrLinearGraphRange name="range1"
                    startValue={0} endValue={3}
                    innerStartExtent={0.5} innerEndExtent={0.5}
                    outerStartExtent={0.25} outerEndExtent={0.25} />
                <IgrLinearGraphRange name="range2"
                    startValue={3} endValue={9.5}
                    innerStartExtent={0.5} innerEndExtent={0.5}
                    outerStartExtent={0.25} outerEndExtent={0.25} />
                <IgrLinearGraphRange name="range3"
                    startValue={9.5} endValue={17.5}
                    innerStartExtent={0.5} innerEndExtent={0.5}
                    outerStartExtent={0.25} outerEndExtent={0.25} />
                <IgrLinearGraphRange name="range4"
                    startValue={17.5} endValue={40}
                    innerStartExtent={0.5} innerEndExtent={0.5}
                    outerStartExtent={0.25} outerEndExtent={0.25} />
                <IgrLinearGraphRange name="range5"
                    startValue={40} endValue={100}
                    innerStartExtent={0.5} innerEndExtent={0.5}
                    outerStartExtent={0.25} outerEndExtent={0.25} />
            </IgrLinearGauge>
    </div>
    );

}


// rendering above class to the React DOM
export default OkonomiGraph;
