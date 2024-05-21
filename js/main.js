document.addEventListener('DOMContentLoaded', () => {
	const nextBtn = document.getElementById('next');
	const lastBtn = document.getElementById('last');
	let index = 0;
	let bills = {
		plan: document.querySelector('.plans_cards div.active').children[1],
		services: document.querySelectorAll(
			'.addons__cards div.active .addon__info'
		),
	};
	nextBtn.addEventListener('click', () => {
		const activeStep = document.querySelector('p.active');
		const activeForm = document.querySelector('.show');

		if (+activeStep.textContent + 1 > 1) {
			lastBtn.style.visibility = 'visible';
			lastBtn.style.opacity = '1';
		}
		const nextStep = activeStep.parentNode.nextElementSibling?.children[0];
		if (nextStep) {
			index++;
			activeStep.classList.remove('active');
			nextStep.classList.add('active');	
		}

		if(index>=3){
			nextBtn.textContent = 'Confirm';
		}


		const nextForm = activeForm.nextElementSibling;
		if (nextForm) {
			activeForm.classList.replace('show', 'hide');
			nextForm.classList.replace('hide', 'show');
		}
		populateFinishingUp();
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
			index--;
			activeStep.classList.remove('active');
			lastStep.classList.add('active');
		}
		if(index < 3){
			nextBtn.textContent = 'Next Step';
		}
		
		const lastForm = activeForm.previousElementSibling;
		if (lastForm) {
			activeForm.classList.replace('show', 'hide');
			lastForm.classList.replace('hide', 'show');
		}
		populateFinishingUp();
	});

	// choose plan
	document.querySelector('.plans_cards').addEventListener('click', (e) => {
		let choosedPlan = document.querySelector('.plans_cards div.active');
		choosedPlan.classList.remove('active');
		if (e.target.tagName === 'DIV') {
			if (e.target.classList.contains('plan_card')) {
				e.target.classList.add('active');
				bills.plan = e.target.children[1];
			} else {
				e.target.parentNode.classList.add('active');
				bills.plan = e.target.parentNode.children[1];
			}
		} else {
			e.target.parentNode.parentNode.classList.add('active');
			bills.plan = e.target.parentNode.parentNode.children[1];
		}
	});

	// make checkbox choose
	document.querySelector('.addons__cards').addEventListener('click', (e) => {
		if (e.target.tagName === 'INPUT') {
			if (!e.target.checked) {
				e.target.parentNode.parentNode.classList.remove('active');
				bills.services = [
					...document.querySelectorAll(
						'.addons__cards div.active .addon__info'
					),
				];
			} else {
				e.target.parentNode.parentNode.classList.add('active');
				bills.services = [
					...document.querySelectorAll(
						'.addons__cards div.active .addon__info'
					),
				];
			}
		}
	});

	// populate finishing up
	function populateFinishingUp() {
		const bills_plan = document.getElementById('choosen__plan');
		const bills_plan_price = document.getElementById('bills_plan_price');
		bills_plan.textContent = bills.plan.children[0].textContent;
		bills_plan_price.textContent = bills.plan.children[1].textContent;

		const services_bills = document.querySelector('.bills__services');
		services_bills.innerHTML = ``;

		if (bills.services.length === 0) {
			services_bills.classList.replace('show', 'hide');
			document.querySelector('.bills').style.cssText = `gap: 0;`;
			document.querySelector(
				'.bills__plan'
			).style.cssText = `border-bottom: none;`;
		} else {
			document.querySelector('.bills').style.cssText = `gap: 20px 0;`;
			document.querySelector(
				'.bills__plan'
			).style.cssText = `border-bottom: 1px solid #ccc;`;
			services_bills.classList.replace('hide', 'show');
		}

		[...bills.services].forEach((bill) => {
			let service_row = document.createElement('div');
			service_row.className = 'service__row';
			let service_name = document.createElement('h3');
			let service_price = document.createElement('h3');
			console.log(bill.children);
			service_name.textContent =
				bill.children[0].firstElementChild.textContent;
			service_price.textContent = bill.children[1].textContent;
			service_row.append(service_name);
			service_row.append(service_price);
			services_bills.append(service_row);
		});
	}
	// change plan btn
	let change_btn = document.getElementById('change_plan');
	change_btn.addEventListener('click', (_) => {
		[...document.querySelector('.forms').children].forEach((child) => {
			if (child.classList.contains('show')) {
				child.classList.replace('show', 'hide');
			}
		});
		[...document.querySelectorAll('.step__number')].forEach((step) => {
			if (step.classList.contains('active')) {
				step.classList.remove('active');
			}
		});
		let step_2 = document.querySelector('.sp');
		step_2.classList.add('active');
		let plans = document.querySelector('.plans');
		plans.classList.replace('hide', 'show');
	});
});

// todo list
/*
  [ ] : Make toggle button
  [ ] : Make form validation after next step
  [ ] : complete the rest forms 
 */
