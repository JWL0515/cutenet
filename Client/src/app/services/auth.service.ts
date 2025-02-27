import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // (undefined):
  // logged in: get User 
  // not logged in: get null
  // do not know, weather logged in: undefined
  currentUserSig = signal<User | undefined | null>(undefined);
}
