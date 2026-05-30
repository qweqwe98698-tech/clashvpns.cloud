// 柳如烟机场指南 - 轻量级 3D 地球网络 Canvas 动画
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'hero-globe';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none';
    
    // Insert behind everything else in hero
    heroSection.insertBefore(canvas, heroSection.firstChild);

    const ctx = canvas.getContext('2d');
    
    let width, height, cx, cy;
    let globeRadius;
    
    function resize() {
        width = heroSection.offsetWidth;
        height = heroSection.offsetHeight;
        
        // Handle high DPI displays
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        
        cx = width / 2;
        // Shift globe slightly right and down on desktop, center on mobile
        cy = height / 2;
        if (width > 768) {
            cx = width * 0.7; // Right side
            cy = height * 0.5;
        }
        
        globeRadius = Math.min(width, height) * 0.35;
        if(globeRadius < 150) globeRadius = 150;
        if(globeRadius > 400) globeRadius = 400;
    }
    
    window.addEventListener('resize', resize);
    resize();

    // Configuration
    const GLOBE_POINTS = 120;
    const CONNECTIONS = 2; // connections per node
    const BASE_COLOR = '139, 92, 246'; // Purple #8b5cf6
    const HIGHLIGHT_COLOR = '59, 130, 246'; // Blue #3b82f6

    // 1. Generate Globe Points (Fibonacci Sphere)
    let points = [];
    for (let i = 0; i < GLOBE_POINTS; i++) {
        const phi = Math.acos(-1 + (2 * i) / GLOBE_POINTS);
        const theta = Math.sqrt(GLOBE_POINTS * Math.PI) * phi;
        
        points.push({
            origX: Math.cos(theta) * Math.sin(phi),
            origY: Math.sin(theta) * Math.sin(phi),
            origZ: Math.cos(phi),
            x: 0, y: 0, z: 0,
            projectedX: 0, projectedY: 0, projectedZ: 0,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: 0.02 + Math.random() * 0.03
        });
    }

    // Connect close points
    let edges = [];
    for (let i = 0; i < points.length; i++) {
        let distances = [];
        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                let d = Math.pow(points[i].origX - points[j].origX, 2) + 
                        Math.pow(points[i].origY - points[j].origY, 2) + 
                        Math.pow(points[i].origZ - points[j].origZ, 2);
                distances.push({ index: j, dist: d });
            }
        }
        distances.sort((a, b) => a.dist - b.dist);
        for (let k = 0; k < CONNECTIONS; k++) {
            // Prevent duplicate reverse edges
            let exists = edges.find(e => (e.a === i && e.b === distances[k].index) || (e.b === i && e.a === distances[k].index));
            if (!exists) {
                edges.push({
                    a: i,
                    b: distances[k].index,
                    flowPos: Math.random(),
                    flowSpeed: 0.005 + Math.random() * 0.01
                });
            }
        }
    }

    // 2. Generate Background Particles
    let particles = [];
    for (let i = 0; i < 80; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.5 + 0.1
        });
    }

    let angleX = 0.1;
    let angleY = 0;

    function render() {
        ctx.clearRect(0, 0, width, height);

        // --- Background Aura / Nebula ---
        // Soft purple glow
        let g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, globeRadius * 2);
        g1.addColorStop(0, 'rgba(139, 92, 246, 0.08)');
        g1.addColorStop(1, 'rgba(139, 92, 246, 0)');
        ctx.fillStyle = g1;
        ctx.fillRect(0, 0, width, height);

        // --- Background Particles ---
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = \`rgba(\${BASE_COLOR}, \${p.opacity * 0.5})\`;
            ctx.fill();
        });

        // --- 3D Globe Rotation ---
        angleY -= 0.003;
        
        const sinY = Math.sin(angleY);
        const cosY = Math.cos(angleY);
        const sinX = Math.sin(angleX);
        const cosX = Math.cos(angleX);

        // Rotate and project points
        for (let i = 0; i < points.length; i++) {
            let p = points[i];
            
            // Rotate Y
            let x1 = p.origX * cosY - p.origZ * sinY;
            let z1 = p.origZ * cosY + p.origX * sinY;
            
            // Rotate X
            let y2 = p.origY * cosX - z1 * sinX;
            let z2 = z1 * cosX + p.origY * sinX;
            
            p.x = x1;
            p.y = y2;
            p.z = z2;

            // 3D Perspective Projection
            let perspective = 800 / (800 - p.z * globeRadius);
            p.projectedX = cx + p.x * globeRadius * perspective;
            p.projectedY = cy + p.y * globeRadius * perspective;
            p.projectedZ = p.z; // -1 (back) to 1 (front)
            
            p.pulse += p.pulseSpeed;
        }

        // --- Sort points by Z for proper rendering (back to front) ---
        // Actually for nodes and lines, it's easier to just draw lines then nodes.
        
        // Draw Edges (Connections)
        edges.forEach(e => {
            let p1 = points[e.a];
            let p2 = points[e.b];
            
            // Average Z to determine opacity
            let avgZ = (p1.z + p2.z) / 2;
            if (avgZ < -0.8) return; // Hide very back lines
            
            let alpha = (avgZ + 1) / 2; // 0 to 1
            alpha = alpha * alpha; // curve
            
            ctx.beginPath();
            ctx.moveTo(p1.projectedX, p1.projectedY);
            ctx.lineTo(p2.projectedX, p2.projectedY);
            ctx.strokeStyle = \`rgba(\${BASE_COLOR}, \${alpha * 0.15})\`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // 流光动画 (Flowing light on the edges)
            e.flowPos += e.flowSpeed;
            if (e.flowPos > 1) e.flowPos = 0;
            
            if (alpha > 0.2) {
                let fx = p1.projectedX + (p2.projectedX - p1.projectedX) * e.flowPos;
                let fy = p1.projectedY + (p2.projectedY - p1.projectedY) * e.flowPos;
                
                ctx.beginPath();
                ctx.arc(fx, fy, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = \`rgba(\${HIGHLIGHT_COLOR}, \${alpha * Math.sin(e.flowPos * Math.PI)})\`;
                ctx.fill();
            }
        });

        // Draw Nodes
        points.forEach(p => {
            if (p.z < -0.8) return; // Hide very back
            
            let alpha = (p.z + 1) / 2;
            
            // Node base
            ctx.beginPath();
            let size = 1.5 + alpha * 1.5;
            ctx.arc(p.projectedX, p.projectedY, size, 0, Math.PI * 2);
            ctx.fillStyle = \`rgba(\${BASE_COLOR}, \${alpha * 0.6})\`;
            ctx.fill();
            
            // Glowing effect for front nodes
            if (p.z > 0.5) {
                let pulseAlpha = (Math.sin(p.pulse) + 1) / 2; // 0 to 1
                ctx.beginPath();
                ctx.arc(p.projectedX, p.projectedY, size * 3, 0, Math.PI * 2);
                ctx.fillStyle = \`rgba(\${HIGHLIGHT_COLOR}, \${alpha * pulseAlpha * 0.3})\`;
                ctx.fill();
            }
        });

        requestAnimationFrame(render);
    }

    render();
});
