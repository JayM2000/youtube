import { ModeToggle } from "@/components/Theming/ModeToggle";
import { SearchIcon } from "lucide-react";

const SarchInput = () => {
  return (
    <form className="flex w-full max-w-[600px]">
      <div className="relative w-full rounded-l-full ">
        {/* <div className="absolute inset-0 bg-[url('/night-sky.jpg')] bg-cover bg-left pointer-events-none z-0"></div> */}
        <input
          type="text"
          placeholder="Search"
          className="z-10 w-full pl-4 py-2 pr-12 rounded-l-full border focus:outline-none focus:border-[var(--hover-search-border-color)]"
        />
      </div>

      <button
        type="submit"
        className="px-5 py-2.5 border border-l-0 rounded-r-full hover:bg-[var(--btn-search-hover-bg)] disabled:opacity-50 hover:cursor-pointer transition delay-0 duration-250 ease-in-out"
      >
        <SearchIcon className="size-5" />
      </button>
      {/* <div>helloworld</div> */}

      <ModeToggle />
    </form>
  );
};

export default SarchInput;
