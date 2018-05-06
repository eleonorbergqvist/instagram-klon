module.exports = {
  SECRET: process.env.SECRET || 'A secret value',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/instagram_klon',
  PORT: process.env.PORT || 8080,
};