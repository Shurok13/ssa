export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type DataType = {
  token: string;
  products: Array<{
    article: string;
    price: string;
    price_old: string;
    discount: string;
    warehouse: string;
    quantity: number;
    name: string;
  }>;
}
