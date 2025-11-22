export { AVAILABLE_CATEGORIES } from "./Categories";
export { VIDEO_IDS as YOUTUBE_IDS } from "./Streams/YouTube";

export interface VideoIdList {
  Aquatic: { [subcategory: string]: string[] };
  Birds: { [subcategory: string]: string[] };
  Mammals: { [subcategory: string]: string[] };
  Pets: { [subcategory: string]: string[] };
  Reptiles: { [subcategory: string]: string[] };
  Zoos: { [subcategory: string]: string[] };
}
