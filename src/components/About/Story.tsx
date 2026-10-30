import story from "../../assets/about-story.jpg";

export default function Story() {
  return (
    <section className="mt-[48px] flex flex-col items-center gap-[40px] md:flex-row md:gap-[64px]">
      <div className="w-full md:w-[50%]">
        <h1 className="text-[36px] font-[700] md:text-[48px]">Our Story</h1>
        <p className="mt-[32px] text-[16px]">Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in Bangladesh. Supported by a wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 million customers across the region.</p>
        <p className="mt-[24px] text-[16px]">Exclusive has more than 1 million products to offer, growing at a very fast pace. Exclusive offers a diverse assortment in categories ranging from consumer goods.</p>
      </div>
      <img src={story} alt="Two people shopping together" className="w-full rounded-[4px] object-cover md:w-[50%]" />
    </section>
  );
}
