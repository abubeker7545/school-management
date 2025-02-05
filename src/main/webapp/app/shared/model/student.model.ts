import { IPerson } from 'app/shared/model/person.model';
import { IAttendance } from 'app/shared/model/attendance.model';
import { IGrade } from 'app/shared/model/grade.model';
import { IProgressReport } from 'app/shared/model/progress-report.model';
import { INotification } from 'app/shared/model/notification.model';
import { IMessage } from 'app/shared/model/message.model';
import { IAnalytics } from 'app/shared/model/analytics.model';
import { IRecommendation } from 'app/shared/model/recommendation.model';
import { ISchool } from 'app/shared/model/school.model';
import { ICourseEnrollment } from 'app/shared/model/course-enrollment.model';
import { ISubmission } from 'app/shared/model/submission.model';
import { ISubscriptionDSet } from 'app/shared/model/subscription-d-set.model';
import { IComment } from 'app/shared/model/comment.model';

export interface IStudent {
  id?: number;
  name?: string;
  email?: string;
  parentContact?: string | null;
  gradeLevel?: number | null;
  person?: IPerson | null;
  attendanceRecords?: IAttendance[] | null;
  grades?: IGrade[] | null;
  progressReports?: IProgressReport[] | null;
  notifications?: INotification[] | null;
  messages?: IMessage[] | null;
  analytics?: IAnalytics[] | null;
  recommendations?: IRecommendation[] | null;
  school?: ISchool | null;
  courseEnrollments?: ICourseEnrollment[] | null;
  submissions?: ISubmission[] | null;
  subscriptionDSets?: ISubscriptionDSet[] | null;
  comments?: IComment[] | null;
}

export const defaultValue: Readonly<IStudent> = {};
