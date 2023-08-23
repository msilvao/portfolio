function loadContent(page) {
  const content = document.getElementById("content");
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      content.innerHTML = this.responseText;
    }
  };

  xhr.open("GET", page, true);
  xhr.send();
}

document.addEventListener("DOMContentLoaded", () => {
  // LOAD INITIAL PAGE CONTENT
  loadContent("inicio.html");

  // ADD CLICK EVENTS TO SIDEBAR LINKS
  const sidebarLinks = document.querySelectorAll(".sidebar a");
  sidebarLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const page = link.getAttribute("href");
      loadContent(page);
      history.pushState({ page }, null, page); // ADD PAGE STATE TO BROWSER HISTORY
    });
  });

  // ADD POPSTATE EVENT TO USE PREVIOUS BROWSER BUTTON
  window.addEventListener("popstate", event => {
    const page = event.state.page;
    loadContent(page);
  });
});