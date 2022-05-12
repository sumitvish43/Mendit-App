// import React, {
//     useState,
//     useEffect,
//     useLayoutEffect,
//     useCallback
//   } from 'react';
//   import { TouchableOpacity, Text } from 'react-native';
//   import { GiftedChat } from 'react-native-gifted-chat';
//   import {
//     collection,
//     addDoc,
//     orderBy,
//     query,
//     onSnapshot
//   } from 'firebase/firestore';
//   import { signOut } from 'firebase/auth';
  
//   import { auth, db } from '../firebase';

//   export default function Nestedchat({ navigation }) {
//     const [messages, setMessages] = useState([]);
  
//   const onSignOut = () => {
//       signOut(auth).catch(error => console.log('Error logging out: ', error));
//     };
  
//     // useLayoutEffect(() => {
//     //   navigation.setOptions({
//     //     headerRight: () => (
//     //       <TouchableOpacity
//     //         style={{
//     //           marginRight: 10
//     //         }}
//     //         onPress={onSignOut}
//     //       >
//     //         <Text>Logout</Text>
//     //       </TouchableOpacity>
//     //     )
//     //   });
//     // }, [navigation]);
//     useEffect(() => {
//         const collectionRef = db.collection('chats');//.doc("LdGcQa1F0Ejm7dQ6UWrA").collection("chats2");
        
//         const q = query(collectionRef, orderBy('createdAt', 'desc'));
    
//         const unsubscribe = onSnapshot(q, querySnapshot => {
//           setMessages(
//             querySnapshot.docs.map(doc => ({
//               _id: doc.data()._id,
//               createdAt: doc.data().createdAt.toDate(),
//               text: doc.data().text,
//               user: doc.data().user
//             }))
//           );
//         });
    
//         return () => unsubscribe();
//       }, []);
    
    
//     const onSend = useCallback((messages = []) => {
//         setMessages(previousMessages =>
//           GiftedChat.append(previousMessages, messages)
//         );
//         const { _id, createdAt, text, user } = messages[0];   
//         const collectionRef = db.collection('chats');//.doc("LdGcQa1F0Ejm7dQ6UWrA").collection("chats2"); 
//         addDoc(collectionRef, {
//           _id,
//           createdAt,
//           text,
//           user
//         });
//       }, []);
//       return (
//         <GiftedChat
//           messages={messages}
//           showAvatarForEveryMessage={false}
//           onSend={messages => onSend(messages)}
//           user={{
//             _id: auth?.currentUser?.phoneNumber,
//             avatar: 'https://i.pravatar.cc/300'
//           }}
//         />
//       );
//         }

//         /*
//         inside chats collection, we want another collection
//         that collection contains what chat contains right now, as well as ids of both parties
//         */ 

import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
  } from 'react';
  import { TouchableOpacity, Text, BackHandler } from 'react-native';
  import { GiftedChat } from 'react-native-gifted-chat';
  import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot
  } from 'firebase/firestore';
  import { signOut } from 'firebase/auth';
  
  import { auth, db } from '../firebase';

  export default function NestedChat({ navigation, route }) {
    const [messages, setMessages] = useState([]);
    const {userID, docId, handyID} = route.params;
    const numberFinal = global.phoneNum;
  const onSignOut = () => {
      signOut(auth).catch(error => console.log('Error logging out: ', error));
    };
  
    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{
              marginRight: 10
            }}
            onPress={onSignOut}
          >
            <Text>Logout</Text>
          </TouchableOpacity>
        )
      });
    }, [navigation]);
    
    useEffect(() => {
        const backButtonPress = () => {
            navigation.navigate('UserRoute');
            return true;
          };
      
          const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backButtonPress
          );
      


        const string1 = 'chats/'+docId+'/chats2';
        const collectionRef = collection(db,string1);
        const q = query(collectionRef, orderBy('createdAt', 'desc'));
        
    
        const unsubscribe = onSnapshot(q, querySnapshot => {
          setMessages(
            querySnapshot.docs.map(doc => ({
              _id: doc.data()._id,
              createdAt: doc.data().createdAt.toDate(),
              text: doc.data().text,
              user: doc.data().user
            }))
          );
        });
    
        return () => unsubscribe();
      }, []);

      useEffect(() => {
        const backButtonPress = () => {
            // navigation.navigate('UserRoute');
            // return true;
            db.collection("User")
        .where("phone_no", "==", numberFinal)
        .get()
        .then((querySnapshot) => {
          
          
          if (querySnapshot.docs.length) {
            navigation.navigate('UserRoute');
            return true;
            
          }

          
          else {
            db.collection("Handyman")
              .where("phone_no", "==", numberFinal)
              .get()
              .then((querySnapshot) => {
                
                if (querySnapshot.docs.length) {
                    navigation.navigate('HandyRoute');
                    return true;      
                }
                else {
                  alert("error in going back");
                  console.log("error in going back");
                }
              });
          }
          
        })
      

          
      
          };
      
          const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backButtonPress
          );
      
    
        
    
        return () => backHandler.remove();
      }, []);

    
    //return () => backHandler.remove();
    
    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages)
        );
        const { _id, createdAt, text, user } = messages[0];
        const string1 = 'chats/'+ docId + '/chats2';
        addDoc(collection(db,string1), {
          _id,
          createdAt,
          text,
          user
        });
      }, []);
      return (
        <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={true}
          onSend={messages => onSend(messages)}
          user={{
            _id: numberFinal,
            avatar: 'https://i.pravatar.cc/300'
          }}
        />
      );
        }