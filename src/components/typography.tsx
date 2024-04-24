import React from 'react';
import { twMerge } from 'tailwind-merge';

type ElementTypes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
type TypographyVariant =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'body1'
	| 'body2'
	| 'body3';

type TypographyProps = React.HTMLProps<HTMLParagraphElement> & {
	variant?: TypographyVariant;
	component?: ElementTypes;
} & (
		| { text: string; children?: never }
		| { children: React.ReactNode; text?: never }
	);

const VARIANT_CLASSES: Record<TypographyVariant, string> = {
	h1: 'text-4xl font-extrabold lg:text-5xl',
	h2: 'text-3xl font-semibold',
	h3: 'text-2xl font-semibold',
	h4: 'text-xl font-semibold',
	h5: 'text-lg font-semibold',
	h6: 'text-base font-semibold',
	body1: 'text-base',
	body2: 'text-sm',
	body3: 'text-xs',
};

export const Typography: React.FC<TypographyProps> = ({
	variant = 'body1',
	component,
	children,
	className,
	text,
	...rest
}) => {
	if ((text && children) || (!text && !children)) {
		throw new Error(
			"[Typography]: Please pass either 'text' or 'children', not both."
		);
	}

	const isHeading =
		variant === 'h1' ||
		variant === 'h2' ||
		variant === 'h3' ||
		variant === 'h4' ||
		variant === 'h5' ||
		variant === 'h6';

	const classes = VARIANT_CLASSES[variant] || '';
	const finalClasses = twMerge(classes, className);

	const ValidComponent = component || (isHeading ? variant : 'p');

	return (
		<ValidComponent className={finalClasses} {...rest}>
			{text ?? children}
		</ValidComponent>
	);
};
