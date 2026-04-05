import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";

export const createStore = createAsyncThunk(
  "store/create",
  async (storeData, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");
      const res = await api.post("/api/stores", storeData, {
        headers: jwt ? { Authorization: `Bearer ${jwt}` } : undefined,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create store"
      );
    }
  }
);

export const getStoreByAdmin = createAsyncThunk(
  "store/getByAdmin",
  async (token, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/stores/admin", {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch store details"
      );
    }
  }
);
