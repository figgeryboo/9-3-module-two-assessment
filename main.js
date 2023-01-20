// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

const selectBox = document.querySelector('select');
const details = document.querySelector('#display-info');
const form = document.querySelector('form');
const review = document.querySelector('#review');
const ul = document.querySelector('ul');
const ol = document.querySelector('ol');
const showThePeople = document.querySelector('#show-people');
const resetReviewButton = document.querySelector('#reset-reviews');
const url = 'https://resource-ghibli-api.onrender.com';

function run() {
	// Add code you want to run on page load here

	fetch(`${url}/films`)
		.then((response) => {
			return response.json();
		})
		.then((movieData) => {
			movieData.forEach((movie) => {
				let option = document.createElement('option');
				option.value = movie.title;
				option.innerText = movie.title;
				selectBox.append(option);

				selectBox.addEventListener('change', (event) => {
					if (event.target.value === option.value) {
						details.innerHTML = '';
						const movieTitle = document.createElement('h3');
						const movieRelease = document.createElement('p');
						const movieDescription = document.createElement('p');
						movieTitle.innerText = movie.title;
						movieRelease.innerText = movie.release_date;
						movieDescription.innerText = movie.description;
						details.append(movieTitle, movieRelease, movieDescription);
					}
				});
			});

			form.addEventListener('submit', (event) => {
				event.preventDefault();
				const reviewed = event.target.review.value;
				const li = document.createElement('li');
				const movies = selectBox.value;
				if (movies === '') {
					alert('Please select a movie first');
				} else {
					li.innerHTML = `<strong><b>${movies}</b></strong>: ${reviewed}`;
					ul.append(li);
					event.target.reset();
				}
			});
		})

		.catch((error) => {
			console.error(error);
		});
}

const getPeople = () => {
	fetch(`${url}/people`)
		.then((response) => {
			return response.json();
		})
		.then((peopleInformation) => {
			for (i = 0; peopleInformation.length; i++) {
				const people = document.createElement('li');
				people.innerText = peopleInformation[i].name;
				ol.append(people);
			}
		})

		.catch((error) => {
			console.error(error);
		});
};

showThePeople.addEventListener('click', (event) => {
	event.preventDefault();
	getPeople();
});

resetReviewButton.addEventListener('click', () => {
	ul.innerHTML = `<ul></ul>`;
});

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
