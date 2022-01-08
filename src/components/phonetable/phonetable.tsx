import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import FormDialog from "../phoneform/PhoneForm";
import { useConfirm } from "material-ui-confirm";
import Loader from "react-loader-spinner";
import { Button } from "@mui/material";

interface Column {
  id: "name" | "manufacturer" | "color" | "price" | "screen";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "manufacturer", label: "Manufacturer", minWidth: 100 },
  { id: "color", label: "Color", minWidth: 170, align: "right" },
  { id: "price", label: "Price", minWidth: 170, align: "right" },
  { id: "screen", label: "Screen", minWidth: 170, align: "right" },
];

interface IPhoneData {
  id: number;
  dateAdded: Date;
  name: string;
  manufacturer: string;
  description: string;
  color: string;
  price: number;
  image: Buffer;
  uploadFile?: File;
  uploadFileName?: string;
  screen: string;
  processor: string;
  ram: string;
  deletedAt?: Date;
}

export default function PhoneTable() {
  const confirm = useConfirm();
  const phones: IPhoneData[] = [];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [loading, setLoading]: [boolean, (loading: boolean) => void] =
    React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] =
    React.useState("");
  const [rows, setRows]: [IPhoneData[], (rows: IPhoneData[]) => void] =
    React.useState(phones);
  const [totalRows, setTotalRows]: [number, (totalRows: number) => void] =
    React.useState<number>(0);

  const [phonePopupOpen, setPhonePopupOpen] = React.useState(false);
  const [phonePopupData, setPhonePopupData] = React.useState<IPhoneData | null>(
    null
  );

  React.useEffect(() => {
    fetchDataFromBackend(0, 10);
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    fetchDataFromBackend(newPage, rowsPerPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    fetchDataFromBackend(0, +event.target.value);
    setPage(0);
  };

  const fetchDataFromBackend = (page: number, pageSize: number) => {
    setLoading(true);
    axios
      .get("http://localhost:3000/phones", {
        params: { page: page, pageSize: pageSize },
      })
      .then((r) => {
        setRows(r.data.phones);
        setTotalRows(r.data.total);
        setLoading(false);
      });
  };

  const showPhoneDetails = (phone: IPhoneData) => {
    setPhonePopupOpen(!phonePopupOpen);
    setPhonePopupData(phone);
  };
  const newPhone = () => {
    setPhonePopupOpen(!phonePopupOpen);
    setPhonePopupData(null);
  }

  const handlePhoneDelete = (phoneId: number) => {
    confirm({ description: "Are you sure you want to delete?" })
      .then(() => {
        setLoading(true);
        setPhonePopupOpen(false);
        axios.delete("http://localhost:3000/phones/" + phoneId).then((r) => {
          fetchDataFromBackend(0, rowsPerPage);
        });
      })
      .catch(() => {
        console.log("catch");
      });
  };
  const handlePhoneUpdate = (bodyFormData: FormData) => {
    confirm({
      description: "Are you sure you want to update the phone details?",
    })
      .then(() => {
        setLoading(true);
        setPhonePopupOpen(false);
        axios
          .patch("http://localhost:3000/phones", bodyFormData)
          .then((r) => {
            setLoading(false);
            confirm({
              title: "Success",
              description: "Phone updated",
              cancellationText: "",
            }).then(() => {});
          })
          .catch((e) => {
            console.error(e);
            setLoading(false);
            fetchDataFromBackend(0, rowsPerPage);
            confirm({
              title: "Error",
              description: "An error occurred. Please try again later",
              cancellationText: "",
            }).then(() => {});
          });
      })
      .catch(() => {});
  };
  const handlePhoneSave = (bodyFormData: FormData) => {
        setLoading(true);
        setPhonePopupOpen(false);
        
        axios
          .post("http://localhost:3000/phones", bodyFormData)
          .then((r) => {
            setLoading(false);
            fetchDataFromBackend(0, rowsPerPage);
            confirm({
              title: "Success",
              description: "Phone created",
              cancellationText: "",
            }).then(() => { 
            });
          })
          .catch((e) => {
            console.error(e);
            setLoading(false);
            confirm({
              title: "Error",
              description: "An error occurred. Please try again later",
              cancellationText: "",
            }).then(() => {});
          });
  }
  const handleRemoveImage = (phone: IPhoneData) => {
    confirm({
        description: "Are you sure you want to delete this phone image?",
      })
        .then(() => {
          axios
            .delete("http://localhost:3000/phones/image/"+phone.id)
            .then((r) => {
              setLoading(false);
              setPhonePopupOpen(false);
              fetchDataFromBackend(page, rowsPerPage);
              confirm({
                title: "Success",
                description: "Phone updated - Phone image deleted",
                cancellationText: "",
              }).then(() => {});
            })
            .catch((e) => {
              console.error(e);
              confirm({
                title: "Error",
                description: "An error occurred. Please try again later",
                cancellationText: "",
              }).then(() => {});
            });
        })
        .catch(() => {});
  }

  return (
    <div>
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader type="Circles" color="#00BFFF" height={80} width={80} />
        </div>
      ) : (
        <div>
          <Button variant="outlined" style={{float: "right", "margin": "0 0 5px 0" }} onClick={newPhone}>New</Button>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row: IPhoneData) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                        onClick={() => showPhoneDetails(row)}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[1, 10, 25, 100]}
              component="div"
              count={totalRows}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <FormDialog
              open={phonePopupOpen}
              setOpen={setPhonePopupOpen}
              phoneDetails={phonePopupData}
              handlePhoneDelete={handlePhoneDelete}
              handlePhoneUpdate={handlePhoneUpdate}
              handlePhoneSave={handlePhoneSave}
              handleRemoveImage={handleRemoveImage}
            />
          </Paper>
        </div>
      )}
    </div>
  );
}
