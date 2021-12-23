import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { Question } from './question.model';
import { QuestionService } from './question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [QuestionService],
})
export class QuestionComponent implements OnInit, OnDestroy {
  timer$: Observable<number> = this.service.timer$;
  @Input() item!: Question;
  @Output() answer: EventEmitter<boolean> = new EventEmitter();
  @Output() strikes: EventEmitter<number> = new EventEmitter();
  @Output() timer: EventEmitter<void> = new EventEmitter();

  private unsubscribe$: Subject<void> = new Subject();

  constructor(private service: QuestionService) {}

  ngOnInit(): void {
    this.service.strikes$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((strikes) => this.strikes.emit(strikes));

    this.service.timer$
      .pipe(
        filter((time) => time === 0),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => this.timer.emit());
  }

  onAnswer(correct: boolean): void {
    this.answer.emit(correct);
  }

  onStrike(): void {
    this.service.increase();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
