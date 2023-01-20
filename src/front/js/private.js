import config from "./config";

export const onPrivate = (setDisabled, navigate) => {
  const tokenOBJ = localStorage.token;
  if (!tokenOBJ) {
    navigate("/");
    return;
  }

  const tokenData = JSON.parse(tokenOBJ);

  fetch(`${config.HOSTNAME}/api/private`, {
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

// ${namePage}
// , { namePage }
