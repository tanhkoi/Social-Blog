import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash, faMinus } from "@fortawesome/free-solid-svg-icons";
import {
  getReportItems,
  deleteReportItem,
  getPostByCommentId,
  ignoreReportItem,
} from "./reportItemService";

const ReportItemList = () => {
  const [reportItems, setReportItems] = useState([]);
  const [resolvedUrls, setResolvedUrls] = useState({});

  useEffect(() => {
    fetchReportItems();
  }, []);

  const fetchReportItems = async () => {
    const items = await getReportItems();
    setReportItems(items);

    const urlMap = {};
    await Promise.all(
      items.map(async (item) => {
        if (item.type !== "Post") {
          const post = await getPostByCommentId(item.contentId);
          urlMap[item.contentId] = `/blog/${post}`;
        }
      })
    );
    setResolvedUrls(urlMap);
  };

  const handleDelete = async (id, type, contentId) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      await deleteReportItem(id, type, contentId);
      fetchReportItems();
    }
  };

  const handleIgnore = async (id) => {
    if (window.confirm("Are you sure you want to ignore this report?")) {
      await ignoreReportItem(id);
      fetchReportItems();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Report Items</h2>
      <table className="w-full bg-white border border-gray-200 rounded shadow-md">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-4 px-6 text-left">#</th>
            <th className="py-4 px-6 text-left">Content ID</th>
            <th className="py-4 px-6 text-left">Type</th>
            <th className="py-4 px-6 text-left">User Report ID</th>
            <th className="py-4 px-6 text-left">Percent Toxic</th>
            <th className="py-4 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reportItems.map((item, index) => (
            <tr key={item.id} className="border-b">
              <td className="py-4 px-6">{index + 1}</td>
              <td className="py-4 px-6">{item.contentId}</td>
              <td className="py-4 px-6">{item.type}</td>
              <td className="py-4 px-6">{item.userReportId === null ? "anomynous" : item.userReportId}</td>
              <td className="py-4 px-6">{item.percentToxic.toFixed(2)}%</td>
              <td className="py-4 px-6">
                <Link
                  to={
                    item.type === "Post"
                      ? `/blog/${item.contentId}`
                      : resolvedUrls[item.contentId] || "#"
                  }
                  className="bg-white border-white text-green-500 hover:text-green-700 mx-1"
                >
                  <FontAwesomeIcon icon={faEye} />
                </Link>
                <button
                  onClick={() => handleDelete(item.id, item.type, item.contentId)}
                  className="bg-white border-white text-red-500 hover:text-red-700 mx-1"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button
                  onClick={() => handleIgnore(item.id)}
                  className="bg-white border-white text-blue-500 hover:text-blue-700 mx-1"
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportItemList;
