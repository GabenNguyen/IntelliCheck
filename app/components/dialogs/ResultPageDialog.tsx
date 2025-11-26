import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Spinner } from "@/components/ui/spinner";

function ResultPageDialog( { openCondition, setOpenCondition }: any ) {
    <AlertDialog open={openCondition} onOpenChange={setOpenCondition}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>
                <div className="flex items-center justify-between">
                    <span className='text-xl'>Result being calculated</span>
                    <Spinner className='size-8'/>
                </div>
            </AlertDialogTitle>
            </AlertDialogHeader>
        </AlertDialogContent>
    </AlertDialog>
}

export default ResultPageDialog