'use client';

import './styles.css';
import { useAdvertiseCopyWithFewShot } from '@/hooks/openai';

export default function MoviePitch() {
	const { values, handleChange, adsCopy, generateCopySuggestion, isLoading } =
		useAdvertiseCopyWithFewShot();

	return (
		<main>
			<section className='intro'>
				<h1>Advertify</h1>
				<h2>
					Get promotional <strong>copy</strong> for your products{' '}
					<strong>fast</strong>
				</h2>
				<p>Powered by AI🤖</p>
			</section>

			<section className='ad-input' id='ad-input'>
				<label htmlFor=''>Product Name</label>
				<input
					type='text'
					placeholder='Vegan Fish Cream'
					name='productName'
					value={values.productName}
					onChange={handleChange}
				/>
				<label htmlFor=''>Description</label>
				<textarea
					placeholder='Fish flavoured vegan ice cream'
					name='productDesc'
					value={values.productDesc}
					onChange={handleChange}
				/>
				<label htmlFor=''>Target market</label>
				<input
					type='text'
					placeholder='kids under 12'
					name='productTarget'
					value={values.productTarget}
					onChange={handleChange}
				/>
				<button id='submit-btn' onClick={generateCopySuggestion}>
					{isLoading ? 'Generating ☺️' : 'Generate Copy'}
				</button>
			</section>

			<section className='ad-output' id='ad-output'>
				<h4>Your Copy!</h4>

				{adsCopy && (
					<p
						dangerouslySetInnerHTML={{
							__html: adsCopy,
						}}
					/>
				)}
			</section>
		</main>
	);
}
