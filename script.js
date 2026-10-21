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
  // Handle Contact Form Submission
const contactForm = document.getElementById("contactForm");
const submitButton = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatusNotice");

contactForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  // Save the original button content
  const originalButtonContent = submitButton.innerHTML;

  // Show loading state
  submitButton.disabled = true;
  submitButton.innerHTML = `
    <span class="loading-spinner" aria-hidden="true"></span>
    <span>Sending...</span>
  `;

  // Update status message
  formStatus.className = "form-status-notice";
  formStatus.textContent = "Sending your message...";
  formStatus.style.display = "block";

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: {
        Accept: "application/json"
      }
    });

    if (response.ok) {
      // Clear the form after successful submission
      contactForm.reset();

      formStatus.className = "form-status-notice success";
      formStatus.textContent = "✓ Message sent successfully! Thank you for reaching out.";

      submitButton.innerHTML = `
        <span>Message Sent!</span>
        <span class="material-symbols-outlined" style="font-size:18px;">check_circle</span>
      `;

      // Restore the original button after 2 seconds
      setTimeout(() => {
        submitButton.innerHTML = originalButtonContent;
      }, 2000);

    } else {
      throw new Error("Submission failed");
    }

  } catch (error) {
    formStatus.className = "form-status-notice error";
    formStatus.textContent =
      "✕ Message could not be sent. Please check your connection and try again.";

    // Keep the user's message so they don't have to type it again
    submitButton.innerHTML = originalButtonContent;

  } finally {
    submitButton.disabled = false;
  }
});
