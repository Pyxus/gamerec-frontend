import { useState, useEffect } from "react";
import { Badge } from "@mantine/core";

const OK = 0;
const ERR = 1;

const ServerStatus = () => {
  const [serverStatus, setServerStatus] = useState(ERR);

  useEffect(() => {
    const checkServerHealth = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/health`
        );

        if (response.ok) {
          setServerStatus(OK);
        } else {
          setServerStatus(ERR);
        }
      } catch (error) {
        setServerStatus(ERR);
      }
    };

    checkServerHealth();
  }, []);

  return (
    <div>
      {serverStatus === OK ? (
        <Badge color="teal">Server Online!</Badge>
      ) : (
        <div>
          <Badge color="red">Error Connecting With Server!</Badge>
          <p>
            The server is hosted on a free service which pauses ever 24hrs so
            this may be why.
          </p>
        </div>
      )}
    </div>
  );
};

export default ServerStatus;
