import { ICourse } from 'app/shared/model/course.model';

export interface ILiveSession {
  id?: number;
  sessionTitle?: string;
  sessionDate?: string;
  duration?: number;
  meetingLink?: string;
  course?: ICourse | null;
}

export const defaultValue: Readonly<ILiveSession> = {};
