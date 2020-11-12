import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';

const routes: Routes = [
  { path: 'all-notes/:user-id', component: NoteListComponent},
  { path: 'all-notes', component: NoteListComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    MenuBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
