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
			// This is useful if you are running the AI model locally, e.g running Meta Llama with LL Studio
			baseURL:
				process.env.NEXT_PUBLIC_OPENAI_BASE_URL || 'https://api.openai.com/v1',
		});
	}, [apiKeys.openaiKey]);

	return openai;
};
