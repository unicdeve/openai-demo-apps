'use client';

import { ApiKeysProvider } from './api-keys.context';

export function Providers({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return <ApiKeysProvider>{children}</ApiKeysProvider>;
}
