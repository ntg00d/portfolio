// DOM
const page = document.querySelectorAll('.page')
const pageInfo = document.querySelectorAll('.page__info')
const pageMenuButtonMain = document.querySelector('.page-menu')
const pageMenuButton = document.querySelectorAll('.page-menu__btn')
const burgerMenu = document.querySelector('.burger-menu__btn')
const windowOne = document.querySelectorAll('.window-one')
const windowTwo = document.querySelectorAll('.window-two')


// Основные функции
function enable() {
    // Добавление класса
    burgerMenu.classList.add('active')
    pageMenuButtonMain.classList.add('active')

    // Кнопки .page
    page.forEach((element, index) => {
        // Добавление класса
        element.classList.add('active')

        // ELSE - обычная версия, IF - адаптив
        if (window.innerWidth < 1000) {
            element.style.transform = ''
        } else {
            // Начальные параметры
            element.style.transition = '.3s'
            windowOne[index].style.transition = '.4s'
            windowTwo[index].style.transition = '.5s'

            element.style.transform = 'perspective(1300px) rotateY(20deg) translateZ(310px) translateX(-150px) translateY(25px) scale(.44)'
            windowOne[index].style.transform = element.style.transform + 'translateX(-155px) scale(.9)'
            windowTwo[index].style.transform = element.style.transform + 'translateX(-305px) scale(.8)'

            // События
            element.addEventListener('mouseenter', () => {
                element.style.transition = '.2s'
                windowOne[index].style.transition = '.24s'
                windowTwo[index].style.transition = '.28s'
            })

            element.addEventListener('mousemove', event => {
                let xAxis = (window.innerWidth / 2 - event.clientX) / 12
                let yAxis = (window.innerHeight / 2 - event.clientY) / 12
                    
                element.style.transform = `perspective(1300px) rotateY(${xAxis + 20}deg) rotateX(${yAxis}deg) translateZ(310px) translateX(-150px) translateY(25px) scale(.44)`
                windowOne[index].style.transform = element.style.transform + 'translateX(-155px) scale(.9)'
                windowTwo[index].style.transform = element.style.transform + 'translateX(-305px) scale(.8)'

                // Чтобы при сдвиге вправо задние окна скрывались за главную страницу и сохраняли ощущение 3D-проекции, а не продолжали выпираться слева
                if (xAxis <= -8.8) {
                    windowOne[index].style.transform = element.style.transform + `translateX(${-155 + (-(xAxis * 13))}px) scale(.9)`
                    windowTwo[index].style.transform = element.style.transform + `translateX(${-305 + (-(xAxis * 16))}px) scale(.8)`
                }
                if (xAxis <= -12) {
                    windowOne[index].style.transform = element.style.transform + `translateX(${-155 + (-(xAxis * 8))}px) scale(.9)`
                    windowTwo[index].style.transform = element.style.transform + `translateX(${-305 + (-(xAxis * 10))}px) scale(.8)`
                }
            })

            element.addEventListener('mouseleave', () => {
                element.style.transition = '.5s'
                windowOne[index].style.transition = 'all .8s ease'
                windowTwo[index].style.transition = 'all 1s ease'

                element.style.transform = 'perspective(1300px) rotateY(20deg) translateZ(310px) translateX(-150px) translateY(25px) scale(.44)'
                windowOne[index].style.transform = element.style.transform + 'translateX(-155px) scale(.9)'
                windowTwo[index].style.transform = element.style.transform + 'translateX(-305px) scale(.8)'
            })

            // Кнопки .pageInfo
            pageInfo.forEach((element, index) => {
                // События
                element.addEventListener('mouseenter', () => {
                    element.style.transition = 'all .15s ease'
                })
                    
                element.addEventListener('mousemove', event => {
                    let xAxis = (window.innerWidth / 2 - event.clientX) / 25
                    let yAxis = (window.innerHeight / 2 - event.clientY) / 25
                    element.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateZ(550px) scale(1.3)`
                })
                    
                element.addEventListener('mouseleave', () => {
                    element.style.transition = 'all .3s ease'
                    element.style.transform = 'none'
                })
            })
        }
    })
}

function disable() {
    // Удаление класса
    burgerMenu.classList.remove('active')
    pageMenuButtonMain.classList.remove('active')

    // Кнопки .page
    page.forEach((element, index) => {
        // Удаление класса
        element.classList.remove('active')

        // Начальные параметры
        element.style.transition = '.3s'
        windowOne[index].style.transition = '.3s'
        windowTwo[index].style.transition = '.3s'

        element.style.transform = 'none'
        windowOne[index].style.transform = 'none'
        windowTwo[index].style.transform = 'none'

        // События
        element.addEventListener('mouseenter', () => {
            element.style.transition = '.3s'
            windowOne[index].style.transition = '.3s'
            windowTwo[index].style.transition = '.3s'
        })
        
        element.addEventListener('mousemove', () => {
            element.style.transform = 'none'
            windowOne[index].style.transform = 'none'
            windowTwo[index].style.transform = 'none'
        })

        element.addEventListener('mouseleave', () => {
            element.style.transition = 'none'
            windowOne[index].style.transition = 'none'
            windowTwo[index].style.transition = 'none'
            
            element.style.transform = 'none'
            windowOne[index].style.transform = 'none'
            windowTwo[index].style.transform = 'none'
        })
    })
    
    // Кнопки .pageInfo 
    pageInfo.forEach((element, index) => {
        // События
        element.addEventListener('mouseenter', () => {
            element.style.transition = 'none'
        })
                    
        element.addEventListener('mousemove', () => {
            element.style.transform = 'none'
        })
                    
        element.addEventListener('mouseleave', () => {
            element.style.transition = 'none'

            element.style.transform = 'none'
        })
    })
}

function scroll(i) {
    window.scrollTo({
        left: 0,
        top: page[i].offsetTop,
        behavior: 'smooth'
    })
}


// События кнопок
page.forEach((element, index) => {
    element.addEventListener('click', () => {
        scroll(index)
        disable()
    })
})

pageMenuButton.forEach((element, index) => {
    element.addEventListener('mouseenter', () => {
        scroll(index)
    })
    element.addEventListener('click', () => {
        disable()
    })
})

burgerMenu.addEventListener('click', () => {
    if (burgerMenu.classList.contains('active')) {
        disable()
    } else {
        enable()
    }
})
