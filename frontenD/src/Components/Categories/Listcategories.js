import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../Features/categorieSlice";
import AfficheCategories from "../Categories/AfficheCategories";
const Listcategories = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div>
      <AfficheCategories />
    </div>
  );
};
export default Listcategories;
