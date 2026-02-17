const { matrix, row, col, max, min, sqrt, sum, square, dotDivide, dotMultiply, add, subtract } = require('mathjs');


const FRAMEWORKS = [
    { 
        name: 'Svelte', 
        values: { 
            'Langlebigkeit': 5.99, 
            'Wartbarkeit': 8.53, 
            'Energieeffizienz': 9.59, 
            'Performance': 9.31, 
            'Produktivität': 7.90, 
            'Team-Skalierbarkeit': 6.00 
        } 
    },
    { 
        name: 'Vue', 
        values: { 
            'Langlebigkeit': 7.78, 
            'Wartbarkeit': 8.15, 
            'Energieeffizienz': 8.43, 
            'Performance': 7.49, 
            'Produktivität': 8.16, 
            'Team-Skalierbarkeit': 7.10 
        } 
    },
    { 
        name: 'React', 
        values: { 
            'Langlebigkeit': 9.57, 
            'Wartbarkeit': 8.18, 
            'Energieeffizienz': 7.75, 
            'Performance': 6.36, 
            'Produktivität': 8.54, 
            'Team-Skalierbarkeit': 9.87 
        } 
    },
    { 
        name: 'Angular', 
        values: { 
            'Langlebigkeit': 7.75, 
            'Wartbarkeit': 7.15, 
            'Energieeffizienz': 6.75, 
            'Performance': 5.92, 
            'Produktivität': 7.30, 
            'Team-Skalierbarkeit': 8.36 
        } 
    },
    { 
        name: 'VanillaJS', 
        values: { 
            'Langlebigkeit': 10.00, 
            'Wartbarkeit': 4.13, 
            'Energieeffizienz': 9.60, 
            'Performance': 10.00, 
            'Produktivität': 5.52, 
            'Team-Skalierbarkeit': 4.00 
        } 
    }
];

const CRITERIA_ORDER = [
    'Performance', 'Energieeffizienz', 'Wartbarkeit', 
    'Langlebigkeit', 'Team-Skalierbarkeit', 'Produktivität'
];

function calculateTOPSIS(ahpWeights) {
    const m = FRAMEWORKS.length;       
    const n = CRITERIA_ORDER.length;   

    let rawData = [];
    for(let i=0; i<m; i++) {
        let rowData = [];
        for(let j=0; j<n; j++) {
            let critName = CRITERIA_ORDER[j];
            rowData.push(FRAMEWORKS[i].values[critName]);
        }
        rawData.push(rowData);
    }

    let normalizedMatrix = Array(m).fill().map(() => Array(n).fill(0));
    
    for (let j = 0; j < n; j++) {
        let sumSquares = 0;
        for (let i = 0; i < m; i++) {
            sumSquares += Math.pow(rawData[i][j], 2);
        }
        let divisor = Math.sqrt(sumSquares);
        for (let i = 0; i < m; i++) {
            normalizedMatrix[i][j] = rawData[i][j] / divisor;
        }
    }

    let weightedMatrix = Array(m).fill().map(() => Array(n).fill(0));
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            let critName = CRITERIA_ORDER[j];
            let weight = ahpWeights[critName] || 0;
            weightedMatrix[i][j] = normalizedMatrix[i][j] * weight;
        }
    }

    let idealSolution = Array(n).fill(0);
    let antiIdealSolution = Array(n).fill(0);

    for (let j = 0; j < n; j++) {
        let colValues = [];
        for (let i = 0; i < m; i++) {
            colValues.push(weightedMatrix[i][j]);
        }
        idealSolution[j] = Math.max(...colValues);
        antiIdealSolution[j] = Math.min(...colValues);
    }
   
    let rankings = [];

    for (let i = 0; i < m; i++) {
        let distBest = 0;
        let distWorst = 0;

        for (let j = 0; j < n; j++) {
            distBest += Math.pow(weightedMatrix[i][j] - idealSolution[j], 2);
            distWorst += Math.pow(weightedMatrix[i][j] - antiIdealSolution[j], 2);
        }

        distBest = Math.sqrt(distBest);
        distWorst = Math.sqrt(distWorst);
        let score = 0;
        if (distBest + distWorst !== 0) {
            score = distWorst / (distBest + distWorst);
        }

        rankings.push({
            framework: FRAMEWORKS[i].name,
            score: score,
            details: FRAMEWORKS[i].values
        });
    }

    rankings.sort((a, b) => b.score - a.score);

    return rankings;
}

module.exports = { calculateTOPSIS };