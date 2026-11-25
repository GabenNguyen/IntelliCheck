import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
}

function TimeUpDialog({ open, setOpen }: Props) {
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        <div className="flex items-center justify-between">
                            <span className="text-base font-medium">Time&apos;s up. Finishing your quiz…</span>
                            <Spinner className='size-8' />
                        </div>
                    </AlertDialogTitle>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default TimeUpDialog