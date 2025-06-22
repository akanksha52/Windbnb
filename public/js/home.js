document.addEventListener('DOMContentLoaded', () => 
{ 
    const cards=document.querySelectorAll('.card');
    cards.forEach(card => 
    {
        card.addEventListener('click', (e) => 
        {
            if(e.target.closest('.card-buttons')) return;
            const href = card.getAttribute('data-href');
            if(href) window.location.href = href;
        });
        card.addEventListener('keydown', (e) => 
        {
            if(e.key==='Enter' || e.key===' ') 
            {
                e.preventDefault();
                const href=card.getAttribute('data-href');
                if(href) 
                {
                    window.location.href=href;
                }
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
  const closeButtons = document.querySelectorAll(".flash-close");
  closeButtons.forEach(button => {
    button.addEventListener("click", () => {
      button.parentElement.style.display = "none";
    });
  });
});
