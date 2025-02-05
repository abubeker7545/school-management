import { IVideoContent } from 'app/shared/model/video-content.model';
import { IArticle } from 'app/shared/model/article.model';
import { ILearningMaterial } from 'app/shared/model/learning-material.model';
import { IQuiz } from 'app/shared/model/quiz.model';
import { IDiscussion } from 'app/shared/model/discussion.model';
import { ICourse } from 'app/shared/model/course.model';

export interface ILesson {
  id?: number;
  title?: string;
  content?: string | null;
  order?: number;
  duration?: number;
  videos?: IVideoContent[] | null;
  articles?: IArticle[] | null;
  learningMaterials?: ILearningMaterial[] | null;
  quizzes?: IQuiz[] | null;
  discussions?: IDiscussion[] | null;
  course?: ICourse | null;
}

export const defaultValue: Readonly<ILesson> = {};
