import React from 'react';
import Image from 'next/image';
import { MultipleQuotesSection } from '../../types/content';
import styles from './MultipleQuotesTemplate.module.css';

interface MultipleQuotesTemplateProps {
	section: MultipleQuotesSection;
}

const MultipleQuotesTemplate: React.FC<MultipleQuotesTemplateProps> = ({ section }) => {
	return (
		<div className={styles.contentSection}>
			{section.children.map((quote, index) => {
				const isOdd = index % 2 === 1;
				const name = quote.title.split(',')[0];
				const endsWithSigma = name.endsWith('ς');
				const borderColorClass = endsWithSigma ? styles.yellowBorder : styles.orangeBorder;

				return (
					<div
						key={index}
						className={`${styles.quoteCard} ${isOdd ? styles.quoteCardOdd : ''} ${borderColorClass}`}
					>
						<div className={styles.testimonialImage}>
							<Image
								src={quote.image}
								alt={name}
								width={100}
								height={100}
								className={styles.testimonialImageImg}
							/>
						</div>
						<div className={styles.testimonialContent}>
							<h3 className={styles.testimonialName}>{quote.title}</h3>
							<p 
								className={styles.testimonialQuote}
								dangerouslySetInnerHTML={{ __html: quote.text }}
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default MultipleQuotesTemplate;