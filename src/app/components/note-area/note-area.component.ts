import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';
import { NoteDisplayComponent } from '../note-display/note-display.component';
import { NoteListComponent } from '../note-list/note-list.component';

@Component({
  selector: 'app-note-area',
  templateUrl: './note-area.component.html',
  styleUrls: ['./note-area.component.css']
})
export class NoteAreaComponent implements OnInit, AfterViewInit {
  // @ViewChild('noteList') noteList: NoteListComponent;
  // @ViewChild('noteDisplay') noteDisplay: NoteDisplayComponent
  constructor(private notesService: NoteService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const hasUserId: boolean = this.route.snapshot.paramMap.has('user-id');
    if(hasUserId){
      const userId = this.route.snapshot.paramMap.get('user-id');
      this.notesService.updateUserId(userId);
    }
  }
  ngAfterViewInit(): void{
    // this.noteDisplay.setNoteList(this.noteList);
    
  }

}
