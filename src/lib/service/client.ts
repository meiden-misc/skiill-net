import { ENVS } from "./env";

export const AuthStatus = {
  none: "none",
  waiting: "waiting",
  success: "success",
  errFetch: "errFetch",
  errSection: "errSection",
} as const;
export type AuthStatus = typeof AuthStatus[keyof typeof AuthStatus];

export class Auth {
  runAuthLink(): void {
    const CLIENT_ID = ENVS.CLIENT_ID;
    const REDIRECT_URL = ENVS.REDIRECT_URL;

    // stateの発行
    const randomValueArray = crypto.getRandomValues(new Uint32Array(8));
    const randomValue = randomValueArray.join("-");
    sessionStorage.setItem("state", randomValue);
    console.log(`state: ${sessionStorage.getItem("state")}`);

    // stateを認証URLに反映
    const authLink =
      "https://myaibo.aibo.sony.jp/account_link.html?state=" +
      sessionStorage.getItem("state") +
      "&client_id=" +
      CLIENT_ID +
      "&scope=pub&redirect_uri=" +
      REDIRECT_URL +
      "&response_type=code";

    window.location.href = authLink;
  }

  runAuthEndPoint(): Promise<Response> {
    const OAUTH_URL = ENVS.OAUTH_URL;
    const url = window.location.search;
    const hash = url.slice(1).split("&");
    let code = "";
    let state = "";
    hash.forEach((value) => {
      const key = value.split("=")[0];
      const val = value.split("=")[1];
      if (key === "code") {
        code = val;
      }
      if (key === "state") {
        state = val;
      }
    });

    const isValidSection = () =>
      state != "" && state == sessionStorage.getItem("state");

    // サーバに送る
    const postData = { code, state };
    const body = JSON.stringify(postData);
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (isValidSection()) {
      return fetch(OAUTH_URL, { method: "POST", mode: "cors", headers, body });
    } else {
      return new Promise((_, reject) => {
        reject(new Error("err_section"));
      });
    }
  }
}
