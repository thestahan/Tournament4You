import styled from "@emotion/styled";
import userAPI from "account/api/user-api";
import * as ui from "common/ui";
import { useFormik } from "formik";
import { useState } from "react";

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
  password?: string;
  email?: string;
};

const LoginRoute: React.FC = () => {
  const api = userAPI();
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: { password: "", email: "" },
    validate: ({ email, password }) => {
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

      return errors;
    },
    onSubmit: ({ email, password }) => {
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
        .catch((error) => setErrorMessage(error.message));
    },
  });

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <FormContainer>
          <ui.Error message={errorMessage}></ui.Error>
          <ui.StyledInput
            id="email"
            name="email"
            value={formik.values.email}
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            incorrect={formik.touched.email && !!formik.errors.email}
          ></ui.StyledInput>
          {formik.errors.email && formik.touched.email && (
            <ui.ValidationMessage>{formik.errors.email}</ui.ValidationMessage>
          )}

          <ui.PasswordInput
            label="Password"
            value={formik.values.password}
            setValue={formik.handleChange}
            onBlur={formik.handleBlur}
            id="password"
            name="password"
            incorrect={formik.touched.password && !!formik.errors.password}
          ></ui.PasswordInput>
          {formik.errors.password && formik.touched.password && (
            <ui.ValidationMessage>
              {formik.errors.password}
            </ui.ValidationMessage>
          )}
          <ButtonContainer>
            <ui.PrimaryButton type="submit">Log in</ui.PrimaryButton>
          </ButtonContainer>
        </FormContainer>
      </form>
    </Container>
  );
};

export default LoginRoute;
