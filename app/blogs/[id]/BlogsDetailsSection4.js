import React from "react";

const BlogsDetailsSection4 = () => {
  return (
    <div className="px-[5%] py-20">
      <h4 className="text-main text-[1.1rem] font-semibold">Comment</h4>
      <h3 className="mt-4 text-white text-[2.5rem] font-semibold">
        Leave a Reply
      </h3>
      <p
        style={{ lineHeight: "30px" }}
        className="text-[1.1rem] text-body mt-4"
      >
        Your email address will not be published. Required fields are marked *
      </p>
      <form>
        <div className="mt-4 textarea-hover">
          <label
            className="text-white text-[1.1rem] font-medium"
            htmlFor="comment"
          >
            Comment*
          </label>
          <textarea id="comment" className="bg-background2 h-40 outline-none text-white p-4 text-[1rem]   w-full mt-4 border-b border-stroke" />
        </div>
        <div className="mt-4 input-hover">
          <label
            className="text-white text-[1.1rem] font-medium"
            htmlFor="name"
          >
            Name*
          </label>
          <input type="text" id="name" className="bg-background2  outline-none text-white p-4 text-[1rem]   w-full mt-4 border-b border-stroke" />
        </div>
        <div className="mt-4 input-hover">
          <label
            className="text-white text-[1.1rem] font-medium"
            htmlFor="email"
          >
            Email*
          </label>
          <input type="email" id="email" className="bg-background2  outline-none text-white p-4 text-[1rem]   w-full mt-4 border-b border-stroke" />
        </div>
        <div className="mt-4 input-hover">
          <label
            className="text-white text-[1.1rem] font-medium"
            htmlFor="website"
          >
            Website*
          </label>
          <input type="text" id="website" className="bg-background2  outline-none text-white p-4 text-[1rem]   w-full mt-4 border-b border-stroke" />
        </div>
        <div className="mt-4 flex items-center gap-3">
          <input type="checkbox" id="check" className="accent-main  " />
          <label
            className="text-body text-[1rem] font-medium"
            htmlFor="check"
          >
          Save my name, email, and website in this browser for the next time I comment.
          </label>
        </div>
          <button type="submit" className="text-[0.9rem] text-black py-3 font-medium px-12 bg-main rounded-full hover-main mt-6">Post comment</button>
      </form>
    </div>
  );
};

export default BlogsDetailsSection4;
