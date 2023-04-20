import serverlessMysql from 'serverless-mysql';

const db = serverlessMysql({
  config: {
    host: process.env.RDS_HOST,
    port: parseInt(process.env.RDS_PORT || '3306'),
    database: process.env.RDS_DB_NAME,
    user: process.env.RDS_USER,
    password: process.env.RDS_PASSWORD,
  },
});

export default db;
