import { useEffect, useState } from "react";
import "./barchart.css";
const BarChart = ({ porcentaje }) => {

    const [classPercentage, setClassPercentage] = useState('arrow-container');

    const bodyFatPercentage = [
        { color: '#009FE3', percentage: '2-4%', category: 'Esencial' },
        { color: '#009C3D', percentage: '6-13%', category: 'Deportista' },
        { color: '#98C21D', percentage: '14-17%', category: 'Fitness' },
        { color: '#FECA00', percentage: '18-25%', category: 'Aceptable' },
        { color: '#D76328', percentage: '25% +', category: 'Obeso' },
    ]

    useEffect(() => {
        if (!porcentaje) return;
        if (porcentaje < 6) setClassPercentage('arrow-container-esencial');
        if (porcentaje >= 6 && porcentaje < 14) setClassPercentage('arrow-container-deportista');
        if (porcentaje >= 14 && porcentaje < 18) setClassPercentage('arrow-container-fitness');
        if (porcentaje >= 18 && porcentaje < 25) setClassPercentage('arrow-container-aceptable');
        if (porcentaje >= 25) setClassPercentage('arrow-container-obeso');
    }, [porcentaje])


    return (
        <div className="d-flex flex-column justify-content-center p-5 h-100">
            <h2 style={{ marginTop: -50 }} className="mb-5">Tu resultado: {porcentaje}%</h2>
            <div>
                <div className={classPercentage}>
                    <div>{porcentaje}%</div>
                    <div class="triangle-down"></div>
                </div>

                <div style={{ height: 80, width: "100%" }} className="barchart-gradient rounded"></div>

                <div className="d-flex mt-3">
                    {bodyFatPercentage?.map(bfp => (
                        <div className="w-100 d-flex flex-column align-items-center gap-1">
                            <div className="rounded" style={{ width: 15, height: 15, backgroundColor: bfp.color }}></div>
                            <div>{bfp.percentage}</div>
                            <div className="text-secondary">{bfp.category}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BarChart;