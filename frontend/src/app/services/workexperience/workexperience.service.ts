import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService {
  private readonly API_URL = 'https://forjobseeker-rv9r.onrender.com/workexperience';
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
   * Add a new Work Experience
   * @param workExperienceData Object containing work experience details
   */
  addWorkExperience(workExperienceData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.API_URL}/`, workExperienceData, { headers }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  /**
   * Get a Work Experience by ID
   * @param workExperienceId The ID of the work experience to retrieve
   */
  getWorkExperienceById(workExperienceId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.API_URL}/${workExperienceId}`, { headers }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  /**
   * Update a Work Experience
   * @param workExperienceId The ID of the work experience to update
   * @param workExperienceData Object containing updated work experience details
   */
  updateWorkExperience(workExperienceId: string, workExperienceData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.API_URL}/${workExperienceId}`, workExperienceData, { headers }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  /**
   * Soft delete a Work Experience
   * @param workExperienceId The ID of the work experience to delete
   */
  deleteWorkExperience(workExperienceId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.API_URL}/${workExperienceId}`, { headers }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  /**
   * Get all Work Experiences by Job Seeker ID
   * @param jobSeekerId The ID of the job seeker whose work experiences to retrieve
   */
  getWorkExperiencesByJobSeeker(jobSeekerId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.API_URL}/jobseeker/${jobSeekerId}`, { headers }).pipe(
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
