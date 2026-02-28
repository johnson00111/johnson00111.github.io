---
title: "How I Used Kaggle to Level Up as an ML Engineer"
date: 2022-10-15
tag: "ML Engineering"
description: "A talk I gave at PyData Taipei on bridging the gap between Kaggle competitions and real-world ML engineering at Tagtoo."
draft: false
---

# How I Used Kaggle to Level Up as an ML Engineer

*This post is adapted from my talk at PyData Taipei Meetup (October 2022), where I shared how participating in Kaggle competitions sharpened my skills as a Machine Learning Engineer at Tagtoo.*

## The Context: ML Engineering at Tagtoo

At Tagtoo, a digital advertising company with over 10 years in the market, our data team processes nearly 30 million user event records daily. We build prediction models around consumer behavior on e-commerce platforms — primarily working with tabular data and time-series data. Our main tasks include binary classification (will the user buy or not?), regression for purchase frequency, and sales volume forecasting.

The challenge? Our day-to-day work can become routine — you build a model, deploy it, monitor it, retrain it. So I started looking for ways to stay sharp and keep learning new techniques. That's where Kaggle came in.

## Finding the Right Competitions

Not every Kaggle competition is relevant to your work. The key is to map your job tasks to competition categories. I broke this down into two dimensions: task type and data type.

For task types, think classification, regression, time-series forecasting, or ranking. For data types, consider tabular data, images, text, or time-series. Once you identify what you work with daily, you can quickly filter Kaggle competitions to find ones that match.

For example, at Tagtoo we were working on predicting e-commerce sales volumes — a time-series regression problem with tabular data. So I specifically looked for Kaggle's Tabular Playground Series competitions, which run monthly and cover exactly these kinds of problems.

## The Kaggle Workflow That Transfers to Production

Through multiple competitions, I developed a consistent workflow that proved valuable both on Kaggle and at work.

**Exploratory Data Analysis (EDA)** is always step one. You never jump straight into modeling. Understanding the data distribution, checking for outliers, identifying correlations between features and labels, and visualizing patterns — this discipline is the same whether you're competing or building production systems.

**Feature Engineering** comes next. After understanding the data, you leverage those insights to create new features, handle missing values, normalize data, and encode categorical variables. This is where domain knowledge meets data science.

**Model Building** follows a systematic approach. I found the scikit-learn model selection flowchart incredibly useful for choosing initial model candidates. Start simple, establish a baseline, then iterate with more complex models.

**Validation** is where many beginners stumble. On Kaggle, I primarily used Cross Validation (splitting data into K subsets and rotating the validation set). In production, we also use Hold-Out validation and Leave-One-Out for multi-class problems with imbalanced classes.

**Hyperparameter Tuning** used to be a manual, tedious process. Now tools like XGBoost's built-in tuning, LightGBM's parameter tuning utilities, and Hyperopt for neural networks can automate most of this work.

**Ensemble Methods** — combining predictions from multiple models through averaging or voting — often provide the final performance boost on Kaggle and can improve production model robustness too.

## Applying Kaggle Insights to Real Work

Here's the most valuable part: how Kaggle directly improved my work at Tagtoo.

We had a task to predict an e-commerce company's sales volume using one year of historical data (July 2021 to July 2022) to forecast August–September 2022. The dataset was minimal — just timestamps and sales figures.

Before Kaggle, I might have just plotted a trend line and built a basic time-series model. But from Kaggle competitions, I learned to think beyond the given data.

**External features matter.** I used the `holidays` Python package to add national holiday information. This immediately revealed patterns — sales consistently dropped right after holidays. I added features like "is this a holiday" and "days until next holiday."

**Macroeconomic signals help.** I incorporated GDP data, oil prices, and gold prices as additional features to capture the influence of the broader economic environment on purchasing behavior.

**Periodogram analysis** was a technique I picked up from a Kaggle notebook. By analyzing the frequency domain of the sales data, I could identify which time intervals had the strongest cyclical patterns, helping me choose the right granularity for time features.

**Fourier features** — using weighted sine and cosine functions to model cyclical purchasing patterns — let me simulate what "normal" sales should look like, creating a powerful baseline feature for the model.

The result? The model trained with Kaggle-inspired features significantly outperformed the baseline model, both in terms of evaluation metrics and visual fit to the actual sales curve.

## Key Takeaways

After spending time on both Kaggle and production ML, here's what I've learned:

Whatever problem you're solving at work, there's almost certainly a similar competition on Kaggle. Take the time to find it. Don't limit yourself to just competition solutions — even EDA notebooks can inspire new feature ideas. The Kaggle community is welcoming; don't hesitate to ask questions or discuss approaches with other participants. And most importantly, the techniques you learn on Kaggle directly transfer to production work. The gap between competition ML and production ML is smaller than most people think.

If you're an ML engineer looking to grow, I'd highly recommend finding a Kaggle competition that mirrors your work and diving in. The investment pays off.

---

*This talk was part of a joint session at PyData Taipei with my colleague from Tagtoo's Data Team. The original article (in Chinese) is available on [Medium](https://bit.ly/Johnson-Pydata).*