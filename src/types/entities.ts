export type UserEntityContext = {
  user: UserEntity | undefined;
  setUser: (user: any) => void;
  permissions: string[];
};

export type UserEntity = {
  id: string;
  name: string;
  email: string;
};

export type MenuItemEntity = {
    name: string;
    icon: any;
    discountedPrice: number;
    normalPrice: number;
    isDailyMenu: boolean;
    servingSize: string;
}
