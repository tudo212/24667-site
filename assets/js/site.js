/* 24667 站点动效：滚动进入、页头状态、卡片与按钮微交互。
   只做加法：JS 不在时内容照常显示（hidden 状态由 html.js 控制）。 */
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 页头滚动状态
  var head = document.querySelector('.site-head');
  if (head) {
    var onScroll = function () {
      head.classList.toggle('is-scrolled', window.scrollY > 6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ?noanim 用于截图/打印时关掉入场，方便整页快照
  var noanim = location.search.indexOf('noanim') >= 0;
  if (reduce || noanim || !('IntersectionObserver' in window)) return;

  var groups = [
    '.sec-head',
    '.cards > article',
    '.timeline > article',
    '.split > *',
    '.log > li',
    '.stats .stat',
    '.page-head .wrap > *',
    '.band .wrap > *',
    '.duo figure'
  ];

  var items = [];
  groups.forEach(function (sel) {
    Array.prototype.forEach.call(document.querySelectorAll(sel), function (el, i) {
      el.classList.add('reveal');
      el.style.setProperty('--d', Math.min(i, 5) * 95 + 'ms');
      items.push(el);
    });
  });

  if (!items.length) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });

  items.forEach(function (el) { io.observe(el); });
})();
