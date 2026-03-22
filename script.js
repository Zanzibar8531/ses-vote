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

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSubjects();
    initCorriges();
    initFlashcards();
    initNotes();
});

function initNavigation() {
    const navElements = document.querySelectorAll('[data-tab]');
    navElements.forEach(el => {
        el.addEventListener('click', (e) => {
            let target = e.target;
            while(!target.hasAttribute('data-tab')) { target = target.parentElement; }
            const tabId = target.getAttribute('data-tab');
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.sidebar .nav-btn').forEach(btn => btn.classList.remove('active'));
            document.getElementById('tab-' + tabId).classList.add('active');
            const menuBtn = document.querySelector(`.sidebar .nav-btn[data-tab="${tabId}"]`);
            if(menuBtn) menuBtn.classList.add('active');
            window.scrollTo(0, 0);
        });
    });
}

function initSubjects() {
    const subjectBtns = document.querySelectorAll('[data-subject]');
    subjectBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const subjectId = e.target.getAttribute('data-subject');
            document.querySelectorAll('.subject-content').forEach(s => s.classList.add('hidden'));
            document.querySelectorAll('.subject-selector .nav-btn').forEach(b => {
                if(!b.classList.contains('btn-s-green')) {
                    b.classList.remove('btn-s-blue');
                    b.classList.add('btn-s-gray');
                }
            });
            document.getElementById('subject-' + subjectId).classList.remove('hidden');
            if(!e.target.classList.contains('btn-s-green')) {
                e.target.classList.remove('btn-s-gray');
                e.target.classList.add('btn-s-blue');
            }
        });
    });
}

function initCorriges() {
    const corrigeBtns = document.querySelectorAll('[data-corrige]');
    corrigeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const corrigeId = e.target.getAttribute('data-corrige');
            document.getElementById(corrigeId).classList.toggle('hidden');
        });
    });
}

function initFlashcards() {
    updateCard();
    document.getElementById('btn-valider-card').addEventListener('click', () => {
        document.getElementById('flashcard').classList.add('flipped');
    });
    document.getElementById('btn-next-card').addEventListener('click', () => {
        currentCardIndex = Math.floor(Math.random() * defsBase.length);
        updateCard();
    });
}

function updateCard() {
    const card = defsBase[currentCardIndex];
    let mode = Math.random() > 0.5 ? "mot" : "def";
    document.getElementById('card-front').textContent = (mode === "mot") ? card.t : card.d;
    document.getElementById('card-back').innerHTML = `<strong>— RÉPONSE —</strong><div style="padding:10px;">${(mode === "mot") ? card.d : card.t}</div>`;
    document.getElementById('flashcard').classList.remove('flipped');
    document.getElementById('user-answer').value = "";
}

function initNotes() {
    const editableArea = document.getElementById('editable-area');
    const saved = localStorage.getItem('ses_notes');
    if (saved) { editableArea.innerHTML = saved; } else { resetDefs(); }
    editableArea.addEventListener('input', () => { localStorage.setItem('ses_notes', editableArea.innerHTML); });
    document.getElementById('btn-reset-defs').addEventListener('click', resetDefs);
}

function resetDefs() {
    let content = "<h2 style='color:var(--primary)'>Dictionnaire du Chapitre</h2>";
    defsBase.forEach(item => { content += `<p><strong>${item.t} :</strong> ${item.d}</p>`; });
    document.getElementById('editable-area').innerHTML = content;
    localStorage.removeItem('ses_notes');
}