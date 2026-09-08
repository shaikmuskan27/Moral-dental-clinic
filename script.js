document.addEventListener('DOMContentLoaded', () => {
    // --- Header Scroll Effect ---
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('shadow-md', 'bg-surface-container-lowest');
                header.classList.remove('bg-surface-container-lowest/85', 'shadow-sm');
            } else {
                header.classList.remove('shadow-md', 'bg-surface-container-lowest');
                header.classList.add('bg-surface-container-lowest/85', 'shadow-sm');
            }
        });
    }

    // --- Smooth Scrolling for anchors ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return;
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Handle "data-path='book-appointment'" links
    document.querySelectorAll('[data-path="book-appointment"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const bookingSection = document.getElementById('booking-section');
            if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Voice Modal Logic ---
    const voiceModal = document.getElementById('voice-assistant-modal');
    const voiceTriggers = document.querySelectorAll('[data-path="retell-ai-voice"], button[aria-label*="المساعد الذكي"], button[onclick="openVoiceModal()"]');
    
    // Override onclick globally since we remove inline script
    window.openVoiceModal = () => {
        if (voiceModal) {
            voiceModal.classList.remove('hidden');
            voiceModal.classList.add('flex');
        }
    };

    window.closeVoiceModal = () => {
        if (voiceModal) {
            voiceModal.classList.add('hidden');
            voiceModal.classList.remove('flex');
        }
    };

    voiceTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.openVoiceModal();
        });
    });

    // Mute Logic
    window.isMuted = false;
    window.toggleMute = () => {
        window.isMuted = !window.isMuted;
        const muteIcon = document.getElementById('mute-icon');
        const muteLabel = document.getElementById('mute-label');
        const status = document.getElementById('voice-status-text');

        if (muteIcon && muteLabel && status) {
            if (window.isMuted) {
                muteIcon.textContent = 'mic';
                muteLabel.textContent = 'تشغيل المايك';
                status.textContent = 'المايكروفون مكتوم حالياً';
            } else {
                muteIcon.textContent = 'mic_off';
                muteLabel.textContent = 'كتم الصوت';
                status.textContent = 'يمكنك التحدث الآن، سارة تستمع إليك...';
            }
        }
    };

    // Chat simulation
    window.simulatePrompt = (text) => {
        const status = document.getElementById('voice-status-text');
        if (status) {
            status.textContent = 'جاري معالجة: ' + text;
            setTimeout(() => {
                const responses = [
                    'أهلاً بك في عيادات مولر، يسعدنا خدمتك فوراً!',
                    'مواعيدنا متاحة اليوم من الساعة 4 عصراً، هل ترغب بحجز موعد؟',
                    'العيادة تقع في ظهرة لبن، الرياض. سيصلك رابط الموقع برسالة نصية.',
                    'تكلفة الكشف 150 ريال شاملة خطة العلاج والتصوير.'
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                status.textContent = 'سارة: "' + randomResponse + '"';
            }, 1200);
        }
    };

    // --- Booking Form Logic ---
    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
        appointmentForm.onsubmit = null; // Remove any inline
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const phoneInput = document.getElementById('patient-phone');
            const submitBtn = appointmentForm.querySelector('button[type="submit"]');
            const successMsg = document.getElementById('booking-success');
            
            // Validate Phone (starts with 05, exactly 10 digits)
            const phoneVal = phoneInput.value.replace(/\s/g, '');
            const phoneRegex = /^05\d{8}$/;
            if (!phoneRegex.test(phoneVal)) {
                alert('الرجاء إدخال رقم جوال سعودي صحيح يبدأ بـ 05 ويتكون من 10 أرقام');
                phoneInput.focus();
                return;
            }

            // Simulate loading
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="material-symbols-outlined animate-spin text-[20px]" style="animation: spin 1s linear infinite;">sync</span><span>جاري التأكيد...</span>`;
            submitBtn.classList.add('opacity-70');

            setTimeout(() => {
                // Success state
                if (successMsg) {
                    successMsg.classList.remove('hidden');
                }
                submitBtn.innerHTML = `<span class="material-symbols-outlined text-[20px]">check</span><span>تم الطلب بنجاح</span>`;
                submitBtn.classList.remove('bg-primary-container', 'text-on-primary');
                submitBtn.classList.add('bg-emerald-500', 'text-white');
                appointmentForm.reset();
                
                setTimeout(() => {
                    successMsg.classList.add('hidden');
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.classList.add('bg-primary-container', 'text-on-primary');
                    submitBtn.classList.remove('bg-emerald-500', 'text-white', 'opacity-70');
                }, 5000);
            }, 1500);
        });
    }

    // --- Interactive Services Cards ---
    document.querySelectorAll('.material-symbols-outlined.text-\\[18px\\]').forEach(arrow => {
        if (arrow.textContent === 'arrow_back') {
            const card = arrow.closest('.p-4.rounded-2xl');
            if (card) {
                card.classList.add('cursor-pointer', 'transition-transform', 'hover:scale-[1.02]');
                card.addEventListener('click', () => {
                    const title = card.querySelector('h3')?.textContent || 'الخدمة';
                    alert(`سيتم تحويلك قريباً لصفحة تفاصيل: ${title}`);
                });
            }
        }
    });
});
