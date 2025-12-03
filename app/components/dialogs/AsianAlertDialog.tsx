import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel
} from "@/components/ui/alert-dialog";

interface Props {
    open: boolean
    setOpen: (condition: boolean) => void
    onProceed: () => void
}

function AsianAlertDialog( { open, setOpen, onProceed }: Props ) {
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Asian Difficulty Selected</AlertDialogTitle>
                <AlertDialogDescription>
                    Yo! You&apos;ve selected the <span className="text-red-600 font-semibold text-xl">&quot;Asian&quot;</span> difficulty level. Less time but with Asian-difficult questions. Are you sure you want to proceed?
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel
                    className='cursor-pointer'
                    onClick={() => setOpen(false)}
                >
                    Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                    className='cursor-pointer'
                    onClick={onProceed}       
                > 
                    Proceed
                </AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default AsianAlertDialog