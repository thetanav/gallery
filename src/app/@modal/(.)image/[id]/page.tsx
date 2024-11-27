import Image from "next/image";
import Modal from "~/app/_components/Modal";
import { Button } from "~/components/ui/button";

export default function Page({
  params: { id: imageId },
}: {
  params: { id: string };
}) {
  return (
    <Modal>
      <Image src="/thumb.jpeg" width={500} height={500} alt="a user photo" className="mr-1 rounded min-w-96 select-none" draggable="false" />
      <div className="mt-2 flex justify-between">
        <div>
        <h3 className="text-lg font-bold">Image.jpg</h3>
        <p className="text-sm text-primary/70">Author: tanav</p>
        <p className="text-sm text-primary/70">Uploaded: 27 nov 2025</p>
        </div>
        <div>
          <Button variant={"destructive"} size={"sm"}>delete</Button>
        </div>
      </div>
    </Modal>
  );
}
