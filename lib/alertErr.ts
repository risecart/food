import { toast } from "sonner";

export default function alertErr(err: any) {
  toast.error(
    (err.response ? err.response.data.message : err.message) ||
      "something went wrong"
  );
}
