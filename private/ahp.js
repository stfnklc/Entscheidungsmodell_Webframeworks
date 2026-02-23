const { matrix } = require('mathjs');

const RI = { 1: 0, 2: 0, 3: 0.58, 4: 0.9, 5: 1.12, 6: 1.24, 7: 1.32 };

const CRITERIA = [
    'Performance', 'Energieeffizienz', 'Wartbarkeit', 
    'Langlebigkeit', 'Team-Skalierbarkeit', 'Produktivität'
];

function calculateAHP(answers) {
    const n = 6;
    let mat = Array(n).fill().map(() => Array(n).fill(1));
    let valIndex = 0;

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            let val = answers[valIndex] || 1;
            mat[i][j] = val;
            mat[j][i] = 1 / val;
            valIndex++;
        }
    }

    const colSums = [];
    for(let j=0; j<n; j++) {
        let s = 0;
        for(let i=0; i<n; i++) s += mat[i][j];
        colSums.push(s);
    }

    let weights = mat.map(row => 
        row.reduce((a, b, idx) => a + (b / colSums[idx]), 0) / n
    );

    let lambdaMax = colSums.reduce((acc, val, i) => acc + (val * weights[i]), 0);
    let CI = (lambdaMax - n) / (n - 1);
    let CR = (n > 2) ? CI / RI[n] : 0;

    let worstPair = null;
    let maxDeviation = 0;

    if (CR > 0.1) {
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                let actualVal = mat[i][j]; 
                let expectedVal = weights[i] / weights[j]; 
                
                let deviation = Math.max(actualVal / expectedVal, expectedVal / actualVal);
                
                if (deviation > maxDeviation) {
                    maxDeviation = deviation;
                    worstPair = { critA: CRITERIA[i], critB: CRITERIA[j] };
                }
            }
        }
    }

    const namedWeights = {};
    CRITERIA.forEach((name, i) => {
        namedWeights[name] = weights[i];
    });

    return {
        weights: namedWeights,
        CR: CR,
        isConsistent: CR < 0.1,
        worstPair: worstPair
    };
}

module.exports = { calculateAHP };