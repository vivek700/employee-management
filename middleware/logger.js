export const myLogger = function (req, res, next) {
  const timestamp = Date.now();
  const dateTime = new Date(timestamp).toLocaleString();
  console.log(
    `[${dateTime}] ${req.host} ${req.method} ${req.originalUrl} ${req.ip}`
  );
  next();
};
