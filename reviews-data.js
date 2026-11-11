/*
  ВІДГУКИ. Цей файл спільний для української та англійської версій сайту.
  Додавайте лише справжні відгуки клієнтів і з їхньої згоди.
  Поки список порожній, розділ «Відгуки» на сайті прихований.
  Картка показує початок тексту, повний відгук відкривається у вікні.

  Приклад заповненого відгуку:

  {
    name:     'Олена Коваль',
    business: { uk: 'Кав’ярня «Зерно», Кропивницький', en: 'Zerno coffee shop, Kropyvnytskyi' },
    text:     { uk: 'Повний текст відгуку українською.', en: 'Full review text in English.' },
    project:  'https://example.com',   // необов’язково: посилання на сайт клієнта (лише https://)
    source:   'Telegram',              // необов’язково: звідки відгук
    date:     '2026-10',               // необов’язково
    photo:    '/reviews/olena.jpg'     // необов’язково: фото клієнта
  }
*/
window.REVIEWS = [
  {
    name: { uk: 'Олена', en: 'Olena' },
    text: {
      uk: 'Усе пройшло чудово. Сайт здали точно в ті терміни, про які домовилися на старті, без жодних перенесень. А ціна влаштувала мене одразу, тож ми не гаяли часу на торг і швидко взялися до справи.',
      en: 'Everything went perfectly. The website was delivered exactly on the timeline we agreed at the start, with no delays. The price suited me from the very beginning, so there was no haggling and we got straight to work.'
    }
  },
  {
    name: { uk: 'Гліб', en: 'Hlib' },
    text: {
      uk: 'Сайт дуже сподобався. Усе зробили швидко й водночас якісно, а таке поєднання трапляється нечасто. Результатом задоволений на всі сто.',
      en: 'I really like the website. Everything was done quickly and to a high standard, which is a rare combination. I’m completely happy with the result.'
    }
  },
  {
    name: { uk: 'Віка', en: 'Vika' },
    text: {
      uk: 'Було дуже приємно спілкуватися. Мені все пояснили простими словами й допомогли розібратися в усіх питаннях щодо сайту. Відчувалося, що тут справді хочуть допомогти, а не просто продати.',
      en: 'It was a real pleasure to deal with them. Everything was explained in plain words, and they helped me make sense of every question I had about the website. You can tell they genuinely want to help, not just make a sale.'
    }
  }
];
