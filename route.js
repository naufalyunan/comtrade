const router = require("express").Router();
const fs = require("fs");
const axios = require("axios");
const data = fs.readFileSync("./reporter.json", "utf-8");
const reporter = JSON.parse(data).results;

router.get("/getData", async (req, res, next) => {
  for (let i = 0; i < reporter.length; i++) {
    const { data } = await axios.get(
      `http://comtrade.un.org/api/get?max=50000&type=C&freq=A&px=HS&ps=2019&r=${reporter[i].id}&p=0&rg=all&cc=AG2&fmt=json`
    );
    fs.writeFile(
      `./result/2019/${reporter[i].text}.json`,
      JSON.stringify(data),
      (err) => {
        if (err) throw err;
        console.log(`The ${reporter[i].text} file has been saved!`);
      }
    );
    console.log(data);
  }
  res.status(200).send("finished");
});

module.exports = router;
