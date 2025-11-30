import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogsDetailsSection3 = () => {
  return (
    <section className="px-[5%]">
      <h4 className="text-main text-[1.1rem] font-semibold">blog</h4>
      <h3 className="mt-4 text-white text-[2.5rem] font-semibold">
        Related Articles
      </h3>
      <p style={{lineHeight:"30px"}} className="text-[1.1rem] text-body max-w-[512px] mt-4">
        Commodo elementum, sed imperdiet nunc euismod etiam aliquet viverra
        enim. Adipiscing nunc{" "}
      </p>


      <div className="flex items-center gap-8 mt-6 flex-wrap relative">
      {Array.from({ length: 3 }).map((_, index) => (
        <Link
        href='/blogs/details'
          key={index}
          style={{ flex: "1 1 30%" }}
          className="bg-background2 min-w-[250px] rounded-lg overflow-hidden cursor-pointer relative"
        >
          <Image
            src="/blogs.png"
            height="100"
            alt="blog"
            width="200"
            className="w-full h-[15rem] object-cover"
          />
          <div className="p-3">
            <h4 style={{letterSpacing:"1px"}} className="text-white text-[1rem] font-semibold">
              Purus porta feugiats dia sed ipsum enim gravida lectus.
            </h4>
            <p className="text-body text-[0.9rem] my-2">
              September 10, 2022 No Comments
            </p>
          </div>
        </Link>
      ))}
      </div>
    </section>
  );
};

export default BlogsDetailsSection3;
