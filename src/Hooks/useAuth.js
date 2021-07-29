import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth(code) {
  const [authObject, setAuthObject] = useState({});

  useEffect(() => {
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://musico-web-app.herokuapp.com/login"
          : "http://localhost:3001/login",
        {
          code,
        }
      )
      .then((res) => {
        setAuthObject({
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
          setExpiresIn: res.data.expiresIn,
        });
        window.history.pushState({}, null, "/");
      })
      .catch(() => {
        window.location = "/";
      });
  }, [code]);

  useEffect(() => {
    if (!authObject.refreshToken || !authObject.expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post(
          process.env.NODE_ENV === "production"
            ? "https://musico-web-app.herokuapp.com/refresh"
            : "http://localhost:3001/refresh",
          {
            refreshToken: authObject.refreshToken,
          }
        )
        .then((res) => {
          setAuthObject({
            accessToken: res.data.accessToken,
            refreshToken: authObject.refreshToken,
            setExpiresIn: res.data.expiresIn,
          });
        })
        .catch(() => {
          window.location = "/";
        });
    }, (authObject.expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [authObject.refreshToken, authObject.expiresIn]);

  return authObject.accessToken;
}
