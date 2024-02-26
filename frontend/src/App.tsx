import { useState } from "react";
import "./App.css";
import { useLocalStorage } from "usehooks-ts";

function App() {
  const [note, setNote] = useState<Note>({
    id: "id1",
    title: "",
    content: "",
    createdAt: Date.now(),
    updatedAt: null,
  });
  const [allNotes, setNotes] = useLocalStorage<Note[]>("notes", []);
  const isButtonEnabled = note.title !== "" && note.content !== "";

  return (
    <>
      <header>
        <h1 className="title">Note taker app</h1>
      </header>
      <body>
        <div>
          <p className="text-title">Title</p>
          <input
            className="input-title"
            type="text"
            onChange={(e) =>
              setNote({
                ...note,
                title: e.target.value,
              })
            }
          />
          <p className="text-description">Description</p>
          <textarea
            className="input-description"
            onChange={(e) =>
              setNote({
                ...note,
                content: e.target.value,
              })
            }
          />
          <button
            className="note-button"
            onClick={(_) => setNotes([...allNotes, note])}
            disabled={!isButtonEnabled}
          >
            Spremi notu
          </button>

          <div className="note-list">
            {allNotes.map((note) => {
              return (
                <div key={note.id} className="note-item">
                  <p>{note.title}</p>
                  <p>{note.content}</p>
                </div>
              );
            })}
          </div>
        </div>
      </body>
    </>
  );
}

export default App;
