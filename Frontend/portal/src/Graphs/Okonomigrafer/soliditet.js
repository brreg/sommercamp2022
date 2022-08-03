import React from 'react';
import { IgrLinearGauge, IgrLinearGaugeModule, IgrLinearGraphRange } from 'igniteui-react-gauges';
import "okonomi.css"

IgrLinearGaugeModule.register();

const Soliditet = () => {

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
                needleBrush="grey"
                needleOutline="black"
                
                labelInterval={0}

                 rangeBrushes="red, #649eff, #78aaff, #92bbff, #accbff"
                 rangeOutlines="black"  >
                 <IgrLinearGraphRange name="range1"
                    startValue={0} endValue={10}
                    innerStartExtent={0.5} innerEndExtent={0.5}
                    outerStartExtent={0.25} outerEndExtent={0.25} />
                <IgrLinearGraphRange name="range2"
                    startValue={10} endValue={20}
                    innerStartExtent={0.5} innerEndExtent={0.5}
                    outerStartExtent={0.25} outerEndExtent={0.25} />
                <IgrLinearGraphRange name="range3"
                    startValue={20} endValue={30}
                    innerStartExtent={0.5} innerEndExtent={0.5}
                    outerStartExtent={0.25} outerEndExtent={0.25} />
                <IgrLinearGraphRange name="range4"
                    startValue={30} endValue={40}
                    innerStartExtent={0.5} innerEndExtent={0.5}
                    outerStartExtent={0.25} outerEndExtent={0.25} />
                <IgrLinearGraphRange name="range5"
                    startValue={40} endValue={50}
                    innerStartExtent={0.5} innerEndExtent={0.5}
                    outerStartExtent={0.25} outerEndExtent={0.25} />
                </IgrLinearGauge>
    </div>
    );

}


// rendering above class to the React DOM
export default Soliditet;
