import {gql, graphql} from 'react-apollo';
import Admin from './Admin.jsx';

const AllSessions = gql`query { sessions { _id, title }}`;

const DeleteSession = gql`mutation { deleteSession(_id: $id){ _id }}`;

export default graphql(AllSessions)(Admin);
