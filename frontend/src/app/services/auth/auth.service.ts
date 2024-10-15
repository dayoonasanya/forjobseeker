import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'https://forjobseeker-rv9r.onrender.com/api/auth';
  private tokenKey = 'auth-token';
  private roleKey = 'user-role';
  private companyIdKey = 'company-id';
  private jobSeekerIdKey = 'jobseeker-id';
  private loggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Register a new user (JobSeeker or Company)
   * @param userData Object containing user registration details
   */
  register(userData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, userData).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  /**
   * Login function to authenticate a user
   * @param email User's email
   * @param password User's password
   */
  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post<any>(`${this.API_URL}/login`, loginData).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
  
        const decodedToken = this.decodeToken(response.token);
        
        localStorage.setItem(this.roleKey, decodedToken.role);
  
        if (decodedToken.companyId) {
          localStorage.setItem('company-id', decodedToken.companyId);
        }
  
        if (decodedToken.jobSeekerId) {
          localStorage.setItem('jobseeker-id', decodedToken.jobSeekerId);
        }
        
        this.loggedIn = true;
      }),
      catchError(this.handleError)
    );
  }  

  /**
   * Logout the user
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem(this.companyIdKey);
    localStorage.removeItem(this.jobSeekerIdKey);
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }

  /**
   * Check if the user is authenticated (has a valid token)
   * @returns boolean
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    this.loggedIn = !!token;
    return this.loggedIn;
  }

  /**
   * Check if the user has the required role to access a route
   * @param requiredRole The role required to access a route
   * @returns boolean
   */
  hasRole(requiredRole: string): boolean {
    const userRole = localStorage.getItem(this.roleKey);
    return userRole === requiredRole;
  }

  /**
   * Get the current user's role from localStorage
   * @returns string | null
   */
  getUserRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  /**
   * Get the JWT token from localStorage
   * @returns string | null
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Decode JWT token to retrieve user details
   * @param token The JWT token to decode
   * @returns Decoded token data or null if token is invalid
   */
  decodeToken(token: string): any {
    if (!token) return null;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  }  

  /**
   * Get the user ID from the JWT token
   * @returns string | null
   */
  getUserId(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken?.userId || null;
    }
    return null;
  }

  getCompanyId(): string | null {
    return localStorage.getItem(this.companyIdKey);
  }

  /**
   * Helper method to get Authorization headers
   */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.tokenKey);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  /**
   * Error handling for HTTP requests
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}


