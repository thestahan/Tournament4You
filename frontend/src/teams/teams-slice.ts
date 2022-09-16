import {
  Action,
  AnyAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import teamsAPI from "teams/api/teams-api";
import { ExtendedTeam, NewTeam, Team } from "teams/teams";

export const actionsTypes = {
  GET_TEAMS: "GET_TEAMS",
  ADD_TEAM: "ADD_TEAM",
  DELETE_TEAM: "DELETE_TEAM",
  UPDATE_TEAM: "UPDATE_TEAM",
  GET_EXTENDED_TEAM: "GET_EXTENDED_TEAM",
};

export interface TeamState {
  list: Team[];
  extendedList: ExtendedTeam[];
  listLoading: boolean;
  extendedListLoading: boolean;
  error?: any;
}

interface RejectedAction extends Action {
  error: Error;
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith("rejected");
}

function isPendingAction(action: AnyAction): action is Action {
  return action.type.endsWith("pending");
}

const name = "teams";
const initialState = getInitialState();
const teamsActions = getTeamsActions();

export const teamsSlice = createSlice({
  name: name,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    const { fulfilled: getTeamsSuccess } = teamsActions.getTeams;

    builder.addCase(getTeamsSuccess, (state, action) => {
      state.list = action.payload;
      state.listLoading = false;
    });

    const { fulfilled: deleteTeamSuccess } = teamsActions.deleteTeam;

    builder.addCase(deleteTeamSuccess, (state, action) => {
      state.list = state.list.filter(
        (team) => team.id !== (action.payload as unknown as number)
      );
      state.listLoading = false;
    });

    const { fulfilled: addTeamSuccess } = teamsActions.addTeam;

    builder.addCase(addTeamSuccess, (state, action) => {
      if (!state.list.some((team) => team.id === action.payload.id)) {
        state.list = [...state.list, action.payload];
      }
      state.listLoading = false;
    });

    const { fulfilled: getExtendedTeamSuccess } = teamsActions.getExtendedTeam;

    builder.addCase(getExtendedTeamSuccess, (state, action) => {
      const newExtendedTeam = action.payload;

      if (state.extendedList.some((team) => team.id === newExtendedTeam.id)) {
        removeAndInsertElementFromArray(state.extendedList, newExtendedTeam);
        return;
      }

      state.extendedList.push(newExtendedTeam);
      state.extendedListLoading = false;
    });

    const { fulfilled: updateTeamSuccess } = teamsActions.updateTeam;

    builder.addCase(updateTeamSuccess, (state, action) => {
      const updatedTeam = action.payload;
      const includedInList = checkIfIncludedInArray(state.list, updatedTeam);
      const includedInExtendedList = checkIfIncludedInArray(
        state.extendedList,
        updatedTeam
      );

      if (includedInList) {
        removeAndInsertElementFromArray(state.list, updatedTeam);
      }

      if (includedInExtendedList) {
        removeAndInsertElementFromArray(state.extendedList, updatedTeam, true);
      }
      state.listLoading = false;
      state.extendedListLoading = false;
    });

    builder.addMatcher(isPendingAction, (state, action) => {
      if (action.type === "UPDATE_TEAM") {
        state.extendedListLoading = true;
        state.listLoading = true;
        return;
      }

      action.type.includes("EXTENDED")
        ? (state.extendedListLoading = true)
        : (state.listLoading = true);
    });

    builder.addMatcher(isRejectedAction, (state, action) => {
      state.error = false;

      action.type.includes("EXTENDED")
        ? (state.extendedListLoading = false)
        : (state.listLoading = false);
    });
  },
});

function getInitialState(): TeamState {
  return {
    list: [],
    extendedList: [],
    error: false,
    listLoading: false,
    extendedListLoading: false,
  };
}

function getTeamsActions() {
  const api = teamsAPI();

  return {
    getTeams: getTeams(),
    deleteTeam: deleteTeam(),
    addTeam: addTeam(),
    getExtendedTeam: getExtendedTeam(),
    updateTeam: updateTeam(),
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

  function getExtendedTeam() {
    return createAsyncThunk(
      actionsTypes.GET_EXTENDED_TEAM,
      async (id: number) => await api.getTeam(id)
    );
  }

  function updateTeam() {
    return createAsyncThunk(
      actionsTypes.UPDATE_TEAM,
      async (team: Team) => await api.updateTeam(team).then(() => team)
    );
  }
}

function removeAndInsertElementFromArray(
  list: any[],
  elementToDelete: any,
  hasExtendedArray: boolean = false
) {
  const indexToDelete = list.findIndex(
    (element) => element?.id === elementToDelete?.id
  );
  const players = hasExtendedArray ? list[indexToDelete]?.players : null;
  list.splice(indexToDelete, 1);
  list.push(
    hasExtendedArray
      ? { ...elementToDelete, players: players }
      : elementToDelete
  );
}

function checkIfIncludedInArray(list: any[], elementToCheck: any): boolean {
  return list.some((element) => element?.id === elementToCheck?.id);
}

export const { getTeams, deleteTeam, addTeam, updateTeam, getExtendedTeam } =
  teamsActions;
