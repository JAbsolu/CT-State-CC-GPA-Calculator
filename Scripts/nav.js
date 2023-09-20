// The nav menu to show
const navMobile = document.querySelector(".mobile-show") 
// Nav button to toggle the menu on mobile
const navBarToggler = document.querySelector(".navbar-toggler"); 

// Add event listener to the toggler
navBarToggler.addEventListener("click", function(){
    // Show or hide mobile menu on click
    navMobile.classList.toggle("d-block") 
});
