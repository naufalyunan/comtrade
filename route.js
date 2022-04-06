const router = require("express").Router();
const fs = require("fs");
const axios = require("axios");

router.get("/getData", (req, res, next) => {
  for (let fileName = 2018; fileName > 2013; fileName--) {
    for (let rep = 1; rep < 4; rep++) {
      setInterval(async () => {
        const data = fs.readFileSync(`./reporter${rep}.json`, "utf-8");
        const reporter = JSON.parse(data).results;
        for (let i = 0; i < reporter.length; i++) {
          const { data } = await axios.get(
            `http://comtrade.un.org/api/get?max=50000&type=C&freq=A&px=HS&ps=${fileName}&r=${reporter[i].id}&p=0&rg=all&cc=AG2&fmt=json`
          );
          fs.writeFile(
            `./result/${fileName}/${reporter[i].text}.json`,
            JSON.stringify(data),
            (err) => {
              if (err) throw err;
              console.log(`The ${reporter[i].text} file has been saved!`);
            }
          );
          if (fileName == 2014 && rep == 3 && reporter[i] == "ASEAN") {
            clearInterval();
            res.status(200).send("finished");
          }
          console.log(data);
        }
      }, 3960000);
    }
  }
});

module.exports = router;
