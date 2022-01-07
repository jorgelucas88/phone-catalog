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
  {
    id: "color",
    label: "Color",
    minWidth: 170,
    align: "right",
  },
  {
    id: "price",
    label: "Price",
    minWidth: 170,
    align: "right",
  },
  {
    id: "screen",
    label: "Screen",
    minWidth: 170,
    align: "right",
  },
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
  screen: string;
  processor: string;
  ram: string;
}

export default function PhoneTable() {
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

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log("newPage", newPage);
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

  React.useEffect(() => {
    fetchDataFromBackend(0, 10);
  }, []);

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
        console.log(totalRows, r.data.phones.length, r.data.total, "<");
      });
  };

  const showPhoneDetails = (phone: IPhoneData) => {
    console.log(phone);
  };

  return (
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
            {rows
              //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: IPhoneData) => {
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
    </Paper>
  );
}
