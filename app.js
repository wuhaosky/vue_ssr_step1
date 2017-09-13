const Vue = require("vue");
var koa = require("koa");
var app = new koa();
var Router = require("koa-router");
var router = new Router();
const renderer = require("vue-server-renderer").createRenderer();

app.use(router.routes()).use(router.allowedMethods());

router.get("*", function *(next) {
    var ctx = this;
    const vm = new Vue({
        data: {
            url: ctx.url
        },
        template: `<div>访问的 URL 是： {{ url }}</div>`
    });
    renderer.renderToString(vm, (err, html) => {
        if (err) {
            ctx.response.status = 500;
            ctx.body = "Internal Server Error";
            return;
        }
        ctx.status = 200;
        ctx.body = `
            <!DOCTYPE html>
            <html lang="en">
                <head><title>Hello</title></head>
                <body>${html}</body>
            </html>
        `;
    });
});

app.listen(3030);
