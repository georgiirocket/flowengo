import type { FC } from "react";
import { useProjectsCtxStore } from "@common/providers/projects";
import {
  type IDropdownItem,
  useDropdownAction,
} from "@common/hooks/use-dropdown-action.ts";
import { Dropdown, DropdownTrigger, DropdownMenu } from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { TiThMenu } from "react-icons/ti";
import { DropdownItem } from "@heroui/react";
import Marker from "@common/components/marker";
import { saveLocalProjectId } from "@common/helpers/save-local-project-id.ts";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@common/constants/routes.ts";

const ProjectsButton: FC = () => {
  const navigate = useNavigate();
  const projectsData = useProjectsCtxStore((state) => state.projectsData);
  const { projects } = projectsData;

  const navigateToProject = (id: string) => {
    saveLocalProjectId(id);
    navigate(`${ROUTES.dashboard}/${id}`);
  };

  const items: IDropdownItem[] = projects.map((project) => ({
    key: project.id,
    label: project.title,
    startContent: <Marker color={project.color} />,
    onClick: navigateToProject.bind(null, project.id),
  }));

  const { onAction } = useDropdownAction(items);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm">
          <TiThMenu size={20} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        items={items}
        onAction={onAction}
        aria-label="Static Actions"
        disallowEmptySelection
        className="max-w-[300px]"
      >
        {(item) => (
          <DropdownItem startContent={item.startContent} key={item.key}>
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProjectsButton;
