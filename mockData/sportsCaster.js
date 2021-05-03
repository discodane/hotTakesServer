var fs = require("fs");

var sportsCastersDB = require("./sportsCasters.json");

exports.createSportscasters = (caster) => {
  sportsCastersDB.push(caster);
};

exports.saveCasters = () => {
  const data = JSON.stringify(sportsCasterDB);
  fs.writeFileSync("./sportsCaster.json", data);
};

const getTakes = () => ({
  title: "Laker's will miss the playoffs",
  graded: true,
  dueDate: "07/25/2019",
  dateGiven: "04/22/2019",
  result: false,
});

/**
 * take *
 * title: string
 * graded: bool
 * status: string "placed" "pending" "graded"  is this needed?
 * datePlaced: date
 * takeId: string
 */

/**
 * sports caster *
 * name: string
 * average: percentage, number
 * takes: array[take]
 * market: string
 * platform: string
 * verfied
 */
