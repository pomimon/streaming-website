# Notes

## Features

Top priority - needed to share to people
pinning streams - local storage
get a good theme

- colour
  fish 404 - reactrouter error handling

Med priority - would be nice
theatre mode
footer
likes
share buttons
descriptions - <details>
sorting
(button for own streams)

## Optimizations

pausing when scrolled away
pagination, maybe
admin page/table - id's titles - 3-4 buttons - refresh, update, edit, soft delete/hide
https://marmelab.com/react-admin/documentation.html

## pedantic

fix slugifys

youtube api key
AIzaSyDJKW8_U2rZejcOpZX8fQfXj6g577dunLw

response = await gapi.client.youtube.videos.list({"part": ["snippet"], "id": ["IXx7TYRpvT8"]})

## typescript to know

- enums
- utility types(pick, readonly etc)
- function syntax
- optional verse required(what's void, ?, !)
  - makes it so some or all properties are optional, must check for undefined is read. it will not show a runtime error
- two argument functions
- types by default are required?
- interface documentation

## sql maybe

- https://github.com/typeorm/typeorm
- https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#limits-and-pagination

"/api/streams/:category": async (req) => {
const query = streamRepository
.createQueryBuilder("stream")
.where("stream.category == {}", req.params.category)
.offset(pagination.offset)
.limit(pagination.limit)
.leftJoinAndSelect("stream.snapshot", "info")
.orderBy("stream.curated", "ASC")
.andOrderBy("info.is-live-stream", "DESC")
.andOrderBy("info.published_at", "DESC")
.getMany();

description show more button

- truncated description
  -show more button
  -need useState const?
  active ? "is-full" : "is-half"
  {active && (
  <button
  className="delete is-large"
  onClick={() => onClose()} ></button>
  )}
