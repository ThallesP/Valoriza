import express from "express";

const app = express();

app.get("/test", (request, response) => {
  return response.send("NLW");
});

app.post("/test-post", (request, response) => {
  return response.send("NLW Post method");
});

app.listen(3333, () => {
  console.log("Server running on :3333");
});
