import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentSearchComponent } from './student-search/student-search.component';
import { MessagesComponent } from './messages/messages.component';
import { BlogComponent } from './blog/blog.component';

const routes: Routes = [
 // { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, 
 { path: 'detail/:id', component: StudentDetailComponent }, 
 { path: 'students', component: StudentsComponent },
 { path: 'dashboard', component: DashboardComponent },
 { path: 'search', component: StudentSearchComponent },
 { path: 'history', component: MessagesComponent },
 { path: 'blog', component: BlogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }