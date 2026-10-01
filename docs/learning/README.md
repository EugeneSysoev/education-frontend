# Хронология обучения

Этот файл — единая точка входа в обучение. Новая сессия начинается с определения активного дня по таблице, чтения его файла и проверки фактического состояния Git. Подробная реализация остаётся в тематических каталогах, а решения, результаты и следующие шаги фиксируются по календарным дням здесь.

GitHub: [EugeneSysoev/education-frontend](https://github.com/EugeneSysoev/education-frontend).

## Учебные дни

| День | Дата | Статус | Тема | Запись дня | Практика |
|---:|---|---|---|---|---|
| 1 | 2026-09-14 | Завершён | JavaScript diagnostic | [День 1](2026-09-14-day-01-javascript-diagnostic.md) | [`javascript/diagnostic/day-01`](../../javascript/diagnostic/day-01/README.md) |
| 2 | 2026-09-15 | Завершён | React state and effects | [День 2](2026-09-15-react-state-and-effects.md) | [`accordion`](../../react-lab/src/exercises/accordion/README.md), [`timer`](../../react-lab/src/exercises/timer/README.md) |
| 3 | 2026-09-16–17 | Завершён | Fetching data: Holidays App | [День 3](2026-09-16-day-03-holidays-app.md) | [`holidays-app`](../../react-lab/src/exercises/holidays-app/README.md) |
| 4 | 2026-09-18–2026-10-01 | В работе | JavaScript gap closing → `useLocalStorage` | [День 4](2026-09-18-day-04-javascript-and-local-storage.md) | [`gap-closing-01`](../../javascript/practice/gap-closing-01/README.md), [`use-local-storage`](../../react-lab/src/exercises/use-local-storage/README.md) |

## Состояние программы

- Цель: быстро выйти на рынок как сильный Junior Frontend Developer и развивать навыки уровня Middle через самостоятельные решения.
- Режим: около 5 часов в день, 6 дней в неделю; примерно 85% на разработку и обучение, 15% на GitHub, резюме и собеседования.
- Текущий фокус: упражнение `useLocalStorage` завершено; перед переходом к
  следующему дню остаются устное закрепление JS-блока и Git-чек-лист.
- Проект ментора «Кинопоиск» станет главным проектом; отдельное крупное приложение параллельно не создаётся.
- FSD проверяется через практическую декомпозицию, а не повторный просмотр курса.
- Матрица наблюдаемого уровня: [`learning-log/skills-matrix.md`](../../learning-log/skills-matrix.md).

## Правило продолжения

Следующий день создаётся только при закрытии текущего по чек-листу из `AGENTS.md`. Если часть работы переносится, она остаётся в текущем файле как незавершённая и явно связывается с новым планом.
