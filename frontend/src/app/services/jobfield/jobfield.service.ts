import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JobField } from '../../interfaces/jobfield';

@Injectable({
  providedIn: 'root'
})
export class JobFieldService {
  private readonly API_URL = 'http://localhost:5000/api/jobfields';
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
   * Create a new job field
   * @param jobFieldData Object containing job field details
   */
  createJobField(jobFieldData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.API_URL}/create`, jobFieldData, { headers }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  /**
   * Get a job field by its ID
   * @param jobFieldId The ID of the job field to retrieve
   */
  getJobFieldById(jobFieldId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.API_URL}/${jobFieldId}`, { headers }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

    /**
   * Get all job fields
   * Returns an observable of an array of JobField objects.
   */
    getAllJobFields(): Observable<JobField[]> {
      const headers = this.getAuthHeaders();
      return this.http.get<{ jobFields: JobField[] }>(`${this.API_URL}`, { headers }).pipe(
        map((response) => response.jobFields),
        catchError(this.handleError)
      );
    }

  /**
   * Update a job field
   * @param jobFieldId The ID of the job field to update
   * @param jobFieldData Object containing the updated job field details
   */
  updateJobField(jobFieldId: string, jobFieldData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.patch<any>(`${this.API_URL}/${jobFieldId}`, jobFieldData, { headers }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  /**
   * Soft delete a job field by its ID
   * @param jobFieldId The ID of the job field to delete
   */
  deleteJobField(jobFieldId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.API_URL}/${jobFieldId}`, { headers }).pipe(
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
