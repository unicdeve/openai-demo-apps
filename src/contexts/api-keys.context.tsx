'use client';

import { NativeDialog, Typography } from '@/components';
import {
	ChangeEvent,
	createContext,
	Dispatch,
	FC,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
} from 'react';

type ApiKeysType = {
	openaiKey?: string;
	polygoinKey?: string;
};

interface IApiKeysProps {
	openDialog: boolean;
	setOpenDialog: Dispatch<SetStateAction<boolean>>;
	apiKeys: ApiKeysType;
}

const ApiKeysContext = createContext<IApiKeysProps | undefined>(undefined);

export const ApiKeysProvider: FC<{
	children: ReactNode;
}> = ({ children }) => {
	const [openDialog, setOpenDialog] = useState(false);
	// default value to be used locally because I won't set up with my personal keys
	const [apiKeys, setApiKeys] = useState<ApiKeysType>({
		openaiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
		polygoinKey: process.env.NEXT_PUBLIC_POLYGON_API_KEY || '',
	});

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setApiKeys((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<ApiKeysContext.Provider
			value={{
				openDialog,
				setOpenDialog,
				apiKeys,
			}}
		>
			<NativeDialog
				open={openDialog}
				onCancel={() => setOpenDialog(false)}
				onConfirm={() => setOpenDialog(false)}
			>
				<div className='flex flex-col gap-8'>
					<input
						type='text'
						name='openaiKey'
						value={apiKeys.openaiKey}
						onChange={onChange}
						className='w-[150px]'
						placeholder='OpenAI api key'
					/>

					<input
						type='text'
						name='polygoinKey'
						value={apiKeys.polygoinKey}
						onChange={onChange}
						className='w-[150px]'
						placeholder='Polygon api key'
					/>
					<Typography
						className='mt-1'
						variant='body3'
						text="It's very easy to create a Polygon api key on https://polygon.io/"
					/>
				</div>
			</NativeDialog>
			{children}
		</ApiKeysContext.Provider>
	);
};

export const useApiKeys = () => {
	const context = useContext(ApiKeysContext);
	if (context === undefined) {
		throw new Error('useApiKeys must be used within a ApiKeysProvider');
	}

	return context;
};
