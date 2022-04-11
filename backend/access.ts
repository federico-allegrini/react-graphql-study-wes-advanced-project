import { ListAccessArgs } from './types';
import { permissionsList } from './schemas/field';
// At it's simplest, the access control returns a yes or no value depending on the users session

export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
);

// Permissions check if someone meets a criteria - yes or no.
export const permissions = {
  ...generatedPermissions,
  // Example for add other permsission function
  isAwesome({ session }: ListAccessArgs): boolean {
    return session?.data.name.includes('wes');
  },
};
