export const checkPermissions = (member, requiredPermissions) => {
  return member.roles.cache.some(role => requiredPermissions.includes(role.name.toLowerCase()));
};
