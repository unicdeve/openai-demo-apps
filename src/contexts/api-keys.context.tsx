'use client';

import {
	Modal,
	ModalContent,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Input,
} from '@nextui-org/react';

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
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
				openDialog: isOpen,
				setOpenDialog: onOpenChange,
				apiKeys,
			}}
		>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalBody className='mt-8'>
								<Input
									autoFocus
									variant='flat'
									name='openaiKey'
									value={apiKeys.openaiKey}
									onChange={onChange}
									placeholder='OpenAI api key'
								/>
								<Input
									variant='flat'
									name='polygoinKey'
									value={apiKeys.polygoinKey}
									onChange={onChange}
									placeholder='Polygon api key'
								/>
							</ModalBody>
							<ModalFooter>
								<Button color='danger' variant='flat' onPress={onClose}>
									Cancel
								</Button>
								<Button color='primary' onPress={onClose}>
									Confirm
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
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
