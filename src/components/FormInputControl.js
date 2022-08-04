import { useState } from "react";
import { usNavyBfpService } from "../service/us-navy-bfp.service";


export const gender = {
    male: 'M',
    female: 'F'
}

const FormInputControl = ({ setPorcentaje, setOnShowBarChart }) => {
    const [isMaleState, setIsMaleState] = useState(true); // default value
    const [alturaState, setAlturaState] = useState();
    const [cinturaState, setCinturaState] = useState();
    const [caderaState, setCaderaState] = useState(); // female only
    const [cuelloState, setCuelloState] = useState();


    const onChangeGenderTo = (newGender) => {
        if (newGender == gender.female) {
            setIsMaleState(false);
            return;
        }

        setIsMaleState(true);
    }

    const onCalcular = () => {
        const { status, message } = isInvalidForm();
        if (status) {
            alert(message);
            return;
        }

        setOnShowBarChart(true);
        const porcentaje = usNavyBfpService.calculateBodyFatPercentage(alturaState, cinturaState, caderaState, cuelloState, isMaleState);
        setPorcentaje(porcentaje);
    }

    const onLimpiar = () => {
        setAlturaState('');
        setCinturaState('');
        setCaderaState('');
        setCuelloState('');
        setOnShowBarChart(false);
    }

    const isInvalidForm = () => {
        if (isMaleState && (!alturaState || !cinturaState || !cuelloState)) {
            return { status: true, message: 'Campos requeridos' };
        }
        if(!isMaleState && (!alturaState || !cinturaState || !caderaState || !cuelloState)) {
            return { status: true, message: 'Campos requeridos' };
        }
        
        return { status: false, message: '' };

    }

    return (
        <div>
            <header>
                <div className="w-75">
                    <h1>Calculadora de Grasa Corporal</h1>
                </div>

                <p className="text-secondary">
                    El metodo de la Marina de Estados Unidos (US Navy Method) ofrece una oferta
                    sencilla de calcular un aproximado del porcentaje de tjido adiposo en el cuerpo de
                    una persona.
                </p>
                <p className="text-secondary">
                    Los valores requeridos por la fórmula son los siguientes:
                </p>
            </header>

            <div>
                <form>
                    <div class="mb-3 d-flex flex-column gap-3">
                        <div>Genero</div>
                        <div className="d-flex gap-3">
                            <div>
                                <input type="radio" class="form-check-input bg-primary" id="hombreCheck" name="optradio"
                                    checked={isMaleState}
                                    onChange={() => onChangeGenderTo(gender.male)} />
                                    &nbsp;
                                <label class="form-check-label" for="hombreCheck">Hombre</label>
                            </div>

                            <div>
                                <input type="radio" class="form-check-input bg-primary" id="mujerCheck" name="optradio"
                                    checked={!isMaleState}
                                    onChange={() => onChangeGenderTo(gender.female)} />
                                    &nbsp;
                                <label class="form-check-label" for="exampleCheck1">Mujer</label>
                            </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Altura (cm)</label>
                        <input type="number" class="form-control"
                            min="1"
                            value={alturaState}
                            onChange={(e) => setAlturaState(e.target.value)} />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Cintura (cm)</label>
                        <input type="number" class="form-control"
                            min="1"
                            value={cinturaState}
                            onChange={(e) => setCinturaState(e.target.value)} />
                    </div>

                    {!isMaleState &&
                        <div class="mb-3">
                            <label class="form-label">Cadera (cm)</label>
                            <input type="number" class="form-control"
                                value={caderaState}
                                onChange={(e) => setCaderaState(e.target.value)} />
                        </div>
                    }

                    <div class="mb-3">
                        <label class="form-label">Cuello (cm)</label>
                        <input type="number" class="form-control"
                            value={cuelloState}
                            onChange={(e) => setCuelloState(e.target.value)} />
                    </div>

                    <div className="d-flex gap-2">
                        <button type="button" class="btn btn-primary text-white" onClick={onCalcular}>Calcular</button>
                        <button type="button" class="btn text-white" onClick={onLimpiar}>Limpiar</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default FormInputControl;