import { DataSource } from "typeorm";
import { Stream } from "./Stream";
import { StreamInfo } from "./StreamInfo";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: `${__dirname}/streams.sqlite`,
  entities: [Stream, StreamInfo],
});

try {
  await AppDataSource.initialize();
  console.log("Data Source has been initialized!");
} catch (error) {
  console.error("Error during Data Source initialization", error);
}
