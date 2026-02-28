---
title: "Fake News Detection: Comparing 9 Models from Naive Bayes to DistilBERT"
date: 2026-01-15
tag: "NLP"
description: "A deep dive into classifying fake news with 9 different models, uncovering data leakage risks, and discovering that sometimes simpler is better."
draft: false
---

# Fake News Detection: Comparing 9 Models from Naive Bayes to DistilBERT

When I set out to build a fake news classifier as a Kaggle practice project, I expected the transformer model to dominate. What I didn't expect was that a simple Linear SVM would match DistilBERT's 99.3% accuracy while training 30x faster. Here's the full story.

## The Dataset

I used the [Fake and Real News Dataset](https://www.kaggle.com/datasets/clmentbisaillon/fake-and-real-news-dataset) from Kaggle, containing about 44,000 articles split roughly evenly between fake and real news. Each article has a title, text body, subject category, and publication date.

## EDA: The Surprises Hiding in the Data

Before touching any model, I spent significant time on exploratory data analysis — and it paid off with some critical discoveries.

**Data leakage was everywhere.** The real news articles were almost entirely from Reuters, and many started with location markers like "WASHINGTON (Reuters) —". If I had left these in, the model wouldn't be learning to detect fake news — it would be learning to detect Reuters formatting. I stripped all Reuters tags before training.

**Subject categories didn't overlap.** Real news was categorized as "politicsNews" or "worldnews," while fake news used "News," "politics," and "left-news." This meant the subject feature alone could nearly perfectly classify the articles, which isn't useful for a generalizable model.

**Writing style differences were dramatic.** Fake news articles contained 12x more exclamation marks than real news. They also tended to use more emotional language, shorter sentences, and more capitalized words. These stylistic markers became important features.

**Word clouds told a clear story.** Real news centered around policy terms, diplomatic language, and specific political figures in factual contexts. Fake news word clouds were dominated by emotionally charged terms and conspiracy-related vocabulary.

## The 9-Model Showdown

I tested models across three categories: Traditional ML, Deep Learning, and Transformers.

### Traditional ML (with TF-IDF features)

**Naive Bayes** served as the baseline at 95.76% accuracy. Fast to train but limited by its independence assumption — it can't capture word order or phrase-level patterns.

**Logistic Regression** jumped to 98.48%. A solid improvement that showed linear decision boundaries work surprisingly well for this task.

**Linear SVM** hit 99.30% — matching the best transformer model. SVM's ability to find optimal separating hyperplanes in the high-dimensional TF-IDF space made it extremely effective.

**XGBoost and LightGBM** both landed around 98.85–98.91%. Strong performers, but slightly behind SVM on this particular task. Their ensemble nature helps with tabular data but doesn't give them an edge over SVM in high-dimensional text space.

### Deep Learning

**BiLSTM** achieved 98.70%. I expected it to perform better given LSTMs' strength with sequential data, but the relatively short article lengths meant long-range dependencies weren't as critical.

**CNN** reached 99.27% — nearly matching SVM and DistilBERT. This was the key insight: CNNs excel at detecting local n-gram patterns (phrases like "BREAKING" or "you won't believe"), which are exactly the signals that distinguish fake from real news.

**CNN+LSTM** hybrid scored 98.57%, surprisingly lower than CNN alone. The added LSTM complexity introduced noise without providing additional useful signal.

### Transformer

**DistilBERT** achieved 99.30% accuracy and 0.9929 F1 score — the best F1 by a slim margin. Its contextual embeddings captured nuanced semantic differences, but the advantage over SVM was marginal.

## The Key Insight: Why CNN Beat LSTM

This was the most interesting finding. In fake news detection, the discriminative signals are primarily local patterns: specific phrases, punctuation habits, and word combinations within short windows. CNNs are architecturally designed to detect exactly these kinds of patterns through their convolutional filters.

LSTMs, on the other hand, are designed for capturing long-range dependencies — understanding how the beginning of a sentence relates to the end, or how one paragraph connects to another. For fake news, these long-range patterns matter less than the local stylistic cues.

## Error Analysis: Where Models Fail

I examined the 63 articles that the best model misclassified and found clear patterns. Satire and opinion pieces were the hardest to classify correctly — they use emotional language similar to fake news but contain factual content. Articles that were short on distinctive stylistic markers but contained misinformation also fooled the models.

This suggests that current approaches are more accurately described as "writing style classifiers" rather than true "fact checkers." A production system would need to combine stylistic analysis with fact-checking against trusted sources.

## The Production Argument

If I were deploying a fake news detector in production, I'd choose Linear SVM over DistilBERT. The accuracy difference is negligible (both at 99.30%), but SVM trains in 30 seconds on CPU versus 15 minutes on GPU for DistilBERT. It's also simpler to deploy, easier to interpret through feature importance analysis, and requires no GPU for inference.

Sometimes the most sophisticated model isn't the right choice. Understanding why simpler models work — and when they won't — is what separates an ML engineer from someone who just runs AutoML.

---

*Full code and results are available on [GitHub](https://github.com/johnson00111/fake-news-detection) and [Kaggle](https://www.kaggle.com/code/johnson00111/ai-termproject-tj/notebook).*