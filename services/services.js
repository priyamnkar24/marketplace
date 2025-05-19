document.addEventListener('DOMContentLoaded', () => {
  // Theme detection and application
  function applyTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.classList.toggle('dark', prefersDark);
    document.body.classList.toggle('light', !prefersDark);
  }

  // Apply theme initially and listen for changes
  applyTheme();
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
});