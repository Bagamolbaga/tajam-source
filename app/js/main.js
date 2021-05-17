let showHideMenu = () => {
    let menu = document.querySelector('.header-top-menu-modal')
    menu.classList.toggle('hide')
}

let showHideVideo = () => {
    let video = document.querySelector('.video-modal')
    video.classList.toggle('hide')
}



document.getElementById('menu').onclick = showHideMenu

document.getElementById('video').onclick = showHideVideo

document.getElementById('close-video').onclick = showHideVideo



let slideIndex = 3;
showSlides(slideIndex);

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("reviews__item");
    let dots = document.getElementsByClassName("reviews__person-avatar-item");
    
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  
}
