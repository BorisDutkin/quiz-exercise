import { createAction, props } from '@ngrx/store';

import { Question } from './question/question.model';

export enum QuizActions {
  Set = '[Questions API] Set Question',
  Fetch = '[Questions API] Fetch Question',
}

export const fetchQuestion = createAction(
  QuizActions.Set,
  props<{ question: Question }>()
);
