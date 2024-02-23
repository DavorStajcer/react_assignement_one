/**
 *  Not needes as I am using [userLocalStorage] hook
 */

class NotesRepository {
  private static _instance: NotesRepository | null = null;
  static instance: NotesRepository =
    NotesRepository._instance ?? new NotesRepository();

  private notesKey = "notes_key";

  addNote(note: Note) {
    const notes = this.getAllNotes();
    notes.push(note);
    localStorage.setItem(this.notesKey, JSON.stringify(notes));
  }

  getAllNotes(): Note[] {
    try {
      const jsonString = localStorage.getItem(this.notesKey);
      if (jsonString === null) {
        return [];
      }
      const jsonNotes = JSON.parse(jsonString);
      return jsonNotes;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
