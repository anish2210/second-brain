import { CrossIcon } from "../icons/CrossIcon";
import { TickMarkIcon } from "../icons/TickMarkIcon";
import { Button } from "./Button";
import { Input } from "./Input";

export function CreateComponentModal({ open, onClose }) {
  return (
    <div>
      {open && (
        <div
          className="w-screen h-screen fixed top-0 left-0 flex justify-center"
          style={{ backgroundColor: "rgba(108, 117, 125, 0.7)" }}
        >
          <div className="flex flex-col justify-center">
            <span className="bg-green-600 gap-4 py-4 px-8 rounded-md flex flex-col">
              <div className="flex justify-end">
                <div className="cursor-pointer hover:scale-125 transition-transform duration-300">
                  <div onClick={onClose}>
                    <CrossIcon size="lg" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Input placeholder={"Title"} />
                <Input placeholder={"Link"} />
              </div>
              <div>
                <Button
                  variant="primary"
                  text="Add"
                  startIcon={<TickMarkIcon size="md" />}
                />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}


