const express = require("express");
const cors = require("cors");
const SpotifyWebApi = require("spotify-web-api-node");

const app = express();
app.use(cors());
app.use(express.static("build"));
app.use(express.json());

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri:
      process.env.NODE_ENV === "production"
        ? "https://musico-web-app.herokuapp.com"
        : "http://localhost:3000",
    clientId: "790b0e732d4f4ac397b1207b4a54b1da",
    clientSecret: "add6a8f91de0425492e4169db59d58f4",
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri:
      process.env.NODE_ENV === "production"
        ? "https://musico-web-app.herokuapp.com"
        : "http://localhost:3000",
    clientId: "790b0e732d4f4ac397b1207b4a54b1da",
    clientSecret: "add6a8f91de0425492e4169db59d58f4",
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

app.listen(process.env.PORT || 3001);
