// DOM Elements
const time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focus = document.getElementById('focus');

const mainNav = document.getElementById('js-menu');
const navBarToggle = document.getElementById('js-navbar-toggle');

// Options
const showAmPm = true;

// Show time
function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        minute = today.getMinutes(),
        seconds = today.getSeconds();

    // Set AM or PM
    const amPM = hour <= 12 ? 'AM' : 'PM';

    // Convert 12 formate
    hour = hour % 12 || 12;

    // Output time
    time.innerHTML = `${addZeros(hour)}<span>:</span>${addZeros(minute)}<span>:</span>${addZeros(seconds)} ${showAmPm ? amPM : ''}`;

    setTimeout(showTime, 1000);
}

// Add zeros
function addZeros(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
    let today = new Date(),
        hour = today.getHours();

    if (hour < 12) {
        // Morning
        document.getElementById('welcome').style.backgroundImage = "url('./img/morning.jpg')";
        document.getElementById('js-nav-bar').style.backgroundImage = "linear-gradient(260deg, #30E8BF 0%, #FF8235 100%)";
        greeting.textContent = 'GOOD MORNING, ';

    } else if (hour < 18) {
        // Afternoon
        document.getElementById('welcome').style.backgroundImage = "url('./img/afternoon.jpg')";
        document.getElementById('js-nav-bar').style.backgroundImage = "linear-gradient(260deg, #C33764 0%, #1D2671 100%)";
        greeting.textContent = 'GOOD AFTERNOON, ';

    } else {
        // Night
        document.getElementById('welcome').style.backgroundImage = "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('./img/night.jpg')";
        document.getElementById('js-nav-bar').style.backgroundImage = "linear-gradient(260deg, #41295a 0%, #2F0743 100%)";
        document.getElementById('js-nav-bar').style.backgroundColor = '#11111';
        greeting.textContent = 'GOOD NIGHT, ';
        document.getElementById('welcome').style.color = 'white';
    }
}

// Get Name
function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

// Set Name
function setName(e) {
    console.log(e.target.innerText);
    if (e.type == 'keypress') {
        // Make sure enter is pressed
        if (e.keyCode == 13 || e.which == 13) {
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    } else {
        localStorage.setItem('name', e.target.innerText);
    }
}

// Get Focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.innerText = '[Todays Your Focus ?]';
    } else {
        focus.innerText = localStorage.getItem('focus');
    }
}

// Set Focus
function setFocus(e) {
    if (e.type == 'keypress') {
        // Make sure enter is pressed
        if (e.keyCode == 13 || e.which == 13) {
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
    } else {
        localStorage.setItem('focus', e.target.innerText);
    }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Toggle Navbar on click event
navBarToggle.addEventListener('click', function () {
    mainNav.classList.toggle('active');
})

/**
 * function calls..................................
 */
showTime();
setBgGreet();
getName();
getFocus();

/**
 * Navigations of navbar
 */
$(document).ready(function () {
    $(function () {
        $('a[href*=#]:not([href=#])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html', 'body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });
});

/**
 * Stick the Navigation bar on Scroll
 */
$(window).on('scroll', function () {
    if ($(window).scrollTop()) {
        $('nav').addClass('sticky');
    }
    else {
        $('nav').removeClass('sticky');
    }
})