import { useState, useEffect } from "react";

export const Avatar = ({ userId }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await fetch("");
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
  }, [userId]);

  if (loading) return <p className="avatar-loading-mess">Loading...</p>;
  if (error) return <p className="avatar-error-mess">No image</p>;
  if (!avatarUrl) return <p className="avatar-error-mess">No image</p>;

  return <img src={avatarUrl} alt="User Avatar" className="user-avatar" />;
};
