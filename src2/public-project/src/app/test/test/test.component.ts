import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
const createUser = gql`
  mutation createUser($email: String!, $password: String!, $isAdmin: Boolean!) {
    createUser(userInput: { email: $email, password: $password, isAdmin: $isAdmin }) {
      _id
    }
  }
`;

const createService = gql`
  mutation createService($name: String!) {
    createService(name: $name) {
      _id
      name
      subscriptionId {
        _id
      }
    }
  }
`;
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .mutate({
        mutation: createService,
        variables: {
          name: 'power',
          email: 'reem',
          password: '123456',
          isAdmin: true,
        },
      })
      .subscribe(
        result => {
          // this._id = result.data._id;
          // this.isAdmin = result.data.isAdmin;
          // this.email = result.data.email;
          console.log(result.data);
        },
        error => {
          console.log('there was an error sending the query', error);
        },
      );
  }
}
