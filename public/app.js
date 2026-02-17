
const questions = [

    { id: 1, text: "Performance vs. Energieeffizienz: Ist Rechengeschwindigkeit wichtiger als Stromverbrauch?", labelA: "Performance", labelB: "Energie" },
    { id: 2, text: "Performance vs. Wartbarkeit: Ist Geschwindigkeit wichtiger als Code-Lesbarkeit?", labelA: "Performance", labelB: "Wartbarkeit" },
    { id: 3, text: "Performance vs. Langlebigkeit: Sind Benchmarks wichtiger als langfristige Stabilität?", labelA: "Performance", labelB: "Langlebigkeit" },
    { id: 4, text: "Performance vs. Team-Skalierbarkeit: Ist Optimierung wichtiger als standardisierte Architektur?", labelA: "Performance", labelB: "Team-Skal." },
    { id: 5, text: "Performance vs. Produktivität: Ist Laufzeit wichtiger als Entwicklungsgeschwindigkeit?", labelA: "Performance", labelB: "Produktivität" },

    { id: 6, text: "Energieeffizienz vs. Wartbarkeit: Ist grüner Code wichtiger als sauberer Code?", labelA: "Energie", labelB: "Wartbarkeit" },
    { id: 7, text: "Energieeffizienz vs. Langlebigkeit: Ist Verbrauch wichtiger als Zukunftssicherheit?", labelA: "Energie", labelB: "Langlebigkeit" },
    { id: 8, text: "Energieeffizienz vs. Team-Skalierbarkeit: Ist CO2-Fußabdruck wichtiger als Team-Prozesse?", labelA: "Energie", labelB: "Team-Skal." },
    { id: 9, text: "Energieeffizienz vs. Produktivität: Ist Nachhaltigkeit wichtiger als schnelle Umsetzung?", labelA: "Energie", labelB: "Produktivität" },

    { id: 10, text: "Wartbarkeit vs. Langlebigkeit: Ist Verständlichkeit heute wichtiger als Existenzgarantie in 10 Jahren?", labelA: "Wartbarkeit", labelB: "Langlebigkeit" },
    { id: 11, text: "Wartbarkeit vs. Team-Skalierbarkeit: Ist Code-Qualität wichtiger als strikte Arbeitsstrukturen?", labelA: "Wartbarkeit", labelB: "Team-Skal." },
    { id: 12, text: "Wartbarkeit vs. Produktivität: Ist Wartbarkeit wichtiger als schnelle 'Time-to-Market'?", labelA: "Wartbarkeit", labelB: "Produktivität" },

    { id: 13, text: "Langlebigkeit vs. Team-Skalierbarkeit: Ist Technologie-Stabilität wichtiger als Team-Wachstum?", labelA: "Langlebigkeit", labelB: "Team-Skal." },
    { id: 14, text: "Langlebigkeit vs. Produktivität: Ist Langzeit-Support wichtiger als schnelle Entwicklung heute?", labelA: "Langlebigkeit", labelB: "Produktivität" },

    { id: 15, text: "Team-Skalierbarkeit vs. Produktivität: Sind feste Regeln für viele Devs wichtiger als individueller Speed?", labelA: "Team-Skal.", labelB: "Produktivität" }
];

function startApp() {
    document.getElementById('landing-page').classList.add('hidden');
    document.getElementById('questionnaire').classList.remove('hidden');
    renderQuestions();
}

function renderQuestions() {
    const container = document.getElementById('questions-container');
    container.innerHTML = '';
    
    questions.forEach((q, index) => {
        const parts = q.text.split(':');
        const title = parts[0];
        const questionText = parts[1] ? parts[1].trim() : "";

        const div = document.createElement('div');
        div.className = 'question-item';
        div.innerHTML = `
            <div style="margin-bottom: 15px;">
                <span style="font-weight: bold; color: #333; display:block; margin-bottom:4px;">Frage ${index + 1}: ${title}</span>
                <span style="font-size: 1.0em; color: #555;">${questionText}</span>
            </div>
            
            <div style="display: flex; justify-content: space-between; font-size: 0.85em; color: #007bff; font-weight: bold; margin-bottom: 5px;">
                <span>${q.labelA}</span>
                <span>${q.labelB}</span>
            </div>
            
            <div class="slider-container">
                <input type="range" id="q-${index}" min="-8" max="8" value="0" step="1" oninput="updateValue(this, ${index})">
                <div class="scale-labels">
                    <span>9</span><span>7</span><span>5</span><span>3</span><span>1</span><span>3</span><span>5</span><span>7</span><span>9</span>
                </div>
            </div>
            
            <p style="text-align: center; font-size: 0.9em; height: 1.2em; margin-top: 10px; color: #333;">
                <span id="desc-${index}">Gleich wichtig</span>
            </p>
        `;
        container.appendChild(div);
    });
}

