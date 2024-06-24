import fs from "fs";
import path from "path";
import { ITodo } from "@/interface/todo";

const dataFilePath = path.join(
  process.cwd(),
  process.env.FILEPATH ?? "/public/data.json"
);

const readData = () => {
  try {
    const jsonData = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(jsonData ?? "{}");
  } catch (err) {
    console.log(err);
    return [];
  }
};

const writeData = (data: ITodo) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

export { readData, writeData };
