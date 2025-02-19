export type Notice = {
  id: number;
  title: string;
  content: string;
  isPopup: boolean;
  createdAt: string;
  deletedAt: string | null;
}

export type NoticeSummary = Omit<Notice, 'content' | 'isPopup' | 'deletedAt'>;