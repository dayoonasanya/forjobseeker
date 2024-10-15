import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Application } from '../../interfaces/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private readonly API_URL = 'https://forjobseeker-rv9r.onrender.com/api/applications';
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
   * Create a new application
   * @param applicationData Object containing application details
   */
  createApplication(applicationData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.API_URL}/create`, applicationData, { headers }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  /**
   * Get an application by its ID
   * @param applicationId The ID of the application to retrieve
   */
  getApplicationById(applicationId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.API_URL}/${applicationId}`, { headers }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  /**
   * Update the status of an application
   * @param applicationId The ID of the application to update
   * @param status The new status to set for the application
   */
  updateApplicationStatus(applicationId: string, status: string): Observable<any> {
    const headers = this.getAuthHeaders();
    const body = { status };
    return this.http.patch<any>(`${this.API_URL}/${applicationId}/status`, body, { headers }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  /**
   * Soft delete an application by its ID
   * @param applicationId The ID of the application to delete
   */
  deleteApplication(applicationId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.API_URL}/${applicationId}`, { headers }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  /**
   * Get applications by job ID
   * @param jobId The ID of the job to fetch applications for
   */
  getApplicationsByJob(jobId: string): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.API_URL}/job/${jobId}`, { headers }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  /**
   * Get applications by job seeker ID
   * @param jobSeekerId The ID of the job seeker to fetch applications for
   */
  getApplicationsByJobSeeker(jobSeekerId: string): Observable<{ message: string; applications: Application[] }> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ message: string; applications: Application[] }>(`${this.API_URL}/jobseeker/${jobSeekerId}`, { headers }).pipe(
      map(response => response),  // Ensure that the response is typed correctly
      catchError(this.handleError)
    );
  }


  /**
 * Get applications by company ID (new method)
 * @param companyId The ID of the company to fetch applications for
 */
getApplicationsByCompany(companyId: string): Observable<any[]> {
  const headers = this.getAuthHeaders();
  return this.http.get<any>(`${this.API_URL}/company/${companyId}`, { headers }).pipe(
    map(response => {
      console.log('API response for applications by company:', response.applications);
      return response.applications;
    }),
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
