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

function AsianAlertDialog( { openCondition, setOpenCondition, onProceed, onCancel }: any ) {
    return (
        <AlertDialog open={openCondition} onOpenChange={setOpenCondition}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Asian Difficulty Selected</AlertDialogTitle>
                <AlertDialogDescription>
                    Yo! You've selected the <span className="text-red-600 font-semibold text-xl">"Asian"</span> difficulty level. Less time but with Asian-difficult questions. Are you sure you want to proceed?
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel
                    className='cursor-pointer'
                    onClick={onCancel}
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