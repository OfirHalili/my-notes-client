import { Component, Input, OnInit } from '@angular/core';
import { NoteListComponent } from '../note-list/note-list.component';

@Component({
  selector: 'app-note-display',
  templateUrl: './note-display.component.html',
  styleUrls: ['./note-display.component.css']
})
export class NoteDisplayComponent implements OnInit {
   noteContent: string = null;
   @Input() note : NoteListComponent;
  constructor(private noteList: NoteListComponent) { }

  ngOnInit(): void {
    this.updateDisplayContent();
    console.log("hello "+this.note.notes.forEach(e=> e.noteContent));
  }
  updateDisplayContent(){
    this.noteList.selectedNoteContent.subscribe(content => this.noteContent = content);
  }
}
