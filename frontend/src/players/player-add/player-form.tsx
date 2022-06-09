import styled from "@emotion/styled";
import { useFormik } from "formik";
import { ui } from "common/index";
import { NewPlayer, Position } from "players/players";

type Props = {
  onFormSubmit: (player: NewPlayer) => void;
  positions: Position[];
};

type ValidationErrors = {
  name?: string;
  surname?: string;
  positionId?: string;
};

const FormContainer = styled.div`
  width: 300px;
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PlayerForm = ({ onFormSubmit, positions }: Props) => {
  const formik = useFormik({
    initialValues: { name: "", surname: "", positionId: "1" },
    validate: ({ name, surname, positionId }) => {
      const errors: ValidationErrors = {};
      if (!name) {
        errors.name = "Name is required";
      }

      if (!surname) {
        errors.surname = "Surname is required";
      }

      if (!positionId) {
        errors.positionId = "Position is required";
      }
      return errors;
    },
    onSubmit: (player) => {
      const positionId = parseInt(player.positionId);
      onFormSubmit({
        name: player.name,
        surname: player.surname,
        positionId: positionId,
      });
    },
  });

  return (
    <FormContainer>
      <form onSubmit={formik.handleSubmit}>
        <FormContent>
          <ui.InputLabeled label="Name">
            <ui.StyledInput
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </ui.InputLabeled>
          {formik.errors.name && formik.touched.name && (
            <ui.ValidationMessage style={{ marginBottom: "10px" }}>
              {formik.errors.name}
            </ui.ValidationMessage>
          )}
          <ui.InputLabeled label="Surname">
            <ui.StyledInput
              id="surname"
              name="surname"
              value={formik.values.surname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </ui.InputLabeled>
          {formik.errors.surname && formik.touched.surname && (
            <ui.ValidationMessage style={{ marginBottom: "10px" }}>
              {formik.errors.surname}
            </ui.ValidationMessage>
          )}
          <ui.InputLabeled label="Position">
            <ui.Select
              onBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              name="positionId"
              value={formik.values.positionId}
              options={positions}
            ></ui.Select>
          </ui.InputLabeled>
          {formik.errors.positionId && formik.touched.positionId && (
            <ui.ValidationMessage style={{ marginBottom: "10px" }}>
              {formik.errors.positionId}
            </ui.ValidationMessage>
          )}
          <ui.PrimaryButton type="submit">Submit</ui.PrimaryButton>
        </FormContent>
      </form>
    </FormContainer>
  );
};
