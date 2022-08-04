import React from 'react';
import { IgrLinearGauge, IgrLinearGaugeModule, IgrLinearGraphRange } from 'igniteui-react-gauges';
import "./okonomi.css"

IgrLinearGaugeModule.register();

const SoliditetGraf = (props) => {

    return (
            <IgrLinearGauge className="graph"
                height="80px"
                width="100%"
                minimumValue={0}
                maximumValue={100}
                interval={10}
                value={props.value} // Her legges det inn fra databasen altså verdien til KPIen
                needleShape="needle"
                needleBrush="#01DD8D"
              
                ticksPreTerminal={0}
                ticksPostInitial={0}
                tickStrokeThickness={0}
                tickStartExtent={0.0}
                tickEndExtent={0.0}s
                minorTickEndExtent={0}
                minorTickStartExtent={0}   

                backingBrush="#ffffff"

                labelInterval={20}

                 rangeBrushes="#1A36D9, #649eff, #78aaff, #92bbff, #accbff">

                 <IgrLinearGraphRange name="range1"
                    startValue={0} endValue={20}
                    innerStartExtent={0.5} innerEndExtent={0.5}
                    outerStartExtent={0.25} outerEndExtent={0.25} />
                <IgrLinearGraphRange name="range2"
                    startValue={20} endValue={40}
                    innerStartExtent={0.5} innerEndExtent={0.5}
                    outerStartExtent={0.25} outerEndExtent={0.25} />
                <IgrLinearGraphRange name="range3"
                    startValue={40} endValue={60}
                    innerStartExtent={0.5} innerEndExtent={0.5}
                    outerStartExtent={0.25} outerEndExtent={0.25} />
                <IgrLinearGraphRange name="range4"
                    startValue={60} endValue={80}
                    innerStartExtent={0.5} innerEndExtent={0.5}
                    outerStartExtent={0.25} outerEndExtent={0.25} />
                <IgrLinearGraphRange name="range5"
                    startValue={80} endValue={100}
                    innerStartExtent={0.5} innerEndExtent={0.5}
                    outerStartExtent={0.25} outerEndExtent={0.25} />
                </IgrLinearGauge>
    );

}


// rendering above class to the React DOM
export default SoliditetGraf;
