/**
 * Gallery Slider - Landing Generator
 *
 * Простой слайдер для галереи изображений с навигацией стрелками.
 */

class GallerySlider {
  constructor(element) {
    this.wrapper = element;
    this.section = element.closest('.gallery-slider');
    this.track = element.querySelector('.gallery-slider__track');
    this.slides = element.querySelectorAll('.gallery-slider__slide');
    this.prevBtn = element.querySelector('.gallery-slider__arrow--prev');
    this.nextBtn = element.querySelector('.gallery-slider__arrow--next');

    // V5 variant has different sized slides (center is bigger)
    this.isV5 = this.section && this.section.classList.contains('gallery-slider--v5');

    this.currentIndex = 0;
    this.slidesToShow = this.calculateSlidesToShow(); // Responsive количество слайдов
    this.slideGap = this.isV5 ? 40 : 22; // FIGMA: gap между слайдами

    this.init();
  }

  /**
   * Вычисляет количество видимых слайдов в зависимости от ширины экрана
   * @returns {number} Количество слайдов для отображения
   */
  calculateSlidesToShow() {
    const width = window.innerWidth;
    if (width < 576) return 1;  // Small mobile: 1 слайд
    if (width < 992) return 2;  // Tablet/Mobile: 2 слайда
    return 3;                    // Desktop: 3 слайда
  }

  /**
   * V5: Check if only center slide is visible (CSS hides others on small screens)
   * @returns {boolean} true if only 1 slide visible
   */
  isV5SingleSlideMode() {
    if (!this.isV5) return false;
    const width = window.innerWidth;
    return width <= 850; // CSS @media (max-width: 850px) shows only center slide
  }

  init() {
    if (this.slides.length === 0) return;

    // V5: start with second slide as center on desktop, first on mobile
    if (this.isV5 && this.slides.length >= 3) {
      this.currentIndex = this.isV5SingleSlideMode() ? 0 : 1;
    }

    this.calculateSlideWidth();
    this.bindEvents();
    this.updatePosition();
    this.updateArrowsState();

    // Пересчёт при ресайзе с debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newSlidesToShow = this.calculateSlidesToShow();

        // Если количество слайдов изменилось, обновляем
        if (newSlidesToShow !== this.slidesToShow) {
          this.slidesToShow = newSlidesToShow;

          // Корректируем currentIndex если он выходит за пределы
          const maxIndex = Math.max(0, this.slides.length - this.slidesToShow);
          if (this.currentIndex > maxIndex) {
            this.currentIndex = maxIndex;
          }
        }

        this.calculateSlideWidth();
        this.updatePosition();
        this.updateArrowsState();
      }, 150);
    });
  }

  calculateSlideWidth() {
    const viewport = this.wrapper.querySelector('.gallery-slider__viewport');
    if (!viewport) return;

    // V5 variant has CSS-defined slide widths - READ from DOM, don't hardcode
    if (this.isV5) {
      this.track.style.gap = `${this.slideGap}px`;
      // Read actual slide widths from CSS (responsive values)
      const centerSlide = this.track.querySelector('.gallery-slider__slide.is-center') || this.slides[1];
      const sideSlide = this.slides[0];
      if (centerSlide && sideSlide) {
        this.centerSlideWidth = centerSlide.offsetWidth || 450;
        this.sideSlideWidth = sideSlide.offsetWidth || 250;
        // Read actual gap from computed style
        const trackStyle = window.getComputedStyle(this.track);
        const gap = parseFloat(trackStyle.gap) || this.slideGap;
        this.slideGap = gap;
      }
      // Set initial center slide
      this.updateCenterSlide();
      return;
    }

    const viewportWidth = viewport.offsetWidth;
    // Ширина одного слайда = (viewport - gaps) / slidesToShow
    this.slideWidth = (viewportWidth - this.slideGap * (this.slidesToShow - 1)) / this.slidesToShow;

    // Устанавливаем ширину каждому слайду
    this.slides.forEach(slide => {
      slide.style.width = `${this.slideWidth}px`;
      slide.style.flexShrink = '0';
    });

    // Устанавливаем gap для track
    this.track.style.gap = `${this.slideGap}px`;
  }

  // V5: Update which slide has the center highlight
  updateCenterSlide() {
    if (!this.isV5) return;

    this.slides.forEach((slide, i) => {
      // Center slide is currentIndex (the one in the middle of viewport)
      slide.classList.toggle('is-center', i === this.currentIndex);
    });
  }

  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next());
    }

    // Touch/swipe support
    let startX = 0;
    let endX = 0;

    this.track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    this.track.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) { // Минимальный свайп 50px
        if (diff > 0) {
          this.next();
        } else {
          this.prev();
        }
      }
    }, { passive: true });
  }

  prev() {
    const minIndex = this.isV5 ? 0 : 0;
    if (this.currentIndex > minIndex) {
      this.currentIndex--;
      this.updatePosition();
      this.updateArrowsState();
    }
  }

  next() {
    const maxIndex = this.isV5
      ? this.slides.length - 1
      : Math.max(0, this.slides.length - this.slidesToShow);
    if (this.currentIndex < maxIndex) {
      this.currentIndex++;
      this.updatePosition();
      this.updateArrowsState();
    }
  }

  updatePosition() {
    let offset = 0;

    if (this.isV5) {
      this.updateCenterSlide();

      // Single slide mode (≤850px): just swap is-center, no translate needed
      if (this.isV5SingleSlideMode()) {
        this.track.style.transform = 'translateX(0)';
        return;
      }

      // Multi-slide mode (desktop/tablet-landscape):
      // Calculate offset to keep center slide in middle of viewport
      // Slides before currentIndex-1 are scrolled out
      for (let i = 0; i < this.currentIndex - 1; i++) {
        offset += this.slides[i].offsetWidth + this.slideGap;
      }
      if (offset < 0) offset = 0;
    } else {
      offset = this.currentIndex * (this.slideWidth + this.slideGap);
    }

    this.track.style.transform = `translateX(-${offset}px)`;
  }

  updateArrowsState() {
    let minIndex = 0;
    let maxIndex = Math.max(0, this.slides.length - this.slidesToShow);

    // V5: different limits depending on mode
    if (this.isV5) {
      if (this.isV5SingleSlideMode()) {
        // Single slide mode: can scroll through all slides
        minIndex = 0;
        maxIndex = this.slides.length - 1;
      } else {
        // Multi-slide mode: need slides on both sides of center
        minIndex = 1;
        maxIndex = this.slides.length - 2;
      }
    }

    if (this.prevBtn) {
      this.prevBtn.disabled = this.currentIndex <= minIndex;
      this.prevBtn.classList.toggle('is-disabled', this.currentIndex <= minIndex);
    }

    if (this.nextBtn) {
      this.nextBtn.disabled = this.currentIndex >= maxIndex;
      this.nextBtn.classList.toggle('is-disabled', this.currentIndex >= maxIndex);
    }
  }
}

