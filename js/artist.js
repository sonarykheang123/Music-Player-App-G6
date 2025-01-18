document.addEventListener("DOMContentLoaded", () => {
    const cardContainers = document.querySelectorAll('.card-container');
    const section = document.querySelector('.name-singer');
    
    cardContainers.forEach(container => {
        container.addEventListener('wheel', (event) => {
            event.preventDefault(); // Prevent vertical scroll
            container.scrollLeft += event.deltaY * 2; // Adjust speed by changing the multiplier (2)
            section.addEventListener('wheel', (event) => {
                event.preventDefault(); // Prevent vertical scroll
                section.scrollLeft += event.deltaY * 2; // Adjust speed by changing the multiplier (2)
            });
        });
    });
});