import React, { useEffect, useState } from 'react';
import { Bounce } from 'react-reveal';
import { Button, Dimmer, Form, Icon, Input, Loader, Modal, Pagination, Select, TextArea } from 'semantic-ui-react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../Assets/breadCrumb'
import axios from 'axios';
import {toast } from 'react-toastify';
import SKLT from '../../AssetsM/usedSlk';

const EditModal = ({setModalS,EditRegion,editRegionD,setRegionEdit,modalS,Gouvernorat}) =>{
    return(<>
            <Modal
                    size='mini'
                    open={modalS}
                    dimmer = 'blurring'
                    closeIcon
                    onClose={() => setModalS(false)}
                    onOpen={() => setModalS(true)}
                >
                    <Modal.Header><h4>Modifier Region</h4></Modal.Header>
                    <Modal.Content>                        
                            <h5 className='mb-1'>Gouvernorat</h5>
                                <Select placeholder='Choisir Une Gouvernement' options={Gouvernorat}  defaultValue={editRegionD.Gouv}  className='w-100 shadow-sm rounded mb-3' onChange={(e, data) => setRegionEdit({...editRegionD, Gouv: data.value })} />
                            <h5 className='mb-1'>Region </h5>
                            <Input icon='map pin' iconPosition='left' value={editRegionD.Localisation} placeholder='Non de la Region' className='w-100 border-0 rounded '   onChange={(e) => setRegionEdit({...editRegionD, Localisation: e.target.value })}/>
                            <br />
                    </Modal.Content>
                    <Modal.Actions>
                                <Button  className=' bg-system-btn rounded-pill' onClick={EditRegion}>  <Icon name='save' /> Enregistrer </Button>
                    </Modal.Actions>
            </Modal>
    </>)
}
const DeleteModal = ({setDeleteModalS,DeleteRegion,editRegionD,setRegionEdit,deletemodalS}) =>{
    return(<>
            <Modal
                    size='mini'
                    open={deletemodalS}
                    dimmer = 'blurring'
                    closeIcon
                    onClose={() => setDeleteModalS(false)}
                    onOpen={() => setDeleteModalS(true)}
                    
                >
                    <Modal.Header><h4>Supprimer Region</h4></Modal.Header>
                    <Modal.Content>
                            Voulez-Vous Vraimment Supprimer Cette Region 
                            <br />
                            <br />
                            <div className='mb-0 p-0'><h5> Gouvernorat : {editRegionD.Gouv}</h5></div>         
                            <div><h5> Localisation : {editRegionD.Localisation} </h5></div>
                    </Modal.Content>
                    <Modal.Actions>
                                {/* <Button className='rounded-pill' negative onClick={ () => setDeleteModalS(false)}> <span className='bi bi-x' ></span> </Button> */}
                                <Button negative className='rounded-pill' onClick={DeleteRegion}>  <Icon name='trash' /> Supprimer </Button>
                    </Modal.Actions>
            </Modal>
    </>)
}

