import * as express from "express";
// Our Express APP config
const app = express();
app.set("port", process.env.PORT || 3000);

// API Endpoints

app.get("/", (req, res) => {
  res.send("hello");
});
// app.get("/{id}", book.getBook);
// app.post("/", book.addBook);
// app.put("/{id}", book.updateBook);
// app.delete("/{id}", book.deleteBook);

const server = app.listen(app.get("port"), () => {
  console.log("App is running on http://localhost:%d", app.get("port"));
});

module.exports = server;