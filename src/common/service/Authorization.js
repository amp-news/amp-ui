export const isAdminOrMentor = security =>
  security &&
  security.authenticated &&
  security.user &&
  (security.user.role === 'ROLE_ADMIN' || security.user.role === 'ROLE_MENTOR');

export const isRoleOrAdmin = (security, role, userId) =>
  security &&
  security.authenticated &&
  security.user &&
  (security.user.role === 'ROLE_ADMIN' ||
    (security.user.role === role && (userId ? security.user.id === Number(userId) : true)));
