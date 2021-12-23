import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Carousel } from 'primeng/carousel';
import { Observable } from 'rxjs';

import { Question } from './question/question.model';
import { QuizActions } from './quiz.actions';

const STRIKES: number = 3;

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit, AfterViewInit {
  @ViewChild('carousel') carousel!: Carousel;

  questions$: Observable<Question[]> = this.store.select(
    (state) => state.quiz.questions
  );

  constructor(private store: Store<{ quiz: { questions: Question[] } }>) {}

  ngOnInit(): void {
    this.store.dispatch({ type: QuizActions.Fetch });
    this.store.dispatch({ type: QuizActions.Fetch });
  }

  ngAfterViewInit(): void {
    console.log(this.carousel.page);
  }

  onSelect(correct: boolean) {
    console.log('[onSelect]', correct);

    if (correct) {
      this.store.dispatch({ type: QuizActions.Fetch });
    }
  }

  onStrike(strikes: number): void {
    console.log('[onStrike]', strikes);

    if (strikes === STRIKES) {
    }
  }

  onTimer(): void {
    console.log('[onTimer]');
  }
}
