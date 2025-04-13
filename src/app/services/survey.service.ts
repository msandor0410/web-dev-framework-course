import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  doc,
  getDoc,
  query,
  where,
  collectionData
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Survey } from '../models/survey.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  constructor(private firestore: Firestore) {}

  saveSurvey(survey: Survey): Promise<any> {
    const surveysRef = collection(this.firestore, 'surveys');
    return addDoc(surveysRef, survey);
  }

  getSurveys(): Observable<Survey[]> {
    const surveysRef = collection(this.firestore, 'surveys');
    return collectionData(surveysRef, { idField: 'id' }) as Observable<Survey[]>;
  }

  getSurveyById(id: string): Promise<Survey | null> {
    const docRef = doc(this.firestore, 'surveys', id);
    return getDoc(docRef).then(snapshot => snapshot.exists() ? snapshot.data() as Survey : null);
  }

  getSurveysByUserId(userId: string): Observable<Survey[]> {
    const surveysRef = collection(this.firestore, 'surveys');
    const q = query(surveysRef, where('creatorId', '==', userId));
    return collectionData(q, { idField: 'id' }) as Observable<Survey[]>;
  }
}
