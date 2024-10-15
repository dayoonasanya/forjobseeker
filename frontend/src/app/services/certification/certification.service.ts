import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CertificationService {
  private readonly API_URL = 'https://forjobseeker-rv9r.onrender.com/api/certifications';
  private tokenKey = 'auth-token';

  constructor(private http: HttpClient) {}

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
   * Add a new certification
   * @param certificationData Object containing certification details
   */
  addCertification(certificationData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.API_URL}/add`, certificationData, { headers }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  /**
   * Get a certification by its ID
   * @param certificationId The ID of the certification to retrieve
   */
  getCertificationById(certificationId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.API_URL}/${certificationId}`, { headers }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  /**
   * Update a certification
   * @param certificationId The ID of the certification to update
   * @param certificationData Object containing the updated certification details
   */
  updateCertification(certificationId: string, certificationData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.patch<any>(`${this.API_URL}/${certificationId}`, certificationData, { headers }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  /**
   * Soft delete a certification by its ID
   * @param certificationId The ID of the certification to delete
   */
  deleteCertification(certificationId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.API_URL}/${certificationId}`, { headers }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  /**
   * Get certifications by job seeker ID
   * @param jobSeekerId The ID of the job seeker to fetch certifications for
   */
  getCertificationsByJobSeeker(jobSeekerId: string): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.API_URL}/jobseeker/${jobSeekerId}`, { headers }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
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
