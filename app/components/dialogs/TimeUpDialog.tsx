import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";

interface Props {
    open: boolean
    setOpen: () => void
}

function TimeUpDialog( { open, setOpen }: Props ) {
    <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>
                <div className="flex items-center justify-between">
                    <span className='text-xl'>Time's up! System is cleaning up your mess</span>
                    <Spinner className='size-8'/>
                </div>
            </AlertDialogTitle>
            </AlertDialogHeader>
        </AlertDialogContent>
    </AlertDialog>
}

export default TimeUpDialog