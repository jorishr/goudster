const app = require("../index.cjs");
const port = process.env.SERVER_PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
