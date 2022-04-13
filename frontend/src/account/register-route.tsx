import userAPI from "common/api/user/user-api";
import * as ui from "common/ui";
import { FormEvent, useState } from "react";


const RegisterRoute: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const api = userAPI();
  const history = useHistory();

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    api
      .register({
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
      })

      .then(() =>
        api
          .login({ email: email, password: password })
          .then((response) => {
            localStorage.setItem("token", response.token);
          })
          .then(() => (window.location.href = "/"))
      );

  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <ui.TextInput
          label="Email"
          value={email}
          setValue={setEmail}
        ></ui.TextInput>
        <ui.TextInput
          label="Firstname"
          value={firstname}
          setValue={setFirstname}
        ></ui.TextInput>
        <ui.TextInput
          label="Lastname"
          value={lastname}
          setValue={setLastname}
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
