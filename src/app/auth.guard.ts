import { CanActivateFn } from '@angular/router';
import { AuthService } from './services/auth.service';  // AuthService importálása
import { inject } from '@angular/core';  // Injectable-ot használunk a függvények injektálásához
import { Observable } from 'rxjs';  // Observable importálása

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  // Az AuthService injektálása
  const authService = inject(AuthService);

  // Ellenőrizzük, hogy a felhasználó be van-e jelentkezve
  return new Observable<boolean>((observer) => {
    authService.currentUser.subscribe(user => {
      if (user) {
        observer.next(true);  // Ha be van jelentkezve, engedjük a hozzáférést
      } else {
        observer.next(false); // Ha nincs bejelentkezve, irányítsuk a login oldalra
        window.location.href = '/login'; // Vagy használhatjuk a router-t is a redirecthez
      }
    });
  });
};
