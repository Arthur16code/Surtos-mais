function toggleMenuLateral() {
    var container = document.getElementById('menuContainer');
    if (container) {
        container.classList.toggle('aberto');
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
  
  menuButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      if (menuContainer) {
        menuContainer.classList.remove('aberto');
      }
    });
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