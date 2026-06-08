/* Filière Robinia Acacia — interactions */
(function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('is-open');
    });
    nav.querySelectorAll('.nav__link').forEach(function (l) {
      l.addEventListener('click', function () { nav.classList.remove('is-open'); });
    });
  }

  // Scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (r) { io.observe(r); });
  } else {
    reveals.forEach(function (r) { r.classList.add('is-in'); });
  }

  // Project filter
  var filterBtns = document.querySelectorAll('.proj-filter__btn');
  var cards = document.querySelectorAll('.proj-card[data-cat]');
  if (filterBtns.length && cards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cat = btn.getAttribute('data-filter');
        filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        cards.forEach(function (c) {
          var show = cat === 'all' || c.getAttribute('data-cat') === cat;
          c.classList.toggle('is-hidden', !show);
        });
      });
    });
  }
  // Contact success banner
  var ok = document.getElementById('form-success');
  if (ok && /[?&]success=1/.test(window.location.search)) {
    ok.classList.add('is-visible');
  }
})();
