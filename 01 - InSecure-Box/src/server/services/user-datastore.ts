import { User } from '../models/user';
export { User };

//import { cuid } from 'cuid';
var cuid = require( 'cuid' );

/**
*
*/
export class UserDataStore {
  /**
  * Our memory-base of users
  * Maps username -> User
  */
  static users: Map<string, User> = new Map<string, User>();

  listUsers( ): Promise<User[]> {
    let users = [];

    UserDataStore.users.forEach( ( v,k ) => { users.push( v ); } );

    return Promise.resolve<User[]>( users );
  }

  getUserByUsername( username: string ): Promise<User> {
    return new Promise<User>( (resolve, reject) => {
      let user = UserDataStore.users.get( username );

      // Found user ?
      if ( user )
        resolve( user );
      else
        reject( 'User ' + username + ' not found' );
    })
  }

  updateUser( username: string, attributes: {} ): Promise<User> {
    return new Promise<User>( (resolve, reject) => {
      let user = UserDataStore.users.get( username );

      // Found user ?
      if ( user ) {
        // Copy new attributes to memory-base
        for( let attr in attributes ) {
          user[ attr ] = attributes[ attr ];
        }

        resolve( user );
      }
      else
        reject( 'User ' + username + ' not found' );
    })
  }

  /**
  *
  */
  checkPassword( username: string, password: string ): Promise<boolean> {
    // lookup user, and check password ..
    let user = UserDataStore.users.get( username );

    if ( user && user.password == password )
      return Promise.resolve<boolean>( true );
    else
      return Promise.resolve<boolean>( false );
  }

  /**
  *
  */
  createUser( newUser: User ): Promise<User> {

    if ( UserDataStore.users.get( newUser.username ) )
      return Promise.reject<User>( 'User already exists' );

    // for now, just fabricate a user ...
    let user = {
      username: newUser.username,
      id: cuid(),
      name: newUser.name || 'User Name',
      password: newUser.password
    }

    // save it
    UserDataStore.users.set( user.username, user );

    return Promise.resolve<User>( user );
  }
}