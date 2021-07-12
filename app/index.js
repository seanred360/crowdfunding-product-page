const btnHamburger = document.querySelector('.btnHamburger') // for mobile nav menu
const hasFade = document.querySelectorAll('.has-fade') // .container__menu (mobile nav menu) and .gradient-overlay
const hasFade2 = document.querySelectorAll('.has-fade-2') // the popup__window and the .dark__overlay
const buttons = document.querySelectorAll('.button') // buttons that open the .popup__window to make a pledge
const selectionLabels = document.querySelectorAll('.selection__label') // the label in .selection for .radio-input. Click to select a pledge reward
const pledges = document.querySelectorAll('.pledge') // in .popup__window. Contains a text input and a button for making a pledge
const popupWindow = document.querySelector('.popup__window')
const darkOverlay = document.querySelector('.dark__overlay')


const slidePledges = () => {
    /// animate .pledge sliding in and out
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

const fadeInOut = target => {
    target.forEach(e => {
        if(!e.classList.contains('fade-in') && !e.classList.contains('fade-out')) {
                e.classList.add('fade-in')
            } else if(e.classList.contains('fade-in')) {
                e.classList.remove('fade-in')
                e.classList.add('fade-out')
            } else if(e.classList.contains('fade-out')) {
                e.classList.remove('fade-out')
                e.classList.add('fade-in')
            }
    })
}

const clearSelect = () => {
    // clear the .radio-input that is currently selected
    const currentSelection = document.querySelector(".selection.active");
    if (currentSelection) {
        const radio = document.querySelector(".selection.active .radio-input");
        const pledge = document.querySelector(".selection.active .pledge");
        const currentInput = document.querySelector(".selection.active .pledge-input");
        currentSelection.classList.remove("active");
        radio.checked = false;
        setTimeout(() => {
            currentInput.parentElement.classList.remove("error");
            currentInput.value = "";
        }, 500);
    };
};

const selectNew = select => {
    const parentSelection = select.parentElement;
    parentSelection.classList.add("active");
    select.checked = true;
    slidePledges();
    setTimeout(() => select.scrollIntoView({ behavior: "smooth", block: "start" }), 500);
};

const togglePopupWindow = () => {
    popupWindow.classList.toggle("active");
    darkOverlay.classList.toggle("active");
    fadeInOut(hasFade2)
};

selectionLabels.forEach(label => {
    label.addEventListener("click", () => {
        clearSelect();
        selectNew(label);
    });
});

buttons.forEach(b => {
    b.addEventListener("click", () => {
        togglePopupWindow();
        if (b.classList.contains("about__button")) {
            //const inputID = b.getAttribute("href");
            const inputID = b.id;
            const checkedOption = document.querySelector(inputID);
            checkedOption.checked = true;
            selectNew(checkedOption);
        };
    });
});

btnHamburger.addEventListener('click', () => {
    btnHamburger.classList.toggle('open')
    fadeInOut(hasFade)
})

// buttons open the popup window
// buttons.forEach(button => {
//     button.addEventListener('click', () => {

//         hasFade2.forEach(e => {
//             if(!e.classList.contains('fade-in') && !e.classList.contains('fade-out')) {
//                     e.classList.add('fade-in')
//                 } else if(e.classList.contains('fade-in')) {
//                     e.classList.remove('fade-in')
//                     e.classList.add('fade-out')
//                 } else if(e.classList.contains('fade-out')) {
//                     e.classList.remove('fade-out')
//                     e.classList.add('fade-in')
//                 }
//         })
//     })
// })

// selectionLabels.forEach(label => {
//     label.addEventListener('click', () =>{
//         //remove active from all
//         selectionLabels.forEach(item => {
//             item.parentNode.classList.remove('active')
//         })
//         // select the label and put 'active' on the parent that controls the highlight styles for everything in the boxes
//         label.parentNode.classList.add('active')

//         /// animate .pledge sliding in and out
//         pledges.forEach(pledge => {
//             pledge.classList.remove('slide-out')
//             pledge.classList.add('slide-in')
//         })
//         const selectionParent = label.parentNode
//         const pledge = document.querySelector(".selection.active .pledge");
//         pledge.classList.remove('slide-in')
//         pledge.classList.add('slide-out')
//         setTimeout(() => selectionParent.scrollIntoView({ behavior: "smooth", block: "start" }), 500);
//     })
// })