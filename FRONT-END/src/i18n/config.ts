import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        teams: 'Teams',
        players: 'Players',
        tournaments: 'Tournaments',
        shop: 'Shop',
        contact: 'Contact'
      },
      auth: {
        login: 'Login',
        register: 'Register',
        forgotPassword: 'Forgot password?',
        username: 'Username',
        email: 'Email',
        password: 'Password',
        logout: 'Logout'
      },
      navigation: {
        hi: 'Hi,',
        cart: 'Cart',
        emptyCart: 'Your cart is empty.',
        remove: 'Remove',
        total: 'Total:',
        checkout: 'Checkout',
        clearCart: 'Clear Cart'
      },
      home: {
        title: 'Elite E-Sports Arena',
        subtitle: 'Where Champions Rise',
        description: 'Join the ultimate competitive gaming experience with professional teams, epic tournaments, and cutting-edge technology.',
        watchLive: 'Watch Live',
        joinTournament: 'Join Tournament',
        liveLabel: 'LIVE',
        whyChooseTitle: 'Why Choose Elite Arena?',
        liveStatsTitle: 'Live Platform Statistics',
        playersOnline: 'Players Online',
        liveMatches: 'Live Matches',
        totalPrizePool: 'Total Prize Pool',
        achievementsTitle: 'Platform Achievements',
        achievementsSubtitle: 'Witness the incredible milestones our gaming community has reached',
        achievements: {
          tournamentWins: 'Tournament Wins',
          activeTeams: 'Active Teams',
          matchesPlayed: 'Matches Played',
          champions: 'Champions'
        },
        testimonialsTitle: 'Champions Speak',
        testimonialsSubtitle: 'Hear from our elite players and tournament champions',
        testimonials: {
          items: [
            {
              name: "Alex 'ProShot' Chen",
              role: 'Professional Esports Player',
              team: 'Team Nexus',
              quote: 'Elite Arena has transformed my gaming career. The tournaments are world-class and the community is incredible.'
            },
            {
              name: "Sarah 'Lightning' Rodriguez",
              role: 'Tournament Champion',
              team: 'Storm Riders',
              quote: "The platform's features and competitive environment helped me reach the top. Best esports platform ever!"
            },
            {
              name: "Marcus 'Phantom' Johnson",
              role: 'Team Captain',
              team: 'Shadow Legion',
              quote: "Elite Arena's team management tools and tournament system are unmatched. It's a game-changer!"
            }
          ]
        },
        setupTitle: 'Pro Gaming Setup',
        setupSubtitle: 'Explore the ultimate gaming configuration used by our champions',
        setupItems: {
          ultraWide: { title: 'Ultra-Wide Display', spec: '240Hz OLED' },
          proAudio: { title: 'Pro Audio', spec: '7.1 Surround' },
          gamingRig: { title: 'Gaming Rig', spec: 'RTX 4090' },
          eliteController: { title: 'Elite Controller', spec: '0.1ms Response' }
        },
        features: {
          epicTournaments: {
            title: 'Epic Tournaments',
            description: 'Compete in high-stakes tournaments with massive prize pools'
          },
          eliteTeams: {
            title: 'Elite Teams',
            description: 'Join professional teams and climb the competitive ladder'
          },
          liveStreaming: {
            title: 'Live Streaming',
            description: 'Watch matches live with real-time commentary and analysis'
          }
        }
      },
      teams: {
        title: 'Elite Teams',
        subtitle: 'Meet Our Champions',
        stats: {
          matches: 'Matches',
          wins: 'Wins',
          tournaments: 'Tournaments'
        }
      },
      players: {
        title: 'Pro Players',
        subtitle: 'The Best in the Game',
        noPlayers: 'No players have registered yet.',
        age: 'Age:',
        remove: 'Remove',
        ctaTitle: 'Think You Have What It Takes?',
        ctaSubtitle: 'Join our elite roster of professional players and compete at the highest level.',
        applyNow: 'Apply Now'
      },
      tournaments: {
        title: 'Tournaments',
        subtitle: 'Compete for Glory',
        upcoming: 'Upcoming',
        live: 'Live Now',
        registration: 'Registration Open',
        prizePool: 'Prize Pool',
        watchLive: 'Watch Live',
        comingSoon: 'Coming Soon',
        registerNow: 'Register Now',
        teamsLabel: 'teams',
        liveStreamTitle: 'Live Tournament Stream',
        liveStreamSubtitle: 'Watch the action unfold in real-time'
      },
      shop: {
        title: 'Gaming Gear',
        subtitle: 'Premium E-Sports Merchandise'
      },
      contact: {
        title: 'Get in Touch',
        subtitle: 'Ready to Join the Elite?',
        sendUsMessage: 'Send us a Message',
        responseTime: "We'll get back to you within 24 hours",
        form: {
          firstName: 'First Name',
          lastName: 'Last Name',
          email: 'Email',
          subject: 'Subject',
          message: 'Message'
        },
        placeholders: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          subject: "What's this about?",
          message: 'Tell us more about your inquiry...'
        },
        sendMessage: 'Send Message',
        getInTouch: 'Get in Touch',
        departmentsTitle: 'Departments',
        labels: {
          email: 'Email',
          phone: 'Phone',
          address: 'Address'
        },
        mapTitle: 'Visit Our Gaming Arena',
        mapSubtitle: 'Experience the future of competitive gaming at our state-of-the-art facility',
        mapInteractive: 'Interactive Map',
        mapClick: 'Click to view our location on Google Maps'
      },
      liked: {
        title: 'Liked Products',
        emptySubtitle: 'Your favorite products will appear here',
        emptyHeader: 'No Liked Products Yet',
        emptyDesc: 'Start exploring our shop and like products to save them here for later!',
        browseShop: 'Browse Shop',
        count: '{{count}} product{{plural}} in your favorites',
        featured: 'Featured',
        sale: 'Sale',
        addToCart: 'Add to Cart'
      },
      shopLabels: {
        featured: 'Featured',
        sale: 'Sale',
        addToCart: 'Add to Cart'
      },
      teamsPage: {
        addNewTeam: 'Add New Team',
        active: 'ACTIVE',
        teamSize: 'Team Size',
        hotStreak: 'Hot Streak'
      },
      login: {
        heading: 'Welcome Back',
        subheading: 'Enter the arena and dominate the competition',
        orContinue: 'Or continue with',
        usernameOrEmail: 'Username or Email',
        password: 'Password',
        invalidCredentials: 'Invalid credentials',
        forgotPassword: 'Forgot password?',
        loading: 'Entering Arena...',
        submit: 'Enter Arena',
        newHere: 'New to Elite Arena?',
        createAccount: 'Create Account'
      },
      checkout: {
        yourCart: 'Your Cart',
        emptyCart: 'Your cart is empty.',
        promoPlaceholder: 'Promo code',
        apply: 'Apply',
        promoInvalid: 'Invalid promo code',
        promoApplied: 'Promo applied! -{{amount}} MAD',
        total: 'Total',
        shippingAddress: 'Shipping Address',
        fields: {
          fullName: 'Full Name',
          address: 'Address',
          city: 'City',
          postalCode: 'Postal Code',
          country: 'Country'
        },
        paymentMethod: 'Payment Method',
        card: 'Credit Card',
        cash: 'Cash on Delivery',
        cardInfo: 'Credit Card Information',
        payNow: 'Pay Now',
        placeOrder: 'Place Order',
        stripeNotLoaded: 'Stripe not loaded',
        processing: 'Processing...',
        cashPanel: 'You selected <strong>Cash on Delivery</strong>. Please have the exact amount ready when your order is delivered.'
      },
      orderConfirmation: {
        thankYou: 'Thank you for your order!',
        placed: 'Your order has been placed successfully.',
        orderNumber: 'Order Number:',
        summary: 'Order Summary',
        noItems: 'No items found.',
        total: 'Total:',
        continueShopping: 'Continue Shopping'
      },
      notFound: {
        title: '404',
        subtitle: 'Oops! Page not found',
        returnHome: 'Return to Home'
      },
      register: {
        heading: 'Join Elite Arena',
        subheading: 'Create your account and start your esports journey',
        orWithEmail: 'Or register with email',
        placeholders: {
          username: 'Choose a username',
          email: 'Enter your email',
          password: 'Create a password',
          confirmPassword: 'Confirm your password'
        },
        strengthLabel: 'Password Strength:',
        strength: {
          weak: 'Weak',
          fair: 'Fair',
          good: 'Good',
          strong: 'Strong'
        },
        createLoading: 'Creating Account...',
        submit: 'Join the Arena',
        haveAccount: 'Already have an account?',
        signIn: 'Sign In',
        errors: {
          passwordMismatch: 'Passwords do not match',
          passwordWeak: 'Password is too weak. Please use a stronger password.',
          registrationFailed: 'Registration failed. Please try again.'
        }
      },
      profile: {
        notLoggedIn: 'Not logged in.',
        editProfile: 'Edit Profile',
        logout: 'Logout',
        modalTitle: 'Edit Profile',
        labels: {
          username: 'Username',
          email: 'Email',
          level: 'Level',
          winRate: 'Win Rate',
          totalMatches: 'Total Matches'
        },
        saveChanges: 'Save Changes',
        cancel: 'Cancel',
        messages: {
          usernameEmpty: 'Username cannot be empty',
          updated: 'Profile updated!'
        }
      }
    }
  },
  ar: {
    translation: {
      nav: {
        home: 'الرئيسية',
        teams: 'الفرق',
        players: 'اللاعبون',
        tournaments: 'البطولات',
        shop: 'المتجر',
        contact: 'تواصل معنا'
      },
      auth: {
        login: 'تسجيل الدخول',
        register: 'إنشاء حساب',
        forgotPassword: 'هل نسيت كلمة المرور؟',
        username: 'اسم المستخدم',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        logout: 'تسجيل الخروج'
      },
      navigation: {
        hi: 'مرحباً،',
        cart: 'عربة التسوق',
        emptyCart: 'عربة التسوق فارغة.',
        remove: 'حذف',
        total: 'الإجمالي:',
        checkout: 'إتمام الشراء',
        clearCart: 'تفريغ العربة'
      },
      home: {
        title: 'ساحة الرياضات الإلكترونية النخبة',
        subtitle: 'حيث يرتقي الأبطال',
        description: 'انضم إلى تجربة الألعاب التنافسية الأقوى مع فرق محترفة وبطولات ملحمية وتكنولوجيا متطورة.',
        watchLive: 'شاهد مباشر',
        joinTournament: 'انضم للبطولة',
        liveLabel: 'مباشر',
        whyChooseTitle: 'لماذا تختار ساحة النخبة؟',
        liveStatsTitle: 'إحصائيات المنصة المباشرة',
        playersOnline: 'لاعبون متصلون',
        liveMatches: 'مباريات مباشرة',
        totalPrizePool: 'إجمالي الجوائز',
        achievementsTitle: 'إنجازات المنصة',
        achievementsSubtitle: 'شاهد الإنجازات الرائعة التي حققتها مجتمع الألعاب لدينا',
        achievements: {
          tournamentWins: 'انتصارات البطولات',
          activeTeams: 'الفرق النشطة',
          matchesPlayed: 'المباريات المُقامة',
          champions: 'الأبطال'
        },
        testimonialsTitle: 'شهادات الأبطال',
        testimonialsSubtitle: 'استمع إلى لاعبي النخبة وأبطال البطولات',
        testimonials: {
          items: [
            {
              name: "أليكس 'ProShot' تشين",
              role: 'لاعب رياضات إلكترونية محترف',
              team: 'فريق نيكسَس',
              quote: 'غيرت ساحة النخبة مسيرتي في الألعاب. البطولات عالمية المستوى والمجتمع رائع.'
            },
            {
              name: "سارة 'Lightning' رودريغيز",
              role: 'بطلة بطولات',
              team: 'ستорм رايدرز',
              quote: 'ساعدتني ميزات المنصة والبيئة التنافسية على الوصول إلى القمة. أفضل منصة للرياضات الإلكترونية!'
            },
            {
              name: "ماركوس 'Phantom' جونسون",
              role: 'قائد فريق',
              team: 'شادو ليجيون',
              quote: 'أدوات إدارة الفرق ونظام البطولات في ساحة النخبة لا مثيل لهما. إنها نقطة تحول!'
            }
          ]
        },
        setupTitle: 'معدات اللعب الاحترافية',
        setupSubtitle: 'اكتشف إعداد الألعاب المثالي المستخدم من أبطالنا',
        setupItems: {
          ultraWide: { title: 'شاشة فائقة الاتساع', spec: '240هرتز OLED' },
          proAudio: { title: 'صوت احترافي', spec: 'محيطي 7.1' },
          gamingRig: { title: 'جهاز ألعاب', spec: 'RTX 4090' },
          eliteController: { title: 'وحدة تحكم النخبة', spec: 'استجابة 0.1ms' }
        },
        features: {
          epicTournaments: {
            title: 'بطولات ملحمية',
            description: 'نافس في بطولات عالية المخاطر مع جوائز ضخمة'
          },
          eliteTeams: {
            title: 'فرق النخبة',
            description: 'انضم إلى فرق محترفة وتسلق السلم التنافسي'
          },
          liveStreaming: {
            title: 'بث مباشر',
            description: 'شاهد المباريات مباشرة مع تعليق وتحليل لحظي'
          }
        }
      },
      teams: {
        title: 'الفرق النخبة',
        subtitle: 'التق بأبطالنا',
        stats: {
          matches: 'المباريات',
          wins: 'الانتصارات',
          tournaments: 'البطولات'
        }
      },
      players: {
        title: 'اللاعبون المحترفون',
        subtitle: 'الأفضل في اللعبة',
        noPlayers: 'لا يوجد لاعبون مسجلون بعد.',
        age: 'العمر:',
        remove: 'حذف',
        ctaTitle: 'هل تعتقد أنك تمتلك المهارة؟',
        ctaSubtitle: 'انضم إلى قائمتنا النخبوية من اللاعبين المحترفين وتنافس على أعلى المستويات.',
        applyNow: 'قدّم الآن'
      },
      tournaments: {
        title: 'البطولات',
        subtitle: 'تنافس من أجل المجد',
        upcoming: 'قادمة',
        live: 'مباشر الآن',
        registration: 'التسجيل مفتوح',
        prizePool: 'الجوائز',
        watchLive: 'مشاهدة البث',
        comingSoon: 'قادمة قريباً',
        registerNow: 'سجّل الآن',
        teamsLabel: 'فرق',
        liveStreamTitle: 'بث البطولة المباشر',
        liveStreamSubtitle: 'شاهد الأحداث لحظة بلحظة'
      },
      shop: {
        title: 'معدات الألعاب',
        subtitle: 'بضائع الرياضات الإلكترونية المميزة'
      },
      contact: {
        title: 'تواصل معنا',
        subtitle: 'هل أنت جاهز للانضمام للنخبة؟',
        sendUsMessage: 'أرسل لنا رسالة',
        responseTime: 'سنرد عليك خلال 24 ساعة',
        form: {
          firstName: 'الاسم الأول',
          lastName: 'اسم العائلة',
          email: 'البريد الإلكتروني',
          subject: 'الموضوع',
          message: 'الرسالة'
        },
        placeholders: {
          firstName: 'محمد',
          lastName: 'أحمد',
          email: 'name@example.com',
          subject: 'ما موضوع رسالتك؟',
          message: 'أخبرنا المزيد عن استفسارك...'
        },
        sendMessage: 'إرسال الرسالة',
        getInTouch: 'ابقَ على تواصل',
        departmentsTitle: 'الأقسام',
        labels: {
          email: 'البريد الإلكتروني',
          phone: 'الهاتف',
          address: 'العنوان'
        },
        mapTitle: 'قم بزيارة ساحة الألعاب الخاصة بنا',
        mapSubtitle: 'اختبر مستقبل الألعاب التنافسية في منشأتنا المتطورة',
        mapInteractive: 'خريطة تفاعلية',
        mapClick: 'انقر لعرض موقعنا على خرائط Google'
      },
      liked: {
        title: 'المنتجات المُعجَب بها',
        emptySubtitle: 'ستظهر منتجاتك المفضلة هنا',
        emptyHeader: 'لا توجد منتجات مُعجَب بها بعد',
        emptyDesc: 'ابدأ استكشاف المتجر وأضف إعجابك بالمنتجات لحفظها هنا لاحقاً!',
        browseShop: 'تصفح المتجر',
        count: '{{count}} منتج{{plural}} في المفضلة',
        featured: 'متميز',
        sale: 'تخفيض',
        addToCart: 'أضف إلى السلة'
      },
      shopLabels: {
        featured: 'متميز',
        sale: 'تخفيض',
        addToCart: 'أضف إلى السلة'
      },
      teamsPage: {
        addNewTeam: 'إضافة فريق جديد',
        active: 'نشِط',
        teamSize: 'حجم الفريق',
        hotStreak: 'سلسلة انتصارات'
      },
      login: {
        heading: 'مرحباً بعودتك',
        subheading: 'ادخل الساحة وسيطر على المنافسة',
        orContinue: 'أو تابع عبر',
        usernameOrEmail: 'اسم المستخدم أو البريد الإلكتروني',
        password: 'كلمة المرور',
        invalidCredentials: 'بيانات اعتماد غير صحيحة',
        forgotPassword: 'هل نسيت كلمة المرور؟',
        loading: 'جاري الدخول إلى الساحة...',
        submit: 'ادخل الساحة',
        newHere: 'جديد على Elite Arena؟',
        createAccount: 'إنشاء حساب'
      },
      checkout: {
        yourCart: 'سلة التسوق',
        emptyCart: 'عربة التسوق فارغة.',
        promoPlaceholder: 'كود الخصم',
        apply: 'تطبيق',
        promoInvalid: 'كود خصم غير صالح',
        promoApplied: 'تم تطبيق الخصم! -{{amount}} درهم',
        total: 'الإجمالي',
        shippingAddress: 'عنوان الشحن',
        fields: {
          fullName: 'الاسم الكامل',
          address: 'العنوان',
          city: 'المدينة',
          postalCode: 'الرمز البريدي',
          country: 'البلد'
        },
        paymentMethod: 'طريقة الدفع',
        card: 'بطاقة ائتمانية',
        cash: 'الدفع عند الاستلام',
        cardInfo: 'بيانات البطاقة الائتمانية',
        payNow: 'ادفع الآن',
        placeOrder: 'إتمام الطلب',
        stripeNotLoaded: 'لم يتم تحميل Stripe',
        processing: 'جاري المعالجة...',
        cashPanel: 'لقد اخترت <strong>الدفع عند الاستلام</strong>. يرجى تجهيز المبلغ المطلوب عند تسليم الطلب.'
      },
      orderConfirmation: {
        thankYou: 'شكراً لطلبك!',
        placed: 'تم تقديم طلبك بنجاح.',
        orderNumber: 'رقم الطلب:',
        summary: 'ملخص الطلب',
        noItems: 'لا توجد عناصر.',
        total: 'الإجمالي:',
        continueShopping: 'متابعة التسوق'
      },
      notFound: {
        title: '404',
        subtitle: 'عذراً! الصفحة غير موجودة',
        returnHome: 'العودة إلى الرئيسية'
      },
      register: {
        heading: 'انضم إلى ساحة النخبة',
        subheading: 'أنشئ حسابك وابدأ رحلتك في عالم الرياضات الإلكترونية',
        orWithEmail: 'أو سجّل عبر البريد الإلكتروني',
        placeholders: {
          username: 'اختر اسم المستخدم',
          email: 'أدخل بريدك الإلكتروني',
          password: 'أنشئ كلمة مرور',
          confirmPassword: 'أكد كلمة المرور'
        },
        strengthLabel: 'قوة كلمة المرور:',
        strength: {
          weak: 'ضعيفة',
          fair: 'متوسطة',
          good: 'جيدة',
          strong: 'قوية'
        },
        createLoading: 'جاري إنشاء الحساب...',
        submit: 'انضم إلى الساحة',
        haveAccount: 'لديك حساب بالفعل؟',
        signIn: 'تسجيل الدخول',
        errors: {
          passwordMismatch: 'كلمتا المرور غير متطابقتين',
          passwordWeak: 'كلمة المرور ضعيفة. يرجى استخدام كلمة أقوى.',
          registrationFailed: 'فشل إنشاء الحساب. حاول مرة أخرى.'
        }
      },
      profile: {
        notLoggedIn: 'لم يتم تسجيل الدخول.',
        editProfile: 'تعديل الملف الشخصي',
        logout: 'تسجيل الخروج',
        modalTitle: 'تعديل الملف الشخصي',
        labels: {
          username: 'اسم المستخدم',
          email: 'البريد الإلكتروني',
          level: 'المستوى',
          winRate: 'معدل الفوز',
          totalMatches: 'إجمالي المباريات'
        },
        saveChanges: 'حفظ التغييرات',
        cancel: 'إلغاء',
        messages: {
          usernameEmpty: 'لا يمكن أن يكون اسم المستخدم فارغاً',
          updated: 'تم تحديث الملف الشخصي!'
        }
      }
    }
  }
};

// Load preferred language from localStorage if available
const storedLang = typeof window !== 'undefined' ? localStorage.getItem('app-lang') : null;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: storedLang || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Ensure document direction matches current language
if (typeof document !== 'undefined') {
  document.documentElement.dir = (i18n.language === 'ar') ? 'rtl' : 'ltr';
}

// Persist language changes and update direction
i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined' && 'localStorage' in window) {
    localStorage.setItem('app-lang', lng);
  }
  if (typeof document !== 'undefined') {
    document.documentElement.dir = (lng === 'ar') ? 'rtl' : 'ltr';
  }
});

export default i18n;