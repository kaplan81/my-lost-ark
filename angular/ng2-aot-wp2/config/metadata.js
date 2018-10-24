const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const BASE = './src';
const PROT = 'http';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 9090;
const PPATH = `${PROT}://${HOST};${PORT}/`;

const METADATA = {
    env: ENV,
    base: BASE,
    host: HOST,
    port: PORT,
    ppath: PPATH
}

exports.metadata = METADATA;
