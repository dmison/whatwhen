import {gql, graphql} from 'react-apollo';
import Sessions from './Sessions.jsx';

const AllSessions = gql`query { sessions { _id, title }}`;

export default graphql(AllSessions)(Sessions);
