const searchInput = document.querySelector('.search__input')
const searchItems = document.querySelectorAll('.search__list li')

searchInput.oninput = () => {
    let val = searchInput.value.trim().toLowerCase()
    if (val !== '') {
        searchItems.forEach(el => {
            if (el.innerText.toLowerCase().search(val) === -1) {
                el.classList.add('search-hide')
            } else {
                el.classList.remove('search-hide')
            }
        })
    } else {
        searchItems.forEach(el => {
            el.classList.remove('search-hide')
        })
    }
}