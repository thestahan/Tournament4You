import { parseBody } from "common/api/utils/parse-body";
import { catchError } from "common/api/utils/catch-error";

type UserPayload = {
  email: string;
  password: string;
};

type UserAPI = {
  register: (userPayLoad: UserPayload) => Promise<any>;
  login: (UserPayload: UserPayload) => Promise<any>;
};

const userAPI = (): UserAPI => ({
  register: (userPayLoad: UserPayload) => {
    return fetch("https://localhost:7094/api/users/register", {
      method: "POST",
      body: JSON.stringify(userPayLoad),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => console.log(response));
  },

  login: (userPayLoad: UserPayload) => {
    return fetch("https://localhost:7094/api/users/login", {
      method: "POST",
      body: JSON.stringify(userPayLoad),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(parseBody)
      .then(catchError);
  },
});

export default userAPI;
