import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {


  // private apiUrl = 'http://localhost:5000/tandemfirebase/us-central1';
  private apiUrl = 'https://us-central1-tandemfirebase.cloudfunctions.net';
  private headers: Headers = new Headers();

  constructor(
    private http: HttpClient,
    private angularFirestore: AngularFirestore) {
    this.headers.append('Content-Type', 'application/json');
  }

  // get user with the given id
  getUserById(uid) {
    return this.angularFirestore
      .collection<any>(`users`)
      .doc<User>(uid).valueChanges();
  }

  // create new user with the given user object
  createUser(user: any) {
    // generate new API-User
    const data = {
      firstname: user.firstname,
      lastname: user.lastname,
      dateOfBirth: user.dateOfBirth,
      sex: user.sex,
      city: user.city,
      activities: user.activities,
      offers: user.offers,
      mail: user.mail,
      password: user.password
    };

    return this.http.post(`${this.apiUrl}/users/`, data);
  }

  // update user with the given id
  updateUser(id: string, user: any) {
    return this.http.put(`${this.apiUrl}/users/${id}`, user);
  }

  // delete user with the given id
  deleteUser(id: string) {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
}
