try {
	fetch("https://fakestoreapi.com/products")
		.then(response => response.json())
		.then(data => {
			const input = document.getElementById("search-input");
			let filteredArray = Array.from(data).slice(0, 4);

			renderCards(filteredArray);

			input.addEventListener("input", e => {	
				filteredArray = filteredArray.filter(element =>
					element.title
						.toLowerCase()
						.includes(e.target.value.toLowerCase())
				);

				if (e.target.value === "") {
					filteredArray = Array.from(data).slice(0, 4);
				}

				renderCards(filteredArray);
			});
		})
		.catch(err => console.log(err));
} catch (err) {
	console.log(err);
}

const cardsDiv = document.querySelectorAll(".cards");

const renderCards = array => {
	cardsDiv.forEach(div => (div.innerHTML = ""));

	array.forEach(element => {
		const card = generateProductCard(element);
		const card2 = generateProductCard(element);

		cardsDiv[0].appendChild(card);
		cardsDiv[1].appendChild(card2);
	});
};

const generateProductCard = data => {
	const card = document.createElement("div");
	card.classList.add("card");

	const cardImg = document.createElement("div");
	cardImg.classList.add("card-img");
	const img = document.createElement("img");
	img.src = data.image;
	cardImg.appendChild(img);
	card.appendChild(cardImg);

	const title = document.createElement("h4");
	title.innerText = data.title;
	card.appendChild(title);

	const ratings = document.createElement("div");
	ratings.classList.add("ratings");
	const stars = document.createElement("div");
	stars.classList.add("stars");

	for (let i = 0; i < 5; i++) {
		const star = document.createElement("i");
		star.classList.add("fa-solid", "fa-star");

		if (i < parseInt(data.rating.rate)) star.classList.add("rating-color");

		stars.appendChild(star);
	}
	ratings.appendChild(stars);

	const reviewCount = document.createElement("h4");
	reviewCount.classList.add("review-count");
	reviewCount.innerText = `${parseInt(data.rating.rate)}/5`;
	ratings.appendChild(reviewCount);
	card.appendChild(ratings);

	const price = document.createElement("h3");
	price.innerText = `$${data.price}`;
	card.appendChild(price);

	return card;
};
