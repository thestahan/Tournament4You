import userAPI from "account/api/user-api";
import * as ui from "common/ui";
import styled from "@emotion/styled";
import { useFormik } from "formik";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 10px;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

type ValidationErrors = {
  email?: string;
  firstname?: string;
  lastname?: string;
  password?: string;
};

const RegisterRoute: React.FC = () => {
  const api = userAPI();

  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const formik = useFormik({
    initialValues: { email: "", firstname: "", lastname: "", password: "" },
    validate: ({ email, password, firstname, lastname }) => {
      const errors: ValidationErrors = {};

      if (!email) {
        errors.email = "Email is required";
      }

      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        errors.email = "Email is invalid";
      }

      if (!password) {
        errors.password = "Password is required";
      }

      if (!/[^0-9]/i.test(firstname)) {
        errors.firstname = "Firstname is invalid";
      }

      if (!firstname) {
        errors.firstname = "Firstname is required";
      }

      if (!/[^0-9]/i.test(lastname)) {
        errors.lastname = "Lastname is invalid";
      }

      if (!lastname) {
        errors.lastname = "Lastname is required";
      }

      return errors;
    },
    onSubmit: ({ email, password, firstname, lastname }) => {
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
            .then(() => history.push("/"))
        )
        .catch((error) => setErrorMessage(error.message));
    },
  });

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <FormContainer>
          <ui.Error message={errorMessage}></ui.Error>
          <ui.StyledInput
            placeholder="Email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></ui.StyledInput>
          {formik.errors.email && formik.touched.email && (
            <ui.ValidationMessage>{formik.errors.email}</ui.ValidationMessage>
          )}
          <ui.StyledInput
            placeholder="Firstname"
            name="firstname"
            id="firstname"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></ui.StyledInput>
          {formik.errors.firstname && formik.touched.firstname && (
            <ui.ValidationMessage>
              {formik.errors.firstname}
            </ui.ValidationMessage>
          )}
          <ui.StyledInput
            placeholder="Lastname"
            name="lastname"
            id="lastname"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></ui.StyledInput>
          {formik.errors.lastname && formik.touched.lastname && (
            <ui.ValidationMessage>
              {formik.errors.lastname}
            </ui.ValidationMessage>
          )}
          <ui.PasswordInput
            label="Password"
            name="password"
            id="password"
            value={formik.values.password}
            setValue={formik.handleChange}
            onBlur={formik.handleBlur}
          ></ui.PasswordInput>
          {formik.errors.password && formik.touched.password && (
            <ui.ValidationMessage>
              {formik.errors.password}
            </ui.ValidationMessage>
          )}
          <ButtonContainer>
            <ui.PrimaryButton type="submit">Register</ui.PrimaryButton>
          </ButtonContainer>
        </FormContainer>
      </form>
    </Container>
  );
};

export default RegisterRoute;
