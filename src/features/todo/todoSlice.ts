import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { TodoState } from '../../types/app';
import type { PayloadAction } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todo',
  initialState: [
    {
      id: '1',
      value: 'Hey',
      completed: false,
    },
  ] as TodoState[],
  reducers: {
    addTodo: (state, action) => {
      if (action.payload.value) {
        state.push({
          ...state,
          id: (Math.random() * 255).toString(),
          value: action.payload.value,
          completed: false,
        });
      }
    },
    toggleTodo: (state, action: PayloadAction<{ id: string }>) => {
      console.log(action.payload);
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        state.splice(state.indexOf(todo), 1);
      }
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;

export const selectTodo = (state: RootState) => state;

export default todoSlice;
