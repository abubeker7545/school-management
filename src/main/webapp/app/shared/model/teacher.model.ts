import { IPerson } from 'app/shared/model/person.model';
import { ISubject } from 'app/shared/model/subject.model';
import { ICourse } from 'app/shared/model/course.model';
import { INotification } from 'app/shared/model/notification.model';
import { IMessage } from 'app/shared/model/message.model';
import { IRecommendation } from 'app/shared/model/recommendation.model';
import { ISchool } from 'app/shared/model/school.model';
import { IFeedback } from 'app/shared/model/feedback.model';

export interface ITeacher {
  id?: number;
  name?: string;
  email?: string;
  specialization?: string | null;
  hoursPerWeek?: number | null;
  maxHoursPerWeek?: number | null;
  bio?: string | null;
  profilePicture?: string | null;
  person?: IPerson | null;
  subjects?: ISubject[] | null;
  courses?: ICourse[] | null;
  notifications?: INotification[] | null;
  messages?: IMessage[] | null;
  recommendations?: IRecommendation[] | null;
  school?: ISchool | null;
  feedbacks?: IFeedback[] | null;
}

export const defaultValue: Readonly<ITeacher> = {};
