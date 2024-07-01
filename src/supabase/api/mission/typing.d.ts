type TTaskCreation = {
  name: string;
  type: string;
  action: string;
  description: string;
};

type TMissionCreation<TBanner> = {
  banner: TBanner;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  mission_category_id: string;
  tasks: TTaskCreation[];
};

type TMissionResponse = {
  id: number;
  title: string;
  status: string;
  participants: number;
  created_at: string;
};

type TMissionListResponse = {
  list: TMissionResponse[];
  total: number;
};

type TMissionDetailResponse = TMissionModel & {
  banner_url: string;
  mission_category: TMissionCategoryModel;
  tasks: TTaskModel[];
};

type TMissionUpdateMap = {
  key: keyof TMissionModel;
  value: string | number;
};

type TMissionUpdate = {
  missionID: string;
  updates: TMissionUpdateMap[];
};

type TUpdateBanner = {
  missionID: string;
  oldBanner: string;
  file: UploadFile;
};

type TParticipantQuantityResponse = {
  mission_id: number;
  quantity: number;
};
