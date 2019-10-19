module.exports = {
    name: 'Spy Drug Prices',
    logLevel: process.env.LOG_LEVEL || 'debug',
  
    database: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      database: process.env.DB_NAME || 'spydrugprices',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'root',
    },
  };