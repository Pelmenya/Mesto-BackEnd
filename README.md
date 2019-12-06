# Mesto-BackEnd

## Практическая работа №12

Настроено 3 роута для обработки запросов

| Запрос                                            | Ответ                                                               |
|---------------------------------------------------|---------------------------------------------------------------------|
| GET localhost:3000/users                          | JSON-список всех пользователей                                      |
| GET localhost:3000/cards                          | JSON-список всех карточек                                           |
| GET localhost:3000/users/8340d0ec33270a25f2413b69 | JSON-пользователя с переданным после /users  идентификатором. Если такого нет, API должно возвращать 404 статус  ответа и JSON:`{ "message": "Нет пользователя с таким id" }`        |                                                                                                          
| Несуществующий адрес                              | `{ "message": "Запрашиваемый ресурс не найден" }`                   |                                                   

## Установка

Для установки необходимо наличие Node.js и npm

Сохраните проект у себя на компьютере:  
```
git clone https://github.com/Pelmenya/Mesto-BackEnd.git
```

В корне проекта через консоль/терминал запустите команду:  
```
npm install
```
#### После успешной установки станут доступны команды:  
Запуск локального сервера:  
```
npm run dev
```  
Запуск продакшн сервера:  
```
npm run start
```