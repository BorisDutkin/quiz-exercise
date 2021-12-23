import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { CarouselModule } from 'primeng/carousel';

import { quizFeature } from './quiz.reducers';
import { QuestionComponent } from './question/question.component';
import { QuizComponent } from './quiz.component';
import { EffectsModule } from '@ngrx/effects';
import { QuizEffects } from './quiz.effects';

@NgModule({
  declarations: [QuestionComponent, QuizComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: QuizComponent,
      },
    ]),
    StoreModule.forFeature(quizFeature),
    EffectsModule.forFeature([QuizEffects]),
    CarouselModule,
  ],
})
export class QuizModule {}
