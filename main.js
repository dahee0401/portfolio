'use strict'
// typing effect
let cursorTarget = document.querySelector('#dynamic')

function randomString() {
	let stringArr = ['Welcome to my Portfolio:)']
	let selectString = stringArr[Math.floor(Math.random() * stringArr.length)]
	let selectStringArr = selectString.split('')

	return selectStringArr
}

// 타이핑 리셋
function resetTyping() {
	cursorTarget.textContent = ''
	dynamic(randomString())
}

// 한글자씩 텍스트 출력 함수
function dynamic(randomArr) {
	if (randomArr.length > 0) {
		cursorTarget.textContent += randomArr.shift()
		setTimeout(function () {
			dynamic(randomArr)
		}, 80)
	} else {
		setTimeout(resetTyping, 3000)
	}
}
dynamic(randomString())

// 커서깜빡임
function blink() {
	cursorTarget.classList.toggle('active')
}
setInterval(blink, 500)

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

// Navbar toggle button for small screen
const navbarToglleBtn = document.querySelector('.navbar__toggle-btn')
const Bars = document.querySelectorAll('.bar')
navbarToglleBtn.addEventListener('click', (event) => {
	event.preventDefault()
	navbarMenu.classList.toggle('open')
	Bars.forEach((bar) => {
		bar.classList.toggle('togOn')
	})
})

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu')
navbarMenu.addEventListener('click', (event) => {
	const target = event.target
	const link = target.dataset.link
	if (link == null) {
		return
	}
	scrollIntoView(link)
	Bars.forEach((bar) => {
		bar.classList.remove('togOn')
	})
	navbarMenu.classList.remove('open')
})

// Handle click on "contact me" button on home
const homeContactBTN = document.querySelector('.home__contact')
homeContactBTN.addEventListener('click', () => {
	scrollIntoView('#contact')
})

// Make home slowly fade to transparent as the window scrollls down
const home = document.querySelector('.home__container')
const homeHeight = home.getBoundingClientRect().height
document.addEventListener('scroll', () => {
	home.style.opacity = 1 - window.scrollY / homeHeight
})

// Show "arrow up" button when scrolling down
const arrowUp = document.querySelector('.arrow-up')
document.addEventListener('scroll', () => {
	if (window.scrollY > homeHeight / 2) {
		arrowUp.classList.add('visible')
	} else {
		arrowUp.classList.remove('visible')
	}
})

// Handle click on the "arrow up" button, logo
arrowUp.addEventListener('click', () => {
	scrollIntoView('#home')
})
const logo = document.querySelector('.logo')
logo.addEventListener('click', () => {
	scrollIntoView('#home')
})
// Projects
const workBtnContainer = document.querySelector('.work__categories')
const projectContainer = document.querySelector('.work__projects')
const projects = document.querySelectorAll('.project')
workBtnContainer.addEventListener('click', (e) => {
	const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter
	if (filter == null) {
		return
	}
	// Remove selection from the previous item and select the new one
	const active = document.querySelector('.category__btn.selected')
	if (active != null) {
		active.classList.remove('selected')
	}
	e.target.classList.add('selected')

	projectContainer.classList.add('anim-out')
	setTimeout(() => {
		projects.forEach((project) => {
			// console.log(project.dataset.type)
			if (filter === '*' || filter === project.dataset.type) {
				project.classList.remove('invisible')
			} else {
				project.classList.add('invisible')
			}
		})
		projectContainer.classList.remove('anim-out')
	}, 300)
})

// 1. 모든 섹션 요소들과 메뉴아이템들을 가지고 온다
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다
const sectionIds = ['#home', '#about', '#skills', '#work', '#design', '#multi', '#contact']
const sections = sectionIds.map((id) => document.querySelector(id))
const navItems = sectionIds.map((id) => document.querySelector(`[data-link="${id}"]`))

let selectedNavIndex = 0
let selectedNavItem = navItems[0]
function selectNavItem(selected) {
	selectedNavItem.classList.remove('active')
	selectedNavItem = selected
	selectedNavItem.classList.add('active')
}
function scrollIntoView(selector) {
	const scrollTo = document.querySelector(selector)
	scrollTo.scrollIntoView({ behavior: 'smooth' })
	selectNavItem(navItems[sectionIds.indexOf(selector)])
}
const observerOptions = {
	root: null,
	rootMargin: '0px',
	threshold: 0.3,
}

