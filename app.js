const koa = require("koa");
const router = require("./route");

const app = new koa();

app.on("error", (err) => {
  console.error("server error", err);
});

app.use(require("koa-body")());
app.use(router.routes());
app.use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`app is up and running on port ${PORT}`));
