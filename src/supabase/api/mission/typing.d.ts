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
  tasks: TTaskCreation[];
};
