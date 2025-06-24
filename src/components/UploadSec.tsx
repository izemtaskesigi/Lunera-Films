import "./UploadSec.css";
import Button1 from "./Button1";
interface props {
  upload: () => void;
  id?: string;
}
function UploadSec({ upload, id }: props) {
  return (
    <div>
      <Button1 name="Upload File" id="uploadBut" onClick={}></Button1>
    </div>
  );
}
export default UploadSec;
