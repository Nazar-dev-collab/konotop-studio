(() => {
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const store = { get(k){ try{return localStorage.getItem(k)}catch(e){return null} }, set(k,v){ try{localStorage.setItem(k,v)}catch(e){} } };

/* ================= language ================= */
let lang = root.getAttribute('data-lang'); if(lang!=='en') lang='uk';
const LI = {ru:0,uk:1,en:2};
const L = a => Array.isArray(a) ? a[LI[lang]] : a;
const T = {
  'nav.cats':['Категории','Категорії','Categories'], 'nav.catalog':['Каталог','Каталог','Catalog'],
  'nav.sizes':['Размеры','Розміри','Sizes'], 'nav.contacts':['Контакты','Контакти','Contacts'],
  'cart':['Корзина','Кошик','Cart'], 'close':['Закрыть','Закрити','Close'],
  'theme':['Сменить тему','Змінити тему','Switch theme'],
  'hero.eyebrow':['Магазин одежды · осень–зима 2026','Магазин одягу · осінь–зима 2026','Clothing store · Autumn–Winter 2026'],
  'hero.lead':['Одежда, в которой <em>тепло и спокойно</em>. Джинсы и брюки, мягкие кофты, рубашки, базовые футболки, а к холодам шапки и перчатки. Мерить можно дома, а возвращать бесплатно.',
               'Одяг, у якому <em>тепло і спокійно</em>. Джинси та штани, м’які кофти, сорочки, базові футболки, а до холодів шапки й рукавички. Міряти можна вдома, а повертати безкоштовно.',
               'Clothes that feel <em>warm and calm</em>. Jeans and trousers, soft sweatshirts, shirts, everyday tees, plus hats and gloves for the cold. Try them on at home; returns are free.'],
  'hero.cta1':['Смотреть каталог →','Дивитися каталог →','Shop the catalog →'],
  'hero.cta2':['Категории','Категорії','Categories'],
  'scroll':['листайте','гортайте','scroll'],
  'rack.eyebrow':['Новая коллекция','Нова колекція','New collection'],
  'rack.title':['Вешалка новой коллекции','Вішак нової колекції','The new collection rail'],
  'rack.hint':['Наведите на вещь, и она развернётся. Нажмите, чтобы рассмотреть','Наведіть на річ, і вона розвернеться. Натисніть, щоб роздивитися','Hover to turn a piece around. Click to take a closer look'],
  'rack.hintm':['Гортайте вбік і торкніться речі','Гортайте вбік і торкніться речі','Swipe sideways and tap a piece'],
  'credit':['Демо-концепт сайту магазину одягу. Дизайн і розробка: <a href="https://konotop-site.vercel.app" target="_blank" rel="noopener">KONOTOP STUDIO</a>.','Демо-концепт сайту магазину одягу. Дизайн і розробка: <a href="https://konotop-site.vercel.app" target="_blank" rel="noopener">KONOTOP STUDIO</a>.','Concept demo of a clothing store website. Design and development: <a href="https://konotop-site.vercel.app" target="_blank" rel="noopener">KONOTOP STUDIO</a>.'],
  'skip':['Перейти до каталогу','Перейти до каталогу','Skip to catalog'],
  'err.name':['Вкажіть ім’я та прізвище','Вкажіть ім’я та прізвище','Enter your first and last name'],
  'err.phone':['Номер у форматі +380 XX XXX XX XX','Номер у форматі +380 XX XXX XX XX','Use the format +380 XX XXX XX XX'],
  'err.city':['Вкажіть місто й номер відділення','Вкажіть місто й номер відділення','Enter a city and branch number'],
  'back':['Вернуться к вешалке','Повернутися до вішака','Back to the rail'],
  'prev':['Предыдущая вещь','Попередня річ','Previous item'], 'next':['Следующая вещь','Наступна річ','Next item'],
  'esc':['Esc или × — обратно к вешалке','Esc або × — назад до вішака','Esc or × to go back to the rail'],
  'cats.eyebrow':['Категории','Категорії','Categories'],
  'cats.title':['Что есть в магазине','Що є в магазині','What we carry'],
  'cats.text':['Восемь разделов, от базовой футболки до шерстяных перчаток. Нажмите на категорию, и каталог покажет только её.','Вісім розділів, від базової футболки до вовняних рукавичок. Натисніть на категорію, і каталог покаже тільки її.','Eight sections, from a basic tee to wool gloves. Pick a category and the catalog will show only that.'],
  'models':['мод.','мод.','styles'],
  'cat.eyebrow':['Каталог','Каталог','Catalog'],
  'cat.title':['Выбирайте цвет прямо на карточке','Обирайте колір прямо на картці','Pick a colour right on the card'],
  'cat.text':['Кружки под товаром переключают цвет. Нажмите на фото, чтобы выбрать размер.','Кружечки під товаром перемикають колір. Натисніть на фото, щоб обрати розмір.','The dots under each item switch its colour. Tap the photo to choose a size.'],
  'all':['Все','Усі','All'], 'sort':['Сортировка','Сортування','Sort'],
  'sort.pop':['Сначала популярные','Спочатку популярні','Most popular'], 'sort.asc':['Дешевле','Дешевші','Price: low to high'],
  'sort.desc':['Дороже','Дорожчі','Price: high to low'], 'sort.new':['Новинки','Новинки','New in'],
  'choose':['Выбрать','Обрати','Choose'], 'empty':['В этой категории пока пусто.','У цій категорії поки порожньо.','Nothing here yet.'],
  'more':['Подробнее','Детальніше','Details'],
  'sz.eyebrow':['Размеры и ткани','Розміри й тканини','Sizes & fabrics'],
  'sz.title':['Как подобрать размер','Як підібрати розмір','Finding your size'],
  'sz.text':['Измерьте обхват груди по самой выступающей точке, а талию на уровне пупка. Если значение между двумя размерами, для кофт и курток берите больший.','Виміряйте обхват грудей у найвиступнішій точці, а талію на рівні пупка. Якщо значення між двома розмірами, для кофт і курток беріть більший.','Measure your chest at its fullest point and your waist at navel level. If you fall between two sizes, size up for sweatshirts and jackets.'],
  'f1.v':['240 г/м²','240 г/м²','240 g/m²'], 'f1':['плотность хлопка в футболках','щільність бавовни у футболках','cotton weight in our tees'],
  'f2.v':['12,5 oz','12,5 oz','12.5 oz'], 'f2':['деним для джинсов, без стрейча','денім для джинсів, без стрейчу','rigid denim for jeans'],
  'f3':['мериносовой шерсти в шапках','мериносової вовни в шапках','merino wool in hats'],
  'f4.v':['14 дней','14 днів','14 days'], 'f4':['на бесплатный возврат','на безкоштовне повернення','for free returns'],
  'th.size':['Размер','Розмір','Size'], 'th.chest':['Грудь, см','Груди, см','Chest, cm'], 'th.waist':['Талия, см','Талія, см','Waist, cm'], 'th.height':['Рост, см','Зріст, см','Height, cm'],
  'ft.about':['Магазин повседневной одежды. Отправляем Новой Почтой в день заказа, если он оформлен до 15:00.','Магазин повсякденного одягу. Відправляємо Новою Поштою в день замовлення, якщо його оформлено до 15:00.','Everyday clothing store. Orders placed before 3 pm ship with Nova Poshta the same day.'],
  'ft.hours':['Пн–Сб, 10:00–20:00','Пн–Сб, 10:00–20:00','Mon–Sat, 10 am – 8 pm'],
  'ft.buyers':['Покупателям','Покупцям','Customer care'], 'ft.sizes':['Таблица размеров','Таблиця розмірів','Size chart'],
  'info.ship':['Доставка и оплата','Доставка й оплата','Delivery & payment'],
  'info.ret':['Обмен и возврат','Обмін і повернення','Exchanges & returns'],
  'info.care':['Уход за вещами','Догляд за речами','Garment care'],
  'info.ship.t':['Отправляем Новой Почтой в день заказа, если он оформлен до 15:00. От 2500 грн доставка бесплатная. Оплата картой на сайте или при получении, после примерки в отделении.','Відправляємо Новою Поштою в день замовлення, якщо його оформлено до 15:00. Від 2500 грн доставка безкоштовна. Оплата карткою на сайті або при отриманні, після примірки у відділенні.','We ship with Nova Poshta the same day for orders placed before 3 pm. Delivery is free over 2,500 UAH. Pay by card online or on collection, after trying things on at the branch.'],
  'info.ret.t':['У вас 14 дней, чтобы вернуть или обменять вещь. Достаточно сохранить бирки и привезти её в любое отделение Новой Почты: обратную доставку оплачиваем мы.','У вас 14 днів, щоб повернути або обміняти річ. Достатньо зберегти бирки й принести її в будь-яке відділення Нової Пошти: зворотну доставку оплачуємо ми.','You have 14 days to return or exchange an item. Keep the tags on and drop it at any Nova Poshta branch; we pay for the return shipping.'],
  'info.care.t':['Хлопок и деним стирайте при 30°, наизнанку, без отбеливателя. Шерстяные шапки и перчатки только ручная стирка в холодной воде, сушить в разложенном виде. Лён гладьте слегка влажным.','Бавовну й денім періть при 30°, навиворіт, без відбілювача. Вовняні шапки й рукавички лише ручне прання в холодній воді, сушити в розкладеному вигляді. Льон прасуйте трохи вологим.','Wash cotton and denim at 30°C, inside out, no bleach. Wool hats and gloves are hand wash only in cold water; dry them flat. Iron linen while slightly damp.'],
  'gotit':['Понятно','Зрозуміло','Got it'],
  'color':['Цвет','Колір','Colour'], 'size':['Размер','Розмір','Size'],
  'addcart':['Добавить в корзину','Додати в кошик','Add to cart'], 'picksize':['Выберите размер','Оберіть розмір','Choose a size'],
  'toast.added':['Добавлено в корзину','Додано в кошик','Added to cart'], 'toast.pick':['Сначала выберите размер','Спершу оберіть розмір','Choose a size first'],
  'cart.empty':['Корзина пока пустая. Начните с <a href="#catalog" id="toCat">каталога</a>.','Кошик поки порожній. Почніть з <a href="#catalog" id="toCat">каталогу</a>.','Your cart is empty. Start with the <a href="#catalog" id="toCat">catalog</a>.'],
  'ship.left':['До бесплатной доставки Новой Почтой: ','До безкоштовної доставки Новою Поштою: ','Left for free Nova Poshta delivery: '],
  'ship.free':['Доставка бесплатная','Доставка безкоштовна','Delivery is free'],
  'total':['Итого','Разом','Total'],
  'ph.name':['Имя и фамилия','Ім’я та прізвище','Full name'], 'ph.phone':['Телефон','Телефон','Phone'],
  'ph.city':['Город и отделение Новой Почты','Місто та відділення Нової Пошти','City and Nova Poshta branch'],
  'order':['Оформить заказ','Оформити замовлення','Place order'],
  'demo':['Это демо-версия магазина: заказ никуда не отправлен. Подключим оплату и доставку, когда сайт будет готов к запуску.','Це демо-версія магазину: замовлення нікуди не надіслано. Підключимо оплату й доставку, коли сайт буде готовий до запуску.','This is a demo store, so the order was not sent anywhere. Payment and delivery will be connected before launch.'],
  'less':['Меньше','Менше','Fewer'], 'morei':['Больше','Більше','More'],
  'buyers':['Покупателям','Покупцям','Customer care'],
};
const t = k => L(T[k]);
const BRAND = () => lang==='en' ? 'VERBA' : 'ВЕРБА';
const MQ = [['Новая коллекция осень–зима 2026','Нова колекція осінь–зима 2026','New Autumn–Winter 2026 collection'],['Бесплатная доставка от 2500 грн','Безкоштовна доставка від 2500 грн','Free delivery over 2,500 UAH'],['Примерка при получении','Примірка при отриманні','Try on at collection'],['Возврат 14 дней','Повернення 14 днів','14-day returns'],['Шерсть, деним, хлопок','Вовна, денім, бавовна','Wool, denim, cotton']];

/* ================= data ================= */
const C = {
  graphite:['#2f3638',['Графит','Графіт','Graphite']], milk:['#efe6d8',['Молочный','Молочний','Milk']], apricot:['#f4a77c',['Абрикос','Абрикос','Apricot']],
  lilac:['#b9a3e3',['Лаванда','Лаванда','Lavender']], sage:['#9cc7b0',['Шалфей','Шавлія','Sage']], denim:['#3e5d8c',['Деним','Денім','Denim']],
  light:['#86a3c9',['Светлый деним','Світлий денім','Light denim']], wine:['#7a2e3b',['Вино','Вино','Wine']], sand:['#cbb08a',['Песок','Пісок','Sand']],
  olive:['#6b7350',['Олива','Оливка','Olive']], navy:['#24324d',['Тёмно-синий','Темно-синій','Navy']], rose:['#e7a9b4',['Пудра','Пудра','Powder pink']]
};
const cn = k => L(C[k][1]);
const CATS = {
  tee:{n:['Футболки','Футболки','T-shirts'],c:'apricot'}, sweat:{n:['Кофты','Кофти','Sweatshirts'],c:'lilac'},
  shirt:{n:['Рубашки','Сорочки','Shirts'],c:'sage'}, jeans:{n:['Джинсы','Джинси','Jeans'],c:'denim'},
  pants:{n:['Брюки','Штани','Trousers'],c:'sand'}, jacket:{n:['Куртки','Куртки','Jackets'],c:'olive'},
  hat:{n:['Шапки','Шапки','Hats'],c:'wine'}, gloves:{n:['Перчатки','Рукавички','Gloves'],c:'graphite'}
};
const TAG = {hit:['Хит','Хіт','Bestseller'], nw:['Новинка','Новинка','New']};
const P = [
  {id:1,cat:'tee',n:['Футболка «Облако» оверсайз','Футболка «Хмара» оверсайз','“Cloud” oversized tee'],m:['Хлопок 240 г/м²','Бавовна 240 г/м²','Cotton 240 g/m²'],p:790,cs:['apricot','milk','graphite','sage'],tag:'hit',pop:9},
  {id:2,cat:'tee',n:['Футболка базовая прямая','Футболка базова пряма','Classic straight tee'],m:['Хлопок 180 г/м²','Бавовна 180 г/м²','Cotton 180 g/m²'],p:590,old:690,cs:['milk','navy','rose'],pop:7},
  {id:3,cat:'tee',n:['Лонгслив в рубчик','Лонгслів у рубчик','Ribbed long sleeve'],m:['Хлопок с эластаном','Бавовна з еластаном','Cotton with elastane'],p:890,cs:['lilac','graphite','milk'],tag:'nw',pop:5},
  {id:4,cat:'sweat',n:['Худи «Верба» с карманом','Худі «Верба» з кишенею','“Verba” pocket hoodie'],m:['Футер трёхнитка, начёс','Футер трьохнитка, начіс','Brushed 3-thread fleece'],p:1690,cs:['lilac','sage','graphite','apricot'],tag:'hit',pop:10},
  {id:5,cat:'sweat',n:['Свитшот свободный','Світшот вільний','Relaxed sweatshirt'],m:['Футер петля','Футер петля','Loopback jersey'],p:1390,cs:['milk','olive','wine'],pop:6},
  {id:6,cat:'sweat',n:['Кофта на молнии','Кофта на блискавці','Zip-up fleece'],m:['Флис 280 г/м²','Фліс 280 г/м²','Fleece 280 g/m²'],p:1490,old:1790,cs:['navy','sand'],pop:4},
  {id:7,cat:'shirt',n:['Рубашка оксфорд','Сорочка оксфорд','Oxford shirt'],m:['Хлопок оксфорд','Бавовна оксфорд','Oxford cotton'],p:1290,cs:['milk','light','rose'],pop:8},
  {id:8,cat:'shirt',n:['Рубашка фланелевая','Сорочка фланелева','Flannel shirt'],m:['Фланель, плотная','Фланель, щільна','Heavy flannel'],p:1390,cs:['wine','olive','navy'],tag:'nw',pop:6},
  {id:9,cat:'shirt',n:['Рубашка льняная','Сорочка лляна','Linen shirt'],m:['Лён 100%','Льон 100%','100% linen'],p:1590,cs:['sand','sage','milk'],pop:3},
  {id:10,cat:'jeans',n:['Джинсы прямые 501-крой','Джинси прямі, крій 501','Straight 501-cut jeans'],m:['Деним 12,5 oz','Денім 12,5 oz','12.5 oz denim'],p:1890,cs:['denim','light','graphite'],tag:'hit',pop:10},
  {id:11,cat:'jeans',n:['Джинсы широкие','Джинси широкі','Wide-leg jeans'],m:['Деним 12 oz','Денім 12 oz','12 oz denim'],p:1990,cs:['light','denim'],tag:'nw',pop:7},
  {id:12,cat:'jeans',n:['Джинсы зауженные','Джинси звужені','Slim jeans'],m:['Деним со стрейчем','Денім зі стрейчем','Stretch denim'],p:1690,old:1990,cs:['graphite','denim'],pop:5},
  {id:13,cat:'pants',n:['Брюки со стрелками','Штани зі стрілками','Pressed trousers'],m:['Костюмная шерсть','Костюмна вовна','Suiting wool'],p:1790,cs:['sand','graphite','navy'],pop:6},
  {id:14,cat:'pants',n:['Брюки карго','Штани карго','Cargo trousers'],m:['Хлопок твил','Бавовна твіл','Cotton twill'],p:1590,cs:['olive','sand','graphite'],tag:'hit',pop:8},
  {id:15,cat:'pants',n:['Брюки трикотажные','Штани трикотажні','Jersey joggers'],m:['Футер, начёс','Футер, начіс','Brushed fleece'],p:1190,cs:['lilac','graphite','milk'],pop:5},
  {id:16,cat:'jacket',n:['Куртка-рубашка утеплённая','Куртка-сорочка утеплена','Padded overshirt'],m:['Вельвет + синтепон','Вельвет + синтепон','Corduroy, padded'],p:2690,cs:['olive','sand','wine'],tag:'nw',pop:7},
  {id:17,cat:'jacket',n:['Джинсовая куртка','Джинсова куртка','Denim jacket'],m:['Деним 13 oz','Денім 13 oz','13 oz denim'],p:2290,cs:['denim','light'],pop:6},
  {id:18,cat:'hat',n:['Шапка с помпоном','Шапка з помпоном','Pom-pom beanie'],m:['Меринос 80%','Меринос 80%','80% merino'],p:590,cs:['wine','apricot','milk','sage'],tag:'hit',pop:9},
  {id:19,cat:'hat',n:['Бини в рубчик','Біні в рубчик','Ribbed beanie'],m:['Меринос 80%','Меринос 80%','80% merino'],p:490,cs:['graphite','lilac','olive'],pop:7},
  {id:20,cat:'gloves',n:['Перчатки шерстяные','Рукавички вовняні','Wool gloves'],m:['Шерсть + кашемир','Вовна + кашемір','Wool & cashmere'],p:490,cs:['graphite','sand','wine'],pop:6},
  {id:21,cat:'gloves',n:['Перчатки для сенсора','Рукавички для сенсора','Touchscreen gloves'],m:['Акрил, touch-пальцы','Акрил, touch-пальці','Acrylic, touch fingertips'],p:390,old:490,cs:['navy','lilac','apricot'],tag:'nw',pop:5},
];
const byId = id => P.find(p=>p.id===id);
const chosen = {}; P.forEach(p=>chosen[p.id]=p.cs[0]);
const SIZES = {hat:['One size'], gloves:['S','M','L'], jeans:['28','30','32','34','36'], pants:['XS','S','M','L','XL']};
const sizesOf = p => SIZES[p.cat] || ['XS','S','M','L','XL','XXL'];
const money = n => lang==='en' ? '₴' + n.toLocaleString('en-US') : n.toLocaleString('uk-UA').replace(/ /g,' ') + ' грн';

/* ================= garments (SVG with soft volume) ================= */
function shade(hex, a){
  let n = parseInt(hex.slice(1),16), r=n>>16, g=n>>8&255, b=n&255;
  const f = v => Math.max(0,Math.min(255,Math.round(a<0? v*(1+a) : v+(255-v)*a)));
  return '#'+[f(r),f(g),f(b)].map(v=>v.toString(16).padStart(2,'0')).join('');
}
const SHAPES = {
  tee:(c,d)=>`<path d="M62 34 L84 22 Q100 38 116 22 L138 34 L176 62 L156 92 L140 80 L140 200 L60 200 L60 80 L44 92 L24 62 Z" fill="${c}"/>
    <path d="M84 22 Q100 42 116 22" fill="none" stroke="${d}" stroke-width="5"/>
    <path d="M60 192 H140" stroke="${d}" stroke-width="1.5" opacity=".5" fill="none"/>
    <path d="M78 96 Q84 150 76 196 M122 100 Q116 150 126 196" stroke="${d}" stroke-width="2" opacity=".18" fill="none"/>`,
  sweat:(c,d)=>`<path d="M64 38 L84 26 Q100 40 116 26 L136 38 L160 58 L182 176 L160 182 L140 98 L140 196 L60 196 L60 98 L40 182 L18 176 L40 58 Z" fill="${c}"/>
    <path d="M80 30 Q100 2 120 30 Q100 48 80 30Z" fill="${d}"/>
    <path d="M94 44 V76 M106 44 V72" stroke="${shade(d,.5)}" stroke-width="2.5"/>
    <path d="M72 150 L128 150 L134 184 L66 184 Z" fill="${shade(c,-.06)}" stroke="${d}" stroke-width="2"/>
    <rect x="58" y="184" width="84" height="14" rx="3" fill="${d}"/>
    <path d="M44 70 Q52 120 42 172 M156 70 Q148 120 158 172" stroke="${d}" stroke-width="2" opacity=".2" fill="none"/>`,
  shirt:(c,d)=>`<path d="M64 34 L86 22 L100 42 L114 22 L136 34 L160 54 L178 180 L160 184 L140 94 L140 200 L60 200 L60 94 L40 184 L22 180 L40 54 Z" fill="${c}"/>
    <path d="M86 22 L100 42 L90 54 L78 30 Z M114 22 L100 42 L110 54 L122 30 Z" fill="${shade(c,.35)}" stroke="${d}" stroke-width="1"/>
    <path d="M100 44 V200" stroke="${d}" stroke-width="1.5"/>
    ${[66,90,114,138,162,186].map(y=>`<circle cx="104" cy="${y}" r="2.6" fill="${d}"/>`).join('')}
    <rect x="112" y="70" width="18" height="20" rx="2" fill="none" stroke="${d}" stroke-width="1.5"/>
    <path d="M164 168 L180 166 M36 166 L20 168" stroke="${d}" stroke-width="3"/>`,
  jacket:(c,d)=>`<path d="M62 34 L86 20 L114 20 L138 34 L162 56 L182 180 L160 186 L142 98 L142 200 L58 200 L58 98 L40 186 L18 180 L38 56 Z" fill="${c}"/>
    <path d="M84 20 L100 48 L116 20 L110 14 L90 14 Z" fill="${d}"/>
    <path d="M100 48 V200" stroke="${shade(d,-.3)}" stroke-width="3"/>
    <path d="M70 128 L88 120 M130 120 L112 128" stroke="${d}" stroke-width="3"/>
    <rect x="70" y="62" width="20" height="22" rx="3" fill="${d}" opacity=".6"/><rect x="110" y="62" width="20" height="22" rx="3" fill="${d}" opacity=".6"/>`,
  jeans:(c,d)=>`<path d="M60 18 L140 18 L150 204 L112 204 L100 84 L88 204 L50 204 Z" fill="${c}"/>
    <rect x="60" y="16" width="80" height="12" rx="2" fill="${d}"/>
    <path d="M100 28 V66 Q100 74 94 76" fill="none" stroke="${shade(c,.4)}" stroke-width="1.5" stroke-dasharray="3 3"/>
    <path d="M62 30 Q78 46 86 30 M138 30 Q122 46 114 30" fill="none" stroke="${shade(c,.4)}" stroke-width="1.5" stroke-dasharray="3 3"/>
    <path d="M56 120 L64 200 M144 120 L136 200" stroke="${shade(c,.25)}" stroke-width="1" opacity=".7"/>
    <path d="M70 150 Q76 156 84 152 M118 160 Q124 166 132 162" stroke="${d}" stroke-width="2" opacity=".25" fill="none"/>
    <circle cx="100" cy="22" r="3" fill="${shade(c,.6)}"/>`,
  pants:(c,d)=>`<path d="M58 18 L142 18 L156 204 L110 204 L100 82 L90 204 L44 204 Z" fill="${c}"/>
    <rect x="58" y="16" width="84" height="11" rx="2" fill="${d}"/>
    <path d="M74 32 L68 204 M126 32 L132 204" stroke="${shade(c,.3)}" stroke-width="1.5"/>
    <path d="M62 34 L72 56 M138 34 L128 56" stroke="${d}" stroke-width="2"/>`,
  hat:(c,d)=>`<circle cx="100" cy="50" r="20" fill="${shade(c,.35)}"/>
    <path d="M52 158 Q48 66 100 62 Q152 66 148 158 Z" fill="${c}"/>
    ${[70,85,100,115,130].map(x=>`<path d="M${x} 72 Q${x+(x-100)*.15} 110 ${x+(x-100)*.12} 146" stroke="${d}" stroke-width="2" fill="none" opacity=".45"/>`).join('')}
    <rect x="44" y="138" width="112" height="38" rx="10" fill="${d}"/>
    ${[56,68,80,92,104,116,128,140].map(x=>`<path d="M${x} 142 V172" stroke="${shade(d,-.25)}" stroke-width="2"/>`).join('')}`,
  gloves:(c,d)=>{
    const g = `<path d="M70 196 L70 112 L60 84 Q58 72 68 72 L80 102 L80 50 Q82 40 90 42 L92 96 L95 38 Q100 30 106 38 L106 96 L110 46 Q115 38 121 46 L120 100 L125 64 Q130 56 136 64 L132 132 L130 196 Z" fill="${c}"/><rect x="66" y="176" width="68" height="26" rx="5" fill="${d}"/>`;
    return `<g transform="translate(-26 4) rotate(-10 100 120) scale(.9)">${g}</g><g transform="translate(34 10) rotate(10 100 120) scale(.9) translate(200 0) scale(-1 1)">${g}</g>`;
  }
};
const TYPE = cat => cat; // category key doubles as drawing type
const garment = (type,c) => `<g filter="url(#drop)"><g filter="url(#vol)">${SHAPES[type](c, shade(c,-.28))}</g></g>`;
let uidN = 0; const uid = () => 'u'+(uidN++);
function photo(type, colKey){
  const id = uid(), c = C[colKey][0];
  return `<svg class="ph" viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><radialGradient id="g${id}" cx="50%" cy="34%" r="80%"><stop offset="0" stop-color="#e4ece7"/><stop offset=".55" stop-color="#ccdad2"/><stop offset="1" stop-color="#a9beb5"/></radialGradient>
    <linearGradient id="f${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d2828" stop-opacity="0"/><stop offset="1" stop-color="#0d2828" stop-opacity=".14"/></linearGradient></defs>
    <rect width="200" height="250" fill="url(#g${id})"/>
    <rect y="196" width="200" height="54" fill="url(#f${id})"/><path d="M0 196 H200" stroke="#fff" stroke-opacity=".5"/>
    <ellipse cx="100" cy="236" rx="66" ry="8" fill="#0d2828" opacity=".12"/>
    <g transform="translate(0 16)">${garment(type,c)}</g>
  </svg>`;
}
const HOOK = '#8a8398';
function hanger(type){
  const hook = `<path d="M100 8 V-4 Q100 -18 111 -18 Q120 -18 119 -9" fill="none" stroke="${HOOK}" stroke-width="3" stroke-linecap="round"/>`;
  if (['tee','sweat','shirt','jacket'].includes(type))
    return hook + `<path d="M100 8 L34 40 Q28 44 36 44 H164 Q172 44 166 40 Z" fill="none" stroke="#a9a2b6" stroke-width="3.5" stroke-linejoin="round"/>`;
  const clips = {jeans:[68,132], pants:[68,132], hat:[100], gloves:[74,128]}[type];
  const to = {jeans:22, pants:22, hat:34, gloves:52}[type];
  return hook + `<path d="M56 8 H144" stroke="#a9a2b6" stroke-width="4" stroke-linecap="round"/>` +
    clips.map(x=>`<path d="M${x} 8 V${to}" stroke="${HOOK}" stroke-width="1.5"/><rect x="${x-5}" y="${to-8}" width="10" height="11" rx="2" fill="#b9b2c6"/>`).join('');
}
const hanging = (type,colKey) => `<svg viewBox="0 -24 200 250" aria-hidden="true"><g class="gsvg">${hanger(type)}${garment(type,C[colKey][0])}</g></svg>`;

/* ================= static text ================= */
function applyStatic(){
  root.lang = lang;
  document.title = BRAND() + (lang==='en' ? ' — clothing' : lang==='uk' ? ' — одяг' : ' — одежда');
  $$('[data-i18n]').forEach(el=>{ const k=el.dataset.i18n; if(T[k]) el.textContent = t(k); });
  $$('[data-i18n-html]').forEach(el=>{ el.innerHTML = t(el.dataset.i18nHtml); });
  $$('[data-i18n-aria]').forEach(el=>{ el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
  $$('.lang button').forEach(b=>b.setAttribute('aria-pressed', b.dataset.lang===lang));
  $('#logoName').textContent = BRAND(); $$('.brandName').forEach(e=>e.textContent=BRAND());
  $('#brand').setAttribute('aria-label', BRAND());
  $('#brand').innerHTML = [...BRAND()].map((ch,i)=>`<span style="--i:${i};animation-delay:${.15+i*.09}s, 1.6s">${ch}</span>`).join('');
  $('#mq').innerHTML = [...MQ,...MQ].map(m=>`<span>${L(m)}</span>`).join('');
  $('#heroTags').innerHTML = ['jeans','pants','sweat','tee','shirt','jacket','hat','gloves'].map(k=>`<button data-go="${k}">${L(CATS[k].n).toLowerCase()}</button>`).join('');
}

/* ================= hero floaters ================= */
const FL = [4,10,1,18];
function renderFloaters(){
  $('#floaters').innerHTML = FL.map(id=>{ const p=byId(id); return `<div class="fcard" data-id="${id}" title="${L(p.n)}">${photo(TYPE(p.cat),chosen[id])}</div>`; }).join('');
}
$('#floaters').addEventListener('click',e=>{ const f=e.target.closest('.fcard'); if(f) openModal(+f.dataset.id); });
$('#heroTags').addEventListener('click',e=>{ const b=e.target.closest('[data-go]'); if(b){ setFilter(b.dataset.go); $('#catalog').scrollIntoView({behavior:reduce?'auto':'smooth'}); } });

/* ================= smooth scroll choreography ================= */
const stage=$('#stage'), heroCopy=$('#heroCopy'), reveal=$('#reveal'), hint=$('#scrollHint'), top=$('#top'), glc=$('#gl');
let target=0, prog=0, applied=-1, fcards=[];
const phoneMQ = matchMedia('(max-width:700px)'); let isPhone = phoneMQ.matches; phoneMQ.addEventListener('change',e=>{isPhone=e.matches});
function measure(){
  const r = stage.getBoundingClientRect();
  target = clamp(-r.top / (r.height - innerHeight));
  top.classList.toggle('solid', scrollY > 30);
}
function apply(){
  const a = clamp(prog/0.35), b = clamp((prog-0.12)/0.33);
  const ea = a*a*(3-2*a), eb = 1 - Math.pow(1-b,3);
  heroCopy.style.transform = `scale(${1 + ea*0.45}) translateY(${-ea*60}px)`;
  heroCopy.style.opacity = 1 - ea*1.25;
  heroCopy.style.filter = ea>0.01 && !isPhone ? `blur(${ea*8}px)` : 'none';
  hint.style.opacity = 1 - ea*3;
  fcards.forEach((f,i)=>{
    const dir = i%2 ? 1 : -1;
    f.style.transform = `perspective(900px) translate3d(${ea*dir*240}px, ${-ea*120*(i+1)/2}px, ${ea*500}px) rotate(var(--r)) rotateY(${ea*dir*50}deg)`;
    f.style.opacity = 1 - ea;
  });
  glc.style.opacity = (isPhone ? .55 : 1) * (1 - eb);
  reveal.style.clipPath = `circle(${eb*85}% at 50% 55%)`;
}
addEventListener('scroll', measure, {passive:true});
addEventListener('resize', measure);
(function loop(){
  prog = reduce ? target : prog + (target-prog)*0.11;
  if (Math.abs(prog-target) < 0.0004) prog = target;
  if (prog !== applied){ apply(); applied = prog; }
  requestAnimationFrame(loop);
})();

/* ================= three.js hero ================= */
if (window.THREE) {
  const renderer = new THREE.WebGLRenderer({canvas:glc, alpha:true, antialias:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth<700 ? 1.5 : 2));
  const scene3 = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(42,1,.1,100); cam.position.z = 10;
  scene3.add(new THREE.AmbientLight(0xffffff,.35));
  const dl = new THREE.DirectionalLight(0xffe4d0,.85); dl.position.set(4,5,6); scene3.add(dl);
  const pl = new THREE.PointLight(0xb9a3e3,1.1,30); pl.position.set(-5,-3,4); scene3.add(pl);
  const pl2 = new THREE.PointLight(0x9cc7b0,.8,30); pl2.position.set(5,-4,2); scene3.add(pl2);
  const mat = (c,r=.28)=>new THREE.MeshPhysicalMaterial({color:c,roughness:r,metalness:.05,clearcoat:.6,clearcoatRoughness:.4});
  const group = new THREE.Group(); scene3.add(group);
  const defs = [
    [new THREE.TorusKnotGeometry(.8,.28,200,28), mat(0xf4a77c), [3.6,1.6,-1]],
    [new THREE.SphereGeometry(.9,64,64), mat(0x9b82d6,.35), [5.2,-1.8,-2]],
    [new THREE.TorusGeometry(.75,.26,40,100), mat(0x9cc7b0), [1.8,-2.6,0]],
    [new THREE.IcosahedronGeometry(.7,0), mat(0xd9c9ee,.45), [-6.8,3.9,-4]],
    [new THREE.SphereGeometry(.45,48,48), mat(0xf4a77c,.2), [-0.2,-3.9,-1]],
    [new THREE.TorusKnotGeometry(.5,.16,160,20,2,5), mat(0xb9a3e3), [6.2,2.8,-4]],
    [new THREE.OctahedronGeometry(.55,0), mat(0x9cc7b0,.35), [0.6,3.2,-3]],
  ];
  const meshes = defs.map(([g,m,p],i)=>{ const o=new THREE.Mesh(g,m); o.position.set(...p); o.userData={b:new THREE.Vector3(...p), s:.3+Math.random()*.35, ph:i*1.3}; group.add(o); return o; });
  let mx=0,my=0;
  addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5; my=e.clientY/innerHeight-.5});
  function size(){ const w=glc.clientWidth,h=glc.clientHeight; renderer.setSize(w,h,false); cam.aspect=w/h; cam.updateProjectionMatrix(); if(w<760){ group.position.set(0.4, 2.9, 0); group.scale.setScalar(.5); } else { group.position.set(0,0,0); group.scale.setScalar(1); } }
  size(); addEventListener('resize',size);
  const clock = new THREE.Clock();
  (function tick(){
    requestAnimationFrame(tick);
    if (prog > 0.5 || document.hidden) return;
    const tm = clock.getElapsedTime();
    meshes.forEach(o=>{ const u=o.userData; if(!reduce){ o.rotation.x = tm*u.s*.6+u.ph; o.rotation.y = tm*u.s*.8; o.position.y = u.b.y + Math.sin(tm*u.s+u.ph)*.25; }});
    group.rotation.y += ((mx*.35) - group.rotation.y)*.03;
    group.rotation.x += ((my*.25) - group.rotation.x)*.03;
    const a = clamp(prog/0.35);
    cam.position.z = 10 - a*a*(3-2*a)*6;
    renderer.render(scene3,cam);
  })();
}

/* ================= categories ================= */
function renderCats(){
  $('#catGrid').innerHTML = Object.entries(CATS).map(([k,v])=>{
    const cnt = P.filter(p=>p.cat===k).length;
    return `<button class="cat" data-cat="${k}">${photo(k,v.c)}<div class="lbl"><b>${L(v.n)}</b><span>${cnt} ${t('models')}</span></div></button>`;
  }).join('');
}
const catGrid = $('#catGrid');
catGrid.addEventListener('pointermove',e=>{ if(reduce) return; const el=e.target.closest('.cat'); if(!el) return; const r=el.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5; el.style.transform=`rotateY(${x*14}deg) rotateX(${-y*14}deg) translateZ(10px)`; el.style.boxShadow=`${-x*30}px ${30-y*20}px 50px -25px rgba(0,0,0,.55)`; });
catGrid.addEventListener('pointerout',e=>{ const el=e.target.closest('.cat'); if(el && !el.contains(e.relatedTarget)){ el.style.transform=''; el.style.boxShadow=''; } });
catGrid.addEventListener('click',e=>{ const el=e.target.closest('.cat'); if(el){ setFilter(el.dataset.cat); $('#catalog').scrollIntoView({behavior: reduce?'auto':'smooth'}); } });

/* ================= catalog ================= */
let filter='all', sort='pop';
function setFilter(f){ filter=f; renderChips(); renderGrid(); }
function renderChips(){
  const opts = [['all',t('all')], ...Object.entries(CATS).map(([k,v])=>[k,L(v.n)])];
  $('#chips').innerHTML = opts.map(([k,n])=>`<button class="chip" data-f="${k}" aria-pressed="${filter===k}">${n}</button>`).join('');
}
$('#chips').addEventListener('click',e=>{ const b=e.target.closest('.chip'); if(b) setFilter(b.dataset.f); });
function renderGrid(){
  let list = P.filter(p=>filter==='all'||p.cat===filter);
  list = [...list].sort((a,b)=> sort==='asc'?a.p-b.p : sort==='desc'?b.p-a.p : sort==='new'?((b.tag==='nw')-(a.tag==='nw'))||b.pop-a.pop : b.pop-a.pop);
  $('#grid').innerHTML = list.length ? list.map(cardHTML).join('') : `<p class="empty">${t('empty')}</p>`;
}
function cardHTML(p){
  const col = chosen[p.id];
  return `<article class="card" data-id="${p.id}">
    <button class="pic" data-open="${p.id}" aria-label="${t('more')}: ${L(p.n)}">${photo(TYPE(p.cat),col)}${p.tag?`<span class="badge">${L(TAG[p.tag])}</span>`:''}</button>
    <div class="body">
      <h3>${L(p.n)}</h3>
      <div class="meta">${L(p.m)} · ${cn(col)}</div>
      <div class="swatches">${p.cs.map(k=>`<button class="sw" style="background:${C[k][0]}" data-sw="${p.id}:${k}" aria-label="${cn(k)}" aria-pressed="${k===col}"></button>`).join('')}</div>
      <div class="row"><span class="price">${money(p.p)}${p.old?`<s>${money(p.old)}</s>`:''}</span><button class="add" data-open="${p.id}">${t('choose')}</button></div>
    </div></article>`;
}
$('#grid').addEventListener('click',e=>{
  const sw = e.target.closest('[data-sw]');
  if(sw){ const [id,k]=sw.dataset.sw.split(':'); chosen[id]=k; sw.closest('.card').outerHTML = cardHTML(byId(+id)); renderRack(); return; }
  const op = e.target.closest('[data-open]'); if(op) openModal(+op.dataset.open);
});
$('#sort').onchange = e=>{sort=e.target.value; renderGrid(); if(window.__reveal) window.__reveal();};

/* ================= product modal ================= */
const veil=$('#veil'), modal=$('#modal'), drawer=$('#drawer');
let mState=null, infoKey=null;
function openModal(id){
  const p=byId(id), sizes=sizesOf(p);
  infoKey=null; mState={p, col:chosen[id], size: sizes.length===1?sizes[0]:null};
  drawModal(); modal.classList.add('on'); veil.classList.add('on'); drawer.classList.remove('on');
}
function drawModal(){
  if(!mState) return;
  const {p,col,size}=mState, sizes=sizesOf(p);
  modal.innerHTML = `<div>${photo(TYPE(p.cat),col)}</div>
  <div class="m-body"><button class="x" data-close aria-label="${t('close')}">×</button>
    <div class="m-label">${L(CATS[p.cat].n)}</div>
    <h3 id="mTitle">${L(p.n)}</h3>
    <p>${L(p.m)}. ${t('color')}: ${cn(col).toLowerCase()}.</p>
    <div class="price" style="font-size:24px">${money(p.p)}${p.old?`<s>${money(p.old)}</s>`:''}</div>
    <div class="m-label">${t('color')}</div>
    <div class="swatches">${p.cs.map(k=>`<button class="sw" style="background:${C[k][0]};width:30px;height:30px" data-mc="${k}" aria-label="${cn(k)}" aria-pressed="${k===col}"></button>`).join('')}</div>
    <div class="m-label">${t('size')}</div>
    <div class="sizes-pick">${sizes.map(s=>`<button class="sz" data-ms="${s}" aria-pressed="${s===size}">${s}</button>`).join('')}</div>
    <button class="add" id="mAdd">${size?t('addcart'):t('picksize')}</button>
  </div>`;
}
modal.addEventListener('click',e=>{
  if(e.target.closest('[data-close]')) return closeAll();
  if(!mState) return;
  const mc=e.target.closest('[data-mc]'); if(mc){ mState.col=mc.dataset.mc; chosen[mState.p.id]=mState.col; drawModal(); renderGrid(); renderRack(); return; }
  const ms=e.target.closest('[data-ms]'); if(ms){ mState.size=ms.dataset.ms; drawModal(); return; }
  if(e.target.id==='mAdd'){ if(!mState.size){ toast(t('toast.pick')); return; } addToCart(mState.p.id,mState.col,mState.size); closeAll(); }
});
function closeAll(){ modal.classList.remove('on'); drawer.classList.remove('on'); veil.classList.remove('on'); mState=null; infoKey=null; }
veil.onclick=closeAll;

/* footer info */
function drawInfo(){
  modal.innerHTML=`<div class="m-body" style="grid-column:1/-1;padding:36px"><button class="x" data-close aria-label="${t('close')}">×</button><div class="m-label">${t('buyers')}</div><h3 id="mTitle">${t('info.'+infoKey)}</h3><p style="font-size:16px;max-width:60ch">${t('info.'+infoKey+'.t')}</p><button class="add" data-close style="align-self:flex-start;padding:12px 22px">${t('gotit')}</button></div>`;
}
$$('[data-info]').forEach(b=>b.addEventListener('click',()=>{ mState=null; infoKey=b.dataset.info; drawInfo(); modal.classList.add('on'); veil.classList.add('on'); drawer.classList.remove('on'); }));

/* ================= cart ================= */
let cart=[]; try{ cart=JSON.parse(store.get('verba-cart')||'[]') }catch(e){ cart=[] }
cart = Array.isArray(cart) ? cart.filter(i=>i && byId(i.id) && C[i.col]) : [];
const saveCart=()=>store.set('verba-cart',JSON.stringify(cart));
const FREE=2500; let ordered=false;
function addToCart(id,col,size){
  const ex=cart.find(i=>i.id===id&&i.col===col&&i.size===size);
  ex? ex.q++ : cart.push({id,col,size,q:1});
  ordered=false; saveCart(); renderCart(); toast(t('toast.added'));
  const b=$('#cartBtn'); b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump');
}
function renderCart(){
  const count=cart.reduce((s,i)=>s+i.q,0), sum=cart.reduce((s,i)=>s+i.q*byId(i.id).p,0);
  $('#cartCount').textContent=count;
  $('#dList').innerHTML = cart.length ? cart.map((i,ix)=>{ const p=byId(i.id); return `<div class="li"><div class="ph">${photo(TYPE(p.cat),i.col)}</div><div><b>${L(p.n)}</b><small>${cn(i.col)} · ${i.size} · ${money(p.p)}</small></div><div class="qty"><button data-q="${ix}:-1" aria-label="${t('less')}">−</button><span>${i.q}</span><button data-q="${ix}:1" aria-label="${t('morei')}">+</button></div></div>`}).join('')
    : `<p class="empty" style="padding:30px 0">${t('cart.empty')}</p>`;
  const left=Math.max(0,FREE-sum);
  $('#dFoot').innerHTML = cart.length ? `
    ${ordered?`<div class="note">${t('demo')}</div>`:''}
    <div class="ship">${left? t('ship.left')+money(left) : t('ship.free')}</div>
    <div class="bar"><i style="width:${Math.min(100,sum/FREE*100)}%"></i></div>
    <div class="total"><span>${t('total')}</span><span>${money(sum)}</span></div>
    <form id="order" novalidate><div class="field"><input id="oName" placeholder="${t('ph.name')}" autocomplete="name" aria-describedby="eName"><span class="err" id="eName"></span></div><div class="field"><input id="oPhone" placeholder="${t('ph.phone')}" type="tel" inputmode="tel" autocomplete="tel" aria-describedby="ePhone"><span class="err" id="ePhone"></span></div><div class="field"><input id="oCity" placeholder="${t('ph.city')}" aria-describedby="eCity"><span class="err" id="eCity"></span></div><button class="btn primary" style="justify-content:center" ${ordered?'disabled':''}>${t('order')}</button></form>` : '';
  const f=$('#order'); if(f) f.onsubmit=e=>{ e.preventDefault();
    const checks=[['oName','eName','err.name',v=>v.trim().split(/\s+/).filter(Boolean).length>=2],
                  ['oPhone','ePhone','err.phone',v=>/^(\+?38)?0\d{9}$/.test(v.replace(/[\s()-]/g,''))],
                  ['oCity','eCity','err.city',v=>v.trim().length>=4]];
    let first=null;
    checks.forEach(([i,er,k,ok])=>{ const el=$('#'+i), bad=!ok(el.value); el.setAttribute('aria-invalid',bad); $('#'+er).textContent=bad?t(k):''; if(bad&&!first) first=el; });
    if(first){ first.focus(); return; }
    ordered=true; renderCart(); };
  ['oName','oPhone','oCity'].forEach(i=>{ const el=$('#'+i); if(el) el.addEventListener('input',()=>{ el.removeAttribute('aria-invalid'); const er=el.parentNode.querySelector('.err'); if(er) er.textContent=''; }); });
  const tc=$('#toCat'); if(tc) tc.onclick=closeAll;
}
$('#dList').addEventListener('click',e=>{ const q=e.target.closest('[data-q]'); if(!q) return; const [ix,d]=q.dataset.q.split(':').map(Number); cart[ix].q+=d; if(cart[ix].q<=0) cart.splice(ix,1); saveCart(); renderCart(); });
$('#cartBtn').onclick=()=>{ modal.classList.remove('on'); mState=null; infoKey=null; drawer.classList.add('on'); veil.classList.add('on'); };
$('#closeDrawer').onclick=closeAll;

let tt; function toast(m){ const el=$('#toast'); el.textContent=m; el.classList.add('on'); clearTimeout(tt); tt=setTimeout(()=>el.classList.remove('on'),1900); }

/* ================= clothing rail ================= */
const slotsEl=$('#slots'), focusEl=$('#focus'), fItem=$('#fItem'), fInfo=$('#fInfo');
let openSlot=-1;
function renderRack(){
  slotsEl.innerHTML = P.map((p,i)=>`<button class="slot" data-i="${i}" style="--j:${((i*7)%5-2)/2}" aria-label="${L(p.n)}, ${money(p.p)}"><div class="g">${hanging(TYPE(p.cat),chosen[p.id])}</div><span class="nm">${L(p.n)}</span></button>`).join('');
  spread(openSlot);
}
function spread(i){
  openSlot=i;
  const slots=[...slotsEl.children]; if(!slots.length) return;
  const g=slots[0].querySelector('.g'), sw=slots[0].offsetWidth;
  const shift = Math.max(0, g.offsetWidth/2 - sw/2 - 4);
  slots.forEach((s,k)=>{
    s.classList.toggle('open', k===i);
    s.style.translate = i<0 || k===i ? '0px 0px' : `${k<i ? -shift : shift}px 0px`;
  });
}
slotsEl.addEventListener('pointerover',e=>{ if(e.pointerType!=='mouse') return; const s=e.target.closest('.slot'); if(s && +s.dataset.i!==openSlot) spread(+s.dataset.i); });
slotsEl.addEventListener('pointerleave',()=>spread(-1));
slotsEl.addEventListener('focusin',e=>{ const s=e.target.closest('.slot'); if(s) spread(+s.dataset.i); });
slotsEl.addEventListener('click',e=>{ const s=e.target.closest('.slot'); if(s) openFocus(+s.dataset.i, s.querySelector('.g')); });

let focusIdx=-1, fSize=null;
const EASE='cubic-bezier(.16,1,.3,1)';
function drawFocusItem(){
  const p=P[focusIdx];
  fItem.innerHTML = hanging(TYPE(p.cat),chosen[p.id]) + `<div class="tag"><i></i><div><b>${money(p.p)}</b><span>${BRAND()}</span></div></div>`;
}
function drawFocusInfo(){
  const p=P[focusIdx], col=chosen[p.id], sizes=sizesOf(p);
  if(sizes.length===1) fSize=sizes[0];
  fInfo.innerHTML = `<h3>${L(p.n)}</h3>
    <div class="meta">${L(p.m)} · ${cn(col)}${p.old?` · <s>${money(p.old)}</s>`:''}</div>
    <div class="f-row">${p.cs.map(k=>`<button class="sw" style="background:${C[k][0]};width:26px;height:26px" data-fc="${k}" aria-label="${cn(k)}" aria-pressed="${k===col}"></button>`).join('')}</div>
    <div class="f-row">${sizes.map(s=>`<button class="sz" data-fs="${s}" aria-pressed="${s===fSize}">${s}</button>`).join('')}</div>
    <button class="add" id="fAdd">${fSize ? t('addcart')+' · '+money(p.p) : t('picksize')}</button>
    <span class="esc">${t('esc')}</span>`;
}
function openFocus(i, fromEl){
  focusIdx=i; fSize=null;
  drawFocusItem(); drawFocusInfo();
  reveal.classList.add('focused'); focusEl.classList.add('on'); focusEl.setAttribute('aria-hidden','false');
  if(fromEl && !reduce){
    const a=fromEl.getBoundingClientRect(), b=fItem.getBoundingClientRect();
    const s=a.height/b.height, dx=(a.left+a.width/2)-(b.left+b.width/2), dy=a.top-b.top;
    fItem.animate([{transform:`translate(${dx}px,${dy}px) scale(${s})`},{transform:'none'}],{duration:1150,easing:EASE});
    fInfo.animate([{opacity:0,transform:'translateY(20px)'},{opacity:1,transform:'none'}],{duration:900,delay:300,easing:EASE,fill:'backwards'});
  }
}
function stepFocus(dir){
  focusIdx=(focusIdx+dir+P.length)%P.length; fSize=null;
  const go=()=>{ drawFocusItem(); drawFocusInfo(); if(!reduce){ fItem.animate([{transform:`translateX(${dir*110}px) rotateY(${dir*-60}deg)`,opacity:0},{transform:'none',opacity:1}],{duration:1000,easing:EASE}); fInfo.animate([{opacity:0},{opacity:1}],{duration:600,easing:'ease-out'}); } };
  if(reduce) return go();
  fItem.animate([{transform:'none',opacity:1},{transform:`translateX(${dir*-110}px) rotateY(${dir*60}deg)`,opacity:0}],{duration:340,easing:'cubic-bezier(.7,0,.84,0)'}).onfinish=go;
}
function closeFocus(){ focusIdx=-1; reveal.classList.remove('focused'); focusEl.classList.remove('on'); focusEl.setAttribute('aria-hidden','true'); }
$('#fClose').onclick=closeFocus; $('#fPrev').onclick=()=>stepFocus(-1); $('#fNext').onclick=()=>stepFocus(1);
$('#fStage').addEventListener('click',e=>{ if(e.target.id!=='fStage') return; const r=fItem.getBoundingClientRect(); if(e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom) return; closeFocus(); });
let sx=null, sy=0;
$('#fStage').addEventListener('touchstart',e=>{ sx=e.touches[0].clientX; sy=e.touches[0].clientY; },{passive:true});
$('#fStage').addEventListener('touchend',e=>{ if(sx===null) return; const dx=e.changedTouches[0].clientX-sx, dy=e.changedTouches[0].clientY-sy; sx=null; if(Math.abs(dx)>45 && Math.abs(dx)>Math.abs(dy)*1.3) stepFocus(dx<0?1:-1); },{passive:true});
fInfo.addEventListener('click',e=>{
  const p=P[focusIdx];
  const fc=e.target.closest('[data-fc]'); if(fc){ chosen[p.id]=fc.dataset.fc; drawFocusInfo();
    const swap=()=>{ drawFocusItem(); if(!reduce) fItem.animate([{transform:'rotateY(-90deg)'},{transform:'none'}],{duration:700,easing:EASE}); };
    if(reduce) swap(); else fItem.animate([{transform:'none'},{transform:'rotateY(90deg)'}],{duration:260,easing:'cubic-bezier(.7,0,.84,0)'}).onfinish=swap;
    renderRack(); renderGrid(); return; }
  const fs=e.target.closest('[data-fs]'); if(fs){ fSize=fs.dataset.fs; drawFocusInfo(); return; }
  if(e.target.closest('#fAdd')){ if(!fSize){ toast(t('toast.pick')); return; } addToCart(p.id,chosen[p.id],fSize); }
});
addEventListener('scroll',()=>{ if(focusIdx>-1 && target<0.3) closeFocus(); },{passive:true});
addEventListener('keydown',e=>{ if(e.key!=='Escape') return; if(modal.classList.contains('on')||drawer.classList.contains('on')) closeAll(); else if(focusIdx>-1) closeFocus(); });

/* ================= redesign pass: spotlight, scrollspy, reveal ================= */
$('#grid').addEventListener('pointermove',e=>{ const c=e.target.closest('.card'); if(!c) return; const r=c.getBoundingClientRect(); c.style.setProperty('--mx',(e.clientX-r.left)+'px'); c.style.setProperty('--my',(e.clientY-r.top)+'px'); });
const navLinks=$$('.nav a');
if('IntersectionObserver' in window){
  const spy=new IntersectionObserver(es=>{ es.forEach(en=>{ if(en.isIntersecting){ navLinks.forEach(a=>a.setAttribute('aria-current', a.getAttribute('href')==='#'+en.target.id)); } }); },{rootMargin:'-45% 0px -50% 0px'});
  ['cats','catalog','sizes','contacts'].forEach(id=>{ const el=document.getElementById(id); if(el) spy.observe(el); });
  const io=new IntersectionObserver(es=>{ es.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); en.target.classList.remove('pre'); io.unobserve(en.target); } }); },{rootMargin:'0px 0px -8% 0px'});
  window.__reveal=()=>{ if(reduce) return; $$('.sec-head, .cat, .card, .fact, .tbl-scroll, .foot > div').forEach((el,i)=>{ if(el.dataset.rv) return; el.dataset.rv=1; const r=el.getBoundingClientRect(); if(r.top>innerHeight){ el.style.setProperty('--d', ((i%4)*0.08)+'s'); el.classList.add('pre'); io.observe(el); } }); };
}

