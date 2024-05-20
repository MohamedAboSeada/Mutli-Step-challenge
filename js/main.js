document.addEventListener('DOMContentLoaded', () => {
	const nextBtn = document.getElementById('next');
	const lastBtn = document.getElementById('last');

	nextBtn.addEventListener('click', () => {
		const activeStep = document.querySelector('p.active');
		const activeForm = document.querySelector('.show');

		if (+activeStep.textContent + 1 > 1) {
			lastBtn.style.visibility = 'visible';
			lastBtn.style.opacity = '1';
		}

		const nextStep = activeStep.parentNode.nextElementSibling?.children[0];
		if (nextStep) {
			activeStep.classList.remove('active');
			nextStep.classList.add('active');
		}

		const nextForm = activeForm.nextElementSibling;
		if (nextForm) {
			activeForm.classList.replace('show', 'hide');
			nextForm.classList.replace('hide', 'show');
		}
	});

	lastBtn.addEventListener('click', () => {
		const activeStep = document.querySelector('p.active');
		const activeForm = document.querySelector('.show');

		if (+activeStep.textContent - 1 <= 1) {
			lastBtn.style.visibility = 'hidden';
			lastBtn.style.opacity = '0';
		}

		const lastStep =
			activeStep.parentNode.previousElementSibling?.children[0];
		if (lastStep) {
			activeStep.classList.remove('active');
			lastStep.classList.add('active');
		}

		const lastForm = activeForm.previousElementSibling;
		if (lastForm) {
			activeForm.classList.replace('show', 'hide');
			lastForm.classList.replace('hide', 'show');
		}
	});

	// choose plan
	document.querySelector('.plans_cards').addEventListener('click', (e) => {
		let choosedPlan = document.querySelector('.plans_cards div.active');
        choosedPlan.classList.remove('active');
		if (e.target.tagName === 'DIV') {
			if (e.target.classList.contains('plan_card')) {
				e.target.classList.add('active');
			} else {
				e.target.parentNode.classList.add('active');
			}
		} else {
			e.target.parentNode.parentNode.classList.add('active');
		}
	});
});

// todo list
/*
  [ ] : Make toggle button
  [ ] : Make form validation after next step
  [ ] : complete the rest forms 
 */
