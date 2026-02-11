"use client";
import getImages from "@/lib/getImages";

import { Star } from "lucide-react";
import Image from "next/image";

import { Rating } from "react-simple-star-rating";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/store/hooks";

interface DefaultRatingProps {
  RatingCount: number;
  width?: number;
}

interface ReviewWidgetProps {
  image: string;
  name: string;
  date: string;
  rating: number;
  Review: string;
}

interface ReviewsSectionProps {
  id?: number;
  reviews: ReviewFull[];
}

const ReviewWidget = ({
  image,
  date,
  name,
  Review,
  rating,
}: ReviewWidgetProps) => {
  return (
    <div className="flex flex-col border-1 rounded-md p-4">
      <div className=" flex space-x-4 ">
        <div className="flex-shrink-0 pt-0.5">
          <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-10 w-10 text-lg ring-1 ring-white dark:ring-neutral-900">
            <Image
              className="absolute inset-0 w-full h-full object-cover rounded-full"
              src={getImages(image)}
              width={40}
              height={40}
              alt={name}
            />
          </div>
        </div>
        <div className="flex-1 flex justify-between text-start">
          <div className="text-sm sm:text-base">
            <span className="block font-semibold dark:text-gray-200">
              {name}
            </span>
            <span
              dir="ltr"
              className="block mt-0.5 text-slate-500 dark:text-slate-400 text-sm  rtl:text-end"
            >
              {moment(date).format("YYYY-MM-DD HH:MM")}
            </span>
          </div>
          <div className="mt-0.5 flex text-yellow-500">
            <DefaultRating width={25} RatingCount={rating} />
          </div>
        </div>
      </div>
      <div className="mt-4 prose prose-sm sm:prose dark:prose-invert sm:max-w-2xl">
        <p className="text-slate-600 dark:text-slate-300">{Review}</p>
      </div>
    </div>
  );
};

function DefaultRating({ RatingCount, width }: DefaultRatingProps) {
  return (
    <Rating
      SVGstyle={{
        display: "inline-flex",
        width: width,
      }}
      className="inline-flex"
      initialValue={RatingCount}
      readonly
    />
  );
}

const ReviewsSection = ({ id, reviews }: ReviewsSectionProps) => {
  const { t } = useTranslation();
  const isShow = useAppSelector(
    (state) => state.theme.theme?.ProductSetting.Reviews
  );
  /*  const [param, setParam] = useState<FillterReviews>({
    limit: 2,
    page: 1,
    product: id.toString(),
  });
 
  const [reviews, setReviews] = useState<ReviewFull[]>([]);
  const { data, refetch, isLoading } = reviewsService.useReviews(param);

  useEffect(() => {
    refetch().then((res) => {
      if (res?.data) {
        setReviews((prev) => [...prev, ...res?.data?.data]);
      }
    });
  }, [id, param]);*/

  return (
    isShow && (
      <div className="p-1">
        <hr className="p-5" />
        <h2 className="text-2xl font-semibold dark:text-gray-200 flex items-center ">
          <Star className="w-8 h-8 pb-1 text-yellow-500" />
          <span className="ml-1.5"> {t("reviews")}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2  mt-10">
          {reviews.map((item) => (
            <ReviewWidget
              key={item.id}
              Review={item.description}
              date={item.created_at}
              image={item.image}
              name={item.firstName + " " + item.lastName}
              rating={item.Rating}
            />
          ))}
        </div>
        {/*<div className="mt-10 md:lg:text-start text-center w-fit m-auto">
        {data?.data?.length === param.limit && (
          <Button
            variant={"outline"}
            className="px-6 py-2 disabled:opacity-50 "
            onClick={() => {
              const nextPage = param.page + 1;
              const nextParams = { ...param, page: nextPage };
              setParam(nextParams);
            }}
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner /> : t("showMore")}
          </Button>
        )}
        {isLoading && <LoadingSpinner />}
      </div>*/}
      </div>
    )
  );
};

export default ReviewsSection;