/* ================= theme + language switches ================= */
$('#themeBtn').onclick=()=>{
  const next = root.getAttribute('data-site')==='light' ? 'dark' : 'light';
  root.setAttribute('data-site', next); store.set('verba-theme', next);
};
function renderAll(){
  applyStatic(); renderFloaters(); fcards=$$('.fcard'); applied=-1;
  renderCats(); renderChips(); renderGrid(); renderRack(); renderCart();
  if(focusIdx>-1){ drawFocusItem(); drawFocusInfo(); }
  if(mState) drawModal(); else if(infoKey) drawInfo();
  wrapMagnets();
  if(window.__reveal) window.__reveal();
}
$$('.lang button').forEach(b=>b.onclick=()=>{ if(b.dataset.lang===lang) return; lang=b.dataset.lang; root.setAttribute('data-lang',lang); store.set('verba-lang',lang); renderAll(); });

/* ================= magnetic buttons ================= */
const MAG = '.btn,.add,.cart-btn,.chip,.tags button,.sz,.x,.flink,.theme,.f-btn';
function wrapMagnets(){
  $$('.btn,.cart-btn').forEach(b=>{ if(!b.querySelector(':scope > .mag-in')){ const w=document.createElement('span'); w.className='mag-in'; while(b.firstChild) w.appendChild(b.firstChild); b.appendChild(w); } });
}
if (!reduce && matchMedia('(hover:hover) and (pointer:fine)').matches) {
  let px=-1e4, py=-1e4, queued=false, active=new Set();
  addEventListener('pointermove', e=>{ px=e.clientX; py=e.clientY; if(!queued){ queued=true; requestAnimationFrame(pull); } }, {passive:true});
  document.addEventListener('pointerleave', ()=>{ px=py=-1e4; requestAnimationFrame(pull); });
  function pull(){
    queued=false;
    const now=new Set();
    $$(MAG).forEach(el=>{
      const r=el.getBoundingClientRect(); if(!r.width) return;
      const cx=r.left+r.width/2, cy=r.top+r.height/2, dx=px-cx, dy=py-cy;
      const reach=Math.max(r.width,r.height)*.5+40, dist=Math.hypot(dx,dy);
      if(dist<reach){
        const k=(1-dist/reach)*.4+.12, big = el.matches('.btn,.cart-btn') ? 1 : .7;
        el.style.translate=`${dx*k*big}px ${dy*k*big}px`;
        const inner=el.querySelector(':scope > .mag-in'); if(inner) inner.style.translate=`${dx*k*.35}px ${dy*k*.35}px`;
        el.classList.add('mag-on'); now.add(el);
      }
    });
    active.forEach(el=>{ if(!now.has(el)){ el.style.translate=''; el.classList.remove('mag-on'); const i=el.querySelector(':scope > .mag-in'); if(i) i.style.translate=''; } });
    active=now;
  }
}

renderAll(); measure();
})();
