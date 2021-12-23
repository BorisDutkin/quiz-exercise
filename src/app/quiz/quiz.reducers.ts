import { createFeature, createReducer, on } from '@ngrx/store';

import { Question } from './question/question.model';
import { fetchQuestion } from './quiz.actions';

export interface QuizState {
  questions: ReadonlyArray<Question>;
}

export const initialState: QuizState = {
  questions: [],
};

// export const quizReducer = createReducer(
//   initialState,
//   on(fetchQuestion, (state, { question }) => [...state, question])
// );

export const quizFeature = createFeature({
  name: 'quiz',
  reducer: createReducer(
    initialState,
    on(fetchQuestion, (state, { question }) => ({
      questions: [...state.questions, question],
    }))
  ),
});

export const { name, reducer, selectQuizState, selectQuestions } = quizFeature;
