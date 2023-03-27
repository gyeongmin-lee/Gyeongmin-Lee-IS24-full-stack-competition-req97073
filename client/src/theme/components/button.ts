const Button = {
  variants: {
    solid: {
      bg: "brand1",
      color: "white",
      _hover: {
        opacity: 0.8,
        bg: "brand1",
        textDecoration: "underline",
      },
    },
    outline: {
      border: "2px solid",
      borderColor: "brand1",
      color: "brand1",
      _hover: {
        opacity: 0.8,
        textDecoration: "underline",
        bg: "brand1",
        color: "white",
      },
    },
  },
};

export default Button;
