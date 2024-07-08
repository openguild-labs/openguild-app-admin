type TError = {
  message: string;
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
