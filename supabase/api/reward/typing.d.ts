type TRewardCreation<TBanner> = {
  image: TBanner;
  name: string;
  description: string;
  quantity: number;
  type: string;
  requirements: string;
};

type TRewardDetailResponse = TRewardModel & {
  image_url: string;
  missions: TMissionModel[];
};

type TRewardUpdateMap = {
  key: keyof TRewardModel;
  value: string | number;
};

type TRewardUpdate = {
  rewardID: string;
  updates: TRewardUpdateMap[];
};

type TUpdateImage = {
  rewardID: string;
  oldImage: string;
  file: UploadFile;
};
