// ✅ بيانات
const movies = [
    { title: "شمس الزناتي", description: "من أفضل عشر أفلام في مصر خلال 50 عامًا", image: "img5/pster/ucm_poster01.jpg", link: "show25/watch1.html" },
];

const series = [
    { episode: 1, title: "دانى الشبح ", description: " الموسم الاول ", image: "img5/dany/dany01.jpg", link: "show1/watch1.html" },

];

// ✅ توليد الكروت
function getRatingText(star) {
    return ["سئ جدا جدا", "سئ جدا", "سئ", "ممتاز", "ممتاز جدا"][star - 1] || "";
}

function renderCards(list, containerId, isSeries = false) {
    const container = document.querySelector(containerId);
    container.innerHTML = "";
    const fullList = [, ...list];
    fullList.forEach((item, index) => {
                const card = document.createElement("div");
                card.id = "card";
                card.innerHTML = `
      <div id="poster"><img src="${item.image}" alt="${item.title}"></div>
      <div id="data-list">
        <h1>${item.title}</h1>
        <p>${item.description}</p>
        <div id="div-star">
          ${[1,2,3,4,5].map(i => `
            <input type="radio" id="star${i}-${containerId}-${index}" name="rating-${containerId}-${index}"
              ${localStorage.getItem('rating-${containerId}-${index}') == i ? 'checked' : ''}>
            <label for="star${i}-${containerId}-${index}" onclick="
              localStorage.setItem('rating-${containerId}-${index}', ${i});
              document.getElementById('text-${containerId}-${index}').innerText = '${getRatingText(i)}';
            "></label>
          `).join('')}
          <p id="text-${containerId}-${index}">
            ${getRatingText(localStorage.getItem(`rating-${containerId}-${index}`) || 0)}
          </p>
          <a href="${item.link}" class="button-star" target="_blank">شاهد الآن</a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// ✅ بحث
function filterCards(query) {
  const q = query.trim().toLowerCase();
  const moviesContainer = document.querySelector("#cards-movies");
  const seriesContainer = document.querySelector("#cards-series");

  if (q === "") {
    renderCards(movies, "#cards-movies");
    renderCards(series, "#cards-series");
  } else {
    const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(q));
    const filteredSeries = series.filter(serie => serie.title.toLowerCase().includes(q));
    renderCards(filteredMovies, "#cards-movies");
    renderCards(filteredSeries, "#cards-series");
  }
}

// ✅ جاهزية الصفحة
document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".search-header__input");
  const button = document.querySelector(".search-header__button");
  button.addEventListener("click", () => filterCards(input.value));
  input.addEventListener("keydown", e => { if (e.key === "Enter") filterCards(input.value); });
  filterCards("");
});

// ✅ أزرار التمرير اليدوي
document.querySelector('.scroll-button.movies-left').onclick = () => {
  document.querySelector('#cards-movies').scrollBy({ left: -800, behavior: 'smooth' });
  pauseAutoScroll();
};
document.querySelector('.scroll-button.movies-right').onclick = () => {
  document.querySelector('#cards-movies').scrollBy({ left: 800, behavior: 'smooth' });
  pauseAutoScroll();
};
document.querySelector('.scroll-button.series-left').onclick = () => {
  document.querySelector('#cards-series').scrollBy({ left: -800, behavior: 'smooth' });
  pauseAutoScroll();
};
document.querySelector('.scroll-button.series-right').onclick = () => {
  document.querySelector('#cards-series').scrollBy({ left: 800, behavior: 'smooth' });
  pauseAutoScroll();
};

// ✅ تمرير تلقائي دائري سلس
let scrollAmount = 800;
let autoScrollInterval;
let pauseTimeout;

function autoScroll(containerId) {
  const container = document.querySelector(containerId);
  const maxScroll = container.scrollWidth / 2;
  container.scrollBy({ left: scrollAmount, behavior: 'smooth' });

  if (container.scrollLeft >= maxScroll) {
    container.scrollLeft = 0;
  }
}

function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    autoScroll('#cards-movies');
    autoScroll('#cards-series');
  }, 5000);
}

function pauseAutoScroll() {
  clearInterval(autoScrollInterval);
  clearTimeout(pauseTimeout);
  pauseTimeout = setTimeout(startAutoScroll, 20000);
}

// ✅ بدء التمرير وتوليد الكروت
renderCards(movies, "#cards-movies");
renderCards(series, "#cards-series");
startAutoScroll();