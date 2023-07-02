import { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable() {
  const [uploadsData, setUploadsData] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/files`)
      .then((response) => setUploadsData(response.data));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Original name</TableCell>
            <TableCell align="center">File name Server</TableCell>
            <TableCell align="center">created_date</TableCell>
            <TableCell align="center">start_period</TableCell>
            <TableCell align="center">end_period</TableCell>
            <TableCell align="center">size</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {uploadsData.map((file) => (
            <TableRow
              key={file.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {file.original_name}
              </TableCell>
              <TableCell align="center">{file.filename_server}</TableCell>
              <TableCell align="center">{file.created_date}</TableCell>
              <TableCell align="center">{file.start_period}</TableCell>
              <TableCell align="center">{file.end_period}</TableCell>
              <TableCell align="center">{file.size} KB</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
