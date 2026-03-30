const elements = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.2
});

elements.forEach(el => observer.observe(el));


const targetDate = new Date("2026-08-07T00:00:00").getTime();

function updateCountdown() {
	const now = new Date().getTime();
	const diff = targetDate - now;

	if (diff <= 0) return;

	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
	const minutes = Math.floor((diff / (1000 * 60)) % 60);
	const seconds = Math.floor((diff / 1000) % 60);

	updateValue("days", days);
	updateValue("hours", hours);
	updateValue("minutes", minutes);
	updateValue("seconds", seconds);
}

function updateValue(id, value) {
	const el = document.getElementById(id);

	if (el.textContent != value) {
		el.classList.add("update");

		setTimeout(() => {
			el.textContent = String(value).padStart(2, "0");
			el.classList.remove("update");
		}, 150);
	}
}

// запуск
updateCountdown();
setInterval(updateCountdown, 1000);
