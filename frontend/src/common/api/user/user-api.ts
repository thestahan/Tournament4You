import { parseBody } from "common/api/utils/parse-body";
import { catchError } from "common/api/utils/catch-error";

type UserRegisterPayload = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
};

type UserLoginPayload = {
  email: string;
  password: string;
};

type UserAPI = {
  register: (userPayLoad: UserRegisterPayload) => Promise<any>;
  login: (UserPayload: UserLoginPayload) => Promise<any>;
  logout: () => void;
};

const userAPI = (): UserAPI => ({
  register: (userPayLoad: UserRegisterPayload) => {
    return fetch("https://localhost:7094/api/users/register", {
      method: "POST",
      body: JSON.stringify(userPayLoad),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => console.log(response));
  },

  login: (userPayLoad: UserLoginPayload) => {
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
  logout: () => {
    localStorage.clear();
  },
});

export default userAPI;
