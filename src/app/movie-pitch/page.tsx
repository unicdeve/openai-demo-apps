'use client';

import Image from 'next/image';
import { useState } from 'react';
import './styles.css';
import Link from 'next/link';

export default function MoviePitch() {
	const [prompt, setPrompt] = useState('');
	const [loading, setLoading] = useState(false);

	// TODO: Implement feature
	const generateMovie = async () => {
		if (prompt.length > 3) {
			setLoading(true);
		}
	};

	return (
		<main className='min-h-screen movie-pitch-container'>
			<header>
				<Image
					height={26}
					width={26}
					src='/images/logo-movie.png'
					alt='MoviePitch'
				/>
				<Link href='/movie-pitch'>
					<span>Movie</span>Pitch
				</Link>
			</header>
			<main>
				<section id='setup-container'>
					<div className='setup-inner'>
						<div className='relative w-[40%]'>
							<Image src='/images/movieboss.png' alt='movie boss' fill />
						</div>

						<div className='speech-bubble-ai' id='speech-bubble-ai'>
							<p id='movie-boss-text'>
								{loading
									? 'Ok, just wait a second while my digital brain digests that...'
									: 'Give me a one-sentence concept and I will give you an eye-catching title, a synopsis the studios will love, a movie poster... AND choose the cast!'}
							</p>
						</div>
					</div>
					<div
						className='setup-inner setup-input-container'
						id='setup-input-container'
					>
						{loading ? (
							<Image
								width={20}
								height={20}
								src='/images/loading-2.svg'
								alt='send'
								className='m-auto'
							/>
						) : (
							<>
								<textarea
									id='setup-textarea'
									placeholder='An evil genius wants to take over the world using AI.'
									value={prompt}
									onChange={(e) => setPrompt(e.target.value)}
								/>
								<button
									className='send-btn'
									id='send-btn'
									aria-label='send'
									onClick={generateMovie}
								>
									<Image
										width={50}
										height={50}
										src='/images/send-btn-icon.png'
										alt='send'
										className='m-auto'
									/>
								</button>
							</>
						)}
					</div>
				</section>
				<section className='output-container' id='output-container'>
					<div id='output-img-container' className='output-img-container'></div>
					<h1 id='output-title'></h1>
					<h2 id='output-stars'></h2>
					<p id='output-text'></p>
				</section>
			</main>
			<footer>&copy; 2023 MoviePitch All rights reserved</footer>
		</main>
	);
}
