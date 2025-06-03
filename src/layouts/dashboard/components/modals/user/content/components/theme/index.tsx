import type { FC } from "react";
import { useTheme } from "next-themes";
import { Radio, RadioGroup } from "@heroui/radio";
import { THEME } from "@common/constants/theme";

const ThemeComponent: FC = () => {
  const themeFn = useTheme();

  return (
    <RadioGroup
      color="secondary"
      label="Select theme"
      value={themeFn.theme}
      onValueChange={(v) => themeFn.setTheme(v)}
    >
      <Radio value={THEME.dark}>Dark</Radio>
      <Radio value={THEME.light}>Light</Radio>
      <Radio value={THEME.system}>System</Radio>
    </RadioGroup>
  );
};

export default ThemeComponent;
