import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { useOpenAi } from './use-openai';
import { useApiKeys } from '@/contexts/api-keys.context';

export const useBookList = () => {
	const { apiKeys, setOpenDialog } = useApiKeys();
	const openai = useOpenAi();

	const generateResponse = async () => {
		if (!apiKeys.openaiKey) {
			setOpenDialog(true);

			return;
		}

		const messages: ChatCompletionMessageParam[] = [
			{
				role: 'system',
				content: 'You are a helpful assistant that knows a lot about books.',
			},
			{
				role: 'user',
				content: 'Recommend me some books about learning to code.',
			},
		];

		const response = await openai.chat.completions.create({
			model: 'gpt-4',
			messages: messages,
			// The `stop` params is simply telling the model to stop generating once it sees that symbol
			// In this case, we are telling it to stop generating once it has list out 5 items, because 6. will not be included
			// Other Example can be stop: ['\n'] for new line or paragraph
			// Only use the `stop` param if it's necessary in your app

			//Sure, here are some useful books for learning to code:
			// 1. "Learn Python the Hard Way" by Zed Shaw: This book delivers on its promise to actually teach you to code by having you actually write code.
			// 2. "Cracking the Coding Interview" by Gayle Laakmann McDowell: Whilst this isn't a 'learn to code' book per se, it offers a great deal of code
			// challenges and scenarios that will help you reinforce your coding skills. 3. "JavaScript: The Good Parts" by Douglas Crockford: A fantastic book i
			// f you're interested in web development and JavaScript. 4. "Automate the Boring Stuff with Python" by Al Sweigart: As the title suggests, it can help you automate the less fun parts of your job.
			// 5. "Clean Code: A Handbook of Agile Software Craftsmanship" by Robert C. Martin: This book would be ideal once you've got some coding under your belt.
			// 6. "Eloquent JavaScript" by Marijn Haverbeke: A thoughtfully laid out guide to JavaScript and programming in general.
			// 7. "Head First Design Patterns: A Brain-Friendly Guide" by Eric Freeman, Bert Bates, Kathy Sierra, and Elisabeth Robson: This is a great introduction to design patterns, which are reusable solutions to commonly occurring problems in software design.
			// 8. "Structure and Interpretation of Computer Programs (SICP)" by Harold Abelson and Gerald Jay Sussman: This classic book is a comprehensive introduction to programming principles, techniques, and best practices. Incorporating a few of these selections should definitely help you in your coding journey!

			// After adding a stop
			//Sure, here are some useful books for learning to code:
			// 1. "Learn Python the Hard Way" by Zed Shaw: This book delivers on its promise to actually teach you to code by having you actually write code.
			// 2. "Cracking the Coding Interview" by Gayle Laakmann McDowell: Whilst this isn't a 'learn to code' book per se, it offers a great deal of code
			// challenges and scenarios that will help you reinforce your coding skills. 3. "JavaScript: The Good Parts" by Douglas Crockford: A fantastic book i
			// f you're interested in web development and JavaScript. 4. "Automate the Boring Stuff with Python" by Al Sweigart: As the title suggests, it can help you automate the less fun parts of your job.
			// 5. "Clean Code: A Handbook of Agile Software Craftsmanship" by Robert C. Martin: This book would be ideal once you've got some coding under your belt.
			stop: ['6.'],
		});

		return response.choices[0].message.content;
	};

	return generateResponse;
};
