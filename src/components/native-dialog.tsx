'use client';

import { PropsWithChildren, useEffect, useRef } from 'react';

type NativeDialogProps = PropsWithChildren & {
	open: boolean;
	onCancel: () => void;
	onConfirm: () => void;
};

export const NativeDialog = ({
	children,
	onCancel,
	onConfirm,
	open,
}: NativeDialogProps) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (open) {
			dialogRef.current?.showModal();
		} else {
			dialogRef.current?.close();
		}
	}, [open]);

	return (
		<dialog
			id='favDialog'
			ref={dialogRef}
			className='p-6 rounded-lg overflow-auto'
		>
			{children}

			<div className='flex gap-3 justify-center mt-8'>
				<button onClick={onCancel}>Cancel</button>
				<button onClick={onConfirm}>Confirm</button>
			</div>
		</dialog>
	);
};
