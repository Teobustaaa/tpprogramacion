// loader.js
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  
  // Mostramos el loader 1s antes de ocultarlo
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 1000); // 1 segundo, ajustá a tu gusto
});

// Vuelve a mostrar loader al navegar entre páginas internas
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", e => {
    if (link.hostname === window.location.hostname && link.getAttribute("href") && !link.href.includes("#")) {
      e.preventDefault();
      document.getElementById("loader").classList.remove("hidden");
      setTimeout(() => {
        window.location.href = link.href;
      }, 500); // Delay para ver la animación
    }
  });
});
