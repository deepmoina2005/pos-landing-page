const legacyRoleMap = {
  ADMIN: "STORE_ADMIN",
  STORE_MANAGER: "STORE_ADMIN",
  BRANCH_CASHIER: "CASHIER",
};

export const normalizeRole = (role) => {
  const value = String(role || "").toUpperCase();
  return legacyRoleMap[value] || value;
};

export const userRoles = ["STORE_ADMIN", "BRANCH_MANAGER", "CASHIER"];

export const storeAdminRole = ["BRANCH_MANAGER", "CASHIER"];

export const branchAdminRole = ["CASHIER"];
