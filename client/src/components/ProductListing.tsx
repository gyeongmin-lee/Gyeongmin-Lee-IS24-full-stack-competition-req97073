import {
  Badge,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import format from "date-fns/format";
import { memo, useMemo } from "react";
import { CellProps, Column, useTable } from "react-table";
import { Methodology, Product } from "../types";
import EditProductDrawer from "./EditProductDrawer";

interface Props {
  /**
   * Products to render.
   */
  products: Product[];
}

const DevelopersCell = ({ value: devs }: { value: string[] }) => {
  if (devs.length === 1) return <div>{devs[0]}</div>;
  return (
    <Tooltip
      placement="bottom-start"
      label={
        <ul>
          {devs.slice(1).map((dev) => (
            <li key={dev}>{dev}</li>
          ))}
        </ul>
      }
      aria-label={`Developers: ${devs.join(", ")}`}
    >
      <HStack>
        <Text>{devs[0]}</Text>
        <Badge>
          <Text fontWeight="medium">+{devs.length - 1}</Text>
        </Badge>
      </HStack>
    </Tooltip>
  );
};

/**
 * `ProductListing` is a memoized component that renders a table of products.
 * It uses `react-table` to render the table.
 */
const ProductListing = memo(({ products }: Props) => {
  const columns = useMemo<Column<Product>[]>(
    () => [
      {
        Header: () => null,
        accessor: "productId",
        id: "editProduct",
        // The `Cell` property returns a button that opens the edit product drawer
        Cell: ({ cell: { value } }: CellProps<Product, number>) => {
          const product = products.find((p) => p.productId === value);
          return <EditProductDrawer product={product} />;
        },
      },
      {
        Header: "ID",
        accessor: "productId",
      },
      {
        Header: "Name",
        accessor: "productName",
        Cell: ({ cell: { value } }: CellProps<Product, string>) => (
          <Text fontSize={15} fontWeight="bold">
            {value}
          </Text>
        ),
      },
      {
        Header: "Owner",
        accessor: "productOwnerName",
      },
      {
        id: "developers",
        Header: "Developers",
        accessor: "Developers",
        Cell: ({ cell: { value } }: CellProps<Product, string[]>) => (
          <DevelopersCell value={value} />
        ),
      },
      {
        Header: "Scrum Master",
        accessor: "scrumMasterName",
      },
      {
        Header: "Start Date",
        accessor: (row: Product) => new Date(row.startDate),
        Cell: ({ cell: { value } }: CellProps<Product, Date>) => (
          <div>{format(value, "yyyy/MM/dd")}</div>
        ),
      },
      {
        Header: "Methodology",
        accessor: "methodology",
        Cell: ({ cell: { value } }: CellProps<Product, Methodology>) => (
          <Badge
            colorScheme={value === Methodology.AGILE ? "green" : "blue"}
            size="sm"
            fontWeight={"normal"}
          >
            {value}
          </Badge>
        ),
      },
    ],
    [products]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<Product>({ columns, data: products });

  return (
    <TableContainer w="full">
      <Table size="sm" {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
});

export default ProductListing;
