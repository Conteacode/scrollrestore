let accordionelements = null;
let btn = null;
let overlay = null;
let accordion = null;

document.addEventListener('DOMContentLoaded', function () {
    init(); // Initialize the accordion
    loadStateFromLocalStorage();
    loadScrollPosition();
}, false);

init = function() {

    accordion = document.getElementById('accordion');
    overlay = document.getElementById('overlay');
    btn = document.getElementById('btn');
    btn.addEventListener('click', function() {
        calculate();
    });
    accordionelements = document.getElementsByClassName('accordion-elm');
    
    for (let item of accordionelements) {
        item.querySelector(".accordion-elm-header").addEventListener('click', function () {
            item.closest(".accordion-elm").classList.toggle('open');
        });
    }
}
loadStateFromLocalStorage = function() {
    console.log("loadStateFromLocalStorage");
    let accordionState = window.localStorage.getItem('accordion');
    if (accordionState) {
        accordionState = JSON.parse(accordionState);
        for (let item of accordionState) {
            let accordionId = item.id;
            let isOpen = item.isOpen;
            let accordionElement = document.getElementById(accordionId);
            if (isOpen) {
                accordionElement.classList.add('open');
            }
        }
    }
}

calculate = function() {
    overlay.classList.add('active');
    setTimeout(function() {
        saveAccordionState();
        saveScrollPosition();
        location.reload();
        loadStateFromLocalStorage();
        loadScrollPosition();
        overlay.classList.remove('active');    
    }, 1000);

}

collapseAll = function() {
    for (let item of accordionelements) {
        item.classList.remove('open');
    }
}
saveScrollPosition = function() {
    console.log(window.scrollY)
    window.localStorage.setItem('scrollPosition', window.scrollY);
}
loadScrollPosition = function() {
    let scrollPosition = window.localStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, scrollPosition);
    }
}

saveAccordionState = function() {
    let accordionState = [];
    for (let item of accordionelements) {
        let accordionId = item.id;
        let isOpen = item.classList.contains('open');
        accordionState.push({ id: accordionId, isOpen: isOpen });
    }
    window.localStorage.setItem('accordion', JSON.stringify(accordionState));
}
 
resetAll = function() {
    window.localStorage.clear();
    location.reload();
}