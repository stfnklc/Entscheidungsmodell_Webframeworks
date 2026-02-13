let currentMode = '';

const questions = {
    detailed: [
        // (Hier habe ich die Sections weggelassen, da es eine lange Liste ist, 
        // aber das Prinzip funktioniert auch hier, wenn du möchtest)
        { id: 1, text: "Performance vs. Energieeffizienz: Ist Rechengeschwindigkeit wichtiger als Stromverbrauch?", labelA: "Performance", labelB: "Energie" },
        { id: 2, text: "Performance vs. Wartbarkeit: Ist Geschwindigkeit wichtiger als Code-Lesbarkeit?", labelA: "Performance", labelB: "Wartbarkeit" },
        { id: 3, text: "Performance vs. Langlebigkeit: Sind Benchmarks wichtiger als langfristiger Support?", labelA: "Performance", labelB: "Langlebigkeit" },
        { id: 4, text: "Performance vs. Team-Skalierbarkeit: Ist Optimierung wichtiger als standardisierte Architektur?", labelA: "Performance", labelB: "Team-Skal." },
        { id: 5, text: "Performance vs. Produktivität: Ist Laufzeit wichtiger als Entwicklungsgeschwindigkeit?", labelA: "Performance", labelB: "Produktivität" },
        { id: 6, text: "Performance vs. Ökosystem: Ist 'Lean & Fast' wichtiger als fertige Libraries?", labelA: "Performance", labelB: "Ökosystem" },
        
        { id: 7, text: "Energieeffizienz vs. Wartbarkeit: Ist grüner Code wichtiger als sauberer Code?", labelA: "Energie", labelB: "Wartbarkeit" },
        { id: 8, text: "Energieeffizienz vs. Langlebigkeit: Ist Verbrauch wichtiger als Zukunftssicherheit?", labelA: "Energie", labelB: "Langlebigkeit" },
        { id: 9, text: "Energieeffizienz vs. Team-Skalierbarkeit: Ist CO2-Fußabdruck wichtiger als Team-Prozesse?", labelA: "Energie", labelB: "Team-Skal." },
        { id: 10, text: "Energieeffizienz vs. Produktivität: Ist Nachhaltigkeit wichtiger als schnelle Umsetzung?", labelA: "Energie", labelB: "Produktivität" },
        { id: 11, text: "Energieeffizienz vs. Ökosystem: Ist Effizienz wichtiger als Community-Support?", labelA: "Energie", labelB: "Ökosystem" },

        { id: 12, text: "Wartbarkeit vs. Langlebigkeit: Ist Verständlichkeit heute wichtiger als Existenzgarantie in 10 Jahren?", labelA: "Wartbarkeit", labelB: "Langlebigkeit" },
        { id: 13, text: "Wartbarkeit vs. Team-Skalierbarkeit: Ist Code-Qualität wichtiger als strikte Arbeitsstrukturen?", labelA: "Wartbarkeit", labelB: "Team-Skal." },
        { id: 14, text: "Wartbarkeit vs. Produktivität: Ist Wartbarkeit wichtiger als schnelle 'Time-to-Market'?", labelA: "Wartbarkeit", labelB: "Produktivität" },
        { id: 15, text: "Wartbarkeit vs. Ökosystem: Ist eigener, sauberer Code wichtiger als viele Plugins?", labelA: "Wartbarkeit", labelB: "Ökosystem" },

        { id: 16, text: "Langlebigkeit vs. Team-Skalierbarkeit: Ist Technologie-Stabilität wichtiger als Team-Wachstum?", labelA: "Langlebigkeit", labelB: "Team-Skal." },
        { id: 17, text: "Langlebigkeit vs. Produktivität: Ist Langzeit-Support wichtiger als schnelle Entwicklung heute?", labelA: "Langlebigkeit", labelB: "Produktivität" },
        { id: 18, text: "Langlebigkeit vs. Ökosystem: Ist Hersteller-Garantie wichtiger als Community-Größe?", labelA: "Langlebigkeit", labelB: "Ökosystem" },

        { id: 19, text: "Team-Skalierbarkeit vs. Produktivität: Sind feste Regeln für viele Devs wichtiger als individueller Speed?", labelA: "Team-Skal.", labelB: "Produktivität" },
        { id: 20, text: "Team-Skalierbarkeit vs. Ökosystem: Ist interne Struktur wichtiger als externe Hilfe (Community)?", labelA: "Team-Skal.", labelB: "Ökosystem" },

        { id: 21, text: "Produktivität vs. Ökosystem: Ist schnelles Coden (DX) wichtiger als die Menge verfügbarer Pakete?", labelA: "Produktivität", labelB: "Ökosystem" }
    ],
    quick: [
        { 
            id: 1, 
            section: "Schritt 1: Gewichtung der Hauptkategorien", // NEU
            text: "Strategie vs. Technik: Ist langfristige Sicherheit (Strategie) wichtiger als technische Performance?", 
            labelA: "Strategie", labelB: "Technik" 
        },
        { 
            id: 2, 
            section: "Schritt 1: Gewichtung der Hauptkategorien",
            text: "Strategie vs. Prozess: Ist langfristige Sicherheit wichtiger als der tägliche Entwicklungsprozess?", 
            labelA: "Strategie", labelB: "Prozess" 
        },
        { 
            id: 3, 
            section: "Schritt 1: Gewichtung der Hauptkategorien",
            text: "Technik vs. Prozess: Ist die Technik (Performance) wichtiger als der Prozess (Team/Wartbarkeit)?", 
            labelA: "Technik", labelB: "Prozess" 
        },

        { 
            id: 4, 
            section: "Schritt 2: Details im Bereich 'Strategie'", // NEU
            text: "Langlebigkeit vs. Ökosystem: Ist garantierter Support über 15 Jahre wichtiger als viele verfügbare Plugins?", 
            labelA: "Langlebigkeit", labelB: "Ökosystem" 
        },

        { 
            id: 5, 
            section: "Schritt 3: Details im Bereich 'Technik'", // NEU
            text: "Performance vs. Energieeffizienz: Ist Ladezeit wichtiger als Stromverbrauch?", 
            labelA: "Performance", labelB: "Energie" 
        },

        { 
            id: 6, 
            section: "Schritt 4: Details im Bereich 'Prozess'", // NEU
            text: "Wartbarkeit vs. Team-Skalierbarkeit: Ist verständlicher Code wichtiger als erzwungene Architektur-Regeln?", 
            labelA: "Wartbarkeit", labelB: "Team-Skal." 
        },
        { 
            id: 7, 
            section: "Schritt 4: Details im Bereich 'Prozess'",
            text: "Wartbarkeit vs. Produktivität: Ist sauberer Code wichtiger als schnelle Entwicklungszeit?", 
            labelA: "Wartbarkeit", labelB: "Produktivität" 
        },
        { 
            id: 8, 
            section: "Schritt 4: Details im Bereich 'Prozess'",
            text: "Team-Skalierbarkeit vs. Produktivität: Sind Team-Regeln wichtiger als schnelle Entwicklungszeit?", 
            labelA: "Team-Skal.", labelB: "Produktivität" 
        }
    ]
};

