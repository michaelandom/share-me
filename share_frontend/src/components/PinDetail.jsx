import React, { useEffect, useState } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { client, urlFor } from "../client";
import MasonryLayout from "./MasonryLayout";
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data";
import Spinner from "./Spinner";
const PinDetail = ({ user }) => {
  const { pinId } = useParams();
  const [pins, setPins] = useState();
  const [pinDetail, setPinDetail] = useState();
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const addComment = () => {
    if (comment) {
    setAddingComment(true);
    client
      .patch(pinId)
      .setIfMissing({ comments: [] })
      .insert("after", "comments[-1]", [
        {
          comment,
          _key: uuidv4(),
          postedBy: {
            _type: "postedBy",
            _ref: user._id,
          },
        },
      ]).commit().then(() =>{

        fetchPinDetails();
        setComment('');
        setAddingComment(false);
      });
    }

    };
  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);
    if (query) {
      client.fetch(query).then((data) => {
        setPinDetail(data[0]);
        if (data[0]) {
          query = pinDetailMorePinQuery(data[0]);
          client.fetch(query).then((res) => {
            setPins(res);
          });
        }
      });
    }
  };
  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  if (!pinDetail) return <Spinner message="loading pin .." />;

  return (
      <>
    <div className="flex flex-col xl:flex-row   m-auto bg-white max-w-[1500px] rounder-[32px]">
      <div className="flex justify-center items-center md:items-start flex-initial">
        <img
          src={pinDetail?.image && urlFor(pinDetail?.image).url()}
          alt="image"
          className="rounded-r-3xl  max-w-sm"
        />
      </div>
      <div className="w-full p-5 flex-1 xl:min-w-620 ">
        <div className="flex items-center justify-between ">
          <div className="flex gap-2 items-center">
            <a
              href={`${pinDetail.image.asset.url}?dl=`}
              download
              onClick={(e) => e.stopPropagation()}
              className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
            >
              <MdDownloadForOffline />
            </a>
          </div>
          <a href={pinDetail.price} target="_blank" rel="noreferrer" className="text-lg font-bold text-green-500">
            {/* {pinDetail.price} */}
            {`${pinDetail.price} Br`}

          </a>
        </div>
        <div>
          <h1 className="text-2xl font-semibold  mt-3">
            {pinDetail.title}
          </h1>
          <p className="text-2xl font-medium text-gray-400 break-words mt-3">{pinDetail.about} </p>
        </div>
        <Link
          to={`/user-profile/${pinDetail?.postedBy?._id}`}
          className="flex gap-2 mt-5 items-center bg-white rounded-lg"
        >
          <img
            src={pinDetail?.postedBy?.image}
            alt="userImage"
            className="w-8 h-8 rounded-full object-cover"
          />
          <p className="font-semibold capitalize ">
            {pinDetail?.postedBy?.userName}
          </p>
        </Link>
        <h2 className="mt-5 text-2xl">Comments</h2>
        <div className="max-h-370 overflow-y-auto">
          {pinDetail?.comments?.map((comment, i) => (
            <div
              className="flex items-center mt-5 gap-2 bg-white rounded-lg "
              key={i}
            >
              <img
                src={comment.postedBy.image}
                alt="user-profile"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              <div className="flex flex-col">
                <p className="font-bold ">{comment.postedBy.userName}</p>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap mt-6 gap-3">
          <Link to={`/user-profile/${pinDetail?.postedBy?._id}`}>
            <img
              src={pinDetail?.postedBy?.image}
              alt="userImage"
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
            />
          </Link>
          <input
            type="text"
            className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
            placeholder="add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="button"
            className=" bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
            onClick={addComment}
          >
            {addingComment ? "Adding Comment ..." : "Comment"}
          </button>
        </div>
      </div>
    
    
    </div>
      {pins?.length!==0 ?(
        <>
        <h2 className="text-center font-bold text-2xl mt-8 mb-4 ">
            More like this
        </h2>
        <MasonryLayout pins={pins}/>
        </>
    ):(
      <Spinner message="Loading more pins..."/>
    )}
    </>
  );
};

export default PinDetail;
