const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      rol: null,
      userId: null,
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      setRol: (rol) => {
        setStore({ rol: rol });
      },

      setUserId: (userId) => {
        setStore({ userId });
      },
    },
  };
};

export default getState;
