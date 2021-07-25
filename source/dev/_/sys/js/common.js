var html = document.querySelector('html'),
		body = document.querySelector('body'),
		wrap = document.querySelector('.wrap');

var mailPattern = /^[0-9a-z_-]+@[0-9a-z_-]+.[a-z]{2,5}$/i;



document.addEventListener('DOMContentLoaded', ()=>{
	let nav = document.querySelector('.header__nav-wrap'),
			navClassFixed = '--fixed',
			toggleNavBtns = document.querySelectorAll('.btn-toggle-nav'),
			toggleClass = '--toggle';

	if (toggleNavBtns) {
		toggleNavBtns.forEach((btn)=>{
			btn.addEventListener('click', ()=>{
				btn.classList.toggle(toggleClass);
				nav.classList.toggle(toggleClass);
				html.classList.toggle('overflow-disable');
				body.classList.toggle('overflow-disable');
				wrap.classList.toggle('overflow-disable');
			});
		});
	}


	function navToggleFixing(){
		if (window.pageYOffset >= nav.offsetTop) {
			nav.classList.add(navClassFixed);
		} else {
			nav.classList.remove(navClassFixed);
		}
	}

	document.addEventListener('load', navToggleFixing);
	document.addEventListener('scroll', navToggleFixing);
	document.addEventListener('resize', navToggleFixing);

	const anchors = document.querySelectorAll('a[href*="#"]')

	for (let anchor of anchors) {
	  anchor.addEventListener('click', function (e) {
	    e.preventDefault()
	    
	    const blockID = anchor.getAttribute('href').substr(1)
	    
	    document.getElementById(blockID).scrollIntoView({
	      behavior: 'smooth',
	      block: 'start'
	    })
	  })
	}

	let animations = document.querySelectorAll('.ani');

	// animations
	// animations = Array.from(animations);

	animations.forEach((el)=>{
		let delay = el.getAttribute('data-delay');
		
		if (delay) {
			el.style.transitionDelay = delay + 's';
		}
	});



	function addLoadedAnimation() {
		animations.forEach((el, i)=>{
			let elTop = el.getBoundingClientRect().top;
			// console.log(window.pageYOffset, elTop, el);
			if (elTop <= 800) {
				el.classList.add('--loaded');
				// animations.splice(i, 1);
			}
			// console.log(animations.length)
		});
	}
	
	addLoadedAnimation();
	window.addEventListener('scroll', addLoadedAnimation);
	window.addEventListener('resize', addLoadedAnimation);


	let forms = document.querySelectorAll('form');

	function addError(field) {
		field.classList.add('--error');
	}

	function removeError(field) {
		field.classList.remove('--error');
	}

	forms.forEach((form)=>{
		let reqiredFields = form.querySelectorAll('.--required');

		form.addEventListener('submit', (event)=>{
			event.preventDefault();

			let errors = 0;

			reqiredFields.forEach((field)=>{
				let input = field.querySelector('input');

				if (field.classList.contains('input')) {

					if (input.value.length < 3) {
						errors++;
						addError(field);
					} 

					if (field.classList.contains('--phone') && input.value.length < 18) {
						errors++;
						addError(field);
					} 
				}

				if (field.classList.contains('checkbox') && input.getAttribute('checked') != 'checked') {
					errors++;
					addError(field);
				}

			});


			console.log(errors);
			if (errors == 0) {
				event.preventDefault();
				let formData = new FormData(form);
				let xhr = new XMLHttpRequest();
				xhr.open('POST', 'send.php?');
				xhr.send(formData);
				xhr.onload = () => {
					if (xhr.status == 200) {
						form.querySelectorAll('input').forEach((input)=>{
							input.value = '';
						});

						let modal  = document.querySelector('.popup .modal'),
								thanks = document.querySelector('.thanks');

						thanks.classList.remove('--hidden');
						if (modal) {
		          modal.classList.remove('--show');
		          modal.classList.add('--hidden');

		        } else {
		        	document.querySelector('.popup').classList.add('--show');
		        	document.querySelector('.popup__wrap').classList.add('--show');
		        }

		        thanks.classList.add('--show');
	          document.querySelector('.popup__wrap').prepend(thanks);

	         
					}
				};
			}
		});


	});
});
