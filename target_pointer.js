const lerp = (a, b, speed) => a + ((b - a) * speed);

class MagneticCursor {
  constructor(cursorQuery, attractorQuery) {
    this.target = {x: 0, y: 0};
    this.cursorPosition = {x: 0, y: 0};
    this.cursorSpeed = 0.35;
    this.animationFrame = null;
    
    this.renderCursorMovement.bind(this);
    
    this.cursor = document.querySelector(cursorQuery);
    console.log('Cursor', cursorQuery, this.cursor);
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    
    this.addAttractors(attractorQuery);
  }
  
  addAttractors(attractorQuery) {
    const attractors = document.querySelectorAll(attractorQuery);

    attractors.forEach((attractor) => {
      attractor.addEventListener('mouseenter', (e) => {
        this.cursor.classList.add('locked');

        const bounds = e.target.getBoundingClientRect();
        this.target.x = bounds.x + bounds.width / 2;
        this.target.y = bounds.y + bounds.height / 2;
      });
      attractor.addEventListener('mouseleave', (e) => {
        this.cursor.classList.remove('locked');
      });
    });
    
  }
  
  onMouseMove(e) {

    if (!this.cursor.classList.contains('locked')) {
      this.target.x = e.x;
      this.target.y = e.y;
    }
    
    if(!this.animationFrame) {
      this.animationFrame = requestAnimationFrame(this.renderCursorMovement.bind(this));
    }
  }
  
  renderCursorMovement() {
    this.cursorPosition.x = lerp(this.cursorPosition.x, this.target.x, this.cursorSpeed);
    this.cursorPosition.y = lerp(this.cursorPosition.y, this.target.y, this.cursorSpeed);
    
    this.cursor.style.transform = `translate(${this.cursorPosition.x}px,${this.cursorPosition.y}px)`;
    
    const delta = Math.abs(this.target.x - this.cursorPosition.x + this.target.y - this.cursorPosition.y);
    
    if (delta <= 0.001) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
      return;
    }
    
    this.animationFrame = requestAnimationFrame(this.renderCursorMovement.bind(this));
  }
  
}

new MagneticCursor('.magnetic-cursor', '.cursor-attractor');
