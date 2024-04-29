import { useOpenAi } from './use-openai';
import { useState } from 'react';
import { useApiKeys } from '@/contexts/api-keys.context';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { toast } from 'sonner';

export const useMoviePitch = () => {
	const [error, setError] = useState('');
	const [isLoading, setisLoading] = useState(false);
	const [prompt, setPrompt] = useState('');
	const [moviePitch, setMoviePitch] = useState<string | null>('');
	const { apiKeys, setOpenDialog } = useApiKeys();

	const openai = useOpenAi();

	const generateMovie = async () => {
		if (!apiKeys.openaiKey || !apiKeys.polygoinKey) {
			setOpenDialog(true);

			return;
		}
		const messages: ChatCompletionMessageParam[] = [
			{
				role: 'system',
				content:
					'You are a trading guru. Given data on share prices over the past 3 days, write a movie of no more than 150 words describing the stocks performance and recommending whether to buy, hold or sell.',
			},
			{
				role: 'user',
				content: prompt,
			},
		];

		setisLoading(true);
		try {
			const response = await openai.chat.completions.create({
				model: 'gpt-3.5-turbo',
				messages,
			});
			setMoviePitch(response.choices[0].message.content);
		} catch (e) {
			setError('Unable to generate movie pitch from openai');
			if (e instanceof Error) {
				toast.error(`Unable to generate report from openai: ${e.message}`);
			}
		} finally {
			setisLoading(false);
		}
	};

	return {
		error,
		isLoading,
		moviePitch,
		prompt,
		setPrompt,
		generateMovie,
	};
};
