
export const tableCustomStyles = {
    header: {
      style: {
        fontSize: "22px",
        color: "white",
        backgroundColor: "#e91e63",
        minHeight: "56px",
        paddingLeft: "16px",
        paddingRight: "8px",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#fafafa",
        minHeight: "56px",
        borderBottomWidth: "1.5px",
        borderBottomColor: "#1293e1",
        borderBottomStyle: "solid",
      },
      denseStyle: {
        minHeight: "32px",
      },
    },
    headCells: {
      style: {
        fontSize: "1rem",
        fontWeight: 700,
        color: "#616161",
        paddingLeft: "16px",
        paddingRight: "16px",
      },
      activeSortStyle: {
        color: "#1293e1",
        "&:focus": {
          outline: "none",
        },
        "&:hover:not(:focus)": {
          color: "#1293e1",
        },
      },
      inactiveSortStyle: {
        "&:focus": {
          outline: "none",
          color: "#1293e1",
        },
        "&:hover": {
          color: "#4dbbff",
        },
      },
    },
  };