document.addEventListener('DOMContentLoaded', () => {
	// next and back buttons
	const nextBtn = document.getElementById('next');
	const lastBtn = document.getElementById('last');
	const user_name = document.getElementById('username');
	const email = document.getElementById('email');
	const phone = document.getElementById('phone');
	const navigate = document.querySelector('.navigate');

	let personal_info = {};
	// change plan button
	let change_btn = document.getElementById('change_plan');

	// plan prices elements and services prices
	const plan_prices = document.querySelectorAll('.plan_info_price');
	const service_prices = document.querySelectorAll('.price');

	// toggle buttons elements
	let toggler_span = document.querySelectorAll('.toggler span');
	let toggle_btn = document.querySelector('.toggle');

	let Plan_Prices = {
		Yearly: ['+$90/yr', '+$120/yr', '+$150/yr'],
		Monthly: ['+$9/mo', '+$12/mo', '+$15/mo'],
	};

	let Service_Prices = {
		Yearly: ['+$10/yr', '+$20/yr', '+$20/yr'],
		Monthly: ['+$1/mo', '+$2/mo', '+$2/mo'],
	};

	let toggle = 'Monthly';

	// index for tacking the current step
	let index = 0;

	// an object to save bills the choosed plan and choosed services
	let bills = {
		plan: document.querySelector('.plans_cards div.active').children[1],
		services: document.querySelectorAll(
			'.addons__cards div.active .addon__info'
		),
	};
	function vibration(element) {
		element.classList.add('vibrate');
		setTimeout((_) => {
			element.classList.remove('vibrate');
		}, 400);
	}
	function validateField(field, regex = null) {
		if (field.value === '') {
			vibration(field);
			field.classList.add('error');
			field.parentNode.children[0].classList.add('error');
			return false;
		} else if (regex && !regex.test(field.value)) {
			vibration(field);
			field.classList.add('error');
			field.parentNode.children[0].classList.add('error');
			return false;
		} else {
			field.classList.remove('error');
			field.parentNode.children[0].classList.remove('error');
			return true;
		}
	}
	
	// live validation
	user_name.addEventListener('input', (_) => {
		validateField(user_name);
	});
	email.addEventListener('input', (_) => {
		let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
		validateField(email, emailRegex);
	});
	phone.addEventListener('input', (_) => {
		let phoneRegex = /^\d{11}$/;
		validateField(phone, phoneRegex);
	});

	nextBtn.addEventListener('click', () => {
		const activeStep = document.querySelector('p.active');
		const activeForm = document.querySelector('.show');

		if (index === 0) {
			let isUserNameValid = validateField(user_name);
			if (!isUserNameValid) return;

			let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
			let isEmailValid = validateField(email, emailRegex);
			if (!isEmailValid) return;

			let phoneRegex = /^\d{11}$/;
			let isPhoneValid = validateField(phone, phoneRegex);
			if (!isPhoneValid) return;

			personal_info = {
				user: user_name.value,
				email: email.value,
				phone: phone.value,
			};
		}

		if (+activeStep.textContent + 1 > 1) {
			lastBtn.style.visibility = 'visible';
			lastBtn.style.opacity = '1';
		}
		const nextStep = activeStep.parentNode.nextElementSibling?.children[0];
		if (nextStep) {
			index++;
			activeStep.classList.remove('active');
			nextStep.classList.add('active');
		} else {
			// last step
			const success = document.querySelector('.success');
			success.classList.replace('hide', 'sp_show');
			activeForm.classList.replace('show', 'hide');
			navigate.classList.add('hide');
		}

		if (index >= 3) {
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
		if (index < 3) {
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
			service_name.textContent =
				bill.children[0].firstElementChild.textContent;
			service_price.textContent = bill.children[1].textContent;
			service_row.append(service_name);
			service_row.append(service_price);
			services_bills.append(service_row);
		});

		// total
		let total_type = document.getElementById('plan_type');
		total_type.textContent = toggle;
		let total = 0;
		let total_sum = document.getElementById('total');
		total += extractNumber(bills.plan.lastElementChild.textContent);
		[...bills.services].forEach((service) => {
			total += extractNumber(service.lastElementChild.textContent);
		});
		total_sum.textContent = `+${total}/${
			toggle === 'Monthly' ? 'mo' : 'yr'
		}`;
	}
	function extractNumber(str) {
		const match = str.match(/\d+/);
		return match ? Number(match[0]) : null;
	}
	// change plan btn

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
		nextBtn.textContent = 'Next Step';
		index = 1;
		let step_2 = document.querySelector('.sp');
		step_2.classList.add('active');
		let plans = document.querySelector('.plans');
		plans.classList.replace('hide', 'show');
	});

	toggle_btn.addEventListener('click', (_) => {
		toggle = toggle === 'Monthly' ? 'Yearly' : 'Monthly';
		[...toggler_span].forEach((span) => {
			if (span.classList.contains('active')) {
				span.classList.remove('active');
			} else {
				span.classList.add('active');
			}
		});

		toggle_btn.children[0].classList.toggle('yearly');

		if (toggle === 'Monthly') {
			[...plan_prices].forEach((plan_price, index) => {
				plan_price.textContent = Plan_Prices[toggle][index];
			});
			[...service_prices].forEach((service_price, index) => {
				service_price.textContent = Service_Prices[toggle][index];
			});
		} else {
			[...plan_prices].forEach((plan_price, index) => {
				plan_price.textContent = Plan_Prices[toggle][index];
			});
			[...service_prices].forEach((service_price, index) => {
				service_price.textContent = Service_Prices[toggle][index];
			});
		}
	});
});

/*
	TODO : Make input validation
	TODO : Make the last STEP
	TODO : Start the Desktop Design
*/
