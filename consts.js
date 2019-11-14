const urlRegEx = /https?:\/\/([Ww]{3}\.)?([A-Za-z0-9](-?[A-Za-z0-9]+)+(\.[A-Za-z]{2,})+|((2[0-5][0-5]\.|[0-1]?\d?\d?\.){3}(2[0-5][0-5]|[0-1]?\d?\d)))(:\d{2,5})?(\/[\S]*)*/;

const error404BadUrlHtml = `<!DOCTYPE html>
<html>
<head>
<title>Ошибка 404</title>
<meta charset="utf-8">
</head>
<body>
<div>Запрашиваемый ресурс не найден!</div>
<div>Ошибка 404.</div>
<div>Запросы возможны по адресам:</div>
<ul>
  <li>GET /users</li>
  <li>PATCH /users/me</li>
  <li>PATCH /users/me/avatar</li>
  <li>GET /users/:userId</li>
  <li>GET /cards</li>
  <li>GET, DELETE /cards/:cardId</li>
  <li>PUT, DELETE /cards/:cardId/likes</li>
</ul>
</body>
</html>`;

module.exports = {
  urlRegEx,
  error404BadUrlHtml,
};
