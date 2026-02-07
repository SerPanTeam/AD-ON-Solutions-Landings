# Osterkind-Fotoshooting Aktion

## Быстрые изменения

### Изменить цвета
Откройте `css/variables.css` — там инструкция в начале файла.

### Сменить шрифт

1. Откройте [Google Fonts](https://fonts.google.com)
2. Выберите шрифт, скопируйте `<link>` код
3. В `index.html` найдите `<!-- FONTS -->` и замените ссылку
4. В `css/variables.css` измените `--font-family-primary`

**Популярные альтернативы Inter:**
- **Montserrat** — современный, геометричный
- **Playfair Display** — элегантный, для свадеб
- **Roboto** — нейтральный, универсальный
- **Lato** — дружелюбный, читаемый
- **Open Sans** — классика для веба

### Изменить тексты
1. Откройте `index.html`
2. Найдите секцию по комментарию (Ctrl+F "HERO" или "FAQ")
3. Измените текст внутри тегов

### Изменить изображения
Найдите `<img src="...">` и замените URL. Размеры указаны в комментариях.

---

## Структура файлов

| Файл | Назначение |
|------|------------|
| `index.html` | Главная страница лендинга |
| `css/variables.css` | Цвета, шрифты, отступы — **редактируйте здесь** |
| `css/base.css` | Базовые стили (кнопки, типографика) |
| `css/sections.css` | Стили всех секций |
| `css/quiz.css` | Стили квиза |
| `css/responsive.css` | Мобильная адаптация |
| `quiz-step1.html...` | Шаги квиза |
| `quiz-form.html` | Форма квиза |
| `quiz-success.html` | Страница успеха |
| `js/analytics.js` | Аналитика (GA4, Facebook Pixel и др.) |

---

## Глоссарий секций

| Название в коде | Что это | Где искать в HTML |
|-----------------|---------|-------------------|
| `header` | Логотип и навигация | `<!-- HEADER -->` |
| `hero` | Главный баннер с заголовком | `<!-- HERO -->` |
| `content` | Текст + изображение | `<!-- CONTENT -->` |
| `gallery` | Галерея фотографий | `<!-- GALLERY -->` |
| `services` | Список услуг/пакетов | `<!-- SERVICES -->` |
| `steps` | Шаги процесса | `<!-- STEPS -->` |
| `faq` | Вопросы и ответы | `<!-- FAQ -->` |
| `cta` | Призыв к действию | `<!-- CTA -->` |
| `about` | О фотографе | `<!-- ABOUT -->` |
| `footer` | Подвал с контактами и картой | `<!-- FOOTER -->` |

---

## Аналитика

Откройте `js/analytics.js` — там готовые сниппеты для:

- **Google Analytics 4** — измерение трафика
- **Google Tag Manager** — управление тегами
- **Facebook Pixel** — ретаргетинг в Facebook/Instagram
- **Yandex Metrika** — аналитика для русскоязычной аудитории

### Как подключить

1. Откройте `js/analytics.js`
2. Найдите нужный сервис (например, `ga4`)
3. Измените `enabled: false` на `enabled: true`
4. Замените `G-XXXXXXXXXX` на ваш ID

---

## Чеклист перед публикацией

- [ ] **Контакты**: Проверьте телефон, email, адрес в footer
- [ ] **Карта**: Замените Google Maps embed URL на свой адрес
- [ ] **Изображения**: Замените placeholder-изображения на реальные фото
- [ ] **Тексты**: Проверьте все заголовки и описания
- [ ] **Favicon**: Добавьте иконку сайта (см. раздел ниже)
- [ ] **Meta теги**: Проверьте title и description в `<head>`
- [ ] **OG теги**: Настройте превью для соцсетей (см. раздел SEO ниже)
- [ ] **Structured Data**: Заполните данные фотографа в JSON-LD (footer)
- [ ] **Аналитика**: Подключите GA4/Facebook Pixel (см. js/analytics.js)
- [ ] **Формы**: Настройте отправку данных (см. раздел ниже)
- [ ] **Тест на мобильных**: Откройте сайт на телефоне

---

## Настройка форм

Форма квиза отправляет данные на webhook. Для настройки:

1. Откройте `js/quiz.js`
2. Найдите `WEBHOOK_URL` в начале файла
3. Замените на ваш URL:
   - **Formspree**: `https://formspree.io/f/YOUR_ID`
   - **Netlify Forms**: Добавьте `netlify` атрибут к `<form>`
   - **Google Sheets**: Используйте Google Apps Script
   - **Email**: Используйте сервис типа EmailJS

### Formspree (рекомендуется)
1. Зарегистрируйтесь на [formspree.io](https://formspree.io)
2. Создайте форму, скопируйте endpoint
3. Вставьте в `WEBHOOK_URL`

---

## Публикация сайта

### Netlify (рекомендуется)
1. Перетащите папку лендинга на [app.netlify.com/drop](https://app.netlify.com/drop)
2. Готово! Получите URL вида `random-name.netlify.app`
3. Подключите свой домен в настройках

### GitHub Pages
1. Создайте репозиторий на GitHub
2. Загрузите файлы лендинга
3. Settings → Pages → Source: main branch
4. Сайт будет на `username.github.io/repo-name`

### Vercel
1. Установите Vercel CLI: `npm i -g vercel`
2. В папке лендинга: `vercel`
3. Следуйте инструкциям

---

## Добавление favicon

1. Создайте иконку 32x32px (PNG или ICO)
2. Положите в корень папки как `favicon.ico`
3. Добавьте в `<head>` каждой HTML страницы:
   ```html
   <link rel="icon" href="favicon.ico" type="image/x-icon">
   ```

**Генераторы favicon:**
- [favicon.io](https://favicon.io) — из текста/emoji/изображения
- [realfavicongenerator.net](https://realfavicongenerator.net) — все размеры сразу

---

## Настройка карты Google Maps

1. Откройте [Google Maps](https://maps.google.com)
2. Найдите ваш адрес
3. Нажмите "Поделиться" → "Встроить карту"
4. Скопируйте `src="..."` из iframe
5. В `index.html` найдите `<!-- FOOTER -->` и замените URL в `<iframe src="...">`

---

## SEO: Настройка превью для соцсетей

При шаринге ссылки в WhatsApp/Telegram/Facebook показывается превью с картинкой и описанием.

### Настройка Open Graph

1. Создайте изображение **1200x630px** (важно для красивого превью!)
2. Сохраните как `images/og-preview.jpg`
3. В `index.html` найдите `og:image` и проверьте путь

**Поля для редактирования** (ищите `<!-- CHANGE: SEO`):
- `og:title` — заголовок для соцсетей
- `og:description` — описание (до 200 символов)
- `og:image` — картинка превью

### Проверка превью

- [Facebook Debugger](https://developers.facebook.com/tools/debug/) — проверка OG тегов
- [Twitter Card Validator](https://cards-dev.twitter.com/validator) — проверка Twitter Card
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) — проверка для LinkedIn

### Structured Data (JSON-LD)

В конце страницы (перед `</footer>`) есть JSON-LD разметка для Google.
Найдите `<!-- CHANGE: SEO - Данные для Google` и заполните:

- `name` — имя фотографа
- `telephone` — телефон
- `email` — email
- `addressLocality` — город

**Проверка:**
[Google Rich Results Test](https://search.google.com/test/rich-results)

---

## Не изменяйте

- Классы Bootstrap (`container`, `row`, `col-*`)
- Структуру HTML тегов (порядок вложенности)
- Имена CSS переменных в `variables.css`
- Свойства с комментарием `/* FIGMA: */` в CSS

Если нужно изменить layout — обратитесь к разработчику.

---

## Поддержка

Создано с помощью [ADON Solutions Landing Generator](https://github.com/anthropics/psv-figma-landing-generator)
