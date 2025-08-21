export const enforceApiKey = (INTERNAL_API_KEY) => {
  return (req, res, next) => {
    const secret = req.headers["internal-api-key"];
    if (secret && secret === INTERNAL_API_KEY) {
      next();
    } else {
      res.status(403).json({ error: "Forbidden: Unauthorized access." });
    }
  };
};
