import { useEffect, useState } from "react";
import "./App.css";
import { useLocalStorage } from "usehooks-ts";

function App() {
  let [note, setNote] = useState<Note>({ title: "", content: "" });
  let [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const [allNotes, setNotes] = useLocalStorage<Note[]>("notes", []);

  useEffect(() => {
    setIsButtonEnabled(note.title !== "" && note.content !== "");
  }, [note]);

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
            {allNotes.map((note, index) => {
              return (
                <div key={index} className="note-item">
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
