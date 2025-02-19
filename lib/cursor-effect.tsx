// Create a file called cursor-effect.js in your project

export function initCursorEffect() {
    // Early return if not in browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Get context
    const ctx = canvas.getContext('2d');
    
    // Particle class
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.life = 100;
        this.color = this.getRandomColor();
      }
      
      getRandomColor() {
        const colors = [
          'rgba(255, 255, 255, ',
          'rgba(192, 192, 192, ',
          'rgba(220, 220, 220, ',
          'rgba(245, 245, 245, ',
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 2;
        if (this.size > 0.2) this.size -= 0.1;
      }
      
      draw() {
        ctx.fillStyle = this.color + (this.life / 100) + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Initialize particles array
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    let createParticleInterval;
    
    // Mouse move event
    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Create particles when mouse moves
      clearInterval(createParticleInterval);
      
      // Create initial burst
      for (let i = 0; i < 10; i++) {
        particles.push(new Particle(mouseX, mouseY));
      }
      
      // Continue creating particles for a short time
      createParticleInterval = setInterval(() => {
        particles.push(new Particle(mouseX, mouseY));
      }, 50);
      
      // Stop creating particles after a short time
      setTimeout(() => {
        clearInterval(createParticleInterval);
      }, 200);
    };
    
    window.addEventListener('mousemove', onMouseMove);
    
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // Remove dead particles
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }
      
      requestAnimationFrame(animate);
    }
    
    animate();
    
    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      document.body.removeChild(canvas);
      clearInterval(createParticleInterval);
    };
  }