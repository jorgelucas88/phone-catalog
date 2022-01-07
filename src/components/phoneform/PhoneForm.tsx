import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Image from "material-ui-image";
import { useRef, Component } from "react";

interface IPhoneData {
  id: number;
  dateAdded: Date;
  name: string;
  manufacturer: string;
  description: string;
  color: string;
  price: number;
  image?: Buffer;
  screen: string;
  processor: string;
  ram: string;
  deletedAt?: Date;
}

interface IFormDialogParams {
  open: boolean;
  setOpen: any;
  phoneDetails: IPhoneData | null;
  handlePhoneDelete: any;
  handlePhoneUpdate: any;
  handlePhoneSave: any;
}
export default function FormDialog(params: IFormDialogParams) {

  const [newPhoneDataName, setNewPhoneDataName] = React.useState<string>();
  const [newPhoneDataManufacturer, setNewPhoneDataManufactorer] = React.useState<string>();
  const [newPhoneDataDescription, setNewPhoneDataDescription] = React.useState<string>();
  const [newPhoneDataColor, setNewPhoneDataColor] = React.useState<string>();
  const [newPhoneDataPrice, setNewPhoneDataPrice] = React.useState<number>();
  const [newPhoneDataProcessor, setNewPhoneDataProcessor] = React.useState<string>();
  const [newPhoneDataScreen, setNewPhoneDataScreen] = React.useState<string>();
  const [newPhoneDataRam, setNewPhoneDataRam] = React.useState<string>();

  const handleClose = () => {
    params.setOpen(false);
  };

  const handlePhoneDelete = () => {
    params.handlePhoneDelete(params.phoneDetails!.id);
  };

  const handlePhoneUpdate = () => {
    params.handlePhoneUpdate(params.phoneDetails);
  };

  const handlePhoneSave = () => {
    params.handlePhoneSave({ name: newPhoneDataName, manufacturer: newPhoneDataManufacturer, description: newPhoneDataDescription, color: newPhoneDataColor, price: newPhoneDataPrice, processor: newPhoneDataProcessor, ram: newPhoneDataRam });
  };

  const setFieldValue = (field: string, value: string | number) => {
    switch (field) {
      case "name": params.phoneDetails ? params.phoneDetails!.name = value as string : setNewPhoneDataName(value as string); break;
      case "manufacturer": params.phoneDetails ? params.phoneDetails!.manufacturer = value as string : setNewPhoneDataManufactorer(value as string); break;
      case "description": params.phoneDetails ? params.phoneDetails!.description = value as string : setNewPhoneDataDescription(value as string); break;
      case "color": params.phoneDetails ? params.phoneDetails!.color = value as string : setNewPhoneDataColor(value as string); break;
      case "price": params.phoneDetails ? params.phoneDetails!.price = value as number : setNewPhoneDataPrice(value as number); break;
      case "processor": params.phoneDetails ? params.phoneDetails!.processor = value as string : setNewPhoneDataProcessor(value as string); break;
      case "screen": params.phoneDetails ? params.phoneDetails!.screen = value as string : setNewPhoneDataProcessor(value as string); break;
      case "ram": params.phoneDetails ? params.phoneDetails!.ram = value as string : setNewPhoneDataRam(value as string); break;
      default:
        break;
    }
  };

  return (
    <div>
      <Dialog open={params.open}>
        <DialogTitle>Phone details</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            onChange={(event) =>
              setFieldValue(event.target.id, event.target.value)
            }
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={params.phoneDetails?.name}
          />
          <TextField
            onChange={(event) =>
              setFieldValue(event.target.id, event.target.value)
            }
            autoFocus
            margin="dense"
            id="manufacturer"
            label="Manufacturer"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={params.phoneDetails?.manufacturer}
          />
          <TextField
            onChange={(event) =>
              setFieldValue(event.target.id, event.target.value)
            }
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={params.phoneDetails?.description}
          />
          <TextField
            onChange={(event) =>
              setFieldValue(event.target.id, event.target.value)
            }
            autoFocus
            margin="dense"
            id="color"
            label="Color"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={params.phoneDetails?.color}
          />
          <TextField
            onChange={(event) =>
              setFieldValue(event.target.id, event.target.value)
            }
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
            defaultValue={params.phoneDetails?.price}
          />
          <img src={params.phoneDetails?.image?.toString("ascii")} />
          <TextField
            onChange={(event) =>
              setFieldValue(event.target.id, event.target.value)
            }
            autoFocus
            margin="dense"
            id="processor"
            label="Processor"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={params.phoneDetails?.processor}
          />
          <TextField
            onChange={(event) =>
              setFieldValue(event.target.id, event.target.value)
            }
            autoFocus
            margin="dense"
            id="screen"
            label="Screen"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={params.phoneDetails?.screen}
          />
          <TextField
            onChange={(event) =>
              setFieldValue(event.target.id, event.target.value)
            }
            autoFocus
            margin="dense"
            id="ram"
            label="Ram"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={params.phoneDetails?.ram}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {params.phoneDetails && (
            <Button onClick={handlePhoneDelete}>Delete</Button>
          )}
          <Button
            onClick={params.phoneDetails ? handlePhoneUpdate : handlePhoneSave}
          >
            Save{params.phoneDetails && " changes"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
