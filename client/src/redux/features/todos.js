import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  items: [],
  error: null,
};

export const fetchTodos = createAsyncThunk(
  "fetchTodos",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    console.log(state.application.token)
    try {
      const response = await fetch(`/todos/${state.application.user}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${state.application.token}`,
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


export const addTodo = createAsyncThunk("todo/add", async (text,thunkAPI) => {
const token = localStorage.getItem("token")
try {
const res = await fetch("http://localhost:4000/todos", {
method: "POST",
headers: {
"Content-Type": "application/json",
Authorization: `Bearer ${token}`,
},
body: JSON.stringify({
  text,
}),
});
return res.json()
} catch (error) {
return thunkAPI.rejectWithValue(error) 
}
})

export const removeTodo = createAsyncThunk(
  "todo/remove",
  async (id, thunkAPI) => {
    const token = localStorage.getItem("token")
    try {
    await fetch(`http://localhost:4000/todos/${id}`, {
    method: "DELETE",
    headers: {
    Authorization: `Bearer ${token}`,
    },
    });
    return id;
    } catch (error) {
    return thunkAPI.rejectWithValue(error)
    }
  }
)




export const todos = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false
       state.items = action.payload
      })
      .addCase(fetchTodos.rejected, (state, action) => {
          state.loading = false
          state.items = []
          state.error = action.payload
      })
      .addCase(addTodo.fulfilled, (state, action) => {
      state.items.push(action.payload)
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
      state.items = state.items.filter((el, index) => el._id !== action.payload)
      })
      
  },
});

export default todos.reducer;









/*
export default function todos(state = initialState, action) {
  switch (action.type) {
    case "todos/fetch-todos/pending":
      return {
        ...state,
        loading: true,
      };

    case "todos/fetch-todos/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };

    case "todos/fetch-todos/rejected":
      return {
        ...state,
        loading: false,
        items: [],
        error: action.error,
      };

    default:
      return state;
  }
}

export const fetchTodos = () => {
  return async (dispatch, getState) => {
    const state = getState();

    dispatch({ type: "todos/fetch-todos/pending" });
    try {
      const response = await fetch("/todos", {
        headers: {
          Authorization: `Bearer ${state.application.token}`,
        },
      });
      const json = await response.json();

      if (json.error) {
        dispatch({
          type: "todos/fetch-todos/rejected",
          error: "При запросе на сервер произошла ошибка",
        });
      } else {
        dispatch({ type: "todos/fetch-todos/fulfilled", payload: json });
      }
    } catch (e) {
      dispatch({ type: "todos/fetch-todos/rejected", error: e.toString() });

      localStorage.setItem("token");
    }
  };
};

*/
