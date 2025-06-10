import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { FC } from "react";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";
import Toolbar from "./components/toolbar";
import State from "./components/state";

import "./styles.css";

// define your extension array
const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  // @ts-ignore
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

interface Props {
  value: string;
  onValueChange?(n: string): void;
  isStickyToolbar?: boolean;
  isView?: boolean;
}

const Editor: FC<Props> = ({
  value,
  isView,
  onValueChange,
  isStickyToolbar,
}) => {
  return (
    <EditorProvider
      slotBefore={!isView && <Toolbar isStickyToolbar={isStickyToolbar} />}
      extensions={extensions}
      content={value}
      editable={!isView}
    >
      <State onValueChange={onValueChange} />
    </EditorProvider>
  );
};

export default Editor;
