import { FormEvent, useState } from "react";
import * as ui from "common/ui";
import userAPI from "common/api/user/user-api";

const RegisterRoute: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const api = userAPI();

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    api.register({
      email: email,
      password: password,
    });
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
        <ui.PrimaryButton>Register</ui.PrimaryButton>
      </form>
    </>
  );
};

export default RegisterRoute;
