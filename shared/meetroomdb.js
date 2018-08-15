import Expo, { SQLite, Constants, ImagePicker, Permissions } from 'expo';

const db = SQLite.openDatabase('meetroom.db');

export class MeetroomDb {  
    
    constructor(props) {
        
    }
       
    
    async checkUserRegistered() { 
       
       console.log('checkUserRegistered');

       return new Promise((resolve, reject) => {

        db.transaction(tx => {

            tx.executeSql(
                "select id, username from users", null,  (a,b) => {
                    console.log('table exist get');
                    console.log(a);
                    console.log("-----------")
                    console.log(b);
                    resolve(true);
                }, 
                () => { 
                    // possible no results //
                    console.log('user record not found..');
                    this.createUserTableIfNotExist();
                    resolve(false);
                }
            );
        });       

       });  

    }
    
    async createUserTableIfNotExist() { 
        
        console.log('create table if not exist');

        db.transaction(tx => {
            tx.executeSql(
                'create table if not exists users (id integer primary key not null, username text);', 0, (a,b) => {
                    console.log(' --- success');
                    console.log(a);
                    console.log(b);
                }, 
                (e) => { 
                    console.log('error creating table..');
                    console.log(e);
                });
            });    
        }
        
        async registerUser(username) { 
            
            db.transaction(tx => {
                tx.executeSql(
                    'insert into users(username) values (${username})', username,  (a,b) => {
                        console.log('success insert');
                        console.log(a);
                        console.log(b);
                    }, 
                    () => { 
                        console.log('error creating table..');
                    }
                );
            });
        }
    }
    
    
    
    