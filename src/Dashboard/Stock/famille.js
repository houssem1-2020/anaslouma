import React, { useEffect, useState } from 'react';
import { Bounce } from 'react-reveal';
import { Button,  Form, Icon, Input, Loader, Modal, Pagination, TextArea } from 'semantic-ui-react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../Assets/breadCrumb'
import axios from 'axios';
import {toast } from 'react-toastify';
import SKLT from '../../AssetsM/usedSlk';

const EditModal = ({setModalS,EditFamille,editfamilleD,setEditFamilleD,modalS}) =>{
    return(<>
            <Modal
                    size='mini'
                    open={modalS}
                    dimmer = 'blurring'
                    closeIcon
                    onClose={() => setModalS(false)}
                    onOpen={() => setModalS(true)}
                >
                    <Modal.Header><h4>Modifier Famille</h4></Modal.Header>
                    <Modal.Content>
                            
                            <h5 className='mb-1'>Famille</h5>
                            <Input icon='tags' iconPosition='left'  placeholder='Non de la famille' className='w-100 border-0 rounded ' value={editfamilleD.Name} onChange={(e) => setEditFamilleD({...editfamilleD, Name: e.target.value })}/>
                            <h5 className='mb-1'>Description </h5>
                            <Form>
                                <TextArea  rows="3" placeholder='Designer la famille '  className='w-100' value={editfamilleD.Description} onChange={(e) => setEditFamilleD({...editfamilleD, Description: e.target.value })}/>
                            </Form>
                            <br />
                    </Modal.Content>
                    <Modal.Actions>
                                {/* <Button className='rounded-pill' negative onClick={ () => setModalS(false)}> <span className='bi bi-x' ></span> </Button> */}
                                <Button  className=' bg-system-btn rounded-pill' onClick={EditFamille}>  <Icon name='save' /> Enregistrer </Button>
                    </Modal.Actions>
            </Modal>
    </>)
}
const DeleteModal = ({setDeleteModalS,DeleteFamille,editfamilleD,setEditFamilleD,deletemodalS}) =>{
    return(<>
            <Modal
                    size='mini'
                    open={deletemodalS}
                    dimmer = 'blurring'
                    closeIcon
                    onClose={() => setDeleteModalS(false)}
                    onOpen={() => setDeleteModalS(true)}
                    
                >
                    <Modal.Header><h4>Supprimer Famille</h4></Modal.Header>
                    <Modal.Content>
                            Voulez-Vous Vraimment Supprimer Cette Famille 
                            <br />
                            <br />
                            <div className='mb-0 p-0'><h5> Famille : {editfamilleD.Name}</h5></div>         
                            <div><h5> Description : {editfamilleD.Description} </h5></div>
                    </Modal.Content>
                    <Modal.Actions>
                                {/* <Button className='rounded-pill' negative onClick={ () => setDeleteModalS(false)}> <span className='bi bi-x' ></span> </Button> */}
                                <Button negative className='rounded-pill' onClick={DeleteFamille}>  <Icon name='trash' /> Supprimer </Button>
                    </Modal.Actions>
            </Modal>
    </>)
}

