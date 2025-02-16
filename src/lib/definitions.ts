export type Studyroom = {
  studyrooms: StudyroomDetail[];
};

export type StudyroomDetail = {
  id: number;
  name: string;
  location: string;
  minUsers: number;
  maxUsers: number;
  isCinema: boolean;
  operatingHours: string;
  tags: any[];
  isActive: boolean;
  lastUpdatedAt: string;
};
