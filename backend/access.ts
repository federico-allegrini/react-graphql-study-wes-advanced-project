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

// Rule based function
// Rules can return a boolean - yes or no - or a filter which limits which products they can CRUD
export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    // 1. Are they signedIn?
    if (!isSignedIn({ session })) {
      return false;
    }

    // 2. Do they have the permission of canManageProducts?
    if (permissions.canManageProducts({ session })) {
      return true;
    }

    // 3. If not, do they own this item?
    return { user: { id: session.itemId } };
  },
  canOrder({ session }: ListAccessArgs) {
    // 1. Are they signedIn?
    if (!isSignedIn({ session })) {
      return false;
    }

    // 2. Do they have the permission of canManageCart?
    if (permissions.canManageCart({ session })) {
      return true;
    }

    // 3. If not, do they own this item?
    return { user: { id: session.itemId } };
  },
  canManageOrderItems({ session }: ListAccessArgs) {
    // 1. Are they signedIn?
    if (!isSignedIn({ session })) {
      return false;
    }

    // 2. Do they have the permission of canManageCart?
    if (permissions.canManageCart({ session })) {
      return true;
    }

    // 3. If not, do they own this item?
    return { order: { user: { id: session.itemId } } };
  },
  canReadProducts({ session }: ListAccessArgs) {
    // 1. Are they signedIn?
    if (!isSignedIn({ session })) {
      return false;
    }

    // 2. Do they have the permission of canManageProducts?
    if (permissions.canManageProducts({ session })) {
      return true; // They can read everything!
    }

    // They should be only see available products (based on the status field)
    return { status: 'AVAILABLE' };
  },
  canManageUsers({ session }: ListAccessArgs) {
    // 1. Are they signedIn?
    if (!isSignedIn({ session })) {
      return false;
    }

    // 2. Do they have the permission of canManageUsers?
    if (permissions.canManageUsers({ session })) {
      return true;
    }

    // 3. Otherwise they may only update themselves!
    return { id: session.itemId };
  },
};
