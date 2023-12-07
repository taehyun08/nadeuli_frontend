import Image from "next/image";
import Link from "next/link";

const FriendRequestCard = ({ friend }) => {
  const { img, name } = friend;

  return (
    <div className="single-box p-5">
      <div className="avatar">
        <Image className="avatar-img w-100" src={img} alt="avatar" />
      </div>
      <Link href="/public-profile/post">
        <h6 className="m-0 mb-2 mt-3">{name}</h6>
      </Link>
      <div className="btn-area mt-3">
        <button className="cmn-btn">Request</button>
      </div>
    </div>
  );
};

export default FriendRequestCard;
