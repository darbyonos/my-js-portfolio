// Mobile Navbar Toggle
    const menuBtn = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuBtn && navMenu) {
      menuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-open');
        const icon = menuBtn.querySelector('.material-symbols-outlined');
        if (icon) {
          icon.textContent = navMenu.classList.contains('mobile-open') ? 'close' : 'menu';
        }
      });

      // Close menu on link click
      const navLinks = navMenu.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('mobile-open');
          const icon = menuBtn.querySelector('.material-symbols-outlined');
          if (icon) icon.textContent = 'menu';
        });
      });
    }

    // Active Navigation state indicator on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset + 120;
      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop;
        const sectionId = current.getAttribute('id');
        const targetLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);
        
        if (targetLink) {
          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(el => el.classList.remove('active'));
            targetLink.classList.add('active');
          }
        }
      });
    });

    // Handle Contact Form Submission
    const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const submitButton = contactForm.querySelector(
    'button[type="submit"]'
  );

  submitButton.disabled = true;

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: {
        Accept: "application/json"
      }
    });

    if (response.ok) {
      contactForm.reset();
      alert("Your message has been sent successfully!");
    } else {
      alert("Message could not be sent. Please try again.");
    }
  } catch (error) {
    alert("Something went wrong. Please check your internet connection.");
  } finally {
    submitButton.disabled = false;
  }
});