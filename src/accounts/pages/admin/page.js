import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import { TableBody, TableRow, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TablePagination from '@material-ui/core/TablePagination/TablePagination';
import IconButton from '@material-ui/core/IconButton/IconButton';
import ActiveIcon from '@material-ui/icons/Mood';
import InactiveIcon from '@material-ui/icons/MoodBad';
import EditIcon from '@material-ui/icons/Edit';
import BlockIcon from '@material-ui/icons/Block';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import RefreshIcon from '@material-ui/icons/Refresh';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import Grid from '@material-ui/core/Grid/Grid';
import TableHead from '@material-ui/core/TableHead/TableHead';
import Loader from '../../../common/components/progress/loader';
import styles from './styles';
import AccountActions from '../../actions';
import TableToolbar from '../../../common/components/table/tableToolbar';
import AccountEditDialog from './modals/edit/accountEditDialog';
import AccountBlockConfirm from './modals/block/accountBlockConfirm';
import AccountDeleteConfirm from './modals/delete/accountDeleteConfirm';

const rowsPerPageOptions = [10, 15, 20];

const columns = [
  { id: 'status', name: 'Status' },
  { id: 'firstName', name: 'First Name' },
  { id: 'lastName', name: 'Last Name' },
  { id: 'nickName', name: 'Nick Name' },
  { id: 'email', name: 'Email' },
  { id: 'role', name: 'Role' },
  { id: 'edit', name: 'Edit' },
  { id: 'block', name: 'Block' },
  { id: 'delete', name: 'Delete' }
];

class AccountsPage extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        nickname: PropTypes.string,
        email: PropTypes.string,
        role: PropTypes.string,
        status: PropTypes.string
      })
    ),
    paging: PropTypes.shape({
      page: PropTypes.number.isRequired,
      rowsPerPage: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired
    }).isRequired,
    error: PropTypes.shape({
      code: PropTypes.number,
      description: PropTypes.string,
      timestamp: PropTypes.string,
      path: PropTypes.string,
      messages: PropTypes.arrayOf(PropTypes.string)
    }),
    changePaging: PropTypes.func.isRequired,
    loadUsers: PropTypes.func.isRequired,
    handleBlockUser: PropTypes.func.isRequired,
    handleEditUser: PropTypes.func.isRequired,
    handleDeleteUser: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  static defaultProps = {
    isLoading: false,
    users: []
  };

  constructor(props) {
    super(props);

    this.loadUsers = props.loadUsers;
    this.handleBlockUser = props.handleBlockUser;
    this.handleEditUser = props.handleEditUser;
    this.handleDeleteUser = props.handleDeleteUser;
  }

  componentDidMount() {
    this.loadUsers();
  }

  handleChangePage = (event, page) => {
    const { paging, changePaging } = this.props;

    changePaging({
      ...paging,
      page
    });
    this.loadUsers();
  };

  handleChangeRowsPerPage = event => {
    const { paging, changePaging } = this.props;

    changePaging({
      ...paging,
      rowsPerPage: event.target.value
    });
    this.loadUsers();
  };

  render() {
    const {
      isLoading,
      classes,
      users,
      paging: { page, rowsPerPage, total },
      error
    } = this.props;

    return (
      <Paper className={classes.content}>
        <Grid container alignItems="stretch" direction="column" justify="space-between">
          <Grid item>
            <TableToolbar headLabel="All registered users">
              <IconButton aria-label="Refresh" onClick={this.loadUsers}>
                <RefreshIcon />
              </IconButton>
            </TableToolbar>
          </Grid>

          <Grid item className={classes.table}>
            {isLoading ? (
              <Loader />
            ) : (
              <Table>
                <TableHead className={classes.head}>
                  {columns.map(headColumn => (
                    <TableCell key={headColumn.id}>{headColumn.name}</TableCell>
                  ))}
                </TableHead>

                <TableBody>
                  {users.map(account => (
                    <TableRow key={account.id} className={classes.row}>
                      <TableCell>
                        <Tooltip title={account.status} enterDelay={100} placement="right">
                          {account.status === 'Active' ? (
                            <ActiveIcon className={classes.active} />
                          ) : (
                            <InactiveIcon className={classes.inactive} />
                          )}
                        </Tooltip>
                      </TableCell>
                      <TableCell>{account.firstName}</TableCell>
                      <TableCell>{account.lastName}</TableCell>
                      <TableCell>{account.nickname}</TableCell>
                      <TableCell>{account.email}</TableCell>
                      <TableCell>{account.role}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="Edit"
                          color="primary"
                          onClick={() => this.handleEditUser(account)}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="Block"
                          color="secondary"
                          disabled={account.status === 'Inactive'}
                          onClick={() => this.handleBlockUser(account)}
                        >
                          <BlockIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="Delete"
                          onClick={() => this.handleDeleteUser(account)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {users.length < rowsPerPage &&
                    new Array(rowsPerPage - users.length).fill(0).map((value, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <TableRow key={index} className={classes.row}>
                        {columns.map(() => <TableCell />)}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            )}
          </Grid>

          <AccountBlockConfirm />
          <AccountDeleteConfirm />
          <AccountEditDialog />

          <Grid item>
            <TablePagination
              component="div"
              rowsPerPageOptions={rowsPerPageOptions}
              count={total}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'Previous Page'
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page'
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              className={classes.pagination}
            />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  users: state.account.pages.admin.accounts,
  paging: state.account.pages.admin.paging,
  error: state.account.pages.admin.error,
  isLoading: state.account.pages.admin.isLoading
});

const mapDispatchToProps = dispatch => ({
  changePaging: bindActionCreators(AccountActions.changePaging, dispatch),
  loadUsers: bindActionCreators(AccountActions.loadUsers, dispatch),
  handleBlockUser: bindActionCreators(AccountActions.confirmBlockUser, dispatch),
  handleEditUser: bindActionCreators(AccountActions.openEditUserDialog, dispatch),
  handleDeleteUser: bindActionCreators(AccountActions.confirmDeleteUser, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AccountsPage));
