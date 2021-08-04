import { Injectable } from '@angular/core';
import { Student } from './student';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentsUrl = 'api/students';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl).pipe(tap(_ =>
      this.log('fetched students')), catchError(this.handleError<Student[]>('getStudents', [])));
  }

  getStudent(id: number): Observable<Student> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const url = `${this.studentsUrl}/${id}`;
    return this.http.get<Student>(url).pipe(
      tap(_ => this.log(`fetched student id=${id}`)),
      catchError(this.handleError<Student>(`getStudent id=${id}`))
    );
  }

  /*
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`StudentService: ${message}`);
  }

  /** PUT: update the hero on the server */
updateGrade(student: Student): Observable<any> {
  return this.http.put(this.studentsUrl, student, this.httpOptions).pipe(
    tap(_ => this.log(`updated ${student.name} grade=${student.grade}`)),
    catchError(this.handleError<any>('updateGrade'))
  );
}

/** POST: add a new hero to the server */
addStudent(student: Student): Observable<Student> {
  return this.http.post<Student>(this.studentsUrl, student, this.httpOptions).pipe(
    tap((newStudent: Student) => this.log(`added student w/ id=${newStudent.id}`)),
    catchError(this.handleError<Student>('addStudent'))
  );
}

/** DELETE: delete the hero from the server */
deleteStudent(id: number): Observable<Student> {
  const url = `${this.studentsUrl}/${id}`;

  return this.http.delete<Student>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted students id=${id}`)),
    catchError(this.handleError<Student>('deleteStudent'))
  );
}


/* GET heroes whose name contains search term */
searchStudents(term: number): Observable<Student[]> {
  if (!term) {
    return of([]);
  }
  return this.http.get<Student[]>(`${this.studentsUrl}/?id=${term}`).pipe(
    tap( x => x ?
       this.log(`found students matching "${term}"`) :
       this.log(`no students matching "${term}"`)),
    catchError(this.handleError<Student[]>('searchStudents', []))
  );
}

  constructor( private http: HttpClient, private messageService: MessageService) { }

}
