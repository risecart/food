export default function Gift({ promo }: { promo: number }) {
  return (
    <div className="flex justify-center w-full overflow-hidden transform scale-[0.7] pt-[100px] min-h-[200px]">
      <div className="relative box">
        {/* Top Text */}
        <div className="img relative flex flex-col items-center translate-y-[-70px] z-0 animate-trImage">
          <div className="bd absolute top-0 left-[-100%] right-[-100%] flex flex-col items-center justify-center text-4xl max-[570px]:text-2xl">
            <h1 className="">Toutes Nos Félicitations</h1>
            <h1 className="font-bold text-primary max-[600px]:text-4xl">-{promo} DZD</h1>
          </div>
        </div>

        {/* Gift Box */}
        <div className="box-body relative mt-[123.33px] h-[200px] w-[200px] bg-gradient-to-b from-[#762c2c] to-[#ff0303] rounded-b-[5%] shadow-md cursor-pointer animate-box-body after:content-[''] after:absolute after:top-0 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[50px] after:bg-gradient-to-b after:from-[var(--primary-color)] after:to-white">
          {/* Lid */}
          <div className="box-lid absolute z-10 left-1/2 -translate-x-1/2 bottom-[90%] w-[220px] h-[40px] bg-[#cc231e] rounded-[5%] shadow-md after:content-[''] after:absolute after:top-0 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[50px] after:bg-gradient-to-b after:from-white after:to-[var(--primary-color)]">
            {/* Bowtie */}
            <div className="box-bowtie relative h-full z-[1] before:content-[''] before:w-[83.33px] before:h-[83.33px] before:border-[16.66px] before:border-[var(--primary-color)] before:rounded-[50%_50%_0_50%] before:absolute before:bottom-[99%] before:left-1/2 before:-translate-x-full before:skew-[10deg,10deg] before:z-[-1] after:content-[''] after:w-[83.33px] after:h-[83.33px] after:border-[16.66px] after:border-[var(--primary-color)] after:rounded-[50%_50%_0_50%] after:absolute after:bottom-[99%] after:left-1/2 after:rotate-90 after:skew-[10deg,10deg] after:z-[-1]" />
          </div>
        </div>
      </div>
    </div>
  );
}
