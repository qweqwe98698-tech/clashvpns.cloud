document.addEventListener('DOMContentLoaded', () => {
    // 移动端菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // FAQ 手风琴效果
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // 如果希望只展开一个，可以先移除其他的 active
            // faqItems.forEach(otherItem => {
            //     if (otherItem !== item) {
            //         otherItem.classList.remove('active');
            //     }
            // });
            
            item.classList.toggle('active');
        });
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    // 如果在移动端，点击链接后关闭菜单
                    if (navLinks && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                    }

                    // 考虑导航栏高度
                    const headerOffset = 70;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // 退出意图弹窗逻辑 (Exit-Intent Popup)
    const exitPopup = document.getElementById('exitPopup');
    const closePopup = document.getElementById('closePopup');
    let hasShownPopup = false;

    if (exitPopup) {
        // 监听鼠标移出视口顶部 (代表想要关闭网页或切换标签页)
        document.addEventListener('mouseout', (e) => {
            if (e.clientY < 10 && !hasShownPopup) {
                // 判断是否已经显示过，这里可以使用 localStorage 记录
                if (!localStorage.getItem('exitPopupShown')) {
                    exitPopup.classList.add('show');
                    hasShownPopup = true;
                    // 记录，防止频繁打扰
                    localStorage.setItem('exitPopupShown', 'true');
                }
            }
        });

        // 关闭弹窗
        if (closePopup) {
            closePopup.addEventListener('click', () => {
                exitPopup.classList.remove('show');
            });
        }

        // 点击背景关闭
        exitPopup.addEventListener('click', (e) => {
            if (e.target === exitPopup) {
                exitPopup.classList.remove('show');
            }
        });
    }

    // UTM 流量溯源与联盟参数穿透
    const urlParams = new URLSearchParams(window.location.search);
    const currentUtmSource = urlParams.get('utm_source');
    if (currentUtmSource) {
        sessionStorage.setItem('utm_source', currentUtmSource);
    }
    
    const savedSource = sessionStorage.getItem('utm_source');
    if (savedSource) {
        document.querySelectorAll('a').forEach(a => {
            const href = a.getAttribute('href');
            // 如果是外部推广链接 (比如机场注册链接)，把追踪代码附加上去
            if (href && (href.includes('aff=') || href.includes('register') || (href.startsWith('http') && !href.includes(window.location.hostname)))) {
                try {
                    const url = new URL(href);
                    // 追加 sub_id，方便在机场面板统计是从哪个按钮点过来的
                    url.searchParams.set('sub_id', savedSource);
                    a.setAttribute('href', url.toString());
                } catch (e) {}
            }
        });
    }
});

// 复制 Apple ID 到剪贴板
function copyToClipboard(elementId, btnObj) {
    const textToCopy = document.getElementById(elementId).innerText.trim();
    const btn = btnObj || (window.event ? window.event.currentTarget || window.event.target : null);
    
    function showSuccess() {
        if(btn) {
            const originalText = btn.innerText;
            btn.innerText = "已复制";
            btn.classList.add("copied");
            setTimeout(() => {
                btn.innerText = originalText;
                btn.classList.remove("copied");
            }, 2000);
        }
    }

    // fallback: 如果是本地打开(file://)或者http，navigator.clipboard 可能不存在
    if (!navigator.clipboard) {
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        
        // 避免滚动
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showSuccess();
        } catch (err) {
            console.error('Fallback: 复制失败', err);
            alert('复制失败，请手动长按复制');
        }
        document.body.removeChild(textArea);
        return;
    }

    // 现代浏览器 HTTPS
    navigator.clipboard.writeText(textToCopy).then(() => {
        showSuccess();
    }).catch(err => {
        console.error('复制失败:', err);
        alert('复制失败，请手动长按复制');
    });
}
