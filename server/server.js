const { AppConfig } = require("aws-sdk");
const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3001;

const userRoutes = require("./routes/user-routes");
const imageRoutes = require("./routes/image-routes")

app.use(express.json())
app.use(express.urlencoded({extended:true}));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
}

app.use("/api/", userRoutes);
app.use("/api/", imageRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen( PORT, () => {
    console.log(`Listening on localhost:${PORT}`)
});

