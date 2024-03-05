export type UserResponse = {
  id: string;
  name: string;
  email: string;
};

export type UserPermissionsResponse = {
  permissions: string[];
};

export type DailyMenu = {
  description: string;
};

export type NormalItem = {
  name: string;
  servingSize: string;
  discountedPrice: number;
  normalPrice: number;
};

export type MenuItemsResponse = {
  menu: DailyMenu[];
  normalItems: NormalItem[];
};
