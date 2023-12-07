import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const ProductDescription = () => {
  const router = useRouter();
  const { productId } = router.query;

  return (
    <>
      <div className="shop-section my-8">
        <ul className="nav gap-2" role="tablist">
          <li className="nav-item" role="presentation">
            <Link href={`/marketplace/${productId}`} className="cmn-btn active">
              Product Description
            </Link>
          </li>
          <li className="nav-item" role="presentation">
            <Link
              href={`/marketplace/${productId}/shipping`}
              className="cmn-btn alt third"
            >
              Shipping
            </Link>
          </li>
          <li className="nav-item" role="presentation">
            <Link
              href={`/marketplace/${productId}/review`}
              className="cmn-btn alt third"
            >
              Review
            </Link>
          </li>
          <li className="nav-item" role="presentation">
            <Link
              href={`/marketplace/${productId}/author`}
              className="cmn-btn alt third"
            >
              Author
            </Link>
          </li>
        </ul>
      </div>
      <div className="tab-content">
        <div className="description">
          <h4 className="mb-4">About this item</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias
            exercitationem accusamus deleniti dolores architecto officiis
            cupiditate magnam pariatur dignissimos odit illo officia quisquam,
            repellat harum consequatur dolore dolor. Magnam similique voluptate
            excepturi rem dignissimos, vel culpa exercitationem cupiditate
            veniam voluptatem, perspiciatis dolores. Voluptas nisi a unde ex
            doloremque, neque architecto?
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductDescription;
