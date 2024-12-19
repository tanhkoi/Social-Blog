// src/components/ReportItemList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getReportItems, deleteReportItem, getPostByCommentId, ignoreReportItem } from './reportItemService';

const ReportItemList = () => {
  const [reportItems, setReportItems] = useState([]);
  const [resolvedUrls, setResolvedUrls] = useState({}); // To store resolved URLs for comments

  useEffect(() => {
    fetchReportItems();
  }, []);

  const fetchReportItems = async () => {
    const items = await getReportItems();
    setReportItems(items);

    // Resolve URLs for items that are not of type 'Post'
    const urlMap = {};
    await Promise.all(
      items.map(async (item) => {
        if (item.type !== 'Post') {
          const post = await getPostByCommentId(item.contentId);
          urlMap[item.contentId] = `/blog/${post}`;
        }
      })
    );
    setResolvedUrls(urlMap);
  };

  const handleDelete = async (id, type, contentId) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      await deleteReportItem(id, type, contentId);
      fetchReportItems();
    }
  };

  const handleIgnore = async (id) => {
    if (window.confirm('Are you sure you want to ignore this report?')) {
      await ignoreReportItem(id);
      fetchReportItems();
    }
  };

  return (
    <div>
      <h1>Report Items</h1>
      <table border="1" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Content ID</th>
            <th>Type</th>
            <th>User Report ID</th>
            <th>Percent Toxic</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reportItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.contentId}</td>
              <td>{item.type}</td>
              <td>{item.userReportId}</td>
              <td>{item.percentToxic}</td>
              <td>
                <Link
                  to={
                    item.type === 'Post'
                      ? `/blog/${item.contentId}`
                      : resolvedUrls[item.contentId] || '#'
                  }
                >
                  View
                </Link>
                |{' '}
                <button onClick={() => handleDelete(item.id, item.type, item.contentId)}>Delete</button> |{' '}
                <button onClick={() => handleIgnore(item.id)}>Ignore</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportItemList;
