import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  signingUp: false,
  signingIn: false,
  error: null,
  token: localStorage.getItem("token"),
  user: localStorage.getItem("user"),
};

export const createUser = createAsyncThunk(
  "sign",
  async ({ login, password }, thunkAPI) => {
    try {
      const response = await fetch("/users", {
        method: "POST",
        body: JSON.stringify({ login, password }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();

      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      } else {
        return thunkAPI.fulfillWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const auth = createAsyncThunk(
  "auth",
  async ({ login, password }, thunkAPI) => {
    try {
      const response = await fetch("/login", {
        method: "POST",
        body: JSON.stringify({ login, password }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await response.json();

      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      } else {
        console.log(data.token)
        localStorage.setItem("token", data.token);
        // user
        localStorage.setItem('user', data.user)
        return thunkAPI.fulfillWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const application = createSlice({
  name: "application",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        state.signingUp = true;
      })
      .addCase(createUser.pending, (state, action) => {
        state.signingUp = true;
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.signingUp = false;
        state.error = action.payload;
      })
      .addCase(auth.pending, (state, action) => {
        state.signingIn = true;
        state.error = null;
      })
      .addCase(auth.fulfilled, (state, action) => {
        state.signingIn = false;
        state.token = action.payload.token;
        state.user = action.payload.user;

      })
      .addCase(auth.rejected, (state, action) => {
        state.signingIn = false;
        state.error = action.payload;
      });
  },
});

export default application.reducer;




// старый код
// перевели на ToolKit

/*
export default function application(state = initialState, action) {
  switch (action.type) {
    case "application/signup/pending":
      return {
        ...state,
        signingUp: true,
        error: null,
      };

    case "application/signup/fulfilled":
      return {
        ...state,
        signingUp: true,
      };

    case "application/signup/rejected":
      return {
        ...state,
        signingUp: false,
        error: action.error,
      };

    case "application/signin/pending":
      return {
        ...state,
        signingIn: true,
        error: null,
      };

    case "application/signin/fulfilled":
      return {
        ...state,
        signingIn: false,
        token: action.payload.token,
      };

    case "application/signin/rejected":
      return {
        ...state,
        signingIn: false,
        error: action.error,
        token: action.payload.token,
      };

    default:
      return state;
  }
}

export const createUser = (login, password) => (dispatch) => {
  return async (dispatch) => {
    dispatch({ type: "application/signup/pending" });

    const response = await fetch("/users", {
      method: "POST",
      body: JSON.stringify({ login, password }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const json = await response.json();

    if (json.error) {
      dispatch({ type: "application/signup/rejected", error: json.error });
    } else {
      dispatch({ type: "application/signup/fulfilled", payload: json });
    }
  };
};

export const auth = (login, password) => {
  return async (dispatch) => {
    dispatch({ type: "application/signup/pending" });

    const response = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({ login, password }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const json = await response.json();

    if (json.error) {
      return dispatch({
        type: "application/signin/rejected",
        error: json.error,
      });
    } else {
      localStorage.setItem("token", json.token);
      return dispatch({ type: "application/signin/fulfilled", payload: json });
    }
  };
};
*/
