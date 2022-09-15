import {
  Action,
  AnyAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import teamsAPI from "teams/api/teams-api";
import { NewTeam, Team } from "teams/teams";

export const actionsTypes = {
  GET_TEAMS: "GET_TEAMS",
  ADD_TEAM: "ADD_TEAM",
  DELETE_TEAM: "DELETE_TEAM",
};

export interface State {
  value: Team[];
  loading: boolean;
  error?: any;
}
interface RejectedAction extends Action {
  error: Error;
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith("rejected");
}

const name = "teams";
const initialState = getInitialState();
const teamsActions = getTeamsActions();

export const teamsSlice = createSlice({
  name: name,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    const { fulfilled: getTeamsSuccess, pending: getTeamsLoading } =
      teamsActions.getTeams;

    builder.addCase(getTeamsSuccess, (state, action) => {
      state.value = action.payload;
      state.loading = false;
    });

    builder.addCase(getTeamsLoading, (state, action) => {
      state.loading = true;
    });

    const { fulfilled: deleteTeamSuccess, pending: deleteTeamLoading } =
      teamsActions.deleteTeam;

    builder.addCase(deleteTeamSuccess, (state, action) => {
      state.value = state.value.filter(
        (team) => team.id !== (action.payload as unknown as number)
      );
      state.loading = false;
    });
    builder.addCase(deleteTeamLoading, (state, action) => {
      state.loading = true;
    });

    const { fulfilled: addTeamSuccess, pending: addTeamLoading } =
      teamsActions.addTeam;

    builder.addCase(addTeamSuccess, (state, action) => {
      if (!state.value.some((team) => team.id === action.payload.id)) {
        state.value = [...state.value, action.payload];
      }
      state.loading = false;
    });
    builder.addCase(addTeamLoading, (state, action) => {
      state.loading = true;
    });

    builder.addMatcher(isRejectedAction, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
  },
});

function getInitialState(): State {
  return { value: [], loading: false, error: false };
}

function getTeamsActions() {
  const api = teamsAPI();

  return {
    getTeams: getTeams(),
    deleteTeam: deleteTeam(),
    addTeam: addTeam(),
  };

  function getTeams() {
    return createAsyncThunk(
      actionsTypes.GET_TEAMS,
      async () => await api.getTeams()
    );
  }

  function deleteTeam() {
    return createAsyncThunk(
      actionsTypes.DELETE_TEAM,
      async (id: number) => await api.deleteTeam(id).then(() => id)
    );
  }

  function addTeam() {
    return createAsyncThunk(
      actionsTypes.ADD_TEAM,
      async (team: NewTeam) => await api.addTeam(team).then((team) => team)
    );
  }
}

export const { getTeams, deleteTeam, addTeam } = teamsActions;
