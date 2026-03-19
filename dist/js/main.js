(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			mode: 'fade',
			noOpenerFade: true,
			speed: 300
		});

	// Nav.

		// Toggle.
			$(
				'<div id="navToggle">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

})(jQuery);

document.addEventListener("DOMContentLoaded", () => {

	document.querySelectorAll('.faq-question').forEach(button => {
		button.addEventListener('click', () => {
		  const item = button.closest('.faq-item');
		  item.classList.toggle('active');
		});
	  });
	
		function initCarousel({
		  carouselId,
		  cardSelector,
		  prevBtnId,
		  nextBtnId,
		  dotsId
		}) {
		  const carousel = document.getElementById(carouselId);
		  const cards = Array.from(document.querySelectorAll(cardSelector));
		  const prevBtn = document.getElementById(prevBtnId);
		  const nextBtn = document.getElementById(nextBtnId);
		  const dotsContainer = document.getElementById(dotsId);
	  
		  if (!carousel || cards.length === 0) return;
	  
		  let currentIndex = 0;
		  let visibleCards = window.innerWidth < 768 ? 1 : 3;
		  let cardWidth = 0;
	  
		  /* ===== РАСЧЁТ ===== */
		  function updateSizes() {
			visibleCards = window.innerWidth < 768 ? 1 : 3;
			cardWidth = cards[0].offsetWidth + 20; // gap = 20px
		  }
	  
		  function getMaxIndex() {
			return Math.max(0, cards.length - visibleCards);
		  }
	  
		  /* ===== ПЕРЕХОД ===== */
		  function goTo(index, smooth = true) {
			const max = getMaxIndex();
	  
			if (index < 0) index = max;
			if (index > max) index = 0;
	  
			currentIndex = index;
	  
			carousel.scrollTo({
			  left: currentIndex * cardWidth,
			  behavior: smooth ? 'smooth' : 'auto'
			});
	  
			updateDots();
		  }
	  
		  /* ===== ТОЧКИ ===== */
		  function updateDots() {
			dotsContainer.innerHTML = '';
			const total = getMaxIndex() + 1;
	  
			for (let i = 0; i < total; i++) {
			  const dot = document.createElement('div');
			  dot.className = 'dot' + (i === currentIndex ? ' active' : '');
	  
			  dot.addEventListener('click', () => goTo(i));
			  dotsContainer.appendChild(dot);
			}
		  }
	  
		  /* ===== КНОПКИ ===== */
		  prevBtn?.addEventListener('click', () => goTo(currentIndex - 1));
		  nextBtn?.addEventListener('click', () => goTo(currentIndex + 1));
	  
		  /* ===== СВАЙП ===== */
		  let startX = 0;
	  
		  carousel.addEventListener('touchstart', e => {
			startX = e.touches[0].clientX;
		  }, { passive: true });
	  
		  carousel.addEventListener('touchend', e => {
			const delta = e.changedTouches[0].clientX - startX;
			if (Math.abs(delta) > 50) {
			  delta < 0 ? goTo(currentIndex + 1) : goTo(currentIndex - 1);
			}
		  });
	  
		  /* ===== СИНХРОНИЗАЦИЯ ===== */
		  carousel.addEventListener('scroll', () => {
			const index = Math.round(carousel.scrollLeft / cardWidth);
			if (index !== currentIndex) {
			  currentIndex = index;
			  updateDots();
			}
		  });
	  
		  /* ===== RESIZE ===== */
		  window.addEventListener('resize', () => {
			updateSizes();
			goTo(0, false);
		  });
	  
		  /* ===== INIT ===== */
		  updateSizes();
		  goTo(0, false);
		}
	  
		/* =========================
		   ИНИЦИАЛИЗАЦИЯ КАРУСЕЛЕЙ
		========================= */
	  
		initCarousel({
		  carouselId: 'carousel',
		  cardSelector: '.case-card',
		  prevBtnId: 'prevCase',
		  nextBtnId: 'nextCase',
		  dotsId: 'carouselDots'
		});
	  
		initCarousel({
		  carouselId: 'carouselImg',
		  cardSelector: '.case-card-img',
		  prevBtnId: 'prevCaseImg',
		  nextBtnId: 'nextCaseImg',
		  dotsId: 'carouselDotsImg'
		});	  
});