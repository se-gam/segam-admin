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
export type Notice = {
  id: number;
  title: string;
  content: string;
  isPopup: boolean;
  createdAt: string;
  deletedAt: string | null;
};

export type NoticeSummary = Omit<Notice, 'content' | 'isPopup' | 'deletedAt'>;

export type Crawler = {
  isRunning: boolean;
  cronTime: string;
  lastFiredAt: string;
};
