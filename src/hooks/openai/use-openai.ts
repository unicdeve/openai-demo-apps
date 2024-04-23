import OpenAI from 'openai';
import { useMemo } from 'react';

// TODO: the scret key should be deployed on a BE and not used on the frontent
export const useOpenAi = () => {
	const openai = useMemo(
		() =>
			new OpenAI({
				dangerouslyAllowBrowser: true,
				// TODO: User should be able to add their API key so as to minimize cost
				apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
			}),
		[]
	);

	return openai;
};
