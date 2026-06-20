export const MOBILE_NAVIGATION_HEIGHT = 66;

export const FOOTER_CONTACTS = {
    phone: '8 (999) 000-00-00',
    email: 'dogfood.ru@gmail.com',
    title: 'Мы всегда на связи',
    desktopTitle: 'Мы на связи',
    copyright: '© «Интернет-магазин натуральных лакомств для собак HorDog.ru»',
    desktopCopyright: '© «Интернет-магазин DogFood.ru»',
};

export const getNormalPhone = (phone: string) => phone.replaceAll('(', '').replaceAll('-', '').replaceAll(' ', '');

export const NAVIGATION = [
    {
        id: 0,
        title: 'Каталог',
        path: '/catalog',
    },
    {
        id: 1,
        title: 'Акции',
        path: '/discount',
    },
    {
        id: 2,
        title: 'Новости',
        path: '/news',
    },
    {
        id: 3,
        title: 'Отзывы',
        path: '/reviews',
    },
    {
        id: 4,
        title: 'Оплата и доставка',
        path: '/delivery',
    },
    {
        id: 5,
        title: 'Часто спрашивают',
        path: '/faq',
    },
    {
        id: 6,
        title: 'Обратная свзязь',
        path: '/feedback',
    },
    {
        id: 7,
        title: 'Контакты',
        path: '/contacts',
    },
];