function Familles() {
    /*#########################[Const]##################################*/
    const [familleList, setFamillesList] = useState([]);
    const [displayFamille, setDisplayFamille] = useState([]);
    const [saveBtnState, setSaveBtnState] = useState('')
    const [updateFT, setUpdateFT] = useState('')
    const [familleD, setFamilleD] = useState([])
    const [editfamilleD, setEditFamilleD] = useState([])
    const [modalS, setModalS] = useState(false)
    const [deletemodalS, setDeleteModalS] = useState(false)
    const [loaderState, setLS] = useState(false)
    const [loading , setLoading] = useState(false)
    const [activePage , setActivePage] = useState(1)


    /*#########################[UseEffect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/stock/familles`, {
            tag: GConf.SystemTag,
          })
          .then(function (response) {
            setFamillesList(response.data)
            setLoading(true)
            setDisplayFamille(response.data.slice(0,5));
          })
    }, [updateFT])
    
    /*#########################[Function]##################################*/
    const SaveFamille = () => {
        if (!familleD.Name) {toast.error("Non de La famille est Invamlide !", GConf.TostErrorGonf)}
        else if (!familleD.Description) {toast.error("Description est Invamlide !", GConf.TostErrorGonf)}
        else{
            //console.log(familleD)
            setLS(true)
            axios.post(`${GConf.ApiLink}/stock/familles/ajouter`, {
                tag : GConf.SystemTag,
                familleD : familleD,
            }).then(function (response) {
                console.log(response.data)
                if(response.data.affectedRows) {
                    setSaveBtnState('disabled')
                    toast.success("Famille Ajouter avec Suucess", GConf.TostSuucessGonf)
                    setFamilleD([])
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
    const EditFamille = () => {
        console.log(editfamilleD)
        setLS(true)
        axios.post(`${GConf.ApiLink}/stock/familles/modifier`, {
            tag : GConf.SystemTag,
            familleD : editfamilleD,
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
    const DeleteFamille = () =>{

    }
    const checkFamilleExistance = () =>{
        if(familleD.Name){
            if(familleD.Name in familleList) {
                toast.error("Famille Deja Exist", GConf.TostErrorGonf)
                setFamilleD({...familleD, Name: '' })
            } 
        }
    }
    const openEditModal = (event,selected) =>{
        setEditFamilleD({PK: event.PK , Name:event.Genre, Description:event.Description})
        selected ? setModalS(true) : setDeleteModalS(true)
    }
    const handlePaginationChange = (e,{ activePage }) =>{
        setActivePage(activePage)
        let start = 5 * (activePage - 1)
        let end = 5*  activePage
        setDisplayFamille(familleList.slice(start, end));
    }


   /*#########################[Card]##################################*/
    const FamilleCard = (props) =>{
        return(<>
                <div className='card p-2 shadow-sm mb-2'>
                    <div className='row'>
                        <div className='col-10'>
                        <div className="d-flex p-0">
                                <div className="flex-shrink-0 align-self-center">
                                    <span className='bi bi-tags-fill bi-md system-color'></span>
                                </div>
                                <div className="flex-grow-1 ms-2">
                                    <h6 className='mb-1'>{props.data.Genre}</h6>
                                    <small> {props.data.Description} </small>
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
            <BreadCrumb links={GConf.BreadCrumb.stockFamille} />
            <br />
            <div className="row">
                <div className="col-12 col-lg-8">
                    <div className='mb-3 text-end'>
                        <Pagination  onPageChange={handlePaginationChange} defaultActivePage={1} firstItem={null} lastItem={null} totalPages={Math.floor((familleList.length / 5))+1} />
                    </div>
                    {loading ?  
                    <>
                        {displayFamille.map( (data) => <FamilleCard key={data.PK}  data={data} />)}
                    </>
                    : SKLT.CardList }
                
                </div>
                <div className="col-12 col-lg-4">
                <Bounce bottom>
                    <div className="card card-body shadow-sm mb-4 sticky-top" style={{top:'70px' , zIndex:'1'}}>
                        <h4>Ajouter Famille</h4>
                        <h5 className='mb-1'>Nom </h5>
                        <Input icon='tags' iconPosition='left' value={familleD.Name} placeholder='Non de la famille' className='w-100 border-0 rounded ' onBlur={checkFamilleExistance} onChange={(e) => setFamilleD({...familleD, Name: e.target.value })}/>
                        <h5 className='mb-1'>Description </h5>
                        <Form>
                            <TextArea  rows="3" placeholder='Designer la famille ' value={familleD.Description} className='w-100' onChange={(e) => setFamilleD({...familleD, Description: e.target.value })}/>
                        </Form>
                        <br />
                        <div className='text-end'>
                            <Button  className={`text-end bg-system-btn rounded-pill ${saveBtnState}`} onClick={SaveFamille}>   <Icon name='save' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2'/></Button>
                        </div>
                    </div>
                </Bounce>
                </div>
            </div>
            <EditModal setModalS={setModalS} EditFamille={EditFamille} editfamilleD={editfamilleD}  setEditFamilleD={setEditFamilleD} modalS={modalS} />
            <DeleteModal setDeleteModalS={setDeleteModalS} DeleteFamille={DeleteFamille} editfamilleD={editfamilleD}  setEditFamilleD={setEditFamilleD} deletemodalS={deletemodalS} />
        </> );

}

export default Familles;