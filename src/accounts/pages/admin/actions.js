import * as ACTIONS from '../../actionTypes';
import SERVICE_PATH from '../../../common/service/constants';

const newPaging = paging => ({ type: ACTIONS.ACCOUNTS_CHANGE_PAGING, paging });
const fetchAccounts = () => ({ type: ACTIONS.ACCOUNTS_LOAD, isLoading: true });
const fetchAccountsFailed = error => ({
  type: ACTIONS.ACCOUNTS_LOAD_FAILED,
  payload: { isLoading: false, error }
});
const receiveAccounts = data => ({
  type: ACTIONS.ACCOUNTS_LOADED,
  payload: {
    isLoading: false,
    accounts: data.content,
    paging: {
      page: data.page,
      rowsPerPage: data.pageSize,
      total: data.totalElements
    }
  }
});

function parsePagingParams({ page, rowsPerPage }) {
  return `?page=${page}&size=${rowsPerPage}`;
}

export function changePaging(paging) {
  return dispatch => {
    dispatch(newPaging(paging));
  };
}

export function loadUsers() {
  return (dispatch, getState, api) => {
    dispatch(fetchAccounts());

    const {
      account: {
        pages: {
          admin: { paging }
        }
      }
    } = getState();

    api
      .get(`${SERVICE_PATH.ACCOUNTS}/users${parsePagingParams(paging)}`)
      .then(response => {
        if (response.success) {
          dispatch(receiveAccounts(response.data));
        }
      })
      .catch(error => {
        dispatch(fetchAccountsFailed(error));
      });
  };
}
