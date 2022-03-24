const router = require("express").Router();
const fs = require("fs");
const axios = require("axios");
const data = fs.readFileSync("./reporter2.json", "utf-8");
const reporter = JSON.parse(data).results;
console.log(reporter[0].id);
router.get("/getData", async (req, res, next) => {
  let list = [];
  // (async function(arr) {
  for (let i = 0; i < reporter.length; i++) {
    const { data } = await axios.get(
      `http://comtrade.un.org/api/get?max=50000&type=C&freq=A&px=HS&ps=2013&r=${reporter[i].id}&p=0&rg=all&cc=AG2&fmt=json`
    );
    // }
    // }

    // )(list).then(v => {
    //     console.log(v)
    //     // console.log(list)

    console.log(data);
  }
  console.log(fs);
});

module.exports = router;
