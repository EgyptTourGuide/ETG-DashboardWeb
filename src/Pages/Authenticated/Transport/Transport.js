import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { URL } from '../../../api/api'
import Card from '../../../components/Card/Card'
import Loading from '../../../components/Loading'
import Layout from "../../../layout/Layout"

const Transport = (props)=>{
     
    let [name, setName] = useState(null)
    let [loading, setLoading] = useState(true)

    useEffect(()=>{
        const getT = async()=>{
          let res = await axios.get(`${URL}/transport/${props.match.params.id}`)
          setName(res.data.transport.driverName)
          console.log(res.data)
          setLoading(false)
        }
        getT()
    }, [])

    if(loading) return <Layout><Loading /></Layout>
    return (
    <Layout head={`Transport / ${name}`}>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
          <Card to={`/transports/${props.match.params.id}/about`} title='About'/>
          <Card to={`/transports/${props.match.params.id}/hours`} title='Hours'/>
      </div>
    </Layout>
    
    )
}

export default Transport