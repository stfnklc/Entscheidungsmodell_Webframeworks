const { matrix, sum } = require('mathjs');

const RI = { 1: 0, 2: 0, 3: 0.58, 4: 0.9, 5: 1.12, 6: 1.24, 7: 1.32, 8: 1.41 };

const DETAILED_CRITERIA = [
    'Performance', 'Energieeffizienz', 'Wartbarkeit', 
    'Langlebigkeit', 'Team-Skalierbarkeit', 'Produktivität', 'Ökosystem'
];

function calculateAHP(answers, mode) {
    if (mode === 'detailed') {
        return calculateDetailedAHP(answers);
    } else {
        return calculateQuickAHP(answers);
    }
}

function solveSingleMatrix(values, n) {
    let mat = Array(n).fill().map(() => Array(n).fill(1));
    let valIndex = 0;

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            let val = values[valIndex] || 1;
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

    return { weights, CR };
}

function calculateDetailedAHP(answers) {
    const result = solveSingleMatrix(answers, 7);

    const namedWeights = {};
    DETAILED_CRITERIA.forEach((name, i) => {
        namedWeights[name] = result.weights[i];
    });

    return {
        weights: namedWeights,
        CR: result.CR,
        isConsistent: result.CR < 0.1
    };
}

function calculateQuickAHP(answers) {
    const clusterRes = solveSingleMatrix(answers.slice(0, 3), 3);
    const w_Strat = clusterRes.weights[0];
    const w_Tech  = clusterRes.weights[1];
    const w_Proc  = clusterRes.weights[2];
    const stratRes = solveSingleMatrix(answers.slice(3, 4), 2);
    const techRes = solveSingleMatrix(answers.slice(4, 5), 2);
    const procRes = solveSingleMatrix(answers.slice(5, 8), 3);
    
    const finalWeights = {
        'Performance':         w_Tech * techRes.weights[0],
        'Energieeffizienz':    w_Tech * techRes.weights[1],
        
        'Langlebigkeit':       w_Strat * stratRes.weights[0],
        'Ökosystem':           w_Strat * stratRes.weights[1],
        
        'Wartbarkeit':         w_Proc * procRes.weights[0],
        'Team-Skalierbarkeit': w_Proc * procRes.weights[1],
        'Produktivität':       w_Proc * procRes.weights[2]
    };

    return {
        weights: finalWeights,
        CR: clusterRes.CR, 
        isConsistent: clusterRes.CR < 0.1
    };
}

module.exports = { calculateAHP };