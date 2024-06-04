import { useState, useEffect } from "react";

export const Avatar = ({ id }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const apikey = import.meta.env.VITE_API_KEY;
  const API = `${apikey}/user/${id}`;

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await fetch(API);
        if (!response.ok) {
          throw new Error("Failed at fetching avatar from database");
        }
        const data = await response.json();
        setAvatarUrl(data.avatarUrl);
      } catch (error) {
        console.error("Failed at fetching avatar", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAvatar();
  }, [id]);

  if (loading) return <p className="avatar-loading-mess">Loading...</p>;
  if (error) return <p className="avatar-error-mess">No image</p>;
  if (!avatarUrl) return <p className="avatar-error-mess">No image</p>;

  return <img src={avatarUrl} alt="User Avatar" className="user-avatar" />;
};
