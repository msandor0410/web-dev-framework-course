import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  Auth,
  sendEmailVerification
} from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { reload } from '@angular/fire/auth';

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
    .then(async (userCredential) => {
      const user = userCredential.user;

      await reload(user); // 🔁 Frissítjük az emailVerified mezőt

      if (!user.emailVerified) {
        throw new Error('Az e-mail cím még nincs megerősítve!');
      }

      this.currentUser.next(user);
    });
  }

  register(email: string, password: string, fullName: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
  
        // ⬇️ Küldjük el az email megerősítést
        return sendEmailVerification(user).then(() => {
          // ⬇️ Csak utána mentsük el a felhasználó adatait
          return setDoc(doc(this.firestore, 'users', user.uid), {
            uid: user.uid,
            email: user.email,
            fullName: fullName
          });
        });
      })
      .then(() => {
        // ⬇️ Nem jelentkezünk be automatikusan!
        return this.logout();
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

  resendVerificationEmail(): Promise<void> {
    const user = this.auth.currentUser;
    if (user && !user.emailVerified) {
      return sendEmailVerification(user);
    } else {
      return Promise.reject('Nincs felhasználó, vagy már megerősítette az emailt.');
    }
  }
}
