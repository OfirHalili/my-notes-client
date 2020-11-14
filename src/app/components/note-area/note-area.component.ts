import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NoteDisplayComponent } from '../note-display/note-display.component';
import { NoteListComponent } from '../note-list/note-list.component';

@Component({
  selector: 'app-note-area',
  templateUrl: './note-area.component.html',
  styleUrls: ['./note-area.component.css']
})
export class NoteAreaComponent implements OnInit, AfterViewInit {
  @ViewChild('noteList') noteList: NoteListComponent;
  @ViewChild('noteDisplay') noteDisplay: NoteDisplayComponent
  constructor() { }

  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void{
    this.noteDisplay.setNoteList(this.noteList);
  }


}
