module.exports = (err, req, res, next) => {
  const { statusCode, message } = err;
  if (!statusCode) {
    res.status(500).send('На сервере произошла ошибка');
    next();
  } else if (
    message.indexOf('Cast to ObjectId failed') === 0
  ) {
    res.status(404).send('Некорректный id объекта запроса');
    next();
  } else {
    res.status(statusCode).send({ message });
    next();
  }
};
