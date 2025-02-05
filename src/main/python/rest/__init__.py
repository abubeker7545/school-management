from .PublicUserResource import public_user_list_ns
from .AuthorityResource import authority_list_ns
from .UserSessionController import session_authentication_ns
from .AccountResource import account_register_ns, account_authenticate_ns, account_ns, \
    account_activate_ns, passwd_reset_init_ns, passwd_reset_finish_ns, change_passwd_ns
from .UserResource import user_list_ns
from .LogoutResource import logout_ns
from .AppManagment import app_management_ns
from .PersonResource import people_list_ns
from .RoleResource import roles_list_ns
from .UserRoleResource import user_roles_list_ns
from .StudentResource import students_list_ns
from .TeacherResource import teachers_list_ns
from .AdministratorResource import administrators_list_ns
from .SchoolResource import schools_list_ns
from .SubjectResource import subjects_list_ns
from .ClassroomResource import classrooms_list_ns
from .ClassSessionResource import class_sessions_list_ns
from .AttendanceResource import attendances_list_ns
from .ExamResource import exams_list_ns
from .GradeResource import grades_list_ns
from .AssignmentResource import assignments_list_ns
from .CourseResource import courses_list_ns
from .LessonResource import lessons_list_ns
from .VideoContentResource import video_contents_list_ns
from .ArticleResource import articles_list_ns
from .ResourceResource import resources_list_ns
from .LiveSessionResource import live_sessions_list_ns
from .DiscussionResource import discussions_list_ns
from .CommentResource import comments_list_ns
from .QuizResource import quizzes_list_ns
from .QuestionResource import questions_list_ns
from .SubmissionResource import submissions_list_ns
from .CourseEnrollmentResource import course_enrollments_list_ns
from .FeedbackResource import feedbacks_list_ns
from .CertificationResource import certifications_list_ns
from .AnnouncementResource import announcements_list_ns
from .BranchResource import branches_list_ns
from .AdministrativeBoardResource import administrative_boards_list_ns
from .BoardMemberResource import board_members_list_ns
from .RoleAssignmentResource import role_assignments_list_ns
from .PaymentResource import payments_list_ns
from .InvoiceResource import invoices_list_ns
from .SubscriptionPlanResource import subscription_plans_list_ns
from .SubscriptionDSetResource import subscription_d_sets_list_ns
from .NotificationResource import notifications_list_ns
from .MessageResource import messages_list_ns
from .ProgressReportResource import progress_reports_list_ns
from .RecommendationResource import recommendations_list_ns
from .AnalyticsResource import analytics_list_ns
from .LearningMaterialResource import learning_materials_list_ns
# pyhipster-needle-rest-api-list-add-entry-import

