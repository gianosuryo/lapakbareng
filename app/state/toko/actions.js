import { FETCH_TOKO, FETCH_TOKO_SUCCESS, FETCH_TOKO_FAILURE } from "../actionTypes";

export const fetchToko = () => ({
  type: FETCH_TOKO
});

export const fetchTokoSuccess = (toko) => ({
  type: FETCH_TOKO_SUCCESS,
  toko
});

export const fetchTokoFailure = (error) => ({
  type: FETCH_TOKO_FAILURE,
  error
})
