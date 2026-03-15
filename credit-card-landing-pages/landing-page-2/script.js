window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500); // Wait for transition
        }, 1000); // 1 second loading time
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Allow only letters (English/Arabic) and spaces in name fields
    const nameFields = ['firstName', 'lastName'];
    nameFields.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', function() {
                this.value = this.value.replace(/[^A-Za-z\u0600-\u06FF\s]/g, '');
            });
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Validation Logic
    const form = document.getElementById('heroForm');
    if (form) {
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('invalid');
                const errorMsg = document.getElementById(`${input.id}-error`);
                if (errorMsg) {
                    errorMsg.style.display = 'none';
                }
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            const showError = (inputId) => {
                document.getElementById(inputId).classList.add('invalid');
                document.getElementById(`${inputId}-error`).style.display = 'block';
                isValid = false;
            };

            const hideError = (inputId) => {
                document.getElementById(inputId).classList.remove('invalid');
                document.getElementById(`${inputId}-error`).style.display = 'none';
            };

            const fields = ['firstName', 'lastName', 'gender'];
            fields.forEach(field => {
                const el = document.getElementById(field);
                if(!el.value.trim()) {
                    showError(field);
                } else {
                    hideError(field);
                }
            });

            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
                showError('email');
            } else {
                hideError('email');
            }

            if (isValid) {
                const btn = document.getElementById('submitBtn');
                const originalText = btn.innerHTML;
                btn.innerHTML = 'Processing...';
                btn.style.opacity = '0.8';
                btn.disabled = true;

                setTimeout(() => {
                    btn.innerHTML = 'Application Submitted! ✓';
                    btn.style.backgroundColor = '#2a9d8f';
                    setTimeout(() => {
                        form.reset();
                        btn.innerHTML = originalText;
                        btn.style.backgroundColor = '';
                        btn.style.opacity = '1';
                        btn.disabled = false;
                    }, 3000);
                }, 1500);
            }
        });
    }
});
