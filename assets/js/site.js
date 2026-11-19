/* 24667 · v4 动效层（GSAP）
   规则：只用 transform / opacity，统一缓动，进入视口只播一次，
   尊重 prefers-reduced-motion，?noanim 全部跳过。
   没有 GSAP 或脚本异常时，页面内容保持完全可见。 */

(function () {
  var params = new URLSearchParams(location.search);
  if (params.has('noanim')) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var g = window.gsap;
  var ST = window.ScrollTrigger;
  if (!g) return;

  var head = document.querySelector('.site-head');

  // 导航滚动状态：走 ScrollTrigger 回调，不挂原生 scroll
  if (ST) {
    g.registerPlugin(ST);
    ST.create({
      start: 0,
      end: 'max',
      onUpdate: function (self) {
        if (head) head.classList.toggle('is-scrolled', self.scroll() > 8);
      }
    });
  }

  if (reduce) return; // 降低动态效果：不做位移动画

  /* ---------- 首屏 ---------- */

  var main = document.querySelector('.cover-main');
  if (main) {
    g.from(main.children, {
      y: 24, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.07, delay: 0.05
    });
  }
  var aside = document.querySelectorAll('.cover-aside > *');
  if (aside.length) {
    g.from(aside, {
      y: 24, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, delay: 0.18
    });
  }

  if (!ST) return;

  /* ---------- 滚动进入 ---------- */

  var sel = [
    '.sec-head', '.card', '.split > *', '.tl-item', '.log p', '.season-row',
    '.facts li', '.band .wrap > *', '.season-strip figure', '.meet', '.notice'
  ].join(',');

  var targets = Array.prototype.slice.call(document.querySelectorAll(sel)).filter(function (el) {
    return !el.closest('.cover');
  });

  if (targets.length) {
    g.set(targets, { autoAlpha: 0, y: 32 });
    ST.batch(targets, {
      start: 'top 88%',
      once: true,
      onEnter: function (batch) {
        g.to(batch, {
          autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08, overwrite: true
        });
      }
    });
    // 兜底：极端情况下仍未显示的，直接放出来
    setTimeout(function () {
      targets.forEach(function (el) {
        if (getComputedStyle(el).visibility === 'hidden') g.set(el, { clearProps: 'all' });
      });
    }, 2500);
  }

  /* ---------- 逐字点亮 ---------- */

  var tagline = document.querySelector('.tagline');
  if (tagline) {
    var words = tagline.querySelectorAll('.w');
    if (words.length) {
      g.set(words, { opacity: 0.22 });
      g.to(words, {
        opacity: 1,
        ease: 'none',
        stagger: 0.15,
        scrollTrigger: {
          trigger: tagline,
          start: 'top 72%',
          end: 'bottom 55%',
          scrub: 0.5
        }
      });
    }
  }
})();
