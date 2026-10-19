function toggleMenuLateral() {
    var container = document.getElementById('menuContainer');
    var toggleButton = document.getElementById('btn-toggle-menu');

    if (container && toggleButton) {
        var isOpen = container.classList.toggle('aberto');
        toggleButton.setAttribute('aria-expanded', String(isOpen));

        // Reapply the feedback on every tap, including quick repeated taps.
        toggleButton.classList.remove('menu-button-pressed');
        void toggleButton.offsetWidth;
        toggleButton.classList.add('menu-button-pressed');
        window.setTimeout(function () {
            toggleButton.classList.remove('menu-button-pressed');
        }, isOpen ? 400 : 200);
    }
}

document.addEventListener('DOMContentLoaded', () => {
  var card = document.querySelector('.notification-card');

  if (card) {
    card.addEventListener('click', function () {
      card.classList.toggle('expanded');
    });
  }

  // Fechar menu quando selecionar um item
  var menuButtons = document.querySelectorAll('.btn-menu');
  var menuContainer = document.getElementById('menuContainer');
  var toggleButton = document.getElementById('btn-toggle-menu');
  
  menuButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      if (menuContainer) {
        menuContainer.classList.remove('aberto');
      }
    });
  });

  // Close the menu when the user taps or clicks anywhere outside of it.
  document.addEventListener('pointerdown', function(event) {
    if (!menuContainer || !menuContainer.classList.contains('aberto')) return;

    var clickedInsideMenu = menuContainer.contains(event.target);
    var clickedToggleButton = toggleButton && toggleButton.contains(event.target);

    if (!clickedInsideMenu && !clickedToggleButton) {
      menuContainer.classList.remove('aberto');
      if (toggleButton) toggleButton.setAttribute('aria-expanded', 'false');
    }
  });
});

function casa() {
    var home = document.querySelector('.home');
    var correspondencia = document.querySelector('.correspondencia');

    if (home) {
        home.style.display = 'none';
    }

    if (correspondencia) {
        correspondencia.style.display = 'flex';
    }
}

function voltarHome() {
    var home = document.querySelector('.home');
    var correspondencia = document.querySelector('.correspondencia');

    if (home) {
        home.style.display = 'flex';
    }

    if (correspondencia) {
        correspondencia.style.display = 'none';
    }
}

window.casa = casa;
window.voltarHome = voltarHome;
