import * as ACTIONS from '../../actionTypes';
import { replaceWithAccount } from '../../util';

const initialState = {
  accounts: [],
  paging: {
    page: 0,
    rowsPerPage: 10,
    total: 0
  },
  isLoading: false,
  block: {
    open: false
  },
  edit: {
    open: false
  },
  delete: {
    open: false
  }
};

const admin = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.ACCOUNTS_CHANGE_PAGING:
      return {
        ...state,
        paging: action.paging
      };
    case ACTIONS.ACCOUNTS_LOAD:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case ACTIONS.ACCOUNTS_LOADED:
      return {
        ...state,
        ...action.payload
      };
    case ACTIONS.ACCOUNTS_LOAD_FAILED:
      return {
        ...state,
        ...action.payload
      };
    case ACTIONS.BLOCK_ACCOUNT_CONFIRM:
      return {
        ...state,
        block: action.payload
      };
    case ACTIONS.BLOCK_ACCOUNT_SUCCESS:
      return {
        ...state,
        accounts: replaceWithAccount(state.accounts, state.block.user)
      };
    case ACTIONS.BLOCK_ACCOUNT_UPDATE:
      return {
        ...state,
        block: { ...state.block, user: action.account }
      };
    case ACTIONS.BLOCK_ACCOUNT_END:
      return {
        ...state,
        block: action.payload
      };
    case ACTIONS.DELETE_ACCOUNT_CONFIRM:
      return {
        ...state,
        delete: action.payload
      };
    case ACTIONS.DELETE_ACCOUNT_END:
      return {
        ...state,
        delete: action.payload
      };
    case ACTIONS.EDIT_ACCOUNT_DIALOG:
      return {
        ...state,
        edit: action.payload
      };
    case ACTIONS.EDIT_ACCOUNT_UPDATE:
      return {
        ...state,
        edit: { ...state.edit, user: action.account }
      };
    case ACTIONS.EDIT_ACCOUNT_SUCCESS:
      return {
        ...state,
        accounts: replaceWithAccount(state.accounts, state.edit.user)
      };
    case ACTIONS.EDIT_ACCOUNT_END:
      return {
        ...state,
        edit: action.payload
      };
    default:
      return state;
  }
};

export default admin;