// Автоинициализация всех слайдеров на странице
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.gallery-slider__wrapper').forEach(wrapper => {
    new GallerySlider(wrapper);
  });

  // Gallery Slider V4 - Single Image Slider (Landing 4)
  document.querySelectorAll('.gallery-slider-v4__wrapper').forEach(wrapper => {
    new GallerySliderV4(wrapper);
  });

  // Gallery Single Slider - Single Image Slider (Landing 3)
  document.querySelectorAll('.gallery-single-slider').forEach(section => {
    new GallerySingleSlider(section);
  });
});

/**
 * Gallery Slider V4 - Single Image Slider
 * Shows one image at a time with prev/next navigation
 */
class GallerySliderV4 {
  constructor(element) {
    this.wrapper = element;
    this.slides = element.querySelectorAll('.gallery-slider-v4__slide');
    this.prevBtn = element.querySelector('.gallery-slider-v4__arrow--prev');
    this.nextBtn = element.querySelector('.gallery-slider-v4__arrow--next');
    this.currentIndex = 0;

    this.init();
  }

  init() {
    if (this.slides.length === 0) return;

    this.bindEvents();
    this.showSlide(0);
  }

  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next());
    }

    // Touch/swipe support
    const container = this.wrapper.querySelector('.gallery-slider-v4__container');
    if (container) {
      let startX = 0;
      container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
      }, { passive: true });

      container.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) this.next();
          else this.prev();
        }
      }, { passive: true });
    }
  }

  prev() {
    const newIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.slides.length - 1;
    this.showSlide(newIndex);
  }

  next() {
    const newIndex = this.currentIndex < this.slides.length - 1 ? this.currentIndex + 1 : 0;
    this.showSlide(newIndex);
  }

  showSlide(index) {
    this.slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === index);
    });
    this.currentIndex = index;
  }
}

/**
 * Gallery Single Slider - Single Image Slider (Landing 3)
 * Shows one image at a time with prev/next navigation
 * Arrows are positioned at section edges
 */
class GallerySingleSlider {
  constructor(section) {
    this.section = section;
    this.container = section.querySelector('.gallery-single-slider__container');
    this.slides = section.querySelectorAll('.gallery-single-slider__slide');
    this.prevBtn = section.querySelector('.gallery-single-slider__arrow--prev');
    this.nextBtn = section.querySelector('.gallery-single-slider__arrow--next');
    this.currentIndex = 0;

    this.init();
  }

  init() {
    if (this.slides.length === 0) return;

    this.bindEvents();
    this.showSlide(0);
  }

  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next());
    }

    // Touch/swipe support on container
    if (this.container) {
      let startX = 0;
      this.container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
      }, { passive: true });

      this.container.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) this.next();
          else this.prev();
        }
      }, { passive: true });
    }
  }

  prev() {
    const newIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.slides.length - 1;
    this.showSlide(newIndex);
  }

  next() {
    const newIndex = this.currentIndex < this.slides.length - 1 ? this.currentIndex + 1 : 0;
    this.showSlide(newIndex);
  }

  showSlide(index) {
    this.slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === index);
    });
    this.currentIndex = index;
  }
}
