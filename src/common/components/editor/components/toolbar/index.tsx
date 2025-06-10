import { useCurrentEditor } from "@tiptap/react";
import { Button } from "@heroui/button";
import type { FC } from "react";
import { Divider } from "@heroui/divider";
import { GoBold } from "react-icons/go";
import { GoItalic } from "react-icons/go";
import { Code } from "@heroui/code";
import { BsTypeH1 } from "react-icons/bs";
import { BsTypeH2 } from "react-icons/bs";
import { BsTypeH3 } from "react-icons/bs";
import { FaParagraph } from "react-icons/fa";
import { MdHorizontalRule } from "react-icons/md";
import { MdInvertColorsOff } from "react-icons/md";
import { EDITOR_COLORS } from "./colors";
import { twJoin } from "tailwind-merge";

interface Props {
  isStickyToolbar?: boolean;
}

const Toolbar: FC<Props> = ({ isStickyToolbar }) => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <Code
      className={twJoin(
        "mb-2 flex gap-1 items-center",
        isStickyToolbar && "sticky top-0 left-0 z-[20] bg-default",
      )}
    >
      <Button
        size="sm"
        isIconOnly
        radius="full"
        onPress={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        color={editor.isActive("heading", { level: 1 }) ? "primary" : "default"}
      >
        <BsTypeH1 size={15} />
      </Button>
      <Button
        size="sm"
        isIconOnly
        radius="full"
        onPress={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        color={editor.isActive("heading", { level: 2 }) ? "primary" : "default"}
      >
        <BsTypeH2 size={15} />
      </Button>
      <Button
        size="sm"
        isIconOnly
        radius="full"
        onPress={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        color={editor.isActive("heading", { level: 3 }) ? "primary" : "default"}
      >
        <BsTypeH3 size={15} />
      </Button>
      <Button
        size="sm"
        isIconOnly
        radius="full"
        onPress={() => editor.chain().focus().setParagraph().run()}
        color={editor.isActive("paragraph") ? "primary" : "default"}
      >
        <FaParagraph size={15} />
      </Button>
      <Divider className="h-[30px]" orientation="vertical" />
      <Button
        size="sm"
        isIconOnly
        radius="full"
        onPress={() => editor.chain().focus().toggleBold().run()}
        isDisabled={!editor.can().chain().focus().toggleBold().run()}
        color={editor.isActive("bold") ? "primary" : "default"}
      >
        <GoBold size={15} />
      </Button>
      <Button
        size="sm"
        isIconOnly
        radius="full"
        onPress={() => editor.chain().focus().toggleItalic().run()}
        isDisabled={!editor.can().chain().focus().toggleItalic().run()}
        color={editor.isActive("italic") ? "primary" : "default"}
      >
        <GoItalic size={15} />
      </Button>
      <Divider className="h-[30px]" orientation="vertical" />
      <Button
        size="sm"
        isIconOnly
        radius="full"
        onPress={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <MdHorizontalRule size={15} />
      </Button>
      <Divider className="h-[30px]" orientation="vertical" />
      <Button
        radius="full"
        size="sm"
        isIconOnly
        variant={
          editor.isActive("textStyle", { color: EDITOR_COLORS.default })
            ? "shadow"
            : "light"
        }
        onPress={() =>
          editor.chain().focus().setColor(EDITOR_COLORS.default).run()
        }
      >
        <div
          className="size-[15px] rounded-full"
          style={{ backgroundColor: EDITOR_COLORS.default }}
        />
      </Button>
      <Button
        radius="full"
        size="sm"
        isIconOnly
        variant={
          editor.isActive("textStyle", { color: EDITOR_COLORS.yellow })
            ? "shadow"
            : "light"
        }
        onPress={() =>
          editor.chain().focus().setColor(EDITOR_COLORS.yellow).run()
        }
      >
        <div
          className="size-[15px] rounded-full"
          style={{ backgroundColor: EDITOR_COLORS.yellow }}
        />
      </Button>
      <Button
        radius="full"
        size="sm"
        isIconOnly
        onPress={() => editor?.commands.unsetColor()}
      >
        <MdInvertColorsOff size={15} />
      </Button>
    </Code>
  );
};

export default Toolbar;
