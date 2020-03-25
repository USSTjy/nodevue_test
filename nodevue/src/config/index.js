
const defaultConfig = require('./default');
const productionConfig = require('./production');

const isProd = process.env.NODE_ENV === 'production';

const config = {};
Object.assign(config, defaultConfig);
if (isProd) Object.assign(config, productionConfig);

module.exports = config;
