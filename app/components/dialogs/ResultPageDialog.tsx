import React, { SetStateAction } from "react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Spinner } from "@/components/ui/spinner";

interface Props {
    open: boolean,
    // “setOpen is a useState setter that accepts either a boolean or a function returning a boolean.”
    setOpen: React.Dispatch<SetStateAction<boolean>>
}

function ResultPageDialog( { open, setOpen }: Props ) {
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
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
    )
}

export default ResultPageDialog