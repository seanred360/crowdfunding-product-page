const btnHamburger = document.querySelector('.btnHamburger')
const hasFade = document.querySelectorAll('.has-fade')


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