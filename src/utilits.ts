/*
 * Prevents default click behavior for anchor tags with href="#"
 * This is commonly used for placeholder links or JavaScript-triggered links
 * that shouldn't navigate to a new page or scroll to top
 */
export const aTagClick = (): void => {
  // Select all anchor elements with href="#" attribute
  const aTag = document.querySelectorAll<HTMLAnchorElement>("[href='#']");

  // Iterate through each anchor tag
  for (let i = 0; i < aTag.length; i++) {
    const a = aTag[i];

    // Add click event listener to prevent default navigation
    a.addEventListener('click', (e: Event) => {
      e.preventDefault(); // Stop the browser from navigating or scrolling to top
    });
  }
};

/*
 * Sets background images from data attributes
 * This allows you to specify background images in HTML using data-bg-img attribute
 * instead of inline CSS styles, keeping markup cleaner and more semantic
 *
 * Usage: <div data-bg-img="/path/to/image.jpg"></div>
 */
export const dataImage = (): void => {
  // Find all elements with data-bg-img attribute
  let d = document.querySelectorAll<HTMLElement>('[data-bg-img]');

  // Process each element
  for (let i = 0; i < d.length; i++) {
    const element = d[i];

    // Get the image path from the data attribute
    const bgImg = element.getAttribute('data-bg-img');

    // If image path exists, set it as background image
    if (bgImg) {
      element.style.backgroundImage = `url(${bgImg})`;
    }
  }
};

/*
 * Custom cursor functionality for interactive elements
 * Creates a custom cursor that follows mouse movement and changes appearance
 * when hovering over interactive elements like links, sliders, etc.
 * This enhances the user experience with smooth cursor animations
 */
export const customCursor = (): void => {
  // Select all cursor-related elements in the DOM
  // The system uses two separate elements to create the bullseye effect:
  // 1. Outer circle (.cursor-outer) - Larger border ring
  // 2. Inner circle (.cursor-inner) - Small dot or expanded hover state
  var myCursor = document.querySelectorAll<HTMLElement>('.frenify-cursor'), // Main cursor containers
    hamburger = document.querySelector<HTMLElement>('.hamburger'), // Mobile menu button
    kura_tm_topbar = document.querySelector<HTMLElement>('.kura_tm_topbar '), // Top navigation bar
    pointer = document.querySelector<HTMLElement>('.cursor-pointer'), // Special pointer elements
    e = document.querySelector<HTMLElement>('.cursor-inner'), // Inner cursor element (center dot)
    t = document.querySelector<HTMLElement>('.cursor-outer'); // Outer cursor element (ring)

  /*
   * Helper function that manages cursor hover states
   * When cursor enters an interactive element:
   * 1. Adds 'cursor-hover' class to both inner and outer cursor elements
   * 2. This triggers CSS transitions defined in the style.css file
   * 3. The inner element expands and becomes more transparent
   * 4. The outer element temporarily disappears
   */
  function mouseEvent(element: HTMLElement): void {
    // When mouse enters element, add hover class to both cursor parts
    element.addEventListener('mouseenter', function () {
      e?.classList.add('cursor-hover'); // Inner element expands
      t?.classList.add('cursor-hover'); // Outer element fades out
    });

    // When mouse leaves element, return cursor to normal state
    element.addEventListener('mouseleave', function () {
      e?.classList.remove('cursor-hover');
      t?.classList.remove('cursor-hover');
    });
  }

  // Only initialize custom cursor if cursor elements exist in the DOM
  if (myCursor.length) {
    if (document.body) {
      let o = false; // Flag for cursor state tracking

      /*
       * Core cursor positioning logic - follows mouse movement
       * Uses transform:translate instead of top/left for better performance
       * GPU-accelerated animations avoid layout thrashing
       */
      window.onmousemove = (s: MouseEvent) => {
        if (!o && t && e) {
          // Update outer cursor position with mouse coordinates
          t.style.transform =
            'translate(' + s.clientX + 'px, ' + s.clientY + 'px)';
          // Update inner cursor position with same coordinates
          e.style.transform =
            'translate(' + s.clientX + 'px, ' + s.clientY + 'px)';
        }
      };

      /*
       * Initialize cursor interactivity when mouse enters document body
       * This sets up all the hover effects for various interactive elements
       */
      document.body.addEventListener('mouseenter', function () {
        // Select all interactive elements that should trigger cursor changes
        let a = document.querySelectorAll<HTMLAnchorElement>('a'), // All links
          sliders = document.querySelectorAll<HTMLElement>(
            '.owl-carousel, .swiper-container, .cursor-link' // Carousel/slider elements
          ),
          slider = document.querySelectorAll<HTMLElement>('.modal_item'); // Modal items

        // Make cursor elements visible
        e?.classList.add('cursor-inner');
        t?.classList.add('cursor-outer');

        // Add standard hover effect to all links
        for (let i = 0; i < a.length; i++) {
          const element = a[i];
          mouseEvent(element);
        }

        // Add SPECIAL SLIDER CURSOR EFFECTS - this is the "bullseye" transformation
        // When hovering over carousels or sliders, the cursor gets a distinct style
        for (let i = 0; i < sliders.length; i++) {
          const element = sliders[i];
          element.addEventListener('mouseenter', function () {
            // Add 'cursor-slider' class which transforms the inner cursor into a larger ring
            // with left/right arrow indicators - see CSS for the visual implementation
            e?.classList.add('cursor-slider');
            t?.classList.add('cursor-slider');
          });
          element.addEventListener('mouseleave', function () {
            // Remove special slider effect when cursor leaves the carousel
            e?.classList.remove('cursor-slider');
            t?.classList.remove('cursor-slider');
          });
        }

        // Add hover effects to modal items
        for (let i = 0; i < slider.length; i++) {
          const element = slider[i];
          mouseEvent(element);
        }

        // Add hover effects to specific UI elements if they exist
        hamburger && mouseEvent(hamburger);
        kura_tm_topbar && mouseEvent(kura_tm_topbar);
        pointer && mouseEvent(pointer);
      });

      // Make cursor elements visible after initialization
      if (e && t) {
        e.style.visibility = 'visible';
        t.style.visibility = 'visible';
      }
    }
  }
};

/*
 * Sticky navigation functionality
 * Adds a 'scrolled' class to the body when user scrolls past 100px
 * This is typically used to change navigation appearance on scroll
 * (e.g., changing background color, size, or adding shadows)
 */
export const sticky = (): void => {
  let offset = window.scrollY; // Get current scroll position
  const stickys = document.querySelectorAll<HTMLBodyElement>('body'); // Get body elements

  // Process each body element (typically just one)
  stickys.forEach((sticky) => {
    if (sticky) {
      if (offset > 100) {
        // If scrolled more than 100px, add scrolled class
        sticky.classList.add('scrolled');
      } else {
        // If scrolled less than 100px, remove scrolled class
        sticky.classList.remove('scrolled');
      }
    }
  });
};
