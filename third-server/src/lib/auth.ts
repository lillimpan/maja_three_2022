import type { User_data } from "./interfaces/auth";
import { SQLiteAuth, register_data_form as _register_data_form, login_data_form as _login_data_form } from "./implementations/auth";
export const auth: User_data = new SQLiteAuth();
export const login_data_form = _login_data_form
export const register_data_form = _register_data_form
