import * as AdminListActions from './pages/admin/actions';
import * as AdminBlockActions from './pages/admin/modals/block/actions';
import * as AdminEditActions from './pages/admin/modals/edit/actions';
import * as AdminDeleteActions from './pages/admin/modals/delete/actions';

const AccountActions = {
  ...AdminListActions,
  ...AdminBlockActions,
  ...AdminEditActions,
  ...AdminDeleteActions
};

export default AccountActions;
