import React, { useState } from 'react';
import { MoreHorizontal, Copy, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

export interface ActionItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  type?: 'link' | 'copy' | 'delete' | 'custom';
}

export interface DataTableActionsProps {
  actions: ActionItem[];
  row: any; // This should be the type of your row data
  onDelete?: (row: any) => void; // Callback for delete action
  renderDeleteDialog?: (props: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
  }) => React.ReactNode;
}

export function DataTableActions({
  actions,
  row,
  onDelete,
  renderDeleteDialog,
}: DataTableActionsProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleActionClick = (action: ActionItem) => {
    switch (action.type) {
      case 'copy':
        navigator.clipboard.writeText(action.onClick?.() || '');
        toast({
          title: 'Copied',
          description: `${action.label} has been copied to clipboard.`,
        });
        break;
      case 'delete':
        setIsDeleteDialogOpen(true);
        break;
      case 'custom':
      default:
        action.onClick?.();
        break;
    }
  };

  const handleDelete = () => {
    onDelete?.(row);
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {actions.map((action, index) => (
            <React.Fragment key={index}>
              {index === 0 && <DropdownMenuSeparator />}
              <DropdownMenuItem onClick={() => handleActionClick(action)}>
                {action.icon && (
                  <span className="w-4 h-4 mr-2">{action.icon}</span>
                )}
                {action.type === 'link' && action.href ? (
                  <a href={action.href} className="flex w-full items-center">
                    {action.label}
                  </a>
                ) : (
                  action.label
                )}
              </DropdownMenuItem>
            </React.Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {renderDeleteDialog &&
        renderDeleteDialog({
          isOpen: isDeleteDialogOpen,
          onClose: () => setIsDeleteDialogOpen(false),
          onConfirm: handleDelete,
        })}
    </>
  );
}
