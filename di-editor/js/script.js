 // Simplified JavaScript code
      document.addEventListener('DOMContentLoaded', function() {
        // Elements
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        const dropdowns = document.querySelectorAll('.dropdown');
        const tabs = document.querySelectorAll('.tab');
        const qaButtons = document.querySelectorAll('.qa .q');
        const featureCards = document.querySelectorAll('.feature');
        const popupModal = document.getElementById('popupModal');
        const popupClose = document.getElementById('popupClose');
        const popupBody = document.getElementById('popupBody');
        const aiChatBtn = document.getElementById('aiChatBtn');
        const aiChatModal = document.getElementById('aiChatModal');
        const aiChatInput = document.getElementById('aiChatInput');
        const aiChatSend = document.getElementById('aiChatSend');
        const aiChatMessages = document.getElementById('aiChatMessages');
        
        // Feature content for popups
        const featureContent = {
          performance: {
            title: "Instant Performance",
            content: "Our editor uses advanced rendering techniques and smart caching to deliver native-like performance in your browser. Code compiles in milliseconds, and the interface remains responsive even with large files."
          },
          collaboration: {
            title: "Live Collaboration",
            content: "Work simultaneously with team members. See cursors in real-time, track changes instantly, and communicate through integrated chat. No setup required - just share a link and start coding together."
          },
          ai: {
            title: "AI Assist",
            content: "Get intelligent code suggestions, automated refactoring, and contextual explanations. Our AI understands your codebase and helps you write better code faster with fewer errors."
          },
          extensions: {
            title: "Extensions",
            content: "Customize your editor with our extensive extension library. Add language support, themes, linters, and specialized tools through our lightweight API that won't slow down your editor."
          },
          privacy: {
            title: "Private by Default",
            content: "Your code stays on your device unless you choose to share it. We use end-to-end encryption for all shared projects and never access your code without permission."
          },
          shortcuts: {
            title: "Pro Shortcuts",
            content: "Work at expert speed with our comprehensive keyboard shortcut system. Customize keys, create macros, and navigate your codebase without ever touching the mouse."
          }
        };
        
        // Initialize reveal on scroll
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                e.target.classList.add("show");
                io.unobserve(e.target);
              }
            });
          },
          { threshold: 0.12 }
        );
        document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
        
        // Toggle mobile navigation
        hamburger.addEventListener('click', () => {
          navLinks.classList.toggle('active');
          hamburger.classList.toggle('active');
        });
        
        // Toggle dropdown on mobile
        dropdowns.forEach(dropdown => {
          dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
              e.preventDefault();
              this.classList.toggle('active');
            }
          });
        });
        
        // Close menu when clicking outside on mobile
        document.addEventListener('click', (e) => {
          if (window.innerWidth <= 768 && 
              !e.target.closest('.nav-links') && 
              !e.target.closest('.hamburger')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            
            dropdowns.forEach(dropdown => {
              dropdown.classList.remove('active');
            });
          }
        });
        
        // Tabs functionality
        tabs.forEach(t => {
          t.addEventListener('click', () => {
            tabs.forEach(x => x.classList.remove('active'));
            document.querySelectorAll('.pane').forEach(p => p.classList.remove('active'));
            t.classList.add('active');
            document.getElementById('pane-' + t.dataset.tab).classList.add('active');
          });
        });
        
        // FAQ accordion
        qaButtons.forEach(q => {
          q.addEventListener('click', () => q.parentElement.classList.toggle('open'));
        });
        
        // Feature card popups
        featureCards.forEach((card, index) => {
          const featureKey = Object.keys(featureContent)[index];
          card.addEventListener('click', () => {
            const content = featureContent[featureKey];
            popupBody.innerHTML = `<h3>${content.title}</h3><p>${content.content}</p>`;
            popupModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
          });
        });
        
        // Close popup
        popupClose.addEventListener('click', closePopup);
        popupModal.addEventListener('click', (e) => {
          if (e.target === popupModal) closePopup();
        });
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') closePopup();
        });
        
        function closePopup() {
          popupModal.style.display = 'none';
          document.body.style.overflow = 'auto';
        }
        
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
              const headerOffset = 70;
              const elementPosition = targetElement.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
              
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }
          });
        });
        
        // AI Chat functionality
        aiChatBtn.addEventListener('click', () => {
          aiChatModal.classList.toggle('active');
        });
        
        document.addEventListener('click', (e) => {
          if (aiChatModal.classList.contains('active') && 
              !aiChatModal.contains(e.target) && 
              !aiChatBtn.contains(e.target)) {
            aiChatModal.classList.remove('active');
          }
        });
        
        function sendMessage() {
          const message = aiChatInput.value.trim();
          if (message) {
            addMessage(message, 'user');
            aiChatInput.value = '';
            
            setTimeout(() => {
              let response = "I'm here to help with DI Editor. How can I assist you with your coding today?";
              
              if (message.toLowerCase().includes('feature') || message.toLowerCase().includes('what can')) {
                response = "DI Editor offers real-time collaboration, AI-assisted coding, extensions, and a distraction-free dark theme. What would you like to know more about?";
              } else if (message.toLowerCase().includes('collaboration') || message.toLowerCase().includes('team')) {
                response = "Our collaboration features allow you to code with teammates in real-time. You'll see each other's cursors, can chat, and merge changes without conflicts.";
              } else if (message.toLowerCase().includes('ai') || message.toLowerCase().includes('assist')) {
                response = "The AI assist feature provides intelligent code completion, explains complex code, suggests improvements, and helps you debug issues faster.";
              } else if (message.toLowerCase().includes('price') || message.toLowerCase().includes('cost')) {
                response = "DI Editor is free for individual use. Team plans with additional features start at $10 per user per month.";
              }
              
              addMessage(response, 'ai');
            }, 1000);
          }
        }
        
        function addMessage(text, type) {
          const messageElement = document.createElement('div');
          messageElement.classList.add('message', type);
          messageElement.textContent = text;
          aiChatMessages.appendChild(messageElement);
          aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
        }
        
        aiChatSend.addEventListener('click', sendMessage);
        aiChatInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') sendMessage();
        });
        
        // Canvas background animation
        const canvas = document.getElementById('bgCanvas');
        const ctx = canvas.getContext('2d');
        
        function resizeCanvas() {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        const particles = [];
        for (let i = 0; i < 50; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5,
            speed: Math.random() * 0.5 + 0.1,
            opacity: Math.random() * 0.5 + 0.1
          });
        }
        
        function drawParticles() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          particles.forEach(p => {
            p.y += p.speed;
            if (p.y > canvas.height) {
              p.y = 0;
              p.x = Math.random() * canvas.width;
            }
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 168, 232, ${p.opacity})`;
            ctx.fill();
          });
          
          requestAnimationFrame(drawParticles);
        }
        
        drawParticles();
        
        // Typewriter effect for hero code
        (function typeHero() {
          const pre = document.getElementById('codeBlock');
          const full = pre.innerHTML;
          const tmp = document.createElement('div');
          tmp.innerHTML = full;
          const walker = document.createTreeWalker(tmp, NodeFilter.SHOW_TEXT, null, false);
          const textNodes = [];
          while (walker.nextNode()) textNodes.push(walker.currentNode);
          const pieces = textNodes.map(n => n.nodeValue);
          
          let pieceIndex = 0, charIndex = 0;
          function step() {
            if (pieceIndex >= pieces.length) {
              pre.innerHTML = full;
              return;
            }
            const current = pieces[pieceIndex];
            charIndex++;
            if (charIndex > current.length) {
              pieceIndex++;
              charIndex = 0;
            }
            
            const clone = tmp.cloneNode(true);
            let count = 0;
            const w = document.createTreeWalker(clone, NodeFilter.SHOW_TEXT, null, false);
            while (w.nextNode()) {
              const len = w.currentNode.nodeValue.length;
              if (count < pieceIndex) {
                // keep whole
              } else if (count === pieceIndex) {
                w.currentNode.nodeValue = current.slice(0, Math.max(0, charIndex - 1));
              } else {
                w.currentNode.nodeValue = "";
              }
              count++;
            }
            pre.innerHTML = clone.innerHTML;
            setTimeout(step, Math.random() * 35 + 10);
          }
          step();
        })();
      });