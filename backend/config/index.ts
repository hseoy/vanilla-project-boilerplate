process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
  port: parseInt(process.env.PORT || '5000', 10),
  api: {
    prefix: '/api',
    version: process.env.API_VERSION || '0.0.0',
  },
};
