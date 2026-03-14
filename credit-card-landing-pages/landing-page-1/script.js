document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('applyForm');
    const inputs = form.querySelectorAll('input, select');

    // Remove error styling on input change
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
        
        // Validation functions
        const showError = (inputId) => {
            document.getElementById(inputId).classList.add('invalid');
            document.getElementById(`${inputId}-error`).style.display = 'block';
            isValid = false;
        };

        const hideError = (inputId) => {
            document.getElementById(inputId).classList.remove('invalid');
            document.getElementById(`${inputId}-error`).style.display = 'none';
        };

        // Gender validation
        const gender = document.getElementById('gender');
        if (!gender.value) {
            showError('gender');
        } else {
            hideError('gender');
        }

        // First Name validation
        const firstName = document.getElementById('firstName');
        if (!firstName.value.trim()) {
            showError('firstName');
        } else {
            hideError('firstName');
        }

        // Last Name validation
        const lastName = document.getElementById('lastName');
        if (!lastName.value.trim()) {
            showError('lastName');
        } else {
            hideError('lastName');
        }

        // Email validation
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
            showError('email');
        } else {
            hideError('email');
        }

        if (isValid) {
            // Simulate form submission
            const btn = document.getElementById('submitBtn');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<span>Processing...</span>';
            btn.style.opacity = '0.8';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<span>Application Submitted!</span>';
                btn.style.backgroundColor = '#10b981'; // Green for success
                
                // Reset after 3 seconds
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
});
