/**
* Blogspot Strategy Theme JavaScript
* Based on Strategy Bootstrap Template
* Adapted for Blogspot compatibility
*/

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navmenu .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scroll top button
   */
  let scrolltop = select('.scroll-top')
  if (scrolltop) {
    const togglescrolltop = function() {
      window.scrollY > 100 ? scrolltop.classList.add('active') : scrolltop.classList.remove('active')
    }
    window.addEventListener('load', togglescrolltop)
    onscroll(document, togglescrolltop)
  }

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Sticky header on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling

    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('sticked')
        if (nextElement) nextElement.classList.add('sticked-header-offset')
      } else {
        selectHeader.classList.remove('sticked')
        if (nextElement) nextElement.classList.remove('sticked-header-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#header').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Hide mobile nav on same-page/hash links
   */
  on('click', '#navmenu a', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let header = select('#header')
      let navmenu = select('#navmenu')

      header.classList.remove('mobile-nav-active')
      navmenu.querySelector('.mobile-nav-toggle').classList.toggle('bi-list')
      navmenu.querySelector('.mobile-nav-toggle').classList.toggle('bi-x')

      if (this.hash == '#header') {
        header.classList.remove('header-transparent')
      } else {
        header.classList.add('header-transparent')
      }

      window.scrollTo(0, 0)
      history.pushState(null, null, this.hash)
    }
  }, true)

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = select('#navmenu .dropdown', true)

  const navDropdownToggle = (element) => {
    element.classList.toggle('dropdown-active')
    let dropdown = element.nextElementSibling
    dropdown.classList.toggle('dropdown-active')
    let dropDownIndicator = element.querySelector('.dropdown-indicator')
    dropDownIndicator.classList.toggle('bi-chevron-up')
    dropDownIndicator.classList.toggle('bi-chevron-down')
  }

  on('click', '#navmenu .dropdown > a', function(e) {
    if (select('#header').classList.contains('mobile-nav-active')) {
      e.preventDefault()
      navDropdownToggle(this.parentElement)
    }
  }, true)

  on('click', '.dropdown a', function(e) {
    if (this.nextElementSibling.classList.contains('dropdown-active')) {
      e.preventDefault()
      navDropdownToggle(this.parentElement)
    }
  }, true)

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate gallery lightbox 
   */
  const galelryLightbox = GLightbox({
    selector: '.galelry-lightbox'
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Blogspot specific functions
   */
  
  // Initialize blog post interactions
  function initBlogPosts() {
    // Add hover effects to blog posts
    const blogPosts = document.querySelectorAll('.blog-posts .post');
    blogPosts.forEach(post => {
      post.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
      });
      
      post.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  }

  // Initialize sidebar widgets
  function initSidebarWidgets() {
    // Add hover effects to sidebar widgets
    const sidebarWidgets = document.querySelectorAll('.sidebar .widget');
    sidebarWidgets.forEach(widget => {
      widget.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
      });
      
      widget.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  }

  // Initialize pagination
  function initPagination() {
    const paginationLinks = document.querySelectorAll('.blog-pager a');
    paginationLinks.forEach(link => {
      link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
      });
      
      link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  }

  // Initialize social share buttons
  function initSocialShare() {
    const shareButtons = document.querySelectorAll('.post-share-buttons a');
    shareButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const url = this.getAttribute('href');
        const title = document.title;
        const platform = this.getAttribute('data-platform');
        
        let shareUrl = '';
        switch(platform) {
          case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
          case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
            break;
          case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
        }
        
        if (shareUrl) {
          window.open(shareUrl, '_blank', 'width=600,height=400');
        }
      });
    });
  }

  // Initialize search functionality
  function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    
    if (searchInput && searchResults) {
      searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const posts = document.querySelectorAll('.blog-posts .post');
        
        posts.forEach(post => {
          const title = post.querySelector('.post-title').textContent.toLowerCase();
          const content = post.querySelector('.post-content').textContent.toLowerCase();
          
          if (title.includes(query) || content.includes(query)) {
            post.style.display = 'block';
          } else {
            post.style.display = 'none';
          }
        });
      });
    }
  }

  // Initialize comment system
  function initComments() {
    const commentForms = document.querySelectorAll('.comment-form');
    commentForms.forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add your comment submission logic here
        const formData = new FormData(this);
        const commentData = {
          name: formData.get('name'),
          email: formData.get('email'),
          comment: formData.get('comment'),
          postId: formData.get('post-id')
        };
        
        // Send comment to server (implement your own logic)
        console.log('Comment submitted:', commentData);
        
        // Clear form
        this.reset();
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'comment-success';
        successMessage.textContent = 'Comment submitted successfully!';
        this.appendChild(successMessage);
        
        setTimeout(() => {
          successMessage.remove();
        }, 3000);
      });
    });
  }

  // Initialize related posts
  function initRelatedPosts() {
    const relatedPostsContainer = document.querySelector('.related-posts');
    if (relatedPostsContainer) {
      // Add your related posts logic here
      // This could involve fetching posts with similar tags or categories
    }
  }

  // Initialize reading time calculator
  function initReadingTime() {
    const posts = document.querySelectorAll('.blog-posts .post');
    posts.forEach(post => {
      const content = post.querySelector('.post-content');
      if (content) {
        const text = content.textContent;
        const wordCount = text.split(' ').length;
        const readingTime = Math.ceil(wordCount / 200); // Average reading speed
        
        const readingTimeElement = document.createElement('span');
        readingTimeElement.className = 'reading-time';
        readingTimeElement.textContent = `${readingTime} min read`;
        
        const postMeta = post.querySelector('.post-meta');
        if (postMeta) {
          postMeta.appendChild(readingTimeElement);
        }
      }
    });
  }

  // Initialize lazy loading for images
  function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }

  // Initialize theme switcher
  function initThemeSwitcher() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        
        // Save theme preference
        const isLightTheme = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
      });
      
      // Load saved theme preference
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
      }
    }
  }

  // Initialize all blogspot specific functions
  function initBlogspotFeatures() {
    initBlogPosts();
    initSidebarWidgets();
    initPagination();
    initSocialShare();
    initSearch();
    initComments();
    initRelatedPosts();
    initReadingTime();
    initLazyLoading();
    initThemeSwitcher();
  }

  // Initialize when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlogspotFeatures);
  } else {
    initBlogspotFeatures();
  }

  // Initialize when window is loaded
  window.addEventListener('load', function() {
    // Additional initialization after all resources are loaded
    console.log('Blogspot Strategy Theme loaded successfully!');
  });

})(); 