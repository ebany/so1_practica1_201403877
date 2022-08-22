import { Table, Button } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Read() {
    const [searchValue, setSearchValue] = useState('');
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        //http://192.168.122.220:8080
        axios.get(`host.docker.internal:8080/cars`)
            .then((response) => {
                localStorage.clear();
                setAPIData(response.data);
            })
    }, [])

    const deleteData = (registration) => {
        axios.delete(`host.docker.internal:8080/cars/${registration}`)
            .then(success => {
                window.location.reload();
            }).catch(error => {
                console.log(error);
                window.alert("Error: no se ha podido eliminar el vehículo")
            })
    }

    const editData = (registration) => {
        APIData.forEach(x => {
            if (x.Registration === registration) {
                console.log(x);
                localStorage.setItem("edit", JSON.stringify(x))
                window.location.href = '/update'
            }
        })
    }

    const search = (key, value) => {
        axios.get(`host.docker.internal:8080/cars?${key}=${value}`)
            .then((response) => {
                localStorage.clear();
                setAPIData(response.data);
            }).catch(error => {
                setAPIData([]);
            })
    }

    return (
        <div className='space-between'>
            <div>
                <h4 className='space-between'>Buscar</h4>
                <Button disabled={!searchValue} onClick={() => search('brand', searchValue)} className='btn btn-secondary space-between'>Marca</Button>
                <Button disabled={!searchValue} onClick={() => search('model', searchValue)} className='btn btn-warning space-between'>Modelo</Button>
                <Button disabled={!searchValue} onClick={() => search('color', searchValue)} className='btn btn-success space-between'>Color</Button>
                <input value={searchValue} className='space-between' placeholder='...' onChange={(e) => setSearchValue(e.target.value)} />
            </div>
            <hr className='width-all'></hr>
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
                                    <Button onClick={() => editData(data.Registration)} className='btn btn-primary space-between'>Editar</Button>
                                    <Button onClick={() => deleteData(data.Registration)} className='btn btn-danger space-between'>Eliminar</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}