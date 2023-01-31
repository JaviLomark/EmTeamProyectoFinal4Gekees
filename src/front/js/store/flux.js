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
      like: [],
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
      addToLike: (item) => {
        const store = getStore();
        let found = store.like.find((cand) => cand.id === item.id);
        let newLike;
        if (found) {
          newLike = store.like.filter((cand) => cand.id !== item.id);
        } else {
          newLike = [...store.like, item];
        }
        setStore({ like: newLike });
      },
    },
  };
};

export default getState;
