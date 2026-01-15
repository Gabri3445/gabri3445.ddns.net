import { create } from "zustand";
import { AdminState } from "../App.models";

export interface AdminStore {
  adminState: AdminState;
  setAdminState: (state: AdminState) => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
  adminState: AdminState.NONE,
  setAdminState: (state) => set({ adminState: state }),
}));
