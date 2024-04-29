'use client';
import Image from 'next/image';
import { useStockPrediction } from '@/hooks/openai/use-stock-prediction';
import './styles.css';

export default function StockPrediction() {
	const {
		error,
		tickers,
		isLoadingStockData,
		isGeneratingReports,
		report,
		generateReport,
		addTickers,
		text,
		setText,
	} = useStockPrediction();

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
			{!isLoadingStockData && (
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
								<Image src='/images/add.svg' alt='add' width={14} height={14} />
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

			{(isLoadingStockData || isGeneratingReports) && (
				<section className='loading-panel'>
					<Image
						src='images/loading.svg'
						alt='loading'
						height={400}
						width={200}
					/>
					<div id='api-message'>
						{isGeneratingReports
							? 'Generating Report'
							: 'Querying Stocks API...'}
					</div>
				</section>
			)}

			{report && (
				<section className='output-panel'>
					<h2>Your Report 😜</h2>

					<p className='flex'>{report}</p>
				</section>
			)}
			<footer>&copy; This is not real financial advice!</footer>
		</main>
	);
}
