import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  Auth
} from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = new BehaviorSubject<User | null>(null);

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser.next(user);
    });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.currentUser.next(userCredential.user);
      })
      .catch((error) => {
        console.error(error.message);
        throw error;
      });
  }

  register(email: string, password: string, fullName: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.currentUser.next(user);
        return setDoc(doc(this.firestore, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          fullName: fullName
        });
      })
      .catch((error) => {
        console.error(error.message);
        throw error;
      });
  }

  logout() {
    return signOut(this.auth)
      .then(() => {
        this.currentUser.next(null);
      })
      .catch((error) => {
        console.error(error.message);
        throw error;
      });
  }

  getUserFullName(uid: string): Promise<string> {
    const userDoc = doc(this.firestore, 'users', uid);
    return getDoc(userDoc).then(snapshot => {
      return snapshot.exists() ? snapshot.data()['fullName'] || 'Ismeretlen' : 'Ismeretlen';
    });
  }
}
