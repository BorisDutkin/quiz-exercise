import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';

import { QuizService } from './quiz.service';
import { QuizActions } from './quiz.actions';

@Injectable()
export class QuizEffects {
  loadQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizActions.Fetch),
      mergeMap(() =>
        this.quizService.getQuestion().pipe(
          map((question) => ({ type: QuizActions.Set, question })),
          catchError(() =>
            of({ type: '[Questions API] Question Loaded Error' })
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private quizService: QuizService) {}
}
