document.addEventListener("DOMContentLoaded", () => {
  const closeButtons = document.querySelectorAll(".flash-close");
  closeButtons.forEach(button => {
    button.addEventListener("click", () => {
      button.parentElement.style.display = "none";
    });
  });
});