function updateValue(slider, index) {
    const val = parseInt(slider.value);
    const q = questions[index];
    const ahpValue = Math.abs(val) + 1;
    
    const getScaleText = (v) => {
        if (v === 1) return "Gleich wichtig";
        if (v <= 3) return "etwas wichtiger";
        if (v <= 6) return "wichtiger";
        if (v <= 8) return "sehr viel wichtiger";
        return "extrem viel wichtiger";
    };

    let text = "Gleich wichtig";
    const scaleDescription = getScaleText(ahpValue);

    if (val < 0) {
        text = `<b>${q.labelA}</b> ist ${scaleDescription}`;
    } else if (val > 0) {
        text = `<b>${q.labelB}</b> ist ${scaleDescription}`;
    }

    document.getElementById(`desc-${index}`).innerHTML = text;
}

async function submitAnswers() {
    const inputs = document.querySelectorAll('input[type="range"]');
    
    const collectedAnswers = Array.from(inputs).map(input => {
        const val = parseInt(input.value);
        if (val === 0) return 1;
        if (val < 0) return Math.abs(val) + 1; 
        if (val > 0) return 1 / (val + 1);
    });

    try {
        const response = await fetch('/api/calculate-weights', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers: collectedAnswers }) 
        });
        
        const result = await response.json();
        
        document.getElementById('questionnaire').classList.add('hidden');
        document.getElementById('results').classList.remove('hidden');
        let outputHtml = '<h3>Empfehlung (TOPSIS Ranking):</h3>';
        outputHtml += '<div style="margin-bottom: 40px;">';
        
        if (result.ranking && result.ranking.length > 0) {
            result.ranking.forEach((item, index) => {
                const scorePercent = (item.score * 100).toFixed(1);
                const rank = index + 1;
                
                const isWinner = index === 0;
                const borderStyle = isWinner ? 'border: 2px solid #28a745; background-color: #f0fff4;' : 'border: 1px solid #ddd; background-color: #fff;';
                const rankColor = isWinner ? '#28a745' : '#666';
                const icon = `<span style="color:${rankColor}; font-weight:bold; font-size: 1.2em;">#${rank}</span>`;
                outputHtml += `
                    <div class="result-row" style="${borderStyle} padding: 15px 20px; border-radius: 8px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 15px;">
                        
                        <div style="display: flex; align-items: center; min-width: 200px;">
                            <span style="margin-right: 20px; width: 30px; text-align:center;">${icon}</span>
                            <strong style="font-size: 1.3em;">${item.framework}</strong>
                        </div>
                        
                        <div class="result-bar-container" style="flex-grow: 1; min-width: 250px; display: flex; align-items: center; justify-content: flex-end; gap: 15px;">
                            <span style="font-size: 0.95em; color: #555; white-space: nowrap; width: 140px; text-align: right;">Score: <strong>${scorePercent}%</strong></span>
                            
                            <div style="background:#e9ecef; height: 14px; border-radius:7px; width: 100%; max-width: 300px;">
                                <div style="background:${isWinner ? '#28a745' : '#007bff'}; height: 100%; border-radius:7px; width:${scorePercent}%"></div>
                            </div>
                        </div>

                    </div>
                `;
            });
        }
        outputHtml += '</div>';

        // --- AHP GEWICHTUNG ---
        outputHtml += '<h4 style="margin-top:30px; padding-top:20px; border-top:1px solid #eee;">Deine Gewichtung (AHP):</h4><ul style="list-style: none; padding: 0;">';
        
        if (result.ahp && result.ahp.weights) {
            const sortedWeights = Object.entries(result.ahp.weights)
                .sort(([,a], [,b]) => b - a);

            sortedWeights.forEach(([key, value]) => {
                const percentage = (value * 100).toFixed(1);
                outputHtml += `
                    <li style="margin-bottom: 15px;">
                        <div style="display:flex; justify-content:space-between; margin-bottom:4px; font-size:1em;">
                            <span>${key}</span>
                            <strong>${percentage}%</strong>
                        </div>
                        <div style="background:#e9ecef; height: 10px; border-radius:5px; width: 100%;">
                            <div style="background:#6c757d; height: 100%; border-radius:5px; width:${percentage}%"></div>
                        </div>
                    </li>`;
            });
        }
        outputHtml += '</ul>';

        if(result.ahp && result.ahp.CR !== undefined) {
             const isCons = result.ahp.isConsistent;
             const color = isCons ? '#28a745' : '#dc3545';
             const icon = isCons ? '✅' : '⚠️';
             const msg = isCons ? 'Deine Antworten sind logisch konsistent.' : 'Deine Antworten enthalten Widersprüche.';
             
             outputHtml += `
             <div style="margin-top:30px; border: 1px solid ${color}; padding: 15px 20px; border-radius: 8px; background-color: #fafafa; display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 1.5em;">${icon}</span>
                <div>
                    <strong style="color:${color}; display: block;">Konsistenz-Check (CR: ${result.ahp.CR.toFixed(3)})</strong>
                    <span style="font-size: 0.9em; color: #555;">${msg}</span>
                </div>
             </div>`;
        }

        document.getElementById('result-output').innerHTML = outputHtml;

    } catch (error) {
        console.error("Fehler:", error);
        alert("Fehler bei der Berechnung.");
    }
}