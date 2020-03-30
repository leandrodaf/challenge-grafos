const Koa = require('koa');
const koaBody = require('koa-body');

const app = new Koa();

const router = require('./Router/Router');

app
    .use(koaBody())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            const isJson = ctx.get('Accept') === 'application/json';
            if (isJson) {
                ctx.body = {
                    error: 'An error just occurred'
                }
            } else {
                throw err;
            }
        }
    });

module.exports = app;
