import styled from "@emotion/styled";
import Select from "react-select";
import { useFormik } from "formik";
import { ui } from "common/index";
import { NewTournament } from "./tournaments";
import { Team } from "teams/teams";
import { useState } from "react";
import { uniqBy } from "lodash";

const FormContainer = styled.div`
  width: 300px;
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
`;

type ValidationErrors = {
  name?: string;
  teamsIds?: string;
};

type Props = {
  onFormSubmit: (tournament: NewTournament) => void;
  selectableTeams: Team[] | undefined;
};

const TournamentForm = ({
  onFormSubmit,
  selectableTeams,
}: Props): JSX.Element => {
  const [values, setValues] = useState<any>([]);

  const formik = useFormik({
    initialValues: { name: "", teamsIds: values },
    validate: ({ name, teamsIds }) => {
      const errors: ValidationErrors = {};

      if (!name) {
        errors.name = "Name is required";
      }

      if (!teamsIds) {
        errors.teamsIds = "Teams are required";
      }

      return errors;
    },
    onSubmit: (v) => {
      const tournament = {
        name: v.name,
        teamsIds: values,
      };

      onFormSubmit(tournament);
    },
  });

  let options: any = [];

  selectableTeams?.forEach((e) => {
    options.push({ value: e.id, label: e.name });
  });

  const onChange = (e: any) => {
    const essa = uniqBy([...e], "value");

    let ids: any = [];
    essa.forEach((e) => {
      ids.push(e.value);
    });

    setValues(ids);
  };

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
          <Select
            id="teams"
            name="teams"
            options={options}
            isMulti
            onChange={onChange}
            isClearable={false}
          />

          <ui.PrimaryButton type="submit">Submit</ui.PrimaryButton>
        </FormContent>
      </form>
    </FormContainer>
  );
};

export default TournamentForm;
