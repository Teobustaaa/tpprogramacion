
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  

  setTimeout(() => {
    loader.classList.add("hidden");
  }, 1000);
});


document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", e => {
    if (link.hostname === window.location.hostname && link.getAttribute("href") && !link.href.includes("#")) {
      e.preventDefault();
      document.getElementById("loader").classList.remove("hidden");
      setTimeout(() => {
        window.location.href = link.href;
      }, 500);
    }
  });
});