function startApp(mode) {
    currentMode = mode;
    document.getElementById('landing-page').classList.add('hidden');
    document.getElementById('questionnaire').classList.remove('hidden');
    
    document.getElementById('mode-title').innerText = 
        mode === 'detailed' ? 'Detaillierte Analyse (21 Fragen)' : 'Schnell-Check (8 Fragen)';

    renderQuestions(mode);
}

function renderQuestions(mode) {
    const container = document.getElementById('questions-container');
    container.innerHTML = '';
    
    const activeQuestions = questions[mode] || []; 
    let lastSection = null; 

    activeQuestions.forEach((q, index) => {
        
        if (q.section && q.section !== lastSection) {
            const sectionHeader = document.createElement('div');
            sectionHeader.className = 'section-header';
            sectionHeader.innerText = q.section;
            container.appendChild(sectionHeader);
            lastSection = q.section;
        }

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
    const q = questions[currentMode][index];
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
            body: JSON.stringify({ mode: currentMode, answers: collectedAnswers })
        });
        
        const result = await response.json();
        
        document.getElementById('questionnaire').classList.add('hidden');
        document.getElementById('results').classList.remove('hidden');
        
        let outputHtml = '<h3>Prioritäten-Gewichtung:</h3><ul style="list-style: none; padding: 0;">';
        
        const sortedWeights = Object.entries(result.weights)
            .sort(([,a], [,b]) => b - a);

        sortedWeights.forEach(([key, value]) => {
            const percentage = (value * 100).toFixed(1);
            outputHtml += `
                <li style="margin-bottom: 12px;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:2px;">
                        <strong>${key}</strong>
                        <span>${percentage}%</span>
                    </div>
                    <div style="background:#e9ecef; height: 10px; border-radius:5px; width: 100%;">
                        <div style="background:#007bff; height: 100%; border-radius:5px; width:${percentage}%"></div>
                    </div>
                </li>`;
        });
        outputHtml += '</ul>';

        if(result.CR !== undefined) {
             const color = result.isConsistent ? '#28a745' : '#dc3545';
             const icon = result.isConsistent ? '✅' : '⚠️';
             const msg = result.isConsistent ? 'Deine Antworten sind logisch konsistent.' : 'Deine Antworten enthalten Widersprüche.';
             
             outputHtml += `
             <div style="margin-top:20px; border: 1px solid ${color}; padding: 15px; border-radius: 8px; background-color: #fff;">
                <strong style="color:${color}">${icon} Konsistenz-Check (CR: ${result.CR.toFixed(3)})</strong>
                <p style="font-size: 0.9em; margin: 5px 0 0 0;">${msg}</p>
             </div>`;
        }

        document.getElementById('result-output').innerHTML = outputHtml;

    } catch (error) {
        console.error("Fehler:", error);
        alert("Fehler bei der Berechnung.");
    }
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
            body: JSON.stringify({ mode: currentMode, answers: collectedAnswers })
        });
        
        const result = await response.json();
        
        document.getElementById('questionnaire').classList.add('hidden');
        document.getElementById('results').classList.remove('hidden');
        
        let outputHtml = '<h3>Prioritäten-Gewichtung:</h3><ul style="list-style: none; padding: 0;">';
        
        const sortedWeights = Object.entries(result.weights)
            .sort(([,a], [,b]) => b - a);

        sortedWeights.forEach(([key, value]) => {
            const percentage = (value * 100).toFixed(1);
            outputHtml += `
                <li style="margin-bottom: 12px;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:2px;">
                        <strong>${key}</strong>
                        <span>${percentage}%</span>
                    </div>
                    <div style="background:#e9ecef; height: 10px; border-radius:5px; width: 100%;">
                        <div style="background:#007bff; height: 100%; border-radius:5px; width:${percentage}%"></div>
                    </div>
                </li>`;
        });
        outputHtml += '</ul>';

        if(result.CR !== undefined) {
             const color = result.isConsistent ? '#28a745' : '#dc3545';
             const icon = result.isConsistent ? '✅' : '⚠️';
             const msg = result.isConsistent ? 'Deine Antworten sind logisch konsistent.' : 'Deine Antworten enthalten Widersprüche (z.B. A>B, B>C, aber C>A).';
             
             outputHtml += `
             <div style="margin-top:20px; border: 1px solid ${color}; padding: 15px; border-radius: 8px; background-color: #fff;">
                <strong style="color:${color}">${icon} Konsistenz-Check (CR: ${result.CR.toFixed(3)})</strong>
                <p style="font-size: 0.9em; margin: 5px 0 0 0;">${msg}</p>
             </div>`;
        }

        document.getElementById('result-output').innerHTML = outputHtml;

    } catch (error) {
        console.error("Fehler:", error);
        alert("Fehler bei der Berechnung.");
    }
}