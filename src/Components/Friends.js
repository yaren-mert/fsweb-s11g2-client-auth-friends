import React from "react";
import { useSelector } from "react-redux";

export default function Friends() {
  const friends = useSelector((store) => store.friendLists);
  console.log(friends);
  return (
    <div>
      <p className="mt-12 font-bold ">Friends List</p>
      {friends.map((friend) => (
        <p className="font-bold my-8 mx-6">
          -{friend.name}-{friend.email}
        </p>
      ))}
    </div>
  );
}
