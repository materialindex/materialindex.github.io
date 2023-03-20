window.addEventListener('scroll', throttle(shiftTagline, 20));

function throttle(fn, wait) {
    var time = Date.now();
    return function () {
        if ((time + wait - Date.now()) < 0) {
            fn();
            time = Date.now();
        }
    }
}

function shiftTagline() {
    document.getElementById('tagline-nav').style.opacity = window.scrollY >= window.innerHeight / 2 - 50 ? 1 : 0;
    /*if (window.scrollY >= window.innerHeight / 2 - 50) {
        target.classList.add('fixed')
        const scale = 1 - ((window.scrollY - (window.innerHeight / 2)) / (window.innerHeight / 2)) //from 1 to 0
        target.style.height = `calc(${Math.max(0.7,scale * 2.4)}rem + 1.7vw)`
    } else {
        target.classList.remove('fixed')
    }*/

}