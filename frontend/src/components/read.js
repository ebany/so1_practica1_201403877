import { Table, Button } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Read() {
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        axios.get(`http://192.168.122.220:8080/cars`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])

    const deleteData = (registration) => {
        axios.delete(`http://192.168.122.220:8080/cars/${registration}`)
            .then(success => {
                window.location.reload();
            }).catch(error => {
                console.log(error);
                window.alert("Error: no se ha podido eliminar el vehículo")
            })
    }

    return (
        <div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Placa</Table.HeaderCell>
                        <Table.HeaderCell>Marca</Table.HeaderCell>
                        <Table.HeaderCell>Modelo</Table.HeaderCell>
                        <Table.HeaderCell>Serie</Table.HeaderCell>
                        <Table.HeaderCell>Color</Table.HeaderCell>
                        <Table.HeaderCell>...</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row>
                                <Table.Cell>{data.Registration}</Table.Cell>
                                <Table.Cell>{data.Brand}</Table.Cell>
                                <Table.Cell>{data.Model}</Table.Cell>
                                <Table.Cell>{data.Series}</Table.Cell>
                                <Table.Cell>{data.Color}</Table.Cell>
                                <Table.Cell>
                                    <Button className='btn btn-primary'>Editar</Button>
                                    <Button onClick={() => deleteData(data.Registration)} className='btn btn-danger'>Eliminar</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}