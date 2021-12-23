import { createFeature, createReducer, on } from '@ngrx/store';

import { Question } from './question/question.model';
import { fetchQuestion } from './quiz.actions';

export interface QuizState {
  questions: ReadonlyArray<Question>;
}

export const initialState: QuizState = {
  questions: Array.from({ length: 10 }),
};

export const quizFeature = createFeature({
  name: 'quiz',
  reducer: createReducer(
    initialState,
    on(fetchQuestion, (state, { question }) => {
      const idx = state.questions.findIndex((q) => q === undefined);
      let questions = state.questions.slice();
      questions[idx] = question;

      return {
        questions,
      };
    })
  ),
});

export const { name, reducer, selectQuizState, selectQuestions } = quizFeature;
