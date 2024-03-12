import { Container } from "./responses";
export type UserEntityContext = {
  user: UserEntity | undefined;
  setUser: (user: any) => void;
  permissions: string[];
  isAdminMode: boolean;
  setIsAdminMode: (isAdminMode: boolean) => void;
  selectedScreen: string;
  setSelectedScreen: (screen: string) => void;
};

export type UserEntity = {
  id: string;
  name: string;
  email: string;
};

export type Address = {
  id: number;
  value: string;
  isCurrent: boolean;
};

export type UserEntityData = {
  id: string;
  phoneNumber: string;
  addresses: Address[];
};

export type MenuItemViewEntity = {
  name: string;
  discountedPrice: number;
  normalPrice: number;
  isDailyMenu: boolean;
  servingSize: string;
  photoUrl: string;
  type: string;
};

export type MenuItemEntity = {
  containers: string[];
  name: string;
  servingSize: string;
  discountedPrice: number;
  normalPrice: number;
  photoUrl: string | null;
  type: string | null;
  recurringDays: string[];
  firstPossibleDay: string;
  lastPossibleDay: string;
};

export type CartStorage = {
  data: CartItemEntity[];
  updatedAt: string;
};

export type CartItemEntity = {
  item: MenuItemViewEntity;
  quantity: number;
};

export type ContainerEntity = {
  name: string;
  price: number;
};

export type OrderItem = {
  productId: string;
  quantity: number;
};

export type OrderCreateEntity = {
  items: OrderItem[];
  comment: string | null;
  discountIds: string[];
  wantSilverware: boolean;
  byCard: boolean;
};
