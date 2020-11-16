import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NoteDisplayComponent } from './components/note-display/note-display.component';
import { NoteAreaComponent } from './components/note-area/note-area.component';

const routes: Routes = [
  { path: 'all-notes/:user-id', component: NoteAreaComponent},
  { path: '**', redirectTo: "all-notes/ofirhalili@gmail.com",pathMatch: "full"}
]
@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    MenuBarComponent,
    FooterComponent,
    NoteDisplayComponent,
    NoteAreaComponent
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
