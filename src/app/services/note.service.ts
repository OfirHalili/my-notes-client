import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, pipe } from 'rxjs';
import { Note } from '../common/note';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class NoteService {
 
  private baseUrl: string = "http://localhost:8080/api";
  private notesUrl: string = `${this.baseUrl}/notes`;
  private noteSearchUrl: string = `${this.notesUrl}/search`
  constructor(private httpClient: HttpClient) { }
  getAllNotes():Observable<Note[]>{
    const searchUrl = this.notesUrl;
    return this.getNotes(searchUrl)
  }
  getNotesByUserId(userId: string):Observable<Note[]> {
    const searchUrl = `${this.noteSearchUrl}/findByUserId?userId=${userId}`;
    return this.getNotes(searchUrl);
  }
  getNotes(searchUrl: string):Observable<Note[]>{
    return this.httpClient.get<GetResponseNote>(searchUrl).pipe(map(response => response._embedded.notes));  

  }
}



interface GetResponseNote{
  _embedded: {
    notes: Note[];
  }
}