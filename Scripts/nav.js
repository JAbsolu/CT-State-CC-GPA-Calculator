const navMobile = document.querySelector(".mobile-show") // The nav menu to show
const navBarToggler = document.querySelector(".navbar-toggler"); // Nav button to toggle the menu on mobile

navBarToggler.addEventListener("click", function(){
    navMobile.classList.toggle("d-block") // Show or hide mobile menu on click
});