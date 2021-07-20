const containerMenu = document.querySelector('.container__menu') // the mobile drop down menu
const btnHamburger = document.querySelector('.btnHamburger') // opens the mobile headerLinks menu .container_menu
const headerLinks = document.querySelector('.header__links') // desktop navigation links at the top
const gradiantOverlay = document.querySelector('.gradiant-overlay') // a gradiant background behind the mobile menu
const bookmark = document.querySelector('.product__bookmark') // an anchor tag that hold the bookmark elements
const bookmarkLabel = document.querySelector('.bookmark-label') // the text on the bookmark button
const selectionLabels = document.querySelectorAll('.selection__label') // the label in .selection for .radio-input. Click to select a pledge reward
const pledges = document.querySelectorAll('.pledge') // in .modal__window. Contains a text input and a button for making a pledge
const modalWindow = document.querySelector('.modal__window') // a popup window with pledge options
const defaultPledges = { option1: 0, option2: 25, option3: 75, option4: 200 }; // a list that is compared to the pledge entered by the user. It makes sure the minimum pledge amount is submitted
const selectButtons = document.querySelectorAll('.select-button') // selectButtons that open the .modal__window to make a pledge
const continueButtons = document.querySelectorAll('.continue-button') // submits the pledge you entered
const darkOverlay = document.querySelector('.dark__overlay') // a transparent gray background
const closeModal = document.querySelector('.close-modal') // X button to close .modal__window
const thankYou = document.querySelector('.thank__you') // confirmation popup window. Triggers after a pledge is submitted.
const gotItBtn = document.querySelector('.got-it') // a confirmation button that appears after submitting a pledge
const statsSection = document.querySelector('.stats') // the section that displays the total money raised, numebr of backers, and number of days remaining
const statMoney = document.querySelector('.stats__money') // displays the current amount of money raised
const statBackers = document.querySelector('.stats__backers') // displays the current number of backers
const statProgressBar = document.querySelector('.fill') // displays amount of money raised so far as a prgoress bar
let pledgeAmount = 0 // the value that gets put on .stats__money


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

// triggers a fade animation on a target element by adding a CSS class in _animations.scss
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

// located in section.modal__window
const toggleModalWindow = (close) => {
    modalWindow.scrollTop = 0;
    document.body.classList.toggle('no-scroll')
    modalWindow.classList.toggle("active");
    if(close) {
        fadeInOut(darkOverlay)
        fadeInOut(headerLinks)
    }
    fadeInOut(modalWindow)
};


//////////////////////////////////////////////////////////////////////////////////
////////////////////////////// RADIO INPUT ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


// clear the .radio-input located in .modal__window .selection
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

// select a new .radio-input located in .modal__window .selection
const selectNew = select => {
    if(select.classList.contains('selection')) { // if a .select-reward button called this function
        select.checked = true; // check the .radio-input
        select.classList.add("active"); // change the font color and border colors
        setTimeout(() => select.scrollIntoView({ behavior: "smooth"}), 550); // scroll .modal__window
        slidePledges(); // show the .pledge
    } else { // if a .selection__label button called this function
        const parentSelection = select.parentElement; // .modal__window
        parentSelection.classList.add("active"); // change the font color and border colors
        setTimeout(() => parentSelection.scrollIntoView({ behavior: "smooth"}), 550); // scroll .modal__window
        slidePledges(); // show the .pledge
    }
};


//////////////////////////////////////////////////////////////////////////////////
////////////////////////////// DATA //////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


// Update how many reward tiers are left
const updateStock = () => {
    // there are multiple things displaying the remaining stock, select the one from the .selection
    const stockClass = document.querySelector('.selection.active .stock__container .stock').classList[1]
    // also select the .stock located in .about__footer
    stocksToUpdate = document.querySelectorAll(`.${stockClass}`)
    // grab the current stock value and take away 1
    let newStockValue = parseInt(stocksToUpdate[0].innerHTML)
    newStockValue--
    // update the stock value in all locations
    stocksToUpdate.forEach(stock => {
        stock.innerHTML = newStockValue.toString()
    })
};

