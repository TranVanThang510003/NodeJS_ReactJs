
import { useState, useEffect } from "react";
import { getUserApi } from "../util/api";
import type { User } from "../types/user.js";
export const useUsers = () => {
  const [users, setUsers] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getUserApi();
        setUsers(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { users, loading, error };
};

