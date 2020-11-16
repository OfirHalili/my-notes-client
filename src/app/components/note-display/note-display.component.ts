import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Note } from 'src/app/common/note';
import { NoteService } from 'src/app/services/note.service';
import { NoteListComponent } from '../note-list/note-list.component';

@Component({
  selector: 'app-note-display',
  templateUrl: './note-display.component.html',
  styleUrls: ['./note-display.component.css']
})
export class NoteDisplayComponent implements OnInit, AfterViewInit {
  selectedNote: Note = null;
  //save the current note in the service and every time it wil update i will update it here as wall
  //comment your code!
  // noteList : NoteListComponent;
  @ViewChild('noteTextArea') noteTextArea: ElementRef;

  constructor(private noteService: NoteService) { }
  ngAfterViewInit(): void {
    // console.log("hey "+this.noteTextArea);
  }

  ngOnInit(): void {
    this.updateDisplayContent();
  }
  setNoteList(noteList: NoteListComponent){
    // this.noteList = noteList;
    // this.updateDisplayContent();
  }
  updateDisplayContent(){
    this.noteService.selectedNote.subscribe(note => {
                                                this.noteTextArea.nativeElement.value = note.noteContent;
                                                this.selectedNote = note;
                                                this.noteTextArea.nativeElement.focus();
                                              });

  }
  saveNote(){
    if(this.checkIfSelectedNoteContentWasChanged()){
      this.selectedNote.noteContent = this.noteTextArea.nativeElement.value;
      this.noteService.saveNote(this.selectedNote).subscribe(note => console.log(note));
    }
  }
  deleteNote(){
    this.noteService.deleteNote(this.selectedNote.id);
    // if(this.selectedNote.id){
    //   this.noteService.deleteNote(this.selectedNote.id).subscribe(); 
    // }
    // else{
    //   this.noteService.deleteNoteWithoutId();
    // }
  }
  // updateNote(){
  //  if(this.selectedNote.noteContent != this.noteTextArea.nativeElement.value){
  //     this.selectedNote.noteContent = this.noteTextArea.nativeElement.value;
  //     this.saveNote();
  //   }

  // }
  isEmptyOrSpacesString(str){
    return str === null || str.match(/^ *$/) !== null;
  }
  checkIfSelectedNoteContentWasChanged(){
    return this.selectedNote.noteContent != this.noteTextArea.nativeElement.value;
  }
 
}
