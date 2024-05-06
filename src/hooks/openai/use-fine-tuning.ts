import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { useOpenAi } from './use-openai';
import { useApiKeys } from '@/contexts/api-keys.context';

export const useBookList = () => {
	const { apiKeys, setOpenDialog } = useApiKeys();
	const openai = useOpenAi();

	/* Upload training data */
	// const upload = await openai.files.create({
	//     file: await fetch('../../data/motivationalBotData.jsonl'),
	//     purpose: 'fine-tune'
	// })
	// console.log(upload) this will give a file ID
	// ID: file-PxDC3GKvDO7OXsIhI9sBhPpz

	/* Use file ID to create fineTuning job */
	// const fineTune = await openai.fineTuning.jobs.create({
	//     training_file: 'file-PxDC3GKvDO7OXsIhI9sBhPpz',
	//     model: 'gpt-3.5-turbo'
	// })
	// console.log(fineTune) this will create a fine-tune job,
	//ftjob-AYwT11cppsJ3IaRbs7llYke4"

	/* Check status of job */
	// The final status="succeeded" is when the model has been successfully trained on your data
	// const fineTuneStatus = await openai.fineTuning.jobs.retrieve('ftjob-AYwT11cppsJ3IaRbs7llYke4')
	// console.log(fineTuneStatus)
	/* {object: "fine_tuning.job", id: "ftjob-AYwT11cppsJ3IaRbs7llYke4", model: "gpt-3.5-turbo-0125", created_at: 1711377650, 
			finished_at: 1711378224, fine_tuned_model: "ft:gpt-3.5-turbo-0125:unicdev::bi2nXrQX", organization_id: "org-hILmMJhWE2V3rB3oGuJuRWMy", 
			result_files: ["file-dmhvhRjM6S4hl55XWj2Q2kbx"], status: "succeeded", validation_file: null, 
			training_file: "file-PxDC3GKvDO7OXsIhI9sBhPpz", hyperparameters: {n_epochs: 3, batch_size: 1, learning_rate_multiplier: 2}, 
			trained_tokens: 13017, error: {error: null}, user_provided_suffix: null
		}
	*/
	// Note that the above can be done in the OPENAI Fine tuning UI
	// You can use the above step when you want to maybe save stuffs to your backend DB

	const generateResponse = async () => {
		if (!apiKeys.openaiKey) {
			setOpenDialog(true);

			return;
		}

		const messages: ChatCompletionMessageParam[] = [
			{
				role: 'user',
				content: "I don't know what to do with my life",
			},
		];

		// You can then use your fine_tuned_model
		const response = await openai.chat.completions.create({
			model: 'ft:gpt-3.5-turbo-0125:unicdev::bi2nXrQX',
			messages: messages,
		});

		return response.choices[0].message.content;
	};

	return generateResponse;
};
