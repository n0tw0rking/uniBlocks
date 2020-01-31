import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery<any>({
        query: gql`
          query {
            login(userInput: { email: "faredmohamed", password: "123456" }) {
              token
              userId
              isAdmin
              isSuperAdmin
            }
          }
        `,
        variables: {
          name: 'water',
        },
      })
      .valueChanges.subscribe(result => {
        // this._id = result.data._id;
        // this.isAdmin = result.data.isAdmin;
        // this.email = result.data.email;
        console.log(result.data);
      });
  }
}
