'use client';
import { useImageGeneration } from '@/hooks/openai';
import Image from 'next/image';
import { useState } from 'react';
import './styles.css';

export default function Home() {
	const [prompt, setPrompt] = useState('');
	const [image, setImage] = useState('');

	const generateImage = useImageGeneration();

	const createImage = async () => {
		const image = await generateImage(prompt);

		if (image) setImage(image);
	};

	return (
		<main className='flex min-h-screen flex-col items-center dalle-container'>
			<h1>ArtMatch 👩‍🎨</h1>

			<div id='output-img' className='frame'>
				{image ? (
					<div className='relative'>
						<Image src={image} fill alt='generated image' />
					</div>
				) : (
					<h2>
						Describe a famous painting without saying its name or the artist!
					</h2>
				)}
			</div>

			<textarea
				placeholder='A woman with long brown hair...'
				id='instruction'
				value={prompt}
				onChange={(e) => setPrompt(e.target.value)}
			/>

			<button id='submit-btn' onClick={createImage}>
				Create
			</button>
		</main>
	);
}
