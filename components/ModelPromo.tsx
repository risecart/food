import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import Gift from "./Gift";

interface ModelPromoProps {
  open: boolean | undefined;
  onOpenChange: (open: boolean) => void;
  promo: number;
}

const ModelPromo = ({ open, onOpenChange, promo }: ModelPromoProps) => {
  return (
    <Dialog onOpenChange={onOpenChange} defaultOpen={false} open={open} modal>
      <DialogContent>
        <DialogHeader>
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>
        <Gift promo={promo} />
      </DialogContent>
    </Dialog>
  );
};

export default ModelPromo;
