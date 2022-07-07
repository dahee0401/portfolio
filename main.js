'use strict'

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar')
const navbarHeight = navbar.getBoundingClientRect().height
document.addEventListener('scroll', () => {
	if (window.scrollY > navbarHeight) {
		navbar.classList.add('navbar--dark')
	} else {
		navbar.classList.remove('navbar--dark')
	}
})

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu')
navbarMenu.addEventListener('click', (event) => {
	const target = event.target
	const link = target.dataset.link
	if (link == null) {
		return
	}

	console.log(event.target.dataset.link)
	const scrollTo = document.querySelector(link)
	scrollTo.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
})

// Navbar toggle button for small screen

// Handle click on "contact me" button on home

// Show "arrow up" button when scrolling down

// Handle click on the "arrow up" button

// Projects

// Remove selection from the previous item and select the new one
