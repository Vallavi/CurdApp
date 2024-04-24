import React, { useState } from 'react';
import { Button, Container, Form, FormGroup, Modal, Table } from 'react-bootstrap';

function Registration() {

    const [show, setShow] = useState(true);
    const [allData, setAllData] = useState([{}]);
    const[buttonState,setButtonState] =useState(true);
    const[index,setIndex] = useState(0);
    const[input,setInput] = useState({
        Fullname: "",
        Email: "",
        Password: "",
        Mobile: ""
    });

    function getInputData(e){
     let target = e.target;
     let value = target.value;
     let key = target.name;
      return(
        setInput((old)=>{
            return{
                ...old,
                [key] : value
            }
        })
      )
    }

    let temp = {}

    const getFormData = (e) => {

        e.preventDefault();
        let form = e.target;

        let formData = new FormData(form);

        

        for (let data of formData.entries()) {
            let key = data[0];
            let value = data[1];

            if (typeof (value) == 'object') {
                value = URL.createObjectURL(value)
            }

            temp[key] = value;

        }
        
    }

    function insertData(e){
      e.preventDefault();
       getFormData(e);
       return (
        setAllData((old) => {
            return [
                ...old,
                temp
            ]
        }),
        setShow(false),
        setInput({
            Fullname: "",
            Email: "",
            Password: "",
            Mobile: ""
        })
    )
    }
    
    function updateData(e){
       e.preventDefault();
       getFormData(e);

       const tempData = [...allData];
       tempData[index] = temp;

       
       return(
        setShow(false),
        setAllData(tempData)
       )
    }



    function editData(item){
     return(
          setShow(true),
          setInput(item),
          setButtonState(false),
          setIndex(item.index)

     )
    }

    function deleteUser(index){
        let tempData =[...allData];
        // console.log(tempData);
        tempData.splice(index,1);
       return( setAllData(tempData))
    }

    function addButton(){
        return(
            setShow(true),
            setInput({
                Fullname: "",
                Email: "",
                Password: "",
                Mobile: ""
            }),
            setButtonState(true)
        )
    }

    function Tr({item}) {
        return (
            <>
                <tr className='text-center'>
                    <td>{item.index+1}</td>
                    <td><img src={item.Profile} alt='' width={50} height={50} className='rounded-circle' /></td>
                    <td>{item.Fullname}</td>
                    <td>{item.Email}</td>
                    <td>{item.Password}</td>
                    <td>{item.Mobile}</td>
                    <td>
                        <Button variant='success' className='me-2' onClick={()=>{editData(item)}}>
                            <i className='fa fa-edit'></i>
                        </Button>
                        <Button variant='danger' onClick={()=>{deleteUser(item.index)}}>
                            <i className='fa fa-trash'></i>
                        </Button>
                    </td>

                </tr>

            </>
        )
    }






    return (
        <>
            <h1 className='text-center'>Registration Details</h1>
            <Button className='position-absolute bottom-0 end-0 me-3 mb-3 rounded-circle' 
            onClick={addButton}>
                <i className='fa fa-plus'></i>
            </Button>

            <Modal show={show} onHide={() => setShow(false)} >
                <Modal.Header closeButton>
                    <Modal.Title>User Registration</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={buttonState ? insertData : updateData}>
                        <Form.Group>
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control 
                            type='text'
                            name='Fullname'
                            placeholder='Full Name' 
                            onChange={getInputData}
                            value={input.Fullname}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                            type='email' 
                            name='Email' 
                            placeholder='Email ID' 
                            onChange={getInputData}
                            value={input.Email} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                            type='password' 
                            name='Password' 
                            placeholder='Password' 
                            onChange={getInputData}
                            value={input.Password}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control 
                            type='tel' 
                            name='Mobile' 
                            placeholder='Mobile Number' 
                            onChange={getInputData} 
                            value={input.Mobile}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Profile Image</Form.Label>
                            <Form.Control type='file' name='Profile' placeholder='Insert Your Image' />
                        </Form.Group>
                        <FormGroup className='mt-3'>
                        {
                            buttonState? <Button type='submit' variant='primary' className='me-2'>Submit</Button> :
                            <Button type='submit' variant='success' className='me-2'>Update</Button>
                        }
                        
                        <Button type='reset' variant='danger' onClick={()=>setShow(false)}>Cancel</Button>
                        </FormGroup>
                    </Form>





                </Modal.Body>

            </Modal>


            <Container >
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Profile</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Mobile No.</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allData.map((item,index)=>{
                                item['index'] = index;
                                return  <Tr item={item} key={index} />     
                            })
                        }
                    </tbody>
                </Table>


            </Container>
        </>
    )
}

export default Registration
