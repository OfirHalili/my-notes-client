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
  notes: Note[] = [];
  selectedNoteContent: Subject<string> = new Subject<string>();
  constructor(private notesService: NoteService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=> this.listNotes())
  }
  listNotes():void{
    const hasUserId: boolean = this.route.snapshot.paramMap.has('user-id');
    if(hasUserId){
      this.handleNotesByUserId();
    }else{
      this.handleAllNotes();
    }

  }
  handleAllNotes(): void {
    this.notesService.getAllNotes().subscribe(data=> this.notes = data)  
  }
  handleNotesByUserId(): void{
    const userId: string = this.route.snapshot.paramMap.get('user-id');
    this.notesService.getNotesByUserId(userId).subscribe( data => this.notes = data);
  }
updateMainNote(note: Note){
  console.log(`hello ${note.noteContent}`);
  this.selectedNoteContent.next(note.noteContent);
}
}
