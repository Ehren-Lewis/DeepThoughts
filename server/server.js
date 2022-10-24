const { AppConfig } = require("aws-sdk");
const express = require("express");

const app = express();

const PORT = process.env.PORT || 3001;

const userRoutes = require("./routes/user-routes");


app.use(express.json())
app.use(express.urlencoded({extended:true}));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
}

app.use("/api/", userRoutes);

app.listen( PORT, () => {
    console.log(`Listening on localhost:${PORT}`)
});

