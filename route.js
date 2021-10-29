const Router = require("@koa/router");
const client = require("./redis-setup");

const router = new Router();

router.post("/", async (ctx, next) => {
  const data = ctx.request.body;
  let index = 0;
  try {
    if (typeof data === "object" && data !== null) {
      await Promise.all(
        Object.keys(data).map(async (key) => {
          await client.set(key, data[key]);
          index += 1;
        })
      );

      ctx.body = index === 1 ? "1 key added." : `${index} keys added.`;
    } else {
      ctx.body = { error: "input is not in required json format" };
    }
  } catch (err) {
    console.log(err.message);
    ctx.throw(500, "something wrong happend");
  }
});

router.get("/:key", async (ctx, next) => {
  const key = ctx.params.key;
  try {
    const value = await client.get(key);
    if (!value) {
      ctx.body = { error: "no value found" };
    } else {
      ctx.body = `{ ${key} : ${value} }`;
    }
  } catch (err) {
    console.log(err.message);
    ctx.throw(500, "something wrong happend");
  }
});
module.exports = router;
