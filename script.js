// ==========================================================================
// Retell AI Voice Agent Configuration (Real Retell Integration)
// ==========================================================================
const RETELL_PUBLIC_KEY = 'public_key_102d795b07c9abf641c80';
const RETELL_AGENT_ID = 'agent_ebca8fce123b3233986fd23e18';

let activeRetellSession = null;
let activeLivekitRoom = null;
window.isMuted = false;
let isCallConnecting = false;

const translations = {
    ar: {
        // Header
        "header.menu_aria": "قائمة العيادة",
        "header.clinic_name": "عيادات مولر",
        "header.clinic_sub": "Molar Clinics • Riyadh",

        // Hero
        "hero.badge_open": "مفتوح الآن · حتى 12 منتصف الليل",
        "hero.badge_location": "ظهرة لبن، الرياض",
        "hero.rating": "★ 4.7 (995 تقييم)",
        "hero.title": "ابتسامتك تبدأ من هنا",
        "hero.desc": "رعاية أسنان احترافية وتجربة مريحة في عيادات مولر بأعلى مقاييس الجودة والاهتمام.",
        "hero.book_btn": "احجز موعد",
        "hero.voice_btn": "تحدث مع الاستقبال",
        "hero.call_btn": "اتصال مباشر: 0570707029",

        // Trust Bar
        "trust.rating_title": "4.7 / 5",
        "trust.rating_sub": "995 تقييم Google",
        "trust.loc_title": "ظهرة لبن",
        "trust.loc_sub": "غرب الرياض",
        "trust.hours_title": "حتى 12:00 م",
        "trust.hours_sub": "مواعيد مسائية مريحة",
        "trust.doctors_title": "أطباء معتمدون",
        "trust.doctors_sub": "عناية متكاملة",

        // About
        "about.tag": "عن عيادات مولر",
        "about.title": "رعاية أسنان تضع ابتسامتك وراحتك أولاً",
        "about.desc": "في قلب ضاحية لبن بالرياض، نقدم مفهوماً راقياً لطب الأسنان يجمع بين الخبرة الطبية الفائقة والراحة النفسية العالية، مع تقنيات تشخيص حديثة تحافظ على سلامة أسنانك وأناقة ابتسامتك.",
        "about.banner": "تجربة علاجية هادئة تخفف رهبة طبيب الأسنان",
        "about.f1_title": "بيئة مريحة وهادئة",
        "about.f1_desc": "عيادات رحبة ومجهزة لضمان جلسات استرخاء متكاملة دون أي توتر.",
        "about.f2_title": "أحدث معايير التعقيم",
        "about.f2_desc": "بروتوكولات عزل وتعقيم صارمة تعتمد أحدث الأجهزة الألمانية المعتمدة.",
        "about.f3_title": "مواعيد مرنة تناسب يومك",
        "about.f3_desc": "نستقبلكم حتى منتصف الليل مع سهولة الحجز وإدارة المواعيد في أي وقت.",

        // Services
        "services.tag": "تخصصات متكاملة",
        "services.title": "خدمات عيادات مولر",
        "services.dept_badge": "4 أقسام رئيسية",
        "services.s1_badge": "علاجات أساسية",
        "services.s1_title": "خدمات الأسنان العامة",
        "services.s1_desc": "علاج التسوس، الحشوات التجميلية الدقيقة، سحب العصب بأحدث الميكروسكوبات، وخلع الأسنان بأقل تدخل جراحي ممكن.",
        "services.s1_cta": "حجز استشارة فحص",
        "services.s2_badge": "الأكثر طلباً",
        "services.s2_title": "العناية بالابتسامة وتجميل الأسنان",
        "services.s2_desc": "ابتسامة هوليوود، عدسات الفينير واللومينير، تبييض الأسنان بالليزر وجلسات القوالب المنزلية المتطورة.",
        "services.s2_cta": "عرض خيارات التجميل",
        "services.s3_badge": "حماية دورية",
        "services.s3_title": "الرعاية الوقائية وتنظيف الأسنان",
        "services.s3_desc": "إزالة الجير والتصبغات باستخدام تدفق الهواء المائي (Air-Flow)، حماية المينا، وفلورايد مكثف لحماية اللثة.",
        "services.s3_cta": "تنظيف وتلميع فوري",
        "services.s4_badge": "تشخيص شامل",
        "services.s4_title": "استشارات وتقييم صحة الفم",
        "services.s4_desc": "تصوير بانورامي وثلاثي الأبعاد، كشف دوري متكامل، وخطة علاجية مخصصة تشرح كافة الخيارات والبدائل بوضوح.",
        "services.s4_cta": "طلب تقرير وفحص",

        // Retell AI Voice Section
        "voice_sec.tag": "مدعوم بالذكاء الاصطناعي",
        "voice_sec.title": "مساعد الحجز الصوتي الذكي (سارة)",
        "voice_sec.desc": "تحدث صوتياً ومباشرة مع موظفة الاستقبال الافتراضية لعيادات مولر لحجز موعدك، الاستفسار عن الأوقات المتاحة، والتعرف على خدماتنا دون انتظار.",
        "voice_sec.status_title": "سارة متاحة الآن",
        "voice_sec.status_desc": "مكالمة صوتية مباشرة مع موظفة الاستقبال الافتراضية",
        "voice_sec.cta": "ابدأ المحادثة الصوتية الآن",

        // Booking
        "booking.tag": "حجز إلكتروني سريع",
        "booking.title": "احجز موعدك بسهولة",
        "booking.desc": "تواصل مع عيادات مولر واختر الموعد المناسب لك، وسيقوم فريق الاستقبال بتأكيده فوراً.",
        "booking.name_label": "الاسم الكامل",
        "booking.name_placeholder": "مثال: تركي التميمي",
        "booking.phone_label": "رقم الجوال السعودي",
        "booking.phone_placeholder": "05X XXX XXXX",
        "booking.service_label": "الخدمة المطلوبة",
        "booking.opt_exam": "كشف واستشارة عامة",
        "booking.opt_cleaning": "تنظيف وتلميع الأسنان",
        "booking.opt_cosmetic": "تجميل وفينير",
        "booking.opt_pain": "علاج ألم أو طوارئ",
        "booking.time_label": "الوقت المفضل",
        "booking.opt_evening": "مسائي (4 م - 12 ص)",
        "booking.opt_morning": "صباحي (8 ص - 2 م)",
        "booking.submit_btn": "تأكيد طلب الموعد",
        "booking.submitting": "جاري التأكيد...",
        "booking.success_btn": "تم الطلب بنجاح",
        "booking.success_msg": "تم استلام طلبك بنجاح! سيتصل بك فريق عيادات مولر خلال 15 دقيقة لتثبيت الموعد.",
        "booking.phone_error": "الرجاء إدخال رقم جوال سعودي صحيح يبدأ بـ 05 ويتكون من 10 أرقام",
        "booking.whatsapp": "واتساب مباشر",
        "booking.call": "اتصال هاتفي",

        // Location & Hours
        "loc.tag": "الوصول إلينا",
        "loc.title": "موقعنا وساعات العمل",
        "loc.desc": "سهولة الوصول ومواقف مخصصة لزوار عيادات مولر في حي ظهرة لبن.",
        "loc.address": "6882 طريق الشفا، ظهرة لبن، الرياض",
        "loc.postal": "الرمز البريدي: 13784 • Plus Code: JHF2+JH",
        "loc.directions": "الاتجاهات",
        "loc.gmaps": "خرائط Google",
        "loc.hours_title": "أوقات العمل المعتمدة",
        "loc.days_weekdays": "الأحد – الخميس",
        "loc.hours_weekdays": "8:00 صباحاً – 12:00 منتصف الليل",
        "loc.days_weekend": "الجمعة – السبت",
        "loc.hours_weekend": "4:00 مساءً – 12:00 منتصف الليل",

        // Instagram
        "insta.tag": "يوميات العيادة",
        "insta.title": "عيادات مولر على إنستغرام",
        "insta.cta": "تابعنا على إنستغرام (@molar_clinics)",

        // Footer
        "footer.title": "عيادات مولر لطب الأسنان",
        "footer.desc": "وجهتك الرائدة لابتسامة مشرقة وصحة فموية دائمة في الرياض، حي ظهرة لبن.",
        "footer.hours": "الأحد - الخميس: 8 ص - 12 ص | الجمعة - السبت: 4 م - 12 ص",
        "footer.rights": "جميع الحقوق محفوظة © عيادات مولر",
        "footer.city": "الرياض 2025",

        // Voice Modal - Real Voice Session
        "modal.title": "مساعد مولر الصوتي (سارة)",
        "modal.sub": "استقبال ذكي مدعوم بـ Retell AI",
        "modal.connecting": "جاري الاتصال بسارة...",
        "modal.status_listening": "يمكنك التحدث الآن، سارة تستمع إليك...",
        "modal.status_speaking": "سارة تتحدث الآن...",
        "modal.status_hint": "تحدث بشكل طبيعي للاستفسار أو حجز المواعيد",
        "modal.mute": "كتم الصوت",
        "modal.unmute": "تشغيل المايك",
        "modal.status_muted": "المايكروفون مكتوم حالياً",
        "modal.end_call": "إنهاء المكالمة",
        "modal.ended": "تم إنهاء المكالمة",
        "modal.mic_error": "يرجى السماح بالوصول إلى المايكروفون للتحدث مع سارة",
        "modal.conn_error": "تعذر بدء الاتصال الصوتي. يرجى التحقق من الاتصال بالإنترنت.",

        // Floating button & Bottom Nav
        "floating.title": "تحدث مع سارة",
        "floating.sub": "استقبال مولر الذكي",
        "nav.call": "اتصال",
        "nav.voice": "تحدث معنا",
        "nav.book": "احجز موعد",
        "service_alert": "سيتم تحويلك قريباً لصفحة تفاصيل: "
    },
    en: {
        // Header
        "header.menu_aria": "Clinic Menu",
        "header.clinic_name": "Molar Clinics",
        "header.clinic_sub": "Molar Clinics • Riyadh",

        // Hero
        "hero.badge_open": "Open Now · Until 12 Midnight",
        "hero.badge_location": "Dhahrat Laban, Riyadh",
        "hero.rating": "★ 4.7 (995 reviews)",
        "hero.title": "Your Smile Begins Here",
        "hero.desc": "Exceptional dental care and a comfortable, modern patient experience at Molar Clinics with world-class standards.",
        "hero.book_btn": "Book Appointment",
        "hero.voice_btn": "Talk to Reception",
        "hero.call_btn": "Direct Call: 0570707029",

        // Trust Bar
        "trust.rating_title": "4.7 / 5",
        "trust.rating_sub": "995 Google Reviews",
        "trust.loc_title": "Dhahrat Laban",
        "trust.loc_sub": "West Riyadh",
        "trust.hours_title": "Until 12:00 AM",
        "trust.hours_sub": "Convenient Evening Hours",
        "trust.doctors_title": "Certified Doctors",
        "trust.doctors_sub": "Comprehensive Care",

        // About
        "about.tag": "About Molar Clinics",
        "about.title": "Dental care that puts your smile and comfort first",
        "about.desc": "In the heart of Laban district, Riyadh, we offer a refined dental experience that combines advanced clinical expertise with ultimate relaxation and cutting-edge diagnostics.",
        "about.banner": "A serene, stress-free environment that eases dental anxiety",
        "about.f1_title": "Relaxing & Serene Atmosphere",
        "about.f1_desc": "Spacious, modern clinic suites designed to guarantee complete comfort and zero stress.",
        "about.f2_title": "Highest Sterilization Standards",
        "about.f2_desc": "Strict infection control protocols utilizing state-of-the-art certified German equipment.",
        "about.f3_title": "Flexible Hours for Your Schedule",
        "about.f3_desc": "Welcoming you until midnight with seamless booking and flexible appointments.",

        // Services
        "services.tag": "Comprehensive Specialties",
        "services.title": "Molar Clinics Services",
        "services.dept_badge": "4 Key Departments",
        "services.s1_badge": "Essential Care",
        "services.s1_title": "General Dentistry",
        "services.s1_desc": "Cavity treatments, aesthetic fillings, microscopic root canals, and gentle extractions.",
        "services.s1_cta": "Book Consultation",
        "services.s2_badge": "Most Popular",
        "services.s2_title": "Cosmetics & Smile Design",
        "services.s2_desc": "Hollywood smile, porcelain veneers & lumineers, laser whitening, and custom home kits.",
        "services.s2_cta": "View Cosmetic Options",
        "services.s3_badge": "Routine Protection",
        "services.s3_title": "Preventive Care & Cleaning",
        "services.s3_desc": "Tartar & stain removal using Air-Flow water technology, enamel protection, and gum therapy.",
        "services.s3_cta": "Instant Cleaning & Polish",
        "services.s4_badge": "Comprehensive Exam",
        "services.s4_title": "Oral Consultations & Checkups",
        "services.s4_desc": "Panoramic & 3D CBCT digital imaging, complete routine exams, and clear personalized treatment plans.",
        "services.s4_cta": "Request Exam & Report",

        // Retell AI Voice Section
        "voice_sec.tag": "AI-Powered",
        "voice_sec.title": "Smart Voice Receptionist (Sarah)",
        "voice_sec.desc": "Speak live with Molar Clinics' virtual AI receptionist to schedule visits, verify available timings, and explore treatments with zero wait time.",
        "voice_sec.status_title": "Sarah is Online Now",
        "voice_sec.status_desc": "Live voice conversation with our virtual receptionist",
        "voice_sec.cta": "Start Voice Conversation Now",

        // Booking
        "booking.tag": "Fast Online Booking",
        "booking.title": "Book Your Appointment Easily",
        "booking.desc": "Get in touch with Molar Clinics and pick your convenient time. Our reception team will confirm it promptly.",
        "booking.name_label": "Full Name",
        "booking.name_placeholder": "e.g. Alex Morgan",
        "booking.phone_label": "Saudi Mobile Number",
        "booking.phone_placeholder": "05X XXX XXXX",
        "booking.service_label": "Service Required",
        "booking.opt_exam": "General Exam & Consultation",
        "booking.opt_cleaning": "Cleaning & Teeth Polishing",
        "booking.opt_cosmetic": "Cosmetic & Veneers",
        "booking.opt_pain": "Tooth Pain / Emergency",
        "booking.time_label": "Preferred Time",
        "booking.opt_evening": "Evening (4 PM - 12 AM)",
        "booking.opt_morning": "Morning (8 AM - 2 PM)",
        "booking.submit_btn": "Confirm Appointment Request",
        "booking.submitting": "Confirming...",
        "booking.success_btn": "Requested Successfully",
        "booking.success_msg": "Your request was received successfully! The Molar Clinics team will call you within 15 minutes to confirm.",
        "booking.phone_error": "Please enter a valid Saudi phone number starting with 05 (10 digits)",
        "booking.whatsapp": "Direct WhatsApp",
        "booking.call": "Direct Phone Call",

        // Location & Hours
        "loc.tag": "Find Us",
        "loc.title": "Location & Working Hours",
        "loc.desc": "Easy access with dedicated parking for Molar Clinics visitors in Dhahrat Laban, Riyadh.",
        "loc.address": "6882 Al Shifa Road, Dhahrat Laban, Riyadh",
        "loc.postal": "Postal Code: 13784 • Plus Code: JHF2+JH",
        "loc.directions": "Directions",
        "loc.gmaps": "Google Maps",
        "loc.hours_title": "Official Working Hours",
        "loc.days_weekdays": "Sunday – Thursday",
        "loc.hours_weekdays": "8:00 AM – 12:00 Midnight",
        "loc.days_weekend": "Friday – Saturday",
        "loc.hours_weekend": "4:00 PM – 12:00 Midnight",

        // Instagram
        "insta.tag": "Clinic Life",
        "insta.title": "Molar Clinics on Instagram",
        "insta.cta": "Follow us on Instagram (@molar_clinics)",

        // Footer
        "footer.title": "Molar Dental Clinics",
        "footer.desc": "Your premier destination for a confident smile and healthy teeth in Riyadh, Dhahrat Laban.",
        "footer.hours": "Sun - Thu: 8 AM - 12 AM | Fri - Sat: 4 PM - 12 AM",
        "footer.rights": "All rights reserved © Molar Clinics",
        "footer.city": "Riyadh 2025",

        // Voice Modal - Real Voice Session
        "modal.title": "Molar Voice Assistant (Sarah)",
        "modal.sub": "Smart Reception Powered by Retell AI",
        "modal.connecting": "Connecting to Sarah...",
        "modal.status_listening": "You can speak now, Sarah is listening to you...",
        "modal.status_speaking": "Sarah is speaking...",
        "modal.status_hint": "Speak naturally to ask questions or book appointments",
        "modal.mute": "Mute",
        "modal.unmute": "Unmute",
        "modal.status_muted": "Microphone is currently muted",
        "modal.end_call": "End Call",
        "modal.ended": "Call ended",
        "modal.mic_error": "Please allow microphone access to speak with Sarah",
        "modal.conn_error": "Could not start voice call. Please check your internet connection.",

        // Floating button & Bottom Nav
        "floating.title": "Talk with Sarah",
        "floating.sub": "Smart AI Receptionist",
        "nav.call": "Call",
        "nav.voice": "Talk to Us",
        "nav.book": "Book Appointment",
        "service_alert": "You will be redirected shortly to the service details for: "
    }
};

