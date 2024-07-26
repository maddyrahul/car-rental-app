import { Injectable } from '@angular/core';

import { AdminLoginUser, User } from './models/models';
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    private jwt: JwtHelperService
  ) {}
  getUser(): User {
    let user: User = {
      userId: 0,
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
      address: ''
    };
    return user;
  }



  admingetUser(): AdminLoginUser {

    let adminuser: AdminLoginUser = {
      adminId: 0,

      email: '',
      password: '',

    };
    return adminuser;
  }

  setUser(token: string) {
    localStorage.setItem('user', token);
  }

  setadminUser(token: string) {
    localStorage.setItem('adminuser', token);

  }

  isLoggedIn() {
    return localStorage.getItem('user') ? true : false;
  }
  
  isadminLoggedIn() {
    return localStorage.getItem('adminuser') ? true : false;
  }


  logoutUser() {
    const isAdmin = this.isadminLoggedIn();
    console.log(isAdmin);
    if (isAdmin) {
      localStorage.removeItem('adminuser');
    } else {
      localStorage.removeItem('user');
    }
    localStorage.removeItem('sharedRes');
  }

 
  extractEmailDomain(email: string): string {
    const domain = email.split('@')[1];
    return domain;
  }

  isEmailDomainAdmin(): boolean {
    const user = this.getUser();
    const emailDomain = this.extractEmailDomain(user.email);
    return emailDomain === 'admin.com';
  }


  getData(){
    const currentUser = localStorage.getItem('user');

    if (currentUser) {
      const user = JSON.parse(currentUser);
    } else {
      console.log('Data not found');
    }
   }

   private currentUser: any;
   setuser(user: any): void {
    // Store the user data in the currentUser property
    this.currentUser = user;
    console.log('Setting user data in UtilityService:', this.currentUser);
  }
  getuser(): any {
    return this.currentUser;
  }
 
  
  
  getUserId(): number | null {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user: User = JSON.parse(userData);
      return user.userId;
    }
    return null; // Return null if user data is not found in local storage
  }
}
