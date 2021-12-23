import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Question } from './question/question.model';
import { QuizActions } from './quiz.actions';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  question$: Observable<ReadonlyArray<Question>> = this.store.select(
    (state) => state.quiz.questions
  );

  constructor(private store: Store<{ quiz: { questions: Question[] } }>) {}

  ngOnInit(): void {
    this.store.dispatch({ type: QuizActions.Fetch });
  }
}
