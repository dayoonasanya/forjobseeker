import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JobSeeker, JobSeekerResponse } from '../../interfaces/jobseeker';

@Injectable({
  providedIn: 'root'
})
export class JobSeekerService {
  private readonly API_URL = 'https://forjobseeker-rv9r.onrender.com/api/jobseekers';
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
   * Create a new Job Seeker profile
   * @param jobSeekerData Object containing job seeker details
   */
  createJobSeekerProfile(jobSeekerData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.API_URL}/create`, jobSeekerData, { headers }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  /**
   * Get a Job Seeker by ID
   * @param jobSeekerId The ID of the job seeker to retrieve
   */
  getJobSeekerById(jobSeekerId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.API_URL}/${jobSeekerId}`, { headers }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  /**
   * Update a Job Seeker profile
   * @param jobSeekerId The ID of the job seeker to update
   * @param jobSeekerData Object containing updated job seeker details
   */
  updateJobSeekerProfile(jobSeekerId: string, jobSeekerData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.patch<any>(`${this.API_URL}/${jobSeekerId}`, jobSeekerData, { headers }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  /**
   * Soft delete a Job Seeker profile
   * @param jobSeekerId The ID of the job seeker to delete
   */
  deleteJobSeekerProfile(jobSeekerId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.API_URL}/${jobSeekerId}`, { headers }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  /**
   * Get Job Seeker applications by Job Seeker ID
   * @param jobSeekerId The ID of the job seeker whose applications to retrieve
   */
  getJobSeekerApplications(jobSeekerId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.API_URL}/${jobSeekerId}/applications`, { headers }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }



  /**
   * Get all Job Seekers
   */
  getAllJobSeekers(): Observable<JobSeeker[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ jobSeekers: JobSeeker[] }>(`${this.API_URL}`, { headers }).pipe(
      map(response => response.jobSeekers),
      catchError(this.handleError)
    );
  }
  
  getJobSeekersCount(): Observable<JobSeekerResponse> {
    const headers = this.getAuthHeaders();
    return this.http.get<JobSeekerResponse>(`${this.API_URL}`, { headers }).pipe(
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
