import React, { useState } from 'react';
import { Button, Form, Item } from 'semantic-ui-react'
import axios from 'axios';

export default function Create() {
    const [registration, setRegistration] = useState('');
    const [brand, setBrand] = useState('');
    const [modelAux, setModelAux] = useState('');
    const [series, setSeries] = useState('');
    const [color, setColor] = useState('');
    const postData = () => {

        let model = Number(modelAux);
        //http://192.168.122.220:8080
        axios.post(`host.docker.internal:8080/cars`, {
            registration,
            brand,
            model,
            series,
            color
        }).then(success => {
            window.alert("Vehículo agregado")
            setRegistration('');
            setBrand('');
            setModelAux('');
            setSeries('');
            setColor('');
            window.location.href = '/';
        }).catch(error => {
            console.log(error);
            window.alert("Error: no se ha podido agregar el vehículo")
        })
    }

    return (
        <div className='main'>
            <Form className="create-form">
                <Form.Field>
                    <label className='space-between'>Placa</label>
                    <input value={registration} className='space-between' placeholder='Número de placa' onChange={(e) => setRegistration(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label className='space-between'>Marca</label>
                    <input value={brand} className='space-between' placeholder='Marca del vehículo' onChange={(e) => setBrand(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label className='space-between'>Modelo</label>
                    <input value={modelAux} className='space-between' placeholder='Modelo del vehículo' onChange={(e) => setModelAux(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label className='space-between'>Serie</label>
                    <input value={series} className='space-between' placeholder='Serie del modelo' onChange={(e) => setSeries(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label className='space-between'>Color</label>
                    <input value={color} className='space-between' placeholder='Nombre del color' onChange={(e) => setColor(e.target.value)} />
                </Form.Field>
                <Button onClick={postData} disabled={!registration || !brand || !modelAux || !series || !color} type='submit'>Agregar carro</Button>
            </Form>
        </div>
    )
}