"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DotsThreeOutlineIcon,
  FolderIcon,
  PlusIcon,
  PencilIcon,
  ShareIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { API } from "@/api/api";
import { toast } from "react-toastify";

export function NavProjects({
  projects,
  clients,
  onProjectCreated,
}: {
  projects: {
    id: string;
    name: string;
    url: string;
    icon: React.ReactNode;
    rate: number;
    clientId: string;
  }[];
  clients: {
    id: string;
    name: string;
  }[];
  onProjectCreated: () => void;
}) {
  const { isMobile } = useSidebar();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [clientId, setClientId] = useState("");
  const [rate, setRate] = useState("");
  const [loading, setLoading] = useState(false);

  const [editProject, setEditProject] = useState<{
    id: string;
    name: string;
    clientId: string;
    rate: number;
  } | null>(null);
  const [deleteProject, setDeleteProject] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !clientId || !rate.trim()) return;
    setLoading(true);

    const result = await API.projects.create({
      name: name.trim(),
      clientId,
      rate: Number(rate),
    });
    setLoading(false);

    if (result.isOk) {
      setOpen(false);
      onProjectCreated();
    } else toast.error(result.message);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editProject?.name.trim() || !editProject.clientId || !editProject.rate)
      return;
    setLoading(true);

    const result = await API.projects.id(editProject.id).update({
      name: editProject.name.trim(),
      clientId: editProject.clientId,
      rate: Number(editProject.rate),
    });
    setLoading(false);

    if (result.isOk) {
      setEditProject(null);
      onProjectCreated();
    } else toast.error(result.message);
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!deleteProject?.id) return;
    setLoading(true);

    const result = await API.projects.id(deleteProject.id).delete();
    setLoading(false);

    if (result.isOk) {
      setDeleteProject(null);
      onProjectCreated();
    } else toast.error(result.message);
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton render={<a href={item.url} />}>
              {item.icon}
              <span>{item.name}</span>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuAction
                    showOnHover
                    className="aria-expanded:bg-muted cursor-pointer"
                  />
                }
              >
                <DotsThreeOutlineIcon />
                <span className="sr-only">More</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem
                  render={
                    <a
                      href={item.url}
                      className="flex cursor-pointer items-center w-full"
                    />
                  }
                >
                  <FolderIcon className="text-muted-foreground mr-2" />
                  <span>Open Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setEditProject(item)}
                >
                  <PencilIcon className="text-muted-foreground mr-2" />
                  <span>Update Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setDeleteProject(item)}
                >
                  <TrashIcon className="text-destructive mr-2" />
                  <span className="text-destructive">Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <Dialog
            open={open}
            onOpenChange={(isOpen) => {
              setOpen(isOpen);
              if (isOpen) {
                setName("");
                setClientId("");
                setRate("0");
              }
            }}
          >
            <DialogTrigger
              render={
                <SidebarMenuButton className="text-sidebar-foreground/70 cursor-pointer" />
              }
            >
              <PlusIcon weight="bold" />
              <span>Create Project</span>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleCreate}>
                <DialogHeader>
                  <DialogTitle>Create Project</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="project-name">Project Name</Label>
                    <Input
                      id="project-name"
                      placeholder="Enter project name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="client-select">Client</Label>
                    <Select
                      value={clientId}
                      onValueChange={(val) => setClientId(val || "")}
                    >
                      <SelectTrigger id="client-select" className="w-full">
                        <SelectValue placeholder="Select Client">
                          {clients.find((c) => c.id === clientId)?.name ||
                            "Select Client"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="project-rate">Hourly rate</Label>
                    <Input
                      id="project-rate"
                      type="number"
                      placeholder="0.00"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer"
                  >
                    {loading ? "Creating..." : "Create"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </SidebarMenuItem>
      </SidebarMenu>

      {/* Edit Dialog */}
      <Dialog
        open={!!editProject}
        onOpenChange={(open) => !open && setEditProject(null)}
      >
        <DialogContent>
          <form onSubmit={handleUpdate}>
            <DialogHeader>
              <DialogTitle>Update Project</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-project-name">Project Name</Label>
                <Input
                  id="edit-project-name"
                  placeholder="Enter project name"
                  value={editProject?.name || ""}
                  onChange={(e) =>
                    editProject &&
                    setEditProject({ ...editProject, name: e.target.value })
                  }
                  autoFocus
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-client-select">Client</Label>
                <Select
                  value={editProject?.clientId || ""}
                  onValueChange={(val) =>
                    editProject &&
                    setEditProject({ ...editProject, clientId: val || "" })
                  }
                >
                  <SelectTrigger id="edit-client-select" className="w-full">
                    <SelectValue placeholder="Select Client">
                      {clients.find((c) => c.id === editProject?.clientId)
                        ?.name || "Select Client"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-project-rate">Rate</Label>
                <Input
                  id="edit-project-rate"
                  type="number"
                  placeholder="0.00"
                  value={editProject?.rate || ""}
                  onChange={(e) =>
                    editProject &&
                    setEditProject({
                      ...editProject,
                      rate: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                onClick={() => setEditProject(null)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="cursor-pointer"
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={!!deleteProject}
        onOpenChange={(open) => !open && setDeleteProject(null)}
      >
        <DialogContent>
          <form onSubmit={handleDelete}>
            <DialogHeader>
              <DialogTitle>Delete Project</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>
                Are you sure you want to delete {deleteProject?.name}? This
                action cannot be undone.
              </p>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                onClick={() => setDeleteProject(null)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="destructive"
                disabled={loading}
                className="cursor-pointer"
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </SidebarGroup>
  );
}
