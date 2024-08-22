import React from "react";
import Modal from "react-modal";
import { SiYoutubekids } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { deleteRecipe } from "../../store/registration/AdditemSlice";

export default function LocalCard({ recipe, id }) {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const status = useSelector((state) => state.ActiveReducer.active);
  const active = status[status.length - 1]?.activestatus;

  function handelClick() {
    if (active) {
      localStorage.setItem("id", id);
      localStorage.setItem("idMeal", recipe.idMeal);
      navigator("/recipepage");
    } else {
      navigator("/");
    }
  }

  function handelUpdate() {
    localStorage.setItem("id", id);
    localStorage.setItem("idMeal", recipe.idMeal);
    navigator("/update");
  }

  function handleDelete() {
    // Ensure you have imported and defined `dispatch` and `deleteRecipe`
    dispatch(deleteRecipe({ idMeal: recipe.idMeal }));

    localStorage.setItem("idMeal", recipe.idMeal);

    closeModal();
    console.log("Delete functionality executed.");
  }

  // ----modal

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="mx-3 my-4 col-span-1 hover:scale-105 transition duration-300 p-2 object-cover border-2 dark:border-white rounded-lg dark:bg-black dark:text-white shadow-2xl shadow-yellow-300 dark:shadow-gray-300 bg-orange-500">
      <div>
        <div onClick={handelClick}>
          <img
            className="object-cover lg:h-[450px]"
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
          />
        </div>
        <div className="flex justify-between mt-5 items-center">
          <div className="text-2xl font-bold">{recipe.strMeal}</div>
          <div className="flex mx-4 my-2">
            <button
              className="py-2 mx-2 bg-black text-white dark:bg-white dark:text-black hover:scale-110 text-md rounded-md px-2"
              onClick={openModal}
            >
              <MdDeleteForever />
            </button>
            <button
              className="py-2 bg-black text-white dark:bg-white dark:text-black hover:scale-110 text-md rounded-md px-2"
              onClick={handelUpdate}
            >
              <FaEdit />
            </button>
          </div>
        </div>
        <div className="flex justify-between  matemasie-font">
          <div>{recipe.strArea} Dish</div>
          <div className="text-3xl text-red-700 mb-3 mx-4">
            <Link target="_blank" to={recipe.strYoutube}>
              <SiYoutubekids />
            </Link>
          </div>
        </div>
      </div>
      <div>
        {/* <button onClick={openModal}>Open Modal</button> */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          // style={customStyles}
          className="dark:bg-black dark:text-white w-[600px] h-[200px] m-auto mt-52 p-10 bg-orange-100 lobster-font"
          contentLabel="Example Modal"
        >
          <h2 className="text-black text-3xl  font-bold dark:text-white">
            Are you Sure of Remove this food item ?
          </h2>
          {/* <button onClick={closeModal}>close</button> */}
          <div className="mt-10">
            <button
              className="py-1 mx-5 px-3 bg-red-600 rounded-md text-xl text-white"
              onClick={handleDelete}
            >
              Remove
            </button>
            <button
              className="py-1 px-3 bg-slate-600 rounded-md text-xl text-white"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