// update the numbers displayed in section.stats after a pledge is made
const updateStats = () => {
    // when set to 'en-US', returns a number separated by commas, can be changed to any country's number format
    const internationalNumberFormat = new Intl.NumberFormat('en-US')
    const removeCommas = /[\D]/g
    // grab the text from .stats__money, remove the commas and make it an INT
    let newTotal = parseInt(statMoney.innerHTML.replace(removeCommas, '')) + pledgeAmount
    // grab the text from .stats__backers, remove the commas and make it an INT
    let newBackers = parseInt(statBackers.innerHTML.replace(removeCommas, '')) + 1

    // visually update the values displayed in section.stats after a pledge is made
    setTimeout(() => {
        statsSection.scrollIntoView({ behavior: "smooth" })
        statProgressBar.style.transition = "width 0s ease-out"
        statProgressBar.style.maxWidth = 0;
        statProgressBar.style.width = 0;

        setTimeout(() => {
            statMoney.innerHTML = internationalNumberFormat.format(newTotal)
            statBackers.innerHTML = internationalNumberFormat.format(newBackers)
            statProgressBar.style.maxWidth = "100%"
            let newWidth = newTotal * 100 / 100000;
            if (newWidth < 100) {
                statProgressBar.style.transition = `width ${newWidth * 0.01 * 2}s ease-out`
                statProgressBar.style.width = newWidth + "%"
            } else {
                statProgressBar.style.transition = "width 2s ease-out"
                statProgressBar.style.width = "100%"
            }
        }, 500)
    }, 500)
}


//////////////////////////////////////////////////////////////////////////////////
////////////////////////////// CLICKABLE ELEMENTS ////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


// mobile hamburger button
btnHamburger.addEventListener('click', () => {
    btnHamburger.classList.toggle('open')
    fadeInOut(gradiantOverlay)
    fadeInOut(containerMenu)
})

// Toggle bookmark button styling 
bookmark.addEventListener("click", () => {
    bookmark.classList.toggle("active");
    if (bookmark.classList.contains("active")) {
        bookmarkLabel.innerHTML = "Bookmarked";
    } else {
        bookmarkLabel.innerHTML = "Bookmark";
    };
});

// open the .modal__window and scroll to the selected reward tier
selectButtons.forEach(b => {
    b.addEventListener("click", () => {
        clearSelect()
        toggleModalWindow(true);
        if (!b.classList.contains("back-this-project")) { // if it's a 'select reward' button
            const inputID = b.id;
            const checkedOption = document.querySelector(inputID);
            checkedOption.checked = true;
            selectNew(checkedOption);
        } else {
            modalWindow.scrollTop = 0; // it is the 'back this project' button, default to the top
        }
    });
});

// close .modal__window and fade in the .nav at the top
closeModal.addEventListener('click', () => {
    toggleModalWindow(true)
})

// if the user clicks outside .modal__window while it is open, close .modal__window
darkOverlay.addEventListener('click', () => {
    clearSelect()
    toggleModalWindow(true)
})

// select a reward tier on .modal__window
selectionLabels.forEach(label => {
    label.addEventListener("click", () => {
        clearSelect();
        selectNew(label);
    });
});

// submit your pledge on the .modal__window
continueButtons.forEach(b => {
    b.addEventListener("click", () => {
        const input = document.querySelector('.selection.active .pledge .amount__group .input__container .pledge-input')
        const pledge = input.value
        const numbersOnly = /^\d+$/gi // only allow 0-9 characters to be input
        if(!pledge || pledge < defaultPledges[input.id] || !pledge.toString().match(numbersOnly)) {
            input.parentElement.parentElement.classList.add('error') // add error to .amount__group
        } else {
            fadeInOut(thankYou)
            toggleModalWindow(false)
            pledgeAmount = parseInt(pledge)
        }
    });
});

// .got-it on .thank__you , appears after submitting your pledge
gotItBtn.addEventListener('click', () => {
    fadeInOut(thankYou)
    fadeInOut(darkOverlay)
    fadeInOut(headerLinks)
    updateStock()
    updateStats()
})