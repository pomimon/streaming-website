import index from "./../index.html";

import { sqlite } from "./sqlite";

const QUERY_LIST_STREAMS = `
  SELECT
    ytid, name, info,
    broadcast,
    thumbnail, thumbnail_hires,
    opt_hires, opt_caption,
    stat_views, stat_likes, stat_comments
  FROM
    streams
  AS
    stream
  WHERE
    stream.opt_deleted == 0
  AND
    stream.category == $category
  ORDER BY
    stream.broadcast == 'live' DESC,
    stream.stat_likes DESC,
    stream.stat_views DESC,
    stream.opt_hires DESC,
    stream.opt_caption DESC
  LIMIT
    $limit
  OFFSET
    $offset
`;

const CATEGORY_SLUGS = [
  "aquatic",
  "birds",
  "mammals",
  "other",
  "pets",
  "reptiles-and-insects",
  "zoos",
  // "unknown",
];

const DEFAULT_ERROR = "something went wrong";

const ERRORS = {
  404: "resource not found",
};

const ApiError = (status) => {
  const error = {
    message: ERRORS[status] || DEFAULT_ERROR,
    code: status,
  };

  return Response.json(error, { status });
};

class Query {
  static DEFAULT_CATEGORY = "other";

  static MAX_PAGE = 100;
  static MIN_PAGE = 1;

  static PAGE_SIZE = 21;

  #category = null;
  #page = 1;

  constructor(category, page = 1) {
    this.#category = category;
    this.#page = Number(page);
  }

  get category() {
    if (CATEGORY_SLUGS.includes(this.#category)) {
      return this.#category;
    }

    return Query.DEFAULT_CATEGORY;
  }

  get page() {
    return Math.min(Math.max(this.#page, Query.MIN_PAGE), Query.MAX_PAGE);
  }

  get limit() {
    return Query.PAGE_SIZE;
  }

  get offset() {
    return (this.page - 1) * this.limit;
  }
}

export const routes = {
  "/*": index,

  "/api/*": () => ApiError(404),

  "/api/streams/:category": {
    GET: (request) => {
      const url = new URL(request.url);

      const { category, limit, offset } = new Query(
        request.params.category,
        url.searchParams.get("page"),
      );

      const streams = sqlite.query(QUERY_LIST_STREAMS).all({
        category,
        limit: 30,
        offset,
      });

      return Response.json(streams);
    },
  },
};
