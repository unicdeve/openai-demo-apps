'use client';
import { useOpenAi } from '@/hooks/openai/use-openai';
import { dates } from '@/utils/date';
import Image from 'next/image';
import { ChatCompletionMessageParam } from 'openai/src/resources/index.js';
import { useEffect, useState } from 'react';

export default function Home() {
	const [error, setError] = useState('');
	const [tickers, setTickers] = useState<string[]>([]);
	const [loadingStockData, setLoadingStockData] = useState(false);
	const [generatingReports, setGeneratingReports] = useState(false);
	const [text, setText] = useState('');
	const [report, setReport] = useState<string | null>('');

	const openai = useOpenAi();

	const fetchReport = async (stockData: any) => {
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

		setGeneratingReports(true);
		try {
			const response = await openai.chat.completions.create({
				temperature: 1.1, // You need to be careful of this, for this use-case, this value seems to make the most sense
				model: 'gpt-3.5-turbo',
				messages,
			});
			console.log(response);
			setReport(response.choices[0].message.content);
		} catch {
			setError('Unable to generate report from openai');
		} finally {
			setGeneratingReports(false);
			setLoadingStockData(false);
		}
	};

	const generateReport = async () => {
		setLoadingStockData(true);
		try {
			// const stockData = await Promise.all(
			// 	tickers.map(async (ticker) => {
			// 		const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${dates.startDate}/${dates.endDate}?apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`;
			// 		const response = await fetch(url);
			// 		const data = await response.text();
			// 		if (response.status === 200) {
			// 			return data;
			// 		} else {
			// 			setError(
			// 				`There was an error fetching stock data for the ticker: ${ticker}`
			// 			);
			// 		}
			// 	})
			// );
			// NOTE: Above API call was disabled to avoid cost, enable it for dynamic data in the future
			const stockData = [
				'{"ticker":"AMZN","queryCount":1,"resultsCount":1,"adjusted":true,"results":[{"v":5.5099718e+07,"vw":175.546,"o":178.74,"c":174.63,"h":179,"l":173.44,"t":1713499200000,"n":569799}],"status":"OK","request_id":"e6e4812291c74734c871a307697a3278","count":1}',
			];

			// console.log(stockData);

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

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<header>
				<Image
					src='/images/logo-dave-text.png'
					alt="Dodgy Dave's Stock Predictions"
					width={340}
					height={150}
				/>
			</header>
			<main>
				{!loadingStockData && (
					<section className='action-panel'>
						<form id='ticker-input-form' onSubmit={addTickers}>
							<label htmlFor='ticker-input'>
								Add up to 3 stock tickers below to get a super accurate stock
								predictions report👇{' '}
							</label>
							<div className='form-input-control'>
								<input
									type='text'
									id='ticker-input'
									placeholder='MSFT'
									value={text}
									onChange={(e) => setText(e.target.value)}
								/>
								<button className='add-ticker-btn' type='submit'>
									<Image
										src='/images/add.svg'
										alt='add'
										width={14}
										height={14}
									/>
								</button>
							</div>
							<span className='text-red-500 text-xs min-h-8'>{error}</span>
						</form>
						<p className='ticker-choice-display'>
							{tickers.length > 0
								? tickers.join(', ')
								: 'Your tickers will appear here...'}
						</p>
						<button
							className='generate-report-btn'
							disabled={tickers.length === 0}
							type='button'
							onClick={generateReport}
						>
							Generate Report
						</button>
						<p className='tag-line'>Always correct 15% of the time!</p>
					</section>
				)}

				{(loadingStockData || generatingReports) && (
					<section className='loading-panel'>
						<Image
							src='images/loading.svg'
							alt='loading'
							height={400}
							width={200}
						/>
						<div id='api-message'>
							{generatingReports
								? 'Generating Report'
								: 'Querying Stocks API...'}
						</div>
					</section>
				)}

				<section className='output-panel'>
					<h2>Your Report 😜</h2>

					{report && <p className='flex'>{report}</p>}
				</section>
			</main>
			<footer>&copy; This is not real financial advice!</footer>
		</main>
	);
}
