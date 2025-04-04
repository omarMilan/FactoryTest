import Do from "./do";
import Done from "./done";

export default function TaskHolder() {
  return (
    <div className="max-sm:ml-[25px] max-md:ml-[50px] max-lg:ml-[75px] ml-[75px] flex items-center flex-col mt-[45px] w-full pr-10">
      <div className="font-semibold flex text-[48px] border-b-[2.5px] border-Primary w-full pb-2 text-Primary">
        To Do List
      </div>
      <div className="flex flex-row gap-x-10">
        <Do />
        <Done />
      </div>
    </div>
  );
}
