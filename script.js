/* --- TYPEWRITER --- */
const textElements = document.querySelector(".typewriter-text");
const texts = ["Graphic Designer", "UI/UX Designer"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = texts[textIndex];
    if (isDeleting) {
        textElements.innerHTML = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElements.innerHTML = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    let typeSpeed = isDeleting ? 50 : 100;
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
    }
    setTimeout(typeWriter, typeSpeed);
}

/* --- DONNÉES DES PROJETS --- */
const projectData = {
    coffee: {
        title: "Coffee Nova",
        role: "Graphic Design",
        desc: "Coffee Nova is a modern coffee brand. The goal was to create a visual identity that is both minimalist and memorable, based on a smiling coffee cup character.",
        tools: ["Photoshop", "Illustrator"],
        images: ["1.png", "2.jpg", "3.jpg", "4.png", "5.png"]
    },
    poppy: {
        title: "Poppy",
        role: "UI/UX Design",
        desc: "Poppy is a modern movie streaming application interface designed to provide an immersive and intuitive watching experience. Developed with Figma and Illustrator.",
        tools: ["Figma", "Illustrator"],
        images: ["Capture d’écran 2026-04-10 172712.jpg"] // Image unique pour Poppy
    }
};

/* --- INITIALISATION --- */
document.addEventListener('DOMContentLoaded', () => {
    typeWriter();
    reveal();
    checkSkills();
});

/* --- OVERLAY PROJET --- */
function openDetail(projectId) {
    const data = projectData[projectId];
    const overlay = document.getElementById('projectDetail');
    
    // Injection des textes
    overlay.querySelector('.detail-text h2').innerText = data.title;
    overlay.querySelector('.role-container span').innerText = data.role;
    overlay.querySelector('.detail-text p').innerText = data.desc;
    
    // Injection des outils
    const toolsDiv = overlay.querySelector('.tools');
    toolsDiv.innerHTML = data.tools.map(tool => `<span class="tool-badge">${tool}</span>`).join('');

    // Galerie
    const mainImg = document.getElementById('mainImg');
    const thumbs = overlay.querySelector('.thumbs');
    mainImg.src = data.images[0];
    
    // Si une seule image, on vide les miniatures, sinon on les affiche
    if(data.images.length > 1) {
        thumbs.innerHTML = data.images.map(img => `<img src="${img}" onclick="changeImg(this.src)">`).join('');
    } else {
        thumbs.innerHTML = ""; 
    }

    overlay.style.display = 'flex';
    setTimeout(() => overlay.classList.add('show'), 10);
}

function closeDetail() {
    const overlay = document.getElementById('projectDetail');
    overlay.style.display = 'none';
    overlay.classList.remove('show');
}

function changeImg(src) {
    const mainImg = document.getElementById('mainImg');
    mainImg.style.opacity = '0';
    setTimeout(() => {
        mainImg.src = src;
        mainImg.style.opacity = '1';
    }, 200);
}

/* --- ANIMATIONS SCROLL --- */
function reveal() {
    const reveals = document.querySelectorAll(".education-box");
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) el.classList.add("active");
    });
}

function checkSkills() {
    const skillsSection = document.querySelector('#skills');
    if (!skillsSection) return;
    const top = window.scrollY;
    const offset = skillsSection.offsetTop - 500;
    if (top >= offset) skillsSection.classList.add('active');
}

window.addEventListener("scroll", () => {
    reveal();
    checkSkills();
});