let currentLang = 'ar';

function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('molar_lang', lang);

    // Update HTML attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar' ? 'rtl' : 'ltr');

    // Update Language Switcher UI
    const arBtn = document.getElementById('lang-ar-btn');
    const enBtn = document.getElementById('lang-en-btn');

    if (arBtn && enBtn) {
        if (lang === 'en') {
            enBtn.className = 'px-2.5 py-1 rounded-full text-primary font-bold bg-surface-container-lowest shadow-xs transition-all cursor-pointer';
            arBtn.className = 'px-2.5 py-1 rounded-full text-on-surface-variant opacity-60 hover:opacity-100 transition-all cursor-pointer';
        } else {
            arBtn.className = 'px-2.5 py-1 rounded-full text-primary font-bold bg-surface-container-lowest shadow-xs transition-all cursor-pointer';
            enBtn.className = 'px-2.5 py-1 rounded-full text-on-surface-variant opacity-60 hover:opacity-100 transition-all cursor-pointer';
        }
    }

    // Translate elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.setAttribute('placeholder', translations[lang][key]);
        }
    });

    // Translate aria-labels
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
        const key = el.getAttribute('data-i18n-aria');
        if (translations[lang][key]) {
            el.setAttribute('aria-label', translations[lang][key]);
        }
    });

    // Update select options
    const serviceSelect = document.getElementById('service-select');
    if (serviceSelect) {
        const optionsMap = {
            'exam': 'booking.opt_exam',
            'cleaning': 'booking.opt_cleaning',
            'cosmetic': 'booking.opt_cosmetic',
            'teeth-pain': 'booking.opt_pain'
        };
        Array.from(serviceSelect.options).forEach(opt => {
            const key = optionsMap[opt.value];
            if (key && translations[lang][key]) {
                opt.textContent = translations[lang][key];
            }
        });
    }

    const timeSelect = document.getElementById('preferred-time');
    if (timeSelect) {
        const timeOptionsMap = {
            'evening': 'booking.opt_evening',
            'morning': 'booking.opt_morning'
        };
        Array.from(timeSelect.options).forEach(opt => {
            const key = timeOptionsMap[opt.value];
            if (key && translations[lang][key]) {
                opt.textContent = translations[lang][key];
            }
        });
    }

    // Direction-specific arrow icons
    document.querySelectorAll('.service-arrow-icon').forEach(icon => {
        icon.textContent = (lang === 'ar' ? 'arrow_back' : 'arrow_forward');
    });

    // Update live voice modal text if needed
    updateModalLanguageLabels();
}

