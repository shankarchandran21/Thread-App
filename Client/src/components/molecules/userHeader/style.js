export const center = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap:1,
    
}

export const headerSpaceBetween = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: "row",
    width:"100%"
}

export const iconContainer=(theme) => ({
    borderRadius: "50%",
    padding: "8px",
    width: "40px",
    height: "40px",
    transition: "background-color color 0.3s ease-in-out",
    cursor: "pointer",
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: "#fff",
    },
  })