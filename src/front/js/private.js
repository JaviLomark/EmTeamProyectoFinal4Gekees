import config from "./config";

export const onPrivate = (setDisabled, navigate, { namePage }) => {
  const tokenOBJ = localStorage.token;
  if (!tokenOBJ) {
    navigate("/");
    return;
  }

  const tokenData = JSON.parse(tokenOBJ);

  fetch(`${config.HOSTNAME}/api/${namePage}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokenData.token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then(() => {
      setDisabled(false);
    });
};
