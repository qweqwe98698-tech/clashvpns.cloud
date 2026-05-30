const fs = require('fs');

const cssToAdd = `
/* 指南文章卡片区 */
.guides {
    position: relative;
    padding: 100px 0;
    background: linear-gradient(135deg, #fdfbfb 0%, #f1f5f9 100%);
    overflow: hidden;
}

.guides-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    margin-top: 50px;
}

@media (max-width: 1024px) {
    .guides-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
    .guides-grid { grid-template-columns: 1fr; }
}

.guide-card {
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.9);
    border-radius: var(--radius-xl);
    padding: 30px;
    text-decoration: none;
    color: var(--text-main);
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.03);
    position: relative;
    overflow: hidden;
}

.guide-card:hover {
    transform: translateY(-6px);
    background: rgba(255, 255, 255, 0.95);
    border-color: rgba(139, 92, 246, 0.3);
    box-shadow: 0 20px 40px -10px rgba(139, 92, 246, 0.12);
}

.guide-tag {
    align-self: flex-start;
    font-size: 0.85rem;
    font-weight: 600;
    padding: 6px 14px;
    border-radius: var(--radius-full);
    margin-bottom: 20px;
    background: rgba(255,255,255,0.8);
    border: 1px solid transparent;
}

.guide-tag.tag-blue { color: var(--accent-blue); background: rgba(59, 130, 246, 0.1); border-color: rgba(59, 130, 246, 0.2); }
.guide-tag.tag-purple { color: #8b5cf6; background: rgba(139, 92, 246, 0.1); border-color: rgba(139, 92, 246, 0.2); }
.guide-tag.tag-green { color: var(--accent-green); background: rgba(16, 185, 129, 0.1); border-color: rgba(16, 185, 129, 0.2); }
.guide-tag.tag-orange { color: var(--accent-orange); background: rgba(245, 158, 11, 0.1); border-color: rgba(245, 158, 11, 0.2); }
.guide-tag.tag-gray { color: var(--text-light); background: rgba(107, 114, 128, 0.1); border-color: rgba(107, 114, 128, 0.2); }

.guide-title {
    font-size: 1.15rem;
    font-weight: 700;
    line-height: 1.5;
    margin-bottom: 12px;
    color: var(--primary-color);
    transition: color 0.3s ease;
}

.guide-summary {
    font-size: 0.95rem;
    color: var(--text-light);
    line-height: 1.6;
    margin-bottom: 24px;
    flex-grow: 1;
}

.guide-footer {
    display: flex;
    align-items: center;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    padding-top: 16px;
    margin-top: auto;
}

.guide-readmore {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-light);
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.3s ease;
}

.guide-readmore .arrow {
    transition: transform 0.3s ease;
    display: inline-block;
}

.guide-card:hover .guide-readmore {
    color: var(--accent-blue);
}

.guide-card:hover .guide-readmore .arrow {
    transform: translateX(6px);
}

.guide-card:hover .guide-title {
    color: var(--accent-blue);
}
`;

fs.appendFileSync('style.css', cssToAdd);
console.log('Appended CSS to style.css');
