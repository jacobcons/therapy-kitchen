import { tns } from '../node_modules/tiny-slider/src/tiny-slider.module'
import Fetch from './Fetch.js'

function spawnModal(html) {
	document.body.insertAdjacentHTML('beforeend', `
	<div class="modal">
		<div class="modal__inner">
			${html}
			<span class="modal__close">X</span>
		</div>
	</div>`)
	const elModal = document.querySelector('.modal')
	const elModalInner = document.querySelector('.modal__inner')
	const elModalClose = document.querySelector('.modal__close')
	elModal.addEventListener('click', (e) => {
		if (e.target !== elModalInner) elModal.remove()
	})
	elModalClose.addEventListener('click', () => elModal.remove())
}

document.addEventListener('DOMContentLoaded', async () => {
	const elHamburgerMenu = document.querySelector('.hamburger-menu')
	elHamburgerMenu.addEventListener('click', () => {
		elHamburgerMenu.classList.toggle('hamburger-menu--is-active');
	});
	
	if (window.location.pathname === '/services/kitchen-therapy.html' || window.location.pathname === '/services/cookery.html') {
		const slider = tns({
			container: '.js-slider-triples',
			items: 1,
			nav: false,
			autoplayButtonOutput: false,
			controlsText: [`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
					<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
			</svg>`, `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
					<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
			</svg>`],
			lazyload: true,
			gutter: 8,
			responsive: {
				592: {
					fixedWidth: 592,
				},
			},
		});
		
		const elsExpandTestimonial = document.querySelectorAll('.js-testimonial-more')
		elsExpandTestimonial.forEach(el => {
			el.addEventListener('click', (e) => {
				const fullQuote = e.target.getAttribute('data-full-quote')
				spawnModal(`<p>"${fullQuote}"</p>`)
			})
		})
	} else if (window.location.pathname === '/blog.html') {
		//Build objects containing filter as key and indexes of cards of said filter as value 
		const elsBlogCard = document.querySelectorAll('.js-blog-card');
		let dateIndexes = {}
		let tagIndexes = {}
		let allIndexes = []
		elsBlogCard.forEach((card, i) => {
			const date = card.getAttribute('data-date')
			if (typeof dateIndexes[date] === 'undefined') {
				dateIndexes[date] = [i]
			} else {
				dateIndexes[date].push(i)
			}
			
			const tags = card.getAttribute('data-tags').split(',')
			tags.forEach((tag) => {
				if (typeof tagIndexes[tag] === 'undefined') {
					tagIndexes[tag] = [i]
				} else {
					tagIndexes[tag].push(i)
				}
			})
			
			allIndexes.push(i)
		})
		
		//Show cards corresponding to a clicked filter
		const elsFilter = document.querySelectorAll('.js-filter')
		elsFilter.forEach((filter) => {
			filter.addEventListener('change', (e) => {
				//Get indexes of cards that should be shown
				const value = filter.value
				let indexesToShow;
				if (value ==  "") {
					// show all cards if blank is selected
					indexesToShow = allIndexes
				} else {
					indexesToShow = filter.name == "dates" ? dateIndexes[value] : tagIndexes[value]
				}
				
				//Build array of bools representing whether each card should be shown
				let cardsToShow = new Array(elsBlogCard.length).fill(false)
				indexesToShow.forEach((index) => {
					cardsToShow[index] = true
				})
				
				//Use array of bools to hide/show cards
				cardsToShow.forEach((show, i) => {
					const currentCard = elsBlogCard[i]
					if (show === true) {
						currentCard.classList.remove('hide')
					} else if (show === false) {
						currentCard.classList.add('hide')
					}
				})
				
				//Reset other filter
				let otherFilter = elsFilter[0] == e.target ? elsFilter[1] : elsFilter[0];
				console.log(e)
				console.log(elsFilter)
				console.log(otherFilter)
				otherFilter.value = ""
			})
		})
	} else if (window.location.pathname === '/contact.html') {
		const elsTextInput = document.querySelectorAll('.js-text-input')
		elsTextInput.forEach((input) => {
			input.addEventListener('focus', () => input.parentElement.classList.add('input-field--active'))
			input.addEventListener('blur', () => {
				if (!input.value) input.parentElement.classList.remove('input-field--active');
			})
		})
		
		const elSendBtn = document.querySelector('.js-send-btn')
		elSendBtn.addEventListener('click', async (e) => {
			e.preventDefault()
			const elForm = document.querySelector('.js-contact-form')
			const elsRequiredInput = document.querySelectorAll('.js-required-input')
			const elEmailInput = document.querySelector('input[name="email"]')
			const elsError = document.querySelectorAll('.js-input-error')
			
			elsError.forEach((error) => error.remove())
			
			let errors = {}
			if (!(/.+@.+/.test(elEmailInput.value))) {
				errors.email = {
					text: 'Please enter a valid email',
					input: elEmailInput,
				}
			}
			elsRequiredInput.forEach((input) => {
				if (!input.value) {
					errors[input.name] = {
						text: 'Please fill out the required field',
						input,
					}
				}
			})
			
			const errorNames = Object.keys(errors) 
			if (errorNames.length === 0) {
				const formData = new URLSearchParams(new FormData(elForm))
				try {
					var res = await Fetch.post(elForm.getAttribute('action'), formData);
				} catch(e) {
					console.error(e)
				}
				
				if (res.ok) {
					spawnModal(`<span>Thank you for your email :)</span>`)
					elForm.reset()
				} else {
					spawnModal(`<span>Oops! There seems to have been a problem sending your email on our end. Please try again :)</span>`)
				}
			} else {
				errorNames.forEach((name) => errors[name].input.insertAdjacentHTML('afterend', `<span class="input-field__error js-input-error">${errors[name].text}</span>`))
			}
		})
	}
})
