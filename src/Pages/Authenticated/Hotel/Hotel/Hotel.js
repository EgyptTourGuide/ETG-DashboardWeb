import React, { useEffect, useState } from 'react'
import Card from '../../../../components/Card/Card'
import Layout from '../../../../layout/Layout'
import { URL } from '../../../../api/api'
import axios from 'axios'
import Loading from '../../../../components/Loading'

const Hotel = (props)=>{
    const [loading, setLoading] = useState(true)
    const [hotel, setHotel] = useState(null)

    useEffect(()=>{
        async function getHotel(){
            try{
            const response = await axios.get(`${URL}/hotels/${props.match.params.id}`)
            setHotel(response.data)
            }catch(e){
                console.log(e)
            }
            setLoading(false)
        }

        getHotel()
    }, [props])


    if(loading)
    return <Layout><Loading /></Layout>
    else
    return(
        <Layout to='/hotels' head={`Hotels / ${hotel ? `${hotel.name}` : 'Hotel Name'}`}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
               <Card title='About' />
               <Card title='Media' to={`${props.match.params.id}/media/`} />
               <Card title='Requests' to={`${props.match.params.id}/requests`}/>
               <Card title= 'Rooms' to={{pathname: `${hotel && hotel.id}/rooms`}} />
               <Card title= 'Form' to={{pathname: `${hotel && hotel.id}/form`}} />
               <Card title= 'Reviews' to={{pathname: `${hotel && hotel.id}/reviews`}} />
            </div>
        </Layout>
    )
}

export default Hotel