import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { useOpenAi } from './use-openai';
import { ChangeEvent, useState } from 'react';
import { useApiKeys } from '@/contexts/api-keys.context';
import { toast } from 'sonner';

export const useAdvertiseCopyWithFewShot = () => {
	const [error, setError] = useState('');
	const [isLoading, setisLoading] = useState(false);
	const [adsCopy, setAdsCopy] = useState<string | null>('');
	const [values, setValues] = useState({
		productName: '',
		productDesc: '',
		productTarget: '',
	});

	const { apiKeys, setOpenDialog } = useApiKeys();
	const openai = useOpenAi();

	const generateCopySuggestion = async () => {
		if (!apiKeys.openaiKey) {
			setOpenDialog(true);

			return;
		}

		if (!values.productDesc || !values.productName || !values.productTarget) {
			return;
		}

		const messages: ChatCompletionMessageParam[] = [
			{
				role: 'system',
				content: `You are an expert advertiser copy writer, use a product name, a product description and a target market to create advertising copy for a product. 
					`,
			},
			{
				role: 'user',
				// Use 'Few Shot' approach a.k.a example to train the bot on respond style
				content: `
					product name: ${values.productName}
					product description: ${values.productDesc}
					product traget market: ${values.productTarget}
					advertising copy:

					Here are some response samples: 
					
					###
					product name: Flask Tie
					product description: A tie with a pouch to hold liquids and a straw to drink through
					product traget market: office workers
					advertising copy: Are you tired of having to worry about how much to drink throughout the day? With the Flask Tie, you can stay hydrated on-the-go! Our unique tie features a pouch that enables you to securely hold and sip your favorite drinks with the built-in straw! The water cooler is history! Long live Flask Tie!
					###

					###
					product name: SolarSwim
					product description: Swimming costumes for all genders with solar cells to charge your devices while you sunbathe.
					product traget market: Aimed at young adults
					advertising copy: Don't miss a beat while you're having fun in the sun! SolarSwim is the perfect choice for the tech-savvy, on-the-go millennial. Our innovative swimming costumes come with integrated solar cells that allow you to charge and access your devices while you're at the beach or pool. Enjoy your summer break with SolarSwim!
					###
				`,
			},
		];

		setisLoading(true);
		setAdsCopy('');
		try {
			const response = await openai.chat.completions.create({
				// model: 'gpt-3.5-turbo',
				model: 'LM Studio Community/Meta-Llama-3-8B-Instruct-GGUF',
				messages,
			});
			setAdsCopy(response.choices[0].message.content);
		} catch (e) {
			setError('Unable to generate advertify copy from openai');
			if (e instanceof Error) {
				toast.error(`Unable to generate report from openai: ${e.message}`);
			}
		} finally {
			setisLoading(false);
		}
	};

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setValues((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return {
		error,
		isLoading,
		generateCopySuggestion,
		adsCopy,
		values,
		handleChange,
	};
};
