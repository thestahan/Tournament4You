import styled from "@emotion/styled";
import { ui } from "common/index";
import { useFormik } from "formik";
import { Team } from "teams/teams";

const FormContainer = styled.div`
  width: 300px;
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
`;

type ValidationErrors = {
  name?: string;
  city?: string;
  coach?: string;
};

type Props = {
  team?: Team;
  onFormSubmit: (team: Team) => void;
};

const TeamAddForm = ({ onFormSubmit, team }: Props): JSX.Element => {
  const formik = useFormik({
    initialValues: team
      ? { name: team.name, coach: team.coach, city: team.city, id: team.id }
      : { name: "", coach: "", city: "", id: 0 },
    validate: ({ name, city, coach }) => {
      const errors: ValidationErrors = {};

      if (!name) {
        errors.name = "Name is required";
      }

      if (!city) {
        errors.city = "City is required";
      }

      if (!coach) {
        errors.coach = "Coach is required";
      }

      return errors;
    },
    onSubmit: (team) => onFormSubmit(team),
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
          <ui.InputLabeled label="Coach">
            <ui.StyledInput
              id="coach"
              name="coach"
              value={formik.values.coach}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </ui.InputLabeled>
          {formik.errors.coach && formik.touched.coach && (
            <ui.ValidationMessage style={{ marginBottom: "10px" }}>
              {formik.errors.coach}
            </ui.ValidationMessage>
          )}
          <ui.InputLabeled label="City">
            <ui.StyledInput
              id="city"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </ui.InputLabeled>
          {formik.errors.city && formik.touched.city && (
            <ui.ValidationMessage style={{ marginBottom: "10px" }}>
              {formik.errors.city}
            </ui.ValidationMessage>
          )}
          <ui.PrimaryButton type="submit">Submit</ui.PrimaryButton>
        </FormContent>
      </form>
    </FormContainer>
  );
};

export default TeamAddForm;
