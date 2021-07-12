const btnHamburger = document.querySelector('.btnHamburger')
const hasFade = document.querySelectorAll('.has-fade')
const aboutHeaders = document.querySelectorAll('.about__header')
const pledges = document.querySelectorAll('.pledge')


btnHamburger.addEventListener('click', () => {
    btnHamburger.classList.toggle('open')

    hasFade.forEach(e => {
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
})

aboutHeaders.forEach(header => {
    header.addEventListener('click', () =>{
        //remove active from all
        aboutHeaders.forEach(item => {
            item.parentNode.classList.remove('active')
        })
        // select the label and put 'active' on the parent that controls the highlight styles for everything in the boxes
        header.parentNode.classList.add('active')
        pledges.forEach(pledge => {
            pledge.classList.remove('active')
        })
        header.parentNode.querySelector('.pledge').classList.add('active')
    })
})