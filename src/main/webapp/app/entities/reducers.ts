import person from 'app/entities/person/person.reducer';
import role from 'app/entities/role/role.reducer';
import userRole from 'app/entities/user-role/user-role.reducer';
import student from 'app/entities/student/student.reducer';
import teacher from 'app/entities/teacher/teacher.reducer';
import administrator from 'app/entities/administrator/administrator.reducer';
import school from 'app/entities/school/school.reducer';
import subject from 'app/entities/subject/subject.reducer';
import classroom from 'app/entities/classroom/classroom.reducer';
import classSession from 'app/entities/class-session/class-session.reducer';
import attendance from 'app/entities/attendance/attendance.reducer';
import exam from 'app/entities/exam/exam.reducer';
import grade from 'app/entities/grade/grade.reducer';
import assignment from 'app/entities/assignment/assignment.reducer';
import course from 'app/entities/course/course.reducer';
import lesson from 'app/entities/lesson/lesson.reducer';
import videoContent from 'app/entities/video-content/video-content.reducer';
import article from 'app/entities/article/article.reducer';
import resource from 'app/entities/resource/resource.reducer';
import liveSession from 'app/entities/live-session/live-session.reducer';
import discussion from 'app/entities/discussion/discussion.reducer';
import comment from 'app/entities/comment/comment.reducer';
import quiz from 'app/entities/quiz/quiz.reducer';
import question from 'app/entities/question/question.reducer';
import submission from 'app/entities/submission/submission.reducer';
import courseEnrollment from 'app/entities/course-enrollment/course-enrollment.reducer';
import feedback from 'app/entities/feedback/feedback.reducer';
import certification from 'app/entities/certification/certification.reducer';
import announcement from 'app/entities/announcement/announcement.reducer';
import branch from 'app/entities/branch/branch.reducer';
import administrativeBoard from 'app/entities/administrative-board/administrative-board.reducer';
import boardMember from 'app/entities/board-member/board-member.reducer';
import roleAssignment from 'app/entities/role-assignment/role-assignment.reducer';
import payment from 'app/entities/payment/payment.reducer';
import invoice from 'app/entities/invoice/invoice.reducer';
import subscriptionPlan from 'app/entities/subscription-plan/subscription-plan.reducer';
import subscriptionDSet from 'app/entities/subscription-d-set/subscription-d-set.reducer';
import notification from 'app/entities/notification/notification.reducer';
import message from 'app/entities/message/message.reducer';
import progressReport from 'app/entities/progress-report/progress-report.reducer';
import recommendation from 'app/entities/recommendation/recommendation.reducer';
import analytics from 'app/entities/analytics/analytics.reducer';
import learningMaterial from 'app/entities/learning-material/learning-material.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  person,
  role,
  userRole,
  student,
  teacher,
  administrator,
  school,
  subject,
  classroom,
  classSession,
  attendance,
  exam,
  grade,
  assignment,
  course,
  lesson,
  videoContent,
  article,
  resource,
  liveSession,
  discussion,
  comment,
  quiz,
  question,
  submission,
  courseEnrollment,
  feedback,
  certification,
  announcement,
  branch,
  administrativeBoard,
  boardMember,
  roleAssignment,
  payment,
  invoice,
  subscriptionPlan,
  subscriptionDSet,
  notification,
  message,
  progressReport,
  recommendation,
  analytics,
  learningMaterial,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
