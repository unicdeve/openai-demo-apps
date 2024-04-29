import { Typography } from '@/components';
import Link from 'next/link';

const TEMPLATE_PAGES = [
	{
		label: 'Stock Predictions',
		href: '/stock-prediction',
	},
	{
		label: 'Image Generation with Dall-e',
		href: '/generate-image-with-dalle',
	},
	{
		label: 'Advertify',
		href: '/advertify',
	},
	{
		label: 'Movie Pitch',
		href: '/movie-pitch',
	},
];

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col p-24'>
			<Typography
				variant='h2'
				text='Here are some openai examples you can try out'
			/>

			<ul>
				{TEMPLATE_PAGES.map((page, i) => (
					<li key={i} className='list-disc text-blue-400'>
						<Link href={page.href}>{page.label}</Link>
					</li>
				))}
			</ul>

			<Typography
				className='mt-8'
				variant='body3'
				text='Note that you would have to provide your own API key for apps to work.'
			/>
		</main>
	);
}
