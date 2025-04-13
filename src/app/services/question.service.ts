import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';
import {
  collection, doc, setDoc, query, where, getDocs, Firestore
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private firestore: Firestore) {}

  async saveQuestions(questions: Question[], surveyId: string): Promise<void> {
    const batch = questions.map(question => {
      const questionDocRef = doc(this.firestore, 'questions', question.id);
      return setDoc(questionDocRef, {
        ...question,
        surveyId
      });
    });
    await Promise.all(batch);
  }

  getQuestionsByIds(ids: string[]): Promise<Question[]> {
    const questionsQuery = query(
      collection(this.firestore, 'questions'),
      where('id', 'in', ids)
    );

    return getDocs(questionsQuery).then(snapshot =>
      snapshot.docs.map(doc => doc.data() as Question)
    );
  }
}
