/* global hljs */
/* eslint-disable no-unused-vars */

// Initialize highlight.js
hljs.highlightAll();

// Copy code functionality with better feedback
function copyCode(btn) {
  const code = btn.nextElementSibling.querySelector('code').innerText;
  
  navigator.clipboard.writeText(code).then(() => {
    const icon = btn.querySelector('i');
    const originalClass = icon.className;
    const originalText = btn.innerHTML;

    // Change to success state
    btn.innerHTML = '<i class="fa-solid fa-check"></i> コピー完了！';
    btn.style.background = 'rgba(72, 187, 120, 0.2)';
    btn.style.color = '#38a169';
    btn.style.borderColor = 'rgba(72, 187, 120, 0.3)';
    
    // Reset after 2 seconds
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.style.color = '';
      btn.style.borderColor = '';
    }, 2000);
  }).catch(() => {
    // Fallback for browsers without clipboard API
    const icon = btn.querySelector('i');
    btn.innerHTML = '<i class="fa-solid fa-exclamation-triangle"></i> エラー';
    btn.style.background = 'rgba(229, 62, 62, 0.2)';
    btn.style.color = '#e53e3e';
    
    setTimeout(() => {
      btn.innerHTML = '<i class="fa-solid fa-copy"></i>';
      btn.style.background = '';
      btn.style.color = '';
    }, 2000);
  });
}

// Smooth scroll to top
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll for all anchor links
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  
  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Add scroll progress indicator
  createScrollProgress();
  
  // Add intersection observer for animations
  observeElements();
  
  // Add loading animation to code blocks
  animateCodeBlocks();
});

// Create scroll progress indicator
function createScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', updateScrollProgress);
}

// Update scroll progress
function updateScrollProgress() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (progressBar) {
    progressBar.style.width = scrolled + '%';
  }
}

// Observe elements for animations
function observeElements() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe concept cards
  document.querySelectorAll('.concept-card').forEach(card => {
    observer.observe(card);
  });
  
  // Observe method sections
  document.querySelectorAll('.how-to_method_add, .how-to_method_keys, .how-to_method_foreach, .how-to_method_exists, .how-to_property_item').forEach(section => {
    observer.observe(section);
  });
}

// Animate code blocks on load
function animateCodeBlocks() {
  const codeBlocks = document.querySelectorAll('.code-block');
  
  codeBlocks.forEach((block, index) => {
    block.style.opacity = '0';
    block.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      block.style.transition = 'all 0.6s ease';
      block.style.opacity = '1';
      block.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
  // Press 'T' to scroll to top
  if (e.key === 't' || e.key === 'T') {
    if (!e.ctrlKey && !e.altKey && !e.metaKey) {
      e.preventDefault();
      document.querySelector('#page-top').scrollIntoView({
        behavior: 'smooth'
      });
    }
  }
});

// Add copy button hover effects
document.addEventListener('DOMContentLoaded', function() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  
  copyButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-1px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
});
