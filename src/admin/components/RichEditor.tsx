import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { useEffect, useRef } from "react";
import type { Block } from "@blocknote/core";

interface RichEditorProps {
  value?: Block[];
  onChange: (blocks: Block[]) => void;
}

const RichEditor = ({ value, onChange }: RichEditorProps) => {
  const initialized = useRef(false);
  const editor = useCreateBlockNote({
    initialContent: value && value.length > 0 ? value : undefined,
  });

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      return;
    }
  }, []);

  return (
    <div className="rounded-md border border-slate-200 overflow-hidden bg-white/[0.02] min-h-[300px] [&_.bn-editor]:!bg-transparent [&_.bn-block-content]:!text-slate-700 [&_.bn-inline-content]:!text-slate-700">
      <BlockNoteView
        editor={editor}
        theme="dark"
        onChange={() => {
          onChange(editor.document as Block[]);
        }}
      />
    </div>
  );
};

export default RichEditor;
