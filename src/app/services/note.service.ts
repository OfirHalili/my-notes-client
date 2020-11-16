import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { observable, Observable, pipe, Subject } from 'rxjs';
import { Note } from '../common/note';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class NoteService {
  
   private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };
  private baseUrl: string = "http://localhost:8080/api";
  private notesUrl: string = `${this.baseUrl}/notes`;
  private noteSearchUrl: string = `${this.notesUrl}/search`
  selectedNote: Subject<Note> = new Subject<Note>();
  userNotes: Note[] = [];
  userNotesNotifier: Subject<Note[]> = new Subject<Note[]>();
  userId: string;
  constructor(private httpClient: HttpClient) { }

  updateUserId(userId: string){
    this.userId = userId;
    this.getNotesByUserId().subscribe(notes => this.setUserNotes(notes));
  }
  setUserNotes(notes: Note[]){
    this.userNotes = notes;
    this.notifyOfChangeInUserNotes();
  }
  updateNoteInUserNotesList(note: Note){
    const noteToUpdate = this.findNoteByNoteId(note.id); 
    //if the note exist - update it, else insert the note to the head of the list
    if(noteToUpdate){
      noteToUpdate.noteContent = note.noteContent;
    }else{
      this.userNotes.push(note);
    }
    this.notifyOfChangeInUserNotes();
  }
  findNoteByNoteId(noteId: number):Note{
    //return the first(and only) note with the same note id
    return this.userNotes.filter(note => noteId == note.id).pop();
  }
  notifyOfChangeInUserNotes(){
    this.userNotesNotifier.next([...this.userNotes]);
  }
  getAllNotes():Observable<Note[]>{
    const searchUrl = this.notesUrl;
    return this.getNotes(searchUrl)
  }
  getNotesByUserId():Observable<Note[]> {
    if(!this.userId){
      console.log("You must provide user id");
    }
    const searchUrl = `${this.noteSearchUrl}/findByUserId?userId=${this.userId}`;
    return this.getNotes(searchUrl);
  }
  getNotes(searchUrl: string):Observable<Note[]>{
    return this.httpClient.get<GetResponseNote>(searchUrl).pipe(map(response => response._embedded.notes));  
  }
  saveNote(note: Note): Observable<Note>{
    return this.httpClient.post<Note>(this.notesUrl, note, this.httpOptions).pipe(map( note=>{ 
                                                                                        this.updateNoteInUserNotesList(note);
                                                                                        return note;
                                                                                      }));
  }
  // deleteNoteWithoutId(){
  //   this.noteDeleted.next(true);
  // }
  //if the note has id delete it also from the server
  deleteNote(noteId: number) {
    if(noteId){
      this.deleteNoteFromServer(noteId).subscribe(()=> this.deleteNoteFromUserNotesList(noteId)); 
    }else{
      this.deleteNoteFromUserNotesList(noteId);
    }
    
  }
  deleteNoteFromServer(noteId: number): Observable<Note> {
    const deleteNoteUrl: string = `${this.notesUrl}/${noteId}`;
    return this.httpClient.delete<Note>(deleteNoteUrl, this.httpOptions).pipe(map((data=> {
      return data;
    })));
  }
  deleteNoteFromUserNotesList(noteId: number){
    this.userNotes = this.userNotes.filter(note=> note.id != noteId);
    this.notifyOfChangeInUserNotes();
  }
  //update the selected note and notify to all the listeners that it was changed 
  updateSelectedNote(selectedNote: Note){
    this.selectedNote.next(selectedNote);
  }
}



interface GetResponseNote{
  _embedded: {
    notes: Note[];
  }
}