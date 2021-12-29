import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

import { categories } from "../utils/data";
import { client } from "../client";
import Spinner from "./Spinner";

const CreatePin = ({ user }) => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState();
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState();
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();
  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];
    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpeg" ||
      type === "image/gif" ||
      type === "image/tiff"
    ) {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log("image upload error", error);
        });
    } else {
      setWrongImageType(true);
      setLoading(false);
    }
  };
  return (
    <div className='flex flex-col justify-center items-center mt-5 lg:h-4/5'>
      {fields && (
        <p className='text-red-500 mb-5 text-xl transition-all duration-150 ease-in '>
          Please add all fields.
        </p>
      )}
      <div className='flex flex-col lg:flex-row justify-center items-center bg-white  p-3 lg:p-5 w-full lg:w-4/5 '>
        <div className='bg-secondaryColor p-3 flex flex-0.7 w-full '>
          <div className='flex justify-center items-center flex-col border-2  border-dotted border-gray-300 p-3 w-full h-420'>
            {loading && <Spinner />}
            {wrongImageType && <p>Wrong Image type</p>}
            {!imageAsset ? (
              <label>
                <div className='flex flex-col items-center justify-center h-full '>
                  <div className='flex flex-col justify-center items-center'>
                    <p className='font-bold text-2xl '>
                      <AiOutlineCloudUpload />
                    </p>
                    <p className='text-lg'>click to upload</p>
                  </div>
                  <p className='mt-32 text-gray-400'>
                    use high-quality JPG,SVG, PNG, GIF or TIFF lass the 20MB
                  </p>
                </div>
                <input
                  type='file'
                  name='upload-image'
                  onChange={uploadImage}
                  className='hidden'
                />
              </label>
            ) : (
              <div className='relative h-full'>
                <img
                  src={imageAsset?.url}
                  alt='uploaded image'
                  className='h-full w-full'
                />
                <button
                  type='button'
                  name='upload-image'
                  onChange={uploadImage}
                  className='absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                  onClick={() => setImageAsset(null)}>
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full'>
        <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Add your title here'
            className='outline-none text-2xl sm:text-3xl fount-bold border-b-2 border-gray-200  p-2'
          /> 
          {user && (
            <div className='flex gap-2 my-2 items-center bg-white rounded-lg '>
              <img
                src={user.image}
                alt='user'
                className='w-10 h-10 rounded-full'
              />
              <p className='font-bold'>{user.userName}</p>
            </div>
          )}
           <input
            type='text'
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder='Add your about here'
            className='outline-none text-2xl sm:text-3xl fount-bold border-b-2 border-gray-200  p-2'
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
