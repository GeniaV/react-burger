import PropTypes from "prop-types";

export const type = {
  category: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.oneOf(["bun", "main", "sauce"]),
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number,
    }).isRequired
  ).isRequired,
};

// export const typeOfIngredient = {
//   category: PropTypes.shape({
//     __v: PropTypes.number,
//     _id: PropTypes.string,
//     calories: PropTypes.number,
//     carbohydrates: PropTypes.number,
//     fat: PropTypes.number,
//     image: PropTypes.string,
//     image_large: PropTypes.string,
//     image_mobile: PropTypes.string,
//     name: PropTypes.string,
//     price: PropTypes.number,
//     proteins: PropTypes.number,
//     type: PropTypes.oneOf(["bun", "main", "sauce"]),
//   }).isRequired,
// };
