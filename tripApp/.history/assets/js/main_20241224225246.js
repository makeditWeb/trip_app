function toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function selectOption(option) {
    document.querySelector('.dropdown-header').textContent = option + ' <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.49935 6.27086L12.1902 0.5L13 1.31854L6.90164 7.5H6.09444L0 1.31854L0.8085 0.5L6.49935 6.27086Z" fill="#31A2AC"/></svg>';
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