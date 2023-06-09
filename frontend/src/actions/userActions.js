import axios from "axios";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_ERRORS,
} from "../constants/userConstants";

//login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        let userInfo = {
            email,
            password,
        };
        // userInfo = JSON.stringify(userInfo);

        const { data } = await axios.post("/api/v1/login", userInfo, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user,
        });
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.message,
        });
    }
};

// register action
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "mltipart/form-data",
            },
        };

        const { data } = await axios.post("/api/v1/register", userData, config);

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user,
        });
    } catch (err) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: err.response.data.message,
        });
    }
};

// Load action
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get("/api/v1/me");

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user,
        });
    } catch (err) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: err.response.data.message,
        });
    }
};

// logout action
export const logout = () => async (dispatch) => {
    try {
        await axios.get("/api/v1/logout");

        dispatch({
            type: LOGOUT_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: err.response.data.message,
        });
    }
};

// Clear Errors
export const clearErrors = async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};
