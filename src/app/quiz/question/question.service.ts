import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class QuestionService {
  private timer: BehaviorSubject<number> = new BehaviorSubject(20);
  timer$: Observable<number> = this.timer.asObservable();

  private strikes: BehaviorSubject<number> = new BehaviorSubject(0);
  strikes$: Observable<number> = this.strikes.asObservable();

  constructor() {
    const timer = setInterval(() => {
      let value = this.timer.getValue();

      if (!value) {
        clearInterval(timer);
        return;
      }

      this.timer.next(--value);
    }, 1000);
  }

  increase(): void {
    let count = this.strikes.getValue();
    this.strikes.next(++count);
  }
}
