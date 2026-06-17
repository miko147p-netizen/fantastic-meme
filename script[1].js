const reviews = [
  {
    name: "Maya R.",
    rating: 5,
    text: "The berry velvet slice tasted premium but the price was still comfortable. Packaging was beautiful and simple."
  },
  {
    name: "Jon P.",
    rating: 5,
    text: "Ordered a small birthday cake. The sponge was soft, not too sweet, and the support team helped with the message."
  },
  {
    name: "Ari K.",
    rating: 4,
    text: "Clean shop feel, fresh pastries, and very clear pricing. The lemon cloud pastry is now my regular pick."
  }
];

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".primary-nav a");
const filterButtons = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll(".menu-card");
const reviewList = document.querySelector("#reviewList");
const reviewForm = document.querySelector("#reviewForm");
const revealItems = document.querySelectorAll(".reveal");

function renderReviews() {
  reviewList.innerHTML = reviews
    .map((review) => {
      const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
      return `
        <article class="review-card reveal visible">
          <div class="review-top">
            <strong>${escapeHTML(review.name)}</strong>
            <span class="stars" aria-label="${review.rating} out of 5 stars">${stars}</span>
          </div>
          <p>${escapeHTML(review.text)}</p>
        </article>
      `;
    })
    .join("");
}

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };
    return entities[character];
  });
}

navToggle.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    menuCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

reviewForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#reviewName").value.trim();
  const text = document.querySelector("#reviewText").value.trim();
  const rating = Number(document.querySelector("#reviewRating").value);

  if (!name || !text) return;

  reviews.unshift({ name, text, rating });
  renderReviews();
  reviewForm.reset();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => observer.observe(item));
renderReviews();
