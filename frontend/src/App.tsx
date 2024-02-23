import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import { useLocalStorage } from "usehooks-ts";

function App() {
  let [note, setNote] = useState<Note>({ title: "", content: "" });
  let [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const [allNotes, setNotes] = useLocalStorage<Note[]>("notes", []);

  useEffect(() => {
    setIsButtonEnabled(note.title !== "" && note.content !== "");
  }, [note]);

  function onTitleChanged(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    console.log("onTitleChanged", value);
    setNote({
      ...note,
      title: value,
    });
  }

  function onContentChanged(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    console.log("onContentChanged", value);
    setNote({
      ...note,
      content: value,
    });
  }

  function onSaveNote(_: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    console.log("onSaveNote", note);
    setNotes([...allNotes, note]);
  }

  return (
    <>
      <header>
        <h1 className="page-title">Note taker app</h1>
      </header>
      <body>
        <div>
          <p className="text">Title</p>
          <input
            className="input-field"
            type="text"
            onChange={onTitleChanged}
          />
          <p className="text">Content</p>
          <input
            className="input-field"
            type="text"
            onChange={onContentChanged}
          />
          <button
            className="note-button"
            onClick={onSaveNote}
            disabled={!isButtonEnabled}
          >
            Styled Button
          </button>

          {allNotes.map((note, index) => {
            return (
              <div key={index}>
                <p>{note.title}</p>
                <p>{note.content}</p>
              </div>
            );
          })}
        </div>
      </body>
    </>
  );
}

export default App;
