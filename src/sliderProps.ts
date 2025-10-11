interface AutoplayConfig {
  delay: number;
  disableOnInteraction: boolean;
}

interface NavigationConfig {
  nextEl: string;
  prevEl: string;
}

interface BreakpointConfig {
  slidesPerView: number;
}

interface SliderProps {
  slidesPerView: number;
  loop: boolean;
  spaceBetween: number;
  speed: number;
  autoplay: AutoplayConfig;
  navigation: NavigationConfig;
  breakpoints?: { [key: number]: BreakpointConfig };
}

export const portfolioSliderProps: SliderProps = {
  slidesPerView: 1,
  loop: true,
  spaceBetween: 30,
  speed: 1000,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.next',
    prevEl: '.prev',
  },
  breakpoints: {
    480: {
      slidesPerView: 2,
    },
    1400: {
      slidesPerView: 3,
    },
  },
};

export const customersSliderProps: Omit<SliderProps, 'breakpoints'> = {
  slidesPerView: 1,
  loop: true,
  spaceBetween: 30,
  speed: 1000,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.next',
    prevEl: '.prev',
  },
};
