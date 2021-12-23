import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Question } from './question/question.model';

const QUESTION_URL = `https://opentdb.com/api.php?amount=1&encode=base64&type=multiple`;

interface QuestionAPIResponse {
  response_code: number;
  results: {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }[];
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
        answers: this.shuffleArray([
          ...incorrect_answers.map((answer: string) => ({
            title: atob(answer),
            correct: false,
          })),
          { title: atob(correct_answer), correct: true },
        ]),
      }))
    );
  }

  shuffleArray(array: any[]): any[] {
    let copy = array.slice();

    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
  }
}
