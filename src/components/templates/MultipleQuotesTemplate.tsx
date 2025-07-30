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
				const isEven = index % 2 === 1;

				return (
					<div
						key={index}
						className={`${styles.quoteCard} ${isEven ? styles.quoteCardEven : ''}`}
					>
						<div className={styles.testimonialImage}>
							<Image
								src={quote.image}
								alt={quote.title.split(',')[0]}
								width={100}
								height={100}
								className={`${styles.testimonialImageImg} ${isEven ? styles.testimonialImageEven : ''}`}
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