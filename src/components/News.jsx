// src/components/News.js
import React from 'react';

const dummyNews = [
  { title: "Feud over KK Modi's Rs 11,000-cr fortune turns ugly", time: "4 hours ago", source: "Business Today" },
  { title: "IndiGo Flight From Chennai Makes Emergency Landing", time: "1 hour ago", source: "News18" },
  { title: "Auto Sales In May 2024 Live: M&M SUV Sales Up 31%", time: "1 hour ago", source: "Bloomberg Quint" },
  { title: "Ask Profit | Cummins India In Focus | NDTV Profit", time: "3 hours ago", source: "Bloomberg Quint" },
  { title: "Nifty In Technical Charts: Ranging June And Rise Thereafter", time: "4 hours ago", source: "Bloomberg Quint" },
];

const News = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Today's news and events</h2>
      <ul>
        {dummyNews.map((news, index) => (
          <li key={index} className="mb-4">
            <a href="#" className="text-blue-500">{news.title}</a>
            <div className="text-gray-500 text-sm">
              {news.time} - {news.source}
            </div>
          </li>
        ))}
      </ul>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">See All</button>
    </div>
  );
};

export default News;
