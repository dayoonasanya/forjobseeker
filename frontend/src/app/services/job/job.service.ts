import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Job, JobResponse } from '../../interfaces/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private readonly API_URL = 'https://forjobseeker-rv9r.onrender.com/api/jobs';
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
   * Create a new job
   * @param jobData Object containing job details
   */
  createJob(jobData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.API_URL}/create`, jobData, { headers }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  /**
   * Get a job by its ID
   * @param jobId The ID of the job to retrieve
   */
  getJobById(jobId: string): Observable<Job> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ message: string, job: Job }>(`${this.API_URL}/${jobId}`, { headers }).pipe(
      map(response => {
        console.log('Job details response:', response);
        return response.job;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Update a job
   * @param jobId The ID of the job to update
   * @param jobData Object containing the updated job details
   */
  updateJob(jobId: string, jobData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.patch<any>(`${this.API_URL}/${jobId}`, jobData, { headers }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  /**
   * Soft delete a job by its ID
   * @param jobId The ID of the job to delete
   */
  deleteJob(jobId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.API_URL}/${jobId}`, { headers }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

    /**
   * Get all jobs with filtering options
   * @param filters Object containing filtering options
   */
    getAllJobs(filters: any = {}): Observable<Job[]> {
      const headers = this.getAuthHeaders();
      return this.http.get<{ totalJobs: Job[] }>(`${this.API_URL}`, { headers, params: filters }).pipe(
        map(response => {
          console.log('Full API response:', response); // Log the full response
          return response.totalJobs || []; // Return the jobs array from the response
        }),
        catchError(this.handleError)
      );
    }

  getJobsCount(): Observable<JobResponse> {
    const headers = this.getAuthHeaders();
    return this.http.get<JobResponse>(`${this.API_URL}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  

  /**
   * Get jobs by company
   * @param companyId The ID of the company to fetch jobs for
   */
  getJobsByCompany(companyId: string): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.API_URL}/company/${companyId}`, { headers }).pipe(
      map(response => {
        console.log('Jobs fetched for company:', response.jobs);
        return response.jobs;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Get jobs by job field
   * @param jobFieldId The ID of the job field to fetch jobs for
   */
  getJobsByJobField(jobFieldId: string): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.API_URL}/jobfield/${jobFieldId}`, { headers }).pipe(
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
