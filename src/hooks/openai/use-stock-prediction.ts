import { ChatCompletionMessageParam } from 'openai/src/resources/index.js';
import { useOpenAi } from './use-openai';
import { useState } from 'react';
import { dates } from '@/utils/date';
import { useApiKeys } from '@/contexts/api-keys.context';

export const useStockPrediction = () => {
	const [error, setError] = useState('');
	const [tickers, setTickers] = useState<string[]>([]);
	const [isLoadingStockData, setisLoadingStockData] = useState(false);
	const [isGeneratingReports, setIsGeneratingReports] = useState(false);
	const [text, setText] = useState('');
	const [report, setReport] = useState<string | null>('');
	const { apiKeys, setOpenDialog } = useApiKeys();

	const openai = useOpenAi();

	const fetchReport = async (stockData: string) => {
		if (!apiKeys.openaiKey || !apiKeys.polygoinKey) {
			setOpenDialog(true);

			return;
		}
		const messages: ChatCompletionMessageParam[] = [
			{
				role: 'system',
				content:
					'You are a trading guru. Given data on share prices over the past 3 days, write a report of no more than 150 words describing the stocks performance and recommending whether to buy, hold or sell.',
			},
			{
				role: 'user',
				content: stockData,
			},
		];

		setIsGeneratingReports(true);
		try {
			const response = await openai.chat.completions.create({
				temperature: 1.1, // You need to be careful of this, for this use-case, this value seems to make the most sense
				// model: 'gpt-3.5-turbo',
				model: 'LM Studio Community/Meta-Llama-3-8B-Instruct-GGUF',
				messages,
			});
			setReport(response.choices[0].message.content);
			setTickers([]);
		} catch {
			setError('Unable to generate report from openai');
		} finally {
			setIsGeneratingReports(false);
			setisLoadingStockData(false);
		}
	};

	const generateReport = async () => {
		if (!apiKeys.openaiKey || !apiKeys.polygoinKey) {
			setOpenDialog(true);

			return;
		}

		setisLoadingStockData(true);
		try {
			const stockData = await Promise.all(
				tickers.map(async (ticker) => {
					const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${dates.startDate}/${dates.endDate}?apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`;
					const response = await fetch(url);
					const data = await response.text();
					if (response.status === 200) {
						return data;
					} else {
						setError(
							`There was an error fetching stock data for the ticker: ${ticker}`
						);
					}
				})
			);

			fetchReport(stockData.join(''));
		} catch (err) {
			setError('There was an error fetching stock data.');
		}
	};

	const addTickers = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (text.length > 2) {
			setTickers((prev) => [...prev, text]);
			setText('');
			setError('');
		} else {
			setError(
				'You must add at least one ticker. A ticker is a 3 letter or more code for a stock. E.g TSLA for Tesla.'
			);
		}
	};

	return {
		error,
		tickers,
		isLoadingStockData,
		isGeneratingReports,
		report,
		generateReport,
		addTickers,
		text,
		setText,
	};
};
