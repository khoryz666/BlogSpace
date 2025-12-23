// main.js
// This file holds frontend logic for both index.html and post.html.
// For now it does very simple things. Later we will add real API calls.

// ---- Utility functions ----

/**
 * Get the current year and insert it into all <span id="year"> elements.
 */
function setCurrentYear() {
    const yearSpans = document.querySelectorAll("#year");
    const year = new Date().getFullYear();
    yearSpans.forEach((span) => {
      span.textContent = year;
    });
  }
  
  /**
   * Get the current language from the URL.
   * For now we use a query parameter: ?lang=en
   * Default is "en".
   */
  function getCurrentLanguage() {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lang") || "en";
    return lang;
  }
  
  /**
   * Update the URL to switch language.
   * Keeps other query parameters like slug if present.
   */
  function switchLanguage(newLang) {
    const params = new URLSearchParams(window.location.search);
    params.set("lang", newLang);
  
    // Reload the page with the new lang parameter.
    window.location.search = params.toString();
  }
  
  /**
   * Attach click handlers to language buttons in the header.
   * Buttons are expected to have data-lang attributes.
   */
  function setupLanguageButtons() {
    const buttons = document.querySelectorAll(".lang-switcher button");
    const currentLang = getCurrentLanguage();
  
    buttons.forEach((btn) => {
      const btnLang = btn.getAttribute("data-lang");
  
      // Highlight the currently selected language (simple style change).
      if (btnLang === currentLang) {
        btn.style.backgroundColor = "#4b5563"; // darker gray
      }
  
      btn.addEventListener("click", () => {
        switchLanguage(btnLang);
      });
    });
  }
  
  // ---- Page-specific logic ----
  
  /**
   * Logic for the index (home) page:
   * - In the future: fetch list of posts from backend.
   * - For now: show a placeholder post card.
   */
  function initIndexPage() {
    const postList = document.getElementById("post-list");
    if (!postList) return; // If this element doesn't exist, we are not on index.html
  
    const lang = getCurrentLanguage();
  
    // Placeholder content for now.
    // Later, we'll replace this with data from Go backend using fetch().
    postList.innerHTML = `
      <div class="post-card">
        <h2>Sample post (static for now)</h2>
        <p>This is a placeholder. Later, this list will come from the Go backend for lang = <strong>${lang}</strong>.</p>
        <a href="post.html?lang=${lang}&slug=hello-world">Read more</a>
      </div>
    `;
  }
  
  /**
   * Logic for the post page:
   * - In the future: fetch a single post from backend.
   * - For now: show a placeholder based on slug and lang.
   */
  function initPostPage() {
    const postContainer = document.getElementById("post-container");
    if (!postContainer) return; // If this element doesn't exist, we are not on post.html
  
    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lang") || "en";
    const slug = params.get("slug") || "hello-world";
  
    // Placeholder content.
    // Later, we will call the backend: /api/posts/{lang}/{slug}
    postContainer.innerHTML = `
      <h2>Post: ${slug}</h2>
      <p>Language: <strong>${lang}</strong></p>
      <p>This is placeholder content for the post page. Eventually this HTML will be loaded from the Go backend.</p>
    `;
  }
  
  // ---- Entry point ----
  
  document.addEventListener("DOMContentLoaded", () => {
    setCurrentYear();
    setupLanguageButtons();
    initIndexPage();
    initPostPage();
  });