const observerCallback = (entries, observer) => {
	entries.forEach((entry) => {
		if (!entry.isIntersecting && entry.intersectionRatio > 0) {
			// console.log('y')
			const index = sectionIds.indexOf(`#${entry.target.id}`)
			// 스크롤링이 아래로 되어서 페이지가 올라옴
			if (entry.boundingClientRect.y < 0) {
				selectedNavIndex = index + 1
			} else {
				selectedNavIndex = index - 1
			}
		}
	})
}
// 스킬바
const skillBar = document.querySelectorAll('.skill__value')
window.addEventListener('scroll', () => {
	// console.log(window.scrollY)
	const scrollItems = sectionIds.map((id) => document.querySelector(`[data-link="${id}"]`))
	if (window.scrollY >= 1900) {
		skillBar.forEach((bar) => {
			bar.classList.add('skillOn')
		})
	} else {
		skillBar.forEach((bar) => {
			bar.classList.remove('skillOn')
		})
	}
})
const observer = new IntersectionObserver(observerCallback, observerOptions)
sections.forEach((section) => observer.observe(section))

window.addEventListener('wheel', () => {
	if (window.scrollY === 0) {
		selectedNavIndex = 0
	} else if (window.scrollY + window.innerHeight === document.body.clientHeight) {
		selectedNavIndex = navItems.length - 1
	}
	selectNavItem(navItems[selectedNavIndex])
})

// desin
const overlay = document.querySelector('#overlay')
const bigPhoto = document.querySelectorAll('.gallery__big_photo')
const thumbnails = document.querySelectorAll('.gallery__thumbnail')
const body = document.querySelector('body')
const thumb1 = document.querySelector('.thumb1')
const thumb2 = document.querySelector('.thumb2')
const thumb3 = document.querySelector('.thumb3')
const thumb4 = document.querySelector('.thumb4')
const thumb5 = document.querySelector('.thumb5')

thumb1.addEventListener('click', (e) => {
	e.preventDefault()
	body.classList.add('scroll_hidden')
	overlay.style.display = 'block'
	// 썸네일 원본 사진 링크와 갤러리 슬라이드 이미지 소스 링크 연결
	for (let i = 0; i < thumbnails.length; i++) {
		let photo = thumbnails[0].lastElementChild
		bigPhoto[i].src = photo.href
		document.querySelector('button.close').addEventListener('click', () => {
			overlay.style.display = 'none'
			body.classList.remove('scroll_hidden')
		})
	}
})
thumb2.addEventListener('click', (e) => {
	e.preventDefault()
	body.classList.add('scroll_hidden')
	overlay.style.display = 'block'
	// 썸네일 원본 사진 링크와 갤러리 슬라이드 이미지 소스 링크 연결
	for (let i = 0; i < thumbnails.length; i++) {
		let photo = thumbnails[1].lastElementChild
		bigPhoto[i].src = photo.href
		document.querySelector('button.close').addEventListener('click', () => {
			overlay.style.display = 'none'
			body.classList.remove('scroll_hidden')
		})
	}
})
thumb3.addEventListener('click', (e) => {
	e.preventDefault()
	body.classList.add('scroll_hidden')
	overlay.style.display = 'block'
	// 썸네일 원본 사진 링크와 갤러리 슬라이드 이미지 소스 링크 연결
	for (let i = 0; i < thumbnails.length; i++) {
		let photo = thumbnails[2].lastElementChild
		bigPhoto[i].src = photo.href
		document.querySelector('button.close').addEventListener('click', () => {
			overlay.style.display = 'none'
			body.classList.remove('scroll_hidden')
		})
	}
})
thumb4.addEventListener('click', (e) => {
	e.preventDefault()
	body.classList.add('scroll_hidden')
	overlay.style.display = 'block'
	// 썸네일 원본 사진 링크와 갤러리 슬라이드 이미지 소스 링크 연결
	for (let i = 0; i < thumbnails.length; i++) {
		let photo = thumbnails[3].lastElementChild
		bigPhoto[i].src = photo.href
		document.querySelector('button.close').addEventListener('click', () => {
			overlay.style.display = 'none'
			body.classList.remove('scroll_hidden')
		})
	}
})
thumb5.addEventListener('click', (e) => {
	e.preventDefault()
	body.classList.add('scroll_hidden')
	overlay.style.display = 'block'
	// 썸네일 원본 사진 링크와 갤러리 슬라이드 이미지 소스 링크 연결
	for (let i = 0; i < thumbnails.length; i++) {
		let photo = thumbnails[4].lastElementChild
		bigPhoto[i].src = photo.href
		document.querySelector('button.close').addEventListener('click', () => {
			overlay.style.display = 'none'
			body.classList.remove('scroll_hidden')
		})
	}
})
// 갤러리 바닐라 틸트
VanillaTilt.init(document.querySelectorAll('.gallery__thumbnail')),
	{
		max: 25,
		speed: 400,
		glare: true,
		'max-glare': 1,
	}
