import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { URL, authAxios } from '../../../../api/api'
import Loading from '../../../../components/Loading'
import MediaCard from '../../../../components/MediaCard/MediaCard'
import Layout from '../../../../layout/Layout'
import axios from 'axios'
import Field from '../../../../components/Field/Field'
import Button from '../../../../components/Button/Button'


const List = styled.div`
display: flex; 
flex-wrap: wrap; 
justify-content: center; 
align-items: center;
margin-top: 15px;
margin-bottom: 15px;

`

const PlaceMedia = (props)=>{

    const [ data, setData ] = useState(null)
    const [ loadingPage, setLoadingPage] = useState(true)
    const [ loading, setLoading ] = useState(false)
    const [ percent, setPrecent ] = useState(0)
    const [ message, setMessage ] = useState('')
    const [ files, setFiles ] = useState([])
     
    // Get Data from api


    useEffect(()=>{
        const getInfo = async()=>{
            try{
                let res = await axios.get(`${URL}/places/${props.match.params.id}`)
                setData({name: res.data.place.name, media: res.data.place.media})
                setLoadingPage(false)
            }catch(e){
                setLoadingPage(false)
                console.log(e)
            }
            return
        }
        getInfo()
    }, [props])

   const options = {
    onUploadProgress: (event)=>{
        const { loaded, total } = event
        let percent = Math.round( (loaded * 100) / total )
        setPrecent(percent)
    }
   }

   const save = async()=>{
        setLoading(true)
        try{
        let res
        if(files.length > 0){
            const fd = new FormData()
            fd.append('old', JSON.stringify(data.media))
            for(let i = 0; i < files.length; i++){
                fd.append(`media`, files[i])
            }
            
             res = await authAxios.put(`${URL}/places/${props.match.params.id}/media`, fd ,options)
        }else{
            let d = data.media
             res = await authAxios.put(`${URL}/places/${props.match.params.id}/media`, {old: d} ,options)
        }   
         setLoading(false)
         if(res.status === 200){
            setMessage('Saved')
            setData({...data, media: res.data.media})
         }
        }catch(e){
            setMessage('Error!')
            console.log(e)
            setLoading(false)
        }
    }
    const onDelete = async(index)=>{
        let d = data.media
        d.splice(index, 1)
        try{
           let res = await authAxios.put(`${URL}/places/${props.match.params.id}/media`, {old: d} ,options)
           if(res.status === 200)
            setData({...data, media: res.data.media})
        }catch(e){
           console.log(e)
        }
    }

    
    if(loadingPage) return <Layout><Loading /></Layout>
    else
    return(
       <Layout to={{pathname: `/places/${props.match.params.id}`}} head={`${data.name} / Media`}>
           <div style={{
                marginTop: 12,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottom: '2px dotted black'
                
            }}>
           <Field 
                label='Media'
                placeholder= 'Add Media ..'
                onChange={(event)=>setFiles(event.target.files)} 
                files={files}
                loading={loading}
                percent={percent}
                type='file'
                multiple
           />
            <Button 
                width={100} 
                fontSize={13} 
                height={30} 
                style={{margin: 15}}
                onClick={save}
                disabled={loading}
            >
                Save
            </Button>
            <p style={{margin: 4, padding: 0, fontSize: 13}}>{message}</p>
            </div>

           <List>
            {data.media.map((img, index)=>{
                if(img.includes('mp4')) return <MediaCard onDelete={onDelete} key={index} index={index} video={img} />
                else return <MediaCard onDelete={onDelete} key={index} index={index} image={img} />
             })} 
            </List>
       </Layout>
    )
}

export default PlaceMedia