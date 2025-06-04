'use client';

import { useState, useMemo } from 'react';
import { Input } from './components/input';
import { Button } from './components/button';

const ARTICLES = [
  {
    title: 'Understanding the difference between grid-template and grid-auto',
    date: 'Oct 09, 2018',
    content: 'With all the new properties related to CSS Grid Layout, one of the distinctions that always confuses developers is the difference between grid-template and grid-auto.',
  },
  {
    title: 'Flexbox vs Grid: When to use which',
    date: 'Sep 21, 2020',
    content: 'Choosing between Flexbox and Grid can be tricky. This post compares use cases where each excels.',
  },
  {
    title: 'Building responsive layouts with CSS Grid',
    date: 'Jul 15, 2022',
    content: 'CSS Grid makes it easy to build complex responsive layouts without media queries.',
  },
];

function highlight(text: string, keyword: string) {
  if (!keyword) return text;
  const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <mark key={i} className="bg-yellow-300">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default function ArticleSearch() {
  const [text, setText] = useState('');

  const results = useMemo(() => {
    return ARTICLES.filter(article =>
      `${article.title} ${article.content}`.toLowerCase().includes(text.toLowerCase())
    );
  }, [text]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Search</h1>

      <div className="relative mb-4">
        <Input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Search articles"
          className="w-full px-4 py-2 rounded shadow border border-gray-300 focus:outline-none"
        />
        {text && (
          <Button
            onClick={() => setText('')}
            className="absolute right-2 top-2 text-gray-500 hover:text-black"
          >
            &#10005;
          </Button>
        )}
      </div>

      <p className="mb-4">
        <strong>{results.length}</strong> post{results.length !== 1 ? 's' : ''} were found.
      </p>

      {results.map((article, idx) => (
        <div key={idx} className="mb-6">
          <h2 className="text-xl font-semibold">
            {highlight(article.title, text)}
          </h2>
          <p className="text-sm italic text-gray-600 mb-1">{article.date}</p>
          <p>{highlight(article.content, text)}</p>
        </div>
      ))}
    </div>
  );
}
