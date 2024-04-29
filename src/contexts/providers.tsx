'use client';

import { Toaster } from 'sonner';
import { NextUIProvider } from '@nextui-org/react';

import { ApiKeysProvider } from './api-keys.context';

export function Providers({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<NextUIProvider>
			<ApiKeysProvider>{children}</ApiKeysProvider>
			<Toaster richColors />
		</NextUIProvider>
	);
}
