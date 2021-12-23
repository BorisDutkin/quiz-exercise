import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Question } from './question/question.model';

const QUESTION_URL = `https://opentdb.com/api.php?amount=1&encode=base64&type=multiple`;

interface QuestionAPIResponse {
  response_code: number;
  results: Question[];
}

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  getQuestion(): Observable<Question> {
    return this.http.get<QuestionAPIResponse>(QUESTION_URL).pipe(
      map((response) => response.results[0]),
      map(({ question, correct_answer, incorrect_answers }) => ({
        question: atob(question),
        correct_answer: atob(correct_answer),
        incorrect_answers: incorrect_answers.map((item) => atob(item)),
      }))
    );
  }
}
