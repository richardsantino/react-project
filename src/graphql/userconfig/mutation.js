import { gql } from '@apollo/client';

export const EDIT_USER = gql`
    mutation EDIT_USER ($id: uuid!, $name: String, $image: String){
        update_user(
        where: {id: {_eq: $id}},
        _set: {name: $name, image: $image}) {
        returning {
            id
            image
            name
        }
        }
    }`;