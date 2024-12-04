import React, { useState, useEffect, useRef } from "react";
import "./Notification.css"

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);

  const fetchNotifications = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8080/api/notifications`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      } else {
        const errorData = await response.json();
        console.error("Lỗi khi lấy thông báo:", errorData.message);
      }

    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const markAsRead = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8080/api/notifications/${id}/read`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification.id === id
              ? { ...notification, read: true }
              : notification
          )
        );
        const data = await response.json();
        if (data.postId)
          window.location.href = `/blog/${data.postId}`;
      } else {
        const errorData = await response.json();
        console.error("Lỗi khi đánh dấu thông báo là đã đọc:", errorData.message);
      }

    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  return (
    <div className="notification-container" style={{ position: "relative" }}>
      <button onClick={toggleDropdown} className="notification-bell">
        🔔
      </button>
      {isOpen && (
        <div ref={dropdownRef} className="notification-dropdown">
          <h4>Notitfications</h4>
          <ul>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`notification-item ${!notification.read ? "unread" : ""}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <img src="https://images.spiderum.com/sp-xs-avatar/c3edf44040da11e88c56e97b1d97fbce.png" alt="Icon" className="notification-icon" />
                  <div>
                    <p className="notification-message">{notification.title}</p>
                    <span className="notification-date">{notification.message}</span>
                  </div>
                </li>
              ))
            ) : (
              <p>No notifications</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
