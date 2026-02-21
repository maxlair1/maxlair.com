import * as React from 'react';

import Table from '@components/Table';
import TableRow from '@components/TableRow';
import TableColumn from '@components/TableColumn';

export default function Tools():React.ReactNode {
    return (
        <>
            <Table>
                <TableRow title="Stuff">
                    <TableColumn>
                        <p>This is some stuff</p>
                    </TableColumn>
                    <TableColumn>
                        <p>This is some stuff</p>
                    </TableColumn>
                    <TableColumn>
                        <p>This is some stuff</p>
                    </TableColumn>
                    <TableColumn>
                        <p>This is some stuff</p>
                    </TableColumn>
                </TableRow>
            </Table>
        </>
    )
}