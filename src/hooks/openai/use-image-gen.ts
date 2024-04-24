import { useApiKeys } from '@/contexts/api-keys.context';
import { useOpenAi } from './use-openai';

export const useImageGeneration = () => {
	const { apiKeys, setOpenDialog } = useApiKeys();
	const openai = useOpenAi();

	const generateImage = async (prompt: string) => {
		if (!apiKeys.openaiKey) {
			setOpenDialog(true);

			return;
		}

		const response = await openai.images.generate({
			model: 'dall-e-2', // default dall-e-2
			prompt, // required
			n: 1, // default 1
			size: '256x256', // default 1024x1024
			// style: 'natural', // default vivid (other option: natural)
			response_format: 'b64_json', // default url
		});

		return `data:image/png;base64,${response.data[0].b64_json}`;
	};

	return generateImage;
};
