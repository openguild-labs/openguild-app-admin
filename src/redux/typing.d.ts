type TUserQuery = {
  field: keyof TUserModel;
  isAsc: boolean;
  pagination: TPagination;
};

type TMissionQuery = {
  searchingTitle: string;
  status: string;
  pagination: TPagination;
};

type TPagination = {
  limit: number;
  page: number;
};

type TMissionCategoryQuery = {
  pagination: TPagination;
};
