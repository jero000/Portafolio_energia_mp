// Cursor Personalizado
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.custom-cursor-dot');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Cursor dot sigue inmediatamente
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

// Animación suave para el cursor principal con requestAnimationFrame
function animateCursor() {
    // Interpolación suave con menor delay
    cursorX += (mouseX - cursorX) * 0.3;
    cursorY += (mouseY - cursorY) * 0.3;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Expandir cursor en hover de elementos interactivos
document.querySelectorAll('a, button, .service-card, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('expand');
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('expand');
    });
});

// Canvas de Partículas Animadas
const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Hide custom cursor on touch devices
function isTouchDevice() {
    return ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
}
if (isTouchDevice()) {
    document.querySelectorAll('.custom-cursor, .custom-cursor-dot').forEach(n => n.style.display = 'none');
    document.body.style.cursor = 'auto';
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.2;
        // Colores dorados elegantes
        const colors = ['212, 175, 55', '255, 215, 0', '184, 134, 11'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.color = `rgba(${randomColor}, ${this.opacity})`;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width || this.x < 0) {
            this.speedX *= -1;
        }
        
        if (this.y > canvas.height || this.y < 0) {
            this.speedY *= -1;
        }
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particles = [];
for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    // Conectar partículas cercanas
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
                if (distance < 100) {
                ctx.strokeStyle = `rgba(212, 175, 55, ${0.2 - distance / 500})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    
    requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Mobile Menu Toggle (click + keyboard)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    const toggleMenu = () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('open');
    };

    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('open');
        });
    });
}

// Button ripple effect for CTAs
function createButtonRipple(e) {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = (e.clientX - rect.left) + 'px';
    ripple.style.top = (e.clientY - rect.top) + 'px';
    ripple.style.background = 'rgba(255,255,255,0.15)';
    ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 800);
}

document.querySelectorAll('.btn').forEach(b => {
    b.addEventListener('click', createButtonRipple);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Counter Animation mejorado
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 100);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.textContent.includes('K') ? 'K+' : '');
            // Efecto de celebración al completar
            element.style.animation = 'pulse 0.5s ease';
        }
    };

    updateCounter();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            
            // Animate counters
            if (entry.target.classList.contains('stats')) {
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    if (!counter.classList.contains('animated')) {
                        animateCounter(counter);
                        counter.classList.add('animated');
                    }
                });
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Observe cards
document.querySelectorAll('.service-card, .testimonial-card, .highlight-card').forEach(card => {
    observer.observe(card);
});

// Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const empresa = document.getElementById('empresa').value;
    const mensaje = document.getElementById('mensaje').value;
    
    // Crear mensaje para WhatsApp
    const whatsappMessage = `¡Hola! 👋\n\nNombre: ${nombre}\nEmail: ${email}\nEmpresa: ${empresa}\n\nMensaje:\n${mensaje}`;
    
    // Encode para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Mostrar modal de confirmación antes de abrir WhatsApp
    showWhatsAppConfirm(whatsappMessage, () => {
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
        // Limpiar formulario
        contactForm.reset();
        // Mensaje de confirmación
        setTimeout(() => {
            alert('¡Gracias por contactarme! Te redirigiremos a WhatsApp.');
        }, 200);
    });
});

// Smooth scroll para todos los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax mejorado con múltiples capas
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroCard = document.querySelector('.hero-card');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    if (heroCard) {
        heroCard.style.transform = `translateY(${scrolled * 0.2}px) rotate(${scrolled * 0.05}deg)`;
    }
});

// Scroll Reveal para elementos
const scrollReveal = () => {
    const reveals = document.querySelectorAll('.service-card, .project-card, .testimonial-card, .highlight-card');
    
    reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', scrollReveal);

// Efecto de tilt 3D en tarjetas de proyecto
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Efecto de ondas en el hero
const createRipple = (e) => {
    const hero = document.querySelector('.hero');
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    hero.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 1000);
};

document.querySelector('.hero')?.addEventListener('click', createRipple);

// Add active class to nav items based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
});

// Add hover effect to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Lazy loading for images (if you add images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add fade-in animation on scroll
const fadeElements = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize on page load
window.addEventListener('load', () => {
    // Add any initialization code here
    console.log('Portfolio loaded successfully! 🚀');
    
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
});

// ============================================
// CHATBOT DE IA
// ============================================

const aiFloatBtn = document.getElementById('aiFloatBtn');
const aiChatContainer = document.getElementById('aiChatContainer');
const aiCloseBtn = document.getElementById('aiCloseBtn');
const aiChatInput = document.getElementById('aiChatInput');
const aiSendBtn = document.getElementById('aiSendBtn');
const aiChatMessages = document.getElementById('aiChatMessages');
const quickQuestionBtns = document.querySelectorAll('.quick-question-btn');

// Número de WhatsApp unificado (incluye código de país)
const WHATSAPP_NUMBER = '573113885827';

// Modal de confirmación: elementos y funciones
const waConfirmModal = document.getElementById('waConfirmModal');
const waModalPreview = document.getElementById('waModalPreview');
const waConfirmBtn = document.getElementById('waConfirmBtn');
const waCancelBtn = document.getElementById('waCancelBtn');
const waModalOverlay = document.getElementById('waModalOverlay');
let _waPendingCallback = null;

function closeWhatsAppModal() {
    if (!waConfirmModal) return;
    waConfirmModal.setAttribute('aria-hidden', 'true');
    waModalPreview.textContent = '';
    _waPendingCallback = null;
}

function showWhatsAppConfirm(plainMessage, onConfirm) {
    if (!waConfirmModal) {
        // Fallback directo si el modal no existe
        if (typeof onConfirm === 'function') onConfirm();
        return;
    }
    waModalPreview.textContent = plainMessage;
    _waPendingCallback = onConfirm;
    waConfirmModal.setAttribute('aria-hidden', 'false');
    // focus en boton confirmar para accesibilidad
    waConfirmBtn.focus();
}

// Listeners del modal
if (waConfirmBtn) {
    waConfirmBtn.addEventListener('click', () => {
        if (typeof _waPendingCallback === 'function') _waPendingCallback();
        closeWhatsAppModal();
    });
}

if (waCancelBtn) {
    waCancelBtn.addEventListener('click', () => {
        closeWhatsAppModal();
    });
}

if (waModalOverlay) {
    waModalOverlay.addEventListener('click', () => closeWhatsAppModal());
}

// Base de conocimiento de energia_mp
const knowledgeBase = {
    servicios: {
        keywords: ['servicio', 'servicios', 'ofrece', 'ofrecen', 'qué hace', 'que hace'],
        response: `¡Excelente pregunta! 🎯 energia_mp ofrece servicios profesionales de Community Manager:

• 📱 Gestión completa de redes sociales
• 💡 Estrategia de contenido personalizado
• 📊 Análisis y reportes detallados
• 💬 Community management activo
• 🎨 Producción de contenido visual
• 📈 Publicidad digital (Facebook, Instagram, Google Ads)

Cada servicio está diseñado para impulsar tu marca y generar resultados reales. ¿Te interesa algún servicio en particular?`
    },
    experiencia: {
        keywords: ['experiencia', 'años', 'trayectoria', 'cuanto tiempo', 'cuánto tiempo'],
        response: `¡Con una experiencia impresionante! ⭐

📊 Actualmente gestiono más de 22 empresas de manera simultánea
🏆 Posicionada como una de las CM más solicitadas del oriente
📈 Resultados comprobables: +150% engagement promedio
💼 Trabajo con las mejores empresas de la región

Sectores atendidos: restaurantes, salud, retail, tecnología, belleza, educación, automotriz, inmobiliaria y más.`
    },
    empresas: {
        keywords: ['empresa', 'empresas', 'cliente', 'clientes', 'proyecto', 'proyectos', 'portafolio'],
        response: `¡Trabajo con marcas increíbles! 🌟

Algunos clientes destacados:
🍗 Alitas House - Restaurante (+80K)
🦷 Espident & Panorama Dental - Clínicas (+50K)
🚗 Autostart - Automotriz (+30K)
⭐ Mi Mundo Mágico - Centro Infantil (+40K)
💻 Clickgoo - domicilios (+60K)
👩🏻‍🍼 KidsSpa - Peluquería, Spa infantil y Familiar (+57k)

Y +16 empresas más en diversos sectores. Cada una con estrategias personalizadas y resultados medibles. 📊`
    },
    precios: {
        keywords: ['precio', 'precios', 'cuanto cuesta', 'cuánto cuesta', 'costo', 'inversión', 'paquete', 'paquetes'],
        response: `¡Me encantaría ayudarte! 💰

Los precios varían según las necesidades específicas de cada empresa:

✅ Análisis personalizado sin costo
✅ Paquetes flexibles adaptados a tu presupuesto
✅ Diferentes niveles de servicio
✅ Sin permanencia mínima

Para darte un presupuesto exacto, necesito conocer:
• Cantidad de redes a gestionar
• Frecuencia de publicaciones
• Servicios adicionales requeridos

¿Te gustaría agendar una reunión para discutir tu proyecto?`
    },
    contratar: {
        keywords: ['contratar', 'contrato', 'empezar', 'comenzar', 'iniciar', 'como trabajo', 'cómo trabajo'],
        response: `¡Es muy fácil comenzar! 🚀

Proceso de contratación:

1️⃣ Contacto inicial
   📱 WhatsApp o Instagram (@energia_mp)
   
2️⃣ Reunión de diagnóstico (GRATIS)
   📊 Analizamos tu marca y objetivos
   
3️⃣ Propuesta personalizada
   📝 Plan estratégico + precios
   
4️⃣ ¡Empezamos a trabajar!
   🎯 Implementación inmediata

¿Quieres que te contacte por WhatsApp para iniciar?`
    },
    contacto: {
        keywords: ['contacto', 'contactar', 'comunicar', 'hablar', 'whatsapp', 'teléfono', 'telefono', 'email', 'correo'],
        response: `¡Me encantaría hablar contigo! 📞

Puedes contactarme por:

📱 Instagram: @energia_mp
💬 WhatsApp: +57 3113885827
📍 Ubicación: Oriente, Colombia

Respondo rápido y con gusto resolveré todas tus dudas. ¿Prefieres que te contacte por WhatsApp?`
    },
    resultados: {
        keywords: ['resultado', 'resultados', 'funciona', 'éxito', 'exito', 'garantía', 'garantia'],
        response: `¡Los resultados hablan por sí solos! 📊

Métricas promedio de mis clientes:
📈 +150% incremento en engagement
👥 +200% aumento en alcance
💰 ROI positivo en 3 meses
⭐ 98% tasa de satisfacción

Cada proyecto incluye:
✅ Reportes mensuales detallados
✅ Análisis de métricas clave
✅ Ajustes estratégicos continuos
✅ Asesoría personalizada

¿Quieres ver casos de éxito específicos?`
    }
};

// Toggle chat
aiFloatBtn.addEventListener('click', () => {
    aiChatContainer.classList.toggle('active');
    if (aiChatContainer.classList.contains('active')) {
        aiFloatBtn.querySelector('.ai-badge').style.display = 'none';
        aiChatInput.focus();
    }
});

aiCloseBtn.addEventListener('click', () => {
    aiChatContainer.classList.remove('active');
});

// Enviar mensaje
function sendMessage() {
    const message = aiChatInput.value.trim();
    if (!message) return;
    
    // Agregar mensaje del usuario
    addMessage(message, 'user');
    aiChatInput.value = '';
    
    // Mostrar indicador de escritura
    showTypingIndicator();
    
    // Simular delay de respuesta (500-1500ms)
    setTimeout(() => {
        const response = getAIResponse(message);
        hideTypingIndicator();
        addMessage(response, 'bot');
    }, 800);
}

aiSendBtn.addEventListener('click', sendMessage);
aiChatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Botón separado: enviar por WhatsApp la entrada actual o la transcripción corta
const aiWhatsAppBtn = document.getElementById('aiWhatsAppBtn');
if (aiWhatsAppBtn) {
    aiWhatsAppBtn.addEventListener('click', () => {
        const raw = aiChatInput.value.trim();
        let waMsg = '';

        if (raw) {
            waMsg = `Mensaje desde chat: ${raw}`;
        } else {
            // Si no hay texto en el input, tomar los últimos mensajes visibles (hasta 6)
            const msgs = Array.from(aiChatMessages.querySelectorAll('.ai-message'))
                .slice(-6)
                .map(m => {
                    const role = m.classList.contains('ai-message-user') ? 'Usuario' : 'Asistente';
                    const txt = m.querySelector('.ai-message-content')?.innerText.trim() || '';
                    return `${role}: ${txt}`;
                })
                .filter(Boolean);
            waMsg = `Transcripción breve del chat:\n\n${msgs.join('\n\n')}`;
        }

        // Mostrar confirmación antes de abrir WhatsApp
        showWhatsAppConfirm(waMsg, () => {
            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg)}`, '_blank');
        });
    });
}

