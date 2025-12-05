import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import ApiEvent from "@/types/event.interface";
import { useState, useEffect, useRef } from "react";
import EventForm from "@/components/event-form";

interface EventFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    event?: ApiEvent;
}

const EventFormDialog = ({
    open,
    onClose,
    onSuccess,
    event,
}: EventFormDialogProps) => {
    const isEdit = !!event;
    const [formKey, setFormKey] = useState(0);
    const prevOpenRef = useRef(open);

    // Reset form state when dialog closes
    useEffect(() => {
        if (!open && prevOpenRef.current) {
            // Dialog just closed - increment key to reset form
            setTimeout(() => {
                setFormKey(prev => prev + 1);
            }, 0);
        }
        prevOpenRef.current = open;
    }, [open]);

    const handleClose = () => {
        onClose();
    };

    const handleSuccess = () => {
        onSuccess();
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold">
                        {isEdit ? "Update Event" : "Create Event"}
                    </DialogTitle>
                    <p className="text-center text-sm text-muted-foreground mt-2">
                        Fill in the event details below
                    </p>
                </DialogHeader>

                <div key={formKey} className="py-4">
                    <EventForm event={event} onSuccess={handleSuccess} />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EventFormDialog;
