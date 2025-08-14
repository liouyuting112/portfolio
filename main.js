// 等 DOM 完全載入後執行
document.addEventListener('DOMContentLoaded', () => {
  // 取得所有帶 data-target 的選單項目
  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.dataset.target;           // 取得目標區塊 id
      const targetEl = document.getElementById(targetId);  // 找到目標元素

      if (targetEl) {
        let offset = 0;

        // 根據不同目標和螢幕寬度設定偏移量
        if (targetId === 'about') {
          if (window.innerWidth <= 480) {
            offset = -80;
          } else if (window.innerWidth <= 768) {
            offset = -120;
          } else {
            offset = -20;
          }
        } else if (targetId === 'project') {
          if (window.innerWidth <= 480) {
            offset = -100;
          } else if (window.innerWidth <= 768) {
            offset = -140;
          } else {
            offset = 140;
          }
        }
        else if (targetId === 'redesign') {
          if (window.innerWidth <= 480) {
            offset = -100;
          } else if (window.innerWidth <= 768) {
            offset = -140;
          } else {
            offset = 130; // 桌面版的滾動位置
          }
        }
        else if (targetId === 'contact') {
        // 滾動到最底部
            offset = 0; // 或調整微調偏移
        }
        // 計算滾動位置（元素相對視窗頂端 + 現有捲動高度 + 偏移量）
        const y = targetEl.getBoundingClientRect().top + window.scrollY + offset;

        // 平滑滾動到目標位置
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
});
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
    if (!slide.closest('.info-swiper')) return; // ⬅️ 確保只對 info-swiper 的 slide 動畫
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

  const maxMove = 100;  // 增加最大移動距離

  l1.style.transform = `translateX(calc(-50% - ${maxMove * progress * 3}px))`;
  l2.style.transform = `translateX(calc(-50% - ${maxMove * progress * 2}px))`;
  l3.style.transform = `translateX(calc(-50% - ${maxMove * progress * 1}px)) scale(1)`; 

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


 ['.project-image01', '.project-description', '.user-card', '.gallery-img.img01', '.gallery-img.img02',  '.gallery-img.img05'].forEach(selector => {
  document.querySelectorAll(selector).forEach(el => {
    observer.observe(el);
  });
});
window.addEventListener('scroll', () => {
  const img03 = document.querySelector('.gallery-img.img03');
  if (!img03) return;

  const rect = img03.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // 設定觸發範圍：元素有部分在畫面中
  const isVisible = rect.top < windowHeight * 0.7 && rect.bottom > windowHeight * 0.3;

  if (isVisible) {
    img03.classList.add('visible');
  } else {
    img03.classList.remove('visible');
  }
});
window.addEventListener('scroll', () => {
  const img04 = document.querySelector('.gallery-img.img04');
  if (!img04) return;

  const rect = img04.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // 這裡調整觸發範圍，原本 0.7 改成 0.85，會更早觸發
  const isVisible = rect.top < windowHeight * 1.2 && rect.bottom > windowHeight * 0.15;

  if (isVisible) {
    img04.classList.add('visible');
  } else {
    img04.classList.remove('visible');
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const imageSetsTop = {
    prototype: [
      "images/prototype01.png",
      "images/prototype02.png",
      "images/prototype03.png"
    ],
    design: [
      "images/design01.png",
      "images/design02.png",
      "images/design03.png"
    ],
    code: [
      "images/code01.png",
      "images/code02.png",
      "images/code03.png"
    ]
  };

  const imageSetsBottom = {
    prototype: [
      "images/prototype04.png",  // 到時候再改
      "images/prototype05.png",
      "images/prototype06.png"  
    ],
    design: [
      "images/design04.png",
      "images/design05.png",
      "images/design06.png"
    ],
    code: [
      "images/code04.png",
      "images/code05.png",
      "images/code06.png"
    ]
  };

  function setupTabs(tabContainer, imagesContainer, imageSets) {
    const tabs = tabContainer.querySelectorAll(".card-title");

    function updateImages(type) {
      imagesContainer.innerHTML = "";
      imageSets[type].forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        imagesContainer.appendChild(img);
      });
    }

    // 預設載入 prototype
    updateImages("prototype");

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const type = tab.dataset.type;

        // 切換 active 樣式
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        // 更新圖片
        updateImages(type);
      });
    });
  }

  const topTabs = document.querySelector(".three-column-section > .tab-buttons");
  const topImages = document.querySelector(".three-column-section > .card-images");

  const bottomTabs = document.querySelector("#bottom-tabs");
  const bottomImages = document.querySelector("#bottom-images");

  setupTabs(topTabs, topImages, imageSetsTop);
  setupTabs(bottomTabs, bottomImages, imageSetsBottom);
});
document.querySelectorAll('.flow-step, .flow-step01, .flow-step02, .flow-step03').forEach(step => {
  step.addEventListener('click', () => {
    const targetId = step.getAttribute('data-target'); // 這裡要對應中油PAY的區塊 id
    const targetElement = document.getElementById(targetId);
    if(targetElement) {
      let offset = -40; // 預設偏移
      if(targetId === 'redesign') offset = 140;
      if(targetId === 'user-scenario') offset = -10;
      if(targetId === 'before-after') offset = -60;
      if(targetId === 'conclusion') offset = -90;
      if (targetId === 'invoice-app') offset = 160; // Redesign 往下

      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition + offset, behavior: 'smooth' });

    }
  });
});
// 讓 flow-step04 / flow-step05 / flow-step06 都支援跳轉
document.querySelectorAll('.flow-step04, .flow-step05, .flow-step06').forEach(step => {
  step.addEventListener('click', () => {
    const targetId = step.getAttribute('data-target');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      // 預設偏移量
      let offset = -80; // 上方保留空間 80px

      // 根據不同 target 調整偏移
      if (targetId === 'invoice-app01') offset = 155; // Redesign 往下
      if (targetId === 'before-after01' || targetId === 'conclusion01') offset = -130; // Before&After、結語 往上
      if (targetId === 'user-scenario01') offset = 2; // 使用者情境 自訂位置
      // 計算位置並平滑捲動
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition + offset,
        behavior: 'smooth'
      });

      // 更新 active 樣式
      document.querySelectorAll('.flow-step04, .flow-step05, .flow-step06').forEach(s => s.classList.remove('active'));
      step.classList.add('active');
    }
  });
});
document.querySelectorAll('.scroll-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault(); // 取消默認跳轉
    const targetId = link.getAttribute('href').replace('#','');
    const offset = parseInt(link.dataset.offset) || 0;
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const y = targetEl.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});
