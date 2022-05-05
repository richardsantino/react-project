import React from 'react';

import { EDIT_USER } from '../../graphql/userconfig/mutation';
import { useMutation } from '@apollo/client';
import { UserContext } from '../../auth';

export default function ChangeUserConfig({isUserConfig}){
    const { currentUser } = React.useContext(UserContext);
    const [newUserName, setNewUserName] = React.useState(currentUser.name);
    const [editUser] = useMutation(EDIT_USER);

    const image = React.useRef();

    if(isUserConfig){
        if(!document.getElementById('userConfig').classList.contains('show'))
            new window.bootstrap.Modal(document.getElementById('userConfig')).show();
    }

    async function uploadImage(imagem){
        const formData = new FormData();
        formData.append('file', imagem);
        formData.append('upload_preset', 'senacgram');
        formData.append('cloud_name','thyagoquintas');
        const response = await fetch('http://api.cloudinary.com/v1_1/thyagoquintas/image/upload',{
            method: 'POST',
            accept: 'application/json',
            body: formData
        });
        const bodyJson = await response.json();
        return bodyJson.url;
    }

    async function handleConfigUser(){
        let url = ""
        if(!image.current.files[0]){
            url = "https://www.fiscalti.com.br/wp-content/uploads/2021/02/default-user-image.png"
        }
        else{
            url = await uploadImage(image.current.files[0])
        }

        editUser({ variables : {
                image: url,
                name: newUserName,
                id: currentUser.id
            }
        });

        currentUser.name = newUserName
    }

    return (
        <div className="modal" id="userConfig" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Configurações de Usuario</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Nome</p>
                        <input type="text" placeholder='Digite um Texto' className='form-control my-2' value={newUserName} onChange={(event)=>setNewUserName(event.target.value)}/>
                        <p>Imagem de perfil</p>
                        <input type="file" className='form-control my-2' ref={image}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleConfigUser}>Alterar</button>
                    </div>
                </div>
            </div>
        </div>);
}