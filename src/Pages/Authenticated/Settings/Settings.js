import React from 'react'
import Layout from '../../../layout/Layout'
import Card from '../../../components/Card/Card'

const Settings = (props)=>{

    return(
        <Layout head='Settings'>
        <div style={styles.cardContainer}>
        <Card title='My Account' to='/profile'/>
        <Card title='Place / Activity' to='settings/place'/>
        <Card title='Admin' to='settings/admin'/>
        <Card title='Guide' to='settings/Guide'/>
        <Card title='Hotel' to='settings/hotel'/>
        </div>
        </Layout>
    )
}

const styles = {
    cardContainer: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexWrap: 'wrap'
    }
}




export default Settings