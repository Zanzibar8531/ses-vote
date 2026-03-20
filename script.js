const defsBase = [
    { t: "Taux d’inscription", d: "Proportion de personnes inscrites sur les listes électorales parmi les personnes en âge de voter." },
    { t: "Taux de participation", d: "Pourcentage des inscrits qui ont exprimé un choix (vote pour un candidat, vote blanc et nul)." },
    { t: "Taux d’abstention", d: "Pourcentage des inscrits qui n'ont pas exprimé de choix." },
    { t: "Participation électorale", d: "Le fait d’aller aux urnes lors d’une élection." },
    { t: "Abstention électorale", d: "Le fait de ne pas aller aux urnes lors d’une élection." },
    { t: "Abstention dans le jeu", d: "Fait de ne pas voter car aucun candidat ne convient, tout en suivant la politique." },
    { t: "Abstention hors jeu", d: "Fait de ne pas voter par sentiment d'exclusion ou manque de compétence politique." },
    { t: "Degré d'intégration sociale", d: "Force des liens reliant un individu aux autres. Plus on est intégré, plus on vote." },
    { t: "Compétence politique", d: "Sentiment d'avoir les connaissances nécessaires pour comprendre et juger la politique." },
    { t: "Appartenance sociale", d: "Caractéristiques d'un individu (âge, diplôme, PCS, religion) qui influencent son vote." },
    { t: "Offre électorale", d: "L'ensemble des programmes, candidats et partis présents lors d'une élection." },
    { t: "Clivage gauche-droite", d: "Différence de valeurs (économie, social) entre deux camps opposés." },
    { t: "Volatilité électorale", d: "Changement de comportement électoral entre deux scrutins." },
    { t: "Vote intermittent", d: "Fait de voter puis de ne pas voter (ou inversement) selon l'élection." },
    { t: "Identification partisane", d: "Attachement affectif et durable à un camp politique, souvent familial." },
    { t: "PCS", d: "Professions et Catégories Socioprofessionnelles : classement des individus selon leur métier." }
];

let currentCardIndex = 0;

function showTab(tabId) {
    // Cache tous les onglets
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    // Désactive tous les boutons du menu
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    // Affiche l'onglet cliqué
    document.getElementById('tab-' + tabId).classList.add('active');
    
    // Active le bouton cliqué (desktop ou mobile)
    const btns = document.querySelectorAll('.nav-btn');
    btns.forEach(btn => {
        if(btn.getAttribute('onclick').includes(tabId)) {
            btn.classList.add('active');
        }
    });

    // Remonte en haut de page (crucial sur mobile)
    window.scrollTo(0, 0);
}

function showSubject(id) {
    document.querySelectorAll('.subject-content').forEach(s => s.style.display = 'none');
    document.getElementById('subject-' + id).style.display = 'block';
    
    document.querySelectorAll('.subject-selector .nav-btn').forEach(btn => {
        btn.style.background = '#64748b'; 
    });
    
    const activeBtn = document.getElementById('btn-' + id);
    if(activeBtn) {
        activeBtn.style.background = id.startsWith('doc') ? '#059669' : '#4f46e5';
    }
}

function toggleCorrige(id) {
    const div = document.getElementById(id);
    div.style.display = (div.style.display === 'none' || div.style.display === '') ? 'block' : 'none';
}

function updateCard() {
    const card = defsBase[currentCardIndex];
    let mode = Math.random() > 0.5 ? "mot" : "def";
    document.getElementById('card-front').textContent = (mode === "mot") ? card.t : card.d;
    document.getElementById('card-back').innerHTML = `<strong>— RÉPONSE —</strong><div style="padding:10px;">${(mode === "mot") ? card.d : card.t}</div>`;
    document.getElementById('flashcard').classList.remove('flipped');
    document.getElementById('user-answer').value = "";
}

function checkFlashcard() { 
    document.getElementById('flashcard').classList.add('flipped'); 
}

function nextCard() { 
    currentCardIndex = Math.floor(Math.random() * defsBase.length);
    updateCard(); 
}

window.onload = () => {
    const editableArea = document.getElementById('editable-area');
    const saved = localStorage.getItem('ses_notes');
    if (saved) {
        editableArea.innerHTML = saved;
    } else {
        resetDefs();
    }
    
    editableArea.addEventListener('input', () => { 
        localStorage.setItem('ses_notes', editableArea.innerHTML); 
    });
    
    updateCard();
};

function resetDefs() {
    let content = "<h2 style='color:var(--primary)'>Dictionnaire du Chapitre</h2>";
    defsBase.forEach(item => { content += `<p><strong>${item.t} :</strong> ${item.d}</p>`; });
    document.getElementById('editable-area').innerHTML = content;
    localStorage.removeItem('ses_notes');
}