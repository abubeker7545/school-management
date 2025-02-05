import { ILesson } from 'app/shared/model/lesson.model';
import { ILiveSession } from 'app/shared/model/live-session.model';
import { ICourseEnrollment } from 'app/shared/model/course-enrollment.model';
import { ICertification } from 'app/shared/model/certification.model';
import { IAnnouncement } from 'app/shared/model/announcement.model';
import { ITeacher } from 'app/shared/model/teacher.model';
import { IFeedback } from 'app/shared/model/feedback.model';

export interface ICourse {
  id?: number;
  title?: string;
  description?: string | null;
  creationDate?: string;
  duration?: number | null;
  lessons?: ILesson[] | null;
  liveSessions?: ILiveSession[] | null;
  enrollments?: ICourseEnrollment[] | null;
  certifications?: ICertification[] | null;
  announcements?: IAnnouncement[] | null;
  teacher?: ITeacher | null;
  feedbacks?: IFeedback[] | null;
}

export const defaultValue: Readonly<ICourse> = {};