function ClientRegions() {
    //variables
    const [familleList, setFamillesList] = useState([]);
    const [displayFamille, setDisplayFamille] = useState([]);
    const [saveBtnState, setSaveBtnState] = useState('')
    const [updateFT, setUpdateFT] = useState('')
    const [regionD, setRegionD] = useState([])
    const [editRegionD, setRegionEdit] = useState([])
    const [modalS, setModalS] = useState(false)
    const [deletemodalS, setDeleteModalS] = useState(false)
    const [loaderState, setLS] = useState(false)
    const [loading , setLoading] = useState(false)
    const [activePage , setActivePage] = useState(1)
    const Gouvernorat = [
        { key: '1', value: 'SILIANA', text: 'SILIANA' },
        { key: '2', value: 'KEF', text: 'EL KEF' },
        { key: '3', value: 'BEJA', text: 'BEJA' },
        { key: '4', value: 'JENDOUBA', text: 'JENDOUBA' },
    ]

    //useEffect
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/client/map`, {
            tag: GConf.SystemTag,
          })
          .then(function (response) {
            setFamillesList(response.data)
            setLoading(true)
            setDisplayFamille(response.data.slice(0,5));
          })
    }, [updateFT])
    
    //functions
    const SaveRegion = () => {
        if (!regionD.Gouv) {toast.error("Non de La famille est Invamlide !", GConf.TostErrorGonf)}
        else if (!regionD.Localisation) {toast.error("Description est Invamlide !", GConf.TostErrorGonf)}
        else{

            setLS(true)
            axios.post(`${GConf.ApiLink}/client/map/ajouter`, {
                tag : GConf.SystemTag,
                regionD : regionD,
            }).then(function (response) {
                if(response.data.affectedRows) {
                    setSaveBtnState('disabled')
                    toast.success("Famille Ajouter avec Suucess", GConf.TostSuucessGonf)
                    setRegionD([])
                    setLS(false)
                    setUpdateFT(Math.random() * 10)
                }
                else{
                    toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                    setLS(false)
                }
            })
        }
    }
    const EditRegion = () => {
        setLS(true)
        axios.post(`${GConf.ApiLink}/client/map/modifier`, {
            tag : GConf.SystemTag,
            editRegionD : editRegionD,
        }).then(function (response) {
            console.log(response.data)
            if(response.data.affectedRows) {
                setModalS(false)
                toast.success("Famille Modifier avec Suucess", GConf.TostSuucessGonf)
                setUpdateFT(Math.random() * 10)
                setLS(false)
            }
            else{
                setModalS(false)
                toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                setLS(false)
            }
            
        })
        

    }
    const DeleteRegion = () =>{

    }
    const checkFamilleExistance = () =>{
        if(regionD.Name){
            if(regionD.Name in familleList) {
                toast.error("Famille Deja Exist", GConf.TostErrorGonf)
                setRegionD({...regionD, Name: '' })
            } 
        }
    }

    const openEditModal = (event,selected) =>{
        setRegionEdit({PK: event.PK , Gouv:event.Gouv, Localisation:event.Localisation})
        selected ? setModalS(true) : setDeleteModalS(true)
    }
    const handlePaginationChange = (e,{ activePage }) =>{
        setActivePage(activePage)
        let start = 5 * (activePage - 1)
        let end = 5*  activePage
        setDisplayFamille(familleList.slice(start, end));
    }


    //card
    const RegionCard = (props) =>{
        return(<>
                <div className='card p-2 shadow-sm mb-2'>
                    <div className='row'>
                        <div className='col-10'>
                        <div className="d-flex p-0">
                                <div className="flex-shrink-0 align-self-center">
                                    {/* <img className='rounded-circle' width="35px" src="https://system.anaslouma.tn/Assets/images/old-profile.jpg" alt="user-img" /> */}
                                    <span className='bi bi-geo-fill bi-md system-color'></span>
                                </div>
                                <div className="flex-grow-1 ms-2">
                                    <h6 className='mb-1'>{props.data.Localisation}</h6>
                                    <small> {props.data.Gouv} </small>
                                </div>
                            </div>
                        </div>
                        <div className='col-2 align-self-center text-end'>
                                <Button  icon='edit outline' size='mini' className='rounded-circle bg-system-btn' onClick={() => openEditModal(props.data,true)}/>
                                <Button  icon='trash alternate' size='mini' className='rounded-circle bg-danger text-white' onClick={() => openEditModal(props.data,false)}/>
                        </div>
                    </div>
                </div>
        </>)
    }


    return ( <> 
            <BreadCrumb links={GConf.BreadCrumb.ClientRegion} />
            <br />
            <div className="row">
                <div className="col-12 col-lg-8">
                    <div className='mb-3 text-end'>
                        <Pagination  onPageChange={handlePaginationChange} defaultActivePage={1} firstItem={null} lastItem={null} totalPages={Math.floor((familleList.length / 5))+1} />
                    </div>
                    {loading ?  
                    <>
                        {displayFamille.map( (data) => <RegionCard key={data.PK}  data={data} />)}
                    </>
                    : SKLT.CardList }
                
                </div>
                <div className="col-12 col-lg-4">
                <Bounce bottom>
                    <div className="card card-body shadow-sm mb-4 sticky-top" style={{top:'70px' , zIndex:'1'}}>
                        <h4>Ajouter Region</h4>
                        <h5 className='mb-1'>Gouvernorat  </h5>
                            <Select placeholder='Choisir Une Gouvernement' options={Gouvernorat}  className='w-100 shadow-sm rounded mb-3' onChange={(e, data) => setRegionD({...regionD, Gouv: data.value })} />  
                        <h5 className='mb-1'>Region </h5>
                            <Input icon='map pin' iconPosition='left' value={regionD.Name} placeholder='Non de la Region' className='w-100 border-0 rounded ' onBlur={checkFamilleExistance} onChange={(e) => setRegionD({...regionD, Localisation: e.target.value })}/>
                        <br />
                        <div className='text-end'>
                            <Button  className={`text-end bg-system-btn rounded-pill ${saveBtnState}`} onClick={SaveRegion}>   <Icon name='save' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2'/></Button>
                        </div>
                    </div>
                </Bounce>
                </div>
            </div>
            <EditModal setModalS={setModalS} EditRegion={EditRegion} editRegionD={editRegionD}  setRegionEdit={setRegionEdit} modalS={modalS} Gouvernorat={Gouvernorat}/>
            <DeleteModal setDeleteModalS={setDeleteModalS} DeleteRegion={DeleteRegion} editRegionD={editRegionD}  setRegionEdit={setRegionEdit} deletemodalS={deletemodalS} />
        </> );

}

export default ClientRegions;