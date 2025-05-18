import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  collectionData,
  deleteDoc,
  orderBy,
  startAfter,
  limit,
  DocumentData,
  QueryDocumentSnapshot
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Survey } from '../models/survey.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  constructor(private firestore: Firestore) {}

  saveSurvey(survey: Survey): Promise<any> {
    const surveysRef = collection(this.firestore, 'surveys');
    return addDoc(surveysRef, {
      ...survey,
      createdAt: new Date()
    });
  }

  getSurveys(): Observable<Survey[]> {
    const surveysRef = collection(this.firestore, 'surveys');
    return collectionData(surveysRef, { idField: 'id' }) as Observable<Survey[]>;
  }

  getSurveyById(id: string): Promise<Survey | null> {
    const docRef = doc(this.firestore, 'surveys', id);
    return getDoc(docRef).then(snapshot =>
      snapshot.exists() ? snapshot.data() as Survey : null
    );
  }

  getSurveysByUserId(userId: string): Observable<Survey[]> {
    const surveysRef = collection(this.firestore, 'surveys');
    const q = query(surveysRef, where('creatorId', '==', userId));
    return collectionData(q, { idField: 'id' }) as Observable<Survey[]>;
  }

  deleteSurvey(id: string): Observable<void> {
    const docRef = doc(this.firestore, `surveys/${id}`);
    return from(deleteDoc(docRef));
  }

  getSurveysPaged(
    lastVisible: QueryDocumentSnapshot<DocumentData> | null,
    pageSize: number
  ): Observable<{ surveys: Survey[]; lastVisible: QueryDocumentSnapshot<DocumentData> | null }> {
    const surveysRef = collection(this.firestore, 'surveys');
    const constraints: any[] = [orderBy('createdAt', 'desc'), limit(pageSize)];

    if (lastVisible) {
      constraints.push(startAfter(lastVisible));
    }

    const q = query(surveysRef, ...constraints);
    return from(getDocs(q)).pipe(
      map(snapshot => {
        const surveys = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Survey));
        const last = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null;
        return { surveys, lastVisible: last };
      })
    );
  }
}