function updateModalLanguageLabels() {
    const statusDot = document.getElementById('call-status-dot');
    const connState = document.getElementById('call-connection-state');
    const muteLabel = document.getElementById('mute-label');

    if (muteLabel) {
        muteLabel.textContent = window.isMuted ? translations[currentLang]['modal.unmute'] : translations[currentLang]['modal.mute'];
    }

    if (connState && (!activeRetellSession && !activeLivekitRoom && !isCallConnecting)) {
        connState.textContent = currentLang === 'ar' ? 'محادثة صوتية مباشرة مع سارة' : 'Live voice call with Sarah';
    }
}

// ==========================================================================
// Real Retell AI Voice Call Implementation
// ==========================================================================
function updateCallUI(state, customMessage) {
    const modal = document.getElementById('voice-assistant-modal');
    const statusText = document.getElementById('voice-status-text');
    const statusDot = document.getElementById('call-status-dot');
    const connState = document.getElementById('call-connection-state');
    const waveContainer = document.querySelector('.wave-bar-1')?.parentElement;

    if (!modal) return;

    if (state === 'connecting') {
        if (statusText) statusText.textContent = translations[currentLang]['modal.connecting'];
        if (statusDot) {
            statusDot.className = 'w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping';
        }
        if (connState) {
            connState.textContent = currentLang === 'ar' ? 'جاري فتح الخط مع سارة...' : 'Connecting live call...';
        }
    } else if (state === 'connected') {
        if (statusText) statusText.textContent = translations[currentLang]['modal.status_listening'];
        if (statusDot) {
            statusDot.className = 'w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse';
        }
        if (connState) {
            connState.textContent = currentLang === 'ar' ? 'متصل الآن · تفضل بالتحدث' : 'Live · Speak naturally';
        }
    } else if (state === 'agent_speaking') {
        if (statusText) statusText.textContent = translations[currentLang]['modal.status_speaking'];
        if (statusDot) {
            statusDot.className = 'w-2.5 h-2.5 rounded-full bg-secondary-container animate-pulse';
        }
        if (connState) {
            connState.textContent = currentLang === 'ar' ? 'سارة تتحدث...' : 'Sarah is speaking...';
        }
    } else if (state === 'user_speaking') {
        if (statusText) statusText.textContent = translations[currentLang]['modal.status_listening'];
        if (statusDot) {
            statusDot.className = 'w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse';
        }
        if (connState) {
            connState.textContent = currentLang === 'ar' ? 'تستمع إليك...' : 'Listening...';
        }
    } else if (state === 'muted') {
        if (statusText) statusText.textContent = translations[currentLang]['modal.status_muted'];
        if (statusDot) {
            statusDot.className = 'w-2.5 h-2.5 rounded-full bg-red-500';
        }
    } else if (state === 'ended') {
        if (statusText) statusText.textContent = translations[currentLang]['modal.ended'];
        if (statusDot) {
            statusDot.className = 'w-2.5 h-2.5 rounded-full bg-zinc-400';
        }
        if (connState) {
            connState.textContent = currentLang === 'ar' ? 'انتهت المكالمة' : 'Call ended';
        }
    } else if (state === 'error') {
        if (statusText) statusText.textContent = customMessage || translations[currentLang]['modal.conn_error'];
        if (statusDot) {
            statusDot.className = 'w-2.5 h-2.5 rounded-full bg-red-500';
        }
        if (connState) {
            connState.textContent = currentLang === 'ar' ? 'حدث خطأ في الاتصال' : 'Connection issue';
        }
    }
}

