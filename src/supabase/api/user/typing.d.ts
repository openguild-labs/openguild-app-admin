type TUserCreation = {
  email?: string;
  wallet_address: string;
  first_name?: string;
  last_name?: string;
};

type TUserUpdate = {
  email?: string;
  first_name?: string;
  last_name?: string;
};

type TUserModel = {
  id: number;
  email: string;
  wallet_address: string;
  first_name: string;
  last_name: string;
  is_student: boolean;
  username: string;
  telegram: string;
  facebook: string;
  twitter: string;
  discord: string;
};

type TUserListResponse = {
  list: TUserModel[];
  total: number;
};

type TRewardModel = {
  id: number;
  name: string;
  description: string;
  quantity: number;
  type: string;
  requirements: string;
  image: string;
};
