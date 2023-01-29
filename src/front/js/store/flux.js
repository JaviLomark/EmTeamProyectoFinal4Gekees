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
      like:[]
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
				const newStore = {...getStore()}

				newStore.like = [...newStore.like, item]

				setStore(newStore);
			}
    },
  };
};

export default getState;
