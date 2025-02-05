import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Person from './person';
import Role from './role';
import UserRole from './user-role';
import Student from './student';
import Teacher from './teacher';
import Administrator from './administrator';
import School from './school';
import Subject from './subject';
import Classroom from './classroom';
import ClassSession from './class-session';
import Attendance from './attendance';
import Exam from './exam';
import Grade from './grade';
import Assignment from './assignment';
import Course from './course';
import Lesson from './lesson';
import VideoContent from './video-content';
import Article from './article';
import Resource from './resource';
import LiveSession from './live-session';
import Discussion from './discussion';
import Comment from './comment';
import Quiz from './quiz';
import Question from './question';
import Submission from './submission';
import CourseEnrollment from './course-enrollment';
import Feedback from './feedback';
import Certification from './certification';
import Announcement from './announcement';
import Branch from './branch';
import AdministrativeBoard from './administrative-board';
import BoardMember from './board-member';
import RoleAssignment from './role-assignment';
import Payment from './payment';
import Invoice from './invoice';
import SubscriptionPlan from './subscription-plan';
import SubscriptionDSet from './subscription-d-set';
import Notification from './notification';
import Message from './message';
import ProgressReport from './progress-report';
import Recommendation from './recommendation';
import Analytics from './analytics';
import LearningMaterial from './learning-material';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default ({ match }) => {
  return (
    <div>
      <Switch>
        {/* prettier-ignore */}
        <ErrorBoundaryRoute path={`${match.url}person`} component={Person} />
        <ErrorBoundaryRoute path={`${match.url}role`} component={Role} />
        <ErrorBoundaryRoute path={`${match.url}user-role`} component={UserRole} />
        <ErrorBoundaryRoute path={`${match.url}student`} component={Student} />
        <ErrorBoundaryRoute path={`${match.url}teacher`} component={Teacher} />
        <ErrorBoundaryRoute path={`${match.url}administrator`} component={Administrator} />
        <ErrorBoundaryRoute path={`${match.url}school`} component={School} />
        <ErrorBoundaryRoute path={`${match.url}subject`} component={Subject} />
        <ErrorBoundaryRoute path={`${match.url}classroom`} component={Classroom} />
        <ErrorBoundaryRoute path={`${match.url}class-session`} component={ClassSession} />
        <ErrorBoundaryRoute path={`${match.url}attendance`} component={Attendance} />
        <ErrorBoundaryRoute path={`${match.url}exam`} component={Exam} />
        <ErrorBoundaryRoute path={`${match.url}grade`} component={Grade} />
        <ErrorBoundaryRoute path={`${match.url}assignment`} component={Assignment} />
        <ErrorBoundaryRoute path={`${match.url}course`} component={Course} />
        <ErrorBoundaryRoute path={`${match.url}lesson`} component={Lesson} />
        <ErrorBoundaryRoute path={`${match.url}video-content`} component={VideoContent} />
        <ErrorBoundaryRoute path={`${match.url}article`} component={Article} />
        <ErrorBoundaryRoute path={`${match.url}resource`} component={Resource} />
        <ErrorBoundaryRoute path={`${match.url}live-session`} component={LiveSession} />
        <ErrorBoundaryRoute path={`${match.url}discussion`} component={Discussion} />
        <ErrorBoundaryRoute path={`${match.url}comment`} component={Comment} />
        <ErrorBoundaryRoute path={`${match.url}quiz`} component={Quiz} />
        <ErrorBoundaryRoute path={`${match.url}question`} component={Question} />
        <ErrorBoundaryRoute path={`${match.url}submission`} component={Submission} />
        <ErrorBoundaryRoute path={`${match.url}course-enrollment`} component={CourseEnrollment} />
        <ErrorBoundaryRoute path={`${match.url}feedback`} component={Feedback} />
        <ErrorBoundaryRoute path={`${match.url}certification`} component={Certification} />
        <ErrorBoundaryRoute path={`${match.url}announcement`} component={Announcement} />
        <ErrorBoundaryRoute path={`${match.url}branch`} component={Branch} />
        <ErrorBoundaryRoute path={`${match.url}administrative-board`} component={AdministrativeBoard} />
        <ErrorBoundaryRoute path={`${match.url}board-member`} component={BoardMember} />
        <ErrorBoundaryRoute path={`${match.url}role-assignment`} component={RoleAssignment} />
        <ErrorBoundaryRoute path={`${match.url}payment`} component={Payment} />
        <ErrorBoundaryRoute path={`${match.url}invoice`} component={Invoice} />
        <ErrorBoundaryRoute path={`${match.url}subscription-plan`} component={SubscriptionPlan} />
        <ErrorBoundaryRoute path={`${match.url}subscription-d-set`} component={SubscriptionDSet} />
        <ErrorBoundaryRoute path={`${match.url}notification`} component={Notification} />
        <ErrorBoundaryRoute path={`${match.url}message`} component={Message} />
        <ErrorBoundaryRoute path={`${match.url}progress-report`} component={ProgressReport} />
        <ErrorBoundaryRoute path={`${match.url}recommendation`} component={Recommendation} />
        <ErrorBoundaryRoute path={`${match.url}analytics`} component={Analytics} />
        <ErrorBoundaryRoute path={`${match.url}learning-material`} component={LearningMaterial} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </Switch>
    </div>
  );
};
