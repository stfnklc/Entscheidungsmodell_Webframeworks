let myRadarChart = null; 

const questions = [
    { id: 1, text: "Performance vs. Energieeffizienz: Ist Rechengeschwindigkeit wichtiger als Stromverbrauch?", labelA: "Performance", labelB: "Energie",
      helpText: "Lädt deine App lieber blitzschnell und verbraucht dafür mehr Ressourcen (Performance) oder ist sie ressourcenschonend und akkufreundlich für mobile Nutzer (Energieeffizienz)?" },
    { id: 2, text: "Performance vs. Wartbarkeit: Ist Geschwindigkeit wichtiger als Code-Lesbarkeit?", labelA: "Performance", labelB: "Wartbarkeit",
      helpText: "Ist es wichtiger, jede Millisekunde Ladezeit aus dem Code zu quetschen (Performance) oder soll der Code sauber, verständlich und einfach für das Pflegen von Updates sein (Wartbarkeit)?" },
    { id: 3, text: "Performance vs. Langlebigkeit: Sind Benchmarks wichtiger als langfristige Stabilität?", labelA: "Performance", labelB: "Langlebigkeit",
      helpText: "Brauchst du maximale Ausführungsgeschwindigkeit für den Moment (Performance) oder ist es essenziell, dass das Framework auch in 5-10 Jahren noch relevant und unterstützt wird (Langlebigkeit)?" },
    { id: 4, text: "Performance vs. Team-Skalierbarkeit: Ist Optimierung wichtiger als standardisierte Architektur?", labelA: "Performance", labelB: "Team-Skal.",
      helpText: "Ist rohe Geschwindigkeit entscheidend (Performance) oder brauchst du feste Strukturen, damit viele Entwickler gleichzeitig ohne Chaos am Code arbeiten können (Team-Skalierbarkeit)?" },
    { id: 5, text: "Performance vs. Produktivität: Ist Laufzeit wichtiger als Entwicklungsgeschwindigkeit?", labelA: "Performance", labelB: "Produktivität",
      helpText: "Geht es um die bestmögliche Erfahrung für den Endnutzer (Performance) oder darum, als Entwickler möglichst schnell Features live bringen können (Produktivität)?" },
    { id: 6, text: "Energieeffizienz vs. Wartbarkeit: Ist grüner Code wichtiger als sauberer Code?", labelA: "Energie", labelB: "Wartbarkeit",
      helpText: "Soll die Anwendung minimalen Strom/Akku verbrauchen (Energieeffizienz) oder lieber etwas schwerfälliger, aber dafür für Entwickler extrem sauber strukturiert sein (Wartbarkeit)?" },
    { id: 7, text: "Energieeffizienz vs. Langlebigkeit: Ist Verbrauch wichtiger als Zukunftssicherheit?", labelA: "Energie", labelB: "Langlebigkeit",
      helpText: "Ist ein geringer CO2-Fußabdruck/Akkuverbrauch heute dein Hauptziel (Energieeffizienz) oder die Garantie, dass das Framework sehr langfristig auf dem Markt überlebt (Langlebigkeit)?" },
    { id: 8, text: "Energieeffizienz vs. Team-Skalierbarkeit: Ist CO2-Fußabdruck wichtiger als Team-Prozesse?", labelA: "Energie", labelB: "Team-Skal.",
      helpText: "Optimierst du auf extreme Ressourcenschonung (Energieeffizienz) oder darauf, dass neue Entwickler sich dank strikter Regeln schnell in große Projekte eindenken können (Team-Skalierbarkeit)?" },
    { id: 9, text: "Energieeffizienz vs. Produktivität: Ist Nachhaltigkeit wichtiger als schnelle Umsetzung?", labelA: "Energie", labelB: "Produktivität",
      helpText: "Nimmst du dir Zeit für extrem ressourcenoptimierten Code (Energieeffizienz) oder muss das Projekt einfach schnellstmöglich fertiggestellt werden (Produktivität)?" },
    { id: 10, text: "Wartbarkeit vs. Langlebigkeit: Ist Verständlichkeit heute wichtiger als Existenzgarantie in 10 Jahren?", labelA: "Wartbarkeit", labelB: "Langlebigkeit",
      helpText: "Ist dir wichtig, dass der Code heute gut lesbar und strukturiert ist (Wartbarkeit) oder dass das Framework selbst eine extrem hohe Marktsicherheit für die Zukunft bietet (Langlebigkeit)?" },
    { id: 11, text: "Wartbarkeit vs. Team-Skalierbarkeit: Ist Code-Qualität wichtiger als strikte Arbeitsstrukturen?", labelA: "Wartbarkeit", labelB: "Team-Skal.",
      helpText: "Geht es um sauberen Code (Wartbarkeit) oder um strikte Architektur-Vorgaben ('Opinionated'), die besonders wichtig sind, wenn hunderte Entwickler am selben Projekt arbeiten (Team-Skalierbarkeit)?" },
    { id: 12, text: "Wartbarkeit vs. Produktivität: Ist Wartbarkeit wichtiger als schnelle 'Time-to-Market'?", labelA: "Wartbarkeit", labelB: "Produktivität",
      helpText: "Schreibst du Code für die Ewigkeit, der leicht zu debuggen ist (Wartbarkeit) oder baust du etwas, das einfach nur so schnell wie möglich fertig werden muss (Produktivität)?" },
    { id: 13, text: "Langlebigkeit vs. Team-Skalierbarkeit: Ist Technologie-Stabilität wichtiger als Team-Wachstum?", labelA: "Langlebigkeit", labelB: "Team-Skal.",
      helpText: "Setzt du auf eine extrem etablierte, zukunftssichere Technologie (Langlebigkeit) oder darauf, dass man leicht neue Entwickler für große, skalierende Teams findet und einarbeitet (Team-Skalierbarkeit)?" },
    { id: 14, text: "Langlebigkeit vs. Produktivität: Ist Langzeit-Support wichtiger als schnelle Entwicklung heute?", labelA: "Langlebigkeit", labelB: "Produktivität",
      helpText: "Investierst du in ein Framework, das auch in 10 Jahren noch gepflegt wird (Langlebigkeit) oder willst du mit modernen Tools einfach heute extrem schnell Resultate sehen (Produktivität)?" },
    { id: 15, text: "Team-Skalierbarkeit vs. Produktivität: Sind feste Regeln für viele Devs wichtiger als individueller Speed?", labelA: "Team-Skal.", labelB: "Produktivität",
      helpText: "Brauchst du feste Architektur-Regeln, damit sich große Entwickler-Teams nicht in die Quere kommen (Team-Skalierbarkeit) oder arbeitest du in einem kleinen Team und willst maximalen Output pro Tag (Produktivität)?" }
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
            <div style="margin-bottom: 10px;">
                <div style="display: flex; align-items: flex-start; justify-content: space-between;">
                    <span style="font-weight: bold; color: #333; display:block; margin-bottom:4px; font-size: 1.05em;">
                        Frage ${index + 1}: ${title}
                    </span>
                    <button class="info-btn" onclick="toggleInfo(${index})" title="Hilfe zu dieser Frage anzeigen">?</button>
                </div>
                <span style="font-size: 1.0em; color: #555;">${questionText}</span>
            </div>
            
            <div id="info-${index}" class="info-box hidden">
                <strong>Denkanstoß:</strong> ${q.helpText}
            </div>
            
            <div style="display: flex; justify-content: space-between; font-size: 0.85em; color: #007bff; font-weight: bold; margin-bottom: 5px; margin-top: 15px;">
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

window.toggleInfo = function(index) {
    const infoBox = document.getElementById(`info-${index}`);
    if (infoBox.classList.contains('hidden')) {
        infoBox.classList.remove('hidden');
    } else {
        infoBox.classList.add('hidden');
    }
};

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

        if (!response.ok || result.error) {
            alert("Backend-Fehler: " + (result.error || "Unbekannter Fehler"));
            console.error("Server Error:", result);
            return;
        }
        
        document.getElementById('questionnaire').classList.add('hidden');
        document.getElementById('results').classList.remove('hidden');
        
        let outputHtml = '';

        // 1. AHP GEWICHTUNG
        outputHtml += '<h3 style="margin-top: 10px; margin-bottom: 20px;">Deine Gewichtung (AHP):</h3><ul style="list-style: none; padding: 0; margin-bottom: 20px;">';
        if (result.ahp && result.ahp.weights) {
            const sortedWeights = Object.entries(result.ahp.weights).sort(([,a], [,b]) => b - a);
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


        // 2. KONSISTENZ-CHECK 
        if(result.ahp && result.ahp.CR !== undefined) {
             const isCons = result.ahp.isConsistent;
             const color = isCons ? '#28a745' : '#dc3545';
             const icon = isCons ? '✅' : '⚠️';
             let msg = isCons 
                ? 'Deine Antworten sind logisch konsistent. Das AHP-Modell konnte deine Präferenzen perfekt abbilden.' 
                : 'Deine Antworten enthalten logische Widersprüche (z.B. A ist wichtiger als B, B ist wichtiger als C, aber C ist angeblich wichtiger als A).';
             
             let hintHtml = '';
             if (!isCons && result.ahp.worstPair) {
                 hintHtml = `
                 <div style="margin-top: 12px; font-size: 0.95em; background: #fff3cd; color: #856404; padding: 12px; border-radius: 6px; border-left: 4px solid #ffeeba;">
                    <strong>💡 Tipp zur Verbesserung:</strong><br>
                    Der größte Widerspruch liegt in deinem Vergleich zwischen <b>${result.ahp.worstPair.critA}</b> und <b>${result.ahp.worstPair.critB}</b>.
                 </div>`;
             }
             
             outputHtml += `
             <div style="margin-bottom: 40px; border: 1px solid ${color}; padding: 15px 20px; border-radius: 8px; background-color: #fafafa; display: flex; align-items: flex-start; gap: 15px;">
                <span style="font-size: 1.8em; margin-top: 2px;">${icon}</span>
                <div style="flex-grow: 1;">
                    <strong style="color:${color}; display: block; margin-bottom: 5px; font-size: 1.1em;">Konsistenz-Check (CR: ${result.ahp.CR.toFixed(3)})</strong>
                    <span style="font-size: 0.95em; color: #555; line-height: 1.5;">${msg}</span>
                    ${hintHtml}
                </div>
             </div>`;
        }


        // 3. TOPSIS RANKING
        outputHtml += '<h3 style="margin-top: 10px; border-top: 1px solid #eee; padding-top: 30px;">Framework Ranking (TOPSIS):</h3>';
        outputHtml += '<div style="margin-bottom: 40px;">';
        
        if (result.ranking && result.ranking.length > 0) {
            result.ranking.forEach((item, index) => {
                const matchIndex = Math.round(item.score * 100);
                const rank = index + 1;
                const isWinner = index === 0;
                
                let ratingText = "";
                let barColor = "";
                if (matchIndex >= 80) { ratingText = "Sehr hohe Eignung"; barColor = "#28a745"; } 
                else if (matchIndex >= 60) { ratingText = "Hohe Eignung"; barColor = "#85c138"; } 
                else if (matchIndex >= 40) { ratingText = "Moderate Eignung"; barColor = "#ffc107"; } 
                else { ratingText = "Geringe Eignung"; barColor = "#dc3545"; }

                const borderStyle = isWinner ? `border: 2px solid ${barColor}; background-color: #f8fff9;` : 'border: 1px solid #ddd; background-color: #fff;';
                const rankColor = isWinner ? barColor : '#666';
                const icon = `<span style="color:${rankColor}; font-weight:bold; font-size: 1.2em;">#${rank}</span>`;

                outputHtml += `
                    <div class="result-row" style="${borderStyle} padding: 15px 20px; border-radius: 8px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 15px;">
                        <div style="display: flex; align-items: center; min-width: 200px;">
                            <span style="margin-right: 20px; width: 30px; text-align:center;">${icon}</span>
                            <strong style="font-size: 1.3em; color: #333;">${item.framework}</strong>
                        </div>
                        <div class="result-bar-container" style="flex-grow: 1; min-width: 250px; display: flex; flex-direction: column; align-items: flex-end; gap: 6px;">
                            <div style="display: flex; justify-content: space-between; width: 100%; max-width: 300px; align-items: flex-end;">
                                <span style="font-size: 0.9em; font-weight: bold; color: ${barColor};">${ratingText}</span>
                                <span style="font-size: 1em; color: #444;">Match: <strong>${matchIndex} / 100</strong></span>
                            </div>
                            <div style="background:#e9ecef; height: 14px; border-radius:7px; width: 100%; max-width: 300px;">
                                <div style="background:${barColor}; height: 100%; border-radius:7px; width:${matchIndex}%"></div>
                            </div>
                        </div>
                    </div>`;
            });
        }
        outputHtml += '</div>';


        // 4. RADAR CHART CONTAINER
        outputHtml += `
            <div class="result-chart-card" style="margin-top: 40px;">
                <h3 class="result-chart-title">Analyse: Sieger vs. TOPSIS Ideal-Framework</h3>
                <div class="result-chart-wrapper">
                    <canvas id="resultRadarChart"></canvas>
                </div>
            </div>
        `;

        document.getElementById('result-output').innerHTML = outputHtml;

        // 5. CHART.JS INITIALISIEREN
        if (result.ranking && result.ranking.length >= 1) {
            const ctx = document.getElementById('resultRadarChart').getContext('2d');
            
            if (myRadarChart) {
                myRadarChart.destroy();
            }

            const rawCategories = ['Performance', 'Energieeffizienz', 'Wartbarkeit', 'Langlebigkeit', 'Team-Skalierbarkeit', 'Produktivität'];
            const weights = result.ahp.weights;
            
            const chartLabels = rawCategories.map(label => {
                const weightPercent = (weights[label] * 100).toFixed(1);
                return [label, `Gewichtung: ${weightPercent}%`];
            });
            
            const winnerData = rawCategories.map(label => result.ranking[0].details[label] * weights[label]);
            
            const idealData = rawCategories.map(label => {
                const maxRaw = Math.max(...result.ranking.map(r => r.details[label]));
                return maxRaw * weights[label];
            });

            myRadarChart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: chartLabels,
                    datasets: [
                        {
                            label: '🥇 Dein Sieger: ' + result.ranking[0].framework,
                            data: winnerData,
                            backgroundColor: 'rgba(40, 167, 69, 0.4)', 
                            borderColor: '#28a745',
                            pointBackgroundColor: '#28a745',
                            pointBorderColor: '#fff',
                            borderWidth: 2,
                            order: 1
                        },
                        {
                            label: '🌟 TOPSIS Ideal',
                            data: idealData,
                            backgroundColor: 'rgba(0, 123, 255, 0.08)', 
                            borderColor: '#007bff',
                            pointBackgroundColor: '#007bff',
                            pointBorderColor: '#fff',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            order: 2 
                        }
                    ]
                },
                options: {
                    events: [], 
                    scales: {
                        r: {
                            beginAtZero: true,
                            angleLines: { color: 'rgba(0, 0, 0, 0.1)' },
                            grid: { color: 'rgba(0, 0, 0, 0.1)' },
                            pointLabels: {
                                font: { size: 12, family: "'Segoe UI', sans-serif", weight: 'bold' },
                                color: '#444'
                            },
                            ticks: { display: false } 
                        }
                    },
                    plugins: {
                        legend: { position: 'bottom', labels: { font: { size: 14, weight: 'bold' }, padding: 20 } },
                        tooltip: { enabled: false }
                    },
                    maintainAspectRatio: false
                }
            });
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
        console.error("Fehler:", error);
        alert("Es gab einen kritischen Fehler in der App.");
    }
}