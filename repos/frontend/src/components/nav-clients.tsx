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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { API } from "@/api/api";
import { toast } from "react-toastify";

export function NavClients({
  clients,
  onClientCreated,
}: {
  clients: {
    id: string;
    name: string;
    url: string;
    icon: React.ReactNode;
  }[];
  onClientCreated: () => void;
}) {
  const { isMobile } = useSidebar();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const [editClient, setEditClient] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [deleteClient, setDeleteClient] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;
    setLoading(true);

    const result = await API.clients.create({ name: name.trim() });
    setLoading(false);

    if (result.isOk) {
      setOpen(false);
      setName("");
      onClientCreated();
    } else toast.error(result.message);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editClient?.name.trim()) return;
    setLoading(true);

    const result = await API.clients
      .id(editClient.id)
      .update({ name: editClient.name.trim() });
    setLoading(false);

    if (result.isOk) {
      setEditClient(null);
      onClientCreated();
    } else toast.error(result.message);
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!deleteClient?.id) return;
    setLoading(true);

    const result = await API.clients.id(deleteClient.id).delete();
    setLoading(false);

    if (result.isOk) {
      setDeleteClient(null);
      onClientCreated();
    } else toast.error(result.message);
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Clients</SidebarGroupLabel>
      <SidebarMenu>
        {clients.map((item) => (
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
                <DotsThreeOutlineIcon weight="bold" />
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
                  <span>Open Client</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setEditClient(item)}
                >
                  <PencilIcon className="text-muted-foreground mr-2" />
                  <span>Update Client</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setDeleteClient(item)}
                >
                  <TrashIcon className="text-destructive mr-2" />
                  <span className="text-destructive">Delete Client</span>
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
              }
            }}
          >
            <DialogTrigger
              render={
                <SidebarMenuButton className="text-sidebar-foreground/70 cursor-pointer" />
              }
            >
              <PlusIcon weight="bold" />
              <span>Create Client</span>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleCreate}>
                <DialogHeader>
                  <DialogTitle>Create Client</DialogTitle>
                </DialogHeader>
                <div className="grid gap-2 py-4">
                  <Label htmlFor="client-name">Client Name</Label>
                  <Input
                    id="client-name"
                    placeholder="Enter client name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                  />
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

        {/* Edit Dialog */}
        <Dialog
          open={!!editClient}
          onOpenChange={(open) => !open && setEditClient(null)}
        >
          <DialogContent>
            <form onSubmit={handleUpdate}>
              <DialogHeader>
                <DialogTitle>Update Client</DialogTitle>
              </DialogHeader>
              <div className="grid gap-2 py-4">
                <Label htmlFor="edit-client-name">Client Name</Label>
                <Input
                  id="edit-client-name"
                  placeholder="Enter client name"
                  value={editClient?.name || ""}
                  onChange={(e) =>
                    editClient &&
                    setEditClient({ ...editClient, name: e.target.value })
                  }
                  autoFocus
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => setEditClient(null)}
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
          open={!!deleteClient}
          onOpenChange={(open) => !open && setDeleteClient(null)}
        >
          <DialogContent>
            <form onSubmit={handleDelete}>
              <DialogHeader>
                <DialogTitle>Delete Client</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p>
                  Are you sure you want to delete {deleteClient?.name}? This
                  action cannot be undone.
                </p>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => setDeleteClient(null)}
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
      </SidebarMenu>
    </SidebarGroup>
  );
}
