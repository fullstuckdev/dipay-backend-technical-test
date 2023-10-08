export const emailConfig = {
  host: process.env.HOST,
  port: process.env.PORT,
  secure: process.env.SECURE,
  auth: {
    user: process.env.USERNAME,
    pass: process.env.PASSWORD,
  },
};