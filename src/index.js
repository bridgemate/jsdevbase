//per the webpack.config file, this is the entry point of the application
import './index.css';

/* eslint-disable no-console */

import { getUsers, deleteUser} from './api/userApi';

// Populate table of users via API call.
getUsers().then( result => {
  let usersBody = '';

  result.forEach( user => {
    usersBody += `
    <tr id="${user.id}">
      <td>
        <a
          href="#"
          data-id="${user.id}"
          class="deleteUser"
          onclick="delUser('${user.id}')"
        >
          Delete
        </a>
      </td>
      <td>${user.id}</td>
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.email}</td>
    </tr>`
  });
  const usersEle = global.document.getElementById('users');
  usersEle.innerHTML = usersBody;

  // Method 0: take advantage even bubble
  usersEle.onclick = function(e) {
    const tar = e.target;
    if (tar.classList.contains('deleteUser')) {
      event.preventDefault();

      // remove user from data file
      deleteUser(tar.attributes["data-id"].value);

      // remove user from UI
      const row = tar.parentNode.parentNode;
      row.parentNode.removeChild(row);
    }
  }


  // // Method 1: attach event listner for each item - bad performance for large item list
  // const deleteLinks = global.document.getElementsByClassName('deleteUser');

  // //Must use array.from to create a real array form a DOM collection
  // //getElementsByClassName only returns an array-like object

  // Array.from(deleteLinks, link => {
  //   link.onclick = function(event) {
  //     const element = event.target;
  //     event.preventDefault();

  //     // remove user from data file
  //     deleteUser(element.attributes["data-id"].value);

  //     // remove user from UI
  //     const row = element.parentNode.parentNode;
  //     row.parentNode.removeChild(row);
  //   };
  // });

})

// Method 2: using row id, the same issue as mothod 1
// global.delUser =  function (id) {
//   deleteUser(id);
//   const row = document.getElementById(id);
//   row.parentNode.removeChild(row);
//   // row.style.display = 'none'
// }