def add_api_namespace(api):
    # Registering the namespaces
    api.add_namespace(public_user_list_ns)
    api.add_namespace(authority_list_ns)
    api.add_namespace(session_authentication_ns)
    api.add_namespace(logout_ns)
    api.add_namespace(account_register_ns)
    api.add_namespace(account_authenticate_ns)
    api.add_namespace(account_ns)
    api.add_namespace(account_activate_ns)
    api.add_namespace(passwd_reset_init_ns)
    api.add_namespace(passwd_reset_finish_ns)
    api.add_namespace(change_passwd_ns)
    api.add_namespace(user_list_ns)
    api.add_namespace(app_management_ns)
    api.add_namespace(people_list_ns)
    api.add_namespace(roles_list_ns)
    api.add_namespace(user_roles_list_ns)
    api.add_namespace(students_list_ns)
    api.add_namespace(teachers_list_ns)
    api.add_namespace(administrators_list_ns)
    api.add_namespace(schools_list_ns)
    api.add_namespace(subjects_list_ns)
    api.add_namespace(classrooms_list_ns)
    api.add_namespace(class_sessions_list_ns)
    api.add_namespace(attendances_list_ns)
    api.add_namespace(exams_list_ns)
    api.add_namespace(grades_list_ns)
    api.add_namespace(assignments_list_ns)
    api.add_namespace(courses_list_ns)
    api.add_namespace(lessons_list_ns)
    api.add_namespace(video_contents_list_ns)
    api.add_namespace(articles_list_ns)
    api.add_namespace(resources_list_ns)
    api.add_namespace(live_sessions_list_ns)
    api.add_namespace(discussions_list_ns)
    api.add_namespace(comments_list_ns)
    api.add_namespace(quizzes_list_ns)
    api.add_namespace(questions_list_ns)
    api.add_namespace(submissions_list_ns)
    api.add_namespace(course_enrollments_list_ns)
    api.add_namespace(feedbacks_list_ns)
    api.add_namespace(certifications_list_ns)
    api.add_namespace(announcements_list_ns)
    api.add_namespace(branches_list_ns)
    api.add_namespace(administrative_boards_list_ns)
    api.add_namespace(board_members_list_ns)
    api.add_namespace(role_assignments_list_ns)
    api.add_namespace(payments_list_ns)
    api.add_namespace(invoices_list_ns)
    api.add_namespace(subscription_plans_list_ns)
    api.add_namespace(subscription_d_sets_list_ns)
    api.add_namespace(notifications_list_ns)
    api.add_namespace(messages_list_ns)
    api.add_namespace(progress_reports_list_ns)
    api.add_namespace(recommendations_list_ns)
    api.add_namespace(analytics_list_ns)
    api.add_namespace(learning_materials_list_ns)
    # pyhipster-needle-rest-api-list-add-namespaces

    # Adding resources to added namespaces
    public_user_list_ns.add_resource(PublicUserResource.PublicUserResourceList, "")
    authority_list_ns.add_resource(AuthorityResource.AuthorityResourceList, "")
    session_authentication_ns.add_resource(UserSessionController.UserSessionResource, "")
    logout_ns.add_resource(LogoutResource.LogoutResource, "")
    account_register_ns.add_resource(AccountResource.ManagedUserAccountRegister, "")
    account_authenticate_ns.add_resource(AccountResource.AccountAuthenticate, "")
    account_ns.add_resource(AccountResource.AdminAccountDetails, "")
    account_activate_ns.add_resource(AccountResource.AccountActivate, "")
    passwd_reset_init_ns.add_resource(AccountResource.AccountPasswordResetInit, "")
    passwd_reset_finish_ns.add_resource(AccountResource.AccountPasswordResetFinish, "")
    change_passwd_ns.add_resource(AccountResource.AccountChangePassword, "")
    user_list_ns.add_resource(UserResource.UserResource, "/<string:login>")
    user_list_ns.add_resource(UserResource.UserResourceList, "")
    app_management_ns.add_resource(AppManagment.AppManagementInfoResource, "/info")
    app_management_ns.add_resource(AppManagment.AppManagementEnvironmentResource, "/env")
    app_management_ns.add_resource(AppManagment.AppManagementConfigurationResource, "/configprops")
    app_management_ns.add_resource(AppManagment.AppManagementOpenAPIResource, "/jhiopenapigroups")
    # pyhipster-needle-rest-api-list-add-resource
    # pyhipster-needle-rest-api-list-add-resource-list
    people_list_ns.add_resource(PersonResource.PersonResourceList, "")
    people_list_ns.add_resource(PersonResource.PersonResourceListCount, "/count")
    people_list_ns.add_resource(PersonResource.PersonResource, "/<int:id>")
    roles_list_ns.add_resource(RoleResource.RoleResourceList, "")
    roles_list_ns.add_resource(RoleResource.RoleResourceListCount, "/count")
    roles_list_ns.add_resource(RoleResource.RoleResource, "/<int:id>")
    user_roles_list_ns.add_resource(UserRoleResource.UserRoleResourceList, "")
    user_roles_list_ns.add_resource(UserRoleResource.UserRoleResourceListCount, "/count")
    user_roles_list_ns.add_resource(UserRoleResource.UserRoleResource, "/<int:id>")
    students_list_ns.add_resource(StudentResource.StudentResourceList, "")
    students_list_ns.add_resource(StudentResource.StudentResourceListCount, "/count")
    students_list_ns.add_resource(StudentResource.StudentResource, "/<int:id>")
    teachers_list_ns.add_resource(TeacherResource.TeacherResourceList, "")
    teachers_list_ns.add_resource(TeacherResource.TeacherResourceListCount, "/count")
    teachers_list_ns.add_resource(TeacherResource.TeacherResource, "/<int:id>")
    administrators_list_ns.add_resource(AdministratorResource.AdministratorResourceList, "")
    administrators_list_ns.add_resource(AdministratorResource.AdministratorResourceListCount, "/count")
    administrators_list_ns.add_resource(AdministratorResource.AdministratorResource, "/<int:id>")
    schools_list_ns.add_resource(SchoolResource.SchoolResourceList, "")
    schools_list_ns.add_resource(SchoolResource.SchoolResourceListCount, "/count")
    schools_list_ns.add_resource(SchoolResource.SchoolResource, "/<int:id>")
    subjects_list_ns.add_resource(SubjectResource.SubjectResourceList, "")
    subjects_list_ns.add_resource(SubjectResource.SubjectResourceListCount, "/count")
    subjects_list_ns.add_resource(SubjectResource.SubjectResource, "/<int:id>")
    classrooms_list_ns.add_resource(ClassroomResource.ClassroomResourceList, "")
    classrooms_list_ns.add_resource(ClassroomResource.ClassroomResourceListCount, "/count")
    classrooms_list_ns.add_resource(ClassroomResource.ClassroomResource, "/<int:id>")
    class_sessions_list_ns.add_resource(ClassSessionResource.ClassSessionResourceList, "")
    class_sessions_list_ns.add_resource(ClassSessionResource.ClassSessionResourceListCount, "/count")
    class_sessions_list_ns.add_resource(ClassSessionResource.ClassSessionResource, "/<int:id>")
    attendances_list_ns.add_resource(AttendanceResource.AttendanceResourceList, "")
    attendances_list_ns.add_resource(AttendanceResource.AttendanceResourceListCount, "/count")
    attendances_list_ns.add_resource(AttendanceResource.AttendanceResource, "/<int:id>")
    exams_list_ns.add_resource(ExamResource.ExamResourceList, "")
    exams_list_ns.add_resource(ExamResource.ExamResourceListCount, "/count")
    exams_list_ns.add_resource(ExamResource.ExamResource, "/<int:id>")
    grades_list_ns.add_resource(GradeResource.GradeResourceList, "")
    grades_list_ns.add_resource(GradeResource.GradeResourceListCount, "/count")
    grades_list_ns.add_resource(GradeResource.GradeResource, "/<int:id>")
    assignments_list_ns.add_resource(AssignmentResource.AssignmentResourceList, "")
    assignments_list_ns.add_resource(AssignmentResource.AssignmentResourceListCount, "/count")
    assignments_list_ns.add_resource(AssignmentResource.AssignmentResource, "/<int:id>")
    courses_list_ns.add_resource(CourseResource.CourseResourceList, "")
    courses_list_ns.add_resource(CourseResource.CourseResourceListCount, "/count")
    courses_list_ns.add_resource(CourseResource.CourseResource, "/<int:id>")
    lessons_list_ns.add_resource(LessonResource.LessonResourceList, "")
    lessons_list_ns.add_resource(LessonResource.LessonResourceListCount, "/count")
    lessons_list_ns.add_resource(LessonResource.LessonResource, "/<int:id>")
    video_contents_list_ns.add_resource(VideoContentResource.VideoContentResourceList, "")
    video_contents_list_ns.add_resource(VideoContentResource.VideoContentResourceListCount, "/count")
    video_contents_list_ns.add_resource(VideoContentResource.VideoContentResource, "/<int:id>")
    articles_list_ns.add_resource(ArticleResource.ArticleResourceList, "")
    articles_list_ns.add_resource(ArticleResource.ArticleResourceListCount, "/count")
    articles_list_ns.add_resource(ArticleResource.ArticleResource, "/<int:id>")
    # resources_list_ns.add_resource(ResourceResource.ResourceResourceList, "")
    # resources_list_ns.add_resource(ResourceResource.ResourceResourceListCount, "/count")
    # resources_list_ns.add_resource(ResourceResource.ResourceResource, "/<int:id>")
    live_sessions_list_ns.add_resource(LiveSessionResource.LiveSessionResourceList, "")
    live_sessions_list_ns.add_resource(LiveSessionResource.LiveSessionResourceListCount, "/count")
    live_sessions_list_ns.add_resource(LiveSessionResource.LiveSessionResource, "/<int:id>")
    discussions_list_ns.add_resource(DiscussionResource.DiscussionResourceList, "")
    discussions_list_ns.add_resource(DiscussionResource.DiscussionResourceListCount, "/count")
    discussions_list_ns.add_resource(DiscussionResource.DiscussionResource, "/<int:id>")
    comments_list_ns.add_resource(CommentResource.CommentResourceList, "")
    comments_list_ns.add_resource(CommentResource.CommentResourceListCount, "/count")
    comments_list_ns.add_resource(CommentResource.CommentResource, "/<int:id>")
    quizzes_list_ns.add_resource(QuizResource.QuizResourceList, "")
    quizzes_list_ns.add_resource(QuizResource.QuizResourceListCount, "/count")
    quizzes_list_ns.add_resource(QuizResource.QuizResource, "/<int:id>")
    questions_list_ns.add_resource(QuestionResource.QuestionResourceList, "")
    questions_list_ns.add_resource(QuestionResource.QuestionResourceListCount, "/count")
    questions_list_ns.add_resource(QuestionResource.QuestionResource, "/<int:id>")
    submissions_list_ns.add_resource(SubmissionResource.SubmissionResourceList, "")
    submissions_list_ns.add_resource(SubmissionResource.SubmissionResourceListCount, "/count")
    submissions_list_ns.add_resource(SubmissionResource.SubmissionResource, "/<int:id>")
    course_enrollments_list_ns.add_resource(CourseEnrollmentResource.CourseEnrollmentResourceList, "")
    course_enrollments_list_ns.add_resource(CourseEnrollmentResource.CourseEnrollmentResourceListCount, "/count")
    course_enrollments_list_ns.add_resource(CourseEnrollmentResource.CourseEnrollmentResource, "/<int:id>")
    feedbacks_list_ns.add_resource(FeedbackResource.FeedbackResourceList, "")
    feedbacks_list_ns.add_resource(FeedbackResource.FeedbackResourceListCount, "/count")
    feedbacks_list_ns.add_resource(FeedbackResource.FeedbackResource, "/<int:id>")
    certifications_list_ns.add_resource(CertificationResource.CertificationResourceList, "")
    certifications_list_ns.add_resource(CertificationResource.CertificationResourceListCount, "/count")
    certifications_list_ns.add_resource(CertificationResource.CertificationResource, "/<int:id>")
    announcements_list_ns.add_resource(AnnouncementResource.AnnouncementResourceList, "")
    announcements_list_ns.add_resource(AnnouncementResource.AnnouncementResourceListCount, "/count")
    announcements_list_ns.add_resource(AnnouncementResource.AnnouncementResource, "/<int:id>")
    branches_list_ns.add_resource(BranchResource.BranchResourceList, "")
    branches_list_ns.add_resource(BranchResource.BranchResourceListCount, "/count")
    branches_list_ns.add_resource(BranchResource.BranchResource, "/<int:id>")
    administrative_boards_list_ns.add_resource(AdministrativeBoardResource.AdministrativeBoardResourceList, "")
    administrative_boards_list_ns.add_resource(AdministrativeBoardResource.AdministrativeBoardResourceListCount, "/count")
    administrative_boards_list_ns.add_resource(AdministrativeBoardResource.AdministrativeBoardResource, "/<int:id>")
    board_members_list_ns.add_resource(BoardMemberResource.BoardMemberResourceList, "")
    board_members_list_ns.add_resource(BoardMemberResource.BoardMemberResourceListCount, "/count")
    board_members_list_ns.add_resource(BoardMemberResource.BoardMemberResource, "/<int:id>")
    role_assignments_list_ns.add_resource(RoleAssignmentResource.RoleAssignmentResourceList, "")
    role_assignments_list_ns.add_resource(RoleAssignmentResource.RoleAssignmentResourceListCount, "/count")
    role_assignments_list_ns.add_resource(RoleAssignmentResource.RoleAssignmentResource, "/<int:id>")
    payments_list_ns.add_resource(PaymentResource.PaymentResourceList, "")
    payments_list_ns.add_resource(PaymentResource.PaymentResourceListCount, "/count")
    payments_list_ns.add_resource(PaymentResource.PaymentResource, "/<int:id>")
    invoices_list_ns.add_resource(InvoiceResource.InvoiceResourceList, "")
    invoices_list_ns.add_resource(InvoiceResource.InvoiceResourceListCount, "/count")
    invoices_list_ns.add_resource(InvoiceResource.InvoiceResource, "/<int:id>")
    subscription_plans_list_ns.add_resource(SubscriptionPlanResource.SubscriptionPlanResourceList, "")
    subscription_plans_list_ns.add_resource(SubscriptionPlanResource.SubscriptionPlanResourceListCount, "/count")
    subscription_plans_list_ns.add_resource(SubscriptionPlanResource.SubscriptionPlanResource, "/<int:id>")
    subscription_d_sets_list_ns.add_resource(SubscriptionDSetResource.SubscriptionDSetResourceList, "")
    subscription_d_sets_list_ns.add_resource(SubscriptionDSetResource.SubscriptionDSetResourceListCount, "/count")
    subscription_d_sets_list_ns.add_resource(SubscriptionDSetResource.SubscriptionDSetResource, "/<int:id>")
    notifications_list_ns.add_resource(NotificationResource.NotificationResourceList, "")
    notifications_list_ns.add_resource(NotificationResource.NotificationResourceListCount, "/count")
    notifications_list_ns.add_resource(NotificationResource.NotificationResource, "/<int:id>")
    messages_list_ns.add_resource(MessageResource.MessageResourceList, "")
    messages_list_ns.add_resource(MessageResource.MessageResourceListCount, "/count")
    messages_list_ns.add_resource(MessageResource.MessageResource, "/<int:id>")
    progress_reports_list_ns.add_resource(ProgressReportResource.ProgressReportResourceList, "")
    progress_reports_list_ns.add_resource(ProgressReportResource.ProgressReportResourceListCount, "/count")
    progress_reports_list_ns.add_resource(ProgressReportResource.ProgressReportResource, "/<int:id>")
    recommendations_list_ns.add_resource(RecommendationResource.RecommendationResourceList, "")
    recommendations_list_ns.add_resource(RecommendationResource.RecommendationResourceListCount, "/count")
    recommendations_list_ns.add_resource(RecommendationResource.RecommendationResource, "/<int:id>")
    analytics_list_ns.add_resource(AnalyticsResource.AnalyticsResourceList, "")
    analytics_list_ns.add_resource(AnalyticsResource.AnalyticsResourceListCount, "/count")
    analytics_list_ns.add_resource(AnalyticsResource.AnalyticsResource, "/<int:id>")
    learning_materials_list_ns.add_resource(LearningMaterialResource.LearningMaterialResourceList, "")
    learning_materials_list_ns.add_resource(LearningMaterialResource.LearningMaterialResourceListCount, "/count")
    learning_materials_list_ns.add_resource(LearningMaterialResource.LearningMaterialResource, "/<int:id>")
    # pyhipster-needle-rest-api-list-add-resource-list-count

    return api