// Preguntas rápidas
quickQuestionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const question = btn.getAttribute('data-question');
        aiChatInput.value = question;
        sendMessage();
    });
});

// Agregar mensaje al chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${sender === 'user' ? 'ai-message-user' : 'ai-message-bot'}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'ai-avatar';
    avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
    
    const content = document.createElement('div');
    content.className = 'ai-message-content';
    content.innerHTML = `<p>${text.replace(/\n/g, '<br>')}</p>`;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    aiChatMessages.appendChild(messageDiv);
    
    // Scroll al final
    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
}

// Indicador de escritura
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'ai-message ai-message-bot typing-indicator';
    typingDiv.innerHTML = `
        <div class="ai-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="ai-message-content">
            <div class="ai-typing">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    aiChatMessages.appendChild(typingDiv);
    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = aiChatMessages.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// IA - Generar respuesta basada en palabras clave
function getAIResponse(message) {
    const messageLower = message.toLowerCase();
    
    // Buscar en la base de conocimiento
    for (const [category, data] of Object.entries(knowledgeBase)) {
        if (data.keywords.some(keyword => messageLower.includes(keyword))) {
            return data.response;
        }
    }
    
    // Respuesta por defecto
    return `Gracias por tu mensaje. 😊

Para ayudarte mejor, puedo responder preguntas sobre:

• Servicios de Community Manager
• Experiencia y trayectoria
• Empresas y proyectos
• Precios y paquetes
• Proceso de contratación
• Formas de contacto
• Resultados y casos de éxito

¿Sobre qué te gustaría saber más? O si prefieres, puedo conectarte directamente por WhatsApp para una atención personalizada. 📱`;
}

