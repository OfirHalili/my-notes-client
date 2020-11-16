import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Note } from 'src/app/common/note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  userId: string;
  userNotes: Note[] = [];
  // selectedNote: Subject<Note> = new Subject<Note>();
  constructor(private notesService: NoteService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('user-id');

    // this.route.paramMap.subscribe(()=> this.listNotes())
    this.handleGetUserNotes();
    // this.notesService.noteDeleted.subscribe(data => this.handleGetUserNotes());
  }
  // listNotes():void{
  //   const hasUserId: boolean = this.route.snapshot.paramMap.has('user-id');
  //   if(hasUserId){
  //     this.handleGetUserNotes();
  //   }else{
  //     this.handleAllNotes();
  //   }

  // }
  // handleAllNotes(): void {
  //   this.notesService.getAllNotes().subscribe(data=> this.notes = data)  
  // }
  handleGetUserNotes(): void{
    this.notesService.userNotesNotifier.subscribe( userNotes => {
                                                                        this.userNotes = userNotes.reverse();
                                                                       //  if the user doesn't have any notes create the first one for him 
                                                                        if(this.userNotes.length < 1){
                                                                          this.createNewNote()
                                                                        }else{
                                                                          //else update the selected note to be the first one
                                                                          this.updateSelectedNote(this.userNotes[0])
                                                                        }
                                                              });
  }
 
  updateSelectedNote(note: Note){
   this.notesService.updateSelectedNote(note);
  }
  createNewNote(){
    const note = new Note(this.userId);
    // this.userNotes.unshift(note);
    this.updateSelectedNote(note);
  }
}
