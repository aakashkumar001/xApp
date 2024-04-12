import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function () {
  return (
    <div className="px-6 py-4 hidden lg:block ">
      <div className="rounded-xl flex flex-col gap-5">
        <h2 className="text text-black text-xl font-semibold">Who to follow</h2>
          <div key={1} className="h-14">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png"/>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <p className="text-black font-semibold text-sm">{"unknown"}</p>
              <p className="text-neutral-600 text-sm">@{"unknown"}</p>
            </div>
            <div key={2} className="h-14">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="">
                <p className="text-black font-semibold text-sm">{"klaseen"}</p>
                <p className="text-neutral-600 text-sm">@{"klaseen"}</p>
              </div>
              <div key={3} className="h-14">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="">
                  <p className="text-black font-semibold text-sm">{"virat"}</p>
                  <p className="text-neutral-600 text-sm">@{"virat"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
