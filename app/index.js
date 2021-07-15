const containerMenu = document.querySelector('.container__menu') // the mobile drop down menu
const btnHamburger = document.querySelector('.btnHamburger') // opens the mobile headerLinks menu .container_menu
const headerLinks = document.querySelector('.header__links') // desktop navigation links at the top
const gradiantOverlay = document.querySelector('.gradiant-overlay') // a gradiant background behind the mobile menu
const selectionLabels = document.querySelectorAll('.selection__label') // the label in .selection for .radio-input. Click to select a pledge reward
const pledges = document.querySelectorAll('.pledge') // in .modal__window. Contains a text input and a button for making a pledge
const modalWindow = document.querySelector('.modal__window') // a popup window with pledge options
const buttons = document.querySelectorAll('.button') // buttons that open the .modal__window to make a pledge
const darkOverlay = document.querySelector('.dark__overlay') // a transparent gray background
const closeModal = document.querySelector('.close-modal') // X button to close .modal__window


//////////////////////////////////////////////////////////////////////////////////
////////////////////////////// ANIMATION TRIGGERS ////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// triggers a slide in or out animation on .pledge in _animations.scss
const slidePledges = () => {
    pledges.forEach(pledge => {
        pledge.classList.remove('slide-out')
        pledge.classList.add('slide-in')
    })
    const pledge = document.querySelector(".selection.active .pledge");
    if(pledge) {
        pledge.classList.remove('slide-in')
        pledge.classList.add('slide-out')
    }
}

// triggers a fade animation on the target element by adding a CSS class in _animations.scss
function fadeInOut(target) {
    if(!target.classList.contains('fade-in') && !target.classList.contains('fade-out')) {
        target.classList.add('fade-in')
    } else if(target.classList.contains('fade-in')) {
        target.classList.remove('fade-in')
        target.classList.add('fade-out')
    } else if(target.classList.contains('fade-out')) {
        target.classList.remove('fade-out')
        target.classList.add('fade-in')
    }
}

const toggleModalWindow = () => {
    document.body.classList.toggle('no-scroll')
    modalWindow.classList.toggle("active");
    darkOverlay.classList.toggle("active");
    fadeInOut(darkOverlay)
    fadeInOut(modalWindow)
    fadeInOut(headerLinks)
};

//////////////////////////////////////////////////////////////////////////////////
////////////////////////////// RADIO INPUT ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// clear the .radio-input
const clearSelect = () => {
    // clear the .radio-input that is currently selected
    const currentSelection = document.querySelector(".selection.active");
    if (currentSelection) {
        const radio = document.querySelector(".selection.active .radio-input");
        const pledge = document.querySelector(".selection.active .pledge");
        const currentInput = document.querySelector(".selection.active .pledge-input");
        currentSelection.classList.remove("active");
        slidePledges()
        radio.checked = false;
        setTimeout(() => {
            currentInput.parentElement.classList.remove("error");
            currentInput.value = "";
        }, 500);
    };
};

// select a new .radio-input
const selectNew = select => {
    const parentSelection = select.parentElement; // .modal__window
    parentSelection.classList.add("active"); // change the font color and border colors
    select.checked = true; // check the .radio-input
    slidePledges(); // show the .pledge
    setTimeout(() => parentSelection.scrollIntoView({ behavior: "smooth"}), 550); // scroll .modal__window
};

//////////////////////////////////////////////////////////////////////////////////
////////////////////////////// CLICKABLE ELEMENTS ////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

selectionLabels.forEach(label => {
    label.addEventListener("click", () => {
        clearSelect();
        selectNew(label);
    });
});

buttons.forEach(b => {
    b.addEventListener("click", () => {
        toggleModalWindow();
        clearSelect()
        if (b.classList.contains("about__button")) { // if it's a 'select reward' button
            const inputID = b.id;
            const checkedOption = document.querySelector(inputID);
            checkedOption.checked = true;
            selectNew(checkedOption);
        } else {
            modalWindow.scrollTop = 0; //it is the 'back this project' button, default to the top
        }
    });
});

btnHamburger.addEventListener('click', () => {
    btnHamburger.classList.toggle('open')
    fadeInOut(gradiantOverlay)
    fadeInOut(containerMenu)
})

closeModal.addEventListener('click', () => {
    toggleModalWindow()
})

// if the user clicks outside .modal__window while it is open, close .modal__window
darkOverlay.addEventListener('click', () => {
    clearSelect()
    toggleModalWindow()
})