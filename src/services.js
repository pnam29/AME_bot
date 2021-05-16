import axios from "axios";
import moment from "moment-timezone";

import {readdirSync} from "fs";
import {MessageAttachment} from "discord.js";

export const ShowImage = (receivedMessage) => {
  const img = readdirSync("image/"); // Lấy tất cả ảnh thành một list trong folder Image/Anime

  // Lấy random ảnh anime
  const attachment = new MessageAttachment("image/" + img[0]); // Lấy ảnh đầu trong thư mục
  receivedMessage.channel.send(attachment);
};

export const processCommand = (receivedMessage) => {
  let fullCommand = receivedMessage.content
    .substr(5, receivedMessage.content.length);
  if (fullCommand==null || fullCommand =="") return;
  let splitCommand = fullCommand.split(" ");
  let cmd = splitCommand[0];
  let args = splitCommand.slice(1);
  let firstArg = splitCommand[1];
  let secondArg = splitCommand[2];
  let thirdArg = splitCommand[3];

  console.log(splitCommand);
  console.log("Command received: " + cmd);
  console.log("Arguments: " + args);
  console.log("Arguments 1: " + firstArg);
  console.log("Arguments 2: " + secondArg);
  console.log("Arguments 3: " + thirdArg);

  switch(cmd)
  {
  case "covid":
    Covid(receivedMessage);
    break;
  default:
    receivedMessage.channel.send("Bot không hỉu, bot không hỉu, bot không hỉu");
    break;
  }
};

const Covid = async (receivedMessage) => {
  const data = await getCovidData();
  receivedMessage.reply("");
  receivedMessage.channel.send(data);
};

const covidUrl = "https://corona.lmao.ninja/v2/countries/vn";
const fetchApi = () => axios.get(covidUrl);

export const getCovidData = async () => {
  const {data} = await fetchApi();
  const {
    updated,
    country,
    cases,
    todayCases,
    deaths,
    todayDeaths,
    recovered,
    todayRecovered,
    population,
    continent,
    undefined: undefine,
    // active,
    // critical,
    // casesPerOneMillion,
    // deathsPerOneMillion,
    // tests,
    // testsPerOneMillion,
    // oneCasePerPeople,
    // oneDeathPerPeople,
    // oneTestPerPeople,
    // activePerOneMillion,
    // recoveredPerOneMillion,
    // criticalPerOneMillion,
    // countryInfo,
  } = data;

  const arr = [
    "```=================== COVID 19 ===================",
    "\n",
    `Quốc gia: ${country}`,
    `Khu vực: ${continent}`,
    `Dân số: ${population}`,
    `Số ca nhiễm: ${cases}`,
    `Số ca nhiễm trong ngày hôm nay: ${todayCases}`,
    `Số ca tử vong: ${deaths}`,
    `Số ca tử vong ngày hôm nay: ${todayDeaths}`,
    `Số ca đã phục hồi: ${recovered}`,
    `Số ca đã phục hồi trong ngày hôm nay: ${todayRecovered}`,
    `Số ca chưa xác định: ${undefine}`,
    `Dữ liệu được cập nhật lúc: ${moment(updated)
      .locale("vi")
      .format("HH:mm:ss, DD/MM/YYYY")}`,
    "```",
  ];

  return arr.join("\n");
};
