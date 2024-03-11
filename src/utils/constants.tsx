export const SCREENS = {
  HOME: "home",
  PROFILE: "profile",
  ORDERS: "orders",
  CART: "cart",
  CARD: "card",
};

export const COLORS = {
  TEXT_COLOR: "#333446",
  PRIMARY_COLOR: "#2E3192",
};

export const WEEK_DAYS = {
  MONDAY: "Luni",
  TUESDAY: "Marti",
  WEDNESDAY: "Miercuri",
  THURSDAY: "Joi",
  FRIDAY: "Vineri",
};
export const FILTER_OPTIONS = {
  DAILY_MENU: "Meniul zilei",
  SOUP: "Supe si ciorbe",
  MAIN_COURSE: "Fel principal",
  GARNISH: "Garnituri",
  DESSERT: "Desert",
  EXTRA: "Extra",
};

function getKeyByValue<T extends Record<string, string>>(
  object: T,
  value: T[keyof T]
): keyof T | undefined {
  return Object.keys(object).find((key) => object[key] === value) as keyof T;
}

export const getFilterOptionByValue = (value: string | null): string | null => {
  if (!value) return null;
  return getKeyByValue(FILTER_OPTIONS, value) as string;
};

export const getValueFromKey = (key: string | null): string | null => {
  if (!key) return null;
  return FILTER_OPTIONS[key as keyof typeof FILTER_OPTIONS] ?? null;
};

export const DEFAULT_IMAGE_URL =
  "https://www.freeiconspng.com/thumbs/fast-food-png/fast-food-png-most-popular-fast-food-snacks-in-your-area-and-most--3.png";
