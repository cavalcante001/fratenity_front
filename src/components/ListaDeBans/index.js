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

export const ListaDeBans = () => {

  const [listaBan, setListaBan] = useState([]);
  const [page, setPage] = React.useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    const bans = async () => {
        const lista = await api.getAllBans(1)
        setListaBan(lista.bans);
        setTotalPage(lista.total_page);
    }
    bans();
  }, []);

  const handleChangePage = async (event, newPage) => {
    let lista = await api.getAllBans(newPage + 1)
    setListaBan(lista.bans);
    setTotalPage(lista.total_page);
    setPage(newPage);
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
            {listaBan &&
                listaBan.map((row, key) => {               
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
        count={totalPage}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
}
