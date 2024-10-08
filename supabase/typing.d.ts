type TError = {
  message: string;
};

type TUserModel = {
  id: number;
  email: string;
  wallet_address: string;
  first_name: string;
  last_name: string;
  is_student: boolean;
  username: string;
  github: string;
  facebook: string;
  twitter: string;
  discord: string;
};

type TMissionModel = {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  created_at: string;
  banner: string;
  mission_category_id: string;
  is_featured: string;
};

type TTaskModel = {
  id: number;
  name: string;
  type: string;
  xp: number;
  description: string;
  action: string;
  button_placeholder: string;
};

type TMissionCategoryModel = {
  id: number;
  name: string;
  description: string;
};

type TRewardModel = {
  id: number;
  name: string;
  description: string;
  quantity: number;
  type: string;
  requirements: string;
  image: string;
  is_shared: boolean;
  created_at: string;
};

type TProofsOfWorkModel = {
  id: number;
  user_id: number;
  task_id: number;
  image: string;
  proof: string;
  is_verified: boolean;
};
