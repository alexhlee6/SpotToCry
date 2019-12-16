import gql from "graphql-tag";

export default {
  LOGIN_USER: gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      loggedIn
     }
    }
  `,
  VERIFY_USER: gql`
    mutation VerifyUser($token: String!) {
      verifyUser(token: $token) {
        loggedIn
      }
    }
  `,
  REGISTER_USER: gql`
    mutation RegisterUser($name: String!, $email: String!, $password: String!) {
      register(name: $name, email: $email, password: $password) {
        email
        token
        loggedIn
      }
    }
  `,
  
}