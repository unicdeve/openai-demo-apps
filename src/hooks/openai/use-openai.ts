import { useApiKeys } from '@/contexts/api-keys.context';
import OpenAI from 'openai';
import { useMemo } from 'react';

// TODO: the scret key should be deployed on a BE and not used on the frontent
export const useOpenAi = () => {
	const { apiKeys } = useApiKeys();

	const openai = useMemo(() => {
		return new OpenAI({
			dangerouslyAllowBrowser: true,
			apiKey: apiKeys.openaiKey,
		});
	}, [apiKeys.openaiKey]);

	return openai;
};
