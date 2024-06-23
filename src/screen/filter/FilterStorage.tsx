// import AsyncStorage from "@react-native-async-storage/async-storage";
// import React from "react";

// export const saveListNames = async (listNames : string[]) => {
//     try {
//       const jsonValue = JSON.stringify(listNames);
//       await AsyncStorage.setItem('listNames', jsonValue);
//     } catch (e) {
//       console.error('Lỗi khi lưu danh sách tên danh sách:', e);
//     }
// };

// export const  getListNames = async () : Promise<string[]> => {
//     try {
//       const jsonValue = await AsyncStorage.getItem('listNames');
//       return jsonValue != null ? JSON.parse(jsonValue) : [];
//     } catch (e) {
//       console.error('Lỗi khi lấy danh sách tên danh sách:', e);
//       return [];
//     }
// };

// export const saveObjectList = async (listName : string, objectList : any) => {
//     try {
//       const key = `objectList_${listName}`;
//       const jsonValue = JSON.stringify(objectList);
//       await AsyncStorage.setItem(key, jsonValue);
//     } catch (e) {
//       console.error('Lỗi khi lưu danh sách đối tượng:', e);
//     }
// };

// export const getObjectList = async (listName : string) => {
//     try {
//       const key = `objectList_${listName}`;
//       const jsonValue = await AsyncStorage.getItem(key);
//       return jsonValue != null ? JSON.parse(jsonValue) : null;
//     } catch (e) {
//       console.error('Lỗi khi lấy danh sách đối tượng:', e);
//       return null;
//     }
// };

// export const deleteListAndObjects = async (listName : string) => {
//   try {
//     const key = `objectList_${listName}`;

//     // Xóa danh sách từ listNames
//     const listNames = await getListNames();
//     const updatedListNames = listNames.filter(name => name !== listName);
//     await saveListNames(updatedListNames);

//     // Xóa đối tượng từ AsyncStorage
//     await AsyncStorage.removeItem(key);
//   } catch (e) {
//     console.error('Lỗi khi xóa danh sách và đối tượng:', e);
//   }
// };