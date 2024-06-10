type TUserFilter = {
  field: keyof TUserModel;
  isAsc: boolean;
  pagination: TPagination;
};

type TPagination = {
  limit: number;
  page: number;
};
