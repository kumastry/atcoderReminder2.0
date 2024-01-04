import { useEffect, useState } from "react";

const useUserName = () => {
  const [userName, setUserName] = useState<string>("");

  // ローカルストレージからユーザー名を取得する
  useEffect(() => {
    if (localStorage.user) {
      const userName_localst = JSON.parse(localStorage.user);
      setUserName(userName_localst);
    }
  }, []);

  // ユーザー名が入力されたらローカルストレージに保存する
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userName));
  }, [userName]);

  return { userName, setUserName };
};

export default useUserName;
