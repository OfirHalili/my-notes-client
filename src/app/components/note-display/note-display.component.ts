import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { NoteListComponent } from '../note-list/note-list.component';

@Component({
  selector: 'app-note-display',
  templateUrl: './note-display.component.html',
  styleUrls: ['./note-display.component.css']
})
export class NoteDisplayComponent implements OnInit, AfterViewInit {
  noteContent: string = null;
  noteList : NoteListComponent;
  @ViewChild('noteTextArea') noteTextArea: ElementRef;

  constructor() { }
  ngAfterViewInit(): void {
    console.log("hey "+this.noteTextArea);
  }

  ngOnInit(): void {
  }
  setNoteList(noteList: NoteListComponent){
    this.noteList = noteList;
    this.updateDisplayContent();
  }
  updateDisplayContent(){
    this.noteList.selectedNoteContent.subscribe(content => this.noteTextArea.nativeElement.value = content);

  }
  saveNote(event){
    
    
  }
 
}
