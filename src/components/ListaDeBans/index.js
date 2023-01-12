import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { useEffect } from 'react';
import { api } from '../../axios/api';
import { timestampToDate } from '../../helpers/util';
import { styled } from '@mui/material/styles';

const columns = [
  { id: 'bid', label: '', minWidth: 10 },
  { id: 'player_nick', label: 'NICK DO JOGADOR', align: 'center', minWidth: 170 },
  { id: 'ban_reason', label: 'MOTIVO DO BAN', align: 'center', minWidth: 170 },
  { id: 'server_name', label: 'SERVIDOR', align: 'center', minWidth: 100 },
  { id: 'admin_nick', label: 'ADMINISTRADOR', align: 'center', minWidth: 100 },
  {id: 'ban_created', label: 'DATA', align: 'center', minWidth: 100, format: (value) => timestampToDate(value)}
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

export const ListaDeBans = () => {

  const [listaBan, setListaBan] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    const bans = async () => {
        setListaBan(await api.getAllBans(1));
    }
    bans();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', maxWidth: '1200px', margin: 'auto', marginTop: '30px' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>            
            {listaBan.bans &&
                listaBan.bans.map((row, key) => {               
                    return (
                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={key}>
                        {columns.map((column) => {                           
                        const value = row[column.id];
                        return (
                          <StyledTableCell  key={column.id} align="center">
                            {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                            </StyledTableCell >
                        );
                        })}
                    </StyledTableRow>
                    );
                })
            }
           
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
