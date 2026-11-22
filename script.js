'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. CONFIGURACIÓN CENTRALIZADA
  // ==========================================
  // Reemplaza con tu número real en formato internacional (código país + número, sin '+' ni espacios)
  // Ejemplo Venezuela: 584121234567 | México: 5215512345678 | Colombia: 573001234567
  const CONFIG = {
    whatsappNumber: '584123414846',
    defaultMessage: 'Hola, vi tu portafolio web y me gustaría cotizar un proyecto.'
  };

  // ==========================================
  // 2. ENLACE DEL BOTÓN FLOTANTE DE WHATSAPP
  // ==========================================
  const whatsappFloatBtn = document.getElementById('whatsappFloat');
  if (whatsappFloatBtn) {
    const encodedDefaultMsg = encodeURIComponent(CONFIG.defaultMessage);
    whatsappFloatBtn.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedDefaultMsg}`;
  }

  // ==========================================
  // 3. MENÚ RESPONSIVO MÓVIL
  // ==========================================
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      navLinks.classList.toggle('active');
    });

    // Cerrar menú automáticamente al hacer clic en un enlace
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ==========================================
  // 4. FILTRO DE PROYECTOS DEL PORTAFOLIO
  // ==========================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Actualizar estado activo de botones
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || filterValue === cardCategory) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  // ==========================================
  // 5. VALIDACIÓN Y ENVÍO DE FORMULARIO A WHATSAPP
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('clientName');
  const typeSelect = document.getElementById('projectType');
  const detailsInput = document.getElementById('projectDetails');
  const nameError = document.getElementById('nameError');
  const detailsError = document.getElementById('detailsError');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Limpiar errores previos
      nameError.textContent = '';
      detailsError.textContent = '';

      const clientName = nameInput.value.trim();
      const projectType = typeSelect.value;
      const projectDetails = detailsInput.value.trim();

      // Validación básica de seguridad y calidad de datos
      if (clientName.length < 2) {
        nameError.textContent = 'Por favor, ingresa tu nombre (mínimo 2 caracteres).';
        isValid = false;
      }

      if (projectDetails.length < 10) {
        detailsError.textContent = 'Describe brevemente tu proyecto (mínimo 10 caracteres).';
        isValid = false;
      }

      if (!isValid) return;

      // Construcción segura del mensaje estructurado para WhatsApp
      const formattedMessage = 
        `Hola, te contacto desde tu Portafolio Web.\n\n` +
        `*Nombre/Empresa:* ${clientName}\n` +
        `*Tipo de Proyecto:* ${projectType}\n` +
        `*Detalles:* ${projectDetails}`;

      const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(formattedMessage)}`;
      
      // Abrir WhatsApp en nueva pestaña de forma segura
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      contactForm.reset();
    });
  }

  // ==========================================
  // 6. AÑO DINÁMICO EN EL FOOTER
  // ==========================================
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});