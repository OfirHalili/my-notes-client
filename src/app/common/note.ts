export class Note {
    id: number;
    userId: string;
    noteContent: string = "";

    constructor(userId: string){
        this.userId = userId;
    }
}
