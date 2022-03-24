const circle = document.querySelector('.progress-ring__circle')
const radius = circle.r.baseVal.value
const circumference = 2 * Math.PI * radius
const inputValue = document.querySelector('.input-value-for-js')
const inputAnimate = document.querySelector('.input-animate-for-js')
const inputHide = document.querySelector('.input-hide-for-js')
const progressRing = document.querySelector('.progress-ring').classList

circle.style.strokeDasharray = `${circumference} ${circumference}`
circle.style.strokeDashoffset = circumference

function setProgress(percent) {
    const offset = circumference - percent / 100 * circumference
    circle.style.strokeDashoffset = offset
}

setProgress(inputValue.value)

inputValue.addEventListener('change', function(event) {
    setProgress(inputValue.value)
})

inputAnimate.addEventListener('click', function() {
    if (progressRing.contains("animation")) {
        progressRing.remove("animation");
    } else {
        progressRing.add("animation");
    }
})

inputHide.addEventListener('click', function() {
    if (progressRing.contains("hide")) {
        progressRing.remove("hide");
    } else {
        progressRing.add("hide");
    }    
})