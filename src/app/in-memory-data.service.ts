import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Student } from './student'; 

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const students = [
      { id: 1, name: '张安', grade: 120 },
      { id: 2, name: '王五', grade: 120 },
      { id: 3, name: 'Bombasto', grade: 120 },
      { id: 4, name: '李四', grade: 120 },
      { id: 5, name: '曹操', grade: 120 },
      { id: 6, name: 'RubberMan', grade: 120 },
      { id: 7, name: 'Dynama', grade: 120 },
      { id: 8, name: '诸葛亮', grade: 120 },
      { id: 9, name: 'Tornado', grade: 120 },
      { id: 10, name: 'Magma', grade: 120 }
    ];
    return {students};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(students: Student[]): number {
    return students.length > 0 ? Math.max(...students.map(student => student.id)) + 1 : 11;
  }
}