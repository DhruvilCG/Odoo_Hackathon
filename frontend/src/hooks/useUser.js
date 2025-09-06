import { useEffect, useState } from "react";

export default function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("https://your-api.com/api/auth/profile", {
          credentials: "include", // send HTTP-only cookies
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setUser(null);
      }
    };

    fetchProfile();
  }, []);

  return user;
}
