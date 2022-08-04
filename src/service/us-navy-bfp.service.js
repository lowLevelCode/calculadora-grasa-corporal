import { cmToIn } from "../utils/converter";

export const usNavyBfpService = {
    calculateBodyFatPercentage: (alturaCm, cinturaCm, caderaCm, cuelloCm, isMale) => {
        const porcentaje = isMale ?
            calculateBodyFatPercentageforMale(alturaCm, cinturaCm, cuelloCm) :
            calculateBodyFatPercentageforFemale(alturaCm, cinturaCm, caderaCm, cuelloCm);

        return porcentaje;
    },    
}

export const calculateBodyFatPercentageforMale = (alturaCm, cinturaCm, cuelloCm) => {
    const alturaIn = cmToIn(alturaCm);
    const cinturaIn = cmToIn(cinturaCm);
    const cuelloIn = cmToIn(cuelloCm);

    const porcentaje = (86.010 * Math.log10(cinturaIn - cuelloIn) - 70.041 * Math.log10(alturaIn) + 36.76).toFixed(2);
    return porcentaje;
}

export const calculateBodyFatPercentageforFemale = (alturaCm, cinturaCm, caderaCm, cuelloCm) => {
    const alturaIn = cmToIn(alturaCm);
    const cinturaIn = cmToIn(cinturaCm);
    const caderaIn = cmToIn(caderaCm);
    const cuelloIn = cmToIn(cuelloCm);    

    const porcentaje = (163.205 * Math.log10 (cinturaIn + caderaIn - cuelloIn) - 97.684 * Math.log10 (alturaIn) - 78.387).toFixed(2);
    return porcentaje;
}