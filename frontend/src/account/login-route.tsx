import userAPI from "common/api/user/user-api";
import { handleErrors } from "common/api/utils/handle-errors";
import * as ui from "common/ui";
import { FormEvent, useState } from "react";

const LoginRoute: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const api = userAPI();

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    api
      .login({
        email: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response.token);

        if (response.token !== undefined) {
          window.location.href = "/";
        }
      })
      .catch(handleErrors);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <ui.TextInput
          label="Email"
          value={email}
          setValue={setEmail}
        ></ui.TextInput>
        <ui.PasswordInput
          label="Password"
          value={password}
          setValue={setPassword}
        ></ui.PasswordInput>
        <ui.PrimaryButton>Log in</ui.PrimaryButton>
      </form>
    </>
  );
};

export default LoginRoute;
