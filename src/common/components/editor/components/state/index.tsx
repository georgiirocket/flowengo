import { type FC, useEffect } from "react";
import { type Editor, useCurrentEditor } from "@tiptap/react";

interface Props {
  onValueChange(n: string): void;
}

const State: FC<Props> = ({ onValueChange }) => {
  const { editor } = useCurrentEditor();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const updateFn = ({ editor }: { editor: Editor }) => {
      onValueChange(editor.getHTML());
    };

    editor?.on("update", updateFn);

    return () => {
      editor?.off("update", updateFn);
    };
  }, []);

  return null;
};

export default State;
