import { MenuItemEntity, MenuItemViewEntity } from "./entities";

export type UserResponse = {
  id: string;
  name: string;
  email: string;
};

export type UserPermissionsResponse = {
  permissions: string[];
};

export type MenuItemResponse = {
  menuItem: MenuItemEntity;
  possibleContainers: string[];
};


export type MenuItemsResponse = {
  items: MenuItemViewEntity[];
};
