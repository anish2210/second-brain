import { useState, useEffect } from "react";
import axios from "axios";

export function useContent() {
  const [contents, setContents] = useState([]);
  const url = import.meta.env.VITE_BACKEND_URL;

  const fetchContents = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setContents(response.data.content || []);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  const refresh = () => {
    fetchContents();
  };

  useEffect(() => {
    fetchContents();
  }, []);

  return { contents, refresh };
}