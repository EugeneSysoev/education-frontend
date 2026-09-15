# Теоретическая диагностика

Не запускайте фрагменты до того, как письменно предскажете результат.

## Q1 — область видимости и замыкание

Что выведет код и почему?

```js
function createCounter(start) {
  let value = start;

  return {
    increment() {
      value += 1;
      return value;
    },
    read() {
      return value;
    },
  };
}

const first = createCounter(0);
const second = createCounter(10);

console.log(first.increment());
console.log(first.increment());
console.log(second.read());
```

## Q2 — ссылки и поверхностное копирование

Что будет в `source.settings.theme` и `copy.settings.theme`? Почему?

```js
const source = {
  name: "Alex",
  settings: { theme: "light" },
};

const copy = { ...source };
copy.settings.theme = "dark";
```

Предложите способ получить независимую копию именно для этой структуры.

## Q3 — цикл и замыкание

Что выведет код? Как изменить только объявление переменной, чтобы результат стал `0`, `1`, `2`?

```js
for (var index = 0; index < 3; index += 1) {
  setTimeout(() => console.log(index), 0);
}
```

## Q4 — event loop

Укажите точный порядок вывода и объясните роль call stack, microtask queue и task queue.

```js
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

queueMicrotask(() => console.log("D"));

console.log("E");
```

## Q5 — `Promise.all`

Что произойдёт с общим промисом, если второй из трёх промисов отклонится? Прекратят ли остальные операции выполняться автоматически?

## Q6 — состояние React и мутация

Почему прямое изменение объекта состояния может не привести к ожидаемому обновлению React-компонента? Ответьте через ссылочную идентичность, а не правилом «так нельзя».

