// shows.js
const shows = [{
        id: '1',
        title: 'Клоуни та сміх',
        description: 'Весела вистава для всієї родини',
        type: 'Клоуни',
        image: '/images/clowns.jpg',
        date: '2025-05-15',
        time: '18:00',
        city: 'Львів'
    },
    {
        id: '2',
        title: 'Повітряні акробати',
        description: 'Захопливі трюки під куполом цирку',
        type: 'Акробати',
        image: '/images/acrobats.jpg',
        date: '2025-05-18',
        time: '19:00',
        city: 'Київ'
    },
    {
        id: '3',
        title: 'Танцювальні фантазії',
        description: 'Сучасні танці та хореографія',
        type: 'Танці',
        image: '/images/dance.jpg',
        date: '2025-05-20',
        time: '17:00',
        city: 'Одеса'
    },
    {
        id: '4',
        title: 'Магія під куполом',
        description: 'Незабутні фокуси та ілюзії',
        type: 'Фокуси',
        image: '/images/magic.jpg',
        date: '2025-05-22',
        time: '20:00',
        city: 'Харків'
    },
    {
        id: '5',
        title: 'Сила тварин',
        description: 'Захоплюючі номери з участю тварин',
        type: 'Тварини',
        image: '/images/animals.jpg',
        date: '2025-05-25',
        time: '18:30',
        city: 'Львів'
    },
    {
        id: '6',
        title: 'Повітряний балет',
        description: 'Трюки на повітряних кулях та тросах',
        type: 'Балет',
        image: '/images/aerial.jpg',
        date: '2025-05-28',
        time: '19:30',
        city: 'Київ'
    },
    {
        id: '7',
        title: 'Ніч фокуса',
        description: 'Магічні та ілюзійні виступи в темряві',
        type: 'Фокуси',
        image: '/images/night_magic.jpg',
        date: '2025-06-01',
        time: '21:00',
        city: 'Львів'
    },
    {
        id: '8',
        title: 'Повітряні шоу',
        description: 'Захоплюючі номери на канатах та тросах',
        type: 'Акробати',
        image: '/images/air_show.jpg',
        date: '2025-06-03',
        time: '20:00',
        city: 'Київ'
    },
    {
        id: '9',
        title: 'Магічна реальність',
        description: 'Фокуси з використанням сучасних технологій',
        type: 'Фокуси',
        image: '/images/magic_tech.jpg',
        date: '2025-06-05',
        time: '19:00',
        city: 'Одеса'
    },
    {
        id: '10',
        title: 'Сміхотерапія',
        description: 'Вистава, яка лікує сміхом',
        type: 'Комедія',
        image: '/images/laugh.jpg',
        date: '2025-06-07',
        time: '18:00',
        city: 'Львів'
    },
    {
        id: '11',
        title: 'Зоряний цирк',
        description: 'Вистава за участю зірок шоу-бізнесу',
        type: 'Цирк',
        image: '/images/star_circus.jpg',
        date: '2025-06-10',
        time: '20:30',
        city: 'Харків'
    },
    {
        id: '12',
        title: 'Магія кольору',
        description: 'Незвичайні фокуси з кольоровими матеріалами',
        type: 'Фокуси',
        image: '/images/color_magic.jpg',
        date: '2025-06-12',
        time: '19:30',
        city: 'Київ'
    },
    {
        id: '13',
        title: 'Захоплюючі танці',
        description: 'Незабутні танцювальні постановки',
        type: 'Танці',
        image: '/images/exciting_dance.jpg',
        date: '2025-06-14',
        time: '18:30',
        city: 'Одеса'
    },
    {
        id: '14',
        title: 'Симфонія повітря',
        description: 'Номер з акробатами та музикою',
        type: 'Музика',
        image: '/images/symphony_air.jpg',
        date: '2025-06-17',
        time: '21:00',
        city: 'Львів'
    },
    {
        id: '15',
        title: 'Ілюзія часу',
        description: 'Магічні фокуси, що змінюють сприйняття часу',
        type: 'Фокуси',
        image: '/images/illusion_time.jpg',
        date: '2025-06-20',
        time: '19:00',
        city: 'Харків'
    },
    {
        id: '16',
        title: 'Чарівні звірі',
        description: 'Тварини, які виконують неймовірні трюки',
        type: 'Тварини',
        image: '/images/magic_animals.jpg',
        date: '2025-06-23',
        time: '18:30',
        city: 'Київ'
    },
    {
        id: '17',
        title: 'Балет на крилах',
        description: 'Танці в повітрі на спеціальних платформах',
        type: 'Балет',
        image: '/images/ballet_wings.jpg',
        date: '2025-06-25',
        time: '20:00',
        city: 'Одеса'
    },
    {
        id: '18',
        title: 'Небесні артисти',
        description: 'Номери на висоті, акробати в повітрі',
        type: 'Акробати',
        image: '/images/heavenly_artists.jpg',
        date: '2025-06-27',
        time: '19:00',
        city: 'Львів'
    },
    {
        id: '19',
        title: 'Космічні ілюзії',
        description: 'Фокуси та трюки з космічною тематикою',
        type: 'Фокуси',
        image: '/images/cosmic_illusions.jpg',
        date: '2025-06-30',
        time: '20:30',
        city: 'Київ'
    },
    {
        id: '20',
        title: 'Льодовий цирк',
        description: 'Номер на льоду з фігуристами',
        type: 'Цирк',
        image: '/images/ice_circus.jpg',
        date: '2025-07-02',
        time: '19:30',
        city: 'Харків'
    },
    {
        id: '21',
        title: 'Чарівний світ',
        description: 'Неймовірні трюки у світі магії',
        type: 'Магія',
        image: '/images/magic_world.jpg',
        date: '2025-07-05',
        time: '20:00',
        city: 'Одеса'
    },
    {
        id: '22',
        title: 'Нічний цирк',
        description: 'Цирк під зорями',
        type: 'Цирк',
        image: '/images/night_circus.jpg',
        date: '2025-07-07',
        time: '21:00',
        city: 'Львів'
    },
    {
        id: '23',
        title: 'Гравітація',
        description: 'Фокуси з використанням гравітації',
        type: 'Фокуси',
        image: '/images/gravity.jpg',
        date: '2025-07-10',
        time: '19:00',
        city: 'Київ'
    },
    {
        id: '24',
        title: 'Танцювальна магія',
        description: 'Танцювальні вистави з фокусами',
        type: 'Танці',
        image: '/images/dance_magic.jpg',
        date: '2025-07-12',
        time: '20:30',
        city: 'Харків'
    },
    {
        id: '25',
        title: 'Сонячні акробати',
        description: 'Трюки з використанням сонячної енергії',
        type: 'Акробати',
        image: '/images/sun_acrobats.jpg',
        date: '2025-07-14',
        time: '18:00',
        city: 'Львів'
    },
    {
        id: '26',
        title: 'Театр вогню',
        description: 'Номери з вогнем та піротехнікою',
        type: 'Вогонь',
        image: '/images/fire_theatre.jpg',
        date: '2025-07-17',
        time: '20:00',
        city: 'Одеса'
    },
    {
        id: '27',
        title: 'Вихор емоцій',
        description: 'Силові номери, які піднімуть настрій',
        type: 'Сила',
        image: '/images/emotion_tornado.jpg',
        date: '2025-07-20',
        time: '21:30',
        city: 'Київ'
    },
    {
        id: '28',
        title: 'Цирк на воді',
        description: 'Акробати, що виконують трюки на воді',
        type: 'Цирк',
        image: '/images/water_circus.jpg',
        date: '2025-07-23',
        time: '18:30',
        city: 'Харків'
    },
    {
        id: '29',
        title: 'Світло й тіні',
        description: 'Фокуси, що створюють ілюзії з тінями',
        type: 'Фокуси',
        image: '/images/light_and_shadows.jpg',
        date: '2025-07-25',
        time: '19:00',
        city: 'Одеса'
    },
    {
        id: '30',
        title: 'Ігри розуму',
        description: 'Фокуси з розумовими маніпуляціями',
        type: 'Магія',
        image: '/images/mind_games.jpg',
        date: '2025-07-28',
        time: '20:30',
        city: 'Львів'
    }
];

export default shows;