async function startRetellCall() {
    const voiceModal = document.getElementById('voice-assistant-modal');
    if (voiceModal) {
        voiceModal.classList.remove('hidden');
        voiceModal.classList.add('flex');
    }

    if (activeRetellSession || activeLivekitRoom || isCallConnecting) {
        return; // Already connecting or in call
    }

    isCallConnecting = true;
    window.isMuted = false;
    const muteIcon = document.getElementById('mute-icon');
    const muteLabel = document.getElementById('mute-label');
    if (muteIcon) muteIcon.textContent = 'mic_off';
    if (muteLabel) muteLabel.textContent = translations[currentLang]['modal.mute'];

    updateCallUI('connecting');

    try {
        // First check microphone permission
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                await navigator.mediaDevices.getUserMedia({ audio: true });
            } catch (micErr) {
                console.warn('Microphone permission warning:', micErr);
                updateCallUI('error', translations[currentLang]['modal.mic_error']);
                isCallConnecting = false;
                return;
            }
        }

        // Method A: Check for RetellClient from retell-client-js-sdk (v3)
        const RetellClientClass = window.RetellClient || (window.retellClientJsSdk && window.retellClientJsSdk.RetellClient);
        
        if (RetellClientClass) {
            const client = new RetellClientClass({ key: RETELL_PUBLIC_KEY });
            const session = client.createWebCall({ agent_id: RETELL_AGENT_ID });
            activeRetellSession = session;
            isCallConnecting = false;

            session.on('call_started', () => {
                updateCallUI('connected');
            });
            session.on('agent_start_talking', () => {
                updateCallUI('agent_speaking');
            });
            session.on('agent_stop_talking', () => {
                updateCallUI('user_speaking');
            });
            session.on('call_ended', () => {
                cleanupCallState();
                updateCallUI('ended');
                setTimeout(() => {
                    closeVoiceModal();
                }, 1800);
            });
            session.on('error', (err) => {
                console.error('Retell session error:', err);
                updateCallUI('error');
                cleanupCallState();
            });
            return;
        }

        // Method B: Direct LiveKit connection with Retell Web Call API
        const createCallResponse = await fetch('https://api.retellai.com/v2/create-web-call', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${RETELL_PUBLIC_KEY}`
            },
            body: JSON.stringify({ agent_id: RETELL_AGENT_ID })
        });

        if (!createCallResponse.ok) {
            throw new Error(`Retell API error: ${createCallResponse.statusText}`);
        }

        const callData = await createCallResponse.json();
        const accessToken = callData.access_token;
        const livekitUrl = callData.url || 'wss://livekit.retellai.com';

        if (window.LivekitClient && window.LivekitClient.Room) {
            const room = new window.LivekitClient.Room({
                adaptiveStream: true,
                dynacast: true
            });
            activeLivekitRoom = room;

            room.on(window.LivekitClient.RoomEvent.Connected, async () => {
                updateCallUI('connected');
                await room.localParticipant.setMicrophoneEnabled(true);
            });

            room.on(window.LivekitClient.RoomEvent.TrackSubscribed, (track) => {
                if (track.kind === 'audio') {
                    const audioElement = track.attach();
                    audioElement.autoplay = true;
                    document.body.appendChild(audioElement);
                }
            });

            room.on(window.LivekitClient.RoomEvent.ActiveSpeakersChanged, (speakers) => {
                const isAgentSpeaking = speakers.some(s => s.identity !== room.localParticipant.identity);
                if (isAgentSpeaking) {
                    updateCallUI('agent_speaking');
                } else {
                    updateCallUI('user_speaking');
                }
            });

            room.on(window.LivekitClient.RoomEvent.Disconnected, () => {
                cleanupCallState();
                updateCallUI('ended');
                setTimeout(() => {
                    closeVoiceModal();
                }, 1800);
            });

            await room.connect(livekitUrl, accessToken);
            isCallConnecting = false;
        } else {
            // Method C: RetellWebClient legacy fallback
            const LegacyClient = window.RetellWebClient || (window.retellClientJsSdk && window.retellClientJsSdk.RetellWebClient);
            if (LegacyClient) {
                const webClient = new LegacyClient();
                activeRetellSession = webClient;
                isCallConnecting = false;
                
                webClient.on('call_started', () => updateCallUI('connected'));
                webClient.on('call_ended', () => {
                    cleanupCallState();
                    updateCallUI('ended');
                    setTimeout(() => closeVoiceModal(), 1800);
                });
                webClient.on('agent_start_talking', () => updateCallUI('agent_speaking'));
                webClient.on('agent_stop_talking', () => updateCallUI('user_speaking'));
                webClient.on('error', (err) => {
                    console.error('Retell error:', err);
                    updateCallUI('error');
                    cleanupCallState();
                });

                await webClient.startCall({ accessToken });
            } else {
                throw new Error('Retell SDK and LiveKit client could not be initialized.');
            }
        }
    } catch (error) {
        console.error('Failed to start Retell voice call:', error);
        isCallConnecting = false;
        cleanupCallState();
        updateCallUI('error', translations[currentLang]['modal.conn_error']);
    }
}

function cleanupCallState() {
    activeRetellSession = null;
    activeLivekitRoom = null;
    isCallConnecting = false;
}

window.openVoiceModal = () => {
    startRetellCall();
};

window.closeVoiceModal = async () => {
    if (activeRetellSession && typeof activeRetellSession.end === 'function') {
        try {
            await activeRetellSession.end();
        } catch (e) {
            console.warn('Error ending session:', e);
        }
    }
    if (activeLivekitRoom && typeof activeLivekitRoom.disconnect === 'function') {
        try {
            await activeLivekitRoom.disconnect();
        } catch (e) {
            console.warn('Error disconnecting room:', e);
        }
    }
    cleanupCallState();

    const voiceModal = document.getElementById('voice-assistant-modal');
    if (voiceModal) {
        voiceModal.classList.add('hidden');
        voiceModal.classList.remove('flex');
    }
    updateModalLanguageLabels();
};

window.toggleMute = async () => {
    window.isMuted = !window.isMuted;
    const muteIcon = document.getElementById('mute-icon');
    const muteLabel = document.getElementById('mute-label');

    if (activeRetellSession) {
        if (window.isMuted) {
            activeRetellSession.mute?.();
        } else {
            activeRetellSession.unmute?.();
        }
    }

    if (activeLivekitRoom && activeLivekitRoom.localParticipant) {
        try {
            await activeLivekitRoom.localParticipant.setMicrophoneEnabled(!window.isMuted);
        } catch (e) {
            console.warn('Error toggling mic:', e);
        }
    }

    if (muteIcon && muteLabel) {
        if (window.isMuted) {
            muteIcon.textContent = 'mic';
            muteLabel.textContent = translations[currentLang]['modal.unmute'];
            updateCallUI('muted');
        } else {
            muteIcon.textContent = 'mic_off';
            muteLabel.textContent = translations[currentLang]['modal.mute'];
            updateCallUI('user_speaking');
        }
    }
};

// ==========================================================================
// Document Initialization & Event Bindings
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // --- Initialize Language ---
    const savedLang = localStorage.getItem('molar_lang') || 'ar';
    setLanguage(savedLang);

    // Event listeners for language switcher buttons
    const arBtn = document.getElementById('lang-ar-btn');
    const enBtn = document.getElementById('lang-en-btn');

    if (arBtn) {
        arBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            setLanguage('ar');
        });
    }

    if (enBtn) {
        enBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            setLanguage('en');
        });
    }

    const langSwitcher = document.getElementById('lang-switcher');
    if (langSwitcher) {
        langSwitcher.addEventListener('click', (e) => {
            if (e.target === arBtn || e.target === enBtn) return;
            setLanguage(currentLang === 'ar' ? 'en' : 'ar');
        });
    }

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

    // --- Connect ALL Voice Buttons to REAL Retell Voice Agent ---
    const voiceTriggers = document.querySelectorAll('[data-path="retell-ai-voice"], button[aria-label*="المساعد الذكي"], button[onclick="openVoiceModal()"]');
    voiceTriggers.forEach(btn => {
        btn.onclick = null; // Clear inline handler
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            startRetellCall();
        });
    });

    // --- Booking Form Logic ---
    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
        appointmentForm.onsubmit = null;
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const phoneInput = document.getElementById('patient-phone');
            const submitBtn = appointmentForm.querySelector('button[type="submit"]');
            const successMsg = document.getElementById('booking-success');
            
            // Validate Phone (starts with 05, exactly 10 digits)
            const phoneVal = phoneInput.value.replace(/\s/g, '');
            const phoneRegex = /^05\d{8}$/;
            if (!phoneRegex.test(phoneVal)) {
                alert(translations[currentLang]['booking.phone_error']);
                phoneInput.focus();
                return;
            }

            // Simulate loading
            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="material-symbols-outlined animate-spin text-[20px]" style="animation: spin 1s linear infinite;">sync</span><span>${translations[currentLang]['booking.submitting']}</span>`;
            submitBtn.classList.add('opacity-70');

            setTimeout(() => {
                // Success state
                if (successMsg) {
                    successMsg.textContent = translations[currentLang]['booking.success_msg'];
                    successMsg.classList.remove('hidden');
                }
                submitBtn.innerHTML = `<span class="material-symbols-outlined text-[20px]">check</span><span>${translations[currentLang]['booking.success_btn']}</span>`;
                submitBtn.classList.remove('bg-primary-container', 'text-on-primary');
                submitBtn.classList.add('bg-emerald-500', 'text-white');
                appointmentForm.reset();
                
                setTimeout(() => {
                    if (successMsg) successMsg.classList.add('hidden');
                    submitBtn.innerHTML = originalBtnHtml;
                    submitBtn.disabled = false;
                    submitBtn.classList.add('bg-primary-container', 'text-on-primary');
                    submitBtn.classList.remove('bg-emerald-500', 'text-white', 'opacity-70');
                }, 5000);
            }, 1400);
        });
    }

    // --- Interactive Services Cards ---
    document.querySelectorAll('.service-card-item').forEach(card => {
        card.classList.add('cursor-pointer', 'transition-transform', 'hover:scale-[1.02]');
        card.addEventListener('click', () => {
            const title = card.querySelector('h3')?.textContent || '';
            alert(`${translations[currentLang]['service_alert']}${title}`);
        });
    });
});
