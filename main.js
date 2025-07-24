document.addEventListener("DOMContentLoaded", function () {
  // Swiper 初始化
  const swiper = new Swiper('.info-swiper', {
    slidesPerView: 'auto',
    centeredSlides: true,
    loop: false,
    initialSlide: 1,
    grabCursor: true,
    watchSlidesProgress: true,
    on: {
      init(swiper) {
        updateSlidesEffect(swiper);
      },
      setTranslate(swiper) {
        updateSlidesEffect(swiper);
      }
    }
  });

  function updateSlidesEffect(swiper) {
    swiper.slides.forEach((slide) => {
      const progress = slide.progress;
      const scale = 1 - Math.min(Math.abs(progress) * 0.2, 0.2);
      const opacity = 1 - Math.min(Math.abs(progress) * 0.7, 0.7);
      const zIndex = 10 - Math.round(Math.abs(progress) * 10);

      slide.style.transform = `scale(${scale}) translateY(-40px)`;
      slide.style.opacity = opacity;
      slide.style.zIndex = zIndex;
      slide.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
    });
  }

  // ======================
  // 專案圖層展開動畫區塊
  // ======================
window.addEventListener('scroll', () => {
  const projectsText = document.querySelector('.projects-text');
  if (!projectsText) return;

  const l1 = document.getElementById('l1');
  const l2 = document.getElementById('l2');
  const l3 = document.getElementById('l3');
  const r1 = document.getElementById('r1');
  const r2 = document.getElementById('r2');
  const r3 = document.getElementById('r3');
  if (!l1 || !l2 || !l3 || !r1 || !r2 || !r3) return;

  const projectsRect = projectsText.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // 提前觸發，設定為視窗高度的 1.5 倍 (視窗外面也開始觸發)
  const triggerPoint = windowHeight * 1.5;

  // 計算 progress （超過觸發點開始增長，最高 1）
  let progress = (triggerPoint - projectsRect.top) / triggerPoint;
  progress = Math.min(Math.max(progress, 0), 1);

  const maxMove = 180;  // 增加最大移動距離

  l1.style.transform = `translateX(calc(-50% - ${maxMove * progress * 3}px))`;
  l2.style.transform = `translateX(calc(-50% - ${maxMove * progress * 2}px))`;
  l3.style.transform = `translateX(calc(-50% - ${maxMove * progress * 1}px))`;

  r1.style.transform = `translateX(calc(-50% + ${maxMove * progress * 1}px))`;
  r2.style.transform = `translateX(calc(-50% + ${maxMove * progress * 2}px))`;
  r3.style.transform = `translateX(calc(-50% + ${maxMove * progress * 3}px))`;
});
});
document.addEventListener('DOMContentLoaded', () => {
  const svg = document.querySelector('.my-svg');
  const triggerElement = document.querySelector('.projects-text');
  if (!svg || !triggerElement) return;

  function checkVisibility() {
    const triggerRect = triggerElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // 當 triggerElement 的頂部進入畫面 80% 高度時觸發
    if (triggerRect.top < windowHeight * 0.8) {
      svg.classList.add('visible');
    }
  }

  window.addEventListener('scroll', checkVisibility);
  checkVisibility(); // 頁面一開始就檢查一次
});


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');   // ✅ 滑入畫面 → 淡入
      } else {
        entry.target.classList.remove('visible'); // ✅ 滑出畫面（上下都會）→ 淡出
      }
    });
  }, {
    threshold: 0.1 // 10% 可見時就觸發，建議保持
  });

  // 對所有符合條件的圖片套用觀察
  document.querySelectorAll('.project-image01').forEach(img => {
    observer.observe(img);
  });