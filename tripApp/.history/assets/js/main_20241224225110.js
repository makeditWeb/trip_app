function toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function selectOption(option) {
    document.querySelector('.dropdown-header').textContent = option + ' ▼';
    document.getElementById("myDropdown").classList.remove("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropdown-header')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}