import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { ADD_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';

function AddClientModel() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { name, email, phone },
        update(cache, { data: { addClient } }) {
            const { clients } = cache.readQuery({
                query: GET_CLIENTS,
            });

            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: [...clients, addClient] },
            });
        }
    })

    const onSubmit = (e) =>{
        e.preventDefault();

        if(name === '' || email === '' || phone === ''){
            return alert('Please fill in all fields')
        }

        addClient(name, email, phone);

        setName('')
        setEmail('')
        setPhone('')
    }

  return (
    <div>

<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addClientModel">
    <div className='d-flex align-items-center'>
        <FaUser className='icon' />
        <div>
            Add Client
        </div>
    </div>
</button>

<div className="modal fade" id="addClientModel"  aria-labelledby="addClientModelLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="addClientModelLabel">Add Client</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={onSubmit}>
            <div className='mb-3'>
                <label className='form-label'>Name</label>
                <input 
                    type='text'
                    className='form-control'
                    id='name'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
            </div>

            <div className='mb-3'>
                <label className='form-label'>Email Id</label>
                <input 
                    type='text'
                    className='form-control'
                    id='name'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
            </div>

            <div className='mb-3'>
                <label className='form-label'>Phone</label>
                <input 
                    type='text'
                    className='form-control'
                    id='name'
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                />
            </div>
            <button type='submit' data-bs-dismiss="modal" className='btn btn-secondary'>Submit</button>
        </form>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default AddClientModel
