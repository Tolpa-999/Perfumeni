// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
    en: {
        translation: {
            signup: 'Sign Up',
            signupButton: 'Create Account',
            signupButtonLoading: 'Creating Account...',
            signin: 'Sign In',
            signinButton: 'Signing In...',
            email: 'Email',
            password: 'Password',
            username: 'Username',
            already: "Already have an account ? ",
            not: "Don't have an account ? ",
            welcome: "Welcome to Perfumeni!",
            description: "This is a sample description in English.",
            home: "Home",
            products: "Products",
            cart: "Cart",
            yourCart: "Your Cart",
            noCart: "Your cart is empty.",
            addCart: "Add some products to get started.",
            total: "Total Price",
            clear: "Clear Cart",
            yourFavourite: "Your Favourite",
            favourite: "Favourite",
            noFavourite: "No Favourites Yet.",
            browse: "Browse products and add them to your favorites.",
            logout: "Logout",
            explore: "Explore Our Latest Collection",
            scroll: "Scroll down to discover more!",
            shop: "Shop Now",
            mens: "Mens Collection",
            womens: "Womens Collection",
            unisex: "Unisex Collection",
            show: "Show More",
            luxury: "Your luxury perfume destination.",
            links: "Quick Links",
            support: "Customer Support",
            about: "About Us",
            contact: "Contact Us",
            privacy: "Privacy Policy",
            terms: "Terms Of Service",
            subscribe: "Subscribe",
            placeholder: "Subscribe To Our Newsletter",
            rights: " Perfumeni. All rights reserved."
            // ... add more keys as needed
        }
    },
    ar: {
        translation: {
            signup: "إنشاء حساب",
            signupButton: 'إنشاء حساب',
            signupButtonLoading: '... جاري إنشاء حساب',
            signin: 'تسجيل الدخول',
            signinButton: '... جاري تسجيل الدخول',
            email: 'البريد الإلكتروني',
            password: 'كلمة المرور',
            username: 'اسم المستخدم',
            already: " لديك حساب بالفعل ؟",
            not: " ليس لديك حساب ؟",
            welcome: "مرحبًا بكم في بيرفوميني!",
            description: "هذا مثال على وصف باللغة العربية.",
            home: "الصفحة الرئيسية",
            products: "المنتجات",
            cart: 'عربة التسوق',
            yourCart: "عربة التسوق الخاصة بك",
            noCart: "عربة التسوق الخاصة بك فارغة.",
            addCart: "أضف بعض العطور للبدء.",
            total: "السعر الإجمالي",
            clear: "تصفية عربة التسوق",
            yourFavourite: "العطور المفضلة",
            favourite: "المفضلة",
            noFavourite: "لا توجد عطور مفضله حتى الآن.",
            browse: "تصفح العطور وأضفها إلى المفضلة الخاصة بك.",
            logout: "تسجيل الخروج",
            explore: "تصفح أحدث مجموعات لدينا",
            scroll: "مرر إلى الأسفل لإكتشاف المزيد",
            shop: "تسوق الان",
            mens: "مجموعة الرجال",
            womens: "مجموعة النساء",
            unisex: " مجموعة ل الرجال والنساء",
            show: "عرض المزيد",
            luxury: "وجهتك للعطور الفاخرة.",
            links: "روابط",
            support: "دعم العملاء",
            about: "عنا",
            contact: "تواصل معنا",
            privacy: "سياسة الخصوصية",
            terms: "شروط الخدمة",
            subscribe: "اشترك",
            placeholder: "اشترك في قائمة النشرة البريدية",
            rights: " Perfumeni. جميع الحقوق محفوظة."
            // ... add more keys as needed
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en', // default language
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // React already escapes values
        }
    });

export default i18n;
