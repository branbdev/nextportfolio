export const aTagClick = (): void => {
  const aTag = document.querySelectorAll<HTMLAnchorElement>("[href='#']");
  for (let i = 0; i < aTag.length; i++) {
    const a = aTag[i];
    a.addEventListener('click', (e: Event) => {
      e.preventDefault();
    });
  }
};

// Data image
export const dataImage = (): void => {
  let d = document.querySelectorAll<HTMLElement>('[data-bg-img]');
  for (let i = 0; i < d.length; i++) {
    const element = d[i];
    const bgImg = element.getAttribute('data-bg-img');
    if (bgImg) {
      element.style.backgroundImage = `url(${bgImg})`;
    }
  }
};

export const customCursor = (): void => {
  var myCursor = document.querySelectorAll<HTMLElement>('.frenify-cursor'),
    hamburger = document.querySelector<HTMLElement>('.hamburger'),
    kura_tm_topbar = document.querySelector<HTMLElement>('.kura_tm_topbar '),
    pointer = document.querySelector<HTMLElement>('.cursor-pointer'),
    e = document.querySelector<HTMLElement>('.cursor-inner'),
    t = document.querySelector<HTMLElement>('.cursor-outer');

  function mouseEvent(element: HTMLElement): void {
    element.addEventListener('mouseenter', function () {
      e?.classList.add('cursor-hover');
      t?.classList.add('cursor-hover');
    });
    element.addEventListener('mouseleave', function () {
      e?.classList.remove('cursor-hover');
      t?.classList.remove('cursor-hover');
    });
  }

  if (myCursor.length) {
    if (document.body) {
      let o = false;
      window.onmousemove = (s: MouseEvent) => {
        if (!o && t && e) {
          t.style.transform =
            'translate(' + s.clientX + 'px, ' + s.clientY + 'px)';
          e.style.transform =
            'translate(' + s.clientX + 'px, ' + s.clientY + 'px)';
        }
      };
      document.body.addEventListener('mouseenter', function () {
        let a = document.querySelectorAll<HTMLAnchorElement>('a'),
          sliders = document.querySelectorAll<HTMLElement>(
            '.owl-carousel, .swiper-container, .cursor-link'
          ),
          slider = document.querySelectorAll<HTMLElement>('.modal_item');

        e?.classList.add('cursor-inner');
        t?.classList.add('cursor-outer');

        for (let i = 0; i < a.length; i++) {
          const element = a[i];
          mouseEvent(element);
        }

        for (let i = 0; i < sliders.length; i++) {
          const element = sliders[i];
          element.addEventListener('mouseenter', function () {
            e?.classList.add('cursor-slider');
            t?.classList.add('cursor-slider');
          });
          element.addEventListener('mouseleave', function () {
            e?.classList.remove('cursor-slider');
            t?.classList.remove('cursor-slider');
          });
        }
        for (let i = 0; i < slider.length; i++) {
          const element = slider[i];
          mouseEvent(element);
        }

        hamburger && mouseEvent(hamburger);
        kura_tm_topbar && mouseEvent(kura_tm_topbar);
        pointer && mouseEvent(pointer);
      });
      if (e && t) {
        e.style.visibility = 'visible';
        t.style.visibility = 'visible';
      }
    }
  }
};

export const sticky = (): void => {
  let offset = window.scrollY;
  const stickys = document.querySelectorAll<HTMLBodyElement>('body');
  stickys.forEach((sticky) => {
    if (sticky) {
      if (offset > 100) {
        sticky.classList.add('scrolled');
      } else {
        sticky.classList.remove('scrolled');
      }
    }
  });
};
