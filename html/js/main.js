// Main JS - Mobile Menu + Dropdown Handler
document.addEventListener('DOMContentLoaded', function() {
  
  // Mobile menu toggle
  const menuTitles = document.querySelectorAll('.menu-title');
  menuTitles.forEach(title => {
    title.addEventListener('click', function(e) {
      e.stopPropagation();
      const dropdown = this.nextElementSibling;
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
  });

  // Close dropdown when click outside
  document.addEventListener('click', function() {
    document.querySelectorAll('.dropdown').forEach(dd => {
      dd.style.display = 'none';
    });
  });

  // Touch device support
  if ('ontouchstart' in window) {
    document.querySelectorAll('button, .btn, .cart-btn').forEach(btn => {
      btn.style.minHeight = '44px';
    });
  }
});
